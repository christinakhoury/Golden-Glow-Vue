<template>
  <!-- HOME NAVBAR -->
  <nav
    v-if="route.name === 'home'"
    class="fixed top-0 left-0 w-full bg-navbar backdrop-blur-md shadow-sm z-50 border-b border-theme"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <h1 class="heading-font text-3xl font-bold text-[#D4AF37]">
        Golden Glow Studio
      </h1>

      <!-- Desktop Navigation Links -->
      <ul class="hidden lg:flex gap-8 font-medium text-secondary">
        <li><a href="#home" class="hover:text-[#D4AF37] transition-colors duration-300">Home</a></li>
        <li><a href="#services" class="hover:text-[#D4AF37] transition-colors duration-300">Services</a></li>
        <li><a href="#specialists" class="hover:text-[#D4AF37] transition-colors duration-300">Specialists</a></li>
        <li><a href="#offers" class="hover:text-[#D4AF37] transition-colors duration-300">Offers</a></li>
        <li><a href="#aboutus" class="hover:text-[#D4AF37] transition-colors duration-300">About Us</a></li>
        <li><a href="#membership" class="hover:text-[#D4AF37] transition-colors duration-300">Membership</a></li>
      </ul>

      <!-- Desktop Right Side -->
      <div class="hidden lg:flex items-center gap-4">
        <!-- Desktop Search -->
        <div class="relative">
          <input
            v-model="search"
            type="text"
            placeholder="Search..."
            class="w-34 px-3 py-2.5 border border-theme rounded-full bg-input text-primary focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
          />

          <!-- Results Dropdown -->
          <div
            v-if="search"
            class="absolute top-14 left-0 w-80 bg-dropdown rounded-2xl shadow-theme-heavy border border-theme overflow-hidden z-50"
          >
            <template v-if="filteredResults.length">
              <div
                v-for="item in filteredResults"
                :key="item.id"
                @click="goToResult(item)"
                class="px-4 py-3 hover:bg-hover cursor-pointer transition border-b border-theme last:border-b-0"
              >
                <div
                  class="font-medium text-primary"
                  v-html="highlightMatch(item.name)"
                ></div>
                <div class="text-xs text-muted">
                  {{ item.type }}
                </div>
              </div>
            </template>
            <div v-else class="p-4 text-center text-muted">
              No results found
            </div>
          </div>
        </div>

        <template v-if="user">
          <div class="px-4 py-2 rounded-full border border-[#D4AF37]">
            <p class="text-xs text-secondary">
              {{ user.points }} pts ✨
            </p>
          </div>

          <button
            @click="logout"
            class="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition duration-300"
          >
            Logout
          </button>
        </template>

        <template v-else>
          <RouterLink
            to="/login"
            class="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition duration-300"
          >
            Login
          </RouterLink>
        </template>

        <RouterLink
          to="/cart"
          class="bg-[#D4AF37] text-white px-5 py-2 rounded-full hover:scale-105 transition-transform duration-300"
        >
          Book Now
        </RouterLink>
      </div>

      <!-- Mobile: Only Logo + Hamburger -->
      <div class="flex lg:hidden items-center gap-2">
        <button
          @click="sidebarOpen = true"
          class="p-2 rounded-lg hover:bg-hover transition-colors duration-300"
          aria-label="Open menu"
        >
          <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- SPECIALISTS NAVBAR -->
  <nav
    v-else-if="route.name === 'specialists'"
    class="fixed top-0 left-0 w-full bg-navbar backdrop-blur-md shadow-sm z-50 border-b border-theme"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <h1 class="heading-font text-2xl font-bold text-[#D4AF37]">
        Golden Glow Studio
      </h1>

      <ul class="hidden lg:flex gap-8 font-medium text-secondary">
        <li><a href="#hair" class="hover:text-[#D4AF37] transition-colors duration-300">Hair Experts</a></li>
        <li><a href="#nails" class="hover:text-[#D4AF37] transition-colors duration-300">Nail Artists</a></li>
        <li><a href="#makeup" class="hover:text-[#D4AF37] transition-colors duration-300">Makeup Pros</a></li>
        <li><a href="#massage" class="hover:text-[#D4AF37] transition-colors duration-300">Wellness Therapists</a></li>
        <li><a href="#laser" class="hover:text-[#D4AF37] transition-colors duration-300">Laser Specialists</a></li>
      </ul>

      <div class="hidden lg:flex items-center gap-4">
        <RouterLink to="/" class="font-medium text-secondary hover:text-[#D4AF37] transition-colors duration-300">
          Home
        </RouterLink>
      </div>

      <!-- Mobile -->
      <div class="flex lg:hidden items-center gap-2">
        <button
          @click="sidebarOpen = true"
          class="p-2 rounded-lg hover:bg-hover transition-colors duration-300"
          aria-label="Open menu"
        >
          <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- DEFAULT NAVBAR -->
  <nav
    v-else
    class="fixed top-0 left-0 w-full bg-navbar backdrop-blur-md shadow-sm z-50 border-b border-theme"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="heading-font text-2xl font-bold text-[#D4AF37]">
        Golden Glow Studio
      </h1>

      <div class="flex items-center gap-4">
        <RouterLink to="/" class="text-secondary hover:text-[#D4AF37] transition-colors duration-300">
          Home
        </RouterLink>

        <!-- Mobile -->
        <button
          @click="sidebarOpen = true"
          class="lg:hidden p-2 rounded-lg hover:bg-hover transition-colors duration-300"
          aria-label="Open menu"
        >
          <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- MOBILE SIDEBAR OVERLAY -->
  <Teleport to="body">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-[100]"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        :class="sidebarOpen ? 'opacity-100' : 'opacity-0'"
        @click="sidebarOpen = false"
      ></div>

      <!-- Sidebar -->
      <div
        class="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-sidebar shadow-2xl overflow-y-auto transition-transform duration-500 ease-in-out"
        :class="sidebarOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <!-- Sidebar Header -->
        <div class="flex items-center justify-between p-6 border-b border-theme">
          <h2 class="heading-font text-xl font-bold text-[#D4AF37]">
            Menu
          </h2>
          <button
            @click="sidebarOpen = false"
            class="p-2 rounded-lg hover:bg-hover transition-colors duration-300 text-primary"
            aria-label="Close menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Sidebar Content -->
        <div class="p-6 space-y-6">
          <!-- User Info -->
          <div v-if="user" class="pb-6 border-b border-theme animate-slide-down">
            <p class="font-semibold text-lg text-primary">{{ user.name }}</p>
            <p class="text-sm text-secondary">{{ user.points }} pts ✨</p>
          </div>

          <!-- Search - Mobile Only -->
          <div class="lg:hidden animate-slide-down" style="animation-delay: 0.05s">
            <div class="relative">
              <input
                v-model="search"
                type="text"
                placeholder="Search..."
                class="w-full px-4 py-3 border border-theme rounded-full bg-input text-primary focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
              />
              <div
                v-if="search"
                class="absolute top-full left-0 w-full mt-2 bg-dropdown rounded-2xl shadow-theme-heavy border border-theme overflow-hidden z-50"
              >
                <template v-if="filteredResults.length">
                  <div
                    v-for="item in filteredResults"
                    :key="item.id"
                    @click="goToResult(item)"
                    class="px-4 py-3 hover:bg-hover cursor-pointer transition border-b border-theme last:border-b-0"
                  >
                    <div
                      class="font-medium text-primary"
                      v-html="highlightMatch(item.name)"
                    ></div>
                    <div class="text-xs text-muted">
                      {{ item.type }}
                    </div>
                  </div>
                </template>
                <div v-else class="p-4 text-center text-muted">
                  No results found
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1">
            <!-- Home Navbar Links -->
            <template v-if="route.name === 'home'">
              <a
                v-for="(link, index) in homeLinks"
                :key="link.href"
                :href="link.href"
                class="block px-4 py-3 rounded-lg hover:bg-hover hover:text-[#D4AF37] transition-all duration-300 font-medium text-secondary animate-slide-down"
                :style="{ animationDelay: `${0.1 + index * 0.05}s` }"
                @click="sidebarOpen = false"
              >
                {{ link.label }}
              </a>
            </template>

            <!-- Specialists Navbar Links -->
            <template v-else-if="route.name === 'specialists'">
              <a
                v-for="(link, index) in specialistsLinks"
                :key="link.href"
                :href="link.href"
                class="block px-4 py-3 rounded-lg hover:bg-hover hover:text-[#D4AF37] transition-all duration-300 font-medium text-secondary animate-slide-down"
                :style="{ animationDelay: `${0.1 + index * 0.05}s` }"
                @click="sidebarOpen = false"
              >
                {{ link.label }}
              </a>
              <RouterLink
                to="/"
                class="block px-4 py-3 rounded-lg hover:bg-hover hover:text-[#D4AF37] transition-all duration-300 font-medium text-secondary animate-slide-down"
                :style="{ animationDelay: '0.35s' }"
                @click="sidebarOpen = false"
              >
                Home
              </RouterLink>
            </template>

            <!-- Default -->
            <template v-else>
              <RouterLink
                to="/"
                class="block px-4 py-3 rounded-lg hover:bg-hover hover:text-[#D4AF37] transition-all duration-300 font-medium text-secondary animate-slide-down"
                style="animation-delay: 0.1s"
                @click="sidebarOpen = false"
              >
                Home
              </RouterLink>
            </template>
          </nav>

          <!-- Divider -->
          <hr class="border-theme animate-slide-down" style="animation-delay: 0.4s" />

          <!-- Auth Buttons -->
          <div class="space-y-3">
            <template v-if="user">
              <button
                @click="logout"
                class="w-full border border-[#D4AF37] text-[#D4AF37] px-4 py-3 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 font-medium animate-slide-down hover:scale-105"
                style="animation-delay: 0.45s"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <RouterLink
                to="/login"
                class="block w-full border border-[#D4AF37] text-[#D4AF37] px-4 py-3 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 text-center font-medium animate-slide-down hover:scale-105"
                style="animation-delay: 0.45s"
                @click="sidebarOpen = false"
              >
                Login
              </RouterLink>
            </template>

            <!-- Book Now - Mobile Only -->
            <RouterLink
              to="/cart"
              class="lg:hidden block w-full bg-[#D4AF37] text-white px-4 py-3 rounded-full transition-all duration-300 text-center font-medium animate-slide-down hover:scale-105 animate-pulse-subtle"
              style="animation-delay: 0.5s"
              @click="sidebarOpen = false"
            >
              ✨ Book Now
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import { useRouter, useRoute, RouterLink } from "vue-router"
import { useTheme } from "../../composables/useTheme"

