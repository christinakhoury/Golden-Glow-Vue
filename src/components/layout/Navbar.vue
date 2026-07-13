<template>
  <nav class="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm z-50 h-20 transition-all duration-300">
    <div class="max-w-[1600px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between gap-4">
      
      <!-- 🏷️ Brand Logo -->
      <RouterLink to="/" class="flex-shrink-0 group flex items-center gap-3">
        <div class="flex flex-col mt-0.5">
          <h1 class="text-lg md:text-xl font-light tracking-widest text-gray-800 uppercase leading-none">
            Golden Glow
          </h1>
          <span class="text-[9px] tracking-[0.3em] text-[#bd9c30] uppercase mt-1">
            Premium Studio
          </span>
        </div>
      </RouterLink>

      <!-- 🗺️ Navigation Links (Conditional based on route) -->
      <div class="hidden lg:flex items-center justify-center flex-1 px-4">
        <!-- Home / Standard Navbar Links -->
        <ul v-if="route.name !== 'specialists'" class="flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-600 tracking-wide">
          <li><RouterLink to="/#home" class="hover:text-[#bd9c30] transition-colors duration-200">Home</RouterLink></li>
          <li><RouterLink to="/#services" class="hover:text-[#bd9c30] transition-colors duration-200">Services</RouterLink></li>
          <li><RouterLink to="/specialists" class="hover:text-[#bd9c30] transition-colors duration-200 text-[#bd9c30] font-semibold">Specialists</RouterLink></li>
          <li><RouterLink to="/products" class="hover:text-[#bd9c30] transition-colors duration-200">Products</RouterLink></li>
          <li><RouterLink to="/#offers" class="hover:text-[#bd9c30] transition-colors duration-200">Offers</RouterLink></li>
          <li><RouterLink to="/#aboutus" class="hover:text-[#bd9c30] transition-colors duration-200">About Us</RouterLink></li>
          <li><RouterLink to="/#membership" class="hover:text-[#bd9c30] transition-colors duration-200">Membership</RouterLink></li>
        </ul>

        <!-- Specialists Specific Navbar Links -->
        <ul v-else class="flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-600 tracking-wide">
          <li><RouterLink to="/#home" class="hover:text-[#bd9c30] transition-colors duration-200">Home</RouterLink></li>
          <li><a href="#hair" class="hover:text-[#bd9c30] transition-colors duration-200">Hair Experts</a></li>
          <li><a href="#nails" class="hover:text-[#bd9c30] transition-colors duration-200">Nail Artists</a></li>
          <li><a href="#makeup" class="hover:text-[#bd9c30] transition-colors duration-200">Makeup Pros</a></li>
          <li><a href="#massage" class="hover:text-[#bd9c30] transition-colors duration-200">Wellness Therapists</a></li>
          <li><a href="#laser" class="hover:text-[#bd9c30] transition-colors duration-200">Laser Specialists</a></li>
        </ul>
      </div>

      <!-- ⚡ Right Actions Side -->
      <div class="flex items-center gap-3 md:gap-4 flex-shrink-0">

        <!-- 🔍 Search Component -->
        <div class="relative hidden md:block">
          <div class="relative">
            <input
              v-model="search"
              type="text"
              placeholder="Search services, masters..."
              class="w-48 lg:w-56 focus:w-64 px-4 py-2 pl-9 text-sm border border-gray-200 rounded-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#bd9c30]/20 focus:border-[#bd9c30] transition-all duration-300"
            />
            <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.602z" />
            </svg>
          </div>

          <!-- Results Dropdown -->
          <div v-if="search" class="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 transform origin-top transition-all">
            <template v-if="filteredResults.length">
              <div
                v-for="item in filteredResults"
                :key="item.id"
                @click="goToResult(item)"
                class="px-4 py-3 hover:bg-[#faf7ef] cursor-pointer transition border-b border-gray-50 last:border-b-0"
              >
                <div class="text-sm font-medium text-gray-800" v-html="highlightMatch(item.name)"></div>
                <div class="text-xs text-gray-400 mt-0.5 tracking-wider uppercase font-semibold text-[10px]">{{ item.type }}</div>
              </div>
            </template>

            <!-- No Results State -->
            <div v-else class="p-6 text-center text-sm text-gray-400">
              No beautiful matches found.
            </div>
          </div>
        </div>
          
        <!-- ❤️ Wishlist Button -->
        <RouterLink to="/wishlist" class="relative p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition duration-200">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span v-if="wishlist.length" class="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
            {{ wishlist.length }}
          </span>
        </RouterLink>

        <!-- 🛒 Cart Wrapper -->
        <div class="relative" @mouseenter="cartHover = true" @mouseleave="cartHover = false">
          <RouterLink
            to="/cart"
            class="relative p-2.5 text-gray-600 hover:text-[#bd9c30] hover:bg-[#bd9c30]/10 rounded-full flex items-center transition"
            :class="cartShake ? 'animate-shake' : ''"
          >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span v-if="cart.length" class="absolute top-1 right-1 bg-[#bd9c30] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white" :class="cartPulse ? 'animate-ping-once' : ''">
              {{ cart.length }}
            </span>
          </RouterLink>

          <!-- Dropdown Mini Cart -->
          <div v-if="cartHover && cart.length" class="absolute right-0 mt-2 w-80 bg-white shadow-2xl rounded-2xl border border-gray-100 z-50 overflow-hidden transform origin-top transition-all">
            <div class="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <span class="font-semibold text-sm text-gray-800">Shopping Bag</span>
              <span class="text-xs text-gray-400">Showing last 3</span>
            </div>

            <div class="max-h-64 overflow-y-auto divide-y divide-gray-50">
              <div v-for="(item, index) in miniCartItems" :key="index" class="flex justify-between items-center p-4 text-sm hover:bg-gray-50/50 transition">
                <span class="truncate font-medium text-gray-700 max-w-[180px]">{{ item.name || 'Exclusive Treatment' }}</span>
                <span class="text-[#bd9c30] font-semibold bg-[#bd9c30]/5 px-2.5 py-0.5 rounded-full text-xs">x{{ item.quantity }}</span>
              </div>
            </div>

            <RouterLink to="/cart" class="block text-center bg-[#bd9c30] text-white py-3 text-sm font-semibold hover:bg-[#a88826] transition tracking-wide">
              View Bag & Checkout
            </RouterLink>
          </div>
        </div>

        <!-- 👤 User Profile Dropdown / Authentication State -->
        <template v-if="user">
          <div class="relative hidden sm:block group">
            <!-- Profile Trigger Button -->
            <button class="flex items-center gap-2 px-3 py-2 bg-[#faf7ef] hover:bg-[#ebdcb0]/20 rounded-full border border-gray-100 transition-colors duration-300 focus:outline-none">
              <div class="w-6 h-6 bg-[#bd9c30] text-white rounded-full flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                {{ user.name ? user.name.charAt(0) : 'U' }}
              </div>
              <span class="text-xs font-medium text-gray-700 max-w-[100px] truncate hidden md:inline">
                {{ user.name || 'Account' }}
              </span>
              <svg class="w-3 h-3 text-gray-400 group-hover:text-[#bd9c30] transition-colors duration-200" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div class="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden z-50 transform origin-top scale-95 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200">
              <div class="p-3 border-b border-gray-50 bg-gray-50/50">
                <p class="text-xs font-semibold text-gray-800 truncate">{{ user.name || 'Welcome Back' }}</p>
                <p class="text-[10px] text-gray-400 truncate mt-0.5">{{ user.email }}</p>
              </div>
              <div class="py-1">
                <RouterLink to="/account" class="block px-4 py-2.5 text-xs font-medium text-gray-600 hover:text-[#bd9c30] hover:bg-[#faf7ef] transition">
                  Profile
                </RouterLink>
                <hr class="border-gray-100 my-1">
                <button @click="logout" class="w-full text-left block px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <RouterLink to="/login" class="hidden sm:block text-sm font-medium text-gray-600 hover:text-[#bd9c30] transition">
            Sign In
          </RouterLink>
        </template>

        <!-- 📅 Main CTA Button -->
        <RouterLink to="/cart" class="bg-[#bd9c30] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#a88826] shadow-md shadow-[#bd9c30]/20 hover:shadow-lg transition-all active:scale-95 whitespace-nowrap">
          Book Now
        </RouterLink>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRouter, useRoute, RouterLink } from "vue-router"
