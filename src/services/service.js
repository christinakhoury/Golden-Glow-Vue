import { OsiMartAPI } from './osimart.js'

const STORE_ID = '17781c3f-b746-4897-be7d-15d1ff48589e'
const api = new OsiMartAPI(STORE_ID)

const BACKEND_BASE_URL = 'https://api.osimart.com'
export async function loadStudioProducts() {
  try {
    // 1. Used your constants here for cleaner maintenance
    let url = `${BACKEND_BASE_URL}/store/apis/products/?store=${STORE_ID}`

    let allServices = []

    while (url) {
      const res = await fetch(url)
      const data = await res.json()

      allServices = allServices.concat(data.results || [])

      if (data.next) {
        url = data.next.replace(/^http:/, 'https:')
      } else {
        url = null
      }
    }

    return allServices
  } catch (err) {
    console.error("❌ Error fetching studio products from API:", err)
    return []
  }
}