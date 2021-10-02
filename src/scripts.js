import { add, divide, multiply } from 'mathjs';

function calculateInvoiceValue(event) {
  event.preventDefault();
  document.querySelector('#calc-output').classList.remove('fieldset_hidden');

  const salary = document.querySelector('#salary').valueAsNumber;
  const sickDailyRateFactor = divide(
    document.querySelector('#sick-daily-rate-factor').valueAsNumber,
    100
  );
  const sickDaysCount =
    document.querySelector('#sick-days-count').valueAsNumber;
  const workDaysCount =
    document.querySelector('#work-days-count').valueAsNumber;
  const normalDaysCount = workDaysCount - sickDaysCount;

  const hourlyRate = divide(salary, 168);
  const hourlyRateInput = document.querySelector('#hourly-rate');
  hourlyRateInput.textContent = formatCurrency(hourlyRate);
  hourlyRateInput.title = hourlyRate.toLocaleString();

  const dailyRate = divide(salary, 21);
  const dailyRateInput = document.querySelector('#daily-rate');
  dailyRateInput.textContent = formatCurrency(dailyRate);
  dailyRateInput.title = dailyRate.toLocaleString();

  const sickDailyRate = multiply(dailyRate, sickDailyRateFactor);
  const sickDailyRateInput = document.querySelector('#sick-daily-rate');
  sickDailyRateInput.textContent = formatCurrency(sickDailyRate);
  sickDailyRateInput.title = sickDailyRate.toLocaleString();

  const invoiceValue = add(
    multiply(normalDaysCount, dailyRate),
    multiply(sickDaysCount, sickDailyRate)
  );
  const invoiceValueInput = document.querySelector('#invoice-value');
  invoiceValueInput.textContent = formatCurrency(invoiceValue);
  invoiceValueInput.title = invoiceValue;
}

function formatCurrency(number) {
  return number.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'code',
  });
}

const invoiceValueForm = document.querySelector('#invoice-value-form');
invoiceValueForm.addEventListener('submit', calculateInvoiceValue);
