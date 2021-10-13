import {
  calcOutputFieldset,
  dailyRateSpan,
  hourlyRateSpan,
  invoiceValueSpan,
  partTimeCheckbox,
  partTimeFieldset,
  salaryInput,
  sickDailyRatePercentageInput,
  sickDaysCountInput,
  sickLeaveCheckbox,
  sickLeaveFieldset,
  workDaysCountInput,
} from './elements';
import { SalaryCalculator } from './salary-calculator';

const hiddenFieldsetClass = 'fieldset_hidden';
const locale = 'pl-PL';

export function toggleSickLeaveFieldset(): void {
  toggleFieldset(sickLeaveFieldset, [
    sickDailyRatePercentageInput,
    sickDaysCountInput,
  ]);
}

export function togglePartTimeFieldset(): void {
  toggleFieldset(partTimeFieldset, [workDaysCountInput]);
}

function toggleFieldset(
  fieldset: HTMLFieldSetElement,
  inputs: HTMLInputElement[] = []
): void {
  inputs.forEach((input) => {
    input.toggleAttribute('required');
  });
  fieldset.classList.toggle(hiddenFieldsetClass);
}

export function calculateInvoiceValue(event: SubmitEvent): void {
  event.preventDefault();
  calcOutputFieldset.classList.remove(hiddenFieldsetClass);

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

  const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator(
    salary,
    sickDailyRatePercentage,
    sickDaysCount,
    workDaysCount
  );

  hourlyRateSpan.textContent = formatCurrency(hourlyRate);
  hourlyRateSpan.title = formatNumber(hourlyRate);

  dailyRateSpan.textContent = formatCurrency(dailyRate);
  dailyRateSpan.title = formatNumber(dailyRate);

  invoiceValueSpan.textContent = formatCurrency(invoiceValue);
  invoiceValueSpan.title = formatNumber(invoiceValue);
}

function formatCurrency(number: number): string {
  return number.toLocaleString(locale, {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'code',
  });
}

function formatNumber(number: number): string {
  return number.toLocaleString(locale);
}
