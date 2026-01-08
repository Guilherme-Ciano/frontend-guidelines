import React from "react";
import { cn } from "../../../../utils";
import { CardHeader } from "./CardHeader";
import { CardTitle } from "./CardTitle";
import { CardDescription } from "./CardDescription";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardComponent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
);

CardComponent.displayName = "Card";

export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
