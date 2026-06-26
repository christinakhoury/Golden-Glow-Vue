// src/services/osimart.js

export class OsiMartAPI {
  constructor(storeId) {
    this.storeId = storeId;
    this.baseUrl = 'https://api.osimart.com/store/api'; 
  }

  /**
   * Private helper method to run fetch/catch uniformly for all endpoints.
   * This keeps your code DRY (Don't Repeat Yourself).
   */
  async #apiRequest(endpoint) {
    // Builds the URL dynamically (handles trailing slashes cleanly)
    const url = `${this.baseUrl}/${endpoint}?store=${this.storeId}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} on endpoint: ${endpoint}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`OsiMart API connection failure [${endpoint}]:`, error);
      throw error; // Re-throw so your service layer's catch block triggers fallback data
    }
  }

  /**
   * Fetches the banner data
   * @returns {Promise<Array>}
   */
  async getBanners() {
    return this.#apiRequest('banners/');
  }

  /**
   * Fetches the studio stats/metrics data
   * @returns {Promise<Array>}
   */
  async getStats() {
    return this.#apiRequest('stats/');
  }

  /**
   * Fetches the product listings data
   * @returns {Promise<Array>}
   */
  async getProducts() {
    return this.#apiRequest('products/');
  }

  /**
   * Fetches the customer reviews data
   * @returns {Promise<Array>}
   */
  async getReviews() {
    return this.#apiRequest('reviews/');
  }

  /**
   * Fetches the studio services list data
   * @returns {Promise<Array>}
   */
  async getServices() {
    return this.#apiRequest('services/');
  }
}