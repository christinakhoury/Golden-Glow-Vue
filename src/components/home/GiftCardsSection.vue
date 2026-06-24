<template>
  <section id="gift-cards" class="py-36 bg-white text-stone-900 relative overflow-hidden font-sans antialiased selection:bg-[#D4AF37]/10">
    
    <!-- HIGH-FASHION FINE ARCHITECTURAL ACCENTS -->
    <div class="absolute inset-y-0 left-12 w-px bg-stone-100 hidden lg:block"></div>
    <div class="absolute inset-y-0 right-12 w-px bg-stone-100 hidden lg:block"></div>
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-[#FAF6F0]/60 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 text-center">
      
      <!-- HERO CONTENT CONTROL ACCENT -->
      <div class="max-w-3xl mx-auto mb-24 space-y-4" data-aos="fade-up" data-aos-duration="1000">
        <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">Gift Cards</p>
        <h2 class="text-4xl md:text-6xl font-light text-stone-900 tracking-tighter leading-tight" style="font-family: 'Playfair Display', serif;">
          The Perfect Gift for Someone Special
        </h2>
        <div class="w-12 h-px bg-[#D4AF37] mx-auto my-6"></div>
        <p class="text-stone-500 font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Ideal for birthdays, weddings, and Mother's Day. Give the gift of luxury beauty care.
        </p>
      </div>

      <!-- PREMIUM INTERACTIVE VOUCHER CAROUSEL GRID -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
        <router-link
          v-for="(gift, idx) in gifts"
          :key="gift.amount"
          :to="`/giftcards?amount=${gift.amount}`"
          class="group border border-stone-200 p-8 lg:p-10 bg-white text-stone-800 relative aspect-[1/1.3] flex flex-col justify-between items-center overflow-hidden transition-all duration-700 ease-out hover:border-[#D4AF37] hover:shadow-[0_30px_60px_-20px_rgba(212,175,55,0.15)] hover:-translate-y-2"
          data-aos="fade-up"
          :data-aos-delay="idx * 100"
        >
          <!-- Luxury White Metallic Shimmer Beam Overlay -->
          <div class="absolute -inset-x-full top-0 bottom-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent skew-x-12 group-hover:animate-shimmer pointer-events-none"></div>
          
          <!-- Card Structural Geometric Frame Accents -->
          <div class="absolute inset-3 border border-stone-100 pointer-events-none transition-colors duration-500 group-hover:border-[#D4AF37]/20"></div>

          <!-- Top Meta Label -->
          <span class="font-mono text-[9px] tracking-[0.3em] uppercase text-stone-400 group-hover:text-[#D4AF37] transition-colors duration-500 relative z-10 font-bold">
            // VALUED PASS
          </span>

          <!-- Main Amount Callout Anchor -->
          <div class="space-y-2 relative z-10">
            <h3 class="text-4xl lg:text-5xl font-light tracking-tighter text-stone-900 group-hover:scale-110 transition-transform duration-700" style="font-family: 'Playfair Display', serif;">
              ${{ gift.amount }}
            </h3>
            <span class="text-[9px] uppercase tracking-widest text-stone-400 font-mono block">USD Currency</span>
          </div>

          <!-- Premium Base Indicator Hook -->
          <div class="flex flex-col items-center gap-2 relative z-10">
            <div class="w-8 h-px bg-stone-200 group-hover:bg-[#D4AF37] group-hover:w-12 transition-all duration-500"></div>
            <span class="text-[9px] font-bold tracking-[0.25em] uppercase text-stone-400 group-hover:text-stone-900 transition-colors duration-500">
              Purchase
            </span>
          </div>

          <!-- Subtle Background Watermark Layer -->
          <span class="absolute -bottom-6 font-serif text-7xl font-bold text-stone-500/[0.02] select-none tracking-tighter transition-colors duration-500 group-hover:text-[#D4AF37]/5">
            GLOW
          </span>
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup>
const gifts = [
  { amount: 25 },
  { amount: 50 },
  { amount: 100 },
  { amount: 250 }
]
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(12deg);
  }
  100% {
    transform: translateX(100%) skewX(12deg);
  }
}

.group:hover .group-hover\:animate-shimmer {
  animation: shimmer 1.6s ease-in-out infinite;
}
</style>