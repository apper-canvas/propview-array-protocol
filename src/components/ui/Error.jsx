import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-full p-6 mb-6">
        <ApperIcon name="AlertTriangle" size={48} className="text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold font-display text-slate-900 mb-3">
        Oops! Something went wrong
      </h2>
      
      <p className="text-slate-600 text-center mb-6 max-w-md">
        {message}. Please check your connection and try again.
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" size={18} className="mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;