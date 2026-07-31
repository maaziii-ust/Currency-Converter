/**
 * DOM Elements & UI State Handlers
 */
const currencyToCountryMap = {
  USD: 'us',
  EUR: 'eu',
  GBP: 'gb',
  JPY: 'jp',
  CAD: 'ca',
  PKR: 'pk',
  INR: 'in'
};

export const UI = {
  amountInput: document.getElementById('amount'),
  fromSelect: document.getElementById('from-currency'),
  toSelect: document.getElementById('to-currency'),
  fromFlag: document.getElementById('from-flag'),
  toFlag: document.getElementById('to-flag'),
  swapBtn: document.getElementById('swap-btn'),
  form: document.getElementById('converter-form'),
  resultCard: document.getElementById('result-card'),
  convertedAmount: document.getElementById('converted-amount'),
  exchangeRate: document.getElementById('exchange-rate'),
  lastUpdated: document.getElementById('last-updated'),
  errorBanner: document.getElementById('error-banner'),
  errorMessage: document.getElementById('error-message'),
  skeletonLoader: document.getElementById('skeleton-loader'),

  /**
   * Updates flag image dynamically based on selected currency
   */
  updateFlags() {
    const fromCode = this.fromSelect.value;
    const toCode = this.toSelect.value;

    const fromCountry = currencyToCountryMap[fromCode] || 'un';
    const toCountry = currencyToCountryMap[toCode] || 'un';

    this.fromFlag.src = `https://flagcdn.com/w40/${fromCountry}.png`;
    this.toFlag.src = `https://flagcdn.com/w40/${toCountry}.png`;
  },

  /**
   * Shows Loading Skeleton
   */
  showLoading() {
    this.errorBanner.style.display = 'none';
    this.resultCard.style.display = 'none';
    this.skeletonLoader.style.display = 'flex';
  },

  /**
   * Hides Loading Skeleton
   */
  hideLoading() {
    this.skeletonLoader.style.display = 'none';
    this.resultCard.style.display = 'flex';
  },

  /**
   * Renders error message banner
   * @param {string} msg 
   */
  showError(msg) {
    this.skeletonLoader.style.display = 'none';
    this.resultCard.style.display = 'none';
    this.errorMessage.textContent = msg || 'An error occurred while calculating rate.';
    this.errorBanner.style.display = 'flex';
  },

  /**
   * Displays the final converted output
   */
  displayResult(formattedAmount, rateText, timeText) {
    this.errorBanner.style.display = 'none';
    this.convertedAmount.textContent = formattedAmount;
    this.exchangeRate.textContent = rateText;
    this.lastUpdated.textContent = `Last updated: ${timeText}`;
    this.hideLoading();
  }
};