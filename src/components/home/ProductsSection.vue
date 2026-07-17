<template>
  <section id="products" class="py-24 bg-[#FAF8F5] overflow-hidden">
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

      <div v-if="isLoading" class="text-center py-12 text-stone-500 font-light text-sm tracking-wide">
        Loading exquisite collections...
      </div>

      <div v-else-if="recommendedProducts.length" class="relative w-full overflow-hidden py-4">
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
                :src="product.image || '/images/placeholder.jpeg'" 
                :alt="product.name" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span v-if="product.subcategory" class="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[9px] tracking-widest uppercase text-stone-500 font-medium">
                {{ product.subcategory }}
              </span>
              
              <button 
                @click.stop="handleWishlistToggle(product)"
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center transition-colors duration-300 z-20 cursor-pointer"
                :class="isItemInWishlist(product) ? 'text-red-500' : 'text-stone-400 hover:text-stone-900'"
              >
                <i :class="isItemInWishlist(product) ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>

            <div class="px-1 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-playfair text-base md:text-lg text-stone-900 mb-1 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-1">
                  {{ product.name }}
                </h3>
                <p class="text-stone-400 text-xs font-light tracking-wide mb-4 line-clamp-1">
                  {{ product.desc || 'Exclusive premium formula' }}
                </p>
              </div>
              
              <div class="flex items-center justify-between border-t border-stone-100 pt-4 mt-auto">
                <span class="text-stone-900 font-medium text-sm font-serif">
                  ${{ Number(product.price).toFixed(2) }}
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
import { ref, onMounted } from 'vue'
import { useWishlistStore } from '../../composables/wishlist'
import { useCart } from '../../composables/useCart'
import { useAuthStore } from '../../composables/auth'
import { loadStudioProducts } from '../../services/product.js'

const wishlistStore = useWishlistStore()
const cartStore = useCart()
const authStore = useAuthStore()

const recommendedProducts = ref([])
const addingToCartId = ref(null)
const isLoading = ref(true)

// Helper function to shuffle array items randomly (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const normalizeVariants = (variants) => {
  if (!variants) return []
  return Array.isArray(variants) ? variants : [variants]
}

const fetchRecommended = async () => {
  try {
    isLoading.value = true
    const liveData = await loadStudioProducts()

    if (Array.isArray(liveData) && liveData.length > 0) {
      // 1. Filter out services AND filter out items with multiple variants
      let filteredProducts = liveData.filter(item => {
        const catName = item.categories?.[0]?.category?.name?.toLowerCase() || ''
        const isService = catName.includes('service')
        
        const variants = normalizeVariants(item.product_variants)
        const variantsCount = variants.length
        
        // If it has more than 1 variant, it means it has options (like multiple sizes/colors)
        // Also check if the lone variant contains a distinct sub-title option (e.g. "Default Title" means no real custom variant options)
        const hasRealVariants = variantsCount > 1 || (variantsCount === 1 && variants[0].title && variants[0].title !== 'Default Title' && variants[0].title !== 'Default')

        return !isService && !hasRealVariants
      })

      // 2. Shuffle the variant-free products to randomize order
      filteredProducts = shuffleArray(filteredProducts)

      // 3. Map only the first 8 variant-free random products
      recommendedProducts.value = filteredProducts
        .slice(0, 8) 
        .map((item, index) => {
          const initialVariant = normalizeVariants(item.product_variants)[0]
          const rawImagePath = item.main_image?.path || item.image_url || item.image
          let finalImage = '/images/p1.jpg'
          
          if (rawImagePath) {
            finalImage = rawImagePath.startsWith('http')
              ? rawImagePath
              : `https://api.osimart.com/${rawImagePath.replace(/^\//, '')}`
          }

          let finalPrice = 0.00
          if (item.price_range) {
            finalPrice = parseFloat(item.price_range.split('-')[0].trim()) || 0.00
          } else if (item.price) {
            finalPrice = parseFloat(item.price)
          }

          return {
            id: item.id,
            variantId: initialVariant?.id,
            name: item.name || 'Premium Item',
            subcategory: item.categories?.[0]?.category?.name || 'Luxury',
            desc: item.description || item.short_description || '',
            price: finalPrice,
            image: finalImage,
            uniqueId: `recom-${item.id}-${index}`
          }
        })
    }
  } catch (error) {
    console.warn('Failed to load recommended products:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRecommended()
})

/* ========================================================
    🛒 CART / WISHLIST HANDLERS
=========================================================== */
const getProductVariantId = (product) => product.variantId || product.id

const isItemInWishlist = (product) => {
  if (!wishlistStore.items) return false
  const variantId = typeof product === 'object' ? getProductVariantId(product) : product
  return wishlistStore.items.some(item => item.id === variantId || item.variantId === variantId)
}

const handleWishlistToggle = (product) => {
  const variantId = getProductVariantId(product)

  if (isItemInWishlist(product)) {
    wishlistStore.removeFromWishlist(variantId)
  } else {
    wishlistStore.addToWishlist({
      id: product.id,
      variantId,
      name: product.name,
      price: product.price,
      image: product.image,
      badge: 'Luxury'
    })
  }
}

const handleAddToCart = async (product) => {
  if (typeof cartStore.addToCart !== 'function') return

  const variantId = product.variantId || product.id
  if (!variantId) {
    console.error("[HOME PRODUCTS] add to cart failed: no variant id for", product)
    return
  }

  addingToCartId.value = product.id

  try {
    await cartStore.addToCart(
      {
        id: product.id,
        variantId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        type: 'product'
      },
      authStore.isAuthenticated,
      authStore.openAuthModal
    )
  } catch (err) {
    console.error("Error dispatching add to cart action:", err)
  } finally {
    setTimeout(() => {
      addingToCartId.value = null
    }, 1000)
  }
}
</script>

<style scoped>
@keyframes infiniteScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 12px)); }
}
.animate-infinite-carousel {
  display: flex;
  animation: infiniteScroll 25s linear infinite;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
