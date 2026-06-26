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

// 1. Initialize stats as an empty array waiting for data
const stats = ref([])

// Helper function to dynamically split text values like "5000+" into number (5000) and suffix (+)
function parseStatData(apiStats) {
  return apiStats.map(stat => {
    // Stringify the value just in case the API sends a pure number instead of a string
    const stringValue = String(stat.value)
    
    // Extract the digits and dots out of the string (e.g., "4.9" or "5000")
    const numericPart = parseFloat(stringValue.replace(/[^0-9.]/g, '')) || 0
    // Extract anything that isn't a number (e.g., "+" or "★")
    const suffixPart = stringValue.replace(/[0-9.]/g, '')

    return {
      number: numericPart,
      suffix: suffixPart,
      label: stat.label,
      display: '0' // Start animation count at 0
    }
  })
}

// 2. Fetch the metrics from OsiMart with a luxury fallback path
const fetchStudioStats = async () => {
  try {
    const response = await fetch('https://api.osimart.com/store/api/stats/?store=6')
    
    // Safety check: If the server returns a 404, force execution to jump to the catch block
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    // Process the live data format if it is valid
    if (data && data.length > 0) {
      stats.value = parseStatData(data)
    } else {
      useFallbackStats()
    }
  } catch (error) {
    console.warn("OsiMart stats returned an error. Using luxury local backup metrics instead.")
    useFallbackStats()
  }
}

// Safe backup values so your page continues to look flawless and premium during API down-time
function useFallbackStats() {
  const localBackup = [
    { label: 'Happy Clients', value: '1500+' },
    { label: 'Luxury Services', value: '25+' },
    { label: 'Expert Stylists', value: '8' },
    { label: 'Studio Rating', value: '4.9★' }
  ]
  stats.value = parseStatData(localBackup)
}

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
  if (hasAnimated.value || stats.value.length === 0) return
  hasAnimated.value = true

  stats.value.forEach(stat => {
    animateValue(stat, stat.number)
  })
}

onMounted(async () => {
  // 3. First, fetch data from your API (or catch the error gracefully)
  await fetchStudioStats()

  // 4. Then setup the observer watch points
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startAnimation()
        observer.disconnect() 
      }
    },
    { threshold: 0.4 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>