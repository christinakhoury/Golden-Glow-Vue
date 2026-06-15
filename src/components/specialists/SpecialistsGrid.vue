<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <SpecialistCard
      v-for="s in list"
      :key="s.id"
      :specialist="s"
    />
  </div>
</template>

<script setup>
import SpecialistCard from "./SpecialistCard.vue"

defineProps({
  list: Array
})
</script>