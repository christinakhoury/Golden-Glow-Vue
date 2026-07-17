import axios from 'axios'

export const STORE_ID = '17781c3f-b746-4897-be7d-15d1ff48589e'

const BASE_URL = 'https://api.osimart.com/store/apis/checkout/'
const PAYMENT_METHODS_URL = 'https://api.osimart.com/store/apis/payment-methods/'

function getAuthHeaders() {
  const token = localStorage.getItem('gg-token')
  // osimart expects the JWT auth scheme, not Bearer — see auth.js / useAuth.js
  // for the same quirk documented elsewhere in this project.
  return token ? { Authorization: `JWT ${token}` } : {}
}

let _paymentMethodsCache = null

async function getPaymentMethods() {
  if (_paymentMethodsCache) return _paymentMethodsCache
  const res = await axios.get(PAYMENT_METHODS_URL, {
    params: { store: STORE_ID },
    headers: getAuthHeaders()
  })
  _paymentMethodsCache = res.data.results

  // Temporary — remove once payment_method_id validation is fully confirmed.
  console.log('[CHECKOUT API] payment methods for store', STORE_ID, _paymentMethodsCache)

  return _paymentMethodsCache
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

  // 1. Strict name match
  let match = methods.find(m => m.name.toLowerCase() === backendName.toLowerCase())

  // 2. Fallback: fuzzy match by common tokens, in case osimart's dashboard
  //    naming drifts from the exact string above
  if (!match) {
    if (uiType === 'cod' || uiType === 'instore') {
      match = methods.find(m =>
        m.name.toLowerCase().includes('delivery') ||
        m.name.toLowerCase().includes('cod') ||
        m.name.toLowerCase().includes('in-store') ||
        m.name.toLowerCase().includes('cash')
      )
    } else if (uiType === 'card' || uiType === 'paypal') {
      match = methods.find(m =>
        m.name.toLowerCase().includes('card') ||
        m.name.toLowerCase().includes('stripe') ||
        m.name.toLowerCase().includes('pay')
      )
    }
  }

  if (!match) {
    throw new Error(`Could not resolve a payment method ID for "${uiType}"`)
  }

  // Temporary — remove once payment_method_id validation is fully confirmed.
  console.log(`[CHECKOUT API] resolved "${uiType}" ->`, match)

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
  grandTotal
}) {
  // NOTE: osimart's validator rejects the checkout with
  // "Select an address or add full address details" whenever it doesn't
  // recognize the address as "full." They haven't confirmed the exact field
  // names their serializer expects, so this sends the common variants
  // side-by-side (address_line_1/street_address/line1, state/region, etc).
  // DRF serializers normally ignore keys they don't declare, so the extras
  // are harmless. Once osimart support confirms the real shape, trim this
  // down to just the correct keys.
  const [addrFirstName, ...addrRest] = (customer.name || '').trim().split(' ')
  const addrLastName = addrRest.join(' ')

  const structuredAddress = customer.address
    ? {
        full_name: customer.name,
        first_name: addrFirstName || customer.name,
        last_name: addrLastName || '',
        phone: customer.phone,
        phone_number: customer.phone,
        email: customer.email,

        address_line_1: customer.address,
        address_line1: customer.address,
        line1: customer.address,
        street_address: customer.address,
        address: customer.address,

        city: 'Beirut',
        state: 'Mount Lebanon',
        region: 'Mount Lebanon',
        country: 'Lebanon',
        country_code: 'LB',

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

    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone,
    delivery_address: customer.address || undefined,

    // Sent at the top level too, in case the serializer looks for `address`
    // on the order itself rather than nested under `guest`.
    address: structuredAddress,
    // address_id intentionally omitted — osimart's serializer allows this
    // field to be absent (required=False) but rejects an explicit `null`
    // (allow_null=False). Confirmed fixed.

    guest: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: structuredAddress
    },

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
  grandTotal
}) {
  const primaryUiType = productItems.length ? productPaymentMethod : servicePaymentMethod
  const paymentMethodId = await resolvePaymentMethodId(primaryUiType)

  const payload = buildCheckoutPayload({
    customer,
    productItems,
    serviceItems,
    productTotals,
    serviceTotals,
    productPaymentMethod,
    servicePaymentMethod,
    paymentMethodId,
    grandTotal
  })

  const targetUrl = `${BASE_URL}?store=${STORE_ID}`

  // Temporary — remove once checkout is fully stable.
  console.log('[CHECKOUT API] auth headers', getAuthHeaders())
  console.log('[CHECKOUT API] payload', JSON.stringify(payload, null, 2))

  try {
    const res = await axios.post(targetUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
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