<template>
  <section id="offers" class="py-32 lg:py-44 bg-[#FAF8F5] text-stone-900 relative overflow-hidden font-sans antialiased selection:bg-[#D4AF37]/20">
    
    <!-- HIGH-FASHION BACKGROUND TECH ARTIFACTS -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-12 w-px h-full bg-stone-200/50 hidden lg:block"></div>
    <div class="absolute top-0 right-1/3 w-px h-full bg-stone-200/30 hidden lg:block"></div>

    <div class="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        <!-- SIDEBAR LEFT: ASYMMETRIC STICKY HERO HEADER -->
        <div class="lg:col-span-4 lg:sticky lg:top-36 space-y-8" data-aos="fade-right" data-aos-duration="1200">
          <div class="space-y-3">
            <span class="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold flex items-center gap-3">
              <span class="w-8 h-px bg-[#D4AF37]"></span> Curated Pairings
            </span>
            <h2 class="text-5xl md:text-6xl font-light text-stone-900 tracking-tight leading-none" style="font-family: 'Playfair Display', serif;">
              Exclusive <br><span class="italic font-normal text-[#D4AF37]">Offers</span>
            </h2>
          </div>
          
          <p class="text-stone-500 font-light text-sm leading-relaxed max-w-sm border-l border-stone-300 pl-4">
            Maximize your alignment window. Save more when you combine luxury treatments into synchronized single-day sessions.
          </p>

          <!-- Fine-line compass graphic element -->
          <div class="pt-6 hidden lg:block">
            <div class="w-16 h-16 border border-stone-200 rounded-full flex items-center justify-center relative animate-spin-slow">
              <span class="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
              <span class="absolute top-0 w-px h-2 bg-[#D4AF37]"></span>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE: LAYERED STACKING DECK LAYOUT -->
        <div class="lg:col-span-8 space-y-8">
          <a 
            v-for="(offer, idx) in offers" 
            :key="offer.title" 
            :href="offer.link" 
            class="group bg-white border border-stone-200/70 p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 transition-all duration-700 ease-out hover:border-stone-900 hover:bg-white hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.06)] relative overflow-hidden" 
            data-aos="fade-up"
            :data-aos-delay="idx * 100"
          >
            <!-- Left-side Accent Multiplier Strip -->
            <div class="absolute inset-y-0 left-0 w-1 bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            
            <!-- Left block: Info Framing -->
            <div class="space-y-4 max-w-md relative z-10">
              <div class="flex items-center gap-4">
                <span class="font-mono text-xs text-stone-400 tracking-widest block font-semibold">
                  // METRIC 0{{ idx + 1 }}
                </span>
                <span class="h-px w-4 bg-stone-200"></span>
                <span class="text-[10px] tracking-widest text-stone-400 uppercase font-mono group-hover:text-stone-900 transition-colors">
                  Multi-Tier Package
                </span>
              </div>
              
              <h3 class="text-3xl font-light text-stone-900 tracking-tight group-hover:translate-x-1 transition-transform duration-500" style="font-family: 'Playfair Display', serif;">
                {{ offer.title }}
              </h3>
              
              <p class="text-stone-500 text-xs font-light leading-relaxed">
                {{ offer.desc }}
              </p>
            </div>

            <!-- Right block: Action Layer -->
            <div class="flex md:flex-col justify-between items-end w-full md:w-auto pt-6 md:pt-0 border-t border-stone-100 md:border-none relative z-10">
              <!-- Geometric Percent Tag -->
              <div class="text-right">
                <div class="text-4xl font-light font-serif tracking-tighter text-[#D4AF37] group-hover:text-stone-900 transition-colors duration-500">
                  {{ offer.discount }}
                </div>
                <span class="text-[9px] text-stone-400 tracking-[0.2em] uppercase font-mono block mt-1">At Checkout</span>
              </div>

              <!-- High Contrast Slide Arrow Link Button -->
              <div class="md:mt-6">
                <div class="w-12 h-12 rounded-full border border-stone-200 group-hover:border-stone-900 group-hover:bg-stone-900 flex items-center justify-center transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-stone-600 group-hover:text-white transform transition-transform duration-500 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Massive Dynamic Background Serif Counter Watermark -->
            <span class="absolute -right-4 -bottom-10 font-serif text-[11rem] font-bold text-stone-100/30 group-hover:text-[#D4AF37]/5 transition-colors duration-700 pointer-events-none select-none tracking-tighter" style="font-family: 'Playfair Display', serif;">
              0{{ idx + 1 }}
            </span>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const offers = [ {
    title: "Hair + Nails",
    discount: "10% OFF",
    desc: "Perfect combo for a full glow-up.",
    link: "/book?offer=hair-nails"
  },
  {
    title: "Laser + Massage",
    discount: "15% OFF",
    desc: "Relax & refresh your body.",
    link: "/book?offer=laser-massage"
  },
  {
    title: "Bridal Package",
    discount: "20% OFF",
    desc: "Hair + Makeup + Nails luxury package.",
    link: "/book?offer=bridal-package"
  }
]
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
</style>