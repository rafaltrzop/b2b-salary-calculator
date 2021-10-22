import { SalaryCalculator } from './salary-calculator';

describe('SalaryCalculator', () => {
  describe('correct data', () => {
    describe('when salary was provided', () => {
      it('should calculate hourlyRate, dailyRate and invoiceValue', () => {
        const salary = 16800;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
        });
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(16800);
      });
    });

    describe('when salary and sickDaysCount was provided', () => {
      it('should calculate hourlyRate, dailyRate and invoiceValue', () => {
        const salary = 16800;
        const sickDaysCount = 5;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
          sickDaysCount,
        });
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(16000);
      });
    });

    describe('when salary, sickDailyRatePercentage and sickDaysCount was provided', () => {
      it('should calculate hourlyRate, dailyRate and invoiceValue', () => {
        const salary = 16800;
        const sickDaysCount = 5;
        const sickDailyRatePercentage = 60;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
          sickDaysCount,
          sickDailyRatePercentage,
        });
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(15200);
      });
    });

    describe('when salary and workDaysCount was provided', () => {
      it('should calculate hourlyRate, dailyRate and invoiceValue', () => {
        const salary = 16800;
        const workDaysCount = 18;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
          workDaysCount,
        });
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(14400);
      });
    });

    describe('when salary, workDaysCount and sickDaysCount was provided', () => {
      it('should calculate hourlyRate, dailyRate and invoiceValue', () => {
        const salary = 16800;
        const sickDaysCount = 5;
        const workDaysCount = 18;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
          sickDaysCount,
          workDaysCount,
        });
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(13600);
      });
    });

    describe('when salary, workDaysCount, sickDailyRatePercentage and sickDaysCount was provided', () => {
      it('should calculate hourlyRate, dailyRate and invoiceValue', () => {
        const salary = 16800;
        const sickDaysCount = 5;
        const sickDailyRatePercentage = 60;
        const workDaysCount = 18;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
          sickDaysCount,
          sickDailyRatePercentage,
          workDaysCount,
        });
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(12800);
      });
    });
  });

  describe('incorrect data', () => {
    describe('when sickDaysCount is bigger than workDaysCount', () => {
      it('should set sickDaysCount to workDaysCount', () => {
        const salary = 16800;
        const sickDaysCount = 18;
        const workDaysCount = 5;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
          sickDaysCount,
          workDaysCount,
        });
        expect(sickDaysCount).toBeGreaterThan(workDaysCount);
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(3200);
      });
    });

    describe('when workDaysCount, sickDailyRatePercentage or sickDaysCount exceed reasonable values', () => {
      it('should clamp too small values', () => {
        const salary = 16800;
        const sickDaysCount = -1;
        const sickDailyRatePercentage = -1;
        const workDaysCount = -1;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
          sickDaysCount,
          sickDailyRatePercentage,
          workDaysCount,
        });
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(0);
      });

      it('should clamp too big values', () => {
        const salary = 16800;
        const sickDaysCount = 22;
        const sickDailyRatePercentage = 101;
        const workDaysCount = 22;
        const { hourlyRate, dailyRate, invoiceValue } = new SalaryCalculator({
          salary,
          sickDaysCount,
          sickDailyRatePercentage,
          workDaysCount,
        });
        expect(hourlyRate).toBe(100);
        expect(dailyRate).toBe(800);
        expect(invoiceValue).toBe(16800);
      });
    });
  });
});
