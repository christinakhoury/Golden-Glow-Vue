<template>
  <section id="services" class="py-28 bg-[#faf8f5] relative">
    <div class="max-w-7xl mx-auto px-6">
      
      <!-- HEADER -->
      <div class="mb-20 text-left max-w-xl">
        <span class="text-[#D4AF37] tracking-[0.3em] text-xs uppercase font-semibold block mb-3">
          Menu
        </span>
        <h2 class="font-playfair text-4xl md:text-6xl font-light text-stone-900 mb-6 tracking-tight">
          Our Signature Services
        </h2>
      
      </div>

      <!-- EDITORIAL INTERACTIVE SPLIT DESIGN -->
      <div class="flex flex-col lg:flex-row gap-12 items-stretch min-h-[500px]">
        
        <!-- LEFT SCREEN: THE DYNAMIC LIVE CANVAS -->
        <div class="w-full lg:w-5/12 relative overflow-hidden bg-stone-900 group">
          <transition-group name="luxury-fade">
            <div 
              v-for="(service, index) in services" 
              :key="service.name"
              v-show="activeTrack === index"
              class="absolute inset-0 w-full h-full"
            >
              <div class="absolute inset-0 bg-stone-950/20 z-10"></div>
              <img 
                :src="service.image" 
                :alt="service.name" 
                class="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            </div>
          </transition-group>
          <!-- Elegant Framing Accent Line -->
          <div class="absolute inset-4 border border-white/10 pointer-events-none z-20"></div>
        </div>

        <!-- RIGHT SCREEN: THE MINIMALIST LIST INDEX -->
        <div class="w-full lg:w-7/12 flex flex-col justify-center divide-y divide-stone-200/60 border-t border-b border-stone-200/60">
          <router-link
            v-for="(service, index) in services"
            :key="service.name"
            :to="service.link"
            @mouseenter="activeTrack = index"
            class="group py-6 md:py-8 flex items-center justify-between transition-all duration-300 relative pl-0 hover:pl-4"
          >
            <!-- Background highlight accent slide on hover -->
            <div class="flex items-start gap-6 max-w-xl">
              <span class="font-serif text-xs text-stone-400 group-hover:text-[#D4AF37] transition-colors pt-1.5">
                0{{ index + 1 }}
              </span>
              <div>
                <h3 class="font-playfair text-2xl md:text-3xl font-light text-stone-900 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {{ service.name }}
                </h3>
                <p class="text-stone-500 text-xs md:text-sm font-light mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 max-h-0 md:group-hover:max-h-16 overflow-hidden transition-all duration-500 ease-out leading-relaxed">
                  {{ service.desc }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-4 text-stone-400 group-hover:text-stone-900 transition-colors">
              <span class="text-[10px] tracking-widest uppercase font-medium hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore 
              </span>
              <i class="fas fa-arrow-right text-xs transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"></i>
            </div>
          </router-link>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTrack = ref(0)

const services = [
  { 
    name: 'Hair', 
    desc: 'Expert cuts, custom color, and deep conditioning treatments to restore shine.', 
    image: '/images/hero1.jpg', 
    link: '/services/hair' 
  },
  { 
    name: 'Nails', 
    desc: 'Flawless manicures, pedicures, and long-lasting extensions with custom nail art.', 
    image: '/images/hero3.jpg', 
    link: '/services/nails' 
  },
  { 
    name: 'Makeup', 
    desc: 'Beautiful looks for everyday elegance, special events, and flawless bridal styles.', 
    image: '/images/ml4.jpeg', 
    link: '/services/makeup' 
  },
  { 
    name: 'Massage', 
    desc: 'Relaxing deep-tissue and hot stone massages using natural, organic oils.', 
    image: '/images/hero4.jpg', 
    link: '/services/massage' 
  },
  { 
    name: 'Laser', 
    desc: 'Safe, advanced laser hair removal and treatments for smooth, glowing skin.', 
    image: '/images/laserproduct.jpg', 
    link: '/services/laser' 
  },
  ]
</script>

<style scoped>
/* High-End Slow Dissolve Cross-Fade effect */
.luxury-fade-enter-active,
.luxury-fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}
.luxury-fade-enter-from,
.luxury-fade-leave-to {
  opacity: 0;
}
</style>