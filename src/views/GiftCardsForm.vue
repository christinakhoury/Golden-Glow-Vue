<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-[#F8F4EF] body-font">
    <div class="w-full max-w-2xl bg-white border border-[#D4AF37] shadow-2xl rounded-3xl p-10">

      <h1 class="heading-font text-4xl font-bold text-center text-[#D4AF37] mb-2">
        Gift Cards
      </h1>

      <p class="text-center text-gray-500 mb-8">
        Send luxury beauty to someone special 🎁
      </p>

      <!-- AMOUNTS -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          v-for="a in amounts"
          :key="a"
          @click="selectAmount(a)"
          class="gift-btn"
          :class="{ active: selectedAmount === a }"
        >
          ${{ a }}
        </button>
      </div>

      <!-- FORM -->
      <div class="space-y-4">

        <input v-model="buyerName" type="text" placeholder="Your Name"
          class="w-full px-4 py-3 border rounded-xl">

        <input v-model="buyerEmail" type="email" placeholder="Your Email"
          class="w-full px-4 py-3 border rounded-xl">

        <input v-model="recipientName" type="text" placeholder="Recipient Name"
          class="w-full px-4 py-3 border rounded-xl">

        <input v-model="recipientPhone" type="text" placeholder="Recipient Phone Number"
          class="w-full px-4 py-3 border rounded-xl">

        <textarea v-model="message" placeholder="Add a message (optional)"
          class="w-full px-4 py-3 border rounded-xl"></textarea>

        <p class="text-center text-gray-600">
          Selected Amount:
          <span class="font-bold text-[#D4AF37]">${{ selectedAmount }}</span>
        </p>

        <button
          @click="pay"
          class="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:bg-[#c39d28] transition"
        >
          Complete Payment
        </button>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

const amounts = [25, 50, 100, 250]

const selectedAmount = ref(0)

const buyerName = ref("")
const buyerEmail = ref("")
const recipientName = ref("")
const recipientPhone = ref("")
const message = ref("")

function selectAmount(amount) {
  selectedAmount.value = amount
}

function generateCode() {
  return (
    "GLOW-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    "-" +
    Math.floor(Math.random() * 9000 + 1000)
  )
}

function pay() {
  if (!selectedAmount.value) return alert("Select an amount")
  if (!buyerName.value || !buyerEmail.value) return alert("Enter your info")
  if (!recipientName.value || !recipientPhone.value) return alert("Enter recipient info")

  const giftCard = {
    code: generateCode(),
    amount: selectedAmount.value,
    buyerName: buyerName.value,
    buyerEmail: buyerEmail.value,
    recipientName: recipientName.value,
    phoneNumber: recipientPhone.value,
    message: message.value,
    status: "active"
  }

  localStorage.setItem("gg-current-giftcard", JSON.stringify(giftCard))

  router.push("/payment")
}

onMounted(() => {
  const amount = route.query.amount
  if (amount) selectedAmount.value = Number(amount)
})
</script>

<style scoped>
.gift-btn {
  border: 1px solid #D4AF37;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.3s;
}

.gift-btn:hover {
  background: #D4AF37;
  color: white;
}

.gift-btn.active {
  background: #D4AF37;
  color: white;
}
</style>