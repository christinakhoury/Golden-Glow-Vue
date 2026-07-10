import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { getAuthToken } from '../services/login.js'

const STORE_ID = '17781c3f-b746-4897-be7d-15d1ff48589e'

export const useWishlistStore = defineStore('wishlist', () => {
  // State
  const items = ref([])
  const currentUserEmail = ref(null)
  const loading = ref(false)

  // Getters
  const itemCount = computed(() => items.value.length)

  /* ======================
  AUTH HEADERS
  ====================== */
  // Same pattern as useCart.js: osimart's WWW-Authenticate header specifies
  // JWT_AUTH_HEADER_PREFIX, meaning it expects "Authorization: JWT <token>".
  const getAuthHeaders = () => {
    const token = getAuthToken()
    console.log('[WISHLIST AUTH] token present:', !!token)
    return token ? { Authorization: `JWT ${token}` } : {}
  }

  const isAuthenticated = () => !!getAuthToken()

  // Load wishlist from localStorage (guest / not-logged-in fallback)
  function loadWishlist() {
    const savedWishlist = localStorage.getItem('golden_wishlist')
    items.value = savedWishlist ? JSON.parse(savedWishlist) : []
    console.log('[WISHLIST LOAD] loaded from localStorage:', items.value)
  }

  // Save wishlist to localStorage
  function saveWishlist() {
    localStorage.setItem('golden_wishlist', JSON.stringify(items.value))
    console.log('[WISHLIST SAVE] saved to localStorage:', items.value)
  }

  // Normalize a raw osimart wishlist item into the shape this store/UI uses.
  // Mirrors the cart response shape (an object keyed by variant id), since
  // that's the pattern osimart used for /store/apis/cart/view/.
  function normalize(item) {
    const variantId = item.variantId || item.product_variant_id || item.id
    if (!variantId) {
      console.warn('[WISHLIST NORMALIZE] skipped item, no identity found:', item)
      return null
    }

    let rawImage = item.image || item.product?.image || ''
    if (rawImage && rawImage.startsWith('static/')) {
      rawImage = `https://api.osimart.com/${rawImage}`
    }

    return {
      id: item.product_id || item.product?.id || variantId,
      productId: item.product_id || item.product?.id || variantId,
      variantId,
      variantName: item.variantName || item.variant_name || null,
      type: item.type || 'product',
      name: item.name || 'Unknown Item',
      price: Number(item.price ?? 0),
      image: rawImage,
      category: item.category,
      badge: item.badge
    }
  }

  /* ======================
  FETCH REMOTE WISHLIST
  ====================== */
  // Confirmed route: GET https://api.osimart.com/store/apis/wishlist/
  async function fetchWishlist() {
    console.log('[WISHLIST FETCH] called. isAuthenticated:', isAuthenticated())

    if (!isAuthenticated()) {
      loadWishlist()
      return
    }

    loading.value = true
    try {
      const url = `https://api.osimart.com/store/apis/wishlist/?store=${STORE_ID}`
      console.log('[WISHLIST FETCH] GET', url)

      const res = await axios.get(url, {
        headers: getAuthHeaders(),
        withCredentials: true
      })
      console.log('[WISHLIST FETCH] raw response:', res.data)

      // Mirror cart's response handling: could come back as
      // { wishlist: { id: {...}, id2: {...} } } or as a plain array.
      const raw = Array.isArray(res.data?.wishlist)
        ? res.data.wishlist
        : Object.values(res.data?.wishlist || res.data || {})

      items.value = raw.map(normalize).filter(Boolean)
      console.log('[WISHLIST FETCH] normalized items:', items.value)
    } catch (e) {
      console.error('[WISHLIST FETCH] ERROR', e.response?.status, e.response?.data || e.message)
      // Fall back to local data rather than leaving the UI blank on error
      loadWishlist()
    } finally {
      loading.value = false
    }
  }

  /* ======================
  SYNC (ADD / REMOVE)
  ====================== */
  async function syncItem(variantId, action) {
    if (!isAuthenticated()) return

    console.log('[WISHLIST SYNC] variantId:', variantId, 'action:', action)
    try {
      const url = `https://api.osimart.com/store/apis/wishlist/?store=${STORE_ID}`
      const payload = { item_id: variantId, action }
      console.log('[WISHLIST SYNC] POST', url, payload)

      const res = await axios.post(url, payload, {
        headers: getAuthHeaders(),
        withCredentials: true
      })
      console.log('[WISHLIST SYNC] success:', res.data)

      // Re-fetch to stay in sync with whatever osimart actually persisted
      await fetchWishlist()
    } catch (e) {
      console.error('[WISHLIST SYNC] ERROR', e.response?.status, e.response?.data || e.message)
    }
  }

  // Add item to wishlist
  async function addToWishlist(product) {
    const variantId = product.variantId || product.product_variant_id || product.id
    const variantName = product.variantName || product.variant_name || product.variant?.name || null

    const exists = items.value.some(
      item => item.id === product.id && (item.variantId || item.id) === variantId
    )
    if (!exists) {
      items.value.push({
        id: product.id,
        variantId,
        variantName,
        type: product.type || 'product',
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        badge: product.badge
      })
      saveWishlist()
      await syncItem(variantId, 'add')
      return true
    }
    return false
  }

  // Remove item from wishlist
  async function removeFromWishlist(productId) {
    const existing = items.value.find(item => item.id === productId)
    const variantId = existing?.variantId || productId
    items.value = items.value.filter(item => item.id !== productId)
    saveWishlist()
    await syncItem(variantId, 'remove')
  }

  // Check if item is in wishlist
  function isInWishlist(productId) {
    return items.value.some(item => item.id === productId)
  }

  // Toggle wishlist item
  async function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id)
      return false
    } else {
      await addToWishlist(product)
      return true
    }
  }

  // Clear wishlist
  async function clearWishlist() {
    const itemsToClear = [...items.value]
    items.value = []
    saveWishlist()

    for (const item of itemsToClear) {
      await syncItem(item.variantId, 'remove')
    }
  }

  /* ======================
  USER AUTH SYNC
  ====================== */
  // Call this right after login/signup-verify succeeds (same pattern as
  // cartStore.setUser). Pulls the customer's real wishlist from osimart.
  async function setUser(email) {
    console.log('[WISHLIST SET USER] email:', email)
    currentUserEmail.value = email
    if (email) {
      await fetchWishlist()
    } else {
      loadWishlist()
    }
  }

  // Initialize with local data; fetchWishlist()/setUser() will overwrite
  // this with the real server data once we know the user is authenticated.
  loadWishlist()

  return {
    items,
    itemCount,
    currentUserEmail,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    loadWishlist,
    saveWishlist,
    setUser,
    fetchWishlist
  }
})