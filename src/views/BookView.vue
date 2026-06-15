<template>
  <div class="min-h-screen bg-[#F8F4EF] text-[#1C1C1C]">

    <!-- NAV -->
    <nav class="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 class="text-2xl font-bold text-[#D4AF37]">
          Golden Glow Studio
        </h1>

        <router-link to="/" class="hover:text-[#D4AF37]">
          Home
        </router-link>

      </div>
    </nav>

    <!-- CONTENT -->
    <div class="max-w-6xl mx-auto px-8 pt-32 pb-24">

      <!-- HEADER -->
      <div class="text-center mb-10">
        <h1 class="text-5xl font-bold text-[#D4AF37] mb-2">
          ✦ Golden Glow Studio
        </h1>
        <p class="text-gray-500">
          Book your next appointment in seconds
        </p>
      </div>

      <!-- CARD -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-16">

        <!-- PROGRESS -->
        <div class="flex gap-2 mb-10">
          <div class="flex-1 h-1 rounded-full bg-[#D4AF37]"></div>
          <div :class="step >= 2 ? 'bg-[#D4AF37]' : 'bg-gray-200'" class="flex-1 h-1 rounded-full"></div>
          <div :class="step >= 3 ? 'bg-[#D4AF37]' : 'bg-gray-200'" class="flex-1 h-1 rounded-full"></div>
        </div>

        <!-- STEP 1 -->
        <div v-if="step === 1">

          <p class="uppercase tracking-[0.25em] text-xs font-semibold text-[#D4AF37] mb-6">
            Your Details
          </p>

          <div class="space-y-5">

            <input v-model="form.name" placeholder="e.g. Maya Khoury"
                   class="w-full h-12 px-4 border border-gray-300 rounded-xl">

            <input v-model="form.email" placeholder="you@example.com"
                   class="w-full h-12 px-4 border border-gray-300 rounded-xl">

            <input v-model="form.phone" placeholder="+961 ..."
                   class="w-full h-12 px-4 border border-gray-300 rounded-xl">

            <button @click="goStep2"
                    class="w-full py-4 bg-[#D4AF37] text-white rounded-full font-medium hover:opacity-90 transition">
              Continue →
            </button>

          </div>

        </div>

        <!-- STEP 2 -->
        <div v-if="step === 2">

          <p class="uppercase tracking-[0.25em] text-xs font-semibold text-[#D4AF37] mb-6">
            Choose a Service
          </p>

          <!-- SERVICES -->
          <div class="grid grid-cols-2 lg:grid-cols-5 gap-3">

            <button
              v-for="s in services"
              :key="s"
              @click="selectService(s)"
              class="svc-btn p-4 border border-gray-300 rounded-xl transition"
              :class="selectedService === s ? 'border-[#D4AF37] bg-yellow-50 text-[#D4AF37]' : ''"
            >
              {{ s }}
            </button>

          </div>

          <!-- SPECIALISTS -->
          <div v-if="selectedService" class="mt-8">

            <p class="uppercase tracking-[0.25em] text-xs font-semibold text-[#D4AF37] mb-4">
              Choose Your Specialist
            </p>

            <div class="grid md:grid-cols-3 gap-3">

              <button
                v-for="sp in specialists[selectedService]"
                :key="sp"
                @click="selectedSpecialist = sp"
                class="p-4 border border-gray-300 rounded-xl transition text-center"
                :class="selectedSpecialist === sp ? 'border-[#D4AF37] bg-yellow-50 text-[#D4AF37]' : ''"
              >

                <div class="w-10 h-10 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center text-[#D4AF37] font-semibold">
                  {{ initials(sp) }}
                </div>

                {{ sp }}
              </button>

            </div>

          </div>

          <!-- DATE -->
          <div v-if="selectedSpecialist" class="mt-8">

            <hr class="my-6 border-gray-200">

            <p class="uppercase tracking-[0.25em] text-xs font-semibold text-[#D4AF37] mb-4">
              Pick a Date & Time
            </p>

            <div class="grid md:grid-cols-2 gap-4">

              <input type="date" v-model="form.date"
                     :min="today"
                     :max="maxDate"
                     class="h-12 px-4 border border-gray-300 rounded-xl">

              <input type="time"
                     v-model="form.time"
                     min="08:00"
                     max="21:00"
                     class="h-12 px-4 border border-gray-300 rounded-xl">

            </div>

            <!-- REMINDERS -->
            <hr class="my-6 border-gray-200">

            <p class="uppercase tracking-[0.25em] text-xs font-semibold text-[#D4AF37] mb-4">
              Reminders
            </p>

            <label
              @click="toggle('rem24')"
              class="flex items-center gap-3 p-4 mb-3 border rounded-xl cursor-pointer"
              :class="rem24 ? 'border-[#D4AF37] bg-yellow-50' : ''"
            >
              <input type="checkbox" v-model="rem24" class="accent-[#D4AF37]">
              <div>
                <div class="font-medium">24-hour Reminder</div>
                <div class="text-sm text-gray-500">We'll send you an email the day before</div>
              </div>
            </label>

            <label
              @click="toggle('wa')"
              class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer"
              :class="remWa ? 'border-[#D4AF37] bg-yellow-50' : ''"
            >
              <input type="checkbox" v-model="remWa" class="accent-[#D4AF37]">
              <div>
                <div class="font-medium">WhatsApp Reminder</div>
                <div class="text-sm text-gray-500">Quick message on appointment day</div>
              </div>
            </label>

            <button @click="confirm"
                    class="w-full mt-6 py-4 bg-[#D4AF37] text-white rounded-full font-medium hover:opacity-90 transition">
              Confirm Booking
            </button>

          </div>

        </div>

        <!-- SUCCESS -->
        <div v-if="step === 3" class="text-center py-12">

          <div class="text-6xl mb-4">✨</div>

          <h2 class="text-3xl font-semibold mb-3">
            You're All Set!
          </h2>

          <p class="text-gray-500">
            Hi {{ form.name }}, we'll see you soon at Golden Glow Studio.
          </p>

          <div class="flex flex-wrap justify-center gap-3 mt-6">

            <span class="px-4 py-2 rounded-full bg-yellow-50 border border-yellow-300 text-[#D4AF37] text-sm">
              {{ selectedService }}
            </span>

            <span class="px-4 py-2 rounded-full bg-yellow-50 border border-yellow-300 text-[#D4AF37] text-sm">
              {{ selectedSpecialist }}
            </span>

            <span class="px-4 py-2 rounded-full bg-yellow-50 border border-yellow-300 text-[#D4AF37] text-sm">
              {{ form.date }} at {{ form.time }}
            </span>

          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue"

const step = ref(1)

const form = reactive({
  name: "",
  email: "",
  phone: "",
  date: "",
  time: ""
})

const services = ["Hair", "Nails", "Makeup", "Massage", "Laser"]

const specialists = {
  Hair: ["Sarah Akiki", "Miriam Younes", "Nelly Rizk"],
  Nails: ["Maya Rahme", "Rita Khoury", "Jessica Haddad"],
  Makeup: ["Charbel Obeid", "Lara Haddad", "Julia Khoury"],
  Massage: ["Amir Hannah", "Elie Haddad", "Nour Abou Khalil"],
  Laser: ["Rania Khoury", "Carla Saad", "Melissa Nader"]
}

const selectedService = ref("")
const selectedSpecialist = ref("")

const rem24 = ref(false)
const remWa = ref(false)

const today = new Date().toISOString().split("T")[0]

const maxDateObj = new Date()
maxDateObj.setFullYear(maxDateObj.getFullYear() + 1)

const maxDate = maxDateObj.toISOString().split("T")[0]

function initials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2)
}

function goStep2() {
  if (form.name.length < 3) return alert("Enter valid name")
  if (!form.email.includes("@")) return alert("Enter valid email")
  if (form.phone.length < 8) return alert("Enter valid phone")
  step.value = 2
}

function selectService(s) {
  selectedService.value = s
  selectedSpecialist.value = ""
}

function toggle(type) {
  if (type === "rem24") rem24.value = !rem24.value
  if (type === "wa") remWa.value = !remWa.value
}

function confirm() {
  if (!selectedService.value || !selectedSpecialist.value)
    return alert("Select service + specialist")

  if (!form.date || !form.time)
    return alert("Select date + time")

  step.value = 3
}
</script>