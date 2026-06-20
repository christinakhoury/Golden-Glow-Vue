<template>
  <main>
    <!-- Hero -->
    <section
      class="pt-28 md:pt-32 pb-12 md:pb-20 px-5 bg-gradient-to-br from-[#f5e6d8] via-[#efe0d2] to-[#f5e6d8] "
    >
      <div class="max-w-7xl mx-auto text-center ">
        <span
          class="text-[#D4AF37] tracking-[0.2em] text-xs md:text-sm uppercase font-semibold animate-fade-scale"
          >Discover By Category</span
        >
        <h1
          class="font-playfair text-3xl md:text-5xl lg:text-7xl font-light text-stone-800 mb-3 md:mb-4 animate-fade-scale"
        >
          Shop by Collection
        </h1>
        <div
          class="w-16 md:w-24 h-0.5 bg-[#D4AF37] mx-auto mb-4 md:mb-6 rounded-full animate-fade-scale"
        ></div>
        <p
          class="text-stone-600 text-sm md:text-lg max-w-2xl mx-auto animate-fade-scale"
        >
          Find the perfect piece that elevates your aura, curated by category.
        </p>
      </div>
    </section>

    <!-- hair products -->
    <section
      class="py-12 md:py-28 overflow-hidden bg-secondary"
    >
      <div class="max-w-7xl mx-auto px-5 md:px-8">
        <div
          class="flex flex-col md:flex-row items-center gap-6 md:gap-0 group"
        >
          <div class="md:w-1/2 relative group/image fade-on-scroll fade-right">
            <div
              class="relative w-full max-w-sm md:max-w-md mx-auto md:mr-auto md:ml-0"
            >
              <div
                class="relative overflow-hidden rounded-tr-[40px] md:rounded-tr-[80px] rounded-bl-[40px] md:rounded-bl-[80px] rounded-tl-xl rounded-bl-xl shadow-2xl transition-all duration-500 group-hover/image:shadow-2xl group-hover/image:shadow-amber-900/30 group-hover/image:scale-[1.02]"
              >
                <img
                 src="/images/hairproduct.jpg" alt="Hair Products" 
                  class="w-full h-auto object-cover aspect-[4/5] transition-all duration-700 ease-out group-hover/image:scale-110"
                />
              </div>
              <div
                class="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-10 h-10 md:w-20 md:h-20 border-t-2 border-l-2 border-amber-300/50 rounded-tl-xl md:rounded-tl-2xl pointer-events-none transition-all duration-300 group-hover/image:border-amber-500/70 group-hover/image:w-14 md:group-hover/image:w-24 group-hover/image:h-14 md:group-hover/image:h-24"
              ></div>
            </div>
          </div>
          <div
            class="md:w-1/2 flex items-center justify-start pl-0 md:pl-12 lg:pl-16 fade-on-scroll fade-left"
          >
            <div class="max-w-md py-6 md:py-12">
              <div class="flex items-center gap-2 mb-3 md:mb-4">
                <i class="fas fa-gem text-xl md:text-2xl text-[#D4AF37]"></i>
                <span
                  class="text-[#D4AF37] tracking-[0.2em] text-[10px] md:text-xs uppercase font-semibold"
                  >Timeless Hair Care </span
                >
              </div>
              <h2
                class="font-playfair text-2xl md:text-4xl lg:text-5xl font-light text-stone-800 leading-tight mb-3 md:mb-5"
              >
                Hair
                <span class="font-bold text-[#D4AF37]">Products</span>
              </h2>
              <p
                class="text-stone-700 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6"
              >
                Discover curated essentials designed to nourish, protect and enhance every strand.
              </p>
              <div class="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Strenght</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Glow</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Silk </span
                >
              </div>
              <div class="flex flex-wrap gap-3">
                <router-link
                  to="/hairproducts"
                  class="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-amber-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3 hover:scale-105 shadow-md text-sm md:text-base"
                >
                  Explore Hair Products
                  <i class="fas fa-arrow-right text-xs md:text-sm"></i>
                </router-link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nails -->
    <section
      class="py-12 md:py-28 overflow-hidden bg-gradient-to-l from-[#f5e6d8] to-[#efe0d2]"
    >
      <div class="max-w-7xl mx-auto px-5 md:px-8">
        <div
          class="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-0 group"
        >
          <div class="md:w-1/2 relative group/image fade-on-scroll fade-left">
            <div
              class="relative w-full max-w-sm md:max-w-md mx-auto md:ml-auto md:mr-0"
            >
              <div
                class="relative overflow-hidden rounded-tl-[40px] md:rounded-tl-[80px] rounded-br-[40px] md:rounded-br-[80px] rounded-tr-xl rounded-bl-xl shadow-2xl transition-all duration-500 group-hover/image:shadow-2xl group-hover/image:shadow-amber-900/30 group-hover/image:scale-[1.02]"
              >
                <img
                  src="/images/nailsproduct.jpg"
                  alt="Nails Collection"
                  class="w-full h-auto object-cover aspect-[4/5] transition-all duration-700 ease-out group-hover/image:scale-110"
                />
              </div>
              <div
                class="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-20 md:h-20 border-t-2 border-r-2 border-amber-300/50 rounded-tr-xl md:rounded-tr-2xl pointer-events-none transition-all duration-300 group-hover/image:border-amber-500/70 group-hover/image:w-14 md:group-hover/image:w-24 group-hover/image:h-14 md:group-hover/image:h-24"
              ></div>
            </div>
          </div>
          <div
            class="md:w-1/2 flex items-center justify-end pr-0 md:pr-12 lg:pr-16 fade-on-scroll fade-right"
          >
            <div class="max-w-md py-6 md:py-12 text-right">
              <div class="flex items-center gap-2 mb-3 md:mb-4 justify-end">
                <span
                  class="text-[#D4AF37] tracking-[0.2em] text-[10px] md:text-xs uppercase font-semibold"
                  >Symbol of Elegance </span
                >
                <i class="fas fa-gem text-xl md:text-2xl text-[#D4AF37]"></i>
              </div>
              <h2
                class="font-playfair text-2xl md:text-4xl lg:text-5xl font-light text-stone-800 leading-tight mb-3 md:mb-5"
              >
                Nail <span class="font-bold text-[#D4AF37]">Products </span>
              </h2>
              <p
                class="text-stone-700 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6"
              >
               Premium nail essentials and professional-grade products designed to enhance, protect, and perfect every manicure with salon-quality results.
              </p>
              <div
                class="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 justify-end"
              >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Nailcare</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Treatment</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Polish</span
                >
               
              </div>
              <div class="flex flex-wrap gap-3 justify-end">
                <router-link
                  to="/nailsproducts"
                  class="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-amber-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3 hover:scale-105 shadow-md text-sm md:text-base"
                >
                  Explore Nails Products
                  <i class="fas fa-arrow-right text-xs md:text-sm"></i>
                </router-link>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Makeup -->
    <section
      class="py-12 md:py-28 overflow-hidden bg-secondary"
    >
      <div class="max-w-7xl mx-auto px-5 md:px-8">
        <div
          class="flex flex-col md:flex-row items-center gap-6 md:gap-0 group"
        >
          <div class="md:w-1/2 relative group/image fade-on-scroll fade-right">
            <div
              class="relative w-full max-w-sm md:max-w-md mx-auto md:mr-auto md:ml-0"
            >
              <div
                class="relative overflow-hidden rounded-br-[40px] md:rounded-br-[80px] rounded-tl-[40px] md:rounded-tl-[80px] rounded-tr-xl rounded-bl-xl shadow-2xl transition-all duration-500 group-hover/image:shadow-2xl group-hover/image:shadow-amber-900/30 group-hover/image:scale-[1.02]"
              >
                <img
                  src="/images/makeupproduct.jpg"
                  alt="Makeup Collection"
                  class="w-full h-auto object-cover aspect-[4/5] transition-all duration-700 ease-out group-hover/image:scale-110"
                />
              </div>
              <div
                class="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-10 h-10 md:w-20 md:h-20 border-b-2 border-l-2 border-amber-300/50 rounded-bl-xl md:rounded-bl-2xl pointer-events-none transition-all duration-300 group-hover/image:border-amber-500/70 group-hover/image:w-14 md:group-hover/image:w-24 group-hover/image:h-14 md:group-hover/image:h-24"
              ></div>
            </div>
          </div>
          <div
            class="md:w-1/2 flex items-center justify-start pl-0 md:pl-12 lg:pl-16 fade-on-scroll fade-left"
          >
            <div class="max-w-md py-6 md:py-12">
              <div class="flex items-center gap-2 mb-3 md:mb-4">
               <i class="fas fa-gem text-xl md:text-2xl text-[#D4AF37]"></i>
                <span
                  class="text-[#D4AF37]/90 tracking-[0.2em] text-[10px] md:text-xs uppercase font-semibold"
                  >Framing Beauty</span
                >
              </div>
              <h2
                class="font-playfair text-2xl md:text-4xl lg:text-5xl font-light text-stone-800 leading-tight mb-3 md:mb-5"
              >
                Makeup
                <span class="font-bold text-[#D4AF37]/90">Products</span>
              </h2>
              <p
                class="text-stone-700 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6"
              >
               From soft neutrals to bold smoky tones, our eye collection is designed to define your gaze and make every look unforgettable.
              </p>
              <div class="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Foundation</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Skincare</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Concealer</span
                >
              </div>
              <div class="flex flex-wrap gap-3">
                <router-link
                  to="/makeupproducts"
                  class="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-amber-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3 hover:scale-105 shadow-md text-sm md:text-base"
                >
                  Explore Makeup Products
                  <i class="fas fa-arrow-right text-xs md:text-sm"></i>
                </router-link>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Massage  -->
    <section
      class="py-12 md:py-28 overflow-hidden bg-gradient-to-l from-[#f5e6d8] to-[#efe0d2]"
    >
      <div class="max-w-7xl mx-auto px-5 md:px-8">
        <div
          class="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-0 group"
        >
          <div class="md:w-1/2 relative group/image fade-on-scroll fade-left">
            <div
              class="relative w-full max-w-sm md:max-w-md mx-auto md:ml-auto md:mr-0"
            >
              <div
                class="relative overflow-hidden rounded-tl-[40px] md:rounded-tl-[80px] rounded-br-[40px] md:rounded-br-[80px] rounded-tr-xl rounded-bl-xl shadow-2xl transition-all duration-500 group-hover/image:shadow-2xl group-hover/image:shadow-amber-900/30 group-hover/image:scale-[1.02]"
              >
                <img
                  src="/images/massageproduct.jpg"
                  alt="Massage Products"
                  class="w-full h-auto object-cover aspect-[4/5] transition-all duration-700 ease-out group-hover/image:scale-110"
                />
              </div>
              <div
                class="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-10 h-10 md:w-20 md:h-20 border-b-2 border-r-2 border-amber-300/50 rounded-br-xl md:rounded-br-2xl pointer-events-none transition-all duration-300 group-hover/image:border-amber-500/70 group-hover/image:w-14 md:group-hover/image:w-24 group-hover/image:h-14 md:group-hover/image:h-24"
              ></div>
            </div>
          </div>
          <div
            class="md:w-1/2 flex items-center justify-end pr-0 md:pr-12 lg:pr-16 fade-on-scroll fade-right"
          >
            <div class="max-w-md py-6 md:py-12 text-right">
              <div class="flex items-center gap-2 mb-3 md:mb-4 justify-end">
                <span
                  class="text-amber-700 tracking-[0.2em] text-[10px] md:text-xs uppercase font-semibold"
                  >Silk Touch</span
                >
                <i
                  class="fas fa-gem text-xl md:text-2xl text-[#D4AF37]"
                ></i>
              </div>
              <h2
                class="font-playfair text-2xl md:text-4xl lg:text-5xl font-light text-stone-800 leading-tight mb-3 md:mb-5"
              >
                Massage 
                <span class="font-bold text-[#D4AF37]/90">Products</span>
              </h2>
              <p
                class="text-stone-700 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6"
              >
               Premium oils, soothing creams, and wellness essentials designed to relax the body and enhance every massage experience.s</p>
              <div
                class="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 justify-end"
              >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Soothe</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Relaxation</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Escape</span
                >
              </div>
              <div class="flex flex-wrap gap-3 justify-end">
                <router-link
                  to="/massageproducts"
                  class="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-amber-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3 hover:scale-105 shadow-md text-sm md:text-base"
                >
                  Explore Massage Products
                  <i class="fas fa-arrow-right text-xs md:text-sm"></i>
                </router-link>
          
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

       <!-- Laser -->
    <section
      class="py-12 md:py-28 overflow-hidden bg-secondary"
    >
      <div class="max-w-7xl mx-auto px-5 md:px-8">
        <div
          class="flex flex-col md:flex-row items-center gap-6 md:gap-0 group"
        >
          <div class="md:w-1/2 relative group/image fade-on-scroll fade-right">
            <div
              class="relative w-full max-w-sm md:max-w-md mx-auto md:mr-auto md:ml-0"
            >
              <div
                class="relative overflow-hidden rounded-br-[40px] md:rounded-br-[80px] rounded-tl-[40px] md:rounded-tl-[80px] rounded-tr-xl rounded-bl-xl shadow-2xl transition-all duration-500 group-hover/image:shadow-2xl group-hover/image:shadow-amber-900/30 group-hover/image:scale-[1.02]"
              >
                <img
                  src="/images/laserproduct.jpg"
                  alt="Laser Products"
                  class="w-full h-auto object-cover aspect-[4/5] transition-all duration-700 ease-out group-hover/image:scale-110"
                />
              </div>
              <div
                class="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-10 h-10 md:w-20 md:h-20 border-b-2 border-l-2 border-amber-300/50 rounded-bl-xl md:rounded-bl-2xl pointer-events-none transition-all duration-300 group-hover/image:border-amber-500/70 group-hover/image:w-14 md:group-hover/image:w-24 group-hover/image:h-14 md:group-hover/image:h-24"
              ></div>
            </div>
          </div>
          <div
            class="md:w-1/2 flex items-center justify-start pl-0 md:pl-12 lg:pl-16 fade-on-scroll fade-left"
          >
            <div class="max-w-md py-6 md:py-12">
              <div class="flex items-center gap-2 mb-3 md:mb-4">
                <i
                  class="fas fa-gem text-xl md:text-2xl text-[#D4AF37]"
                ></i>
                <span
                  class="text-[#D4AF37]/90 tracking-[0.2em] text-[10px] md:text-xs uppercase font-semibold"
                  >Sculpting Smoothness</span
                >
              </div>
              <h2
                class="font-playfair text-2xl md:text-4xl lg:text-5xl font-light text-stone-800 leading-tight mb-3 md:mb-5"
              >
                Laser
                <span class="font-bold text-[#D4AF37]/90">Products</span>
              </h2>
              <p
                class="text-stone-700 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6"
              >
              From precise treatments to advanced skin solutions, our laser services are designed to smooth, refine, and reveal your skin’s natural glow.
            </p>
              <div class="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Silken</span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Reset </span
                >
                <span
                  class="px-2 md:px-3 py-1 bg-amber-100 text-[#D4AF37] rounded-full text-[10px] md:text-xs font-semibold"
                  >Purity</span
                >
              </div>
              <div class="flex flex-wrap gap-3">
                <router-link
                  to="/laserproducts"
                  class="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-amber-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3 hover:scale-105 shadow-md text-sm md:text-base"
                >
                  Explore Laser Products
                  <i class="fas fa-arrow-right text-xs md:text-sm"></i>
                </router-link>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { useScrollAnimation } from '../composables/useScrollAnimation'

const products = [
  { image: '/images/hairproduct.jpg' },
  { image: '/images/nailsproduct.jpg' },
  { image: '/images/makeupproduct.jpg' },
  { image: '/images/laserproduct.jpg' },
  { image: '/images/massageproduct.jpg' }
]

// initialize scroll animation
useScrollAnimation()
</script>
<style scoped>
.animate-fade-scale {
  animation: fadeScale 0.6s ease-out;
}

@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ✅ ADD THESE (IMPORTANT) */
.fade-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

.fade-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-left {
  transform: translateX(-60px);
}

.fade-right {
  transform: translateX(60px);
}

.fade-left.visible,
.fade-right.visible {
  transform: translateX(0);
}
</style>