/**
 * API Requests Handler
 */
const BASE_URL = 'https://open.er-api.com/v6/latest';

export async function fetchExchangeRates(baseCurrency) {
  try {
    const response = await fetch(`${BASE_URL}/${baseCurrency}`);
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.result === 'error') {
      throw new Error(data['error-type'] || 'Failed to fetch rates');
    }
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}