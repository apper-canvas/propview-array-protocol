import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-700 text-white hover:from-blue-700 hover:to-primary shadow-md hover:shadow-lg focus:ring-primary",
    secondary: "border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white focus:ring-primary",
    accent: "bg-gradient-to-r from-accent to-orange-500 text-white hover:from-orange-500 hover:to-accent shadow-md hover:shadow-lg focus:ring-accent",
    outline: "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-200",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-200"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;