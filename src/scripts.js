import { add, divide, multiply } from 'mathjs';

const sickDailyRateFactorInput = document.querySelector(
  '#sick-daily-rate-factor'
);
const sickDaysCountInput = document.querySelector('#sick-days-count');
const workDaysCountInput = document.querySelector('#work-days-count');

function toggleSickLeaveFieldset() {
  sickDailyRateFactorInput.toggleAttribute('required');
  sickDaysCountInput.toggleAttribute('required');
  document
    .querySelector('#sick-leave-fieldset')
    .classList.toggle('fieldset_hidden');
}

function togglePartTimeFieldset() {
  workDaysCountInput.toggleAttribute('required');
  document
    .querySelector('#part-time-fieldset')
    .classList.toggle('fieldset_hidden');
}

function calculateInvoiceValue(event) {
  event.preventDefault();
  document
    .querySelector('#calc-output-fieldset')
    .classList.remove('fieldset_hidden');

  const salary = document.querySelector('#salary').valueAsNumber;

  let sickDailyRateFactor = 1;
  let sickDaysCount = 0;
  if (sickLeaveCheckbox.checked) {
    sickDailyRateFactor = divide(sickDailyRateFactorInput.valueAsNumber, 100);
    sickDaysCount = sickDaysCountInput.valueAsNumber;
  }

  let workDaysCount = 21;
  if (partTimeCheckbox.checked) {
    workDaysCount = workDaysCountInput.valueAsNumber;
  }
  const normalDaysCount = workDaysCount - sickDaysCount;

  const hourlyRate = divide(salary, 168);
  const hourlyRateElement = document.querySelector('#hourly-rate');
  hourlyRateElement.textContent = formatCurrency(hourlyRate);
  hourlyRateElement.title = hourlyRate.toLocaleString();

  const dailyRate = divide(salary, 21);
  const dailyRateElement = document.querySelector('#daily-rate');
  dailyRateElement.textContent = formatCurrency(dailyRate);
  dailyRateElement.title = dailyRate.toLocaleString();

  const sickDailyRate = multiply(dailyRate, sickDailyRateFactor);

  const invoiceValue = add(
    multiply(normalDaysCount, dailyRate),
    multiply(sickDaysCount, sickDailyRate)
  );
  const invoiceValueElement = document.querySelector('#invoice-value');
  invoiceValueElement.textContent = formatCurrency(invoiceValue);
  invoiceValueElement.title = invoiceValue;
}

function formatCurrency(number) {
  return number.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'code',
  });
}

const sickLeaveCheckbox = document.querySelector('#sick-leave');
sickLeaveCheckbox.addEventListener('change', toggleSickLeaveFieldset);

const partTimeCheckbox = document.querySelector('#part-time');
partTimeCheckbox.addEventListener('change', togglePartTimeFieldset);

const invoiceValueForm = document.querySelector('#invoice-value-form');
invoiceValueForm.addEventListener('submit', calculateInvoiceValue);
