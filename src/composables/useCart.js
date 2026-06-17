import { ref, computed } from "vue"

const cart = ref([])

const loadCart = () => {
  const saved = localStorage.getItem("gg-cart")
  cart.value = saved ? JSON.parse(saved) : []
}

const saveCart = () => {
  localStorage.setItem("gg-cart", JSON.stringify(cart.value))
}

const addToCart = (item) => {
  const existing = cart.value.find(
    i => i.id === item.id && i.type === item.type
  )

  if (existing && item.type === "product") {
    existing.quantity += 1
  } else {
    cart.value.push({
      ...item,
      quantity: item.type === "product" ? 1 : 1
    })
  }

  saveCart()
}

const removeFromCart = (id, type) => {
  cart.value = cart.value.filter(i => !(i.id === id && i.type === type))
  saveCart()
}

const clearCart = () => {
  cart.value = []
  saveCart()
}

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

export function useCart() {
  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
    loadCart
  }
}