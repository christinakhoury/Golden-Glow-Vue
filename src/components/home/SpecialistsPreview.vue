<template>
  <section id="specialists" class="py-24 bg-white">

    <div class="max-w-7xl mx-auto px-6 text-center">

      <!-- HEADER -->
      <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">
        The Team
      </p>

      <h2 class="text-5xl font-bold mb-4">
        Meet Our Specialists
      </h2>

      <p class="text-gray-600 mb-12">
        Experienced professionals dedicated to your beauty journey.
      </p>

      <!-- GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <SpecialistCard
          v-for="person in specialists"
          :key="person.name"
          :specialist="person"
        />

      </div>

      <!-- LINK -->
      <div class="mt-12">
        <RouterLink
          to="/MeetOurSpecialists"
          class="text-[#D4AF37] border-b border-[#D4AF37] pb-1 uppercase tracking-wider text-sm hover:opacity-80 transition"
        >
          Meet All Specialists →
        </RouterLink>
      </div>

    </div>

  </section>
</template>

<script setup>

import SpecialistCard from '../specialists/SpecialistCard.vue'

const specialists = [
  {
    name: "Sarah Akiki",
    role: "Senior Hair Stylist",
    rating: "4.9",
    experience: "3 Years",
    specialty: "Hair Styling",
    price: "$25 – $120",
    image: "/images/sarah.jpg",
    service: "hair"
  },
  {
    name: "Maya Rahme",
    role: "Nail Artist",
    rating: "4.8",
    experience: "4 Years",
    specialty: "Nail Art",
    price: "$20 – $100",
    image: "/images/maya.jpg",
    service: "nails"
  },
  {
    name: "Charbel Obeid",
    role: "Makeup Artist",
    rating: "5.0",
    experience: "8 Years",
    specialty: "Bridal Makeup",
    price: "$50 – $200",
    image: "/images/charbel.jpg",
    service: "makeup"
  }
]
</script>