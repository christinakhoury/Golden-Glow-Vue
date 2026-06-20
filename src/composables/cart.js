import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  const lastAddedMessage = ref('')
  const pendingProduct = ref(null)
  const authRequiredMessage = ref('')
  const currentUserEmail = ref(null)
  
  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })
  
  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })
  
  const tax = computed(() => subtotal.value * 0.08)
  
  const total = computed(() => subtotal.value + tax.value)
  
  // Get storage key for current user
  const getStorageKey = () => {
    const userEmail = currentUserEmail.value
    if (userEmail) {
      return `soutouCart_${userEmail}`
    }
    return 'soutouCart_guest'
  }
  
  // Save cart to localStorage with user-specific key
  function saveToLocalStorage() {
    const key = getStorageKey()
    localStorage.setItem(key, JSON.stringify(items.value))
    console.log(`🟢 CART SAVED: ${key} with ${items.value.length} items`, items.value)
  }
  
  // Load cart from localStorage with user-specific key
  function loadFromLocalStorage() {
    const key = getStorageKey()
    const savedCart = localStorage.getItem(key)
    console.log(`🔵 CART LOAD ATTEMPT: ${key}`, savedCart ? 'found' : 'not found')
    if (savedCart) {
      items.value = JSON.parse(savedCart)
      console.log(`✅ CART LOADED: ${key} with ${items.value.length} items`, items.value)
    } else {
      items.value = []
      console.log(`❌ No cart found for ${key}, starting empty`)
    }
  }
  
  // Set current user and load their cart
  function setUser(email) {
    console.log(`👤 SET USER: ${email || 'guest'}`)
    currentUserEmail.value = email
    loadFromLocalStorage()
  }
  
  // Clear current user's cart from display (but keep in localStorage)
  function clearUserCartDisplay() {
    console.log(`🗑️ CLEAR CART DISPLAY for user: ${currentUserEmail.value}`)
    items.value = []
    // DON'T remove from localStorage - keep it for next login
  }
  
  // Get current user's email
  function getUserEmail() {
    return currentUserEmail.value
  }
  
  // Actions
  function addToCart(product, isAuthenticated, openAuthModal) {
    console.log(`🛒 ADD TO CART: ${product.name}, authenticated: ${isAuthenticated}`)
    
    // Check if user is logged in
    if (!isAuthenticated) {
      // Store the product to add after login
      pendingProduct.value = product
      // Set message for toast notification
      authRequiredMessage.value = 'Please login or signup to add items to cart'
      setTimeout(() => {
        authRequiredMessage.value = ''
      }, 3000)
      console.log(`⚠️ Not authenticated, product saved for later:`, product.name)
      return { success: false, message: 'Please login to add items to cart' }
    }
    
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += product.quantity || 1
      console.log(`📦 Updated existing item: ${product.name}, new quantity: ${existingItem.quantity}`)
    } else {
      items.value.push({
        ...product,
        quantity: product.quantity || 1
      })
      console.log(`✨ Added new item: ${product.name}, quantity: ${product.quantity || 1}`)
    }
    
    lastAddedMessage.value = `${product.name} added to cart!`
    saveToLocalStorage()
    
    setTimeout(() => {
      lastAddedMessage.value = ''
    }, 2000)
    
    return { success: true, message: `${product.name} added to cart!` }
  }
  
  function addPendingAfterLogin() {
    if (pendingProduct.value) {
      console.log(`🔄 Adding pending product after login: ${pendingProduct.value.name}`)
      const existingItem = items.value.find(item => item.id === pendingProduct.value.id)
      if (existingItem) {
        existingItem.quantity += pendingProduct.value.quantity || 1
      } else {
        items.value.push({
          ...pendingProduct.value,
          quantity: pendingProduct.value.quantity || 1
        })
      }
      saveToLocalStorage()
      lastAddedMessage.value = `${pendingProduct.value.name} added to cart!`
      setTimeout(() => {
        lastAddedMessage.value = ''
      }, 2000)
      pendingProduct.value = null
      return true
    }
    return false
  }
  
  function updateQuantity(productId, delta) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) {
        removeItem(productId)
      }
    }
    saveToLocalStorage()
  }
  
  function removeItem(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }
  
  function clearCart() {
    items.value = []
    saveToLocalStorage()
  }
  
  // Initialize with guest cart
  function init() {
    loadFromLocalStorage()
  }
  
  // Watch for items changes to auto-save
  watch(items, () => {
    if (currentUserEmail.value !== null) {
      saveToLocalStorage()
    }
  }, { deep: true })
  
  // Initialize
  init()
  
  return {
    items,
    itemCount,
    subtotal,
    tax,
    total,
    lastAddedMessage,
    authRequiredMessage,
    pendingProduct,
    currentUserEmail,
    addToCart,
    addPendingAfterLogin,
    updateQuantity,
    removeItem,
    clearCart,
    setUser,
    clearUserCartDisplay,
    getUserEmail,
    loadFromLocalStorage,
    saveToLocalStorage
  }
})