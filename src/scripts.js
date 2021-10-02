import { add, divide, multiply } from 'mathjs';

function calculateInvoiceValue(event) {
  event.preventDefault();

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
  hourlyRateInput.value = hourlyRate.toFixed(2);
  hourlyRateInput.title = hourlyRate;

  const dailyRate = divide(salary, 21);
  const dailyRateInput = document.querySelector('#daily-rate');
  dailyRateInput.value = dailyRate.toFixed(2);
  dailyRateInput.title = dailyRate;

  const sickDailyRate = multiply(dailyRate, sickDailyRateFactor);
  const sickDailyRateInput = document.querySelector('#sick-daily-rate');
  sickDailyRateInput.value = sickDailyRate.toFixed(2);
  sickDailyRateInput.title = sickDailyRate;

  const invoiceValue = add(
    multiply(normalDaysCount, dailyRate),
    multiply(sickDaysCount, sickDailyRate)
  );
  const invoiceValueInput = document.querySelector('#invoice-value');
  invoiceValueInput.value = invoiceValue.toFixed(2);
  invoiceValueInput.title = invoiceValue;
}

const invoiceValueForm = document.querySelector('#invoice-value-form');
invoiceValueForm.addEventListener('submit', calculateInvoiceValue);
