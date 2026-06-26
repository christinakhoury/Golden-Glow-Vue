
import { OsiMartAPI } from './osimart.js';

// Replace 'yourstoreid' with your actual Golden Glow Studio store ID from OsiMart
const STORE_ID = 'mystore6'; 
const api = new OsiMartAPI(STORE_ID);


export async function loadStudioBanners() {
  try {
    const rawBanners = await api.getBanners();
    
    // You can map or clean up the data here if needed to match your Vue components
    return rawBanners; 
  } catch (error) {
    // Elegant fallback: return an empty array so your website doesn't crash
    console.warn("Using fallback empty banners due to API error.");
    return [];
  }
}