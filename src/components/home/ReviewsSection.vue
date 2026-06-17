<template>
  <section data-aos="fade-up" class="py-24 bg-card">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">Reviews</p>
        <h2 class="heading-font text-5xl font-bold text-primary" style="font-family: 'Playfair Display', serif;">
          What Our Clients Say
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="review in reviews" :key="review.name" class="bg-card p-8 rounded-3xl shadow-theme border border-theme" data-aos="fade-up">
          <p class="text-[#D4AF37] text-xl">★★★★★</p>
          <p class="my-4 text-primary">{{ review.text }}</p>
          <strong class="text-primary">— {{ review.name }}</strong>
        </div>
      </div>
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