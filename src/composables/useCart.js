import { ref, computed, watch } from "vue"

const cart = ref([])

//
// =======================
// LOAD CART ON START
// =======================
const loadCart = () => {
  const saved = localStorage.getItem("gg-cart")
  cart.value = saved ? JSON.parse(saved) : []
}

//
// =======================
// AUTO SAVE
// =======================
watch(
  cart,
  () => {
    localStorage.setItem("gg-cart", JSON.stringify(cart.value))
  },
  { deep: true }
)

//
// =======================
// NORMALIZE ITEM
// =======================
const normalizeItem = (item) => ({
  id: item.id,
  name: item.name,
  price: Number(item.price) || 0,
  type: item.type || "service",
  quantity: item.type === "product"
    ? item.quantity || 1
    : 1
})

//
// =======================
// ADD TO CART
// =======================
const addToCart = (item) => {
  const newItem = normalizeItem(item)

  const existing = cart.value.find(
    i =>
      i.id === newItem.id &&
      i.type === newItem.type
  )

  // Products increase quantity
  if (existing && newItem.type === "product") {
    existing.quantity++
    return
  }

  // Services can only be added once
  if (existing && newItem.type === "service") {
    return
  }

  cart.value.push(newItem)
}

//
// =======================
// INCREASE PRODUCT QTY
// =======================
const increaseQuantity = (id) => {
  const item = cart.value.find(
    i =>
      i.id === id &&
      i.type === "product"
  )

  if (item) {
    item.quantity++
  }
}

//
// =======================
// DECREASE PRODUCT QTY
// =======================
const decreaseQuantity = (id) => {
  const item = cart.value.find(
    i =>
      i.id === id &&
      i.type === "product"
  )

  if (!item) return

  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(id, "product")
  }
}

//
// =======================
// REMOVE ITEM
// =======================
const removeFromCart = (id, type) => {
  cart.value = cart.value.filter(
    item =>
      !(
        item.id === id &&
        item.type === type
      )
  )
}

//
// =======================
// CLEAR CART
// =======================
const clearCart = () => {
  cart.value = []
}

//
// =======================
// TOTAL PRICE
// =======================
const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
})

//
// =======================
// SERVICES
// =======================
const serviceItems = computed(() =>
  cart.value.filter(
    item => item.type === "service"
  )
)

//
// =======================
// PRODUCTS
// =======================
const productItems = computed(() =>
  cart.value.filter(
    item => item.type === "product"
  )
)

//
// =======================
// HAS SERVICES
// =======================
const hasServices = computed(() =>
  serviceItems.value.length > 0
)

//
// =======================
// HAS PRODUCTS
// =======================
const hasProducts = computed(() =>
  productItems.value.length > 0
)

//
// =======================
// ITEM COUNT
// =======================
const itemCount = computed(() =>
  cart.value.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
)

//
// =======================
// INIT
// =======================
loadCart()

//
// =======================
// EXPORT
// =======================
export function useCart() {
  return {
    cart,

    addToCart,
    removeFromCart,
    clearCart,

    increaseQuantity,
    decreaseQuantity,

    totalPrice,
    itemCount,

    serviceItems,
    productItems,

    hasServices,
    hasProducts,

    loadCart
  }
}