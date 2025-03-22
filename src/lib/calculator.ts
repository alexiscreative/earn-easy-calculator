
// Types for calculation
export type PayPeriod = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'annually';

export interface SalaryData {
  amount: number;
  period: PayPeriod;
  hoursPerDay?: number;
  daysPerWeek?: number;
  weeksPerYear?: number;
}

export interface SalaryResult {
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
  annually: number;
}

// Default values
const DEFAULT_HOURS_PER_DAY = 8;
const DEFAULT_DAYS_PER_WEEK = 5;
const DEFAULT_WEEKS_PER_YEAR = 52;
const MONTHS_PER_YEAR = 12;

// Calculate all salary conversions
export function calculateSalary(data: SalaryData): SalaryResult {
  const {
    amount,
    period,
    hoursPerDay = DEFAULT_HOURS_PER_DAY,
    daysPerWeek = DEFAULT_DAYS_PER_WEEK,
    weeksPerYear = DEFAULT_WEEKS_PER_YEAR,
  } = data;

  // Calculate hourly rate first
  let hourlyRate: number;

  switch (period) {
    case 'hourly':
      hourlyRate = amount;
      break;
    case 'daily':
      hourlyRate = amount / hoursPerDay;
      break;
    case 'weekly':
      hourlyRate = amount / (hoursPerDay * daysPerWeek);
      break;
    case 'monthly':
      hourlyRate = amount / (hoursPerDay * daysPerWeek * weeksPerYear / MONTHS_PER_YEAR);
      break;
    case 'annually':
      hourlyRate = amount / (hoursPerDay * daysPerWeek * weeksPerYear);
      break;
    default:
      hourlyRate = 0;
  }

  // Calculate all other rates based on hourly
  const dailyRate = hourlyRate * hoursPerDay;
  const weeklyRate = dailyRate * daysPerWeek;
  const monthlyRate = (weeklyRate * weeksPerYear) / MONTHS_PER_YEAR;
  const annualRate = monthlyRate * MONTHS_PER_YEAR;

  return {
    hourly: hourlyRate,
    daily: dailyRate,
    weekly: weeklyRate,
    monthly: monthlyRate,
    annually: annualRate,
  };
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
