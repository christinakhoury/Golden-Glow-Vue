<template>
  <div class="body-font bg-secondary flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md bg-card shadow-theme-heavy rounded-3xl p-10 border border-theme">
      <h1 class="heading-font text-4xl font-bold text-center text-[#D4AF37] mb-2">Golden Glow</h1>
      <p class="text-center text-secondary mb-8">Login to your beauty account</p>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="text-sm font-medium text-secondary">Full Name</label>
          <input v-model="name" type="text" required class="w-full mt-1 px-4 py-3 border border-theme rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none bg-input text-primary" placeholder="Enter your name" />
        </div>

        <div>
          <label class="text-sm font-medium text-secondary">Email</label>
          <input v-model="email" type="email" required class="w-full mt-1 px-4 py-3 border border-theme rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none bg-input text-primary" placeholder="Enter your email" />
        </div>

        <div>
          <label class="text-sm font-medium text-secondary">Password</label>
          <input type="password" class="w-full mt-1 px-4 py-3 border border-theme rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none bg-input text-primary" placeholder="••••••••" />
        </div>

        <button type="submit" class="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:bg-[#c39d28] transition">
          Login
        </button>
      </form>

      <p class="text-xs text-center text-muted mt-6">By logging in, you join Glow Rewards ✨</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const name = ref("")
const email = ref("")

function login() {
  const user = {
    name: name.value,
    email: email.value,
    points: 120
  }

  localStorage.setItem("gg-user", JSON.stringify(user))
  window.dispatchEvent(new Event("storage"))
  router.push("/")
}
</script>

<style scoped>
.heading-font {
  font-family: "Playfair Display", serif;
}
.body-font {
  font-family: "Poppins", sans-serif;
}
</style>