export class OsiMartAPI {
  constructor(storeId) {
    this.storeId = storeId;
   
    this.baseUrl = "https://api.osimart.com/store/apis";
  }

async _apiRequest(endpoint) {
  const cleanEndpoint = endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
  const url = `${this.baseUrl}/${cleanEndpoint}?store=${this.storeId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}`);
  }

  const data = await response.json();

  // normalize response here
  return data.results ?? data;
}

  async getBanners() {
    return this._apiRequest("banners");
  }
  
  async getProducts() {
    return this._apiRequest("products");
  }
 
  async getServices() {
    return this._apiRequest("services");
  }
}