
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CalcCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  animate?: boolean;
}

const CalcCard = ({
  title,
  children,
  className,
  contentClassName,
  headerClassName,
  animate = true,
}: CalcCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden glass-card transition-all duration-500",
        animate && "animate-slide-up hover:shadow-xl",
        className
      )}
    >
      {title && (
        <CardHeader className={cn("pb-2", headerClassName)}>
          <CardTitle className="text-xl font-medium tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("pt-4", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default CalcCard;
