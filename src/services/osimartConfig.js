export const OSIMART_BASE_URL = import.meta.env.VITE_OSIMART_BASE_URL || 'https://api.osimart.com'
export const OSIMART_STORE_ID = import.meta.env.VITE_OSIMART_STORE_ID

if (!OSIMART_STORE_ID) {
  throw new Error('Missing VITE_OSIMART_STORE_ID in .env')
}

export function storeUrl(path) {
  const base = OSIMART_BASE_URL.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const separator = cleanPath.includes('?') ? '&' : '?'
  return `${base}${cleanPath}${separator}store=${encodeURIComponent(OSIMART_STORE_ID)}`
}
