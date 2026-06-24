<template>
  <section id="reviews" class="py-36 bg-white relative overflow-hidden font-sans antialiased selection:bg-[#D4AF37]/10">
    
  
    <div class="absolute inset-y-0 left-1/3 w-px bg-stone-200/40 hidden lg:block"></div>
    <div class="absolute inset-y-0 left-2/3 w-px bg-stone-200/40 hidden lg:block"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      
      <!-- STRIKING ASYMMETRICAL HEADER -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20 items-end border-b border-stone-200">
        <div class="lg:col-span-8 text-left" data-aos="fade-right" data-aos-duration="1000">
          <span class="text-[#D4AF37] text-xs tracking-[0.5em] uppercase font-bold block mb-3">
            // VERIFIED JOURNAL ENTRANCE
          </span>
          <h2 class="text-5xl md:text-7xl font-light text-stone-900 tracking-tighter leading-[0.95]" style="font-family: 'Playfair Display', serif;">
            What Our <br><span class="italic font-serif font-normal text-[#D4AF37]">Beloved</span> Clients Say
          </h2>
        </div>
        <div class="lg:col-span-4 text-left lg:text-right hidden lg:block" data-aos="fade-left" data-aos-duration="1000">
          <p class="text-stone-400 font-mono text-[10px] tracking-widest uppercase">
            EST. 2019 / RETURNING CLIENT RATE 94.6%
          </p>
        </div>
      </div>

      <!-- DESIGN FORWARD STAGGERED GRID PACK -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-20">
        <div 
          v-for="(review, idx) in reviews" 
          :key="review.name" 
          class="flex flex-col justify-between text-left bg-white border border-stone-200/60 p-8 lg:p-10 transition-all duration-700 ease-out hover:border-[#D4AF37] hover:shadow-[0_40px_80px_-20px_rgba(212,175,55,0.06)] group relative" 
          :class="[
            idx === 1 ? 'md:translate-y-8 border-b-4' : '',
            idx === 2 ? 'md:translate-y-16' : ''
          ]"
          data-aos="fade-up"
          :data-aos-delay="idx * 150"
        >
          <!-- Elegant Dynamic Floating Glow Card Accent -->
          <div class="absolute top-0 left-0 w-full h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

          <div class="space-y-6">
            <!-- Micro Star Core Config -->
            <div class="flex items-center gap-1.5 text-[#D4AF37] text-[10px] tracking-[0.3em]">
              <span class="transform group-hover:scale-110 transition-transform duration-300 delay-75">★</span>
              <span class="transform group-hover:scale-110 transition-transform duration-300 delay-100">★</span>
              <span class="transform group-hover:scale-110 transition-transform duration-300 delay-150">★</span>
              <span class="transform group-hover:scale-110 transition-transform duration-300 delay-200">★</span>
              <span class="transform group-hover:scale-110 transition-transform duration-300 delay-250">★</span>
            </div>
            
            <!-- Core Block Quote Text Body -->
            <p class="text-stone-800 text-lg font-light leading-relaxed tracking-wide italic transition-transform duration-500 group-hover:-translate-y-1" style="font-family: 'Playfair Display', serif;">
              "{{ review.text }}"
            </p>
          </div>

          <!-- Signature Section Block -->
          <div class="pt-10 mt-6 flex items-center gap-4 border-t border-stone-100">
            <div class="relative w-8 h-8 rounded-full bg-stone-50 overflow-hidden border border-stone-200 flex items-center justify-center font-mono text-[10px] text-stone-400 uppercase font-bold group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all duration-500">
              {{ review.name.charAt(0) }}
            </div>
            <div>
              <span class="text-xs font-bold tracking-[0.2em] uppercase text-stone-900 block">
                {{ review.name }}
              </span>
              <span class="text-[9px] tracking-widest uppercase font-mono text-stone-400 block mt-0.5">
                Verified Resident
              </span>
            </div>
          </div>
          
          <!-- Large Decorative Hanging Watermark inside card back frame -->
          <span class="absolute bottom-6 right-6 font-serif text-6xl text-stone-100/70 select-none group-hover:text-[#D4AF37]/5 transition-colors duration-500 pointer-events-none">”</span>
        </div>
      </div>

      <!-- Structural Balanced Padding Offset Spacer -->
      <div class="h-16 md:h-24"></div>

    </div>
  </section>
</template>

<script setup>
const reviews = [
  {
    name: "Christina K.",
    text: "Amazing service and wonderful staff. I always leave feeling beautiful."
  },
  {
    name: "Emily M.",
    text: "The attention to detail is unmatched! Every visit leaves me impressed and delighted with the results."
  },
  {
    name: "Sophia A.",
    text: "A beautiful atmosphere, talented specialists, and outstanding service. I wouldn't trust anyone else."
  }
]
</script>

<style scoped>
/* Smooth rendering layers */
#reviews .group {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
</style>