import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";

const Saved = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState("grid");

  // In a real app, this would load from localStorage or API
  useEffect(() => {
    // Simulate loading saved properties
    setSavedProperties([]);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">
                Saved Properties
              </h1>
              <p className="text-slate-600">
                Properties you've saved for later viewing
              </p>
            </div>
            
            <div className="flex items-center">
              <ApperIcon name="Heart" size={24} className="text-red-500" />
            </div>
          </div>
        </motion.div>

        {/* Empty State for Saved Properties */}
        <Empty
          title="No saved properties yet"
          message="Start browsing properties and save your favorites to see them here. Click the heart icon on any property to add it to your saved list."
          showBrowseButton={true}
        />
      </div>
    </div>
  );
};

export default Saved;