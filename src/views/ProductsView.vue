<template>
  <main class="min-h-screen bg-[#faf8f5] text-stone-800 font-sans antialiased selection:bg-amber-200">
    
    <section class="pt-28 md:pt-36 pb-12 md:pb-16 px-5 bg-gradient-to-br from-[#f5e6d8] via-[#fdfbf7] to-[#efe0d2] relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_50%)]"></div>
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <span class="text-[#D4AF37] tracking-[0.3em] text-xs uppercase font-semibold block mb-3 animate-fade-scale">
          Maison De Beauté
        </span>
        <h1 class="font-playfair text-4xl md:text-6xl lg:text-7xl font-light text-stone-900 mb-4 tracking-tight animate-fade-scale">
          {{ activeCategory ? `${activeCategory} Collection` : 'Shop by Collection' }}
        </h1>
        <div class="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-6 animate-fade-scale"></div>
        <p class="text-stone-600 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed animate-fade-scale">
          {{ activeCategory ? `Elevate your ritual with bespoke items curated exclusively for ${activeCategory.toLowerCase()}.` : 'Find the perfect piece that elevates your aura, curated by elite luxury categories.' }}
        </p>

        <button 
          v-if="activeCategory"
          @click="clearCategory"
          class="mt-8 inline-flex items-center gap-2 group text-stone-500 hover:text-[#D4AF37] transition-colors duration-300 text-xs tracking-widest uppercase font-medium"
        >
          <i class="fas fa-arrow-left text-[10px] transition-transform duration-300 group-hover:-translate-x-1"></i>
          Back to All Collections
        </button>
      </div>
    </section>

    <transition name="fade-slide" mode="out-in">
      
      <div v-if="!activeCategory" key="dashboard" class="space-y-0">
        <section 
          v-for="(config, index) in categoryConfigs" 
          :key="config.name"
          class="py-16 md:py-24 overflow-hidden border-b border-stone-100 last:border-0"
          :class="index % 2 === 0 ? 'bg-[#fcfaf7]' : 'bg-gradient-to-r from-[#f5e6d8]/30 to-[#efe0d2]/30'"
        >
          <div class="max-w-7xl mx-auto px-5 md:px-8">
            <div class="flex flex-col md:flex-row items-center gap-12 md:gap-16 group" :class="index % 2 !== 0 ? 'md:flex-row-reverse' : ''">
              
              <div class="w-full md:w-1/2 relative fade-on-scroll" :class="index % 2 === 0 ? 'fade-right' : 'fade-left'">
                <div class="relative w-full max-w-md mx-auto aspect-[4/5] overflow-hidden rounded-sm group-hover:shadow-2xl transition-all duration-700 ease-out">
                  <div class="absolute inset-0 bg-black/5 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
                  <img
                    :src="`/images/${config.id}product.jpg`" 
                    :alt="config.name" 
                    class="w-full h-full object-cover transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
                  />
                  <div class="absolute inset-4 border border-white/20 pointer-events-none z-20 transition-all duration-500 group-hover:inset-6"></div>
                </div>
              </div>

              <div class="w-full md:w-1/2 flex items-center fade-on-scroll" :class="index % 2 === 0 ? 'fade-left pl-0 md:pl-8' : 'fade-right pr-0 md:pr-8'">
                <div class="max-w-md w-full text-left" :class="index % 2 !== 0 ? 'md:text-right' : ''">
                  <div class="flex items-center gap-2 mb-4" :class="index % 2 !== 0 ? 'md:justify-end' : ''">
                    <i class="fas fa-gem text-xs text-[#D4AF37] tracking-widest"></i>
                    <span class="text-[#D4AF37] tracking-[0.25em] text-[10px] uppercase font-bold">{{ config.tagline }}</span>
                  </div>
                  <h2 class="font-playfair text-3xl md:text-5xl font-light text-stone-900 leading-tight mb-4">
                    {{ config.name }} <span class="font-bold text-[#D4AF37]/90">Essentials</span>
                  </h2>
                  <p class="text-stone-600 font-light text-sm md:text-base leading-relaxed mb-6">
                    {{ config.description }}
                  </p>
                  
                  <div class="flex flex-wrap gap-2 mb-8" :class="index % 2 !== 0 ? 'md:justify-end' : ''">
                    <span 
                      v-for="sub in config.subcategories" 
                      :key="sub"
                      class="px-3 py-1 bg-white/80 border border-stone-200/60 text-stone-600 rounded-none text-[11px] font-light tracking-wide uppercase shadow-sm"
                    >
                      {{ sub }}
                    </span>
                  </div>

                  <div class="flex" :class="index % 2 !== 0 ? 'md:justify-end' : ''">
                    <button
                      @click="setActiveCategory(config.name)"
                      class="inline-flex items-center gap-3 bg-stone-900 hover:bg-[#D4AF37] text-white hover:text-white px-8 py-3.5 tracking-widest text-xs uppercase transition-all duration-500 rounded-none shadow-xl transform hover:-translate-y-0.5"
                    >
                      Explore {{ config.name }} Products
                      <i class="fas fa-chevron-right text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <div v-else key="filtered-showcase" class="max-w-7xl mx-auto px-5 md:px-8 py-12">
        
        <div class="flex flex-wrap justify-center gap-3 mb-16">
          <button 
            @click="activeSubcategory = null"
            class="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 border"
            :class="!activeSubcategory ? 'bg-stone-900 border-stone-900 text-white' : 'bg-transparent border-stone-200 text-stone-500 hover:border-stone-400'"
          >
            All Products
          </button>
          <button 
            v-for="sub in currentSubcategories" 
            :key="sub"
            @click="activeSubcategory = sub"
            class="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 border"
            :class="activeSubcategory === sub ? 'bg-stone-900 border-stone-900 text-white' : 'bg-transparent border-stone-200 text-stone-500 hover:border-stone-400'"
          >
            {{ sub }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="group relative flex flex-col justify-between bg-white border border-stone-100 p-3 shadow-sm hover:shadow-xl transition-all duration-500"
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
                @click="handleWishlistToggle(product)"
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center transition-colors duration-300 z-20"
                :class="isItemInWishlist(product.id) ? 'text-red-500' : 'text-stone-400 hover:text-stone-900'"
              >
                <i :class="isItemInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>

            <div class="px-1 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-playfair text-lg text-stone-900 mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {{ product.name }}
                </h3>
                <p class="text-stone-400 text-xs font-light tracking-wide mb-3 capitalize">
                  Premium curated selection
                </p>

                <div v-if="product.variants && product.variants.length > 1" class="mb-4">
  <span class="text-[10px] uppercase tracking-wider text-stone-400 block mb-1.5 font-medium">
    Select Option:
  </span>
  <div class="flex flex-wrap gap-1.5">
    <button
  v-for="variant in product.variants"
  :key="variant.id"
  @click="product.selectedVariant = variant"
  class="px-2.5 py-1 text-[11px] font-light tracking-wide border transition-all duration-300 rounded-none relative"
  :class="product.selectedVariant?.id === variant.id 
    ? 'border-stone-900 bg-stone-900 text-white font-normal shadow-xs' 
    : 'border-stone-200 text-stone-600 bg-stone-50/50 hover:border-stone-400'"
>
  <!-- FIXED: now uses the same shared resolver as cart/wishlist, so the label
       shown here always matches what gets saved -->
  {{ getVariantLabel(variant) }}
</button>
  </div>
</div>
              </div>
              
              <div class="flex items-center justify-between border-t border-stone-100 pt-4 mt-auto">
                <span class="text-stone-900 font-medium text-sm font-serif">
                  ${{ (product.selectedVariant ? parseFloat(product.selectedVariant.price) : product.price).toFixed(2) }}
                </span>
                
                <button 
                  @click="handleAddToCart(product)"
                  class="text-xs tracking-widest uppercase font-medium transition-all duration-300 flex items-center gap-1.5"
                  :class="[
                    addingToCartId === product.id ? 'text-emerald-600 scale-95' : 'text-stone-900 hover:text-[#D4AF37]',
                    (!product.selectedVariant && product.variants && product.variants.length > 1) ? 'opacity-60 text-stone-400' : ''
                  ]"
                  :disabled="addingToCartId === product.id"
                >
                  <i :class="addingToCartId === product.id ? 'fas fa-check-circle' : 'fas fa-shopping-bag text-[11px]'"></i>
                  <span>
                    {{ 
                      addingToCartId === product.id 
                        ? 'Added' 
                        : (!product.selectedVariant && product.variants && product.variants.length > 1) 
                          ? 'Select Option' 
                          : 'Add to Cart' 
                    }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="text-center py-24 border border-dashed border-stone-200">
          <p class="text-stone-400 font-light text-sm">No exclusive selections available matching this category segment right now.</p>
        </div>
      </div>
    </transition>

  </main>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useWishlistStore } from '../composables/wishlist'
