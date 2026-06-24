<template>
  <section id="membership" class="py-36 bg-[#FAF8F5] text-stone-900 relative overflow-hidden font-sans antialiased selection:bg-[#D4AF37]/10">
    
    <!-- LUXURY GRAPHIC GRAPH MATRIX -->
    <div class="absolute inset-y-0 left-12 w-px bg-stone-200/40 hidden lg:block"></div>
    <div class="absolute inset-y-0 right-12 w-px bg-stone-200/40 hidden lg:block"></div>

    <div class="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        <!-- STICKY EDITORIAL CONTROL ANCHOR (Left Column) -->
        <div class="lg:col-span-5 lg:sticky lg:top-36 space-y-8" data-aos="fade-right" data-aos-duration="1200">
          <div class="space-y-3">
            <span class="text-[#D4AF37] text-xs tracking-[0.5em] uppercase font-bold block">
              // Exclusive Membership
            </span>
            <h2 class="text-5xl md:text-6xl lg:text-7xl font-light text-stone-900 tracking-tighter leading-[0.95]" style="font-family: 'Playfair Display', serif;">
              Join Glow <br><span class="italic font-serif font-normal text-[#D4AF37]">Rewards</span>
            </h2>
          </div>
          
          <p class="text-stone-500 font-light text-sm md:text-base leading-relaxed max-w-sm">
            Earn points with every appointment and unlock exclusive member benefits.
          </p>

          <!-- Integrated Structural Dynamic Button Accent -->
          <div class="pt-4">
            <RouterLink 
              to="/vip" 
              class="inline-flex items-center gap-6 group text-[11px] font-bold tracking-[0.35em] uppercase text-stone-900"
            >
              <span class="relative py-1">
                Become VIP
                <span class="absolute bottom-0 left-0 w-full h-px bg-stone-900 origin-left transition-transform duration-500 group-hover:scale-x-110 group-hover:bg-[#D4AF37]"></span>
              </span>
              <div class="w-12 h-px bg-stone-900 group-hover:bg-[#D4AF37] group-hover:w-20 transition-all duration-500"></div>
            </RouterLink>
          </div>
        </div>

        <!-- STAGGERED REWARDS PASSPORT STACK (Right Column) -->
        <div class="lg:col-span-7 space-y-2 pt-4">
          <div 
            v-for="(item, idx) in perks" 
            :key="item.title" 
            class="group border-b border-stone-200/70 py-10 flex flex-col sm:flex-row items-start justify-between gap-6 transition-all duration-500 ease-out relative"
            data-aos="fade-up"
            :data-aos-delay="idx * 150"
          >
            <!-- Left Meta Section -->
            <div class="flex items-baseline gap-6 sm:gap-10">
              <span class="font-mono text-[10px] text-stone-400 font-bold tracking-widest group-hover:text-[#D4AF37] transition-colors duration-300">
                [ 0{{ idx + 1 }} ]
              </span>
              
              <div class="space-y-3 max-w-md">
                <h3 class="text-2xl font-light text-stone-900 tracking-tight transition-colors duration-500 group-hover:text-[#D4AF37]" style="font-family: 'Playfair Display', serif;">
                  {{ item.title }}
                </h3>
                <p class="text-stone-500 text-sm font-light leading-relaxed transition-colors duration-500 group-hover:text-stone-700">
                  {{ item.desc }}
                </p>
              </div>
            </div>

            <!-- Interactive Dynamic Wire Indicator -->
            <div class="relative pt-2 self-end sm:self-start">
              <div class="w-8 h-8 border border-stone-200 group-hover:border-[#D4AF37] group-hover:bg-stone-900 flex items-center justify-center transition-all duration-500 rounded-none transform group-hover:rotate-45">
                <span class="text-stone-400 group-hover:text-[#D4AF37] font-mono text-[10px] transition-all duration-500 transform group-hover:-rotate-45">+</span>
              </div>
            </div>
            
            <!-- Floating Ambient Graphic Background Accent -->
            <span class="absolute right-16 top-4 font-serif text-8xl text-stone-100/10 pointer-events-none select-none transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 group-hover:text-[#D4AF37]/5" style="font-family: 'Playfair Display', serif;">
              0{{ idx + 1 }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const perks = [
  {
    title: "Earn Points",
    desc: "Collect rewards with every booking."
  },
  {
    title: "VIP Discounts",
    desc: "Access members-only offers."
  },
  {
    title: "Priority Booking",
    desc: "Reserve appointments before everyone else."
  }
]
</script>