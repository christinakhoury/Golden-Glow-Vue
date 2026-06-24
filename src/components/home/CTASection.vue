<template>
  <section id="cta-glow" class="py-36 bg-gradient-to-br from-[#FAF6F0] via-[#F3E1D3] to-[#E06A4E]/30 text-stone-900 relative overflow-hidden font-sans antialiased selection:bg-[#D4AF37]/20 border-t border-stone-100">
    
    <!-- LUXURY GLASSMORPHISM REFRAC BACKGROUNDS -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute right-10 bottom-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
    <div class="absolute left-12 inset-y-0 w-px bg-stone-900/5 hidden lg:block"></div>
    <div class="absolute right-12 inset-y-0 w-px bg-stone-900/5 hidden lg:block"></div>

    <div class="max-w-4xl mx-auto px-6 text-center relative z-10" data-aos="zoom-in" data-aos-duration="1200">
      
      <!-- MINIMALIST GRAPHIC EMBLEM -->
      <div class="flex items-center justify-center gap-3 mb-10">
        <span class="w-2 h-2 rounded-full bg-stone-900 animate-ping"></span>
        <div class="w-16 h-px bg-stone-900/20"></div>
        <span class="font-mono text-[10px] tracking-[0.3em] uppercase text-stone-600 font-bold">RESERVE NOW</span>
        <div class="w-16 h-px bg-stone-900/20"></div>
        <span class="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
      </div>

      <!-- POPPING HIGH-END EDITORIAL HEADLINE -->
      <h2 class="text-6xl md:text-8xl font-light text-stone-900 tracking-tighter leading-none mb-8" style="font-family: 'Playfair Display', serif;">
        Ready For Your <br class="hidden sm:inline"><span class="italic font-normal text-[#D4AF37] border-b-2 border-stone-950/80 pb-2">Next Glow?</span>
      </h2>
      
      <p class="text-stone-700 font-medium text-base md:text-xl max-w-xl mx-auto leading-relaxed mb-14 drop-shadow-sm">
        Schedule your appointment today and experience luxury beauty care.
      </p>

      <!-- MAGNET DESIGN BUTTON WRAPPER -->
      <div class="inline-block relative group">
        <!-- Pulse Border Frame Tracking -->
        <div class="absolute -inset-2 border-2 border-stone-900 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 rounded-full pointer-events-none"></div>
        
        <RouterLink 
          to="/#services" 
          class="relative z-10 bg-stone-900 text-white hover:bg-stone-950 px-14 py-6 text-xs tracking-[0.3em] uppercase font-bold transition-all duration-500 block rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <!-- Shimmer Beam Overlay Refraction -->
          <div class="absolute -inset-x-full top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shimmer pointer-events-none"></div>
          
          <span class="relative z-10 flex items-center justify-center gap-4">
            Book Appointment
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(12deg);
  }
  100% {
    transform: translateX(100%) skewX(12deg);
  }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.1); }
}

.group:hover .group-hover\:animate-shimmer {
  animation: shimmer 1.4s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>