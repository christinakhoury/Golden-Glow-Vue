<template>
  <div class="min-h-screen bg-[#FAF6F0] text-stone-800 antialiased pt-40 pb-32 relative overflow-hidden font-sans selection:bg-[#D4AF37]/10">
    
    <div class="absolute inset-y-0 left-12 w-px bg-stone-200/40 hidden lg:block"></div>
    <div class="absolute inset-y-0 right-12 w-px bg-stone-200/40 hidden lg:block"></div>

    <section class="max-w-7xl mx-auto px-6 lg:px-16 mb-24 relative z-10" data-aos="fade-up" data-aos-duration="1000">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-stone-200 pb-16">
        <div class="lg:col-span-7 space-y-4">
          <span class="text-[#D4AF37] tracking-[0.4em] text-xs uppercase font-bold inline-flex items-center gap-3">
            <span class="w-6 h-px bg-[#D4AF37]"></span> Salon Menu Portfolio
          </span>
          <h1 class="text-5xl md:text-7xl font-light text-stone-900 tracking-tighter leading-none capitalize" style="font-family: 'Playfair Display', serif;">
            {{ serviceType }} Services
          </h1>
        </div>
        <div class="lg:col-span-5 lg:pt-8">
          <p class="text-stone-500 text-base font-light leading-relaxed border-l border-stone-300 pl-6">
            Explore our custom collection of bespoke offerings curated specifically for your wellness and personal beauty profile.
          </p>
        </div>
      </div>
    </section>

    <section v-if="isLoading" class="max-w-7xl mx-auto px-6 lg:px-16 text-center py-20 relative z-10">
      <div class="inline-block w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-xs font-mono tracking-widest text-stone-400 uppercase">Synchronizing with Maison Registry...</p>
    </section>

    <section v-else class="max-w-7xl mx-auto px-6 lg:px-16 mb-32 relative z-10">
      <div v-if="filteredServices.length === 0" class="text-center py-12 border border-dashed border-stone-200 bg-white">
        <p class="text-sm font-light text-stone-400">No active variants found matching this salon collection directory.</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div 
          v-for="(item, idx) in filteredServices" 
          :key="item.id || item.name"
          class="bg-white border border-stone-200/60 transition-all duration-700 ease-out hover:border-[#D4AF37] hover:shadow-[0_30px_60px_-20px_rgba(212,175,55,0.05)] flex flex-col justify-between group relative cursor-pointer overflow-hidden"
          data-aos="fade-up"
          :data-aos-delay="idx * 100"
          @click="openServiceOptions(item)"
        >
          <div class="absolute top-0 left-0 w-full h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

          <div>
            <div class="w-full h-72 overflow-hidden relative bg-stone-100 border-b border-stone-100">
              <img 
                :src="getServiceImage(item)" 
                :alt="item.name"
                class="w-full h-full object-cover grayscale-[10%] contrast-[102%] group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div class="p-8 lg:p-10">
              <div class="flex justify-between items-baseline gap-4 mb-4">
                <h3 class="text-2xl text-stone-900 font-light tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300" style="font-family: 'Playfair Display', serif;">
                  <span class="mr-2 text-xl inline-block transition-transform duration-300 group-hover:scale-110">✨</span>
                  {{ item.name }}
                </h3>
                <span class="text-md font-serif font-medium text-stone-900 tracking-tight whitespace-nowrap border-b border-stone-200 pb-1">
                  ${{ item.price || item.sale_price || 'Varies' }}
                </span>
              </div>
              
              <div class="flex items-center gap-2 mb-6">
                <span class="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                <span class="text-[10px] tracking-widest uppercase font-mono text-stone-400 font-semibold">
                  SKU: {{ item.sku || 'Maison Standard' }}
                </span>
              </div>

              <p class="text-stone-500 text-sm font-light leading-relaxed mb-4" v-html="item.description || 'Custom targeted application with tailored precision care profiles.'">
              </p>
            </div>
          </div>

          <div class="px-8 lg:px-10 pb-8 pt-6 border-t border-stone-100 flex justify-end">
            <button 
              @click.stop="openServiceOptions(item)"
              class="inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase font-bold text-white bg-stone-900 hover:bg-[#D4AF37] px-8 py-4 transition-all duration-300 rounded-none shadow-sm"
            >
              Book Session
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <Transition name="fade">
      <div v-if="selectedService" class="fixed inset-0 z-50 flex items-center justify-end bg-stone-900/40 backdrop-blur-sm" @click.self="closeServiceOptions">
        <Transition name="slide">
          <div v-if="selectedService" class="w-full max-w-lg h-full bg-[#FAF6F0] shadow-2xl flex flex-col justify-between overflow-y-auto relative border-l border-stone-200">
            
            <button @click="closeServiceOptions" class="absolute top-6 right-6 text-stone-400 hover:text-stone-900 p-2 transition-transform duration-300 hover:rotate-90 z-30 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="space-y-8 pb-8">
              <div class="w-full h-64 overflow-hidden relative bg-stone-200 border-b border-stone-200/40">
                <img 
                  :src="getServiceImage(selectedService)" 
                  :alt="selectedService.name"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-transparent"></div>
              </div>

              <div class="space-y-2 px-8 md:px-10">
                <span class="text-[#D4AF37] tracking-[0.3em] text-[10px] uppercase font-bold block">// Selected Service Ritual</span>
                <h2 class="text-3xl font-light text-stone-900" style="font-family: 'Playfair Display', serif;">
                  {{ selectedService.name }} Options
                </h2>
                <div class="text-stone-500 text-xs font-light leading-relaxed max-h-24 overflow-y-auto" v-html="selectedService.description || 'Premium standard menu options available for request.'">
                </div>
              </div>

              <div class="space-y-4 px-8 md:px-10">
                <div 
                  v-for="(tier, idx) in derivedTiers" 
                  :key="idx"
                  class="bg-white border border-stone-200/80 p-5 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 class="font-serif text-lg text-stone-900 font-light">{{ tier.name }}</h4>
                    <p class="text-[11px] text-stone-400 font-mono tracking-wider mt-0.5">Custom Suite Tiers</p>
                  </div>

                  <div class="flex items-center justify-between sm:justify-end gap-4">
                    <span class="text-lg font-serif text-stone-900 border-b border-stone-200 pb-0.5">${{ tier.price }}</span>
                    
                    <div class="flex items-center gap-2">
                      <!-- Wishlist Synchronization Toggle Button -->
                      <button 
                        @click="handleWishlistToggle(tier)"
                        class="p-2 border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 transition-all duration-300 active:scale-75"
                        :class="{ 'text-rose-500 border-rose-200 bg-rose-50/50': isItemInWishlist(tier.id) }"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-300" :class="{ 'scale-110': isItemInWishlist(tier.id) }" :fill="isItemInWishlist(tier.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      <button 
                        @click="addToCart(tier)"
                        class="bg-stone-900 hover:bg-[#D4AF37] text-white text-[10px] tracking-widest uppercase font-bold px-3 py-2 transition-all duration-300 active:scale-95 flex items-center gap-1.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8 md:p-10 pt-6 border-t border-stone-200 space-y-3 bg-[#FAF6F0] sticky bottom-0 z-20">
              <button @click="closeServiceOptions" class="w-full text-center block text-[10px] tracking-widest uppercase font-bold text-stone-400 hover:text-stone-700 transition-colors py-1">
                Close Menu
              </button>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>

    <section class="pt-32 max-w-7xl mx-auto px-6 lg:px-16 relative z-10" data-aos="fade-up" data-aos-duration="1000">
      <div class="bg-white border border-stone-200/60 p-10 md:p-16 relative overflow-hidden">
        
        <div class="max-w-3xl mb-20">
          <span class="text-xs text-[#D4AF37] uppercase tracking-[0.4em] font-bold block mb-3">// Our Signature Approach</span>
          <h3 class="text-3xl md:text-4xl text-stone-900 font-light tracking-tight" style="font-family: 'Playfair Display', serif;">
            The Maison Way
          </h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div 
            v-for="(benefit, index) in standardBenefits" 
            :key="benefit.title"
            class="space-y-4 border-t border-stone-200 pt-6 relative group"
          >
            <div class="absolute top-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500"></div>

            <span class="font-mono text-xs text-[#D4AF37] block font-bold">
              // 0{{ index + 1 }}
            </span>
            <h4 class="text-lg font-light text-stone-900 tracking-tight" style="font-family: 'Playfair Display', serif;">
              {{ benefit.title }}
            </h4>
            <p class="text-stone-500 text-xs font-light leading-relaxed">
              {{ benefit.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <Transition name="pop">
      <div v-if="toast" class="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-stone-900 text-[#FAF6F0] px-6 py-3 shadow-2xl z-50 text-[11px] font-mono tracking-widest uppercase border border-[#D4AF37]/20 flex items-center gap-3">
        <span class="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping"></span>
        {{ toast }}
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { loadStudioProducts } from "../services/service"
import { useCart } from "../composables/useCart"
import { useAuthStore } from "../composables/auth"
import { useWishlistStore } from '../composables/wishlist'

const cartStore = useCart()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()

const route = useRoute()
const serviceType = route.params.type || "hair"

const products = ref([])
const isLoading = ref(true)
const selectedService = ref(null)
const toast = ref("")

const getServiceImage = (item) => {
  let imgPath = item?.main_image?.path || null

  if (!imgPath && item?.gallery?.[0]) {
    imgPath = item.gallery[0].media?.path || item.gallery[0].path || null
  }

  if (!imgPath || typeof imgPath !== 'string') {
    return "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
  }

  const cleanPath = imgPath.trim()

  if (cleanPath.startsWith("/")) {
    return `https://api.osimart.com${cleanPath}`
  } else if (!cleanPath.startsWith("http://") && !cleanPath.startsWith("https://")) {
    return `https://api.osimart.com/${cleanPath}`
  }

  return cleanPath
}

const SERVICE_MAP = {
  hair: ["hair", "hair service", "haircut", "hair treatments", "hair coloring", "hair styling"],
  nails: ["nail", "manicure", "pedicure", "gel", "acrylic"],
  makeup: ["makeup", "bridal", "event makeup", "natural makeup", "eyes", "lips", "face"],
  massage: ["massage", "aromatherapy", "deep tissue", "swedish", "hot stone"],
  laser: ["laser", "pigmentation", "acne", "skin", "rejuvenation"]
}

/* ================= NORMALIZER ================= */
const normalize = (str) =>
  (str || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")

const normalizeVariants = (variants) => {
  if (!variants) return []
  return Array.isArray(variants) ? variants : [variants]
}

/* ================= LOAD API ================= */
onMounted(async () => {
  try {
    isLoading.value = true
    console.log("📡 Loading active studio products...")
    const data = await loadStudioProducts()
    products.value = Array.isArray(data) ? data : []

    console.table(
      products.value.map(p => ({
        name: p.name,
        category: p.categories?.[0]?.category?.name || "NO_CATEGORY",
        parent: p.categories?.[0]?.category?.parent_category?.name || "NO_PARENT",
        subcategory: p.categories?.[0]?.category?.slugified_name || "NO_SLUG"
      }))
    )
  } catch (err) {
    console.error("❌ API ERROR:", err)
    products.value = []
  } finally {
    isLoading.value = false
  }
})

const filteredServices = computed(() => {
  if (!products.value.length) return []
  const normType = normalize(serviceType)
  const keywords = SERVICE_MAP[normType] || [normType]

  return products.value.filter((p) => {
    const category = p.categories?.[0]?.category
    if (!category) return false

    const parent = normalize(category.parent_category?.name)
    const slug = normalize(category.slugified_name || "")
    const name = normalize(category.name || "")

    if (parent !== "services") return false

    return keywords.some(keyword => slug.includes(keyword) || name.includes(keyword))
  })
})

/* ================= VARIANTS SETUP ================= */
const derivedTiers = computed(() => {
  if (!selectedService.value) return []

  const variants =
    normalizeVariants(selectedService.value.product_variants).length
      ? normalizeVariants(selectedService.value.product_variants)
      : normalizeVariants(selectedService.value.vary_by?.[0]?.values)

  return variants.map(v => ({
    id: v.id,
    variantId: v.id,
    name: v.name || v.values?.[0]?.name || "Option",
    price: parseFloat(v.price) || 0,
    sku: v.sku,
    productId: selectedService.value.id,
    image: getServiceImage(selectedService.value)
  }))
})

/* ================= WISHLIST ACTIONS ================= */
const isItemInWishlist = (id) => {
  if (wishlistStore.isItemInWishlist) {
    return wishlistStore.isItemInWishlist(id)
  }
  return wishlistStore.wishlistItems?.some(item => item.id === id) || false
}

const handleWishlistToggle = (tier) => {
  const itemPayload = {
    id: tier.id,
    variantId: tier.variantId,
    name: `${selectedService.value.name} - ${tier.name}`,
    image: tier.image,
    price: tier.price,
    type: "service"
  }

  if (wishlistStore.toggleWishlist) {
    wishlistStore.toggleWishlist(itemPayload)
  } else if (wishlistStore.handleWishlistToggle) {
    wishlistStore.handleWishlistToggle(itemPayload)
  }

  if (isItemInWishlist(tier.id)) {
    triggerToast("Saved to wishlist ✨")
  } else {
    triggerToast("Removed from wishlist")
  }
}

/* ================= GENERAL ACTIONS ================= */
const openServiceOptions = (item) => {
  selectedService.value = item
}

const closeServiceOptions = () => {
  selectedService.value = null
}

const addToCart = async (tier) => {
  if (!tier.variantId) {
    console.error("[SERVICES] add to cart failed: no variant id for", tier)
    triggerToast("Could not add this item")
    return
  }

  try {
    await cartStore.addToCart(
      {
        id: tier.productId,
        variantId: tier.variantId,
        name: `${selectedService.value.name} - ${tier.name}`,
        image: tier.image,
        price: tier.price,
        quantity: 1,
        type: "service"
      },
      authStore.isAuthenticated,
      authStore.openAuthModal
    )
    triggerToast(`${tier.name} added to cart 🛍️`)
  } catch (err) {
    console.error("[SERVICES] add to cart failed:", err.response?.data || err.message)
    triggerToast("Could not add this item")
  }
}

const triggerToast = (msg) => {
  toast.value = msg
  setTimeout(() => {
    if (toast.value === msg) toast.value = ""
  }, 2300)
}

/* ================= STATIC DATA ================= */
const data = {
  hair: { benefits: [
    { title: "Expert Stylists", desc: "Professional hair specialists trained in the latest cutting, coloring, and styling techniques." },
    { title: "Premium Products", desc: "High-quality haircare products that protect, nourish, and enhance your hair." },
    { title: "Personalized Consultation", desc: "Every service is tailored to your hair type, face shape, and personal style." },
    { title: "Luxury Experience", desc: "Relax in a welcoming environment while enjoying exceptional care and attention." }
  ]},
  nails: { benefits: [
    { title: "Clean & Safe", desc: "Strict hygiene and sterilized tools." },
    { title: "Creative Designs", desc: "From simple to artistic nail styles." },
    { title: "Long-Lasting Finish", desc: "Durable, high-quality results." },
    { title: "Skilled Technicians", desc: "Precise and detail-focused specialists." }
  ]},
  makeup: { benefits: [
    { title: "Pro Artists", desc: "Experienced in bridal and event makeup." },
    { title: "Quality Products", desc: "Long-lasting, premium cosmetics." },
    { title: "Custom Looks", desc: "Makeup adapted to your features." },
    { title: "All Occasions", desc: "Perfect for events, weddings, and photoshoots." }
  ]},
  massage: { benefits: [
    { title: "Certified Therapists", desc: "Trained wellness professionals." },
    { title: "Stress Relief", desc: "Reduces tension and fatigue." },
    { title: "Personal Sessions", desc: "Customized to your needs." },
    { title: "Calm Space", desc: "Relaxing and peaceful environment." }
  ]},
  laser: { benefits: [
    { title: "Safe Technology", desc: "FDA-approved equipment and procedures." },
    { title: "Long-Term Results", desc: "Noticeable improvements after a few sessions." },
    { title: "Expert Specialists", desc: "Treatments performed by trained professionals." },
    { title: "Personalized Care", desc: "Customized plans based on your skin needs." }
  ]}
}

const current = computed(() => data[serviceType] || data.hair)
const standardBenefits = computed(() => current.value.benefits)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}

.pop-enter-active {
  animation: pop-up 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-leave-active {
  transition: opacity 0.25s linear;
}
.pop-leave-to {
  opacity: 0;
}

@keyframes pop-up {
  0% { transform: translate(-50%, 1.5rem) scale(0.9); opacity: 0; }
  100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
}
</style>
