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
  document.querySelector('#hourly-rate').value = hourlyRate;

  const dailyRate = divide(salary, 21);
  document.querySelector('#daily-rate').value = dailyRate;

  const sickDailyRate = multiply(dailyRate, sickDailyRateFactor);
  document.querySelector('#sick-daily-rate').value = sickDailyRate;

  const invoiceValue = add(
    multiply(normalDaysCount, dailyRate),
    multiply(sickDaysCount, sickDailyRate)
  );
  document.querySelector('#invoice-value').value = invoiceValue;
}

const invoiceValueForm = document.querySelector('#invoice-value-form');
invoiceValueForm.addEventListener('submit', calculateInvoiceValue);
