import { OsiMartAPI } from './osimart.js';
import { OSIMART_STORE_ID } from './osimartConfig.js';

const api = new OsiMartAPI(OSIMART_STORE_ID);

export async function loadStudioBanners() {
  try {
    const data = await api.getBanners()
    console.log("RAW BANNER RESPONSE:", data)

    // Handle paginated .results wrapper safely
    const results = data?.results || data?.data?.results || data

    if (Array.isArray(results) && results.length > 0) {
      return results.map((banner, index) => {
        const path = banner.image?.path || banner.image_url

        return {
          id: banner.id || index,
          src: path
            ? `https://api.osimart.com/${path}`
            : '/images/hero1.jpg',
          alt: banner.title || `Banner ${index + 1}`
        }
      })
    }

    console.warn("No valid banner results found:", data)
    return useFallbackBanners()

  } catch (error) {
    console.error("Banner API error:", error)
    return useFallbackBanners()
  }
}

function useFallbackBanners() {
  return [
    { id: 'f1', src: '/images/hero1.jpg', alt: 'Hero model 1' },
    { id: 'f2', src: '/images/hero2.jpg', alt: 'Hero model 2' },
    { id: 'f3', src: '/images/hero3.jpg', alt: 'Hero model 3' }
  ]
}
