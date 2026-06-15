<template >
  <div data-aos="fade-up" class="group bg-white rounded-3xl overflow-hidden border border-[#D4AF37] shadow-lg hover:-translate-y-2 transition">

    <!-- IMAGE -->
    <div class="h-72 overflow-hidden">
      <img
        :src="specialist.image"
        class="w-full h-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>

    <!-- CONTENT -->
    <div data-aos="fade-up" class="p-6">

      <div class="flex justify-between items-start mb-2">

        <div>
          <h3 class="text-xl font-bold">
            {{ specialist.name }}
          </h3>

          <p class="text-[#D4AF37] text-sm uppercase">
            {{ specialist.role }}
          </p>
        </div>

        <span class="bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold">
          ⭐ {{ specialist.rating }}
        </span>

      </div>

      <!-- DETAILS -->
      <div data-aos="fade-up" class="mt-4 grid grid-cols-2 gap-y-2 text-sm">

        <span class="text-gray-500">Experience</span>
        <span>{{ specialist.experience }}</span>

        <span class="text-gray-500">Specialty</span>
        <span>{{ specialist.specialty }}</span>

        <span class="text-gray-500">Price Range</span>
        <span>{{ specialist.price }}</span>

      </div>

      <!-- BUTTONS -->
      <div data-aos="fade-up" class="mt-6 flex gap-3">

        <RouterLink
          to="/specialists"
          class="flex-1 border border-[#D4AF37] text-[#D4AF37] py-3 rounded-full text-sm font-semibold hover:bg-[#D4AF37] hover:text-white transition text-center"
        >
          View Page
        </RouterLink>

        <RouterLink
          :to="`/book?specialist=${specialist.id}&service=${specialist.service}`"
          class="flex-1 bg-[#D4AF37] text-white py-3 rounded-full text-sm font-semibold hover:bg-[#c39d28] transition text-center"
        >
          Book Now
        </RouterLink>

      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router"

defineProps({
  specialist: Object
})
</script>