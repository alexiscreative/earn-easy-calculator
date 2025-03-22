
import { useEffect } from "react";
import Header from "@/components/Header";
import UKSalaryCalculator from "@/components/UKSalaryCalculator";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header
            title="Salary calculator"
            subtitle="Calculate take home pay UK"
            description="Use the take home salary calculator to work out your net income earnings after deductions"
            icon="💰"
          />
        </MotionDiv>

        <UKSalaryCalculator />
      </div>
    </div>
  );
};

export default Index;
