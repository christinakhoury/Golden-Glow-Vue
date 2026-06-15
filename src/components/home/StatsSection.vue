<template>
  <section class="bg-white py-20">

    <!-- Title line -->
    <div class="max-w-4xl mx-auto px-6 mb-12">
      <div class="flex items-center gap-4">
        <div class="flex-1 h-px bg-[#D4AF37]"></div>

        <span class="text-[#D4AF37] text-xs tracking-[.3em] uppercase">
          Our Story in Numbers
        </span>

        <div class="flex-1 h-px bg-[#D4AF37]"></div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div
      class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center"
    >
      <div v-for="stat in stats" :key="stat.label">
        <h2 class="text-5xl font-bold text-[#D4AF37]">
          {{ stat.number }}
        </h2>

        <p class="mt-3 text-gray-600">
          {{ stat.label }}
        </p>
      </div>
    </div>

  </section>
</template>

<script setup>
const stats = [
  { number: '5000+', label: 'Happy Clients' },
  { number: '15+', label: 'Beauty Specialists' },
  { number: '4.9★', label: 'Average Rating' },
  { number: '7+', label: 'Years of Excellence' }
]
</script>