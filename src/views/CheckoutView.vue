<template>
  <main class="bg-[#F8F4EF] pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 min-h-screen">
    <div class="max-w-6xl mx-auto">

      <div v-if="!orderComplete">
        <div class="text-left border-b border-stone-200 pb-5 mb-8 md:mb-12">
          <h1 class="font-playfair text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 mb-2 tracking-wide">Checkout</h1>
          <div class="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-3"></div>
          <p class="text-stone-500 text-xs md:text-sm tracking-wider uppercase font-medium">
            Guest checkout — no account required
          </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          <!-- Left: Contact details + Payment method sections -->
          <div class="flex-1 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8 w-full space-y-8">

            <div>
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-5 tracking-wide">Your Details</h3>
              <div class="space-y-4">
                <input v-model="customer.firstName" placeholder="First Name"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                <input v-model="customer.lastName" placeholder="Last Name"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                <input v-model.trim="customer.email" type="email" placeholder="Email"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                <input v-model.trim="customer.phone" placeholder="Phone"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                <input v-model="customer.country" placeholder="Country"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                <input v-model="customer.address" placeholder="Delivery Address"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
              </div>
            </div>

            <!-- PRODUCT PAYMENT -->
            <div v-if="hasProducts" class="border-t border-stone-100 pt-6">
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide">Product Payment</h3>
              <div class="grid grid-cols-2 gap-3">
                <button
                  disabled
                  title="Card payment is coming soon"
                  class="relative p-4 border rounded-xl text-sm font-medium border-stone-200 text-stone-400 opacity-40 cursor-not-allowed"
                >
                  Pay Now (Card)
                  <span class="block text-[10px] tracking-wider uppercase mt-1 text-stone-400">Coming soon</span>
                </button>
                <button
                  class="p-4 border rounded-xl text-sm font-medium transition border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                >
                  Pay on Delivery
                </button>
              </div>

              <p class="text-xs text-stone-400 mt-4">We'll deliver your products and collect payment at your door.</p>
            </div>

            <!-- SERVICE PAYMENT -->
            <div v-if="hasServices" class="border-t border-stone-100 pt-6">
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide">Service Payment</h3>
              <div class="grid grid-cols-2 gap-3">
                <button
                  disabled
                  title="Card payment is coming soon"
                  class="relative p-4 border rounded-xl text-sm font-medium border-stone-200 text-stone-400 opacity-40 cursor-not-allowed"
                >
                  Pay Now (Card)
                  <span class="block text-[10px] tracking-wider uppercase mt-1 text-stone-400">Coming soon</span>
                </button>
                <button
                  class="p-4 border rounded-xl text-sm font-medium transition border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                >
                  Pay In-Store
                </button>
              </div>
              <p class="text-xs text-stone-400 mt-3">
                You'll pay for your service at the studio when you arrive.
              </p>
            </div>

            <p v-if="error" class="text-red-500 text-xs font-semibold">{{ error }}</p>
          </div>

          <!-- Right: Two separate order summaries -->
          <div class="w-full lg:w-96 lg:sticky lg:top-32 space-y-6">

            <!-- PRODUCTS SUMMARY -->
            <div v-if="hasProducts" class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide border-b border-stone-100 pb-3">
                Products
                <span class="block text-xs uppercase tracking-wider text-stone-400 font-normal mt-1">
                  Pay on Delivery
                </span>
              </h3>

              <div class="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4">
                <div v-for="item in productItems" :key="item.id" class="flex justify-between text-sm text-stone-600">
                  <span class="truncate max-w-[65%]">
                    {{ item.baseName }}
                    <span v-if="item.variantName" class="text-stone-400"> ({{ item.variantName }})</span>
                    <span v-if="item.quantity > 1" class="text-stone-400"> × {{ item.quantity }}</span>
                  </span>
                  <span class="font-medium text-stone-800">${{ (item.price * item.quantity).toLocaleString() }}</span>
                </div>
              </div>

              <div class="space-y-2 border-t border-stone-100 pt-4 text-sm text-stone-500">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span class="font-medium text-stone-800">${{ productSubtotal.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Tax (8%)</span>
                  <span class="font-medium text-stone-800">${{ productTax.toFixed(2) }}</span>
                </div>
              </div>

              <div class="flex justify-between font-medium text-base pt-4 mt-2 border-t border-stone-100 text-stone-800">
                <span>Products Total</span>
                <span class="text-stone-900 font-semibold text-lg">${{ productTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- SERVICES SUMMARY -->
            <div v-if="hasServices" class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide border-b border-stone-100 pb-3">
                Services
                <span class="block text-xs uppercase tracking-wider text-stone-400 font-normal mt-1">
                  Pay In-Store
                </span>
              </h3>

              <div class="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4">
                <div v-for="item in serviceItems" :key="item.id" class="flex justify-between text-sm text-stone-600">
                  <span class="truncate max-w-[65%]">
                    {{ item.baseName }}
                    <span v-if="item.variantName" class="text-stone-400"> ({{ item.variantName }})</span>
                  </span>
                  <span class="font-medium text-stone-800">${{ item.price.toLocaleString() }}</span>
                </div>
              </div>

              <div class="space-y-2 border-t border-stone-100 pt-4 text-sm text-stone-500">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span class="font-medium text-stone-800">${{ serviceSubtotal.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Tax (8%)</span>
                  <span class="font-medium text-stone-800">${{ serviceTax.toFixed(2) }}</span>
                </div>
              </div>

              <div class="flex justify-between font-medium text-base pt-4 mt-2 border-t border-stone-100 text-stone-800">
                <span>Services Total</span>
                <span class="text-stone-900 font-semibold text-lg">${{ serviceTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- GRAND TOTAL + PLACE ORDER -->
            <div class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <div class="flex justify-between font-medium text-base text-stone-800">
                <span>Grand Total</span>
                <span class="text-stone-900 font-semibold text-xl">${{ grandTotal.toFixed(2) }}</span>
              </div>

              <button
                @click="handlePlaceOrder"
                :disabled="processing"
                class="block w-full mt-6 bg-stone-900 text-white tracking-widest text-xs uppercase font-semibold py-3.5 rounded-full text-center hover:bg-[#D4AF37] transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-50"
              >
                {{ processing ? 'Placing Order...' : 'Place Order' }}
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- Success state -->
      <div v-else class="text-center py-16 md:py-24 max-w-md mx-auto">
        <div class="text-6xl mb-4">✨</div>
        <h2 class="text-2xl md:text-3xl font-playfair font-normal text-stone-800 mb-2">Order Placed!</h2>
        <p class="text-stone-500 text-sm md:text-base mb-8 leading-relaxed">
          Thank you{{ customer.firstName ? `, ${customer.firstName}` : '' }}! {{ successMessage }}
        </p>
        <router-link to="/products" class="inline-block bg-stone-900 text-white tracking-widest text-xs uppercase font-semibold px-8 py-3.5 rounded-full hover:bg-[#D4AF37] transition-all duration-300 shadow-sm hover:shadow-lg">
          Continue Shopping
        </router-link>
      </div>

    </div>
  </main>
</template>

<script setup>
import { reactive, computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useAuthStore } from '../composables/auth'
// Adjust this path to wherever checkout.js actually lives in your project
// (e.g. '../services/checkout' or '../api/checkout').
import { submitCheckout } from '../services/checkout'

const router = useRouter()
const cartStore = useCart()
const authStore = useAuthStore()

const allCartItems = computed(() => cartStore.cart.value)
const productItems = computed(() => cartStore.productItems.value)
const serviceItems = computed(() => cartStore.serviceItems.value)
const hasProducts = computed(() => productItems.value.length > 0)
const hasServices = computed(() => serviceItems.value.length > 0)

/* ===== Separate totals per group ===== */
const productSubtotal = computed(() =>
  productItems.value.reduce((s, i) => s + i.price * i.quantity, 0)
)
const productTax = computed(() => productSubtotal.value * 0.08)
const productTotal = computed(() => productSubtotal.value + productTax.value)

const serviceSubtotal = computed(() =>
  serviceItems.value.reduce((s, i) => s + i.price * i.quantity, 0)
)
const serviceTax = computed(() => serviceSubtotal.value * 0.08)
const serviceTotal = computed(() => serviceSubtotal.value + serviceTax.value)

const grandTotal = computed(() => productTotal.value + serviceTotal.value)

const customer = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'Lebanon',
  address: ''
})

// Card payment is disabled in the UI for now — the backend only accepts a
// single payment_method_id per order, so real product/service split
// payment isn't possible yet. Both sides are locked to cash until osimart
// adds a proper split-payment field.
const productPaymentMethod = ref('cod')
const servicePaymentMethod = ref('instore')

const processing = ref(false)
const error = ref('')
const orderComplete = ref(false)
const successMessage = ref('')

function fillCustomerInformation(user) {
  if (!user) return

  const fallbackName = (user.name || '').trim().split(/\s+/).filter(Boolean)
  customer.firstName = user.first_name || fallbackName[0] || ''
  customer.lastName = user.last_name || fallbackName.slice(1).join(' ') || ''

  customer.email = user.email || ''

  customer.phone =
    user.mobile ||
    user.phone ||
    ''
}

watch(
  () => authStore.currentUser,
  (user) => {
    fillCustomerInformation(user)
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {
  if (!allCartItems.value.length) {
    router.push('/cart')
  }
})

function validate() {
  if (customer.firstName.trim().length < 1) return 'Enter your first name'
  if (customer.lastName.trim().length < 1) return 'Enter your last name'
  customer.email = customer.email.trim().toLowerCase().replace(/\.{2,}/g, '.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) return 'Enter a valid email'
  if (customer.phone.trim().length < 8) return 'Enter a valid phone number'
  if (customer.country.trim().length < 2) return 'Enter your country'
  if (customer.address.trim().length < 5) return 'Enter your delivery address'
  return ''
}

async function handlePlaceOrder() {
  error.value = validate()
  if (error.value) return

  processing.value = true
  try {
    const serverCart = await cartStore.syncCartForCheckout()

    await submitCheckout({
      customer,
      productItems: productItems.value,
      serviceItems: serviceItems.value,
      productTotals: hasProducts.value
        ? { subtotal: productSubtotal.value, tax: productTax.value, total: productTotal.value }
        : undefined,
      serviceTotals: hasServices.value
        ? { subtotal: serviceSubtotal.value, tax: serviceTax.value, total: serviceTotal.value }
        : undefined,
      productPaymentMethod: productPaymentMethod.value,
      servicePaymentMethod: servicePaymentMethod.value,
      grandTotal: grandTotal.value,
      serverCart
    })

    const parts = []
    if (hasProducts.value) parts.push('Your products will be paid for on delivery.')
    if (hasServices.value) parts.push('Your service will be paid for in-store.')
    successMessage.value = parts.join(' ')

    if (hasServices.value) {
      localStorage.setItem('paymentConfirmed', 'true')
      router.push('/booking')
      return
    }

    await cartStore.clearCart()
    orderComplete.value = true
  } catch (e) {
    console.error('[CHECKOUT] order failed', e.response?.status, e.response?.data || e.message)
    const responseData = e.response?.data
    const firstFieldError = responseData && typeof responseData === 'object'
      ? Object.values(responseData).flat().find(Boolean)
      : ''
    error.value =
      responseData?.detail ||
      responseData?.cart?.[0] ||
      firstFieldError ||
      e.message ||
      'Something went wrong placing your order. Please try again.'
  } finally {
    processing.value = false
  }
}
</script>
