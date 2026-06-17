<template>
  <div class="min-h-screen bg-[#faf7f3] pt-28 px-6">
    
    <div class="max-w-5xl mx-auto">

      <!-- Title -->
      <h1 class="text-3xl font-bold text-[#bd9c30] mb-8">
        Your Cart
      </h1>

      <!-- EMPTY CART -->
      <div v-if="cart.length === 0" class="text-center py-20">
        <p class="text-gray-500 text-lg">Your cart is empty</p>

        <RouterLink
          to="/"
          class="mt-6 inline-block bg-[#bd9c30] text-white px-6 py-2 rounded-full"
        >
          Start Shopping
        </RouterLink>
      </div>

      <!-- CART CONTENT -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- LEFT SIDE: ITEMS -->
        <div class="lg:col-span-2 space-y-6">

          <!-- SERVICES -->
          <div v-if="serviceItems.length">
            <h2 class="text-xl font-semibold mb-4">Services</h2>

            <div
              v-for="item in serviceItems"
              :key="item.id + item.type"
              class="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 class="font-semibold">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">Service</p>
              </div>

              <div class="flex items-center gap-4">

                <span class="font-semibold text-[#bd9c30]">
                  ${{ item.price }}
                </span>

                <button
                  @click="removeFromCart(item.id, item.type)"
                  class="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>

              </div>
            </div>
          </div>

          <!-- PRODUCTS -->
          <div v-if="productItems.length">
            <h2 class="text-xl font-semibold mb-4">Products</h2>

            <div
              v-for="item in productItems"
              :key="item.id + item.type"
              class="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              <div>
                <h3 class="font-semibold">{{ item.name }}</h3>

                <p class="text-sm text-gray-500">
                  Quantity: {{ item.quantity }}
                </p>
              </div>

              <div class="flex items-center gap-4">

                <span class="font-semibold text-[#bd9c30]">
                  ${{ item.price * item.quantity }}
                </span>

                <button
                  @click="removeFromCart(item.id, item.type)"
                  class="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>

              </div>

            </div>
          </div>

        </div>

        <!-- RIGHT SIDE: SUMMARY -->
        <div class="bg-white p-6 rounded-xl shadow h-fit">

          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

          <div class="space-y-3 text-sm">

            <div class="flex justify-between">
              <span>Services</span>
              <span>${serviceTotal}</span>
            </div>

            <div class="flex justify-between">
              <span>Products</span>
              <span>${productTotal}</span>
            </div>

            <hr />

            <div class="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span class="text-[#bd9c30]">${total}</span>
            </div>

          </div>

          <!-- PAYMENT OPTIONS -->
          <div class="mt-6 space-y-3">

            <p class="font-medium">Payment Method</p>

            <select
              v-model="paymentMethod"
              class="w-full border p-2 rounded-lg"
            >
              <option value="card">Card Payment</option>
              <option value="cash">Cash on Location</option>
              <option value="cod">Cash on Delivery</option>
            </select>

          </div>

          <!-- CHECKOUT -->
          <button
            @click="checkout"
            class="w-full mt-6 bg-[#bd9c30] text-white py-3 rounded-full hover:scale-105 transition"
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useCart } from "../composables/useCart"

const router = useRouter()

const {
  cart,
  removeFromCart,
  loadCart
} = useCart()

const paymentMethod = ref("card")

onMounted(() => {
  loadCart()
})

/* SPLIT ITEMS */
const serviceItems = computed(() =>
  (cart.value || []).filter(i => i.type === "service")
)

const productItems = computed(() =>
  (cart.value || []).filter(i => i.type === "product")
)

/* TOTALS */
const serviceTotal = computed(() =>
  serviceItems.value.reduce((sum, i) => sum + i.price, 0)
)

const productTotal = computed(() =>
  productItems.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
)

const total = computed(() =>
  serviceTotal.value + productTotal.value
)

/* CHECKOUT LOGIC */
const checkout = () => {

  if (cart.value.length === 0) return

  // Save checkout info (temporary system)
  localStorage.setItem("gg-payment", JSON.stringify({
    method: paymentMethod.value,
    total: total.value
  }))

  // IF SERVICES EXIST → go to booking
  if (serviceItems.value.length > 0) {
    router.push("/booking")
    return
  }

  // IF ONLY PRODUCTS → order confirmed
  alert("Order confirmed successfully 🎉")
  router.push("/")
}
</script>