<template>
  <section id="home" class="relative bg-[#FAF8F5] pt-14 md:pt-16 overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] md:min-h-screen">

      <div
        class="relative overflow-hidden min-h-[40vh] md:min-h-screen transition-all duration-1000 ease-out"
        :class="[
          isAnimated
            ? 'opacity-100 translate-x-0 blur-0'
            : 'opacity-0 -translate-x-12 blur-md'
        ]"
      >
        <div class="relative w-full h-full bg-[#FAF8F5]">
          
          <TransitionGroup name="hero-fade">
            <div 
              v-if="heroImages.length && heroImages[currentSlide]"
              :key="currentSlide"
              class="absolute inset-0 w-full h-full dynamic-slide-wrapper"
            >
              <img
                :src="heroImages[currentSlide]?.src"
                :alt="heroImages[currentSlide]?.alt"
                class="w-full h-full object-cover"
              />
            </div>
          </TransitionGroup>

          <div class="absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none z-20"></div>
        </div>
      </div>

      <div class="bg-[#FAF8F5] flex items-center justify-center p-6 md:p-12 min-h-[40vh] md:min-h-screen relative overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute w-1.5 h-1.5 bg-[#D4AF37]/30 rounded-full top-[20%] left-[10%] animate-float-slow"></div>
          <div class="absolute w-1 h-1 bg-[#D4AF37]/25 rounded-full top-[60%] left-[85%] animate-float-medium"></div>
          <div class="absolute w-1.5 h-1.5 bg-[#D4AF37]/20 rounded-full top-[80%] left-[20%] animate-float-slow"></div>
          <div class="absolute w-1 h-1 bg-[#D4AF37]/25 rounded-full top-[30%] left-[75%] animate-float-medium"></div>
          <div class="absolute w-2 h-2 bg-[#D4AF37]/15 rounded-full top-[50%] left-[45%] animate-float-slow"></div>
        </div>

        <div
          class="transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
          :class="[
            isAnimated
              ? 'opacity-100 scale-100 rotate-0 blur-0 brightness-100'
              : 'opacity-0 scale-90 -rotate-1 blur-lg brightness-110'
          ]"
        >
          <div class="w-full max-w-md transition-all duration-500 group">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <div class="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/40 via-[#fff3c4]/50 to-[#D4AF37]/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition duration-700"></div>

              <img
                src="/images/hero5.jpg"
                class="relative w-full h-auto block object-cover aspect-square z-10 rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="absolute inset-0 flex flex-col justify-center items-center text-center z-20 pointer-events-none px-4">
        <h1 class="font-playfair text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal leading-tight text-[#D4AF37] tracking-tight drop-shadow-sm transition-all duration-1000 delay-300"
            :class="isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
          GOLDEN GLOW <br> STUDIO
        </h1>

        <router-link
          to="/#services"
          class="mt-6 hero-button inline-block font-inter text-xs md:text-sm tracking-[0.15em] uppercase text-[#D4AF37] border-b border-[#D4AF37] pb-1.5 pointer-events-auto transition-all duration-700 delay-500 hover:text-black hover:border-black"
          :class="isAnimated ? 'opacity-100' : 'opacity-0'"
        >
          START YOUR GLOW-UP →
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { loadStudioBanners } from '../../services/banner.js'

const heroImages = ref([])
const currentSlide = ref(0)
const isAnimated = ref(false)
const loading = ref(true)
let interval = null

const startCarousel = () => {
  if (interval) clearInterval(interval)
  if (!heroImages.value || heroImages.value.length <= 1) return

  currentSlide.value = 0

  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.value.length
  }, 4000) // Bumped to 4s to give the luxurious transition time to be appreciated
}

onMounted(async () => {
  setTimeout(() => {
    isAnimated.value = true
  }, 100)

  try {
    heroImages.value = await loadStudioBanners()
    startCarousel()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
/* Luxurious Custom Crossfade Transitions */
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
              transform 1.4s cubic-bezier(0.25, 1, 0.5, 1);
}

/* New image subtle zoom in */
.hero-fade-enter-from {
  opacity: 0;
  transform: scale(1.04);
}

/* Old image fades out completely in place */
.hero-fade-leave-to {
  opacity: 0;
}

/* Prevent layout breaking during transition overlaps */
.dynamic-slide-wrapper {
  backface-visibility: hidden;
  will-change: transform, opacity;
}

/* Background floating animations */
@keyframes float-slow {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-15px) translateX(8px); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(12px) translateX(-6px); }
}

.animate-float-slow {
  animation: float-slow 8s infinite ease-in-out;
}

.animate-float-medium {
  animation: float-medium 6s infinite ease-in-out;
}
</style>