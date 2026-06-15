<template>
  <section data-aos="fade-up" class="py-24 bg-white">
    <div class="max-w-6xl mx-auto px-6 text-center">

      <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">
        Gift Cards
      </p>

      <h2 class="heading-font text-5xl font-bold mb-6" style="font-family: 'Playfair Display', serif;">
        The Perfect Gift for Someone Special
      </h2>

      <p class="text-gray-600 mb-12">
        Ideal for birthdays, weddings, and Mother's Day. Give the gift of luxury beauty care.
      </p>

      <div class="flex flex-wrap justify-center gap-6">

        <router-link
          v-for="gift in gifts"
          :key="gift.amount"
          :to="`/giftcards?amount=${gift.amount}`"
          class="border border-[#D4AF37] p-8 rounded-2xl w-48 text-center hover:bg-[#D4AF37] hover:text-white transition block"
        >
          <h3 class="text-2xl font-bold">
            ${{ gift.amount }}
          </h3>
        </router-link>

      </div>

    </div>
  </section>
</template>

<script setup>
const gifts = [
  { amount: 25 },
  { amount: 50 },
  { amount: 100 },
  { amount: 250 }
]
</script>