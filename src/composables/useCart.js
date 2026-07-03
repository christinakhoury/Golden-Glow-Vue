import { ref, computed, watch } from "vue"
import axios from "axios"

const STORE_ID = "17781c3f-b746-4897-be7d-15d1ff48589e"

const cart = ref([])
const loading = ref(false)
const currentUserEmail = ref(null)

/* ======================
AUTH HEADERS
====================== */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  console.log("[AUTH] token present:", !!token)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const isAuthenticated = () => !!localStorage.getItem("token")

/* ======================
LOCAL STORAGE
====================== */
const loadCart = () => {
  const saved = localStorage.getItem("gg-cart")
  cart.value = saved ? JSON.parse(saved) : []
  console.log("[CART LOAD] loaded from localStorage:", cart.value)
}

watch(cart, () => {
  localStorage.setItem("gg-cart", JSON.stringify(cart.value))
  console.log("[CART SAVE] saved to localStorage:", cart.value)
}, { deep: true })

/* ======================
NORMALIZE (NO VARIANTS)
====================== */
const normalize = (item) => {
  const unifiedId = item.id || item.product_id || item.product?.id
  const variantId = item.variantId || item.product_variant_id || unifiedId

  if (!unifiedId) {
    console.warn("[NORMALIZE] skipped item, no id found:", item)
    return null
  }

  // 1. Get the raw image path from the object
  let rawImage = item.image || item.product?.image || "";

  // 2. THE FIX: If it's a relative path starting with 'static/', 
  // attach the Osimart API domain to the front of it!
  if (rawImage && rawImage.startsWith("static/")) {
    rawImage = `https://api.osimart.com/${rawImage}`;
  }

  const result = {
    id: unifiedId,
    variantId,
    name: item.name || item.product?.name || "Unknown Item",
    price: Number(item.price || item.product?.price) || 0,
    quantity: item.quantity || 1,
    type: item.type || "product",
    image: rawImage // This will now be a complete, clickable URL path!
  }

  console.log("[NORMALIZE] in:", item, "-> out:", result)
  return result
}

/* ======================
FETCH REMOTE CART
====================== */
const fetchRemoteCart = async () => {
  console.log("[FETCH] called. isAuthenticated:", isAuthenticated())

  loading.value = true
  try {
    const url = `https://api.osimart.com/store/apis/cart/view/?store=${STORE_ID}`
    console.log("[FETCH] GET", url)

    const res = await axios.get(url, {
      headers: getAuthHeaders(),
      withCredentials: true
    })
    console.log("[FETCH] raw response:", res.data)

    const raw = Array.isArray(res.data?.cart)
      ? res.data.cart
      : Object.values(res.data?.cart || {})

    console.log("[FETCH] raw cart array before normalize:", raw)

    cart.value = raw.map(normalize).filter(Boolean)
    console.log("[FETCH] final normalized cart:", cart.value)
  } catch (e) {
    console.error("[FETCH] ERROR", e.response?.status, e.response?.data || e.message)
  } finally {
    loading.value = false
    console.log("[FETCH] done, loading =", loading.value)
  }
}

/* ======================
API UPDATE / SYNC
====================== */
const syncItem = async (variantId, deltaQuantity, action) => {
  console.log("[SYNC] called with variantId:", variantId, "delta:", deltaQuantity, "action:", action)

  try {
    const url = `https://api.osimart.com/store/apis/cart/update-item/?store=${STORE_ID}`
    const payload = {
      item_id: variantId,
      quantity: deltaQuantity,
      action: action
    }
    console.log("[SYNC] POST", url, "payload:", payload)

    const res = await axios.post(url, payload, {
      headers: getAuthHeaders(),
      withCredentials: true
    })
    console.log("[SYNC] success response:", res.data)

    await fetchRemoteCart()
  } catch (e) {
    console.error("[SYNC] ERROR", e.response?.status, e.response?.data || e.message)
  }
}

/* ======================
MUTATIONS
====================== */
const addToCart = async (item) => {
  console.log("[ADD] called with:", item)
  const n = normalize(item)
  if (!n) {
    console.warn("[ADD] aborted, normalize failed")
    return
  }

  const existing = cart.value.find(i => i.id === n.id && i.type === n.type)

  if (existing) {
    existing.quantity += n.quantity
    console.log("[ADD] existing item found, new quantity:", existing.quantity)
    await syncItem(existing.variantId, n.quantity, "add")
  } else {
    cart.value.push(n)
    console.log("[ADD] new item pushed:", n)
    await syncItem(n.variantId, n.quantity, "add")
  }
}

const increaseQuantity = async (id) => {
  console.log("[INCREASE] called for id:", id)
  const item = cart.value.find(i => i.id === id)
  if (!item) {
    console.warn("[INCREASE] item not found in cart")
    return
  }

  item.quantity++
  console.log("[INCREASE] new quantity:", item.quantity)
  await syncItem(item.variantId, 1, "add")
}

const decreaseQuantity = async (id) => {
  console.log("[DECREASE] called for id:", id)
  const item = cart.value.find(i => i.id === id)
  if (!item) {
    console.warn("[DECREASE] item not found in cart")
    return
  }

  item.quantity--
  console.log("[DECREASE] new quantity:", item.quantity)

  if (item.quantity <= 0) {
    console.log("[DECREASE] quantity hit 0, removing item")
    await removeFromCart(id)
  } else {
    await syncItem(item.variantId, 1, "remove")
  }
}

const removeFromCart = async (id) => {
  console.log("[REMOVE] called for id:", id)
  const existing = cart.value.find(i => i.id === id)
  const variantId = existing?.variantId || id
  const fullQuantity = existing?.quantity || 1
  cart.value = cart.value.filter(i => i.id !== id)
  console.log("[REMOVE] cart after removal:", cart.value)
  await syncItem(variantId, fullQuantity, "remove")
}

const clearCart = () => {
  console.log("[CLEAR] cart cleared")
  cart.value = []
}

/* ======================
COMPUTED READS
====================== */
const productItems = computed(() => cart.value.filter(i => i.type === "product"))
const serviceItems = computed(() => cart.value.filter(i => i.type === "service"))
const totalPrice = computed(() => cart.value.reduce((s, i) => s + i.price * i.quantity, 0))
const itemCount = computed(() => cart.value.reduce((s, i) => s + i.quantity, 0))

/* ======================
USER AUTH SYNC
====================== */
const setUser = (email) => {
  console.log("[SET USER] email:", email)
  currentUserEmail.value = email
  if (email) fetchRemoteCart()
  else loadCart()
}

const getUserEmail = () => {
  console.log("[GET USER EMAIL]", currentUserEmail.value)
  return currentUserEmail.value
}

const clearUserCartDisplay = () => {
  console.log("[CLEAR CART DISPLAY] clearing in-memory cart (localStorage untouched)")
  currentUserEmail.value = null
  loadCart()
}

// Initialization bootstrap
console.log("[INIT] useCart.js loaded, bootstrapping local cart")
loadCart()

export function useCart() {
  return {
    cart,
    loading,
    currentUserEmail,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    productItems,
    serviceItems,
    totalPrice,
    itemCount,
    setUser,
    getUserEmail,
    clearUserCartDisplay,
    fetchRemoteCart,
    loadCart
  }
}