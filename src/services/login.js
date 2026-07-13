const STORE_ID = '17781c3f-b746-4897-be7d-15d1ff48589e'
const BASE_URL = 'https://api.osimart.com'

// Generates (and persists) a stable device id so the backend can recognize
// this browser across sessions. Swap for a more robust fingerprint if needed.
function getDeviceId() {
  let deviceId = localStorage.getItem('gg-device-id')
  if (!deviceId) {
    deviceId = crypto.randomUUID()
    localStorage.setItem('gg-device-id', deviceId)
  }
  return deviceId
}

/**
 * Logs a customer in against the osimart auth endpoint.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<object>} the parsed JSON response (token, user info, etc.)
 */
export async function login({ email, password }) {
  const url = `${BASE_URL}/auth/login/?store=${STORE_ID}`

  const payload = {
    email,
    password,
    store_id: STORE_ID,
    device_name: navigator.userAgent || 'web-client',
    device_id: getDeviceId(),
    login_as: 'customer'
  }

  console.log('[osimart] login request ->', url, payload)

  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (networkErr) {
    console.error('[osimart] login network error:', networkErr)
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    console.warn('[osimart] login response had no JSON body')
  }

  console.log('[osimart] login response <-', res.status, data)

  if (!res.ok) {
    const message =
      data?.non_field_errors?.[0] ||
      data?.verified?.[0] ||
      data?.detail ||
      data?.message ||
      data?.email?.[0] ||
      data?.password?.[0] ||
      (data ? JSON.stringify(data) : `Login failed (${res.status})`)
    console.error('[osimart] login failed:', res.status, message, data)
    throw new Error(message)
  }

  return data
}

/**
 * Registers a new customer against the osimart auth endpoint.
 * @param {{ name: string, email: string, password: string, phone?: string }} details
 * @returns {Promise<object>}
 */
export async function signup({ name, email, password, phone }) {
  const url = `${BASE_URL}/auth/register/?store=${STORE_ID}`

  const trimmedName = (name || '').trim()
  const nameParts = trimmedName.split(/\s+/).filter(Boolean)
  const first_name = nameParts[0] || ''
  const last_name = nameParts.slice(1).join(' ') || ''

  const payload = {
    name: trimmedName,
    first_name,
    last_name,
    email,
    password,
    // osimart's admin dashboard labels this field "Mobile", so trying the
    // matching plain field name — same pattern as first_name/last_name.
    // If it doesn't save, check the register endpoint's browsable API form
    // for the actual expected key (e.g. phone_number, phone, mobile_number).
    mobile: phone || '',
    store_id: STORE_ID,
    device_name: navigator.userAgent || 'web-client',
    device_id: getDeviceId(),
    register_as: 'customer'
  }
  

  console.log('[osimart] signup request ->', url, payload)

  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (networkErr) {
    console.error('[osimart] signup network error:', networkErr)
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    console.warn('[osimart] signup response had no JSON body')
  }

  console.log('[osimart] signup response <-', res.status, data)

  if (!res.ok) {
    const message =
      data?.detail ||
      data?.message ||
      data?.non_field_errors?.[0] ||
      (data ? JSON.stringify(data) : `Signup failed (${res.status})`)
    console.error('[osimart] signup failed:', res.status, message, data)
    throw new Error(message)
  }

  return data
}

/** 
 * Verifies the customer's email using the code sent by the backend.
 * @param {{ email: string, code: string }} verificationDetails
 * @returns {Promise<object>}
 */
export async function verifyEmail({ email, code }) {
  const url = `${BASE_URL}/auth/verify/?store=${STORE_ID}`

  const payload = {
    email,
    code,
    store_id: STORE_ID,
    verify_as: 'customer'
  }

  console.log('[osimart] verification request ->', url, payload)

  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (networkErr) {
    console.error('[osimart] verification network error:', networkErr)
    throw new Error('Could not reach the server. Check your connection.')
  }

  let data = null
  try { 
    data = await res.json() 
  } catch {}

  console.log('[osimart] verification response <-', res.status, JSON.stringify(data))

  if (!res.ok) {
    const message = data?.detail || data?.message || data?.code?.[0] || 'Verification failed.'
    throw new Error(message)
  }

  return data
}

