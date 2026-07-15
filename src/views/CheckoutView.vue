<template>
  <main class="bg-secondary pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 min-h-screen">
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
                <input v-model="customer.name" placeholder="Full Name"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                <input v-model="customer.email" placeholder="Email"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                <input v-model="customer.phone" placeholder="Phone"
                  class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
              </div>
            </div>

            <!-- PRODUCT PAYMENT -->
            <div v-if="hasProducts" class="border-t border-stone-100 pt-6">
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide">Product Payment</h3>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="productPaymentMethod = 'card'"
                  class="p-4 border rounded-xl text-sm font-medium transition"
                  :class="productPaymentMethod === 'card' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-stone-200 text-stone-600 hover:border-[#D4AF37]'"
                >
                  Pay Now (Card)
                </button>
                <button
                  @click="productPaymentMethod = 'cod'"
                  class="p-4 border rounded-xl text-sm font-medium transition"
                  :class="productPaymentMethod === 'cod' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-stone-200 text-stone-600 hover:border-[#D4AF37]'"
                >
                  Pay on Delivery
                </button>
              </div>

              <!-- Delivery address only appears once COD is actually chosen -->
              <transition name="fade">
                <div v-if="productPaymentMethod === 'cod'" class="mt-4">
                  <input
                    v-model="customer.address"
                    placeholder="Delivery Address"
                    class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400"
                  />
                  <p class="text-xs text-stone-400 mt-2">We'll deliver your products and collect payment at your door.</p>
                </div>
              </transition>
            </div>

            <!-- SERVICE PAYMENT -->
            <div v-if="hasServices" class="border-t border-stone-100 pt-6">
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide">Service Payment</h3>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="servicePaymentMethod = 'card'"
                  class="p-4 border rounded-xl text-sm font-medium transition"
                  :class="servicePaymentMethod === 'card' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-stone-200 text-stone-600 hover:border-[#D4AF37]'"
                >
                  Pay Now (Card)
                </button>
                <button
                  @click="servicePaymentMethod = 'instore'"
                  class="p-4 border rounded-xl text-sm font-medium transition"
                  :class="servicePaymentMethod === 'instore' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-stone-200 text-stone-600 hover:border-[#D4AF37]'"
                >
                  Pay In-Store
                </button>
              </div>
              <transition name="fade">
                <p v-if="servicePaymentMethod === 'instore'" class="text-xs text-stone-400 mt-3">
                  You'll pay for your service at the studio when you arrive.
                </p>
              </transition>
            </div>

            <!-- CARD DETAILS (shown once, used for whichever side picked card) -->
            <transition name="fade">
              <div v-if="needsCard" class="border-t border-stone-100 pt-6">
                <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide">Card Details</h3>
                <div class="space-y-4">
                  <input v-model="payment.cardName" placeholder="Name on Card"
                    class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                  <input v-model="payment.cardNumber" maxlength="19" placeholder="Card Number"
                    class="w-full h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                  <div class="grid grid-cols-2 gap-4">
                    <input v-model="payment.expiry" placeholder="MM/YY" maxlength="5"
                      class="h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                    <input v-model="payment.cvv" placeholder="CVV" maxlength="4"
                      class="h-12 px-4 border border-stone-200 rounded-xl bg-stone-50/50 text-stone-800 placeholder:text-stone-400" />
                  </div>
                </div>
              </div>
            </transition>

            <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
          </div>

          <!-- Right: Two separate order summaries -->
          <div class="w-full lg:w-96 lg:sticky lg:top-32 space-y-6">

            <!-- PRODUCTS SUMMARY -->
            <div v-if="hasProducts" class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide border-b border-stone-100 pb-3">
                Products
                <span class="block text-xs uppercase tracking-wider text-stone-400 font-normal mt-1">
                  {{ productPaymentMethod === 'cod' ? 'Pay on Delivery' : 'Pay by Card' }}
                </span>
              </h3>

              <div class="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4">
                <div v-for="item in productItems" :key="item.id" class="flex justify-between text-sm text-stone-600">
                  <span class="truncate max-w-[65%]">
                     {{ item.baseName }}
                       <span v-if="item.variantName" class="text-stone-400">
    ({{ item.variantName }})
  </span>

                    <span v-if="item.quantity > 1" class="text-stone-400">× {{ item.quantity }}</span>
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
                  {{ servicePaymentMethod === 'instore' ? 'Pay In-Store' : 'Pay by Card' }}
                </span>
              </h3>

              <div class="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4">
                <div v-for="item in serviceItems" :key="item.id" class="flex justify-between text-sm text-stone-600">
                  <span class="truncate max-w-[65%]">
                      {{ item.baseName }}
                      <span v-if="item.variantName" class="text-stone-400">
    ({{ item.variantName }})
  </span>

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
          Thank you{{ customer.name ? `, ${customer.name}` : '' }}! {{ successMessage }}
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
import axios from 'axios'
import { useCart } from '../composables/useCart'
import { useAuthStore } from '../composables/auth'