import { useCart } from '../composables/useCart'
import { useAuthStore } from '../composables/auth'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { loadStudioProducts } from '../services/product.js'

/* ================= STORES ================= */
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()
const cartStore = useCart()

/* ================= STATE ================= */
const activeCategory = ref(null)
const activeSubcategory = ref(null)
const products = ref([])
const loading = ref(true)
const addingToCartId = ref(null)

/* ================= NORMALIZER ================= */
const normalize = (str) =>
  (str || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')

/* ================= VARIANT LABEL RESOLVER (FIXED) =================
   Single source of truth for "what do we call this variant".
   Previously the option button, handleAddToCart, and handleWishlistToggle
   each checked a different subset of possible API field names, so the
   label shown on the button could silently differ from what got saved
   into the cart or wishlist. Now everything calls this one function. */
const getVariantLabel = (variant) => {
  if (!variant) return ''
  return (
    variant.value ||
    variant.attribute_value ||
    variant.option_value ||
    variant.attribute_values?.[0]?.value ||
    variant.values?.[0]?.name ||
    variant.title ||
    variant.name ||
    'Premium Option'
  )
}

// Core Dataset Configuration
const categoryConfigs = [
  {
    id: 'hair',
    name: 'Hair',
    tagline: 'Timeless Hair Care',
    description: 'Discover curated essentials designed to nourish, protect and restore ultimate strength into every dynamic strand.',
    subcategories: ['Hair Oils', 'Dry Shampoo', 'Hair Mists','Accessories']
  },
  {
    id: 'nails',
    name: 'Nails',
    tagline: 'Symbol of Pure Elegance',
    description: 'Premium absolute nail treatments and master-grade apparatus designed to clean, sculpt and transform every profile view.',
    subcategories: ['Press On Nails', 'Nail Care', 'Nails Tools']
  },
  {
    id: 'makeup',
    name: 'Makeup',
    tagline: 'Architectural Framing Beauty',
    description: 'From velvet soft-focus structure complexions to high-impact pigmented shadows, create structural harmony.',
    subcategories: ['Eyes', 'Lips', 'Face', 'Makeup Tools']
  },
  {
    id: 'massage',
    name: 'Massage',
    tagline: 'Silk Healing Touch Rituals',
    description: 'Elevate your sensory private environments. Deep tissue restorative botanical essences matching thermal devices.',
    subcategories: ['Face rollers', 'Massage oils', 'Bath salts', 'Scented candles']
  },
  {
    id: 'laser',
    name: 'Laser',
    tagline: 'Precision Sculpting Smoothness',
    description: 'Advanced epidermal recovery support compositions ensuring clean skin thermal shield calibrations.',
    subcategories: ['Gels', 'Machine', 'Soothing cream']
  }
]

const filteredProducts = computed(() => {
  if (!products.value || products.value.length === 0) return []
  if (!activeCategory.value) return products.value

  const activeCat = normalize(activeCategory.value)
  const activeSub = normalize(activeSubcategory.value)

  return products.value.filter(product => {
    const productCat = normalize(product.category)
    const productSub = normalize(product.subcategory)

    const isCategoryMatch = productCat === activeCat || productCat.includes(activeCat) || activeCat.includes(productCat)
    if (!isCategoryMatch) return false

    if (!activeSubcategory.value) return true

    return productSub === activeSub || productSub.includes(activeSub)
  })
})

/* ================= SUBCATEGORIES ================= */
const currentSubcategories = computed(() => {
  if (!activeCategory.value) return []
  const found = categoryConfigs.find(
    c => normalize(c.name) === normalize(activeCategory.value)
  )
  return found?.subcategories || []
})

/* ================= NAVIGATION ================= */
const setActiveCategory = (categoryName) => {
  activeCategory.value = categoryName
  activeSubcategory.value = null
}

/* ================= CLEAR ================= */
const clearCategory = () => {
  activeCategory.value = null
  activeSubcategory.value = null
  nextTick(() => useScrollAnimation())
}

/* ================= WISHLIST ================= */
const isItemInWishlist = (id) =>
  wishlistStore.items?.some(item => item.id === id)

const handleWishlistToggle = (product) => {
  // FIXED: now uses the shared getVariantLabel() resolver instead of
  // only checking .title/.name, so it matches the button + cart label
  const currentPrice = product.selectedVariant ? parseFloat(product.selectedVariant.price) : product.price
  const variantLabel = product.selectedVariant ? getVariantLabel(product.selectedVariant) : ''
  const currentName = variantLabel
    ? `${product.name} (${variantLabel})`
    : product.name

  console.log("[WISHLIST]", isItemInWishlist(product.id) ? "removing" : "adding", currentName)

  if (isItemInWishlist(product.id)) {
    wishlistStore.removeFromWishlist(product.id)
  } else {
    wishlistStore.addToWishlist({
      id: product.id,
      name: currentName,
      price: currentPrice,
      image: product.image,
      badge: 'Luxury'
    })
  }
}

/* ================= CART ================= */
const handleAddToCart = (product) => {
  if (product.variants && product.variants.length > 1 && !product.selectedVariant) {
    console.warn("⚠️ Option required before addition can be completed.")
    return
  }

  const finalVariantId = product.selectedVariant?.id || product.variantId

  // FIXED: now uses the shared getVariantLabel() resolver so this always
  // matches the label shown on the option button
  const variantLabel = product.selectedVariant ? getVariantLabel(product.selectedVariant) : ''

  console.log("[PRODUCTS] Add to cart clicked:", product.name, "variant:", variantLabel, "variantId:", finalVariantId)
  addingToCartId.value = product.id

  cartStore.addToCart(
    {
      id: product.id,
      variantId: finalVariantId, 
      name: variantLabel ? `${product.name} (${variantLabel})` : product.name,
      price: product.selectedVariant ? parseFloat(product.selectedVariant.price) : product.price,
      image: product.image,
      quantity: 1,
      type: 'product'
    },
    authStore.isAuthenticated,
    authStore.openAuthModal
  )

  setTimeout(() => {
    addingToCartId.value = null
  }, 800)
}

/* ================= INIT ================= */
useScrollAnimation()

onMounted(async () => {
  loading.value = true

  try {
    console.log("📡 Fetching products...")
    const liveData = await loadStudioProducts()
    console.log("RAW API PRODUCTS:", liveData)

    if (Array.isArray(liveData) && liveData.length > 0) {
  products.value = liveData
    .map(item => {
      const apiCategory = item.categories?.[0]?.category?.name || ""
      const catLower = apiCategory.toLowerCase()

      // NEW: skip services — only keep actual products
      if (catLower.includes('service')) {
        return null
      }

      // Base baseline variant defaults
      const initialVariantId = item.product_variants?.[0]?.id || item.id
      
      // Extract nested image configurations safely
      const rawImagePath = item.main_image?.path || item.image_url || item.image
      let finalImage = '/images/p1.jpg'
      
      if (rawImagePath) {
        if (rawImagePath.startsWith('http')) {
          finalImage = rawImagePath
        } else {
          const cleanPath = rawImagePath.startsWith('/') ? rawImagePath.slice(1) : rawImagePath
          finalImage = `https://api.osimart.com/${cleanPath}`
        }
        console.log("VARIANTS for", item.name, ":", JSON.stringify(item.product_variants, null, 2))
      }

      const cat = catLower
      let categoryName = "Other"

      if (cat.includes("makeup") || cat.includes("eyes") || cat.includes("eye") || cat.includes("lips") || cat.includes("face") || cat.includes("concealer") || cat.includes("brush")) {
          categoryName = "Makeup"
      } else if (cat.includes("hair") || cat.includes("dry shampoo") || cat.includes("hair oils") || cat.includes("hair mists") || cat.includes("accessories")) {
          categoryName = "Hair"
      } else if (cat.includes("laser") || cat.includes("gels") || cat.includes("machine") || cat.includes("soothing cream")) {
          categoryName = "Laser"
      } else if (cat.includes("massage") || cat.includes("roller") || cat.includes("bath") || cat.includes("candle")) {
          categoryName = "Massage"
      } else if (cat.includes("nail") || cat.includes("press on")) {
          categoryName = "Nails"
      }
      
      const subcategoryName = item.vary_by?.[0]?.name || apiCategory

      // Fallback pricing configuration logic
      let finalPrice = 0.00
      if (item.price_range) {
        const basePriceString = item.price_range.split('-')[0].trim()
        finalPrice = parseFloat(basePriceString) || 0.00
      } else if (item.price) {
        finalPrice = parseFloat(item.price)
      }

      return {
        id: item.id,
        variantId: initialVariantId, 
        image: finalImage,
        name: item.name,
        category: categoryName,
        subcategory: subcategoryName,
        price: finalPrice,
        variants: item.product_variants || [],
        selectedVariant: item.product_variants && item.product_variants.length === 1 ? item.product_variants[0] : null
      }
    })
    .filter(Boolean) // NEW: drop the nulls (services) out of the final list
}

    console.log("✅ PRODUCTS POPULATED:", products.value.length)
  } catch (err) {
    console.error("❌ API CRASHED:", err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.animate-fade-scale {
  animation: fadeScale 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.98) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-on-scroll {
  opacity: 0;
  transition: all 0.9s cubic-bezier(0.25, 1, 0.5, 1);
}

.fade-on-scroll.visible {
  opacity: 1;
  transform: translate(0, 0) !important;
}

.fade-left {
  transform: translateX(-40px);
}

.fade-right {
  transform: translateX(40px);
}
</style>