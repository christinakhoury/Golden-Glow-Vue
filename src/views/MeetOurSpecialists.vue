<template>
  <div class="body-font bg-[#F8F4EF] text-[#1C1C1C]">

    <!-- HERO -->
    <section class="relative pt-32 pb-20 text-center overflow-hidden">

      <div class="absolute inset-0">
        <div class="absolute w-[500px] h-[500px] bg-[#D4AF37]/20 blur-3xl rounded-full top-[-120px] left-[-120px]"></div>
        <div class="absolute w-[400px] h-[400px] bg-[#bd9c30]/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]"></div>
      </div>

      <div class="relative max-w-4xl mx-auto px-6">

        <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">
          Golden Glow Studio Team
        </p>

        <h1 class="text-5xl md:text-6xl font-bold mt-4 heading-font">
          Meet Our Beloved Team
        </h1>

        <p class="text-gray-600 mt-6 text-lg leading-relaxed">
          A handpicked collection of artists, specialists, and beauty experts dedicated to
          bringing out your most confident glow.
        </p>

        <div class="mt-8 flex justify-center gap-4 flex-wrap">
          <a v-for="s in sections"
             :key="s.id"
             :href="`#${s.id}`"
             class="px-5 py-2 bg-[#F8F4EF] shadow rounded-full text-sm border border-[#D4AF37]
             hover:bg-[#D4AF37] hover:text-white transition">
            {{ s.title }}
          </a>
        </div>

      </div>
    </section>

    <!-- SECTIONS -->
    <SpecialistSection
      v-for="section in sections"
      :key="section.id"
      :id="section.id"
      :title="section.title"
      :bg="section.bg"
      :specialists="section.specialists"
    />

  </div>
</template>

<script setup>
import SpecialistSection from "../components/SpecialistSection.vue"

const sections = [
  {
    id: "hair",
    title: "Hair Specialists",
    bg: "bg-white",
    specialists: [
      { name: "Sarah Akiki", role: "Senior Hair Stylist", img: "images/sarah.jpg", rating: "4.9", exp: "3 Years", service: "hair", key: "sarah" },
      { name: "Miriam Younes", role: "Color Specialist", img: "images/miriam.jpg", rating: "4.8", exp: "4 Years", service: "hair", key: "miriam" },
      { name: "Nelly Rizk", role: "Event Stylist", img: "images/nelly.jpg", rating: "5.0", exp: "6 Years", service: "hair", key: "nelly" }
    ]
  },
  {
    id: "nails",
    title: "Nail Specialists",
    bg: "bg-[#F8F4EF]",
    specialists: [
      { name: "Maya Rahme", role: "Senior Nail Artist", img: "images/maya.jpg", rating: "4.9", exp: "4 Years", service: "nails", key: "maya" },
      { name: "Rita Khoury", role: "Nail Art Specialist", img: "images/rita.jpg", rating: "4.8", exp: "5 Years", service: "nails", key: "rita" },
      { name: "Jessica Haddad", role: "Gel & Acrylic Expert", img: "images/jessica.jpg", rating: "5.0", exp: "6 Years", service: "nails", key: "jessica" }
    ]
  },
  {
    id: "makeup",
    title: "Makeup Specialists",
    bg: "bg-white",
    specialists: [
      { name: "Charbel Obeid", role: "Senior Makeup Artist", img: "images/charbel.jpg", rating: "5.0", exp: "8 Years", service: "makeup", key: "charbel" },
      { name: "Lara Haddad", role: "Bridal Makeup Expert", img: "images/lara.jpg", rating: "4.9", exp: "6 Years", service: "makeup", key: "lara" },
      { name: "Julia Khoury", role: "Event Makeup Artist", img: "images/julia.jpg", rating: "4.8", exp: "5 Years", service: "makeup", key: "julia" }
    ]
  },
  {
    id: "massage",
    title: "Massage Specialists",
    bg: "bg-[#F8F4EF]",
    specialists: [
      { name: "Amir Hannah", role: "Senior Therapist", img: "images/amir.jpg", rating: "4.9", exp: "7 Years", service: "massage", key: "amir" },
      { name: "Nour Abou Khalil", role: "Wellness Specialist", img: "images/nour.jpg", rating: "5.0", exp: "8 Years", service: "massage", key: "nour" },
      { name: "Elie Haddad", role: "Deep Tissue Expert", img: "images/elie.jpg", rating: "4.8", exp: "6 Years", service: "massage", key: "elie" }
    ]
  },
  {
    id: "laser",
    title: "Laser Specialists",
    bg: "bg-white",
    specialists: [
      { name: "Rania Khoury", role: "Senior Laser Technician", img: "images/rania.jpg", rating: "5.0", exp: "8 Years", service: "laser", key: "rania" },
      { name: "Carla Saad", role: "Skin Rejuvenation Expert", img: "images/carla.jpg", rating: "4.9", exp: "6 Years", service: "laser", key: "carla" },
      { name: "Melissa Nader", role: "Advanced Laser Specialist", img: "images/melissa.jpg", rating: "4.8", exp: "5 Years", service: "laser", key: "melissa" }
    ]
  }
]
</script>