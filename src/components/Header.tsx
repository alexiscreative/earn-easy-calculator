
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  icon?: string;
}

const Header = ({ title, subtitle, description, className, icon }: HeaderProps) => {
  return (
    <div className={cn("text-center mb-8 space-y-2", className)}>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl flex items-center justify-center gap-2 animate-slide-down">
        {title}
        {icon && <span role="img" aria-label="Money bag">{icon}</span>}
      </h1>
      {subtitle && (
        <h2 className="text-2xl font-semibold text-primary animate-fade-in">
          {subtitle}
        </h2>
      )}
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          {description}
        </p>
      )}
    </div>
  );
};

export default Header;
