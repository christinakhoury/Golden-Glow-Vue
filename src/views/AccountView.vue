<template>
  <div class="min-h-screen bg-gray-50/50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">

      <div class="mb-10 text-center md:text-left">
        <h1 class="text-2xl md:text-3xl font-light tracking-wide text-gray-800">
          Welcome back, <span class="font-normal text-[#bd9c30]">{{ authStore.user?.first_name || authStore.user?.name || 'Glow Client' }}</span>
        </h1>
        <p class="text-xs text-gray-400 mt-1 tracking-wider uppercase">
          Manage your personal information, security preferences, and status alerts
        </p>
      </div>

      <div v-if="loadingSession" class="text-center text-xs text-gray-400 py-20">
        Loading your account...
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div class="space-y-6">
          <div class="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm text-center">
            <div class="w-16 h-16 bg-[#bd9c30] text-white rounded-full mx-auto flex items-center justify-center text-2xl font-light uppercase shadow-md mb-3">
              {{ (authStore.user?.first_name || authStore.user?.name || 'U').charAt(0) }}
            </div>
            <h3 class="text-sm font-semibold text-gray-800 truncate">
              {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}
            </h3>
            <p class="text-xs text-gray-400 truncate mt-0.5">{{ authStore.user?.email }}</p>
          </div>

          <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden p-2 flex flex-col gap-1">
            <button @click="scrollToSection('profile')" class="text-left w-full px-4 py-2.5 rounded-xl text-xs font-medium text-gray-700 hover:bg-[#faf7ef] hover:text-[#bd9c30] transition duration-150">
              Personal Details
            </button>
            <button @click="scrollToSection('notifications')" class="text-left w-full px-4 py-2.5 rounded-xl text-xs font-medium text-gray-700 hover:bg-[#faf7ef] hover:text-[#bd9c30] transition duration-150">
              Notification Rules
            </button>
            <button @click="scrollToSection('security')" class="text-left w-full px-4 py-2.5 rounded-xl text-xs font-medium text-gray-700 hover:bg-[#faf7ef] hover:text-[#bd9c30] transition duration-150">
              Security & Credentials
            </button>
            <hr class="border-gray-50 my-1 mx-3" />
            <button @click="handleLogout" class="text-left w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-50 transition duration-150">
              Sign Out
            </button>
            <button @click="promptDeleteConfirm = true" class="text-left w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50/60 transition duration-150">
              Delete Profile Account
            </button>
          </div>
        </div>

        <div class="md:col-span-2 space-y-8">

          <!-- ============ PERSONAL INFORMATION (READ-ONLY) ============ -->
          <section id="profile" class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-6 border-b border-gray-50 pb-3">
              Personal Information
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">First Name</label>
                <p class="w-full text-xs px-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50 text-gray-600">
                  {{ authStore.user?.first_name || '—' }}
                </p>
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Last Name</label>
                <p class="w-full text-xs px-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50 text-gray-600">
                  {{ authStore.user?.last_name || '—' }}
                </p>
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <p class="w-full text-xs px-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50 text-gray-600">
                  {{ authStore.user?.email || '—' }}
                </p>
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Mobile Number</label>
                <p class="w-full text-xs px-4 py-2.5 border border-gray-100 rounded-xl bg-gray-50 text-gray-600">
                  {{ authStore.user?.mobile || '—' }}
                </p>
              </div>
            </div>
            <p class="text-[11px] text-gray-400 mt-4">
              These details were provided when you signed up. To change them, please contact support.
            </p>
          </section>

          <!-- ============ NOTIFICATIONS ============ -->
          <section id="notifications" class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-6 border-b border-gray-50 pb-3">
              WhatsApp Notifications
            </h2>
            <div class="space-y-4">
              <label class="flex items-start gap-3 cursor-pointer group">
                <input v-model="notificationForm.whatsappDrops" type="checkbox" class="mt-0.5 rounded border-gray-300 text-[#bd9c30] focus:ring-[#bd9c30]/30 w-4 h-4 transition" />
                <div>
                  <p class="text-xs font-medium text-gray-700 group-hover:text-[#bd9c30] transition duration-150">New Arrivals & Trends Drops</p>
                  <p class="text-[11px] text-gray-400 mt-0.5">Receive prompt mobile instant updates when exclusive luxury inventory and items arrive.</p>
                </div>
              </label>

              <label class="flex items-start gap-3 cursor-pointer group pt-2">
                <input v-model="notificationForm.whatsappReminders" type="checkbox" class="mt-0.5 rounded border-gray-300 text-[#bd9c30] focus:ring-[#bd9c30]/30 w-4 h-4 transition" />
                <div>
                  <p class="text-xs font-medium text-gray-700 group-hover:text-[#bd9c30] transition duration-150">24-Hour Studio Reminders</p>
                  <p class="text-[11px] text-gray-400 mt-0.5">Automated booking checks delivered straight via WhatsApp exactly 24 hours prior to appointment execution.</p>
                </div>
              </label>

              <div class="flex items-center justify-end pt-4 border-t border-gray-50 mt-6">
                <button @click="saveNotificationPreferences" :disabled="loadingNotifications" class="bg-[#bd9c30] text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-[#a88826] transition disabled:opacity-50">
                  {{ loadingNotifications ? 'Updating Preferences...' : 'Save Preferences' }}
                </button>
              </div>
            </div>
          </section>

          <!-- ============ SECURITY ============ -->
          <section id="security" class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div class="flex items-center justify-between border-b border-gray-50 pb-3 mb-6">
              <h2 class="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                {{ securityMode === 'change' ? 'Change Password' : 'Reset Password with Code' }}
              </h2>
              <button
                @click="securityMode = securityMode === 'change' ? 'reset' : 'change'"
                class="text-[11px] font-semibold text-[#bd9c30] hover:text-[#a88826] transition"
              >
                {{ securityMode === 'change' ? 'Have a reset code instead?' : 'Know your current password?' }}
              </button>
            </div>

            <!-- Change password: requires current password -->
            <form v-if="securityMode === 'change'" @submit.prevent="handlePasswordChange" class="space-y-4">
              <div>
                <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Current Password</label>
                <input v-model="passwordForm.old_password" type="password" class="w-full text-xs px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-[#bd9c30] rounded-xl bg-gray-50/30" required />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">New Password</label>
                  <input v-model="passwordForm.new_password" type="password" class="w-full text-xs px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-[#bd9c30] rounded-xl bg-gray-50/30" required minlength="8" />
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                  <input v-model="passwordForm.confirm_password" type="password" class="w-full text-xs px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-[#bd9c30] rounded-xl bg-gray-50/30" required minlength="8" />
                </div>
              </div>

              <div class="flex items-center justify-end pt-4 border-t border-gray-50 mt-6">
                <button type="submit" :disabled="loadingPassword" class="bg-[#bd9c30] text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-[#a88826] transition disabled:opacity-50">
                  {{ loadingPassword ? 'Updating Password...' : 'Change Password' }}
                </button>
              </div>
            </form>

            <!-- Reset password with a code (e.g. received via forgot-password email) -->
            <form v-else @submit.prevent="handlePasswordReset" class="space-y-4">
              <div class="flex items-center justify-between gap-3">
                <div class="flex-1">
                  <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input v-model="resetForm.email" type="email" class="w-full text-xs px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-[#bd9c30] rounded-xl bg-gray-50/30" required />
                </div>
                <button
                  type="button"
                  @click="handleSendResetCode"
                  :disabled="loadingSendCode || !resetForm.email"
                  class="shrink-0 mt-6 text-[11px] font-semibold text-[#bd9c30] border border-[#bd9c30]/40 rounded-xl px-3 py-2.5 hover:bg-[#faf7ef] transition disabled:opacity-50"
                >
                  {{ loadingSendCode ? 'Sending...' : 'Send Code' }}
                </button>
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Reset Code</label>
                <input v-model="resetForm.code" type="text" class="w-full text-xs px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-[#bd9c30] rounded-xl bg-gray-50/30" required />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">New Password</label>
                  <input v-model="resetForm.new_password" type="password" class="w-full text-xs px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-[#bd9c30] rounded-xl bg-gray-50/30" required minlength="8" />
                </div>
                <div>
                  <label class="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                  <input v-model="resetForm.confirm_password" type="password" class="w-full text-xs px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-[#bd9c30] rounded-xl bg-gray-50/30" required minlength="8" />
                </div>
              </div>

              <div class="flex items-center justify-end pt-4 border-t border-gray-50 mt-6">
                <button type="submit" :disabled="loadingReset" class="bg-[#bd9c30] text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-[#a88826] transition disabled:opacity-50">
                  {{ loadingReset ? 'Resetting Password...' : 'Reset Password' }}
                </button>
              </div>
            </form>
          </section>

        </div>
      </div>
    </div>

    <div v-if="toastMessage" class="fixed bottom-6 right-6 px-5 py-3 rounded-xl text-xs font-medium text-white shadow-xl max-w-sm transition-all duration-300 z-50 animate-fade-in" :class="toastType === 'error' ? 'bg-red-500' : 'bg-gray-900'">
      {{ toastMessage }}
    </div>

    <div v-if="promptDeleteConfirm" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-100 shadow-2xl animate-scale-up">
        <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Permanently Terminate Profile?</h3>
        <p class="text-xs text-gray-400 mt-2 leading-relaxed">This action cannot be undone. All active scheduling slots, order reference archives, and customer reward tier status criteria will clear from your system immediately.</p>
        <div class="flex items-center justify-end gap-3 mt-6">
          <button @click="promptDeleteConfirm = false" class="px-4 py-2 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-100 transition">Cancel Process</button>
          <button @click="handleDeleteAccount" :disabled="loadingDelete" class="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-600 transition disabled:opacity-50">
            {{ loadingDelete ? 'Deleting...' : 'Confirm Destruction' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../composables/auth'

const router = useRouter()
const authStore = useAuthStore()

// Loading / UI states
const loadingSession = ref(true)
const loadingNotifications = ref(false)
const loadingPassword = ref(false)
const loadingSendCode = ref(false)
const loadingReset = ref(false)
const loadingDelete = ref(false)
const promptDeleteConfirm = ref(false)

// 'change' = has current password, 'reset' = using an emailed code
const securityMode = ref('change')

// Toast feedback
const toastMessage = ref('')
const toastType = ref('success')

// Forms
const notificationForm = ref({ whatsappDrops: true, whatsappReminders: true })
const passwordForm = ref({ old_password: '', new_password: '', confirm_password: '' })
const resetForm = ref({ email: '', code: '', new_password: '', confirm_password: '' })

const triggerToast = (msg, type = 'success') => {
  toastMessage.value = msg
  toastType.value = type
  setTimeout(() => { toastMessage.value = '' }, 4000)
}

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// 🟢 Save Preferences for WhatsApp Notifications
const saveNotificationPreferences = async () => {
  loadingNotifications.value = true
  try {
    await authStore.updateLocalUserFields({
      whatsapp_drops_enabled: notificationForm.value.whatsappDrops,
      whatsapp_reminders_enabled: notificationForm.value.whatsappReminders
    })
    triggerToast('Notification communication rules modified.')
  } catch (err) {
    triggerToast(err.message, 'error')
  } finally {
    loadingNotifications.value = false
  }
}

// 🔑 Change Password — POST /auth/change-password/?store=...
const handlePasswordChange = async () => {
  if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
    triggerToast('New password entries do not match.', 'error')
    return
  }

  loadingPassword.value = true
  try {
    await authStore.changePassword(passwordForm.value.old_password, passwordForm.value.new_password)
    triggerToast('Password changed successfully.')
    passwordForm.value = { old_password: '', new_password: '', confirm_password: '' }
  } catch (err) {
    triggerToast(err.message, 'error')
  } finally {
    loadingPassword.value = false
  }
}

// 📧 Send reset code — POST /auth/forgot-password/?store=...
const handleSendResetCode = async () => {
  if (!resetForm.value.email) {
    triggerToast('Please enter your email first.', 'error')
    return
  }
  loadingSendCode.value = true
  try {
    await authStore.forgotPassword(resetForm.value.email)
    triggerToast('A reset code was sent to your email.')
  } catch (err) {
    triggerToast(err.message, 'error')
  } finally {
    loadingSendCode.value = false
  }
}

// 🔁 Reset Password with code — POST /auth/reset-password/?store=...
const handlePasswordReset = async () => {
  if (resetForm.value.new_password !== resetForm.value.confirm_password) {
    triggerToast('New password entries do not match.', 'error')
    return
  }

  loadingReset.value = true
  try {
    await authStore.resetPassword(resetForm.value.email, resetForm.value.code, resetForm.value.new_password)
    triggerToast('Password reset successfully.')
    resetForm.value = { email: '', code: '', new_password: '', confirm_password: '' }
  } catch (err) {
    triggerToast(err.message, 'error')
  } finally {
    loadingReset.value = false
  }
}

// 🔴 Logout
const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

// 🔴 Delete Account
const handleDeleteAccount = async () => {
  loadingDelete.value = true
  try {
    await authStore.deleteAccount()
    promptDeleteConfirm.value = false
    router.push('/')
  } catch (err) {
    triggerToast(err.message, 'error')
    loadingDelete.value = false
  }
}

onMounted(async () => {
  loadingSession.value = true

  if (!authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  if (!authStore.user) {
    router.push('/login')
    return
  }

  notificationForm.value.whatsappDrops = authStore.user.whatsapp_drops_enabled ?? true
  notificationForm.value.whatsappReminders = authStore.user.whatsapp_reminders_enabled ?? true

  loadingSession.value = false
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in { animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
</style>