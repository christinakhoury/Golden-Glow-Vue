import axios from 'axios'
import { OSIMART_STORE_ID, storeUrl } from './osimartConfig.js'

export const STORE_ID = OSIMART_STORE_ID

const BASE_URL = storeUrl('/store/apis/checkout/')
const PAYMENT_METHODS_URL = storeUrl('/store/apis/available-payment-methods/')
const SHIPPING_COUNTRIES_URL = storeUrl('/store/apis/shippingcountries/')

let _paymentMethodsCache = null
let _shippingCountryCache = null

async function getPaymentMethods() {
  if (_paymentMethodsCache) return _paymentMethodsCache
  const res = await axios.get(PAYMENT_METHODS_URL)
  _paymentMethodsCache = res.data.results

  return _paymentMethodsCache
}

async function getShippingCountries() {
  if (_shippingCountryCache) return _shippingCountryCache
  const res = await axios.get(SHIPPING_COUNTRIES_URL)
  _shippingCountryCache = res.data.results || res.data || []
  return _shippingCountryCache
}

async function resolveShippingCountryId(preferredName = 'Lebanon') {
  const countries = await getShippingCountries()
  const preferred = (preferredName || 'Lebanon').toLowerCase()

  const match = countries.find(country => {
    const name = country.name || country.country || country.country_name || ''
    const code = country.code || country.country_code || country.iso_code || ''
    return (
      name.toLowerCase() === preferred ||
      code.toLowerCase() === 'lb' ||
      code.toLowerCase() === 'lbn'
    )
  })

  return (match || countries[0])?.id || null
}

// Card is disabled in the UI for now (backend doesn't support split
// product/service payment methods yet), so in practice only the cash-style
// entries get resolved. Left the full map in place so re-enabling card later
// in CheckoutView.vue is a one-line change, not a rewrite here.
const UI_TO_BACKEND_NAME = {
  card: 'Credit or Debit Card',
  cod: 'Cash on Delivery',
  instore: 'Cash on Delivery',
  paypal: 'PayPal'
}

export async function resolvePaymentMethodId(uiType) {
  const methods = await getPaymentMethods()
  const backendName = UI_TO_BACKEND_NAME[uiType]

  if (!backendName) {
    throw new Error(`No backend mapping defined for payment type "${uiType}"`)
  }

  let match = null

  if (uiType === 'cod' || uiType === 'instore') {
    match = methods.find(m => m.is_cod && m.is_active !== false)
  } else if (uiType === 'card') {
    match = methods.find(m => m.is_creditordebit && m.is_active !== false)
  } else if (uiType === 'paypal') {
    match = methods.find(m => m.is_paypal && m.is_active !== false)
  }

  // 1. Strict name match
  if (!match) {
    match = methods.find(m => m.name?.toLowerCase() === backendName.toLowerCase())
  }

  // 2. Fallback: fuzzy match by common tokens, in case osimart's dashboard
  //    naming drifts from the exact string above
  if (!match) {
    if (uiType === 'cod' || uiType === 'instore') {
      match = methods.find(m =>
        m.name?.toLowerCase().includes('delivery') ||
        m.name?.toLowerCase().includes('cod') ||
        m.name?.toLowerCase().includes('in-store') ||
        m.name?.toLowerCase().includes('cash')
      )
    } else if (uiType === 'card' || uiType === 'paypal') {
      match = methods.find(m =>
        m.name?.toLowerCase().includes('card') ||
        m.name?.toLowerCase().includes('stripe') ||
        m.name?.toLowerCase().includes('pay')
      )
    }
  }

  if (!match) {
    throw new Error(`Could not resolve a payment method ID for "${uiType}"`)
  }

  return match.id
}

