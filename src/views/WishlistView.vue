<template>
  <main class="bg-secondary pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Page Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-stone-200 pb-5 mb-8 md:mb-12 gap-4">
        <div class="text-left">
          <h1 class="font-playfair text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 mb-2 tracking-wide">My Wishlist</h1>
          <div class="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-3"></div>
          <p class="text-stone-500 text-xs md:text-sm tracking-wider uppercase font-medium">{{ wishlistStore.itemCount }} {{ wishlistStore.itemCount === 1 ? 'item' : 'items' }} saved</p>
        </div>
        
        <!-- Clear All Button (Aligned Right) -->
        <div v-if="wishlistStore.items.length > 0" class="shrink-0">
          <button 
            @click="clearWishlist"
            class="group flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 hover:text-red-600 bg-white border border-stone-200 hover:border-red-200 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <i class="fas fa-trash-alt text-[10px] text-stone-400 group-hover:text-red-500 transition-colors"></i> 
            Clear Wishlist
          </button>
        </div>
      </div>
      
      <!-- Wishlist Items Grid / Empty State View -->
      <transition name="fade" mode="out-in">
        <!-- Empty State -->
        <div v-if="wishlistStore.items.length === 0" class="text-center py-16 md:py-24 max-w-md mx-auto">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-400 mb-5">
            <i class="far fa-heart text-2xl"></i>
          </div>
          <h2 class="text-xl md:text-2xl font-playfair font-normal text-stone-800 mb-2">Your wishlist is empty</h2>
          <p class="text-stone-500 text-sm md:text-base mb-8 leading-relaxed">Save your favorite items here to view them anytime and make them yours.</p>
          <router-link to="/products" class="inline-block bg-stone-900 text-white tracking-widest text-xs uppercase font-semibold px-8 py-3.5 rounded-full hover:bg-[#D4AF37] transition-all duration-300 shadow-sm hover:shadow-lg">
            Start Shopping
          </router-link>
        </div>
        
        <!-- Wishlist Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <div v-for="item in wishlistStore.items" :key="item.id" class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-stone-100">
            <!-- Product Image -->
            <router-link :to="`/product/${item.id}`" class="block relative overflow-hidden aspect-square bg-stone-50">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition duration-700 group-hover:scale-105">
              <div v-if="item.badge" class="absolute top-2 left-2 bg-[#D4AF37] text-white px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm">
                {{ item.badge }}
              </div>
              <button 
                @click.prevent="removeFromWishlist(item.id)" 
                class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 md:opacity-0 hover:!bg-red-50 hover:text-red-600 text-stone-500 transition-all duration-300 flex items-center justify-center shadow-sm"
              >
                <i class="fas fa-trash-alt text-xs"></i>
              </button>
            </router-link>
            
            <!-- Product Info -->
            <div class="p-3 md:p-4 flex flex-col flex-grow">
              <div class="flex-grow mb-2">
                <router-link :to="`/product/${item.id}`" class="block">
                  <h3 class="font-playfair font-medium text-stone-800 text-sm md:text-base mb-1 hover:text-[#D4AF37] transition duration-300 line-clamp-2 leading-snug">{{ item.name }}</h3>
                </router-link>
              </div>
              
              <div>
                <p class="text-stone-900 font-semibold text-base md:text-lg mb-3">${{ item.price.toLocaleString() }}</p>
                
                <div class="flex gap-2">
                  <button 
                    @click="addToCart(item)" 
                    class="flex-1 bg-stone-900 hover:bg-[#D4AF37] text-white py-2 rounded-full font-medium transition-all duration-300 text-xs tracking-wider uppercase"
                  >
                    <i class="fas fa-shopping-bag mr-1.5 text-[10px]"></i> Add To Bag
                  </button>
                  <button 
                    @click="removeFromWishlist(item.id)" 
                    class="md:hidden px-3 py-2 rounded-full border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 transition text-xs"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      
    </div>
  </main>
</template>

<script setup>
import { useWishlistStore } from '../composables/wishlist'
import { useCart } from "../composables/useCart"
import { useAuthStore } from '../composables/auth'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const wishlistStore = useWishlistStore()
const cartStore = useCart()
const authStore = useAuthStore()
useScrollAnimation()

const addToCart = (product) => {
  cartStore.addToCart(
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    },
    authStore.isAuthenticated,
    authStore.openAuthModal
  )
}

const removeFromWishlist = (productId) => {
  wishlistStore.removeFromWishlist(productId)
}

const clearWishlist = () => {
  if (confirm('Are you sure you want to clear your entire wishlist?')) {
    if (typeof wishlistStore.clearWishlist === 'function') {
      wishlistStore.clearWishlist()
    } else {
      wishlistStore.items = []
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Elegant Vue transition effects for layout shifts */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>