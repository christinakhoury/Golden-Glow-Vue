import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  // State
  const items = ref([])
  const currentUserEmail = ref(null)
  
  // Getters
  const itemCount = computed(() => items.value.length)
  
  // Load wishlist from localStorage
  function loadWishlist() {
    const savedWishlist = localStorage.getItem('golden_wishlist')
    if (savedWishlist) {
      items.value = JSON.parse(savedWishlist)
    }
  }
  
  // Save wishlist to localStorage
  function saveWishlist() {
    localStorage.setItem('golden_wishlist', JSON.stringify(items.value))
  }
  
  // Add item to wishlist
  function addToWishlist(product) {
    // Identity must include the variant, otherwise two different variants
    // of the same product/service (different price, different options)
    // get treated as the same wishlist entry — and once moved into the
    // cart, the variant info is gone and the wrong price gets used.
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
      return true
    }
    return false
  }
  
  // Remove item from wishlist
  function removeFromWishlist(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveWishlist()
  }
  
  // Check if item is in wishlist
  function isInWishlist(productId) {
    return items.value.some(item => item.id === productId)
  }
  
  // Toggle wishlist item
  function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      return false
    } else {
      addToWishlist(product)
      return true
    }
  }
  
  // Clear wishlist
  function clearWishlist() {
    items.value = []
    saveWishlist()
  }

  // Set current user (called on login/logout).
  // NOTE: this is a stopgap — there's no remote wishlist endpoint wired up
  // yet, so this just reloads the same localStorage key. Wishlist is NOT
  // actually per-account yet; different users on the same browser will
  // currently see the same saved items.
  function setUser(email) {
    console.log("[WISHLIST SET USER] email:", email)
    currentUserEmail.value = email
    loadWishlist()
  }

  // Fetch wishlist from server. No remote endpoint exists yet, so this
  // just falls back to localStorage for now.
  async function fetchWishlist() {
    console.log("[WISHLIST FETCH] no remote wishlist endpoint wired up yet — reloading from localStorage")
    loadWishlist()
  }
  
  // Initialize
  loadWishlist()
  
  return {
    items,
    itemCount,
    currentUserEmail,
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