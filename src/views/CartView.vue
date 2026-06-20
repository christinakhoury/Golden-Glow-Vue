<template>
  <main class="bg-secondary pt-32 pb-20 px-5">
    <div class="max-w-7xl mx-auto">

      <!-- PAGE TITLE -->
      <div class="text-center mb-12">
        <h1 class="font-playfair text-4xl md:text-5xl font-light text-stone-800 mb-3">
           Shopping Cart
        </h1>
        <div class="w-20 h-0.5 bg-[#D4AF37] mx-auto rounded-full"></div>
      </div>

      <!-- EMPTY CART -->
      <div v-if="!cartStore.items.length" class="text-center py-16 text-stone-400">
        <i class="fas fa-shopping-bag text-5xl mb-4 opacity-50"></i>
        <p>Your cart is empty</p>

        <router-link
          to="/products"
          class="inline-block mt-4 px-6 py-2 bg-[#D4AF37] text-white rounded-full text-sm hover:bg-amber-700 transition"
        >
          Continue Shopping
        </router-link>
      </div>

      <!-- CART CONTENT -->
      <div v-else class="flex flex-col lg:flex-row gap-10">

        <!-- LEFT: ITEMS -->
        <div class="flex-1 bg-white rounded-2xl shadow-md overflow-hidden">

          <div class="divide-y divide-amber-100">

            <!-- 🛒 PRODUCTS -->
            <div
              v-for="item in productItems"
              :key="item.id"
              class="p-5 flex gap-4 items-center"
            >
              <img :src="item.image" class="w-24 h-24 object-cover rounded-xl" />

              <div class="flex-1">
                <h3 class="font-semibold text-stone-800">
                  {{ item.name }}
                </h3>

                <p class="text-amber-700 font-bold mt-1">
                  ${{ item.price.toLocaleString() }}
                </p>

                <div class="flex items-center gap-3 mt-2">

                  <button
                    @click="decreaseQty(item.id)"
                    class="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-600 hover:text-white"
                  >
                    -
                  </button>

                  <span class="w-8 text-center">
                    {{ item.quantity }}
                  </span>

                  <button
                    @click="increaseQty(item.id)"
                    class="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-600 hover:text-white"
                  >
                    +
                  </button>

                  <button
                    @click="removeItem(item.id)"
                    class="ml-4 text-stone-400 hover:text-red-500 text-sm"
                  >
                    <i class="fas fa-trash-alt"></i> Remove
                  </button>

                </div>
              </div>

              <div class="text-right font-bold text-stone-800">
                ${{ (item.price * item.quantity).toLocaleString() }}
              </div>
            </div>

            <!-- 💼 SERVICES -->
            <div
              v-for="item in serviceItems"
              :key="item.id"
              class="p-5 flex justify-between items-center bg-amber-50/30"
            >
              <div>
                <h3 class="font-semibold text-stone-800">
                  {{ item.name }}
                </h3>
                <p class="text-sm text-stone-500">Service</p>
              </div>

              <div class="font-bold text-amber-700">
                ${{ item.price.toLocaleString() }}
              </div>

              <button
                @click="removeItem(item.id)"
                class="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>

          </div>
        </div>

        <!-- RIGHT: SUMMARY -->
        <div class="lg:w-96">

          <div class="bg-white rounded-2xl shadow-md p-6 sticky top-32">

            <h3 class="text-xl font-playfair font-semibold mb-4">
              Order Summary
            </h3>

            <div class="space-y-3 border-b pb-4">

              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>${{ subtotal.toLocaleString() }}</span>
              </div>

              <div class="flex justify-between">
                <span>Tax (8%)</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>

            </div>

            <div class="flex justify-between font-bold text-lg pt-4">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>

            <router-link
              to="/checkout"
              class="block w-full mt-6 bg-amber-600 text-white py-3 rounded-full text-center hover:scale-[1.02] transition"
            >
              Checkout
            </router-link>

          </div>

        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../composables/cart'

const cartStore = useCartStore()

// 🛒 PRODUCTS ONLY
const productItems = computed(() =>
  cartStore.items.filter(i => i.type === 'product')
)

// 💼 SERVICES ONLY
const serviceItems = computed(() =>
  cartStore.items.filter(i => i.type === 'service')
)

// ➕ INCREASE
function increaseQty(id) {
  const item = cartStore.items.find(i => i.id === id)
  if (item) item.quantity++
}

// ➖ DECREASE
function decreaseQty(id) {
  const item = cartStore.items.find(i => i.id === id)
  if (item && item.quantity > 1) item.quantity--
}

// 🗑 REMOVE
function removeItem(id) {
  cartStore.removeItem(id)
}

// 💰 SUBTOTAL
const subtotal = computed(() => {
  return cartStore.items.reduce((sum, item) => {
    const qty = item.type === 'product' ? item.quantity : 1
    return sum + item.price * qty
  }, 0)
})

// 🧾 TAX
const tax = computed(() => subtotal.value * 0.08)

// 💵 TOTAL
const total = computed(() => subtotal.value + tax.value)
</script>