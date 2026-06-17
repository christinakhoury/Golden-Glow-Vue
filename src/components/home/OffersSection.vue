<template>
  <section data-aos="fade-up" id="offers" class="py-24 bg-secondary">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">Combo Deals</p>
      <h2 class="heading-font text-5xl font-bold mb-6 text-primary" style="font-family: 'Playfair Display', serif;">
        Exclusive Offers
      </h2>
      <p class="text-secondary mb-12">Save more when you combine luxury treatments.</p>

      <div class="grid md:grid-cols-3 gap-8">
        <a v-for="offer in offers" :key="offer.title" :href="offer.link" class="bg-card border border-[#D4AF37] p-8 rounded-3xl shadow-theme hover:-translate-y-2 transition block" data-aos="fade-up">
          <h3 class="text-2xl font-bold mb-3 text-primary">{{ offer.title }}</h3>
          <p class="text-[#D4AF37] font-bold">{{ offer.discount }}</p>
          <p class="mt-3 text-secondary">{{ offer.desc }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const offers = [
  {
    title: "Hair + Nails",
    discount: "10% OFF",
    desc: "Perfect combo for a full glow-up.",
    link: "/book?offer=hair-nails"
  },
  {
    title: "Laser + Massage",
    discount: "15% OFF",
    desc: "Relax & refresh your body.",
    link: "/book?offer=laser-massage"
  },
  {
    title: "Bridal Package",
    discount: "20% OFF",
    desc: "Hair + Makeup + Nails luxury package.",
    link: "/book?offer=bridal-package"
  }
]
</script>