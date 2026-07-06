import { ref, computed, watch } from "vue"
import axios from "axios"

const STORE_ID = '17781c3f-b746-4897-be7d-15d1ff48589e'

const cart = ref([])
const loading = ref(false)
const currentUserEmail = ref(null)


const CATALOG_TYPE_MAP = {
  // Services
  "acne treatment": "service",
  "photoshoot makeup": "service",
  "bridal makeup": "service",
  "event makeup": "service",
  "natural makeup": "service",
  "pigmentation removal": "service",
  "aromatherapy": "service",
  "skin rejuvenation": "service",
  "deep tissue": "service",
  "hair removal": "service",
  "hot stone": "service",
  "swedish massage": "service",
  "nail art": "service",
  "manicure": "service",
  "gel & acrylic": "service",
  "pedicure": "service",
  "event styling": "service",
  "hair treatments": "service",
  "hair coloring": "service",
  "haircut": "service",

  // Products
  "bubbly pop": "product",
  "sienna dilena": "product",
  "lilo eyeshadow": "product",
  "eyes coco maskara": "product",
  "one of a kind": "product",
  "girlie pop set": "product",
  "cherry on top": "product",
  "lollipop gloss": "product",
  "setting powder": "product",
  "lara's touch": "product",
  "concealer": "product",
  "dalana brushes (set)": "product",
  "dinia set": "product",
  "aurora bath salts": "product",
  "laluna": "product",
  "relaxia face roller": "product",
  "sculpting nephrite jade gua sha": "product",
  "iona massage oil": "product",
  "leona massage oil": "product",
  "miisica massage oil": "product",
  "sculpa bath salts": "product",
  "vanilla bath salts": "product",
  "ilalai": "product",
  "anamolie": "product",
  "enchante candle": "product",
  "machinia": "product",
  "post-laser gel": "product",
  "relaxing massage oil": "product",
  "post-laser hyper-calming complex": "product",
  "la machina": "product",
  "luxury machine": "product",
  "coco cream": "product",
  "laravene cream": "product",
  "biri cream": "product",
  "mooz ditsie": "product",
  "vroom vroom": "product",
  "luxy scissors (pack of 2)": "product",
  "ceel set": "product",
  "honori oil": "product",
  "aulanail oil": "product",
  "cuticle oil": "product",
  "maeomo oil": "product",
  "dreamy oil": "product",
  "oriko oil": "product",
  "uneedmee": "product",
  "power buf set": "product",
  "jupiter shampoo": "product",
  "eleganta mist": "product",
  "dreamy mist": "product",
  "coco mist": "product",
  "minimalist": "product",
  "nivi homa": "product",
  "touche deluxe press-on extensions": "product",
  "lelegance press-on nails": "product",
  "lala press-on extensions": "product",
  "synddney press-on extensions": "product",
  "georgette press-on extensions": "product",
  "ola set": "product"
}

function resolveType(nameForLookup, apiType) {
  const key = (nameForLookup || "").toLowerCase().trim()
  const catalogType = CATALOG_TYPE_MAP[key]

  if (catalogType && apiType && catalogType !== apiType) {
    console.warn(
      `[TYPE MISMATCH] "${nameForLookup}" — API said type="${apiType}", catalog says "${catalogType}". Using catalog value.`
    )
    return catalogType
  }

  if (catalogType) {
    console.log(`[TYPE RESOLVED] "${nameForLookup}" -> "${catalogType}" (from catalog)`)
    return catalogType
  }

  if (apiType) {
    console.log(`[TYPE RESOLVED] "${nameForLookup}" -> "${apiType}" (from API, not in catalog)`)
    return apiType
  }

  console.warn(`[TYPE UNKNOWN] "${nameForLookup}" not found in catalog and API sent no type — defaulting to "product". Add this item to CATALOG_TYPE_MAP if that's wrong.`)
  return "product"
}

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
NORMALIZE (VARIANT-AWARE + CATALOG TYPE OVERRIDE)
====================== */
const normalize = (item) => {
  const variantId = item.variantId ||
                    item.product_variant_id ||
                    item.product_variant?.id ||
                    item.id;

  const productId = item.product_id ||
                    item.product?.id ||
                    (item.variantId ? item.id : item.id);

  if (!variantId) {
    console.warn("[NORMALIZE] skipped item, no variant identity found:", item)
    return null
  }

  let rawImage = item.image || item.product?.image || "";

  if (rawImage && rawImage.startsWith("static/")) {
    rawImage = `https://api.osimart.com/${rawImage}`;
  }

  const variantName =
    item.variantName ??
    item.variant_name ??
    item.variant_title ??
    item.variant?.name ??
    item.variant?.title ??
    item.product_variant?.name ??
    item.product_variant?.title ??
    item.product_variant_name ??
    item.product_variant_title ??
    (Array.isArray(item.values) ? item.values.join(" / ") : null) ??
    null

  let baseName = item.name || item.product?.name || "Unknown Item"

  // Remove anything inside parentheses
  baseName = baseName.replace(/\s*\([^)]*\)/g, "").trim()

  const displayName = variantName
    ? `${baseName} (${variantName})`
    : baseName

  const apiType = item.type || item.product?.type || null
  const resolvedType = resolveType(baseName, apiType)

  const result = {
    id: variantId,
    productId,
    variantId,
    variantName,
    baseName,
    name: displayName,
    price: Number(item.price ?? item.product?.price ?? item.product_variant?.price ?? 0),
    quantity: item.quantity || 1,
    type: resolvedType,
    image: rawImage
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
    console.log("[FETCH] product items:", cart.value.filter(i => i.type === "product"))
    console.log("[FETCH] service items:", cart.value.filter(i => i.type === "service"))
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

  const existing = cart.value.find(i => i.id === n.id)

  if (existing) {
    existing.quantity += n.quantity
    existing.price = n.price
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

const clearCart = async () => {
  console.log("[CLEAR] cart clearing initiated via item removal loop");

  const itemsToClear = [...cart.value];
  cart.value = [];

  for (const item of itemsToClear) {
    try {
      const url = `https://api.osimart.com/store/apis/cart/update-item/?store=${STORE_ID}`;
      const payload = {
        item_id: item.variantId,
        quantity: item.quantity,
        action: "remove"
      };

      console.log(`[CLEAR LOOP] Removing item ${item.variantId}`);
      await axios.post(url, payload, {
        headers: getAuthHeaders(),
        withCredentials: true
      });
    } catch (e) {
      console.error(`[CLEAR LOOP] Failed to remove item ${item.variantId}:`, e.message);
    }
  }

  await fetchRemoteCart();
};

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