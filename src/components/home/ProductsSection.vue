<template>
  <section id="products" class="py-24 bg-[#FAF8F5]  overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="text-center mb-16 fade-on-scroll">
        <span class="text-[#D4AF37] tracking-[0.3em] text-xs uppercase font-semibold block mb-3">
          Selected For You
        </span>
        <h2 class="font-playfair text-4xl md:text-5xl font-light text-stone-900 mb-4 tracking-tight">
          Recommended For You
        </h2>
        <div class="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-6"></div>
        <p class="text-stone-600 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
         Elevate your aura with treatments and specialized formulas favored by our masters
        </p>
      </div>

      <div class="relative w-full overflow-hidden py-4">
        <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#faf8f5] to-transparent z-10 pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#faf8f5] to-transparent z-10 pointer-events-none"></div>

        <div class="flex gap-6 animate-infinite-carousel hover:[animation-play-state:paused] w-max">
          
          <div 
            v-for="product in [...recommendedProducts, ...recommendedProducts]" 
            :key="product.uniqueId"
            class="w-[280px] md:w-[310px] group relative flex flex-col justify-between bg-white border border-stone-100 p-3 shadow-xs hover:shadow-xl transition-all duration-500 shrink-0"
          >
            <div class="w-full aspect-[3/4] bg-stone-50 relative overflow-hidden mb-4">
              <img 
                :src="product.image" 
                :alt="product.name" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[9px] tracking-widest uppercase text-stone-500 font-medium">
                {{ product.subcategory }}
              </span>
              
              <button 
                @click.stop="handleWishlistToggle(product)"
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center transition-colors duration-300 z-20 cursor-pointer"
                :class="isItemInWishlist(product.id) ? 'text-red-500' : 'text-stone-400 hover:text-stone-900'"
              >
                <i :class="isItemInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>

            <div class="px-1 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-playfair text-base md:text-lg text-stone-900 mb-1 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-1">
                  {{ product.name }}
                </h3>
                <p class="text-stone-400 text-xs font-light tracking-wide mb-4 line-clamp-1">
                  {{ product.desc }}
                </p>
              </div>
              
              <div class="flex items-center justify-between border-t border-stone-100 pt-4 mt-auto">
                <span class="text-stone-900 font-medium text-sm font-serif">
                  ${{ product.price.toFixed(2) }}
                </span>
                
                <button 
                  @click.stop="handleAddToCart(product)"
                  class="text-xs tracking-widest uppercase font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  :class="addingToCartId === product.id ? 'text-emerald-600 scale-95' : 'text-stone-900 hover:text-[#D4AF37]'"
                  :disabled="addingToCartId === product.id"
                >
                  <i :class="addingToCartId === product.id ? 'fas fa-check-circle' : 'fas fa-shopping-bag text-[11px]'"></i>
                  {{ addingToCartId === product.id ? 'Added' : 'Add to Cart' }}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div class="mt-16 text-center fade-on-scroll">
        <RouterLink 
          :to="{ name: 'products' }"
          class="inline-flex items-center gap-2 text-stone-800 hover:text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-medium group transition-colors duration-300 border-b border-stone-200 pb-1"
        >
          See all Collections 
          <i class="fas fa-arrow-right text-[10px] transition-transform duration-300 group-hover:translate-x-1"></i>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useWishlistStore } from '../../composables/wishlist'
import { useCart } from '../../composables/useCart'
import { useAuthStore } from '../../composables/auth'

// Stores Hook Connectors
const wishlistStore = useWishlistStore()
const cartStore = useCart()
const authStore = useAuthStore()

const addingToCartId = ref(null)

// Restructured Dataset to integrate natively with your inventory scheme layout
const staticData = [
  {
    id: 110,
    category: 'Hair',
    subcategory: 'Hair oils',
    name: "Oriko Hair Treatment Oil",
    desc: "Restores deep structural shine and active strand strength.",
    price: 18.00,
    image: "/images/ho1.jpeg"
  },
  {
    id: 211,
    category: 'Nails',
    subcategory: 'Nail Care',
    name: "Premium Cuticle Strength Oil",
    desc: "Nourishing formula for healthy, high-gloss strong profiles.",
    price: 28.00,
    image: "/images/nc1.jpg"
  },
  {
    id: 308,
    category: 'Makeup',
    subcategory: 'Face',
    name: "Luxury Soft-Focus Velvet Complexion",
    desc: "Flawless weightless base glow and optimal hydration boost.",
    price: 22.00,
    image: "/images/mf1.jpeg"
  },
  {
    id: 401,
    category: 'Massage',
    subcategory: 'Face rollers',
    name: "Sculpting Jade Gua Sha",
    desc: "Restorative deep tissue cooling facial framing tool.",
    price: 28.00,
    image: "/images/fmf1.jpeg"
  }
]

// Appends explicit layout IDs to prevent duplication v-for keys clashes inside infinite track loops
const recommendedProducts = staticData.map((item, index) => ({
  ...item,
  uniqueId: `recom-${item.id}-${index}`
}))

/* ========================================================
   🛒 STORE CONNECTOR HANDLERS
=========================================================== */
const isItemInWishlist = (productId) => {
  if (!wishlistStore.items) return false
  return wishlistStore.items.some(item => item.id === productId)
}

const handleWishlistToggle = (product) => {
  if (isItemInWishlist(product.id)) {
    wishlistStore.removeFromWishlist(product.id)
  } else {
    wishlistStore.addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      badge: 'Luxury'
    })
  }
}

const handleAddToCart = (product) => {
  addingToCartId.value = product.id
  
  cartStore.addToCart(
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      type: 'product'
    },
    authStore.isAuthenticated,
    authStore.openAuthModal
  )

  setTimeout(() => {
    addingToCartId.value = null
  }, 1000)
}
</script>

<style scoped>
/* Infinite Continuous Auto Scroll Animation Logic */
@keyframes infiniteScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 12px)); /* Perfectly loops right through halfway offset spacing */
  }
}

.animate-infinite-carousel {
  display: flex;
  animation: infiniteScroll 25s linear infinite;
}

/* Line clamping to protect luxury alignment card consistency sizes */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>