const router = useRouter()
const route = useRoute()
const { theme } = useTheme()

const sidebarOpen = ref(false)
const user = ref(null)
const search = ref("")

const homeLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Specialists", href: "#specialists" },
  { label: "Offers", href: "#offers" },
  { label: "About Us", href: "#aboutus" },
  { label: "Membership", href: "#membership" }
]

const specialistsLinks = [
  { label: "Hair Experts", href: "#hair" },
  { label: "Nail Artists", href: "#nails" },
  { label: "Makeup Pros", href: "#makeup" },
  { label: "Wellness Therapists", href: "#massage" },
  { label: "Laser Specialists", href: "#laser" }
]

// Check if screen is desktop
const isDesktop = () => window.innerWidth >= 1024

// Close sidebar when resizing to desktop
const handleResize = () => {
  if (isDesktop() && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

// Prevent body scroll when sidebar is open
watch(sidebarOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
})

// Close sidebar on escape key
const handleEscape = (e) => {
  if (e.key === "Escape" && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  loadUser()
  document.addEventListener("keydown", handleEscape)
  window.addEventListener("storage", loadUser)
  window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape)
  window.removeEventListener("storage", loadUser)
  window.removeEventListener("resize", handleResize)
  document.body.style.overflow = ""
})

const loadUser = () => {
  const savedUser = localStorage.getItem("gg-user")
  user.value = savedUser ? JSON.parse(savedUser) : null
}

