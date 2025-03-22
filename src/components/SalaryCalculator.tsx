
import { useState, useEffect } from "react";
import InputField from "./InputField";
import CalcCard from "./CalcCard";
import ResultsDisplay from "./ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateSalary, SalaryResult, PayPeriod, SalaryData } from "@/lib/calculator";
import { toast } from "sonner";
import { RotateCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const INITIAL_SALARY: SalaryData = {
  amount: 0,
  period: "hourly",
  hoursPerDay: 8,
  daysPerWeek: 5,
  weeksPerYear: 52,
};

const SalaryCalculator = () => {
  const [salary, setSalary] = useState<SalaryData>(INITIAL_SALARY);
  const [calculatedSalary, setCalculatedSalary] = useState<SalaryResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Recalculate when salary changes
  useEffect(() => {
    if (salary.amount > 0) {
      handleCalculate();
    }
  }, [salary.period, salary.hoursPerDay, salary.daysPerWeek, salary.weeksPerYear]);

  const handleCalculate = () => {
    if (salary.amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsCalculating(true);
    
    // Add a slight delay to show the animation
    setTimeout(() => {
      try {
        const result = calculateSalary(salary);
        setCalculatedSalary(result);
      } catch (error) {
        toast.error("Error calculating salary");
        console.error(error);
      } finally {
        setIsCalculating(false);
      }
    }, 300);
  };

  const handleReset = () => {
    setSalary(INITIAL_SALARY);
    setCalculatedSalary(null);
    toast.success("Calculator has been reset");
  };

  const handleSalaryChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setSalary((prev) => ({ ...prev, amount: numValue }));
  };

  const handlePeriodChange = (value: string) => {
    setSalary((prev) => ({ ...prev, period: value as PayPeriod }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <CalcCard title="Salary Details">
        <div className="grid gap-6 sm:grid-cols-2">
          <InputField
            id="salary-amount"
            label="Salary Amount"
            value={salary.amount || ""}
            onChange={handleSalaryChange}
            type="number"
            placeholder="Enter amount"
            prefix="$"
            min={0}
            required
          />

          <div className="space-y-1.5">
            <Label htmlFor="pay-period" className="text-sm font-medium">
              Pay Period
            </Label>
            <Select
              value={salary.period}
              onValueChange={handlePeriodChange}
            >
              <SelectTrigger id="pay-period" className="w-full">
                <SelectValue placeholder="Select pay period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-primary hover:underline focus:outline-none"
          >
            {showAdvanced ? "Hide" : "Show"} advanced options
          </button>
        </div>

        {showAdvanced && (
          <div className="mt-4 pt-4 border-t animate-fade-in">
            <div className="grid gap-4 sm:grid-cols-3">
              <InputField
                id="hours-per-day"
                label="Hours per day"
                value={salary.hoursPerDay || ""}
                onChange={(value) =>
                  setSalary((prev) => ({
                    ...prev,
                    hoursPerDay: parseFloat(value) || 8,
                  }))
                }
                type="number"
                min={1}
                max={24}
              />
              <InputField
                id="days-per-week"
                label="Days per week"
                value={salary.daysPerWeek || ""}
                onChange={(value) =>
                  setSalary((prev) => ({
                    ...prev,
                    daysPerWeek: parseFloat(value) || 5,
                  }))
                }
                type="number"
                min={1}
                max={7}
              />
              <InputField
                id="weeks-per-year"
                label="Weeks per year"
                value={salary.weeksPerYear || ""}
                onChange={(value) =>
                  setSalary((prev) => ({
                    ...prev,
                    weeksPerYear: parseFloat(value) || 52,
                  }))
                }
                type="number"
                min={1}
                max={52}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end space-x-2 mt-6">
          <Button
            variant="outline"
            onClick={handleReset}
            className="animate-click"
          >
            Reset
          </Button>
          <Button
            onClick={handleCalculate}
            disabled={isCalculating || salary.amount <= 0}
            className="animate-click relative overflow-hidden"
          >
            {isCalculating ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Calculate"
            )}
          </Button>
        </div>
      </CalcCard>

      {calculatedSalary && (
        <ResultsDisplay
          results={calculatedSalary}
          activePeriod={salary.period}
          className="animate-slide-up"
        />
      )}
    </div>
  );
};

export default SalaryCalculator;
