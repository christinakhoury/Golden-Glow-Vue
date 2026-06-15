<template>
  <section class="py-24 bg-[#F8F4EF]">

    <div class="max-w-7xl mx-auto px-6 text-center">

      <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">
        Selected For You
      </p>

      <h2 class="heading-font text-5xl font-bold mb-6">
        Recommended For You
      </h2>

      <p class="text-gray-600 mb-12">
        Professional products used by our specialists.
      </p>

      <!-- GRID -->
      <div class="grid md:grid-cols-3 gap-8">

        <div
          v-for="product in products"
          :key="product.name"
          class="border border-[#D4AF37] bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-3 hover:shadow-2xl transition duration-300"
        >

          <img
            :src="product.image"
            class="h-56 w-full object-cover"
          />

          <div class="p-6">

            <h3 class="font-bold text-xl">
              {{ product.name }}
            </h3>

            <p class="text-gray-600 mt-2">
              {{ product.desc }}
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
const products = [
  {
    name: "Keratin Hair Mask",
    desc: "Restores shine and strength.",
    image: "/images/keratin.jpg"
  },
  {
    name: "Nail Strength Oil",
    desc: "Healthy and strong nails.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be"
  },
  {
    name: "Luxury Face Serum",
    desc: "Glow and hydration boost.",
    image: "/images/face.jpg"
  }
]
</script>