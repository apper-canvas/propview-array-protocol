import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import FilterSection from "@/components/molecules/FilterSection";
import PriceRange from "@/components/molecules/PriceRange";

const FilterSidebar = ({ filters, onFiltersChange, isOpen, onClose }) => {
  const [localFilters, setLocalFilters] = useState({
    priceRange: { min: 0, max: 2000000 },
    propertyTypes: [],
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    location: "",
    ...filters
  });

  useEffect(() => {
    onFiltersChange(localFilters);
  }, [localFilters, onFiltersChange]);

  const handlePriceRangeChange = (range) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  const handlePropertyTypeToggle = (type) => {
    setLocalFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceRange: { min: 0, max: 2000000 },
      propertyTypes: [],
      bedrooms: "",
      bathrooms: "",
      squareFeet: "",
      location: ""
    };
    setLocalFilters(clearedFilters);
  };

  const propertyTypes = [
    "Single Family",
    "Condo",
    "Townhouse",
    "Multi-Family",
    "Luxury",
    "Commercial"
  ];

  const bedroomOptions = ["1", "2", "3", "4", "5+"];
  const bathroomOptions = ["1", "1.5", "2", "2.5", "3", "3.5", "4+"];

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
        <h2 className="text-lg font-semibold font-display text-slate-900">
          Filter Properties
        </h2>
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ApperIcon name="X" size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-1">
          {/* Price Range */}
          <FilterSection title="Price Range" defaultOpen>
            <PriceRange
              value={localFilters.priceRange}
              onChange={handlePriceRangeChange}
            />
          </FilterSection>

          {/* Property Type */}
          <FilterSection title="Property Type" defaultOpen>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handlePropertyTypeToggle(type)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    localFilters.propertyTypes.includes(type)
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Bedrooms & Bathrooms */}
          <FilterSection title="Bedrooms & Bathrooms">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bedrooms
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {bedroomOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setLocalFilters(prev => ({
                        ...prev,
                        bedrooms: prev.bedrooms === option ? "" : option
                      }))}
                      className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        localFilters.bedrooms === option
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-slate-600 border-slate-200 hover:border-primary"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bathrooms
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bathroomOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setLocalFilters(prev => ({
                        ...prev,
                        bathrooms: prev.bathrooms === option ? "" : option
                      }))}
                      className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        localFilters.bathrooms === option
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-slate-600 border-slate-200 hover:border-primary"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Square Footage */}
          <FilterSection title="Square Footage">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Minimum Square Feet
              </label>
              <Input
                type="number"
                placeholder="e.g., 1500"
                value={localFilters.squareFeet}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  squareFeet: e.target.value
                }))}
              />
            </div>
          </FilterSection>

          {/* Location */}
          <FilterSection title="Location">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                City or Zip Code
              </label>
              <Input
                type="text"
                placeholder="e.g., San Francisco or 94102"
                value={localFilters.location}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  location: e.target.value
                }))}
              />
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="p-6 border-t border-slate-200 bg-white">
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full"
        >
          <ApperIcon name="RotateCcw" size={18} className="mr-2" />
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-slate-200 h-screen sticky top-20 overflow-hidden">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl"
          >
            {sidebarContent}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;