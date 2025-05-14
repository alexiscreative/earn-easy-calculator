
import React from "react";
import ReactDOM from "react-dom";
import UKSalaryCalculator from "./components/UKSalaryCalculator";
import "./index.css";

// Create a container element for the calculator
const EmbeddedCalculator = () => {
  return (
    <div className="uk-salary-calculator-container">
      <UKSalaryCalculator />
    </div>
  );
};

// Function to initialize the calculator
function initCalculator() {
  console.log("UK Salary Calculator initializing...");
  
  // Find the container element or create one if it doesn't exist
  let containerElement = document.getElementById("uk-salary-calculator-root");
  
  if (!containerElement) {
    console.log("Creating container element...");
    containerElement = document.createElement("div");
    containerElement.id = "uk-salary-calculator-root";
    document.body.appendChild(containerElement);
  }
  
  // Render the calculator
  console.log("Rendering calculator...");
  ReactDOM.render(<EmbeddedCalculator />, containerElement);
}

// Initialize when the page is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCalculator);
} else {
  initCalculator();
}

// Export the component for direct use
export default EmbeddedCalculator;

// Expose the init function globally for manual initialization
(window as any).initUKSalaryCalculator = initCalculator;