function buildCheckoutPayload({
  customer,
  productItems,
  serviceItems,
  productTotals,
  serviceTotals,
  productPaymentMethod,
  servicePaymentMethod,
  paymentMethodId,
  grandTotal,
  serverCart,
  shippingCountryId
}) {
  // NOTE: osimart's validator rejects the checkout with
  // "Select an address or add full address details" whenever it doesn't
  // recognize the address as "full." They haven't confirmed the exact field
  // names their serializer expects, so this sends the common variants
  // side-by-side (address_line_1/street_address/line1, state/region, etc).
  // DRF serializers normally ignore keys they don't declare, so the extras
  // are harmless. Once osimart support confirms the real shape, trim this
  // down to just the correct keys.
  const cleanName = (customer.name || '').trim()
  const [nameFirst, ...nameRest] = cleanName.split(/\s+/).filter(Boolean)
  const addrFirstName = (customer.firstName || nameFirst || 'Guest').trim()
  const addrLastName = (customer.lastName || nameRest.join(' ') || addrFirstName).trim()
  const fullName = cleanName || `${addrFirstName} ${addrLastName}`
  const email = (customer.email || '').trim().toLowerCase().replace(/\.{2,}/g, '.')
  const phone = (customer.phone || '').trim()

  const addressText = (customer.address || '').trim()

  const structuredAddress = addressText
    ? {
        full_name: fullName,
        first_name: addrFirstName,
        last_name: addrLastName,
        phone,
        phone_number: phone,
        email,

        address_line_1: addressText,
        address_line1: addressText,
        line1: addressText,
        street_address: addressText,
        address: addressText,

        country: shippingCountryId || undefined,

        postal_code: '0000',
        zip_code: '0000',
        zipcode: '0000'
      }
    : null

  return {
    store: STORE_ID,

    // Single required field on the backend right now — see submitCheckout()
    // for how the primary method is chosen when both products and services
    // are in the cart.
    payment_method_id: paymentMethodId,
    payment_method: paymentMethodId,

    customer_name: fullName,
    customer_first_name: addrFirstName,
    customer_last_name: addrLastName,
    first_name: addrFirstName,
    last_name: addrLastName,
    customer_email: email,
    email,
    customer_phone: phone,
    phone,
    phone_number: phone,
    country: shippingCountryId || undefined,
    country_id: shippingCountryId || undefined,
    delivery_address: addressText || undefined,
    address: structuredAddress,
    address_line_1: addressText || undefined,
    address_line1: addressText || undefined,
    street_address: addressText || undefined,
    address_details: structuredAddress,

    // address_id intentionally omitted — osimart's serializer allows this
    // field to be absent (required=False) but rejects an explicit `null`
    // (allow_null=False). Confirmed fixed.

    guest: {
      full_name: fullName,
      first_name: addrFirstName,
      last_name: addrLastName,
      name: fullName,
      email,
      phone,
      phone_number: phone,
      address: structuredAddress
    },

    cart: serverCart || undefined,
    cart_items: serverCart || undefined,
    items: serverCart || undefined,

    product_items: productItems.map(item => ({
      item_id: item.variantId || item.id,
      quantity: item.quantity,
      price: item.price
    })),
    product_payment_method: productItems.length ? productPaymentMethod : undefined,
    product_subtotal: productTotals ? productTotals.subtotal : undefined,
    product_tax: productTotals ? parseFloat(productTotals.tax.toFixed(2)) : undefined,
    product_total: productTotals ? parseFloat(productTotals.total.toFixed(2)) : undefined,

    service_items: serviceItems.map(item => ({
      item_id: item.variantId || item.id,
      quantity: item.quantity,
      price: item.price
    })),
    service_payment_method: serviceItems.length ? servicePaymentMethod : undefined,
    service_subtotal: serviceTotals ? serviceTotals.subtotal : undefined,
    service_tax: serviceTotals ? parseFloat(serviceTotals.tax.toFixed(2)) : undefined,
    service_total: serviceTotals ? parseFloat(serviceTotals.total.toFixed(2)) : undefined,

    grand_total: parseFloat(grandTotal.toFixed(2))
  }
}

/**
 * Resolves the payment method and submits the order.
 *
 * NOTE ON SPLIT PAYMENTS: osimart's checkout endpoint only accepts a single
 * payment_method_id per order — there's no product_payment_method_id /
 * service_payment_method_id split. Until they add that, we pick one primary
 * method (products take priority if present, otherwise services). This is
 * fine while both sides are forced to cash, but if card ever gets
 * re-enabled with a genuine mixed cart, this will need a real backend fix,
 * not a frontend workaround.
 */
export async function submitCheckout({
  customer,
  productItems = [],
  serviceItems = [],
  productTotals,
  serviceTotals,
  productPaymentMethod,
  servicePaymentMethod,
  grandTotal,
  serverCart
}) {
  const primaryUiType = productItems.length ? productPaymentMethod : servicePaymentMethod
  const paymentMethodId = await resolvePaymentMethodId(primaryUiType)
  const shippingCountryId = await resolveShippingCountryId(customer.country)

  const payload = buildCheckoutPayload({
    customer,
    productItems,
    serviceItems,
    productTotals,
    serviceTotals,
    productPaymentMethod,
    servicePaymentMethod,
    paymentMethodId,
    grandTotal,
    serverCart,
    shippingCountryId
  })

  const targetUrl = BASE_URL

  try {
    const res = await axios.post(targetUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return res.data
  } catch (error) {
    if (error.response) {
      const data = error.response.data
      console.error('[CHECKOUT API] failed', error.response.status)
      if (data && typeof data === 'object') {
        Object.entries(data).forEach(([field, messages]) => {
          console.error(`  → ${field}:`, Array.isArray(messages) ? messages.join(', ') : messages)
        })
      } else {
        console.error('  →', data)
      }
    } else {
      console.error('[CHECKOUT API] failed', error.message)
    }
    throw error
  }
}
