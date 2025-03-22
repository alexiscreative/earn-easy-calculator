
import { TaxResult, formatCurrency, PayPeriod } from "@/lib/ukTaxCalculator";
import CalcCard from "./CalcCard";
import { cn } from "@/lib/utils";

interface UKResultsDisplayProps {
  results: TaxResult;
  period: PayPeriod;
  className?: string;
}

const UKResultsDisplay = ({ results, period, className }: UKResultsDisplayProps) => {
  if (!results) return null;

  const items = [
    { label: "Take home", value: results.takeHome },
    { label: "Gross", value: results.gross },
    { label: "Taxable income", value: results.taxableIncome },
    { label: "Tax", value: results.tax },
    { label: "National insurance", value: results.nationalInsurance },
  ];

  return (
    <div className={cn("w-full border rounded-lg p-4 bg-card", className)}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <div key={item.label} className="flex flex-col space-y-1">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <div className="flex items-center">
              <span className="text-xl font-semibold">
                {formatCurrency(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-right">
        <span className="text-sm text-muted-foreground">
          {period === 'monthly' ? 'Per month' : 'Per annum'}
        </span>
      </div>
    </div>
  );
};

export default UKResultsDisplay;
