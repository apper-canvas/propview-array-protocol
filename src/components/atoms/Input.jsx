import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text", 
  className,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 border rounded-lg text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white";
  
  const errorStyles = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
    : "border-slate-300 focus:border-primary focus:ring-primary/20 hover:border-slate-400";
  
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;