/**
 * Requests a new verification code be sent, in case the original expired
 * or never arrived.
 * @param {{ email: string }} details
 * @returns {Promise<object>}
 */
export async function resendVerificationCode({ email }) {
  const url = `${BASE_URL}/auth/regen/?store=${STORE_ID}`

  const payload = {
    email,
    store_id: STORE_ID,
    verify_as: 'customer'
  }

  console.log('[osimart] resend code request ->', url, payload)

  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (networkErr) {
    console.error('[osimart] resend code network error:', networkErr)
    throw new Error('Could not reach the server. Check your connection.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {}

  console.log('[osimart] resend code response <-', res.status, JSON.stringify(data))

  if (!res.ok) {
    const message = data?.detail || data?.message || data?.email?.[0] || 'Could not resend code.'
    throw new Error(message)
  }

  return data
}

/**
 * Changes the logged-in customer's password.
 * POST /auth/change-password/?store=... { old-password, new-password }
 * @param {{ old_password: string, new_password: string }} details
 * @returns {Promise<object>}
 */
export async function changePassword({ old_password, new_password }) {
  const url = `${BASE_URL}/auth/change-password/?store=${STORE_ID}`

  const payload = {
    old_password,
    password: new_password,
    store_id: STORE_ID
  }

  console.log('[osimart] change-password request ->', url, { ...payload, old_password: '••••', password: '••••' })

  const token = getAuthToken()

  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    })
  } catch (networkErr) {
    console.error('[osimart] change-password network error:', networkErr)
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    console.warn('[osimart] change-password response had no JSON body')
  }

  console.log('[osimart] change-password response <-', res.status, data)

  if (!res.ok) {
    const message =
      data?.detail ||
      data?.message ||
      data?.non_field_errors?.[0] ||
      data?.old_password?.[0] ||
      data?.password?.[0] ||
      (data ? JSON.stringify(data) : `Password change failed (${res.status})`)
    console.error('[osimart] change-password failed:', res.status, message, data)
    throw new Error(message)
  }

  return data
}

/**
 * Sends a password reset code to the customer's email.
 * POST /auth/forgot-password/?store=... { email, reset-as, store-id }
 * @param {{ email: string }} details
 * @returns {Promise<object>}
 */
export async function forgotPassword({ email }) {
  const url = `${BASE_URL}/auth/forgot-password/?store=${STORE_ID}`

  const payload = {
    email,
    // Matches the login_as / register_as / verify_as pattern used elsewhere
    // in this API. The API confirmed it wants snake_case (reset_as, not
    // the hyphenated reset-as originally given).
    reset_as: 'customer',
    store_id: STORE_ID
  }

  console.log('[osimart] forgot-password request ->', url, payload)

  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (networkErr) {
    console.error('[osimart] forgot-password network error:', networkErr)
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    console.warn('[osimart] forgot-password response had no JSON body')
  }

  console.log('[osimart] forgot-password response <-', res.status, data)

  if (!res.ok) {
    const message =
      data?.detail ||
      data?.message ||
      data?.non_field_errors?.[0] ||
      data?.email?.[0] ||
      (data ? JSON.stringify(data) : `Could not send reset code (${res.status})`)
    console.error('[osimart] forgot-password failed:', res.status, message, data)
    throw new Error(message)
  }

  return data
}

/**
 * Resets the customer's password using the code sent via forgotPassword().
 * POST /auth/reset-password/?store=... { email, reset-as, store-id, code, new-password }
 *
 * NOTE: the endpoint spec only explicitly listed email/reset-as/store-id/code
 * (no new-password field). A password reset that doesn't accept a new
 * password wouldn't do anything useful, so 'new-password' is included here
 * as an assumption — confirm the exact field name against the real API
 * (e.g. it might be 'password' or 'new_password' instead) and adjust below.
 * @param {{ email: string, code: string, new_password: string }} details
 * @returns {Promise<object>}
 */
