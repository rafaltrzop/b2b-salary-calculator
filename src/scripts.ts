import { add, divide, multiply } from 'mathjs';

const sickDailyRateFactorInput = document.querySelector<HTMLInputElement>(
  '#sick-daily-rate-factor'
);
const sickDaysCountInput =
  document.querySelector<HTMLInputElement>('#sick-days-count');
const workDaysCountInput =
  document.querySelector<HTMLInputElement>('#work-days-count');

function toggleSickLeaveFieldset(): void {
  sickDailyRateFactorInput.toggleAttribute('required');
  sickDaysCountInput.toggleAttribute('required');
  document
    .querySelector('#sick-leave-fieldset')
    .classList.toggle('fieldset_hidden');
}

function togglePartTimeFieldset(): void {
  workDaysCountInput.toggleAttribute('required');
  document
    .querySelector('#part-time-fieldset')
    .classList.toggle('fieldset_hidden');
}

function calculateInvoiceValue(event: SubmitEvent): void {
  event.preventDefault();
  document
    .querySelector('#calc-output-fieldset')
    .classList.remove('fieldset_hidden');

  const salary =
    document.querySelector<HTMLInputElement>('#salary').valueAsNumber;

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
  const hourlyRateElement =
    document.querySelector<HTMLSpanElement>('#hourly-rate');
  hourlyRateElement.textContent = formatCurrency(hourlyRate);
  hourlyRateElement.title = formatNumber(hourlyRate);

  const dailyRate = divide(salary, 21);
  const dailyRateElement =
    document.querySelector<HTMLSpanElement>('#daily-rate');
  dailyRateElement.textContent = formatCurrency(dailyRate);
  dailyRateElement.title = formatNumber(dailyRate);

  const sickDailyRate = multiply(dailyRate, sickDailyRateFactor);

  const invoiceValue = add(
    multiply(normalDaysCount, dailyRate),
    multiply(sickDaysCount, sickDailyRate)
  ) as number;
  const invoiceValueElement =
    document.querySelector<HTMLSpanElement>('#invoice-value');
  invoiceValueElement.textContent = formatCurrency(invoiceValue);
  invoiceValueElement.title = formatNumber(invoiceValue);
}

function formatCurrency(number: number): string {
  return number.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'code',
  });
}

function formatNumber(number: number): string {
  return number.toLocaleString('pl-PL');
}

const sickLeaveCheckbox =
  document.querySelector<HTMLInputElement>('#sick-leave');
sickLeaveCheckbox.addEventListener('change', toggleSickLeaveFieldset);

const partTimeCheckbox = document.querySelector<HTMLInputElement>('#part-time');
partTimeCheckbox.addEventListener('change', togglePartTimeFieldset);

const invoiceValueForm = document.querySelector<HTMLFormElement>(
  '#invoice-value-form'
);
invoiceValueForm.addEventListener('submit', calculateInvoiceValue);
