// src/services/product.js

import { OsiMartAPI } from './osimart.js'

const STORE_ID = '17781c3f-b746-4897-be7d-15d1ff48589e'
const api = new OsiMartAPI(STORE_ID)

const BACKEND_BASE_URL = 'https://api.osimart.com'

export async function loadStudioProducts() {
  try {
    let url = `https://api.osimart.com/store/apis/products/?store=17781c3f-b746-4897-be7d-15d1ff48589e`

    let allProducts = []

    while (url) {
      const res = await fetch(url)
      const data = await res.json()

      allProducts = allProducts.concat(data.results || [])

      url = data.next 
    }

    return allProducts
  } catch (err) {
    console.error(err)
    return []
  }
}