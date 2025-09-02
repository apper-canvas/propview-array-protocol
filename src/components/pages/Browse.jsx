import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000000 },
    propertyTypes: [],
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    location: ""
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [layout, setLayout] = useState("grid");

  // Load properties
  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (err) {
      setError(err.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  // Handle search from URL params
  useEffect(() => {
    const searchTerm = searchParams.get("search");
    if (searchTerm) {
      setFilters(prev => ({ ...prev, location: searchTerm }));
    }
  }, [searchParams]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Price range filter
      if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
        return false;
      }

      // Property type filter
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.propertyType)) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms && filters.bedrooms !== "") {
        const bedroomCount = filters.bedrooms === "5+" ? 5 : parseInt(filters.bedrooms);
        if (filters.bedrooms === "5+") {
          if (property.bedrooms < 5) return false;
        } else {
          if (property.bedrooms !== bedroomCount) return false;
        }
      }

      // Bathrooms filter
      if (filters.bathrooms && filters.bathrooms !== "") {
        const bathroomCount = filters.bathrooms === "4+" ? 4 : parseFloat(filters.bathrooms);
        if (filters.bathrooms === "4+") {
          if (property.bathrooms < 4) return false;
        } else {
          if (property.bathrooms !== bathroomCount) return false;
        }
      }

      // Square footage filter
      if (filters.squareFeet && filters.squareFeet !== "") {
        const minSquareFeet = parseInt(filters.squareFeet);
        if (property.squareFeet < minSquareFeet) return false;
      }

      // Location filter
      if (filters.location && filters.location.trim() !== "") {
        const searchTerm = filters.location.toLowerCase().trim();
        const searchableText = `${property.address} ${property.city} ${property.state} ${property.zipCode}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) return false;
      }

      return true;
    });
  }, [properties, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={() => setIsSidebarOpen(true)}
                variant="outline"
                className="w-full"
              >
                <ApperIcon name="Filter" size={18} className="mr-2" />
                Filter & Sort
              </Button>
            </div>

            {/* Property Grid */}
            <PropertyGrid
              properties={filteredProperties}
              loading={loading}
              error={error}
              onRetry={loadProperties}
              layout={layout}
              onLayoutChange={setLayout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;