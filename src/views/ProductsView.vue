<template>
  <main class="min-h-screen bg-[#faf8f5] text-stone-800 font-sans antialiased selection:bg-amber-200">
    
    <!-- HEADER HERO SECTION -->
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

    <!-- CONTENT FLOW WRAPPER -->
    <transition name="fade-slide" mode="out-in">
      
      <!-- VIEW A: COLLECTIONS DASHBOARD -->
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

      <!-- VIEW B: FILTERED PRODUCTS SHOWCASE -->
      <div v-else key="filtered-showcase" class="max-w-7xl mx-auto px-5 md:px-8 py-12">
        
        <!-- Subcategory Navigation Pill Filter Bar -->
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

        <!-- Products Grid Layout -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="group relative flex flex-col justify-between bg-white border border-stone-100 p-3 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <!-- Media & Interaction Anchor Layout -->
            <div class="w-full aspect-[3/4] bg-stone-50 relative overflow-hidden mb-4">
              <img 
                :src="product.image" 
                :alt="product.name" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[9px] tracking-widest uppercase text-stone-500 font-medium">
                {{ product.subcategory }}
              </span>
              
              <!-- Wishlist Store Trigger Button -->
              <button 
                @click="handleWishlistToggle(product)"
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center transition-colors duration-300 z-20"
                :class="isItemInWishlist(product.id) ? 'text-red-500' : 'text-stone-400 hover:text-stone-900'"
              >
                <i :class="isItemInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>

            <!-- Details Description & Store CTA Actions -->
            <div class="px-1 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-playfair text-lg text-stone-900 mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {{ product.name }}
                </h3>
                <p class="text-stone-400 text-xs font-light tracking-wide mb-4 capitalize">
                  Premium curated selection
                </p>
              </div>
              
              <div class="flex items-center justify-between border-t border-stone-100 pt-4 mt-auto">
                <span class="text-stone-900 font-medium text-sm font-serif">
                  ${{ product.price.toFixed(2) }}
                </span>
                
                <!-- Cart Store Trigger Button with feedback states -->
                <button 
                  @click="handleAddToCart(product)"
                  class="text-xs tracking-widest uppercase font-medium transition-all duration-300 flex items-center gap-1.5"
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

        <!-- Fallback Placeholder Context State -->
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

