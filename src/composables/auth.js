import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCart } from './useCart'
import {
  login as apiLogin,
  signup as apiSignup,
  verifyEmail as apiVerifyEmail,
  resendVerificationCode as apiResendVerificationCode,
  changePassword as apiChangePassword,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
  refreshAuthToken as apiRefreshAuthToken,
  saveAuthSession,
  getAuthToken,
  logout as apiLogout
} from '../services/login'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const showAuthModal = ref(false)
  const authMode = ref('login')
  const cartStore = useCart()

  const isLoggedIn = computed(() => isAuthenticated.value)
  const currentUser = computed(() => user.value)

  function hydrateUser(raw) {
    return {
      id: raw.id || raw.user_id,
      email: raw.email || '',
      first_name: raw.first_name || '',
      last_name: raw.last_name || '',
      mobile: raw.mobile || raw.phone || '',
      name: raw.name || `${raw.first_name || ''} ${raw.last_name || ''}`.trim()
    }
  }

  // NOTE: LoginView.vue currently calls login()/signup() from
  // services/login.js directly (it doesn't go through this store) since
  // signup requires an email-verification step in between that this store
  // doesn't orchestrate. These actions are kept here as thin wrappers in
  // case another entry point (e.g. a login modal elsewhere) wants to use
  // the store instead — they mirror the exact same service calls.

  async function loginAction(email, password) {
    try {
      const data = await apiLogin({ email, password })
      saveAuthSession(data, { email })

      const savedUser = JSON.parse(localStorage.getItem('gg-user') || '{}')
      user.value = hydrateUser({ ...savedUser, email: savedUser.email || email })

      isAuthenticated.value = true
      showAuthModal.value = false
      cartStore.setUser(user.value.email)
      return true
    } catch (error) {
      console.error('Login action failed:', error.message)
      throw error
    }
  }

  // Signup does NOT log the user in — osimart requires email verification
  // first. Returns the raw signup response; caller is responsible for
  // moving to a verification step and calling login() afterwards.
  async function signupAction(name, email, password, phone = '') {
    try {
      return await apiSignup({ name, email, password, phone })
    } catch (error) {
      console.error('Signup action failed:', error.message)
      throw error
    }
  }

  async function verifyEmailAction(email, code) {
    return apiVerifyEmail({ email, code })
  }

  async function resendVerificationCodeAction(email) {
    return apiResendVerificationCode({ email })
  }

  function logoutAction() {
    cartStore.clearUserCartDisplay()
    user.value = null
    isAuthenticated.value = false
    showAuthModal.value = false
    apiLogout()
  }

  function openAuthModal(mode = 'login') {
    authMode.value = mode
    showAuthModal.value = true
  }

  function closeAuthModal() {
    showAuthModal.value = false
  }

  function checkAuth() {
    const savedUserStr = localStorage.getItem('gg-user')
    const token = getAuthToken()

    if (savedUserStr && token) {
      user.value = hydrateUser(JSON.parse(savedUserStr))
      isAuthenticated.value = true
      cartStore.setUser(user.value.email)
    } else {
      user.value = null
      isAuthenticated.value = false
      cartStore.setUser(null)
    }
  }

  function updateLocalUserFields(updatedFields) {
    if (user.value) {
      user.value = { ...user.value, ...updatedFields }
    }
  }

  async function deleteAccount() {
    // NOTE: endpoint path/shape wasn't part of the osimart spec you shared —
    // this is carried over from the previous version as a placeholder.
    // Confirm the real path (likely also needs ?store=... like everything
    // else) before relying on it.
    const token = getAuthToken()
    const response = await fetch(`https://api.osimart.com/auth/delete-account/?store=17781c3f-b746-4897-be7d-15d1ff48589e`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Failed to delete account')
    logoutAction()
    return await response.json()
  }

  // Thin wrappers so components can call authStore.changePassword(...) etc.
  async function changePasswordAction(old_password, new_password) {
    return apiChangePassword({ old_password, new_password })
  }

  async function forgotPasswordAction(email) {
    return apiForgotPassword({ email })
  }

  async function resetPasswordAction(email, code, new_password) {
    return apiResetPassword({ email, code, new_password })
  }

  async function refreshTokenAction() {
    return apiRefreshAuthToken()
  }

  return {
    user,
    isAuthenticated,
    showAuthModal,
    authMode,
    isLoggedIn,
    currentUser,
    login: loginAction,
    signup: signupAction,
    verifyEmail: verifyEmailAction,
    resendVerificationCode: resendVerificationCodeAction,
    logout: logoutAction,
    openAuthModal,
    closeAuthModal,
    checkAuth,
    updateLocalUserFields,
    deleteAccount,
    changePassword: changePasswordAction,
    forgotPassword: forgotPasswordAction,
    resetPassword: resetPasswordAction,
    refreshToken: refreshTokenAction
  }
})