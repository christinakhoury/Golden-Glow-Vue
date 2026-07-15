<template>
  <div class="body-font bg-[#FAF7EF] flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 border border-gray-100">
      <h1 class="heading-font text-4xl font-bold text-center text-[#D4AF37] mb-2">Golden Glow</h1>
      
      <p class="text-center text-gray-500 mb-8">
        {{ 
          mode === "login" ? "Login to your beauty account" : 
          mode === "signup" ? "Create your beauty account" : 
          mode === "verify" ? "Verify your email address" :
          mode === "forgot" ? "Reset your password" :
          "Verify your email address" 
        }}
      </p>

      <!-- Success Notification Message -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl text-center">
        {{ successMessage }}
      </div>

      <!-- Login / Signup toggle -->
      <div v-if="mode === 'login' || mode === 'signup'" class="flex mb-6 bg-gray-50 rounded-xl p-1 border border-gray-100">
        <button
          type="button"
          class="flex-1 py-2 rounded-lg text-sm font-semibold transition"
          :class="mode === 'login' ? 'bg-[#D4AF37] text-white' : 'text-gray-500 hover:text-gray-800'"
          @click="switchMode('login')"
        >
          Login
        </button>
        <button
          type="button"
          class="flex-1 py-2 rounded-lg text-sm font-semibold transition"
          :class="mode === 'signup' ? 'bg-[#D4AF37] text-white' : 'text-gray-500 hover:text-gray-800'"
          @click="switchMode('signup')"
        >
          Sign Up
        </button>
      </div>

      <!-- 1. LOGIN & SIGNUP FORM -->
      <form v-if="mode === 'login' || mode === 'signup'" @submit.prevent="handleSubmit" class="space-y-5">
        <div v-if="mode === 'signup'">
          <label class="text-sm font-medium text-gray-500">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            autocomplete="name"
            class="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800 transition"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-500">Email</label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800 transition"
            placeholder="Enter your email"
          />
        </div>

        <div v-if="mode === 'signup'">
          <label class="text-sm font-medium text-gray-500">Mobile Number</label>
          <input
            v-model="phone"
            type="tel"
            autocomplete="tel"
            class="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800 transition"
            placeholder="e.g. +961 71 234 567"
          />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-500">Password</label>
            <button
              v-if="mode === 'login'"
              type="button"
              @click="switchMode('forgot')"
              class="text-xs text-[#D4AF37] hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <input
            v-model="password"
            type="password"
            required
            :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
            class="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800 transition"
            placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:bg-[#c39d28] transition disabled:opacity-60"
        >
          {{ loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up" }}
        </button>
      </form>

      <!-- 2. EMAIL VERIFICATION FORM (post-signup) -->
      <form v-else-if="mode === 'verify'" @submit.prevent="handleVerify" class="space-y-5">
        <p class="text-xs text-gray-500 text-center">
          We sent a 4-digit verification code to <br><strong class="text-gray-800">{{ email }}</strong>
        </p>
        
        <div>
          <label class="text-sm font-medium text-gray-500 block text-center">Verification Code</label>
          <input
            v-model="verificationCode"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="4"
            required
            placeholder="0000"
            class="w-full max-w-[160px] mx-auto block mt-2 px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl tracking-[0.5em] font-bold focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800"
          />
        </div>

        <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading || verificationCode.length !== 4"
          class="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:bg-[#c39d28] transition disabled:opacity-60"
        >
          {{ loading ? "Verifying..." : "Verify & Log In" }}
        </button>

        <button 
          type="button" 
          @click="handleResendCode"
          :disabled="resending"
          class="w-full text-xs text-center text-[#D4AF37] hover:underline block pt-2 disabled:opacity-60"
        >
          {{ resending ? "Sending..." : "Resend Code" }}
        </button>

        <button 
          type="button" 
          @click="switchMode('login')" 
          class="w-full text-xs text-center text-gray-500 hover:underline block pt-2"
        >
          Back to Login
        </button>
      </form>

      <!-- 3. FORGOT PASSWORD FORM -->
      <form v-else-if="mode === 'forgot'" @submit.prevent="forgotStep === 'request' ? handleForgotRequest() : handleForgotReset()" class="space-y-5">

        <!-- Step A: Email request -->
        <template v-if="forgotStep === 'request'">
          <div>
            <label class="text-sm font-medium text-gray-500">Email</label>
            <input
              v-model="email"
              type="email"
              required
              autocomplete="email"
              class="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800 transition"
              placeholder="Enter your account email"
            />
          </div>

          <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:bg-[#c39d28] transition disabled:opacity-60"
          >
            {{ loading ? "Sending code..." : "Send Reset Code" }}
          </button>
        </template>

        <!-- Step B: Code input + reset fields -->
        <template v-else>
          <p class="text-xs text-gray-500 text-center">
            We sent a reset code to <br><strong class="text-gray-800">{{ email }}</strong>
          </p>

          <div>
            <label class="text-sm font-medium text-gray-500 block text-center">Reset Code</label>
            <input
              v-model="resetCode"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="4"
              required
              placeholder="0000"
              class="w-full max-w-[160px] mx-auto block mt-2 px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl tracking-[0.5em] font-bold focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">New Password</label>
            <input
              v-model="newPassword"
              type="password"
              required
              autocomplete="new-password"
              class="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800 transition"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-500">Confirm New Password</label>
            <input
              v-model="confirmNewPassword"
              type="password"
              required
              autocomplete="new-password"
              class="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none bg-gray-50 text-gray-800 transition"
              placeholder="••••••••"
            />
          </div>

          <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading || resetCode.length !== 4"
            class="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:bg-[#c39d28] transition disabled:opacity-60"
          >
            {{ loading ? "Resetting..." : "Reset Password" }}
          </button>

          <button
            type="button"
            @click="handleForgotRequest"
            :disabled="resending"
            class="w-full text-xs text-center text-[#D4AF37] hover:underline block pt-2 disabled:opacity-60"
          >
            {{ resending ? "Sending..." : "Resend Code" }}
          </button>
        </template>

        <button 
          type="button" 
          @click="switchMode('login')" 
          class="w-full text-xs text-center text-gray-500 hover:underline block pt-2"
        >
          Back to Login
        </button>
      </form>

      <p class="text-xs text-center text-gray-400 mt-6">By continuing, you join Glow Rewards ✨</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import {
  login,
  signup,
  saveAuthSession,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword
} from "../services/login.js"
import { useCart } from "../composables/useCart"
import { useWishlistStore } from "../composables/wishlist"

const router = useRouter()
const cartStore = useCart()
const wishlistStore = useWishlistStore()

const mode = ref("login") // "login" | "signup" | "verify" | "forgot"
const forgotStep = ref("request") // "request" | "reset"

const name = ref("")
const email = ref("")
const phone = ref("")
const password = ref("")
const verificationCode = ref("")

// Forgot-password fields
const resetCode = ref("")
const newPassword = ref("")
const confirmNewPassword = ref("")

const error = ref("")
const successMessage = ref("")
const loading = ref(false)
const resending = ref(false)

function switchMode(next) {
  mode.value = next
  forgotStep.value = "request"
  error.value = ""
  successMessage.value = ""
  verificationCode.value = ""
  resetCode.value = ""
  newPassword.value = ""
  confirmNewPassword.value = ""
}

async function handleSubmit() {
  error.value = ""
  successMessage.value = ""
  loading.value = true

  const cleanEmail = email.value.trim()
  const cleanPassword = password.value
  const cleanName = name.value.trim()

  try {
    if (mode.value === "login") {
      const data = await login({ email: cleanEmail, password: cleanPassword })
      saveAuthSession(data, { email: cleanEmail })
      await cartStore.setUser(cleanEmail)
      await wishlistStore.setUser(cleanEmail)
      window.dispatchEvent(new Event("storage"))
      router.push("/")
    } else {
      const signupData = await signup({ name: cleanName, email: cleanEmail, password: cleanPassword, phone: phone.value.trim() })

      const trimmedPhone = phone.value.trim()
      const nameParts = cleanName.split(/\s+/).filter(Boolean)
      try {
        const existingUser = JSON.parse(localStorage.getItem('gg-user')) || {}
        localStorage.setItem('gg-user', JSON.stringify({
          ...existingUser,
          first_name: signupData?.first_name || nameParts[0] || '',
          last_name: signupData?.last_name || nameParts.slice(1).join(' ') || '',
          email: signupData?.email || cleanEmail,
          mobile: signupData?.mobile || trimmedPhone
        }))
      } catch {
        localStorage.setItem('gg-user', JSON.stringify({
          first_name: signupData?.first_name || nameParts[0] || '',
          last_name: signupData?.last_name || nameParts.slice(1).join(' ') || '',
          email: signupData?.email || cleanEmail,
          mobile: signupData?.mobile || trimmedPhone
        }))
      }

      successMessage.value = "Account created! Please check your email for a verification code."
      mode.value = "verify"
    }
  } catch (err) {
    console.error(`[Login.vue] ${mode.value} failed:`, err)
    error.value = err.message || "An error occurred. Please try again."
  } finally {
    loading.value = false
  }
}

async function handleResendCode() {
  error.value = ""
  successMessage.value = ""
  resending.value = true

  try {
    await resendVerificationCode({ email: email.value.trim() })
    successMessage.value = "A new code has been sent to your email."
  } catch (err) {
    console.error("[Login.vue] resend code failed:", err)
    error.value = err.message || "Could not resend the code. Please try again."
  } finally {
    resending.value = false
  }
}

async function handleVerify() {
  error.value = ""
  successMessage.value = ""
  loading.value = true

  const cleanEmail = email.value.trim()
  const nameParts = name.value.trim().split(/\s+/).filter(Boolean)

  try {
    await verifyEmail({ email: cleanEmail, code: verificationCode.value.trim() })
    const data = await login({ email: cleanEmail, password: password.value })

    saveAuthSession(data, {
      email: cleanEmail,
      first_name: nameParts[0] || '',
      last_name: nameParts.slice(1).join(' ') || '',
      mobile: phone.value.trim()
    })
    await cartStore.setUser(cleanEmail)
    await wishlistStore.setUser(cleanEmail)
    window.dispatchEvent(new Event("storage"))
    router.push("/")
  } catch (err) {
    console.error("[Login.vue] verification workflow failed:", err)
    error.value = err.message || "Verification code is incorrect or expired."
  } finally {
    loading.value = false
  }
}

async function handleForgotRequest() {
  error.value = ""
  successMessage.value = ""

  const cleanEmail = email.value.trim()
  if (!cleanEmail) {
    error.value = "Please enter your email."
    return
  }

  const isResend = forgotStep.value === "reset"
  if (isResend) {
    resending.value = true
  } else {
    loading.value = true
  }

  try {
    await forgotPassword({ email: cleanEmail })
    successMessage.value = isResend
      ? "A new code has been sent to your email."
      : "A reset code has been sent to your email."
    forgotStep.value = "reset"
  } catch (err) {
    console.error("[Login.vue] forgot-password request failed:", err)
    error.value = err.message || "Could not send a reset code. Please try again."
  } finally {
    loading.value = false
    resending.value = false
  }
}

async function handleForgotReset() {
  error.value = ""
  successMessage.value = ""

  if (newPassword.value !== confirmNewPassword.value) {
    error.value = "New password entries do not match."
    return
  }

  loading.value = true
  try {
    await resetPassword({
      email: email.value.trim(),
      code: resetCode.value.trim(),
      new_password: newPassword.value
    })

    switchMode('login')
    successMessage.value = "Password reset! Please log in with your new password."
  } catch (err) {
    console.error("[Login.vue] reset-password failed:", err)
    error.value = err.message || "Reset code is incorrect or expired."
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.heading-font {
  font-family: "Playfair Display", serif;
}
.body-font {
  font-family: "Poppins", sans-serif;
}
</style>