import { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";

const PriceRange = ({ min = 0, max = 2000000, step = 50000, value, onChange }) => {
  const [localMin, setLocalMin] = useState(value?.min || min);
  const [localMax, setLocalMax] = useState(value?.max || max);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange({ min: localMin, max: localMax });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localMin, localMax, onChange]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{formatPrice(localMin)}</span>
        <span>{formatPrice(localMax)}</span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          className="absolute w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          className="absolute w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
      </div>
      
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Min Price
          </label>
          <Input
            type="number"
            value={localMin}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Max Price
          </label>
          <Input
            type="number"
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;