export async function resetPassword({ email, code, new_password }) {
  const url = `${BASE_URL}/auth/reset-password/?store=${STORE_ID}`

  const payload = {
    email,
    reset_as: 'customer',
    store_id: STORE_ID,
    code,
    password: new_password
  }

  console.log('[osimart] reset-password request ->', url, { ...payload, password: '••••' })

  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (networkErr) {
    console.error('[osimart] reset-password network error:', networkErr)
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    console.warn('[osimart] reset-password response had no JSON body')
  }

  console.log('[osimart] reset-password response <-', res.status, data)

  if (!res.ok) {
    const message =
      data?.detail ||
      data?.message ||
      data?.non_field_errors?.[0] ||
      data?.code?.[0] ||
      data?.password?.[0] ||
      (data ? JSON.stringify(data) : `Password reset failed (${res.status})`)
    console.error('[osimart] reset-password failed:', res.status, message, data)
    throw new Error(message)
  }

  return data
}

/**
 * Refreshes the access token using the stored refresh token.
 * POST /auth/refresh/?store=...
 *
 * NOTE: exact expected field name for the refresh token wasn't specified
 * (sending both `refresh` and `refresh_token` to cover common conventions —
 * trim to one once you confirm which the backend expects).
 * @returns {Promise<object>}
 */
export async function refreshAuthToken() {
  const url = `${BASE_URL}/auth/refresh/?store=${STORE_ID}`
  const refresh = localStorage.getItem('gg-refresh')

  if (!refresh) {
    throw new Error('No refresh token available. Please log in again.')
  }

  const payload = {
    refresh,
    refresh_token: refresh,
    store_id: STORE_ID,
    device_id: getDeviceId()
  }

  console.log('[osimart] refresh request ->', url)

  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch (networkErr) {
    console.error('[osimart] refresh network error:', networkErr)
    throw new Error('Could not reach the server. Check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    console.warn('[osimart] refresh response had no JSON body')
  }

  console.log('[osimart] refresh response <-', res.status, data)

  if (!res.ok) {
    const message = data?.detail || data?.message || `Session refresh failed (${res.status})`
    console.error('[osimart] refresh failed:', res.status, message, data)
    throw new Error(message)
  }

  const newAccessToken = data?.access_token || data?.token || data?.access
  if (newAccessToken) {
    localStorage.setItem('gg-token', newAccessToken)
  }

  return data
}

/**
 * Persists the auth session from a login/signup response.
 * @param {object} data - the raw API response
 * @param {object} [extraFields] - client-known values (e.g. the email/phone
 *   the user just typed into the form) used to fill in anything the API
 *   response doesn't echo back. osimart's /auth/login/ response, for
 *   example, only returns { access_token, refresh_token, user_id,
 *   session_id } — no email, no name, no phone — so without this, those
 *   fields would never make it into localStorage at all.
 */
export function saveAuthSession(data, extraFields = {}) {
  const accessToken = data?.access_token || data?.token || data?.access
  const refreshToken = data?.refresh_token || data?.refresh

  if (accessToken) localStorage.setItem('gg-token', accessToken)
  if (refreshToken) localStorage.setItem('gg-refresh', refreshToken)

  let existingUser = {}
  try {
    existingUser = JSON.parse(localStorage.getItem('gg-user')) || {}
  } catch {
    existingUser = {}
  }

  const newUserFields =
    data?.user ||
    (data?.user_id
      ? { id: data.user_id, session_id: data.session_id }
      : (data?.id ? data : null))

  // Merge priority, low to high: what was already stored -> extraFields
  // (client-typed values) -> newUserFields (the API response itself, since
  // that's the most authoritative source whenever it actually provides a
  // field).
  const userObj = {
    ...existingUser,
    ...extraFields,
    ...(newUserFields || {}),
    first_name: newUserFields?.first_name || extraFields.first_name || existingUser.first_name || '',
    last_name: newUserFields?.last_name || extraFields.last_name || existingUser.last_name || '',
    email: newUserFields?.email || extraFields.email || existingUser.email || '',
    mobile: newUserFields?.mobile || extraFields.mobile || existingUser.mobile || ''
  }

  if (Object.keys(userObj).length) {
    localStorage.setItem('gg-user', JSON.stringify(userObj))
  }

  console.log('[osimart] auth session saved:', {
    token: getAuthToken(),
    user: userObj
  })
}

export function getAuthToken() {
  return localStorage.getItem('gg-token')
}

export function logout() {
  localStorage.removeItem('gg-token')
  localStorage.removeItem('gg-refresh')
  localStorage.removeItem('gg-user')
}