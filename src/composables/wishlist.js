import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { getAuthToken } from '../services/login.js'
import { storeUrl } from '../services/osimartConfig.js'

const WISHLIST_API_URL = storeUrl('/store/apis/wishlist/')

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
  const getAuthHeaders = () => {
    const token = getAuthToken()
    console.log('[WISHLIST AUTH] token present:', !!token, '| token value (first 10 chars):', token ? token.slice(0, 10) + '...' : 'none')
    return token ? { Authorization: `JWT ${token}` } : {}
  }

  const isAuthenticated = () => !!getAuthToken()

  function loadWishlist() {
    const savedWishlist = localStorage.getItem('golden_wishlist')
    items.value = savedWishlist ? JSON.parse(savedWishlist) : []
    console.log('[WISHLIST LOAD] loaded from localStorage:', items.value)
  }

  function saveWishlist() {
    localStorage.setItem('golden_wishlist', JSON.stringify(items.value))
    console.log('[WISHLIST SAVE] saved to localStorage:', items.value)
  }

  function normalize(item) {
    console.log('[WISHLIST NORMALIZE] raw item in:', item)

    const variantId =
      item.variantId ||
      item.product_variant_id ||
      item.product_variant?.id ||
      item.variant?.id ||
      item.id
    if (!variantId) {
      console.warn('[WISHLIST NORMALIZE] skipped item, no identity found:', item)
      return null
    }

    let rawImage = item.image || item.product?.image || ''
    if (rawImage && rawImage.startsWith('static/')) {
      rawImage = `https://api.osimart.com/${rawImage}`
    }

    const normalized = {
      id: variantId,
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

    console.log('[WISHLIST NORMALIZE] normalized out:', normalized)
    return normalized
  }

  /* ======================
  FETCH REMOTE WISHLIST
  ====================== */
  async function fetchWishlist() {
    console.log('[WISHLIST FETCH] called. isAuthenticated:', isAuthenticated())

    if (!isAuthenticated()) {
      console.log('[WISHLIST FETCH] not authenticated, falling back to localStorage')
      loadWishlist()
      return
    }

    loading.value = true
    try {
      console.log('[WISHLIST FETCH] GET', WISHLIST_API_URL)
      console.log('[WISHLIST FETCH] headers:', getAuthHeaders())

      const res = await axios.get(WISHLIST_API_URL, {
        headers: getAuthHeaders(),
        withCredentials: true
      })

      console.log('[WISHLIST FETCH] status:', res.status)
      console.log('[WISHLIST FETCH] raw response:', res.data)

      const raw = Array.isArray(res.data?.wishlist)
        ? res.data.wishlist
        : Object.values(res.data?.wishlist || res.data || {})

      console.log('[WISHLIST FETCH] raw array before normalize:', raw)

      items.value = raw.map(normalize).filter(Boolean)
      console.log('[WISHLIST FETCH] final normalized items:', items.value)
    } catch (e) {
      console.error('[WISHLIST FETCH] ERROR status:', e.response?.status)
      console.error('[WISHLIST FETCH] ERROR data:', e.response?.data || e.message)
      loadWishlist()
    } finally {
      loading.value = false
      console.log('[WISHLIST FETCH] loading set to false')
    }
  }

  /* ======================
  SYNC (ADD / REMOVE)
  ====================== */
  async function syncItem(variantId, action) {
    if (!isAuthenticated()) {
      console.log('[WISHLIST SYNC] skipped, not authenticated')
      return
    }

    console.log('[WISHLIST SYNC] variantId:', variantId, 'action:', action)
    try {
      const payload = { item_id: variantId, action }
      console.log('[WISHLIST SYNC] POST', WISHLIST_API_URL, 'payload:', payload)

      const res = await axios.post(WISHLIST_API_URL, payload, {
        headers: getAuthHeaders(),
        withCredentials: true
      })

      console.log('[WISHLIST SYNC] status:', res.status)
      console.log('[WISHLIST SYNC] response data:', res.data)

      await fetchWishlist()
    } catch (e) {
      console.error('[WISHLIST SYNC] ERROR status:', e.response?.status)
      console.error('[WISHLIST SYNC] ERROR data:', e.response?.data || e.message)
    }
  }

  async function addToWishlist(product) {
    console.log('[WISHLIST ADD] product in:', product)

    const variantId =
      product.variantId ||
      product.product_variant_id ||
      product.product_variant?.id ||
      product.variant?.id ||
      product.id
    const variantName = product.variantName || product.variant_name || product.variant?.name || null

    const exists = items.value.some(
      item => item.id === variantId || item.variantId === variantId
    )
    console.log('[WISHLIST ADD] already exists?', exists)

    if (!exists) {
      items.value.push({
        id: variantId,
        productId: product.productId || product.product_id || product.id,
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

  async function removeFromWishlist(productId) {
    console.log('[WISHLIST REMOVE] productId in:', productId)

    const existing = items.value.find(item => item.id === productId)
    const variantId = existing?.variantId || productId
    console.log('[WISHLIST REMOVE] resolved variantId:', variantId)

    items.value = items.value.filter(item => item.id !== productId)
    saveWishlist()
    await syncItem(variantId, 'remove')
  }

  function isInWishlist(productId) {
    return items.value.some(item => item.id === productId)
  }

  async function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id)
      return false
    } else {
      await addToWishlist(product)
      return true
    }
  }

  async function clearWishlist() {
    console.log('[WISHLIST CLEAR] clearing', items.value.length, 'items')
    const itemsToClear = [...items.value]
    items.value = []
    saveWishlist()

    for (const item of itemsToClear) {
      await syncItem(item.variantId, 'remove')
    }
  }

  async function setUser(email) {
    console.log('[WISHLIST SET USER] email:', email)
    currentUserEmail.value = email
    if (email) {
      await fetchWishlist()
    } else {
      loadWishlist()
    }
  }

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