const logout = () => {
  localStorage.removeItem("gg-user")
  user.value = null
  sidebarOpen.value = false
  router.push("/")
}

// Search logic
const searchItems = [
  // SERVICE CATEGORIES
  {
  id: 88,
  name: "Services",
  type: "Category",
  route: "/#services"
},
{
  id: 89,
  name: "Specialists",
  type: "Category",
  route: "/specialists"
},
{
  id: 90,
  name: "Hair",
  type: "Category",
  route: "/services/hair"
},
{
  id: 91,
  name: "Hair Services",
  type: "Category",
  route: "/services/hair"
},

{
  id: 92,
  name: "Nails",
  type: "Category",
  route: "/services/nails"
},
{
  id: 93,
  name: "Nail Services",
  type: "Category",
  route: "/services/nails"
},

{
  id: 94,
  name: "Makeup",
  type: "Category",
  route: "/services/makeup"
},
{
  id: 95,
  name: "Makeup Services",
  type: "Category",
  route: "/services/makeup"
},

{
  id: 96,
  name: "Massage",
  type: "Category",
  route: "/services/massage"
},
{
  id: 97,
  name: "Massage Services",
  type: "Category",
  route: "/services/massage"
},

{
  id: 98,
  name: "Laser",
  type: "Category",
  route: "/services/laser"
},
{
  id: 99,
  name: "Laser Services",
  type: "Category",
  route: "/services/laser"
},

// HAIR SERVICES
{
  id: 100,
  name: "Hair Cut",
  type: "Service",
  category: "hair",
  route: "/services/hair"
},
{
  id: 101,
  name: "Hair Coloring",
  type: "Service",
  category: "hair",
  route: "/services/hair"
},
{
  id: 102,
  name: "Hair Styling",
  type: "Service",
  category: "hair",
  route: "/services/hair"
},
{
  id: 103,
  name: "Hair Treatment",
  type: "Service",
  category: "hair",
  route: "/services/hair"
},

// NAIL SERVICES
{
  id: 104,
  name: "Manicure",
  type: "Service",
  category: "nails",
  route: "/services/nails"
},
{
  id: 105,
  name: "Pedicure",
  type: "Service",
  category: "nails",
  route: "/services/nails"
},
{
  id: 106,
  name: "Gel Nails",
  type: "Service",
  category: "nails",
  route: "/services/nails"
},
{
  id: 107,
  name: "Acrylic Nails",
  type: "Service",
  category: "nails",
  route: "/services/nails"
},
{
  id: 108,
  name: "Nail Art",
  type: "Service",
  category: "nails",
  route: "/services/nails"
},

// MAKEUP SERVICES
{
  id: 109,
  name: "Bridal Makeup",
  type: "Service",
  category: "makeup",
  route: "/services/makeup"
},
{
  id: 110,
  name: "Event Makeup",
  type: "Service",
  category: "makeup",
  route: "/services/makeup"
},
{
  id: 111,
  name: "Natural Makeup",
  type: "Service",
  category: "makeup",
  route: "/services/makeup"
},
{
  id: 112,
  name: "Photoshoot Makeup",
  type: "Service",
  category: "makeup",
  route: "/services/makeup"
},

// MASSAGE SERVICES
{
  id: 113,
  name: "Swedish Massage",
  type: "Service",
  category: "massage",
  route: "/services/massage"
},
{
  id: 114,
  name: "Deep Tissue Massage",
  type: "Service",
  category: "massage",
  route: "/services/massage"
},
{
  id: 115,
  name: "Hot Stone Massage",
  type: "Service",
  category: "massage",
  route: "/services/massage"
},
{
  id: 116,
  name: "Aromatherapy",
  type: "Service",
  category: "massage",
  route: "/services/massage"
},

// LASER SERVICES
{
  id: 117,
  name: "Laser Hair Removal",
  type: "Service",
  category: "laser",
  route: "/services/laser"
},
{
  id: 118,
  name: "Skin Rejuvenation",
  type: "Service",
  category: "laser",
  route: "/services/laser"
},
{
  id: 119,
  name: "Acne Treatment",
  type: "Service",
  category: "laser",
  route: "/services/laser"
},
{
  id: 120,
  name: "Pigmentation Removal",
  type: "Service",
  category: "laser",
  route: "/services/laser"
},


  // HAIR SPECIALISTS
  { id: 1, name: "Sarah Akiki", type: "Hair Specialist" },
  { id: 2, name: "Miriam Younes", type: "Hair Specialist" },
  { id: 3, name: "Nelly Rizk", type: "Hair Specialist" },

  // NAIL SPECIALISTS
  { id: 4, name: "Maya Rahme", type: "Nail Specialist" },
  { id: 5, name: "Rita Khoury", type: "Nail Specialist" },
  { id: 6, name: "Jessica Haddad", type: "Nail Specialist" },

  // MAKEUP SPECIALISTS
  { id: 7, name: "Charbel Obeid", type: "Makeup Specialist" },
  { id: 8, name: "Lara Haddad", type: "Makeup Specialist" },
  { id: 9, name: "Julia Khoury", type: "Makeup Specialist" },

  // MASSAGE SPECIALISTS
  { id: 10, name: "Amir Hannah", type: "Massage Specialist" },
  { id: 11, name: "Nour Abou Khalil", type: "Massage Specialist" },
  { id: 12, name: "Elie Haddad", type: "Massage Specialist" },

  // LASER SPECIALISTS
  { id: 13, name: "Rania Khoury", type: "Laser Specialist" },
  { id: 14, name: "Carla Saad", type: "Laser Specialist" },
  { id: 15, name: "Melissa Nader", type: "Laser Specialist" },

  // MAKEUP SERVICES
  { id: 16, name: "Bridal Makeup", type: "Service" },
  { id: 17, name: "Event Makeup", type: "Service" },
  { id: 18, name: "Natural Makeup", type: "Service" },
  { id: 19, name: "Photoshoot Makeup", type: "Service" },

  // MASSAGE SERVICES
  { id: 20, name: "Swedish Massage", type: "Service" },
  { id: 21, name: "Deep Tissue", type: "Service" },
  { id: 22, name: "Hot Stone Massage", type: "Service" },
  { id: 23, name: "Aromatherapy", type: "Service" },

  // LASER SERVICES
  { id: 24, name: "Laser Hair Removal", type: "Service" },
  { id: 25, name: "Skin Rejuvenation", type: "Service" },
  { id: 26, name: "Acne Treatment", type: "Service" },
  { id: 27, name: "Pigmentation Removal", type: "Service" },

  {
  id: 200,
  name: "VIP",
  type: "Category",
  route: "/#membership"
},
{
  id: 201,
  name: "VIP Membership",
  type: "Category",
  route: "/#membership"
},
{
  id: 202,
  name: "Membership",
  type: "Category",
  route: "/#membership"
},

{
  id: 203,
  name: "Offers",
  type: "Category",
  route: "/#offers"
},
{
  id: 204,
  name: "Gift Cards",
  type: "Category",
  route: "/giftcards"
},
{
  id: 205,
  name: "Book",
  type: "Category",
  route: "/book"
},
{
  id: 206,
  name: "Appointment",
  type: "Category",
  route: "/book"
},

]