const sampleProducts = [
  // hair accessories 
  { id: 101, category: 'Hair', subcategory: 'Accessories', name: 'Ola Set (4 pieces)', price: 35.00, image: '/images/ha1.jpeg' },
  { id: 102, category: 'Hair', subcategory: 'Accessories', name: 'Nivi Homa', price: 20.00, image: '/images/ha2.jpeg' },
  { id: 103, category: 'Hair', subcategory: 'Accessories', name: 'Minimalist', price: 18.00, image: '/images/ha3.jpeg' },
  // shampoo
  { id: 104, category: 'Hair', subcategory: 'Dry Shampoo', name: 'Jupiter Shampoo', price: 40.00, image: '/images/hs1.jpeg' },
  { id: 105, category: 'Hair', subcategory: 'Dry Shampoo', name: 'Power Buf Set', price: 60.00, image: '/images/hs2.jpeg' },
  { id: 106, category: 'Hair', subcategory: 'Dry Shampoo', name: 'UNEEDMEE', price: 25.00, image: '/images/hs3.jpeg' },
  // hair mist
  { id: 107, category: 'Hair', subcategory: 'Hair mists', name: 'Coco Mist', price: 33.00, image: '/images/hm1.jpeg' },
  { id: 108, category: 'Hair', subcategory: 'Hair mists', name: 'Dreamy Mist', price: 35.00, image: '/images/hm2.jpeg' },
  { id: 109, category: 'Hair', subcategory: 'Hair mists', name: 'Eleganta Mist', price: 38.00, image: '/images/hm3.jpeg' },
  // hair oil
  { id: 110, category: 'Hair', subcategory: 'Hair oils', name: 'Oriko Oil', price: 18.00, image: '/images/ho1.jpeg' },
  { id: 111, category: 'Hair', subcategory: 'Hair oils', name: 'Dreamy Oil', price: 25.00, image: '/images/ho2.jpeg' },
  { id: 112, category: 'Hair', subcategory: 'Hair oils', name: 'Maeomo Oil', price: 20.00, image: '/images/ho3.jpeg' },

  // Nail product
  { id: 202, category: 'Nails', subcategory: 'Press On Nails', name: 'Touche Deluxe Press-On Extensions', price: 15.00, image: '/images/p1.jpg' },
  { id: 203, category: 'Nails', subcategory: 'Press On Nails', name: 'Lelegance Press-on Nails', price: 15.00, image: '/images/p2.jpg' },
  { id: 204, category: 'Nails', subcategory: 'Press On Nails', name: 'Lala Press-On Extensions', price: 20.00, image: '/images/p3.jpg' },
  { id: 205, category: 'Nails', subcategory: 'Press On Nails', name: 'Synddney Press-On Extensions', price: 20.00, image: '/images/p4.jpg' },
  { id: 206, category: 'Nails', subcategory: 'Press On Nails', name: 'Georgette Press-On Extensions', price: 15.00, image: '/images/p5.jpg' },
  { id: 201, category: 'Nails', subcategory: 'Press On Nails', name: 'Lilas Press-On Extensions', price: 18.00, image: '/images/p6.jpg' },
  // nails tools
  { id: 207, category: 'Nails', subcategory: 'Nails Tools', name: 'Ceel Set', price: 30.00, image: '/images/nt1.jpg' },
  { id: 208, category: 'Nails', subcategory: 'Nails Tools', name: 'Luxy Scissors (pack of 2)', price: 25.00, image: '/images/nt2.jpg' },
  { id: 209, category: 'Nails', subcategory: 'Nails Tools', name: 'Vroom vroom ', price: 40.00, image: '/images/nt3.jpg' },
  { id: 210, category: 'Nails', subcategory: 'Nails Tools', name: 'Mooz ditsie', price: 8.00, image: '/images/nt4.jpg' },
  // nails care
  { id: 211, category: 'Nails', subcategory: 'Nail Care', name: 'Cuticle Oil', price: 28.00, image: '/images/nc1.jpg' },
  { id: 212, category: 'Nails', subcategory: 'Nail Care', name: 'Nail Oil', price: 30.00, image: '/images/nc2.jpg' },
  { id: 213, category: 'Nails', subcategory: 'Nail Care', name: 'Honori Oil', price: 35.00, image: '/images/nc3.jpg' },
  
  // Makeup product 
  { id: 301, category: 'Makeup', subcategory: 'Eyes', name: 'Coco Maskara', price: 28.00, image:'/images/me2.jpeg' },
  { id: 302, category: 'Makeup', subcategory: 'Eyes', name: 'Lilo Eyeshadow', price: 48.00, image:'/images/me1.jpeg' },
  { id: 303, category: 'Makeup', subcategory: 'Eyes', name: 'Sienna Dilena ', price: 40.00, image:'/images/me3.jpeg' },
  // lips
  { id: 304, category: 'Makeup', subcategory: 'Lips', name: 'Lollipop gloss ', price: 18.00, image:'/images/ml1.jpeg' },
  { id: 305, category: 'Makeup', subcategory: 'Lips', name: 'Cherry On Top  ', price: 15.00, image:'/images/ml2.jpeg' },
  { id: 306, category: 'Makeup', subcategory: 'Lips', name: 'Girlie Pop Set ', price: 20.00, image:'/images/ml3.jpeg' },
  { id: 307, category: 'Makeup', subcategory: 'Lips', name: 'One Of A Kind ', price: 22.00, image:'/images/ml4.jpeg' },
  // face 
  { id: 308, category: 'Makeup', subcategory: 'Face', name: ' Concealer ', price: 22.00, image:'/images/mf1.jpeg' },
  { id: 309, category: 'Makeup', subcategory: 'Face', name:"Lara's Touch", price: 18.00, image:'/images/mf2.jpeg' },
  { id: 310, category: 'Makeup', subcategory: 'Face', name: 'Setting Powder ', price: 20.00, image:'/images/mf3.jpeg' },
  // makeup tools
  { id: 311, category: 'Makeup', subcategory: 'Makeup tools', name: 'Dinia Set  ', price: 45.00, image:'/images/mt1.jpeg' },
  { id: 312, category: 'Makeup', subcategory: 'Makeup tools', name: 'Bubbly pop (1piece) ', price: 8.00, image:'/images/mt2.jpeg' },
  { id: 313, category: 'Makeup', subcategory: 'Makeup tools', name: 'DALANA Brushes (set) ', price: 55.00, image:'/images/mt3.jpeg' },
  
  // Massage
  { id: 401, category: 'Massage', subcategory: 'Face rollers', name: 'Sculpting Nephrite Jade Gua Sha', price: 28.00, image:'/images/fmf1.jpeg'},
  { id: 402, category: 'Massage', subcategory: 'Face rollers', name: 'Relaxia', price: 35.00, image:'/images/mf2f.jpeg'},
  { id: 403, category: 'Massage', subcategory: 'Face rollers', name: 'Laluna Set', price: 30.00, image:'/images/fmf3.jpeg'},
  // massage oils 
  { id: 404, category: 'Massage', subcategory: 'Massage oils', name: 'Miisica', price: 8.00, image:'/images/mo1.jpeg'},
  { id: 405, category: 'Massage', subcategory: 'Massage oils', name: 'Leona Oil', price: 18.00, image:'/images/mo2.jpeg'},
  { id: 406, category: 'Massage', subcategory: 'Massage oils', name: 'Iona', price: 15.00, image:'/images/mo3.jpeg'},
  // bath salts
  { id: 407, category: 'Massage', subcategory: 'Bath salts', name: 'Vanilla Bath Salts', price: 20.00, image:'/images/ms1.jpeg'},
  { id: 408, category: 'Massage', subcategory: 'Bath salts', name: 'Sculpa Bath Salts', price: 22.00, image:'/images/ms2.jpeg'},
  { id: 409, category: 'Massage', subcategory: 'Bath salts', name: 'Aurora Bath Salts', price: 25.00, image:'/images/ms3.jpeg'},
  // scented candles 
  { id: 410, category: 'Massage', subcategory: 'Scented candles', name: 'Echante', price: 30.00, image:'/images/mc1.jpeg'},
  { id: 411, category: 'Massage', subcategory: 'Scented candles', name: 'Anamolie', price: 30.00, image:'/images/mc2.jpeg'},
  { id: 412, category: 'Massage', subcategory: 'Scented candles', name: 'Ilalai', price: 30.00, image:'/images/mc3.jpeg'},

  // laser product 
  { id: 501, category: 'Laser', subcategory: 'Gels', name: 'Post-Laser Hyper-Calming Complex', price: 32.00, image: '/images/lg1.jpeg' },
  { id: 502, category: 'Laser', subcategory: 'Gels', name: 'Gel', price: 22.00, image: '/images/lg2.jpeg' },
  { id: 503, category: 'Laser', subcategory: 'Gels', name: 'Post-Laser Gel', price: 25.00, image: '/images/lg3.jpeg' },
  // machine 
  { id: 504, category: 'Laser', subcategory: 'Machine', name: 'Luxury Machine', price: 100.00, image: '/images/lm1.jpeg' },
  { id: 505, category: 'Laser', subcategory: 'Machine', name: 'Machinia ', price: 125.00, image: '/images/lm2.jpeg' },
  { id: 506, category: 'Laser', subcategory: 'Machine', name: 'La Machina', price: 150.00, image: '/images/lm3.jpeg' },
  // soothing cream
  { id: 507, category: 'Laser', subcategory: 'Soothing cream', name: ' cream', price: 20.00, image: '/images/ls1.jpeg' },
  { id: 508, category: 'Laser', subcategory: 'Soothing cream', name: 'Soothing cream', price: 20.00, image: '/images/ls2.jpeg' },
  { id: 509, category: 'Laser', subcategory: 'Soothing cream', name: 'Soothing cream', price: 22.00, image: '/images/ls3.jpeg' }
]

