import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No properties found", 
  message = "Try adjusting your filters or search terms to find more properties.",
  showBrowseButton = true 
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-full p-8 mb-6">
        <ApperIcon name="Home" size={64} className="text-slate-400" />
      </div>
      
      <h2 className="text-2xl font-bold font-display text-slate-900 mb-3">
        {title}
      </h2>
      
      <p className="text-slate-600 text-center mb-8 max-w-md">
        {message}
      </p>
      
      {showBrowseButton && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => window.location.reload()} variant="outline">
            <ApperIcon name="RefreshCw" size={18} className="mr-2" />
            Refresh Results
          </Button>
          <Button onClick={() => navigate("/")}>
            <ApperIcon name="Search" size={18} className="mr-2" />
            Browse All Properties
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Empty;