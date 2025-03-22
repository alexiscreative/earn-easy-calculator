
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header = ({ title, subtitle, className }: HeaderProps) => {
  return (
    <div className={cn("text-center mb-8 space-y-2", className)}>
      <div className="inline-block mb-1 px-3 py-1 bg-primary/10 text-primary font-medium rounded-full text-sm animate-fade-in">
        Calculate Your Earnings
      </div>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl animate-slide-down">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
