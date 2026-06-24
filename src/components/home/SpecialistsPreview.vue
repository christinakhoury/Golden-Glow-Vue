<template>
  <section id="specialists" class="py-32 bg-white relative overflow-hidden font-sans antialiased selection:bg-amber-100">
    
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- LEFT COLUMN: Fixed Editorial Master Header (Takes 4 spans) -->
        <div class="lg:col-span-4 lg:sticky lg:top-36 space-y-8 animate-fade-scale">
          <div>
            <span class="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-bold block mb-3">// ATELIER COHORT</span>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 tracking-tight leading-[1.1]" style="font-family: 'Playfair Display', serif;">
              Meet Our Specialists
            </h2>
          </div>
          
          <p class="text-stone-500 font-light text-sm md:text-base leading-relaxed max-w-sm">
            Experienced professionals dedicated to your beauty journey.
          </p>

          <div class="pt-6 hidden lg:block">
            <RouterLink :to="{ name: 'specialists' }"
              class="inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase text-stone-900 group"
            >
              <span class="border-b border-stone-900 pb-1 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors duration-300">
                Meet All Specialists
              </span>
              <div class="w-12 h-px bg-stone-900 group-hover:bg-[#D4AF37] group-hover:w-16 transition-all duration-300"></div>
            </RouterLink>
          </div>
        </div>

        <!-- RIGHT COLUMN: Premium Lookbook Carousel Frame (Takes 8 spans) -->
        <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
          <div
            v-for="(person, idx) in specialists"
            :key="person.name"
            class="group relative flex flex-col justify-between bg-white border border-stone-200/40 p-4 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:border-stone-300"
            :class="idx === 1 ? 'md:translate-y-8' : idx === 2 ? 'md:translate-y-16' : ''"
            :data-aos="'fade-up'"
            :data-aos-delay="idx * 150"
          >
            <!-- High Fashion Vertical Frame -->
            <div class="w-full aspect-[3/4] overflow-hidden bg-stone-100 relative">
              <!-- Internal luxury thin border accent -->
              <div class="absolute inset-3 border border-white/20 pointer-events-none z-20 transition-all duration-500 group-hover:inset-5"></div>
              <div class="absolute inset-0 bg-stone-950/5 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
              
              <img
                :src="person.image"
                :alt="person.name"
                class="w-full h-full object-cover transition-transform duration-[1.6s] cubic-bezier(0.25, 1, 0.5, 1) scale-100 group-hover:scale-105"
              />
            </div>

            <!-- Sleek Sliding-Details Overlay / Panel Info -->
            <div class="pt-6 text-left space-y-3">
              <div class="space-y-1">
                <span class="text-[#D4AF37] text-[10px] tracking-widest font-bold uppercase block">
                  {{ person.role }}
                </span>
                <h3 class="text-xl font-light text-stone-900 tracking-tight" style="font-family: 'Playfair Display', serif;">
                  {{ person.name }}
                </h3>
              </div>

              <!-- Micro Metadata Row -->
              <div class="flex items-center gap-2 pt-1 border-t border-stone-100 font-mono text-[10px] text-stone-400">
                <span class="text-stone-700 font-semibold">⭐ {{ person.rating }}</span>
                <span>•</span>
                <span>{{ person.experience }} Exp</span>
              </div>
            </div>

            <!-- Invisible anchor wrapper component parameters placeholder so SpecialistCard architecture can map perfectly underneath if running child components safely -->
            <div class="hidden">
              <span>{{ person.specialty }}</span>
              <span>{{ person.price }}</span>
              <span>{{ person.service }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Mobile/Tablet Fallback Footer Link -->
      <div class="mt-24 text-center lg:hidden">
        <RouterLink :to="{ name: 'specialists' }"
          class="inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase text-stone-900 group"
        >
          <span class="border-b border-stone-900 pb-1 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors duration-300">
            Meet All Specialists
          </span>
          <div class="w-12 h-px bg-stone-900 group-hover:bg-[#D4AF37] group-hover:w-16 transition-all duration-300"></div>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const specialists = [
  {
    name: "Sarah Akiki",
    role: "Senior Hair Stylist",
    rating: "4.9",
    experience: "3 Years",
    specialty: "Hair Styling",
    price: "$25 – $120",
    image: "/images/sarah.jpg",
    service: "hair"
  },
  {
    name: "Maya Rahme",
    role: "Nail Artist",
    rating: "4.8",
    experience: "4 Years",
    specialty: "Nail Art",
    price: "$20 – $100",
    image: "/images/maya.jpg",
    service: "nails"
  },
  {
    name: "Charbel Obeid",
    role: "Makeup Artist",
    rating: "5.0",
    experience: "8 Years",
    specialty: "Bridal Makeup",
    price: "$50 – $200",
    image: "/images/charbel.jpg",
    service: "makeup"
  }
]
</script>

<style scoped>
.animate-fade-scale {
  animation: fadeScale 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.99) translateY(15px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>