<template>
  <!-- Changed 'bg-secondary' to 'bg-stone-50' to force a clean light-mode backdrop -->
  <main class="bg-stone-50 pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
    <div class="max-w-7xl mx-auto">
      
      <div v-if="uiError" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex justify-between items-center">
        <span><strong>UI Notice:</strong> {{ uiError }}</span>
        <button @click="uiError = null" class="text-xs underline hover:no-underline font-semibold">Dismiss</button>
      </div>
      
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-stone-200 pb-5 mb-8 md:mb-12 gap-4">
        <div class="text-left">
          <h1 class="font-playfair text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 mb-2 tracking-wide">My Wishlist</h1>
          <div class="w-12 h-0.5 bg-[#D4AF37] rounded-full mb-3"></div>
          <p class="text-stone-500 text-xs md:text-sm tracking-wider uppercase font-medium">
            {{ wishlistStore.itemCount }} {{ wishlistStore.itemCount === 1 ? 'item' : 'items' }} saved
          </p>
        </div>
        
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
      
      <transition name="fade" mode="out-in">
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
        
        <div v-else class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <div v-for="item in wishlistStore.items" :key="item.id" class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-stone-100">
            
            <router-link :to="`/product/${item.productId || item.id}`" @click="logNavigation(item)" class="block relative overflow-hidden aspect-square bg-stone-50">
              <img :src="item.image" :alt="item.name" @error="handleImageLoadError(item, $event)" class="w-full h-full object-cover transition duration-700 group-hover:scale-105">
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
            
            <div class="p-3 md:p-4 flex flex-col flex-grow">
              <div class="flex-grow mb-2">
                <router-link :to="`/product/${item.productId || item.id}`" @click="logNavigation(item)" class="block">
                  <h3 class="font-playfair font-medium text-stone-800 text-sm md:text-base mb-1 hover:text-[#D4AF37] transition duration-300 line-clamp-2 leading-snug">{{ item.name }}</h3>
                </router-link>
              </div>
              
              <div>
                <p class="text-stone-900 font-semibold text-base md:text-lg mb-3">
                  ${{ typeof item.price === 'number' ? item.price.toLocaleString() : item.price }}
                </p>
                
                <div class="flex gap-2">
                  <button 
                    @click="addToCart(item)" 
                    :disabled="cartStore.loading"
                    class="flex-1 bg-stone-900 hover:bg-[#D4AF37] text-white py-2 rounded-full font-medium transition-all duration-300 text-xs tracking-wider uppercase disabled:bg-stone-400"
                  >
                    <span v-if="cartStore.loading"><i class="fas fa-spinner fa-spin mr-1"></i> Syncing...</span>
                    <span v-else><i class="fas fa-shopping-bag mr-1.5 text-[10px]"></i> Add To Bag</span>
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
import { ref, onMounted } from 'vue'
import { useWishlistStore } from '../composables/wishlist'
import { useCart } from "../composables/useCart"
import { useScrollAnimation } from '../composables/useScrollAnimation'

console.log("[WISH-VIEW] Script execution sequence initiated.")

const wishlistStore = useWishlistStore()
const cartStore = useCart()
const uiError = ref(null)

try {
  useScrollAnimation()
  console.log("[WISH-VIEW] Scroll Animations bound smoothly.")
} catch (e) {
  console.error("[WISH-VIEW ERROR] Scroll animation hook failed:", e.message)
}

onMounted(async () => {
  console.log("[WISH-VIEW] Component mounted to the DOM tree hierarchy.")
  console.log("[WISH-VIEW] Checking initial items footprint inside store context:", wishlistStore.items)
  
  // Explicitly check server data on load to clear up any discrepancies 
  try {
    await wishlistStore.fetchWishlist()
  } catch(err) {
    console.error("[WISH-VIEW ERROR] Fetch remote wishlist workflow failed during lifecycle integration:", err.message)
  }
})

const addToCart = async (product) => {
  console.log("[WISH-VIEW EVENT] User clicked 'Add to Bag' for data reference:", JSON.stringify(product, null, 2))
  uiError.value = null
  
  try {
    if (!product.variantId) {
      throw new Error(`Item configuration lacks explicit product variant unique handles (variantId). Cannot bind to cart context safely.`)
    }
    
    await cartStore.addToCart(product)
    console.log("[WISH-VIEW EVENT SUCCESS] Add to bag processing loop resolved affirmatively.")
  } catch (err) {
    console.error("[WISH-VIEW ADD TO BAG ERROR INTERCEPTION]:", err.message)
    uiError.value = `Could not move item to bag: ${err.message}`
  }
}

const removeFromWishlist = async (productId) => {
  console.log(`[WISH-VIEW EVENT] User clicked deletion removal trigger for variant ID reference: ${productId}`)
  try {
    await wishlistStore.removeFromWishlist(productId)
    console.log("[WISH-VIEW EVENT SUCCESS] Removal mutation resolved successfully.")
  } catch (err) {
    console.error("[WISH-VIEW REMOVE ERROR INTERCEPTION]:", err.message)
    uiError.value = `Could not drop item from your wishlist: ${err.message}`
  }
}

const clearWishlist = async () => {
  console.log("[WISH-VIEW EVENT] Clear Wishlist click handler fired.")
  uiError.value = null

  if (confirm('Are you sure you want to clear your entire wishlist?')) {
    try {
      await wishlistStore.clearWishlist()
      console.log("[WISH-VIEW EVENT SUCCESS] Entire storage container cleared.")
    } catch (err) {
      console.error("[WISH-VIEW CLEAR ERROR INTERCEPTION]:", err.message)
      uiError.value = `Failed to completely wipe wishlist elements: ${err.message}`
    }
  }
}

const logNavigation = (item) => {
  console.log(`[WISH-VIEW NAVIGATE] Routing application view context targeting product details path. ID: ${item.productId}, Variant Identity: ${item.variantId}`)
}

const handleImageLoadError = (item, event) => {
  console.error(`[WISH-VIEW IMAGE CRASHED] Asset reference source failed loading workflow for product: "${item.name}". URL target source path was: ${item.image}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>