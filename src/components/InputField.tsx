
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
}

const InputField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  prefix,
  suffix,
  min,
  max,
  step,
  required = false,
  disabled = false,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={cn(
        "relative transition-all duration-300 ease-in-out",
        className,
        isFocused ? "scale-[1.02]" : "scale-100"
      )}
    >
      <Label
        htmlFor={id}
        className={cn(
          "text-sm font-medium transition-all duration-300",
          hasValue || isFocused
            ? "text-primary"
            : "text-muted-foreground",
          isFocused ? "scale-105" : "scale-100"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div
        className={cn(
          "flex items-center relative mt-1.5 rounded-md border",
          isFocused
            ? "border-primary shadow-sm ring-1 ring-primary/20"
            : "border-input",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {prefix && (
          <div className="pl-3 text-muted-foreground pointer-events-none">
            {prefix}
          </div>
        )}
        <Input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          required={required}
          className={cn(
            "border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            prefix && "pl-1",
            suffix && "pr-1"
          )}
        />
        {suffix && (
          <div className="pr-3 text-muted-foreground pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
