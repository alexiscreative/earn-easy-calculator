
// Types for UK tax calculation
export type PayPeriod = 'monthly' | 'annually';

export interface SalaryData {
  amount: number;
  period: PayPeriod;
  isScotlandResident?: boolean;
  taxCode?: string;
  studentLoan?: boolean;
  bonus?: number;
  overtime?: number;
  taxableBenefits?: number;
  pension?: number;
}

export interface TaxResult {
  takeHome: number;
  gross: number;
  taxableIncome: number;
  tax: number;
  nationalInsurance: number;
}

// Tax rates and thresholds for UK 2023/2024
const TAX_THRESHOLDS = {
  PERSONAL_ALLOWANCE: 12570,
  BASIC_RATE_THRESHOLD: 50270,
  HIGHER_RATE_THRESHOLD: 125140,
};

const TAX_RATES = {
  BASIC_RATE: 0.2,
  HIGHER_RATE: 0.4,
  ADDITIONAL_RATE: 0.45,
};

const NI_THRESHOLDS = {
  PRIMARY_THRESHOLD: 12570,
  UPPER_THRESHOLD: 50270,
};

const NI_RATES = {
  MAIN_RATE: 0.12,
  HIGHER_RATE: 0.02,
};

// Calculate UK tax and National Insurance
export function calculateUKTax(data: SalaryData): TaxResult {
  const {
    amount,
    period,
    isScotlandResident = false,
    taxCode = '1257L',
    studentLoan = false,
    bonus = 0,
    overtime = 0,
    taxableBenefits = 0,
    pension = 0,
  } = data;

  // Calculate annual gross income
  const annualAmount = period === 'monthly' ? amount * 12 : amount;
  const totalGross = annualAmount + bonus + overtime;
  
  // Calculate pension deduction (before tax)
  const pensionDeduction = totalGross * (pension / 100);
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, totalGross - pensionDeduction + taxableBenefits - TAX_THRESHOLDS.PERSONAL_ALLOWANCE);
  
  // Calculate income tax
  let tax = 0;
  if (taxableIncome > 0) {
    if (taxableIncome <= (TAX_THRESHOLDS.BASIC_RATE_THRESHOLD - TAX_THRESHOLDS.PERSONAL_ALLOWANCE)) {
      tax = taxableIncome * TAX_RATES.BASIC_RATE;
    } else if (taxableIncome <= (TAX_THRESHOLDS.HIGHER_RATE_THRESHOLD - TAX_THRESHOLDS.PERSONAL_ALLOWANCE)) {
      const basicRateTax = (TAX_THRESHOLDS.BASIC_RATE_THRESHOLD - TAX_THRESHOLDS.PERSONAL_ALLOWANCE) * TAX_RATES.BASIC_RATE;
      const higherRateTax = (taxableIncome - (TAX_THRESHOLDS.BASIC_RATE_THRESHOLD - TAX_THRESHOLDS.PERSONAL_ALLOWANCE)) * TAX_RATES.HIGHER_RATE;
      tax = basicRateTax + higherRateTax;
    } else {
      const basicRateTax = (TAX_THRESHOLDS.BASIC_RATE_THRESHOLD - TAX_THRESHOLDS.PERSONAL_ALLOWANCE) * TAX_RATES.BASIC_RATE;
      const higherRateTax = (TAX_THRESHOLDS.HIGHER_RATE_THRESHOLD - TAX_THRESHOLDS.BASIC_RATE_THRESHOLD) * TAX_RATES.HIGHER_RATE;
      const additionalRateTax = (taxableIncome - (TAX_THRESHOLDS.HIGHER_RATE_THRESHOLD - TAX_THRESHOLDS.PERSONAL_ALLOWANCE)) * TAX_RATES.ADDITIONAL_RATE;
      tax = basicRateTax + higherRateTax + additionalRateTax;
    }
  }
  
  // Calculate National Insurance
  let ni = 0;
  const niableIncome = totalGross - pensionDeduction;
  
  if (niableIncome > NI_THRESHOLDS.PRIMARY_THRESHOLD) {
    if (niableIncome <= NI_THRESHOLDS.UPPER_THRESHOLD) {
      ni = (niableIncome - NI_THRESHOLDS.PRIMARY_THRESHOLD) * NI_RATES.MAIN_RATE;
    } else {
      const mainRateNI = (NI_THRESHOLDS.UPPER_THRESHOLD - NI_THRESHOLDS.PRIMARY_THRESHOLD) * NI_RATES.MAIN_RATE;
      const higherRateNI = (niableIncome - NI_THRESHOLDS.UPPER_THRESHOLD) * NI_RATES.HIGHER_RATE;
      ni = mainRateNI + higherRateNI;
    }
  }
  
  // Calculate student loan repayments (simplified)
  let studentLoanRepayment = 0;
  if (studentLoan && totalGross > 27295) {
    studentLoanRepayment = (totalGross - 27295) * 0.09;
  }
  
  // Calculate take-home pay
  const takeHome = totalGross - tax - ni - pensionDeduction - studentLoanRepayment;
  
  // For monthly results, divide by 12
  const periodMultiplier = period === 'monthly' ? 1/12 : 1;
  
  return {
    takeHome: takeHome * periodMultiplier,
    gross: totalGross * periodMultiplier,
    taxableIncome: (totalGross - pensionDeduction + taxableBenefits) * periodMultiplier,
    tax: tax * periodMultiplier,
    nationalInsurance: ni * periodMultiplier,
  };
}

// Format currency for display (GBP)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
