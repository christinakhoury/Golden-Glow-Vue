import { OsiMartAPI } from './osimart.js';

const STORE_ID = '17781c3f-b746-4897-be7d-15d1ff48589e';
const api = new OsiMartAPI(STORE_ID);

export async function loadStudioServices() {
  try {
    console.log("📡 Loading services...");
    
    const data = await api.getServices();

    if (data?.results && Array.isArray(data.results)) {
      console.log("✅ SERVICES (paginated):", data.results);
      return data.results;
    }

    if (Array.isArray(data)) {
      console.log("✅ SERVICES (flat):", data);
      return data;
    }

    console.warn("⚠️ Unexpected API format:", data);
    return [];

  } catch (error) {
    console.warn("❌ Failed to reach API. Using fallback.", error);

    return [];
  }
}