<template>
  <div class="border border-[#D4AF37] rounded-3xl p-6 shadow-lg hover:-translate-y-2 transition">

    <img :src="specialist.img" class="h-56 w-full object-cover rounded-2xl mb-4" />

    <h3 class="text-xl font-bold">
      {{ specialist.name }}
    </h3>

    <p class="text-[#D4AF37]">
      {{ specialist.role }}
    </p>

    <p class="text-gray-600 text-sm mt-3">
      ⭐ {{ specialist.rating }} | {{ specialist.exp }} Experience
    </p>

    <a
      :href="`book.html?specialist=${specialist.key}&service=${specialist.service}`"
      class="mt-5 inline-block bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm"
    >
      Book {{ specialist.name.split(' ')[0] }}
    </a>

  </div>
</template>

<script setup>
defineProps({
  specialist: Object
})
</script>