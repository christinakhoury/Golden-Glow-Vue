<template>
  <section id="home" class="relative bg-[#FAF8F5]  pt-14 md:pt-16 overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] md:min-h-screen">

      <!-- Hero Carousel -->
      <div
        class="relative overflow-hidden min-h-[40vh] md:min-h-screen transition-all duration-1000 ease-out"
        :class="[
          isAnimated
            ? 'opacity-100 translate-x-0 blur-0'
            : 'opacity-0 -translate-x-24 blur-md'
        ]"
      >
        <div class="relative w-full h-full">
          <img
            v-for="(image, index) in heroImages"
            :key="index"
            :src="image.src"
            :alt="image.alt"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
          >
          <div class="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20"></div>
        </div>
      </div>

      <!-- Right Image -->
      <div class="bg-[#FAF8F5]  flex items-center justify-center p-6 md:p-12 min-h-[40vh] md:min-h-screen relative overflow-hidden">

        <!-- Animated background particles -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute w-1.5 h-1.5 bg-[#D4AF37]/30 rounded-full top-[20%] left-[10%] animate-float-slow"></div>
          <div class="absolute w-1 h-1 bg-[#D4AF37]/25 rounded-full top-[60%] left-[85%] animate-float-medium"></div>
          <div class="absolute w-1.5 h-1.5 bg-[#D4AF37]/20 rounded-full top-[80%] left-[20%] animate-float-slow"></div>
          <div class="absolute w-1 h-1 bg-[#D4AF37]/25 rounded-full top-[30%] left-[75%] animate-float-medium"></div>
          <div class="absolute w-2 h-2 bg-[#D4AF37]/15 rounded-full top-[50%] left-[45%] animate-float-slow"></div>
        </div>

        <div
          class="transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
          :class="[
            isAnimated
              ? 'opacity-100 scale-100 rotate-0 blur-0 brightness-100'
              : 'opacity-0 scale-75 -rotate-3 blur-lg brightness-125'
          ]"
        >
          <div class="w-full max-w-md transition-all duration-500 group">

            <div class="relative rounded-2xl overflow-hidden shadow-2xl">

              <!-- GOLD GLOW -->
              <div class="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/60 via-[#fff3c4] to-[#D4AF37]/60 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition duration-700"></div>

              <img
                src="/images/hero5.jpg"
                class="relative w-full h-auto block object-cover aspect-square z-10 rounded-2xl"
              >
            </div>

          </div>
        </div>
      </div>

      <!-- Overlay Text -->
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center z-20 pointer-events-none px-4">

        <div
          class="transition-all duration-800 delay-[300ms]"
          :class="[isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95']"
        >

          <div
            class="transition-all duration-800 delay-[500ms]"
            :class="[isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16']"
          >

            <div class="relative">

              <div
                class="absolute top-1/2 -translate-y-1/2 -left-20 md:-left-36 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-800 delay-[600ms]"
                :class="[isAnimated ? 'w-20 md:w-36' : 'w-0']"
              ></div>

              <div
                class="absolute top-1/2 -translate-y-1/2 -right-20 md:-right-36 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-800 delay-[600ms]"
                :class="[isAnimated ? 'w-20 md:w-36' : 'w-0']"
              ></div>

              <h1 class="font-playfair text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal leading-tight text-[#D4AF37] tracking-tight drop-shadow-sm">

                <span
                  class="inline-block transition-all duration-700 delay-[600ms]"
                  :class="[isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
                >
                  GOLDEN GLOW
                </span>

                <br>

                <span
                  class="inline-block transition-all duration-700 delay-[750ms]"
                  :class="[isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
                >
                  STUDIO
                </span>

              </h1>

            </div>

            <div
              class="transition-all duration-700 delay-[900ms]"
              :class="[isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
            >
              <router-link
                to="/#services"
                class="hero-button inline-block font-inter text-xs md:text-sm tracking-[0.15em] uppercase text-[#D4AF37] border-b border-[#D4AF37] pb-1.5 mt-4 md:mt-5 pointer-events-auto transition-all duration-300 hover:opacity-70 hover:tracking-[0.2em] no-underline relative overflow-hidden"
              >
                START YOUR GLOW-UP →
                <span class="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent transition-all duration-500 hover:left-full"></span>
              </router-link>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroImages = [
  { src: '/images/hero1.jpg', alt: 'Hero model 1' },
  { src: '/images/hero2.jpg', alt: 'Hero model 2' },
  { src: '/images/hero3.jpg', alt: 'Hero model 3' },
  { src: '/images/hero4.jpg', alt: 'Hero model 4' },
  { src: '/images/hero6.jpg', alt: 'Hero model 6' },
  { src: '/images/hero7.jpg', alt: 'Hero model 7' },
  { src: '/images/hero8.jpg', alt: 'Hero model 8' },
  { src: '/images/hero9.jpg', alt: 'Hero model 9' }
]

const currentSlide = ref(0)
const isAnimated = ref(false)
let interval = null

const startCarousel = () => {
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.length
  }, 3000)
}

onMounted(() => {
  setTimeout(() => {
    isAnimated.value = true
  }, 100)
  startCarousel()
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style>
@keyframes float-slow {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(15px) translateX(-10px); }
}

.animate-float-slow {
  animation: float-slow 8s infinite ease-in-out;
}

.animate-float-medium {
  animation: float-medium 6s infinite ease-in-out;
}
</style>