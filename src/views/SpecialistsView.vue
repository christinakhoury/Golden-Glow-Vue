<template>
  <div class="body-font bg-[#FCFBF9] text-stone-900 min-h-screen selection:bg-[#D4AF37]/20">
    
    <!-- LUXURY HERO EMBASSY -->
    <section class="relative pt-44 pb-32 px-6 overflow-hidden bg-gradient-to-b from-[#F5E6D8]/30 to-transparent">
      <!-- Architectural structural accents -->
      <div class="absolute left-1/2 top-0 bottom-0 w-px bg-stone-200/60 hidden lg:block"></div>
      
      <div class="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div class="space-y-6 text-left animate-fade-scale">
          <span class="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block">
            // Golden Glow Studio Team
          </span>
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter heading-font text-stone-900 leading-[0.9]" style="font-family: 'Playfair Display', serif;">
            Meet Our <br><span class="italic font-serif font-normal text-[#D4AF37]">Beloved</span> Team
          </h1>
        </div>
        
        <div class="space-y-8 lg:pl-16 text-left animate-fade-scale" style="animation-delay: 150ms;">
          <p class="text-stone-600 font-light text-base md:text-lg leading-relaxed max-w-md">
            A handpicked collection of artists, specialists, and beauty experts dedicated to bringing out your most confident glow.
          </p>
          
          <!-- Elegant Floating Quick-Links Panel -->
          <div class="flex flex-wrap gap-2 pt-2">
            <a
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              class="px-4 py-2 rounded-none text-[11px] tracking-widest uppercase font-semibold border border-stone-300 text-stone-600 bg-transparent hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-400 ease-out"
            >
              {{ section.title }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- COHORT SHOWCASE SECTIONS -->
    <section 
      v-for="section in sections" 
      :key="section.id" 
      :id="section.id" 
      :class="section.bg" 
      class="py-28 border-t border-stone-200/70 scroll-mt-12 bg-white"
    >
      <div class="max-w-6xl mx-auto px-6">
        
        <!-- Cohort Title Left-Aligned Accent -->
        <div class="mb-20 flex items-center gap-6 fade-on-scroll fade-up-slide">
          <h2 class="heading-font text-2xl md:text-4xl font-light text-stone-900 tracking-tight" style="font-family: 'Playfair Display', serif;">
            {{ section.title }}
          </h2>
          <div class="flex-1 h-px bg-gradient-to-r from-stone-300 via-stone-100 to-transparent"></div>
        </div>

        <!-- Luxury Asymmetrical Alternating Rows Stack -->
        <div class="space-y-24 max-w-4xl mx-auto">
          <div 
            v-for="(specialist, idx) in section.specialists" 
            :key="specialist.key" 
            class="flex flex-col md:flex-row items-center gap-12 lg:gap-16 group"
            :class="idx % 2 !== 0 ? 'md:flex-row-reverse' : ''"
          >
            <!-- Media Display Core Frame -->
            <div class="w-full md:w-1/2 relative fade-on-scroll" :class="idx % 2 === 0 ? 'fade-right' : 'fade-left'">
              <!-- Architectural Frame Accents mimicking an fine art display -->
              <div class="absolute inset-4 border border-white/20 pointer-events-none z-20"></div>
              <div class="absolute -inset-2 border border-stone-200/40 pointer-events-none z-0 transform group-hover:scale-102 transition-transform duration-500"></div>
              
              <div class="aspect-[4/5] w-full overflow-hidden relative z-10 bg-stone-50 shadow-sm">
                <div class="absolute inset-0 bg-stone-900/5 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <img 
                  :src="specialist.img" 
                  :alt="specialist.name" 
                  class="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-103" 
                />
              </div>
            </div>

            <!-- Content Details Column -->
            <div class="w-full md:w-1/2 space-y-5 text-left relative z-10 fade-on-scroll" :class="idx % 2 === 0 ? 'fade-left' : 'fade-right'">
              <div class="space-y-1">
                <span class="text-[#D4AF37] text-[10px] tracking-[0.25em] font-bold uppercase block">
                  {{ specialist.role }}
                </span>
                <h3 class="text-3xl font-light text-stone-900 tracking-tight" style="font-family: 'Playfair Display', serif;">
                  {{ specialist.name }}
                </h3>
              </div>

              <!-- Premium Meta Row -->
              <div class="inline-flex items-center gap-4 bg-stone-50 border border-stone-200/60 px-4 py-2 font-mono text-[11px] text-stone-500">
                <span class="text-stone-800 font-medium">⭐ {{ specialist.rating }}</span>
                <span class="w-px h-3 bg-stone-300"></span>
                <span>{{ specialist.exp }} Experience</span>
              </div>

              <p class="text-stone-500 font-light text-sm leading-relaxed max-w-sm italic">
                "Honoring unique natural canvas attributes with highly tailored technical precision and absolute presence."
              </p>

              <!-- Luxury Reservation Wire Anchor -->
             <div class="pt-4">
  <RouterLink 
    :to="{ name: 'service', params: { type: specialist.service } }" 
    class="inline-block relative overflow-hidden bg-stone-900 hover:bg-[#D4AF37] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-8 py-4 transition-all duration-500 shadow-sm rounded-none transform hover:-translate-y-0.5"
  >
    Book Now
  </RouterLink>
</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router"
import { sections } from "../data/specialists"
import { useScrollAnimation } from '../composables/useScrollAnimation'

// Trigger intersection observer setup for text/image slide ins
useScrollAnimation()
</script>

<style scoped>
/* Keyframe animations for top hero entries */
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

/* Intersectional Scroll Dynamic Target Hooks */
.fade-on-scroll {
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.fade-on-scroll.visible {
  opacity: 1;
  transform: translate(0, 0) !important;
}

/* Slide configurations matching alternating split views */
.fade-left {
  transform: translateX(-40px);
}

.fade-right {
  transform: translateX(40px);
}

.fade-up-slide {
  transform: translateY(30px);
}
</style>