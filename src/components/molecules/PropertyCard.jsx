import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const PropertyCard = ({ property, layout = "grid" }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat("en-US").format(sqft);
  };

  const handleViewDetails = () => {
    navigate(`/property/${property.Id}`);
  };

  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
      >
        <div className="flex">
          <div className="w-80 h-48 flex-shrink-0">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="accent" size="sm">
                    {property.status}
                  </Badge>
                  <Badge variant="default" size="sm">
                    {property.propertyType}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold font-display text-slate-900 mb-1">
                  {property.title}
                </h3>
                <div className="flex items-center text-slate-600 mb-2">
                  <ApperIcon name="MapPin" size={16} className="mr-1" />
                  <span className="text-sm">
                    {property.address}, {property.city}, {property.state}
                  </span>
                </div>
                <div className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {formatPrice(property.price)}
                </div>
              </div>
              <Button onClick={handleViewDetails} size="sm">
                View Details
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-slate-600">
              <div className="flex items-center">
                <ApperIcon name="Bed" size={18} className="mr-2 text-slate-400" />
                <span className="font-medium">{property.bedrooms}</span>
                <span className="ml-1 text-sm">beds</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" size={18} className="mr-2 text-slate-400" />
                <span className="font-medium">{property.bathrooms}</span>
                <span className="ml-1 text-sm">baths</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Square" size={18} className="mr-2 text-slate-400" />
                <span className="font-medium">{formatSquareFeet(property.squareFeet)}</span>
                <span className="ml-1 text-sm">sq ft</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Calendar" size={18} className="mr-2 text-slate-400" />
                <span className="font-medium">{property.yearBuilt}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -8 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group"
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="accent" size="sm">
            {property.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="default" size="sm">
            {property.propertyType}
          </Badge>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold font-display text-slate-900 mb-1 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center text-slate-600 mb-2">
            <ApperIcon name="MapPin" size={14} className="mr-1" />
            <span className="text-sm line-clamp-1">
              {property.address}, {property.city}, {property.state}
            </span>
          </div>
          <div className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {formatPrice(property.price)}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-slate-600 mb-4">
          <div className="flex items-center text-sm">
            <ApperIcon name="Bed" size={16} className="mr-1 text-slate-400" />
            <span className="font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex items-center text-sm">
            <ApperIcon name="Bath" size={16} className="mr-1 text-slate-400" />
            <span className="font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex items-center text-sm">
            <ApperIcon name="Square" size={16} className="mr-1 text-slate-400" />
            <span className="font-medium">{formatSquareFeet(property.squareFeet)}</span>
          </div>
        </div>
        
        <Button 
          onClick={handleViewDetails} 
          variant="outline" 
          size="sm" 
          className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;