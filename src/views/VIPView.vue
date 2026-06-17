<template>
  <div class="min-h-screen bg-secondary text-primary pt-32 pb-20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="text-[#D4AF37] text-xs tracking-[.3em] uppercase mb-3">Exclusive Access</p>
        <h1 class="heading-font text-5xl font-bold mb-6 text-primary">Golden Glow VIP Membership</h1>
        <p class="text-secondary max-w-2xl mx-auto">
          Enjoy exclusive beauty privileges, priority booking,
          special discounts, and luxury experiences reserved for
          our most valued members.
        </p>
      </div>

      <div class="bg-card rounded-3xl shadow-theme-heavy border border-[#D4AF37] p-10 mb-12">
        <h2 class="text-3xl font-bold text-[#D4AF37] mb-4">Welcome, {{ user?.name }}</h2>
        <p class="text-secondary mb-4">Current Reward Points</p>
        <div class="text-5xl font-bold text-[#D4AF37]">{{ user?.points || 0 }}</div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-card p-8 rounded-3xl border border-[#D4AF37] shadow-theme">
          <div class="text-4xl mb-4">✨</div>
          <h3 class="text-xl font-bold mb-3 text-primary">Exclusive Discounts</h3>
          <p class="text-secondary">Receive special member-only offers on selected beauty treatments.</p>
        </div>

        <div class="bg-card p-8 rounded-3xl border border-[#D4AF37] shadow-theme">
          <div class="text-4xl mb-4">👑</div>
          <h3 class="text-xl font-bold mb-3 text-primary">Priority Booking</h3>
          <p class="text-secondary">Reserve appointments before regular customers.</p>
        </div>

        <div class="bg-card p-8 rounded-3xl border border-[#D4AF37] shadow-theme">
          <div class="text-4xl mb-4">🎁</div>
          <h3 class="text-xl font-bold mb-3 text-primary">Birthday Rewards</h3>
          <p class="text-secondary">Enjoy complimentary gifts and special birthday surprises.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const user = computed(() => {
  return JSON.parse(localStorage.getItem("gg-user"))
})
</script>

<style scoped>
.heading-font {
  font-family: "Playfair Display", serif;
}
</style>