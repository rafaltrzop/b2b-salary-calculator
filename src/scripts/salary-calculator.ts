import { add, divide, multiply } from 'mathjs';

export class SalaryCalculator {
  constructor(
    private salary: number,
    private sickDailyRatePercentage: number = 80,
    private sickDaysCount: number = 0,
    private workDaysCount: number = 21
  ) {}

  get hourlyRate(): number {
    return divide(this.salary, 168);
  }

  get dailyRate(): number {
    return divide(this.salary, 21);
  }

  get invoiceValue(): number {
    return add(
      multiply(this.normalDaysCount, this.dailyRate),
      multiply(this.sickDaysCount, this.sickDailyRate)
    ) as number;
  }

  private get sickDailyRate(): number {
    return multiply(this.dailyRate, this.sickDailyRateFactor);
  }

  private get sickDailyRateFactor(): number {
    return divide(this.sickDailyRatePercentage, 100);
  }

  private get normalDaysCount(): number {
    if (this.workDaysCount < this.sickDaysCount) {
      this.sickDaysCount = this.workDaysCount;
    }
    return this.workDaysCount - this.sickDaysCount;
  }
}