import { useCart } from "../../composables/useCart"

const router = useRouter()
const route = useRoute()

const wishlist = ref(JSON.parse(localStorage.getItem("gg-wishlist") || "[]"))
const user = ref(null)
const search = ref("")

const searchItems = [
  // SERVICE CATEGORIES
  { id: 88, name: "Services", type: "Category", route: "/#services" },
  { id: 89, name: "Specialists", type: "Category", route: "/specialists" },
  { id: 90, name: "Hair", type: "Category", route: "/services/hair" },
  { id: 91, name: "Hair Services", type: "Category", route: "/services/hair" },
  { id: 92, name: "Nails", type: "Category", route: "/services/nails" },
  { id: 93, name: "Nail Services", type: "Category", route: "/services/nails" },
  { id: 94, name: "Makeup", type: "Category", route: "/services/makeup" },
  { id: 95, name: "Makeup Services", type: "Category", route: "/services/makeup" },
  { id: 96, name: "Massage", type: "Category", route: "/services/massage" },
  { id: 97, name: "Massage Services", type: "Category", route: "/services/massage" },
  { id: 98, name: "Laser", type: "Category", route: "/services/laser" },
  { id: 99, name: "Laser Services", type: "Category", route: "/services/laser" },

  // HAIR SERVICES
  { id: 100, name: "Hair Cut", type: "Service", category: "hair", route: "/services/hair" },
  { id: 101, name: "Hair Coloring", type: "Service", category: "hair", route: "/services/hair" },
  { id: 102, name: "Hair Styling", type: "Service", category: "hair", route: "/services/hair" },
  { id: 103, name: "Hair Treatment", type: "Service", category: "hair", route: "/services/hair" },

  // NAIL SERVICES
  { id: 104, name: "Manicure", type: "Service", category: "nails", route: "/services/nails" },
  { id: 105, name: "Pedicure", type: "Service", category: "nails", route: "/services/nails" },
  { id: 106, name: "Gel Nails", type: "Service", category: "nails", route: "/services/nails" },
  { id: 107, name: "Acrylic Nails", type: "Service", category: "nails", route: "/services/nails" },
  { id: 108, name: "Nail Art", type: "Service", category: "nails", route: "/services/nails" },

  // MAKEUP SERVICES
  { id: 109, name: "Bridal Makeup", type: "Service", category: "makeup", route: "/services/makeup" },
  { id: 110, name: "Event Makeup", type: "Service", category: "makeup", route: "/services/makeup" },
  { id: 111, name: "Natural Makeup", type: "Service", category: "makeup", route: "/services/makeup" },
  { id: 112, name: "Photoshoot Makeup", type: "Service", category: "makeup", route: "/services/makeup" },

  // MASSAGE SERVICES
  { id: 113, name: "Swedish Massage", type: "Service", category: "massage", route: "/services/massage" },
  { id: 114, name: "Deep Tissue Massage", type: "Service", category: "massage", route: "/services/massage" },
  { id: 115, name: "Hot Stone Massage", type: "Service", category: "massage", route: "/services/massage" },
  { id: 116, name: "Aromatherapy", type: "Service", category: "massage", route: "/services/massage" },

  // LASER SERVICES
  { id: 117, name: "Laser Hair Removal", type: "Service", category: "laser", route: "/services/laser" },
  { id: 118, name: "Skin Rejuvenation", type: "Service", category: "laser", route: "/services/laser" },
  { id: 119, name: "Acne Treatment", type: "Service", category: "laser", route: "/services/laser" },
  { id: 120, name: "Pigmentation Removal", type: "Service", category: "laser", route: "/services/laser" },

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

  { id: 200, name: "VIP", type: "Category", route: "/#membership" },
  { id: 201, name: "VIP Membership", type: "Category", route: "/#membership" },
  { id: 202, name: "Membership", type: "Category", route: "/#membership" },
  { id: 203, name: "Offers", type: "Category", route: "/#offers" },
  { id: 204, name: "Gift Cards", type: "Category", route: "/giftcards" },
  { id: 205, name: "Book", type: "Category", route: "/book" },
  { id: 206, name: "Appointment", type: "Category", route: "/book" }
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
      if (name.includes(query)) return { item, score: 0 }
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
  if (item.type.includes("Hair Specialist")) return router.push("/specialists#hair")
  if (item.type.includes("Nail Specialist")) return router.push("/specialists#nails")
  if (item.type.includes("Makeup Specialist")) return router.push("/specialists#makeup")
  if (item.type.includes("Massage Specialist")) return router.push("/specialists#massage")
  if (item.type.includes("Laser Specialist")) return router.push("/specialists#laser")
  if (item.type === "Service" || item.type === "Category") return router.push(item.route)
}

const highlightMatch = (text) => {
  if (!search.value) return text
  const escaped = search.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escaped})`, "gi")
  return text.replace(regex, `<span class="text-[#bd9c30] font-bold">$1</span>`)
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
  loadUser()
})

// 🛒 Cart Features
const { cart } = useCart()
const cartHover = ref(false)
const miniCartItems = computed(() => cart.value.slice(-3))

const cartShake = ref(false)
const cartPulse = ref(false)

watch(cart, () => {
  cartShake.value = true
  cartPulse.value = true
  setTimeout(() => (cartShake.value = false), 400)
  setTimeout(() => (cartPulse.value = false), 600)
}, { deep: true })
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
@keyframes pingOnce {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-ping-once {
  animation: pingOnce 0.5s ease-in-out;
}
</style>