const STORE_ID = '17781c3f-b746-4897-be7d-15d1ff48589e'

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

const customer = reactive({ name: '', email: '', phone: '', address: '' })
const payment = reactive({ cardName: '', cardNumber: '', expiry: '', cvv: '' })

const productPaymentMethod = ref('card') // 'card' | 'cod'
const servicePaymentMethod = ref('card') // 'card' | 'instore'

const needsCard = computed(() =>
  (hasProducts.value && productPaymentMethod.value === 'card') ||
  (hasServices.value && servicePaymentMethod.value === 'card')
)

const processing = ref(false)
const error = ref('')
const orderComplete = ref(false)
const successMessage = ref('')

function fillCustomerInformation(user) {
  if (!user) return

  customer.name =
    user.name ||
    `${user.first_name || ''} ${user.last_name || ''}`.trim()

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
  if (customer.name.trim().length < 2) return 'Enter your full name'
  if (!customer.email.includes('@')) return 'Enter a valid email'
  if (customer.phone.trim().length < 8) return 'Enter a valid phone number'
  if (hasProducts.value && productPaymentMethod.value === 'cod' && customer.address.trim().length < 5) {
    return 'Enter a delivery address for pay-on-delivery orders'
  }
  if (needsCard.value) {
    if (payment.cardNumber.replace(/\s/g, '').length < 12) return 'Enter a valid card number'
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) return 'Expiry must be MM/YY'
    if (payment.cvv.length < 3) return 'Enter a valid CVV'
  }
  return ''
}

function getAuthHeaders() {
  const token = localStorage.getItem('gg-token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function submitOrder() {
  const url = `https://api.osimart.com/store/apis/checkout/?store=${STORE_ID}`

  // NOTE: field names are best-guess — confirm against the real DRF schema and adjust if needed.
  const payload = {
    store: STORE_ID,
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone,
    delivery_address: (hasProducts.value && productPaymentMethod.value === 'cod') ? customer.address : undefined,

    product_items: productItems.value.map(item => ({
      item_id: item.variantId,
      quantity: item.quantity,
      price: item.price
    })),
    product_payment_method: hasProducts.value ? productPaymentMethod.value : undefined, // 'card' | 'cod'
    product_subtotal: hasProducts.value ? productSubtotal.value : undefined,
    product_tax: hasProducts.value ? productTax.value : undefined,
    product_total: hasProducts.value ? productTotal.value : undefined,

    service_items: serviceItems.value.map(item => ({
      item_id: item.variantId,
      quantity: item.quantity,
      price: item.price
    })),
    service_payment_method: hasServices.value ? servicePaymentMethod.value : undefined, // 'card' | 'instore'
    service_subtotal: hasServices.value ? serviceSubtotal.value : undefined,
    service_tax: hasServices.value ? serviceTax.value : undefined,
    service_total: hasServices.value ? serviceTotal.value : undefined,

    grand_total: grandTotal.value
  }

  const res = await axios.post(url, payload, {
    headers: getAuthHeaders(),
    withCredentials: true
  })

  return res.data
}

async function handlePlaceOrder() {
  error.value = validate()
  if (error.value) return

  processing.value = true
  try {
    await submitOrder()

    const parts = []
    if (hasProducts.value) {
      parts.push(productPaymentMethod.value === 'cod'
        ? 'Your products will be paid for on delivery.'
        : 'Your product payment has been processed.')
    }
    if (hasServices.value) {
      parts.push(servicePaymentMethod.value === 'instore'
        ? 'Your service will be paid for in-store.'
        : 'Your service payment has been processed.')
    }
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
    error.value = e.response?.data?.detail || 'Something went wrong placing your order. Please try again.'
  } finally {
    processing.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>