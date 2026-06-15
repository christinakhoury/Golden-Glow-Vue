<template>
  <section class="py-24 bg-[#F8F4EF]" id="membership">

<div class="max-w-5xl mx-auto px-6 text-center">

  <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">
    Exclusive Membership
  </p>

  <h2 class="heading-font text-5xl font-bold mb-6">
    Join Glow Rewards
  </h2>

  <p class="text-gray-600 text-lg mb-10">
    Earn points with every appointment and unlock exclusive member benefits.
  </p>

  <!-- CARDS -->
  <div class="grid md:grid-cols-3 gap-8">

    <div
      v-for="item in perks"
      :key="item.title"
      class="bg-white border border-[#D4AF37] p-6 rounded-3xl"
    >
      <h3 class="font-bold text-xl mb-3">
        {{ item.title }}
      </h3>

      <p>
        {{ item.desc }}
      </p>
    </div>

  </div>

  <div class="mt-12">

    <RouterLink
      to="/vip"
      class="inline-block bg-[#D4AF37] text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-[#c39d28] transition duration-300"
    >
      Become VIP
    </RouterLink>

  </div>

</div>
```

  </section>
</template>

<script setup>
const perks = [
  {
    title: "Earn Points",
    desc: "Collect rewards with every booking."
  },
  {
    title: "VIP Discounts",
    desc: "Access members-only offers."
  },
  {
    title: "Priority Booking",
    desc: "Reserve appointments before everyone else."
  }
]
</script>
