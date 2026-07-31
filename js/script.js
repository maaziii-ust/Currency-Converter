/**
 * Main Controller & Event Listeners
 */
import { fetchExchangeRates } from './api.js';
import { calculateConversion, formatCurrency } from './converter.js';
import { UI } from './ui.js';

async function handleConversion() {
  const amountVal = parseFloat(UI.amountInput.value);
  const fromCurr = UI.fromSelect.value;
  const toCurr = UI.toSelect.value;

  if (isNaN(amountVal) || amountVal <= 0) {
    UI.showError('Please enter a valid amount greater than 0.');
    return;
  }

  UI.showLoading();

  try {
    const data = await fetchExchangeRates(fromCurr);
    const rate = data.rates[toCurr];

    if (!rate) {
      throw new Error(`Exchange rate for ${toCurr} not found.`);
    }

    const convertedVal = calculateConversion(amountVal, rate);
    const formattedResult = formatCurrency(convertedVal, toCurr);
    const rateText = `1 ${fromCurr} = ${rate.toFixed(4)} ${toCurr}`;
    const timeText = new Date(data.time_last_update_unix * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    UI.displayResult(formattedResult, rateText, timeText);

  } catch (error) {
    UI.showError('Could not retrieve live exchange rates. Try again later.');
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Update Flags on Select Change
  UI.fromSelect.addEventListener('change', () => UI.updateFlags());
  UI.toSelect.addEventListener('change', () => UI.updateFlags());

  // Swap Currency Handler
  UI.swapBtn.addEventListener('click', () => {
    const temp = UI.fromSelect.value;
    UI.fromSelect.value = UI.toSelect.value;
    UI.toSelect.value = temp;
    UI.updateFlags();
    handleConversion();
  });

  // Form Submit Handler
  UI.form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleConversion();
  });

  // Initial Calculation on Load
  UI.updateFlags();
  handleConversion();
});