const filteredProducts = computed(() => {
  if (!products.value || products.value.length === 0) return []
  if (!activeCategory.value) return products.value

  const activeCat = normalize(activeCategory.value)
  const activeSub = normalize(activeSubcategory.value)

  return products.value.filter(product => {
    const productCat = normalize(product.category)
    const productSub = normalize(product.subcategory)

    // 🔥 HIGH-END SAFE MATCHING: Check text strings or fallback to partial match
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

const setActiveSubcategory = (sub) => {
  activeSubcategory.value = sub
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

/* ================= CART ================= */
const handleAddToCart = (product) => {
  console.log("[PRODUCTS] Add to cart clicked:", product.name, "variantId:", product.variantId)
  addingToCartId.value = product.id

  cartStore.addToCart(
    {
      id: product.id,
      variantId: product.variantId, // FIXED: cart API needs the ProductVariant id, not the product id
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
      products.value = liveData.map(item => {
        console.log({
          name: item.name,
          apiCategories: item.categories?.map(c => c.category?.name),
          varyBy: item.vary_by,
        })
        console.log("VARIANTS for", item.name, ":", JSON.stringify(item.product_variants, null, 2))

        // FIXED: grab the variant id — the cart API requires this, not the product id
        const variantId = item.product_variants?.[0]?.id || item.id
        console.log("[PRODUCT MAP] resolved variantId for", item.name, ":", variantId)

        // 1. Extract nested image path from main_image object
        const rawImagePath = item.main_image?.path || item.image_url || item.image
        let finalImage = '/images/p1.jpg'
        
        if (rawImagePath) {
          if (rawImagePath.startsWith('http')) {
            finalImage = rawImagePath
          } else {
            const cleanPath = rawImagePath.startsWith('/') ? rawImagePath.slice(1) : rawImagePath
            finalImage = `https://api.osimart.com/${cleanPath}`
          }
        }
        
       const apiCategory =
    item.categories?.[0]?.category?.name || ""
const cat = apiCategory.toLowerCase()

let categoryName = "Other"

if (
    cat.includes("makeup") ||
    cat.includes("eyes") ||
    cat.includes("eye") ||
    cat.includes("lips") ||
    cat.includes("face") ||
    cat.includes("concealer") ||
    cat.includes("brush")
) {
    categoryName = "Makeup"
}

else if (
    cat.includes("hair") ||
    cat.includes("dry shampoo") ||
    cat.includes("hair oils") ||
    cat.includes("hair mists") ||
    cat.includes("accessories")
) {
    categoryName = "Hair"
}

else if (
    cat.includes("laser") ||
    cat.includes("gels") ||
    cat.includes("machine") ||
    cat.includes("soothing cream")
) {
    categoryName = "Laser"
}

else if (
    cat.includes("massage") ||
    cat.includes("roller") ||
    cat.includes("bath") ||
    cat.includes("candle")
) {
    categoryName = "Massage"
}

else if (
    cat.includes("nail") ||
    cat.includes("press on")
) {
    categoryName = "Nails"
}
const subcategoryName =
    item.vary_by?.[0]?.name || apiCategory


        // 3. Convert 'price_range' string (e.g., "60.0 - 130.0") into a baseline float number
        let finalPrice = 0.00
        if (item.price_range) {
          const basePriceString = item.price_range.split('-')[0].trim()
          finalPrice = parseFloat(basePriceString) || 0.00
        } else if (item.price) {
          finalPrice = parseFloat(item.price)
        }

        return {
    id: item.id,
    variantId, // FIXED: carried through to cart add so useCart.js can sync with the real variant id
    image: finalImage,
    name: item.name,
    category: categoryName,
    subcategory: subcategoryName,
    price: finalPrice
}
      })
    } else {
      console.warn("⚠️ No live array returned. Loading fallback catalog.");
      products.value = sampleProducts
    }

    console.log("✅ PRODUCTS POPULATED:", products.value.length)
    if (products.value.length > 0) {
      console.table(
  products.value.map(p => ({
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    variantId: p.variantId
  }))
)
    }

  } catch (err) {
    console.error("❌ API CRASHED, safely loaded fallbacks:", err)
    products.value = sampleProducts
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

/* Luxury View Transitions swapping dashboard layout for grids smoothly */
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

/* Intersectional Scroll Animations */
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