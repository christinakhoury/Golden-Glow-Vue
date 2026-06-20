<template>
  <div class="min-h-screen bg-secondary text-primary pt-28 px-6">

    <div class="max-w-5xl mx-auto">

      <!-- HEADER -->
      <h1 class="text-3xl font-bold text-[#D4AF37] mb-6">
        Checkout
      </h1>

      <!-- EMPTY CART -->
      <div v-if="cart.length === 0" class="text-center text-secondary mt-20">
        <p class="text-lg">Your cart is empty 🛒</p>
        <router-link to="/cart" class="text-[#D4AF37] underline mt-4 inline-block">
          Go back to cart
        </router-link>
      </div>

      <!-- CART CONTENT -->
      <div v-else class="grid lg:grid-cols-2 gap-8">

        <!-- LEFT: ITEMS -->
        <div class="space-y-4">

          <div
            v-for="item in cart"
            :key="item.id + item.type"
            class="bg-card border border-theme rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h3 class="font-semibold">{{ item.name }}</h3>
              <p class="text-sm text-secondary">
                {{ item.type }}
              </p>
            </div>

            <div class="text-[#D4AF37] font-bold">
              ${{ item.price }} × {{ item.quantity }}
            </div>
          </div>

        </div>

        <!-- RIGHT: SUMMARY -->
        <div class="bg-card border border-theme rounded-2xl p-6 h-fit">

          <h2 class="text-xl font-bold mb-4">Order Summary</h2>

          <div class="space-y-2 text-sm">

            <div class="flex justify-between">
              <span>Services</span>
              <span>${{ serviceTotal }}</span>
            </div>

            <div class="flex justify-between">
              <span>Products</span>
              <span>${{ productTotal }}</span>
            </div>

            <hr class="my-3 border-theme" />

            <div class="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span class="text-[#D4AF37]">${{ total }}</span>
            </div>

          </div>

          <!-- PAYMENT METHOD -->
          <div class="mt-6 space-y-3">

            <h3 class="font-semibold">Payment Method</h3>

            <label class="flex items-center gap-2">
              <input type="radio" value="card" v-model="paymentMethod" />
              Card Payment
            </label>

            <label class="flex items-center gap-2" v-if="hasProducts">
              <input type="radio" value="cod" v-model="paymentMethod" />
              Cash on Delivery (Products)
            </label>

            <label class="flex items-center gap-2" v-if="hasServices">
              <input type="radio" value="cash" v-model="paymentMethod" />
              Cash on Location (Services)
            </label>

          </div>

          <!-- CHECKOUT BUTTON -->
          <button
            @click="pay"
            class="w-full mt-6 bg-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Pay & Continue
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const cart = ref([])

const paymentMethod = ref("card")

/* =========================
   LOAD CART
========================= */
onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem("gg-cart")) || []
})

/* =========================
   CHECK TYPES
========================= */
const hasServices = computed(() =>
  cart.value.some(i => i.type === "service")
)

const hasProducts = computed(() =>
  cart.value.some(i => i.type === "product")
)

/* =========================
   TOTALS
========================= */
const serviceTotal = computed(() =>
  cart.value
    .filter(i => i.type === "service")
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
)

const productTotal = computed(() =>
  cart.value
    .filter(i => i.type === "product")
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
)

const total = computed(() =>
  serviceTotal.value + productTotal.value
)

/* =========================
   PAYMENT ACTION
========================= */
function pay() {
  if (!paymentMethod.value) {
    alert("Please select a payment method")
    return
  }

  // 💳 mark payment as confirmed
  localStorage.setItem("paymentConfirmed", "true")

  // 🧾 store order
  const order = {
    items: cart.value,
    total: total.value,
    paymentMethod: paymentMethod.value,
    date: new Date().toISOString()
  }

  localStorage.setItem("gg-order", JSON.stringify(order))

  // 🧹 clear cart AFTER payment
  localStorage.removeItem("gg-cart")

  // 🔀 redirect logic
  if (hasServices.value) {
    router.push("/booking")
  } else {
    router.push("/")
    alert("Order confirmed 🎉")
  }
}
</script>