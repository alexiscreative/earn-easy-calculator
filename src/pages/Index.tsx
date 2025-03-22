
import { useEffect } from "react";
import Header from "@/components/Header";
import SalaryCalculator from "@/components/SalaryCalculator";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to make it more fluid
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
  
  // Add framer-motion wrapper
  const MotionDiv = motion.div;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header
            title="Salary Calculator"
            subtitle="Convert between hourly, daily, weekly, monthly, and annual pay rates with our easy-to-use calculator."
          />
        </MotionDiv>

        <SalaryCalculator />

        <Separator className="my-16 opacity-50" />

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <div className="space-y-2">
            <Badge variant="outline" className="mb-2">Usage Guide</Badge>
            <h2 className="text-2xl font-bold tracking-tight">How to Use This Calculator</h2>
            <p className="text-muted-foreground">
              Simply enter your salary amount, select the pay period, and instantly see your equivalent pay across different time periods.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left mt-8">
            <div className="glass-card p-4 rounded-lg">
              <h3 className="font-medium mb-2">Enter Your Salary</h3>
              <p className="text-sm text-muted-foreground">
                Input your current salary amount in the designated field.
              </p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <h3 className="font-medium mb-2">Select Pay Period</h3>
              <p className="text-sm text-muted-foreground">
                Choose whether your input is hourly, daily, weekly, monthly, or annual.
              </p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <h3 className="font-medium mb-2">Customize Work Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Adjust hours per day, days per week, and weeks per year in advanced options if needed.
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Index;
