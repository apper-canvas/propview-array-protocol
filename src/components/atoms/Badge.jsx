import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  size = "md",
  className,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200";
  
  const variants = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-gradient-to-r from-primary to-blue-700 text-white shadow-sm",
    accent: "bg-gradient-to-r from-accent to-orange-500 text-white shadow-sm",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800"
  };
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;