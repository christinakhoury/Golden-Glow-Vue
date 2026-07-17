import { storeUrl } from './osimartConfig.js'
export async function loadStudioProducts() {
  try {
    // 1. Used your constants here for cleaner maintenance
    let url = storeUrl('/store/apis/products/')

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
