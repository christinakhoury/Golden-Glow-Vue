<template >
  

  <section data-aos="fade-up" id="services" class= "py-24  bg-secondary">
    <div class="max-w-7xl mx-auto px-6 ">
      <div class="text-center mb-16 ">
        <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">What We Offer</p>
        <h2 class="heading-font text-5xl font-bold mb-4 text-primary" style="font-family: 'Playfair Display', serif;">
          Our Signature Services
        </h2>
        <p class="text-secondary max-w-2xl mx-auto">
          From radiant hair to flawless skin — every treatment is a curated luxury experience.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <RouterLink
          v-for="service in services"
          :key="service.name"
          :to="service.link"
          class="group block bg-card border border-[#D4AF37] rounded-3xl overflow-hidden shadow-theme hover:-translate-y-2 hover:shadow-theme-heavy transition duration-300"
          data-aos="fade-up"
        >
          <img :src="service.image" :alt="service.name" class="h-56 w-full object-cover" />
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-2 text-primary">{{ service.name }}</h3>
            <p class="text-secondary mb-4">{{ service.desc }}</p>
            <span class="text-[#D4AF37] font-semibold group-hover:underline">Learn More →</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    name: 'Hair',
    desc: 'Expert cuts, vibrant color, and timeless elegance.',
    image: '/images/hair.jpg',
    link: '/services/hair'
  },
  {
    name: 'Nails',
    desc: 'Elegant manicures and nail art.',
    image: '/images/nails.jpg',
    link: '/services/nails'
  },
  {
    name: 'Makeup',
    desc: 'Bridal and professional makeup.',
    image: '/images/makeup.jpg',
    link: '/services/makeup'
  },
  {
    name: 'Massage',
    desc: 'Relaxing wellness experiences.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
    link: '/services/massage'
  },
  {
    name: 'Laser',
    desc: 'Advanced skin and laser treatments.',
    image: '/images/laser.jpg',
    link: '/services/laser'
  }
]
</script>