<template>
  <section ref="sectionRef" class="bg-card py-20">
    
    <div class="max-w-4xl mx-auto px-6 mb-12">
      <div class="flex items-center gap-4">
        <div class="flex-1 h-px bg-[#D4AF37]"></div>
        <span class="text-[#D4AF37] text-xs tracking-[.3em] uppercase">
          Our Story in Numbers
        </span>
        <div class="flex-1 h-px bg-[#D4AF37]"></div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">

      <div v-for="stat in stats" :key="stat.label">
        <h2 class="text-5xl font-bold text-[#D4AF37]">
          {{ stat.display }}
        </h2>
        <p class="mt-3 text-secondary">
          {{ stat.label }}
        </p>
      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionRef = ref(null)
const hasAnimated = ref(false)

const stats = ref([
  { number: 5000, suffix: '+', label: 'Happy Clients', display: '0' },
  { number: 15, suffix: '+', label: 'Beauty Specialists', display: '0' },
  { number: 4.9, suffix: '★', label: 'Average Rating', display: '0' },
  { number: 7, suffix: '+', label: 'Years of Excellence', display: '0' }
])

function formatValue(value, suffix) {
  if (suffix === '★') {
    return value.toFixed(1) + suffix
  }
  return Math.floor(value) + suffix
}

function animateValue(obj, target, duration = 1500) {
  let start = 0
  const stepTime = 20
  const steps = duration / stepTime
  const increment = target / steps

  const timer = setInterval(() => {
    start += increment

    if (start >= target) {
      start = target
      clearInterval(timer)
    }

    obj.display = formatValue(start, obj.suffix)
  }, stepTime)
}

function startAnimation() {
  if (hasAnimated.value) return
  hasAnimated.value = true

  stats.value.forEach(stat => {
    animateValue(stat, stat.number)
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startAnimation()
        observer.disconnect() // run only once
      }
    },
    {
      threshold: 0.4, // trigger when 40% visible
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>