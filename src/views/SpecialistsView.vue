<template>
  <div data-aos="fade-up" class="body-font bg-secondary text-primary">
    <section class="relative pt-32 pb-20 text-center overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute w-[500px] h-[500px] bg-[#D4AF37]/20 blur-3xl rounded-full top-[-120px] left-[-120px]"></div>
        <div class="absolute w-[400px] h-[400px] bg-[#bd9c30]/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]"></div>
      </div>

      <div data-aos="fade-up" class="relative max-w-4xl mx-auto px-6">
        <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">Golden Glow Studio Team</p>
        <h1 class="text-5xl md:text-6xl font-bold mt-4 heading-font text-primary">Meet Our Beloved Team</h1>
        <p class="text-secondary mt-6 text-lg leading-relaxed">A handpicked collection of artists, specialists, and beauty experts dedicated to bringing out your most confident glow.</p>

        <div data-aos="fade-up" class="mt-8 flex justify-center gap-4 flex-wrap">
  <a
    v-for="section in sections"
    :key="section.id"
    :href="`#${section.id}`"
    class="px-5 py-2 rounded-full text-sm border border-[#D4AF37]
           text-stone-700
           hover:bg-[#D4AF37] hover:text-white
           hover:scale-105 hover:shadow-lg
           transition-all duration-300 ease-in-out"
  >
    {{ section.title }}
  </a>
</div>
      </div>
    </section>

    <section data-aos="fade-up" v-for="section in sections" :key="section.id" :id="section.id" :class="section.bg" class="py-24">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="heading-font text-4xl font-bold mb-12 text-primary">{{ section.title }}</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="specialist in section.specialists" :key="specialist.key" class="border border-[#D4AF37] rounded-3xl p-6 shadow-theme hover:-translate-y-2 transition bg-card">
            <img :src="specialist.img" :alt="specialist.name" class="h-56 w-full object-cover rounded-2xl mb-4" />
            <h3 class="text-xl font-bold text-primary">{{ specialist.name }}</h3>
            <p class="text-[#D4AF37]">{{ specialist.role }}</p>
            <p class="text-secondary text-sm mt-3">⭐ {{ specialist.rating }} | {{ specialist.exp }} Experience</p>
            <RouterLink :to="`/book?specialist=${specialist.key}&service=${specialist.service}`" class="mt-5 inline-block bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm hover:bg-[#c39d28] transition">
              Book {{ specialist.name.split(' ')[0] }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router"
import { sections } from "../data/specialists"
</script>