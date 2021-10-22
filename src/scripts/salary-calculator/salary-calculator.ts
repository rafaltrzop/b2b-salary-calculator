import { add, divide, multiply } from 'mathjs';

interface SalaryCalculatorOptions {
  salary: number;
  sickDailyRatePercentage?: number;
  sickDaysCount?: number;
  workDaysCount?: number;
}

export class SalaryCalculator {
  private readonly hoursPerMonth = 168;
  private readonly daysPerMonth = 21;

  private salary: number;
  private sickDailyRatePercentage: number;
  private sickDaysCount: number;
  private workDaysCount: number;

  constructor(private options: SalaryCalculatorOptions) {
    this.salary = options.salary;
    this.sickDailyRatePercentage = options.sickDailyRatePercentage ?? 80;
    this.sickDaysCount = options.sickDaysCount ?? 0;
    this.workDaysCount = options.workDaysCount ?? this.daysPerMonth;

    this.sickDailyRatePercentage = this.clamp(
      this.sickDailyRatePercentage,
      0,
      100
    );
    this.sickDaysCount = this.clamp(this.sickDaysCount, 0, this.daysPerMonth);
    this.workDaysCount = this.clamp(this.workDaysCount, 0, this.daysPerMonth);

    if (this.sickDaysCount > this.workDaysCount) {
      this.sickDaysCount = this.workDaysCount;
    }
  }

  get hourlyRate(): number {
    return divide(this.salary, this.hoursPerMonth);
  }

  get dailyRate(): number {
    return divide(this.salary, this.daysPerMonth);
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
    return this.workDaysCount - this.sickDaysCount;
  }

  private clamp(number: number, min: number, max: number): number {
    return Math.max(min, Math.min(number, max));
  }
}
