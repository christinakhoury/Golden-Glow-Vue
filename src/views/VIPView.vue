<template>
  <div class="min-h-screen bg-[#FAF8F5] text-stone-900 pt-40 pb-28 relative overflow-hidden font-sans antialiased selection:bg-[#D4AF37]/10">
    
    <!-- BACKGROUND MATRIX & AMBIENT AURA -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#e5e1da_1px,transparent_1px),linear-gradient(to_bottom,#e5e1da_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none"></div>
    <div class="absolute right-0 top-0 w-[500px] h-[500px] bg-[#F5E6D8]/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      
      <!-- HERO ANCHOR HEADER -->
      <div class="text-center max-w-3xl mx-auto mb-24 space-y-4" data-aos="fade-up" data-aos-duration="1000">
        <span class="text-[#D4AF37] text-xs tracking-[0.5em] uppercase font-bold block">
          // Exclusive Access
        </span>
        <h1 class="text-4xl md:text-6xl font-light tracking-tight text-stone-900 leading-tight" style="font-family: 'Playfair Display', serif;">
          Golden Glow VIP Membership
        </h1>
        <div class="w-12 h-px bg-[#D4AF37] mx-auto my-6"></div>
        <p class="text-stone-500 font-light text-base md:text-lg leading-relaxed">
          Enjoy exclusive beauty privileges, priority booking, special discounts, and luxury experiences reserved for our most valued members.
        </p>
      </div>

      <!-- THE CORE MASTER VAULT LAYOUT -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <!-- LEFT: THE METALLIC VIP BLACK CARD PASSPORT (Takes 5 spans) -->
        <div class="lg:col-span-5 lg:sticky lg:top-36" data-aos="fade-right" data-aos-duration="1200">
          <div class="group relative perspective-1000">
            
            <!-- PHYSICAL BLACK CARD CONTAINER -->
            <div class="w-full aspect-[1.58/1] bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 rounded-none p-8 flex flex-col justify-between shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-stone-800 relative overflow-hidden transition-all duration-500 transform group-hover:scale-[1.02] group-hover:shadow-[0_40px_80px_-15px_rgba(212,175,55,0.15)] group-hover:border-[#D4AF37]/40">
              
              <!-- Luxury Watermark Refraction Line Glow -->
              <div class="absolute -inset-x-full top-0 bottom-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shimmer pointer-events-none"></div>
              
              <!-- Card Top Deck -->
              <div class="flex justify-between items-start z-10">
                <div class="space-y-1 text-left">
                  <span class="text-[#D4AF37] font-mono text-[9px] tracking-[0.3em] uppercase block font-bold">ATELIER TIER</span>
                  <h2 class="text-xl font-light text-stone-100 tracking-wide" style="font-family: 'Playfair Display', serif;">
                    Welcome, {{ displayName }}
                  </h2>
                </div>
                <!-- Micro Geometric Logo Icon Placement -->
                <div class="w-7 h-7 border border-[#D4AF37]/40 flex items-center justify-center rotate-45">
                  <div class="w-2 h-2 bg-[#D4AF37] -rotate-45"></div>
                </div>
              </div>

              <!-- Card Bottom Ledger Balance Deck -->
              <div class="text-left z-10 space-y-1">
                <p class="text-stone-400 font-mono text-[10px] tracking-widest uppercase">
                  Current Reward Points
                </p>
                <div class="flex items-baseline gap-2">
                  <span class="text-4xl md:text-5xl font-light text-stone-100 tracking-tighter" style="font-family: 'Playfair Display', serif;">
                    {{ user?.points || 0 }}
                  </span>
                  <span class="text-[#D4AF37] text-xs uppercase tracking-widest font-mono">pts</span>
                </div>
              </div>

              <!-- Decorative Absolute Background Label String -->
              <span class="absolute bottom-4 right-6 font-serif text-6xl text-white/[0.02] font-bold select-none tracking-tighter">GOLDEN GLOW</span>
            </div>

            <!-- Soft Underlying Geometric Accent Backdrop Layout Frame Layer -->
            <div class="absolute -inset-2 border border-stone-200/60 -z-10 pointer-events-none transition-all duration-500 group-hover:scale-105 group-hover:border-[#D4AF37]/20"></div>
          </div>
        </div>

        <!-- RIGHT: RE-IMAGINED PRIVILEGE LIST REGISTRY (Takes 7 spans) -->
        <div class="lg:col-span-7 space-y-4">
          
          <!-- Perk Element Block 1 -->
          <div 
            class="group bg-white border border-stone-200/70 p-8 flex items-start gap-6 transition-all duration-500 ease-out hover:border-[#D4AF37] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] text-left"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div class="text-2xl text-[#D4AF37] bg-[#FAF8F5] w-12 h-12 flex items-center justify-center border border-stone-100 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
              ✨
            </div>
            <div class="space-y-1.5 flex-1">
              <h3 class="text-xl font-light tracking-tight text-stone-900" style="font-family: 'Playfair Display', serif;">
                Exclusive Discounts
              </h3>
              <p class="text-stone-500 font-light text-sm leading-relaxed">
                Receive special member-only offers on selected beauty treatments.
              </p>
            </div>
          </div>

          <!-- Perk Element Block 2 -->
          <div 
            class="group bg-white border border-stone-200/70 p-8 flex items-start gap-6 transition-all duration-500 ease-out hover:border-[#D4AF37] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] text-left"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            <div class="text-2xl text-[#D4AF37] bg-[#FAF8F5] w-12 h-12 flex items-center justify-center border border-stone-100 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
              👑
            </div>
            <div class="space-y-1.5 flex-1">
              <h3 class="text-xl font-light tracking-tight text-stone-900" style="font-family: 'Playfair Display', serif;">
                Priority Booking
              </h3>
              <p class="text-stone-500 font-light text-sm leading-relaxed">
                Reserve appointments before regular customers.
              </p>
            </div>
          </div>

          <!-- Perk Element Block 3 -->
          <div 
            class="group bg-white border border-stone-200/70 p-8 flex items-start gap-6 transition-all duration-500 ease-out hover:border-[#D4AF37] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] text-left"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div class="text-2xl text-[#D4AF37] bg-[#FAF8F5] w-12 h-12 flex items-center justify-center border border-stone-100 group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
              🎁
            </div>
            <div class="space-y-1.5 flex-1">
              <h3 class="text-xl font-light tracking-tight text-stone-900" style="font-family: 'Playfair Display', serif;">
                Birthday Rewards
              </h3>
              <p class="text-stone-500 font-light text-sm leading-relaxed">
                Enjoy complimentary gifts and special birthday surprises.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const user = computed(() => {
  try {
    return JSON.parse(localStorage.getItem("gg-user"))
  } catch (e) {
    return null
  }
})

// gg-user never actually has a single "name" field — only first_name/
// last_name (from signup) get saved. Build a display name from those,
// falling back to "Guest Member" only when neither exists (i.e. actually
// logged out, not just "logged in but name missing").
const displayName = computed(() => {
  const first = user.value?.first_name?.trim()
  const last = user.value?.last_name?.trim()
  const fullName = [first, last].filter(Boolean).join(' ')
  return fullName || 'Guest Member'
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(12deg);
  }
  100% {
    transform: translateX(100%) skewX(12deg);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s ease-out infinite;
}
</style>