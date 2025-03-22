
import { useState, useEffect } from "react";
import InputField from "./InputField";
import CalcCard from "./CalcCard";
import UKResultsDisplay from "./UKResultsDisplay";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateUKTax, TaxResult, PayPeriod, SalaryData } from "@/lib/ukTaxCalculator";
import { toast } from "sonner";
import { RotateCw, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const INITIAL_SALARY: SalaryData = {
  amount: 0,
  period: "annually",
  isScotlandResident: false,
  taxCode: "1257L",
  studentLoan: false,
  bonus: 0,
  overtime: 0,
  taxableBenefits: 0,
  pension: 0,
};

const UKSalaryCalculator = () => {
  const [salary, setSalary] = useState<SalaryData>(INITIAL_SALARY);
  const [calculatedResult, setCalculatedResult] = useState<TaxResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Track open/closed state of collapsible sections
  const [openSections, setOpenSections] = useState({
    bonus: false,
    overtime: false,
    benefits: false,
    pension: false,
    taxCode: false,
    studentLoan: false,
  });

  // Recalculate when salary changes
  useEffect(() => {
    if (salary.amount > 0) {
      handleCalculate();
    }
  }, [
    salary.period, 
    salary.isScotlandResident
  ]);

  const handleCalculate = () => {
    if (salary.amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsCalculating(true);
    
    // Add a slight delay to show the animation
    setTimeout(() => {
      try {
        const result = calculateUKTax(salary);
        setCalculatedResult(result);
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
    setCalculatedResult(null);
    toast.success("Calculator has been reset");
  };

  const handleSalaryChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setSalary((prev) => ({ ...prev, amount: numValue }));
  };

  const handlePeriodChange = (value: string) => {
    setSalary((prev) => ({ ...prev, period: value as PayPeriod }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {calculatedResult && (
        <UKResultsDisplay
          results={calculatedResult}
          period={salary.period}
          className="animate-slide-up"
        />
      )}

      <div className="text-center space-y-2 text-muted-foreground">
        <p>Drop in your salary details below! Only have your basic salary info to hand?</p>
        <p>No worries, fill it in and the calculator will determine the most accurate take-home outcome possible.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CalcCard title="Salary" 
          headerClassName="flex items-center justify-between"
          contentClassName="space-y-4"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="pay-period" className="text-sm font-medium">
                Pay Period
              </Label>
              <Select
                value={salary.period}
                onValueChange={handlePeriodChange}
              >
                <SelectTrigger id="pay-period" className="w-[160px]">
                  <SelectValue placeholder="Select pay period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annually">Per annum</SelectItem>
                  <SelectItem value="monthly">Per month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative">
              <InputField
                id="salary-amount"
                label="Basic Salary"
                value={salary.amount || ""}
                onChange={handleSalaryChange}
                type="number"
                placeholder="e.g. 40,000"
                prefix="£"
                min={0}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="scotland-resident" 
                checked={salary.isScotlandResident}
                onCheckedChange={(checked) => 
                  setSalary(prev => ({ ...prev, isScotlandResident: checked === true }))
                }
              />
              <label
                htmlFor="scotland-resident"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Resident in Scotland?
              </label>
            </div>

            <Collapsible 
              open={openSections.taxCode} 
              onOpenChange={() => toggleSection('taxCode')}
              className="border rounded-md p-2"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Tax code</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Your tax code determines your Personal Allowance.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {openSections.taxCode ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <InputField
                  id="tax-code"
                  label="Tax code"
                  value={salary.taxCode || ""}
                  onChange={(value) =>
                    setSalary((prev) => ({
                      ...prev,
                      taxCode: value,
                    }))
                  }
                  type="text"
                  placeholder="e.g. 1257L"
                />
              </CollapsibleContent>
            </Collapsible>

            <Collapsible 
              open={openSections.studentLoan} 
              onOpenChange={() => toggleSection('studentLoan')}
              className="border rounded-md p-2"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Student Loan</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Student loan repayments are deducted from your salary.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {openSections.studentLoan ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="student-loan" 
                    checked={salary.studentLoan}
                    onCheckedChange={(checked) => 
                      setSalary(prev => ({ ...prev, studentLoan: checked === true }))
                    }
                  />
                  <label
                    htmlFor="student-loan"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have a student loan
                  </label>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CalcCard>

        <div className="space-y-6">
          <CalcCard title="Bonus" 
            headerClassName="flex items-center justify-between"
            contentClassName="space-y-4"
          >
            <Collapsible 
              open={openSections.bonus} 
              onOpenChange={() => toggleSection('bonus')}
              className="w-full"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Add bonus payments</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Add any bonus payments you expect to receive.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {openSections.bonus ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <InputField
                  id="bonus-amount"
                  label="Annual bonus"
                  value={salary.bonus || ""}
                  onChange={(value) =>
                    setSalary((prev) => ({
                      ...prev,
                      bonus: parseFloat(value) || 0,
                    }))
                  }
                  type="number"
                  placeholder="e.g. 5000"
                  prefix="£"
                  min={0}
                />
              </CollapsibleContent>
            </Collapsible>
          </CalcCard>

          <CalcCard title="Overtime" 
            headerClassName="flex items-center justify-between"
            contentClassName="space-y-4"
          >
            <Collapsible 
              open={openSections.overtime} 
              onOpenChange={() => toggleSection('overtime')}
              className="w-full"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Add overtime payments</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Add any expected overtime earnings.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {openSections.overtime ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <InputField
                  id="overtime-amount"
                  label="Annual overtime"
                  value={salary.overtime || ""}
                  onChange={(value) =>
                    setSalary((prev) => ({
                      ...prev,
                      overtime: parseFloat(value) || 0,
                    }))
                  }
                  type="number"
                  placeholder="e.g. 2000"
                  prefix="£"
                  min={0}
                />
              </CollapsibleContent>
            </Collapsible>
          </CalcCard>

          <CalcCard title="Taxable benefits" 
            headerClassName="flex items-center justify-between"
            contentClassName="space-y-4"
          >
            <Collapsible 
              open={openSections.benefits} 
              onOpenChange={() => toggleSection('benefits')}
              className="w-full"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Add taxable benefits</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Include benefits like company car, private healthcare, etc.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {openSections.benefits ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <InputField
                  id="benefits-amount"
                  label="Value of taxable benefits"
                  value={salary.taxableBenefits || ""}
                  onChange={(value) =>
                    setSalary((prev) => ({
                      ...prev,
                      taxableBenefits: parseFloat(value) || 0,
                    }))
                  }
                  type="number"
                  placeholder="e.g. 3000"
                  prefix="£"
                  min={0}
                />
              </CollapsibleContent>
            </Collapsible>
          </CalcCard>

          <CalcCard title="Pension" 
            headerClassName="flex items-center justify-between"
            contentClassName="space-y-4"
          >
            <Collapsible 
              open={openSections.pension} 
              onOpenChange={() => toggleSection('pension')}
              className="w-full"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Add pension contributions</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Enter your pension contribution percentage.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {openSections.pension ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <InputField
                  id="pension-amount"
                  label="Pension contribution"
                  value={salary.pension || ""}
                  onChange={(value) =>
                    setSalary((prev) => ({
                      ...prev,
                      pension: parseFloat(value) || 0,
                    }))
                  }
                  type="number"
                  placeholder="e.g. 5"
                  suffix="%"
                  min={0}
                  max={100}
                />
              </CollapsibleContent>
            </Collapsible>
          </CalcCard>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mt-8">
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
          className="animate-click px-8 py-6 text-lg"
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
    </div>
  );
};

export default UKSalaryCalculator;
