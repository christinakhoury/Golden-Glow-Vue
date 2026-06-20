import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCartStore } from './cart'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const showAuthModal = ref(false)
  const authMode = ref('login')
  
  // Getters
  const isLoggedIn = computed(() => isAuthenticated.value)
  const currentUser = computed(() => user.value)
  
  // Actions
  async function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && email.includes('@')) {
          user.value = { email, name: email.split('@')[0] }
          isAuthenticated.value = true
          showAuthModal.value = false
          
          console.log(`🔐 LOGIN SUCCESS: ${email}`)
          
          // Load user's cart (will restore from localStorage)
          const cartStore = useCartStore()
          cartStore.setUser(email)
          
          resolve(true)
        } else {
          reject('Invalid email or password')
        }
      }, 500)
    })
  }
  
  async function signup(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password && email.includes('@')) {
          user.value = { name, email }
          isAuthenticated.value = true
          showAuthModal.value = false
          
          console.log(`🔐 SIGNUP SUCCESS: ${email}`)
          
          // Set user for cart (will create new empty cart if doesn't exist)
          const cartStore = useCartStore()
          cartStore.setUser(email)
          
          resolve(true)
        } else {
          reject('Please fill all fields with valid information')
        }
      }, 500)
    })
  }
  
  function logout() {
    const cartStore = useCartStore()
    const userEmail = cartStore.getUserEmail()
    
    console.log(`🚪 LOGOUT: ${userEmail}, preserving cart in localStorage`)
    
    // Just clear the display, keep the cart saved in localStorage
    cartStore.clearUserCartDisplay()
    
    user.value = null
    isAuthenticated.value = false
    showAuthModal.value = false
    localStorage.removeItem('auth_user')
  }
  
  function openAuthModal(mode = 'login') {
    authMode.value = mode
    showAuthModal.value = true
  }
  
  function closeAuthModal() {
    showAuthModal.value = false
  }
  
  function checkAuth() {
    const savedUser = localStorage.getItem('auth_user')
    console.log(`🔍 CHECK AUTH: savedUser = ${savedUser}`)
    if (savedUser) {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
      
      console.log(`✅ AUTH RESTORED: ${user.value.email}`)
      
      // Load user's cart
      const cartStore = useCartStore()
      cartStore.setUser(user.value.email)
    } else {
      console.log(`👤 NO AUTH, guest mode`)
      // Guest cart
      const cartStore = useCartStore()
      cartStore.setUser(null)
    }
  }
  
  function saveToLocalStorage() {
    if (user.value) {
      localStorage.setItem('auth_user', JSON.stringify(user.value))
    }
  }
  
  return {
    user,
    isAuthenticated,
    showAuthModal,
    authMode,
    isLoggedIn,
    currentUser,
    login,
    signup,
    logout,
    openAuthModal,
    closeAuthModal,
    checkAuth,
    saveToLocalStorage
  }
})