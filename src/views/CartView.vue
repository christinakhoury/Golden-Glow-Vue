<template>
  <main class="bg-[#F8F4EF] pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
    <div class="max-w-7xl mx-auto">

      <!-- Page Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-stone-200 pb-5 mb-8 md:mb-12 gap-4">
        <div class="text-left">
          <h1 class="font-playfair text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 mb-2 tracking-wide">Shopping Bag</h1>
          <div class="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-3"></div>
          <p class="text-stone-500 text-xs md:text-sm tracking-wider uppercase font-medium">
            {{ allCartItems.length }} {{ allCartItems.length === 1 ? 'item' : 'items' }} in your bag
          </p>
        </div>

        <div v-if="allCartItems.length > 0" class="shrink-0">
          <button 
            @click="handleClearCart"
            class="group flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 hover:text-red-600 bg-white border border-stone-200 hover:border-red-200 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <i class="fas fa-trash-alt text-[10px] text-stone-400 group-hover:text-red-500 transition-colors"></i> 
            Clear Bag
          </button>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="!allCartItems.length" class="text-center py-16 md:py-24 max-w-md mx-auto">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-400 mb-5">
            <i class="far fa-shopping-bag text-2xl"></i>
          </div>
          <h2 class="text-xl md:text-2xl font-playfair font-normal text-stone-800 mb-2">Your bag is empty</h2>
          <p class="text-stone-500 text-sm md:text-base mb-8 leading-relaxed">Add pieces from our collection to your shopping bag to make them yours.</p>
          <router-link to="/products" class="inline-block bg-stone-900 text-white tracking-widest text-xs uppercase font-semibold px-8 py-3.5 rounded-full hover:bg-[#D4AF37] transition-all duration-300 shadow-sm hover:shadow-lg">
            Continue Shopping
          </router-link>
        </div>

        <div v-else class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          <div class="flex-1 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden w-full">
            <div class="divide-y divide-stone-100">

              <div
                v-for="item in productItems"
                :key="'product-' + item.id"
                class="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div class="flex gap-4 items-center flex-1">
                  <div class="w-20 h-20 md:w-24 md:h-24 bg-stone-50 rounded-xl p-1.5 flex items-center justify-center flex-shrink-0 border border-stone-100">
                    <img 
                      :src="item.image || item.image_url || item.imageUrl" 
                      :alt="item.name"
                      class="max-w-full max-h-full object-contain rounded-lg" 
                    />
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="font-playfair font-medium text-stone-800 text-sm md:text-base truncate max-w-xs md:max-w-md">
                        {{ item.variantName ? item.baseName : item.name }}
                      </h3>
                      <span 
                        v-if="item.variantName" 
                        class="inline-block bg-stone-50 text-stone-500 text-[10px] px-2 py-0.5 border border-stone-200 rounded font-medium tracking-wider uppercase"
                      >
                        {{ item.variantName }}
                      </span>
                    </div>

                    <p class="text-[#D4AF37] font-semibold text-sm mt-1">${{ item.price.toLocaleString() }}</p>

                    <div class="flex items-center gap-4 mt-3">
                      <div class="flex items-center border border-stone-200 rounded-full bg-stone-50/50 p-0.5">
                        <button
                          @click="decreaseQty(item.id)"
                          class="w-7 h-7 rounded-full text-stone-500 hover:bg-stone-200 active:bg-stone-300 flex items-center justify-center transition-colors font-medium text-sm"
                        >
                          -
                        </button>
                        <span class="w-8 text-center text-xs font-semibold text-stone-700">{{ item.quantity }}</span>
                        <button
                          @click="increaseQty(item.id)"
                          class="w-7 h-7 rounded-full text-stone-500 hover:bg-stone-200 active:bg-stone-300 flex items-center justify-center transition-colors font-medium text-sm"
                        >
                          +
                        </button>
                      </div>

                      <button
                        @click="removeItem(item.id)"
                        class="text-stone-400 hover:text-red-500 text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 transition-colors duration-300"
                      >
                        <i class="fas fa-trash-alt text-[10px]"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div class="w-full sm:w-auto text-left sm:text-right font-semibold text-stone-800 border-t sm:border-t-0 border-stone-100 pt-3 sm:pt-0 mt-2 sm:mt-0">
                  <span class="inline sm:hidden text-xs text-stone-400 font-normal mr-1">Total:</span>${{ (item.price * item.quantity).toLocaleString() }}
                </div>
              </div>

              <div
                v-for="item in serviceItems"
                :key="'service-' + item.id"
                class="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between bg-stone-50/40"
              >
                <!-- LEFT SIDE -->
                <div class="flex gap-4 items-center flex-1">
                  
                  <!-- IMAGE -->
                  <div class="w-20 h-20 md:w-24 md:h-24 bg-stone-50 rounded-xl p-1.5 flex items-center justify-center flex-shrink-0 border border-stone-100">
                    <img 
                      :src="item.image || item.image_url || item.imageUrl" 
                      :alt="item.name"
                      class="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>

                  <!-- TEXT -->
                  <div class="flex-1 min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="font-playfair font-medium text-stone-800 text-sm md:text-base">
                        {{ item.variantName ? item.baseName : item.name }}
                      </h3>

                      <span 
                        v-if="item.variantName" 
                        class="inline-block bg-stone-50 text-stone-500 text-[10px] px-2 py-0.5 border border-stone-200 rounded font-medium tracking-wider uppercase"
                      >
                        {{ item.variantName }}
                      </span>
                    </div>

                    <p class="text-[#D4AF37] font-semibold text-sm mt-1">
                      ${{ item.price.toLocaleString() }}
                    </p>
                  </div>
                </div>

                <!-- REMOVE BUTTON -->
                <button
                  @click="removeItem(item.id)"
                  class="text-stone-400 hover:text-red-500 text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 transition-colors duration-300"
                >
                  <i class="fas fa-trash-alt text-[10px]"></i> Remove
                </button>
              </div>

            </div>
          </div>

          <div class="w-full lg:w-96 lg:sticky lg:top-32">
            <div class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <h3 class="text-lg font-playfair font-medium text-stone-800 mb-4 tracking-wide border-b border-stone-100 pb-3">Order Summary</h3>

              <div class="space-y-3 border-b border-stone-100 pb-4 text-sm text-stone-500">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span class="font-medium text-stone-800">${{ subtotal.toLocaleString() }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Tax (8%)</span>
                  <span class="font-medium text-stone-800">${{ tax.toFixed(2) }}</span>
                </div>
              </div>

              <div class="flex justify-between font-medium text-base pt-4 text-stone-800">
                <span>Total</span>
                <span class="text-stone-900 font-semibold text-lg">${{ total.toFixed(2) }}</span>
              </div>

              <button 
                @click="handleCheckout" 
                class="block w-full mt-6 bg-stone-900 text-white tracking-widest text-xs uppercase font-semibold py-3.5 rounded-full text-center hover:bg-[#D4AF37] transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>

        </div>
      </transition>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const cartStore = useCart()

// Guest checkout allowed — no auth gate here anymore
const handleCheckout = () => {
  router.push('/checkout').catch(() => {
    window.location.href = '/checkout'
  })
}

async function handleClearCart() {
  if (confirm("Are you sure you want to clear all items from your cart?")) {
    await cartStore.clearCart()
  }
}

const allCartItems = computed(() => cartStore.cart.value)
const productItems = computed(() => cartStore.productItems.value)
const serviceItems = computed(() => cartStore.serviceItems.value)

const subtotal = computed(() => cartStore.totalPrice.value)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + tax.value)

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>