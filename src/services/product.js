// src/services/product.js

import { storeUrl } from './osimartConfig.js'

export async function loadStudioProducts() {
  try {
    let url = storeUrl('/store/apis/products/')

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
