<template>
  <main class="bg-secondary pt-32 pb-20 px-5">
    <div class="max-w-7xl mx-auto">

      <div class="text-center mb-12">
        <h1 class="font-playfair text-4xl md:text-5xl font-light text-stone-800 mb-3">
          Shopping Cart
        </h1>
        <div class="w-20 h-0.5 bg-[#D4AF37] mx-auto rounded-full"></div>
      </div>

      <div v-if="!allCartItems.length" class="text-center py-16 text-stone-400">
        <i class="fas fa-shopping-bag text-5xl mb-4 opacity-50"></i>
        <p>Your cart is empty</p>

        <router-link
          to="/products"
          class="inline-block mt-4 px-6 py-2 bg-[#D4AF37] text-white rounded-full text-sm hover:bg-amber-700 transition"
        >
          Continue Shopping
        </router-link>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-10">

        <div class="flex-1 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between">
          <div class="divide-y divide-amber-100">

            <div
              v-for="item in productItems"
              :key="'product-' + item.id"
              class="p-5 flex gap-4 items-center"
            >
              <div class="w-24 h-24 bg-stone-50 rounded-xl p-1 flex items-center justify-center flex-shrink-0 border border-stone-100">
                <img 
                  :src="item.image || item.image_url || item.imageUrl" 
                  :alt="item.name"
                  class="max-w-full max-h-full object-contain rounded-lg" 
                />
              </div>

              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-semibold text-stone-800">
                    {{ item.variantName ? item.baseName : item.name }}
                  </h3>
                  <span 
                    v-if="item.variantName" 
                    class="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded-md font-medium"
                  >
                    {{ item.variantName }}
                  </span>
                </div>

                <p class="text-amber-700 font-bold mt-1">${{ item.price.toLocaleString() }}</p>

                <div class="flex items-center gap-3 mt-2">
                  <button
                    @click="decreaseQty(item.id)"
                    class="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-600 hover:text-white transition-colors"
                  >
                    -
                  </button>

                  <span class="w-8 text-center font-medium">{{ item.quantity }}</span>

                  <button
                    @click="increaseQty(item.id)"
                    class="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-600 hover:text-white transition-colors"
                  >
                    +
                  </button>

                  <button
                    @click="removeItem(item.id)"
                    class="ml-4 text-stone-400 hover:text-red-500 text-sm transition-colors"
                  >
                    <i class="fas fa-trash-alt"></i> Remove
                  </button>
                </div>
              </div>

              <div class="text-right font-bold text-stone-800">
                ${{ (item.price * item.quantity).toLocaleString() }}
              </div>
            </div>

            <div
              v-for="item in serviceItems"
              :key="'service-' + item.id"
              class="p-5 flex justify-between items-center bg-amber-50/30"
            >
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-semibold text-stone-800">
                    {{ item.variantName ? item.baseName : item.name }}
                  </h3>
                  <span 
                    v-if="item.variantName" 
                    class="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded-md font-medium"
                  >
                    {{ item.variantName }}
                  </span>
                </div>
                <p class="text-amber-700 font-bold mt-1">${{ item.price.toLocaleString() }}</p>
              </div>

              <button
                @click="removeItem(item.id)"
                class="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>

          </div>

          <div class="p-4 bg-stone-50 border-t border-amber-100 flex justify-end">
            <button 
              @click="handleClearCart"
              class="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <i class="fas fa-dumpster"></i> Clear Cart
            </button>
          </div>
        </div>

        <div class="lg:w-96">
          <div class="bg-white rounded-2xl shadow-md p-6 sticky top-32">
            <h3 class="text-xl font-playfair font-semibold mb-4">Order Summary</h3>

            <div class="space-y-3 border-b pb-4 text-stone-600">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="font-medium text-stone-800">${{ subtotal.toLocaleString() }}</span>
              </div>

              <div class="flex justify-between">
                <span>Tax (8%)</span>
                <span class="font-medium text-stone-800">${{ tax.toFixed(2) }}</span>
              </div>
            </div>

            <div class="flex justify-between font-bold text-lg pt-4 text-stone-800">
              <span>Total</span>
              <span class="text-amber-700">${{ total.toFixed(2) }}</span>
            </div>

            <button 
              @click="handleCheckout" 
              class="block w-full mt-6 bg-amber-600 text-white py-3 rounded-full text-center hover:bg-amber-700 transition transform hover:scale-[1.01] cursor-pointer font-medium text-sm"
            >
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useAuthStore } from '../composables/auth'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCart()

const handleCheckout = () => {
  if (!authStore.isAuthenticated) {
    if (typeof authStore.openAuthModal === 'function') {
      authStore.openAuthModal('login')
    } else {
      alert("Please log in to proceed to checkout.")
    }
  } else {
    router.push('/checkout').catch(() => {
      window.location.href = '/checkout'
    })
  }
}

async function handleClearCart() {
  if (confirm("Are you sure you want to clear all items from your cart?")) {
    await cartStore.clearCart()
  }
}

/* ====================================
    DATA MAPPING (Unwrapped reactive refs)
==================================== */
const allCartItems = computed(() => cartStore.cart.value)
const productItems = computed(() => cartStore.productItems.value)
const serviceItems = computed(() => cartStore.serviceItems.value)

const subtotal = computed(() => cartStore.totalPrice.value)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + tax.value)

/* ====================================
    ACTIONS
==================================== */
async function increaseQty(id) {
  await cartStore.increaseQuantity(id)
}

async function decreaseQty(id) {
  await cartStore.decreaseQuantity(id)
}

async function removeItem(id) {
  await cartStore.removeFromCart(id)
}
</script>