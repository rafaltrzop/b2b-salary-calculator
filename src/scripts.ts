import { SalaryCalculator } from './salary-calculator';

const sickDailyRatePercentageInput = document.querySelector<HTMLInputElement>(
  '#sick-daily-rate-percentage'
);
const sickDaysCountInput =
  document.querySelector<HTMLInputElement>('#sick-days-count');
const workDaysCountInput =
  document.querySelector<HTMLInputElement>('#work-days-count');

function toggleSickLeaveFieldset(): void {
  sickDailyRatePercentageInput.toggleAttribute('required');
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

  const salaryInput = document.querySelector<HTMLInputElement>('#salary');
  const salary = salaryInput.valueAsNumber;

  let sickDailyRatePercentage;
  let sickDaysCount;
  if (sickLeaveCheckbox.checked) {
    sickDailyRatePercentage = sickDailyRatePercentageInput.valueAsNumber;
    sickDaysCount = sickDaysCountInput.valueAsNumber;
  }

  let workDaysCount;
  if (partTimeCheckbox.checked) {
    workDaysCount = workDaysCountInput.valueAsNumber;
  }

  const salaryCalculator = new SalaryCalculator(
    salary,
    sickDailyRatePercentage,
    sickDaysCount,
    workDaysCount
  );
  const { hourlyRate, dailyRate, invoiceValue } = salaryCalculator;

  const hourlyRateElement =
    document.querySelector<HTMLSpanElement>('#hourly-rate');
  hourlyRateElement.textContent = formatCurrency(hourlyRate);
  hourlyRateElement.title = formatNumber(hourlyRate);

  const dailyRateElement =
    document.querySelector<HTMLSpanElement>('#daily-rate');
  dailyRateElement.textContent = formatCurrency(dailyRate);
  dailyRateElement.title = formatNumber(dailyRate);

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
