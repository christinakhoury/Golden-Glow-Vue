<template>
  <section :id="id" :class="`py-24 ${bg}`">

    <div class="max-w-7xl mx-auto px-6 text-center">

      <h2 class="text-4xl font-bold mb-12 heading-font">
        {{ title }}
      </h2>

      <div class="grid md:grid-cols-3 gap-8">

        <SpecialistCard
          v-for="s in specialists"
          :key="s.key"
          :specialist="s"
        />

      </div>

    </div>

  </section>
</template>

<script setup>
import SpecialistCard from "./SpecialistCard.vue"

defineProps({
  id: String,
  title: String,
  bg: String,
  specialists: Array
})
</script>