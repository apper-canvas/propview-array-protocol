import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  children,
  className,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 border rounded-lg text-slate-900 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzY0NzQ4QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-no-repeat bg-right-4 bg-center";
  
  const errorStyles = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
    : "border-slate-300 focus:border-primary focus:ring-primary/20 hover:border-slate-400";
  
  return (
    <select
      ref={ref}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;