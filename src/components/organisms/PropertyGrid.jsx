import { motion, AnimatePresence } from "framer-motion";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const PropertyGrid = ({ 
  properties = [], 
  loading = false, 
  error = null, 
  onRetry,
  layout = "grid",
  onLayoutChange 
}) => {
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={onRetry} />;
  if (!properties.length) return <Empty />;

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {properties.length} Properties Found
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={layout === "grid" ? "primary" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("grid")}
          >
            <ApperIcon name="Grid3x3" size={18} />
          </Button>
          <Button
            variant={layout === "list" ? "primary" : "outline"}
            size="sm"
            onClick={() => onLayoutChange("list")}
          >
            <ApperIcon name="List" size={18} />
          </Button>
        </div>
      </div>

      {/* Properties Grid/List */}
      <AnimatePresence mode="wait">
        {layout === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard property={property} layout="grid" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PropertyCard property={property} layout="list" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyGrid;