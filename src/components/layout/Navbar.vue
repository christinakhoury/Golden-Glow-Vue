<template>
  <!-- HOME NAVBAR -->
  <nav
    v-if="route.name === 'home'"
    class="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

  <!-- Logo -->
  <h1 class="heading-font text-3xl font-bold text-[#bd9c30]">
    Golden Glow Studio
  </h1>

  <!-- Navigation Links -->
  <ul class="hidden lg:flex gap-8 font-medium">
    <li><a href="#home" class="hover:text-[#D4AF37]">Home</a></li>
    <li><a href="#services" class="hover:text-[#D4AF37]">Services</a></li>
    <li><a href="#specialists" class="hover:text-[#D4AF37]">Specialists</a></li>
    <li><a href="#offers" class="hover:text-[#D4AF37]">Offers</a></li>
    <li><a href="#aboutus" class="hover:text-[#D4AF37]">About Us</a></li>
    <li><a href="#membership" class="hover:text-[#D4AF37]">Membership</a></li>
  </ul>

  <!-- Right Side -->
  <div class="flex items-center gap-4">

    <button
      @click="toggleTheme"
      class="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition"
    >
      {{ theme === 'dark' ? '☀' : '🌙' }}
    </button>

    <template v-if="user">
      <div class="px-4 py-2 rounded-full border border-[#D4AF37]">
        <p class="text-xs text-gray-500">
          {{ user.points }} pts ✨
        </p>
      </div>

      <button
        @click="logout"
        class="text-xs text-red-500 hover:underline"
      >
        Logout
      </button>
    </template>

    <template v-else>
      <RouterLink
        to="/login"
        class="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition"
      >
        Login
      </RouterLink>
    </template>

    <RouterLink
      to="/book"
      class="bg-[#D4AF37] text-white px-5 py-2 rounded-full hover:scale-105 transition"
    >
      Book Now
    </RouterLink>

  </div>
</div>

  </nav>

  <!-- SPECIALISTS NAVBAR -->

  <nav
    v-else-if="route.name === 'specialists'"
    class="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

  <!-- Logo -->
  <h1 class="heading-font text-2xl font-bold text-[#bd9c30]">
    Golden Glow Studio
  </h1>

  <!-- Links -->
  <ul class="hidden lg:flex gap-8 font-medium">

    <li><a href="#hair" class="hover:text-[#D4AF37]">Hair Experts</a></li>
    <li><a href="#nails" class="hover:text-[#D4AF37]">Nail Artists</a></li>
    <li><a href="#makeup" class="hover:text-[#D4AF37]">Makeup Pros</a></li>
    <li><a href="#massage" class="hover:text-[#D4AF37]">Wellness Therapists</a></li>
    <li><a href="#laser" class="hover:text-[#D4AF37]">Laser Specialists</a></li>

  </ul>

  <!-- Home -->
  <RouterLink
    to="/"
    class="font-medium hover:text-[#D4AF37]"
  >
    Home
  </RouterLink>

</div>

  </nav>

  <!-- DEFAULT NAVBAR -->

  <nav
    v-else
    class="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


  <h1 class="heading-font text-2xl font-bold text-[#bd9c30]">
    Golden Glow Studio
  </h1>

  <RouterLink to="/" class="hover:text-[#D4AF37]">
    Home
  </RouterLink>

</div>


  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute, RouterLink } from "vue-router"

const router = useRouter()
const route = useRoute()

const theme = ref("dark")
const user = ref(null)

const applyTheme = (selectedTheme) => {
  if (selectedTheme === "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark"
  localStorage.setItem("gg-theme", theme.value)
  applyTheme(theme.value)
}

const loadUser = () => {
  const savedUser = localStorage.getItem("gg-user")
  user.value = savedUser ? JSON.parse(savedUser) : null
}

const logout = () => {
  localStorage.removeItem("gg-user")
  user.value = null
  router.push("/")
}

onMounted(() => {
  theme.value = localStorage.getItem("gg-theme") || "dark"
  applyTheme(theme.value)

  loadUser()
  window.addEventListener("storage", loadUser)
})
</script>

<style scoped>
.heading-font {
  font-family: "Playfair Display", serif;
}
</style>
