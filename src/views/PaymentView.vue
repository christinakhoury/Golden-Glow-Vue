<template>
  <div class="body-font bg-secondary min-h-screen flex items-center justify-center">
    <div class="w-full max-w-xl bg-card border border-[#D4AF37] rounded-3xl shadow-theme-heavy p-10">
      <h1 class="heading-font text-4xl text-center font-bold text-[#D4AF37] mb-2">Payment</h1>
      <p class="text-center text-secondary mb-8">Secure Checkout</p>

      <div class="bg-secondary rounded-2xl p-4 mb-8 border border-theme">
        <p class="text-primary"><strong>Recipient:</strong> {{ giftCard.recipientName }}</p>
        <p class="text-primary"><strong>Phone number:</strong> {{ giftCard.phoneNumber }}</p>
        <p class="text-primary"><strong>Amount:</strong> ${{ giftCard.amount }}</p>
      </div>

      <div class="space-y-4">
        <input v-model="cardName" placeholder="Name On Card" class="w-full border border-theme rounded-xl px-4 py-3 bg-input text-primary placeholder:text-secondary" />
        <input v-model="cardNumber" placeholder="Card Number" class="w-full border border-theme rounded-xl px-4 py-3 bg-input text-primary placeholder:text-secondary" />
        <div class="grid grid-cols-2 gap-4">
          <input v-model="expiry" placeholder="MM/YY" class="w-full border border-theme rounded-xl px-4 py-3 bg-input text-primary placeholder:text-secondary" />
          <input v-model="cvv" type="password" placeholder="CVV" class="w-full border border-theme rounded-xl px-4 py-3 bg-input text-primary placeholder:text-secondary" />
        </div>
        <button @click="completePayment" class="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:bg-[#c39d28] transition">
          Pay Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const giftCard = ref(JSON.parse(localStorage.getItem("gg-current-giftcard")) || {})

if (!giftCard.value.amount) {
  router.push("/giftcards")
}

const cardName = ref("")
const cardNumber = ref("")
const expiry = ref("")
const cvv = ref("")

function completePayment() {
  if (!cardName.value || !cardNumber.value || !expiry.value || !cvv.value) {
    alert("Please complete all fields")
    return
  }

  const cards = JSON.parse(localStorage.getItem("gg-giftcards")) || []
  cards.push(giftCard.value)
  localStorage.setItem("gg-giftcards", JSON.stringify(cards))
  router.push("/voucher")
}
</script>