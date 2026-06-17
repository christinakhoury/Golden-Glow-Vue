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

     
   <div class="relative hidden xl:block">

  <!-- Search Input -->
  <input
    v-model="search"
    type="text"
    placeholder="Search..."
    class="w-34 px-3 py-2.5 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#bd9c30] focus:border-transparent transition"
  />

  <!-- Results Dropdown -->
  <div
    v-if="search"
    class="absolute top-14 left-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
  >

    <!-- Results -->
    <template v-if="filteredResults.length">

      <div
        v-for="item in filteredResults"
        :key="item.id"
        @click="goToResult(item)"
        class="px-4 py-3 hover:bg-[#faf7ef] cursor-pointer transition border-b border-gray-100 last:border-b-0"
      >

        <div
          class="font-medium"
          v-html="highlightMatch(item.name)"
        ></div>

        <div class="text-xs text-gray-500">
          {{ item.type }}
        </div>

      </div>

    </template>

    <!-- No Results -->
    <div
      v-else
      class="p-4 text-center text-gray-400"
    >
      No results found
    </div>

  </div>

</div>
    

  

    <template v-if="user">
      <div class="px-4 py-2 rounded-full border border-[#D4AF37]">
        <p class="text-xs text-gray-500">
          {{ user.points }} pts ✨
        </p>
      </div>

      <button
        @click="logout"
        class="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition"
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
import { ref, computed, onMounted } from "vue"
import { useRouter, useRoute, RouterLink } from "vue-router"

const router = useRouter()
const route = useRoute()

const theme = ref("dark")
const user = ref(null)
const search = ref("")

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

      // instant match boost
      if (name.includes(query)) {
        return { item, score: 0 }
      }

      const score = levenshtein(query, name)

      return { item, score }
    })
    .sort((a, b) => a.score - b.score)
    .filter(x => x.score <= Math.max(3, query.length)) // MUCH safer
    .slice(0, 8) // prevent overload
    .map(x => x.item)
})

const goToResult = (item) => {

  search.value = ""

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
//services 
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
    `<span class="text-[#bd9c30] font-bold">$1</span>`
  )
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
</script>