const levenshtein = (a, b) => {
  const matrix = Array.from({ length: b.length + 1 }, () =>
    Array(a.length + 1).fill(0)
  )

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1

      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      )
    }
  }

  return matrix[b.length][a.length]
}

const filteredResults = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) return []

  return searchItems
    .map(item => {
      const name = item.name.toLowerCase()

      if (name.includes(query)) {
        return { item, score: 0 }
      }

      const score = levenshtein(query, name)

      return { item, score }
    })
    .sort((a, b) => a.score - b.score)
    .filter(x => x.score <= Math.max(3, query.length))
    .slice(0, 8)
    .map(x => x.item)
})

const goToResult = (item) => {
  search.value = ""
  sidebarOpen.value = false

  if (item.type === "Hair Specialist") {
    router.push("/specialists#hair")
    return
  }

  if (item.type === "Nail Specialist") {
    router.push("/specialists#nails")
    return
  }

  if (item.type === "Makeup Specialist") {
    router.push("/specialists#makeup")
    return
  }

  if (item.type === "Massage Specialist") {
    router.push("/specialists#massage")
    return
  }

  if (item.type === "Laser Specialist") {
    router.push("/specialists#laser")
    return
  }

  if (item.type === "Service" || item.type === "Category") {
    router.push(item.route)
    return
  }
}

const highlightMatch = (text) => {
  if (!search.value) return text

  const escaped = search.value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  )

  const regex = new RegExp(`(${escaped})`, "gi")

  return text.replace(
    regex,
    `<span class="text-[#D4AF37] font-bold">$1</span>`
  )
}
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseSubtle {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.animate-slide-down {
  animation: slideDown 0.4s ease-out forwards;
  opacity: 0;
}

.animate-pulse-subtle {
  animation: slideDown 0.4s ease-out forwards, pulseSubtle 2s ease-in-out infinite 0.5s;
}
</style>