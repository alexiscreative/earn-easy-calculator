
import { SalaryResult, formatCurrency, PayPeriod } from "@/lib/calculator";
import CalcCard from "./CalcCard";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
  results: SalaryResult | null;
  className?: string;
  activePeriod: PayPeriod;
}

// Custom wrapper for framer-motion since we're using React strict mode
const MotionDiv = motion.div;

const ResultsDisplay = ({ results, className, activePeriod }: ResultsDisplayProps) => {
  if (!results) return null;

  const periods: { label: string; value: keyof SalaryResult; period: PayPeriod }[] = [
    { label: "Hourly", value: "hourly", period: "hourly" },
    { label: "Daily", value: "daily", period: "daily" },
    { label: "Weekly", value: "weekly", period: "weekly" },
    { label: "Monthly", value: "monthly", period: "monthly" },
    { label: "Annually", value: "annually", period: "annually" },
  ];

  const resultCards = periods.map((period) => ({
    ...period,
    amount: results[period.value],
  }));

  return (
    <div className={cn("space-y-6", className)}>
      <CalcCard title="Salary Breakdown" className="animate-fade-in">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resultCards.map((card, index) => (
            <MotionDiv
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col"
            >
              <div
                className={cn(
                  "flex flex-col justify-between p-4 h-full rounded-lg border transition-all duration-300",
                  card.period === activePeriod
                    ? "bg-primary/5 border-primary shadow-sm"
                    : "bg-background/50 hover:bg-background/80 border-border"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </h3>
                  {card.period === activePeriod && (
                    <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                      Input
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold tracking-tight">
                  {formatCurrency(card.amount)}
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </CalcCard>
    </div>
  );
};

export default ResultsDisplay;
