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

/** Persists the auth session from a login/signup response. */
export function saveAuthSession(data) {
  const accessToken = data?.access_token || data?.token || data?.access
  const refreshToken = data?.refresh_token || data?.refresh

  if (accessToken) localStorage.setItem('gg-token', accessToken)
  if (refreshToken) localStorage.setItem('gg-refresh', refreshToken)

  // IMPORTANT: osimart's /auth/login/ response only contains
  // { access_token, refresh_token, user_id, session_id, ... } — no name.
  // Only /auth/register/ returns first_name/last_name. So on every login
  // (as opposed to right after signup), a naive overwrite would wipe out
  // the name that was saved at signup. Instead, merge: keep whatever name
  // fields already exist in localStorage unless this response actually
  // provides new ones.
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

  const userObj = newUserFields
    ? {
        ...existingUser,
        ...newUserFields,
        // Only overwrite first_name/last_name if this response actually
        // included non-empty values — login responses won't, signup will.
        first_name: newUserFields.first_name || existingUser.first_name || '',
        last_name: newUserFields.last_name || existingUser.last_name || ''
      }
    : existingUser

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