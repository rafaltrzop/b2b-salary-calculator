import {
  invoiceValueForm,
  partTimeCheckbox,
  sickLeaveCheckbox,
} from './elements';
import {
  calculateInvoiceValue,
  togglePartTimeFieldset,
  toggleSickLeaveFieldset,
} from './utils';

sickLeaveCheckbox.addEventListener('change', toggleSickLeaveFieldset);
partTimeCheckbox.addEventListener('change', togglePartTimeFieldset);
invoiceValueForm.addEventListener('submit', calculateInvoiceValue);
