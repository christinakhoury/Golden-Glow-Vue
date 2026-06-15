<template>
  <div class="body-font bg-[#F8F4EF] min-h-screen flex items-center justify-center">
    <div class="max-w-2xl w-full bg-white border border-[#D4AF37] rounded-3xl shadow-2xl p-10 text-center">

      <h1 class="heading-font text-5xl font-bold text-[#D4AF37] mb-4">
        Gift Voucher
      </h1>

      <p class="text-gray-600 mb-8">
        Your gift card purchase was successful 🎉
      </p>

      <div class="border border-[#D4AF37] rounded-3xl p-8 mb-8">

        <h2 class="text-3xl font-bold text-[#D4AF37] mb-4">
          Golden Glow Studio
        </h2>

        <p class="mb-2">
          🎁 Gifted To: <strong>{{ giftCard.recipientName }}</strong>
        </p>

        <p class="mb-2">
          💝 Gifted By: <strong>{{ giftCard.buyerName }}</strong>
        </p>

        <p class="mb-2">
          💰 Value: <strong>${{ giftCard.amount }}</strong>
        </p>

        <p class="mb-6">
          🎫 Voucher Code: <strong>{{ giftCard.code }}</strong>
        </p>

        <div class="bg-[#F8F4EF] rounded-2xl p-5">
          <p class="font-semibold mb-2">Personal Message</p>
          <p class="italic text-gray-700">
            "{{ giftCard.message || 'Enjoy your luxury experience at Golden Glow Studio.' }}"
          </p>
        </div>

      </div>

      <button
        @click="downloadPDF"
        class="bg-[#D4AF37] text-white px-8 py-3 rounded-xl hover:bg-[#c39d28] transition"
      >
        Download PDF Voucher
      </button>

      <router-link
        to="/"
        class="inline-block mt-4 px-6 py-2 text-sm border border-[#D4AF37] text-[#D4AF37] rounded-xl hover:bg-[#D4AF37] hover:text-white transition"
      >
        ← Get Back Home
      </router-link>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const giftCard = ref(JSON.parse(localStorage.getItem("gg-current-giftcard")) || {})

function clean(text) {
  return String(text)
    .replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, "")
    .trim()
}

async function downloadPDF() {
  const { jsPDF } = await import("jspdf")
  const doc = new jsPDF()

  const message =
    giftCard.value.message?.trim() ||
    "Enjoy your luxury experience at Golden Glow Studio."

  const recipient = clean(giftCard.value.recipientName)
  const buyer = clean(giftCard.value.buyerName)
  const amount = giftCard.value.amount || "0"
  const code = clean(giftCard.value.code)
  const safeMessage = clean(message)

  const gold = [212, 175, 55]
  const dark = [40, 40, 40]

  doc.setDrawColor(...gold)
  doc.roundedRect(10, 10, 190, 277, 8, 8)

  doc.setFontSize(26)
  doc.setTextColor(...gold)
  doc.text("Gift Voucher", 105, 30, { align: "center" })

  doc.setFontSize(12)
  doc.setTextColor(...dark)
  doc.text("Your gift card purchase was successful", 105, 40, { align: "center" })

  doc.roundedRect(20, 55, 170, 120, 6, 6)

  doc.setFontSize(20)
  doc.setTextColor(...gold)
  doc.text("Golden Glow Studio", 105, 70, { align: "center" })

  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)

  doc.text(`Gifted To: ${recipient}`, 105, 90, { align: "center" })
  doc.text(`Gifted By: ${buyer}`, 105, 102, { align: "center" })
  doc.text(`Value: $${amount}`, 105, 114, { align: "center" })
  doc.text(`Voucher Code: ${code}`, 105, 126, { align: "center" })

  doc.roundedRect(25, 145, 160, 50, 6, 6)

  doc.setFontSize(12)
  doc.text("Personal Message", 105, 155, { align: "center" })

  doc.setFontSize(10)
  const split = doc.splitTextToSize(`"${safeMessage}"`, 150)
  doc.text(split, 105, 168, { align: "center" })

  doc.setFontSize(9)
  doc.setTextColor(120, 120, 120)

  doc.text(
    "Golden Glow Studio • Luxury Beauty Experience • Beirut",
    105,
    270,
    { align: "center" }
  )

  doc.save("GoldenGlowGiftVoucher.pdf")
}
</script>