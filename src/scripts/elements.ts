/** Checkboxes */
export const sickLeaveCheckbox =
  document.querySelector<HTMLInputElement>('#sick-leave');
export const partTimeCheckbox =
  document.querySelector<HTMLInputElement>('#part-time');

/** Fieldsets */
export const sickLeaveFieldset = document.querySelector<HTMLFieldSetElement>(
  '#sick-leave-fieldset'
);
export const partTimeFieldset = document.querySelector<HTMLFieldSetElement>(
  '#part-time-fieldset'
);
export const calcOutputFieldset = document.querySelector<HTMLFieldSetElement>(
  '#calc-output-fieldset'
);

/** Forms */
export const invoiceValueForm = document.querySelector<HTMLFormElement>(
  '#invoice-value-form'
);

/** Inputs */
export const sickDailyRatePercentageInput =
  document.querySelector<HTMLInputElement>('#sick-daily-rate-percentage');
export const sickDaysCountInput =
  document.querySelector<HTMLInputElement>('#sick-days-count');
export const workDaysCountInput =
  document.querySelector<HTMLInputElement>('#work-days-count');
export const salaryInput = document.querySelector<HTMLInputElement>('#salary');

/** Spans */
export const hourlyRateSpan =
  document.querySelector<HTMLSpanElement>('#hourly-rate');
export const dailyRateSpan =
  document.querySelector<HTMLSpanElement>('#daily-rate');
export const invoiceValueSpan =
  document.querySelector<HTMLSpanElement>('#invoice-value');
