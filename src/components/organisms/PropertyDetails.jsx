import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ImageGallery from "@/components/molecules/ImageGallery";
import { formatDistance } from "date-fns";

const PropertyDetails = ({ property }) => {
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

  const formatDate = (date) => {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  };

  const handleContact = () => {
    // In a real app, this would open a contact form or modal
    alert("Contact functionality would be implemented here");
  };

  const handleSave = () => {
    // In a real app, this would save to user favorites
    alert("Save functionality would be implemented here");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="accent" size="md">
                {property.status}
              </Badge>
              <Badge variant="default" size="md">
                {property.propertyType}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-slate-600 mb-3">
              <ApperIcon name="MapPin" size={20} className="mr-2" />
              <span className="text-lg">
                {property.address}, {property.city}, {property.state} {property.zipCode}
              </span>
            </div>
            <div className="text-4xl font-bold font-display bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {formatPrice(property.price)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSave}>
              <ApperIcon name="Heart" size={20} className="mr-2" />
              Save
            </Button>
            <Button onClick={handleContact}>
              <ApperIcon name="MessageCircle" size={20} className="mr-2" />
              Contact Agent
            </Button>
          </div>
        </div>
        
        {/* Property Stats */}
        <div className="flex items-center gap-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
          <div className="flex items-center">
            <ApperIcon name="Bed" size={24} className="mr-3 text-primary" />
            <div>
              <span className="text-2xl font-bold text-slate-900">{property.bedrooms}</span>
              <span className="ml-2 text-slate-600">Bedrooms</span>
            </div>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Bath" size={24} className="mr-3 text-primary" />
            <div>
              <span className="text-2xl font-bold text-slate-900">{property.bathrooms}</span>
              <span className="ml-2 text-slate-600">Bathrooms</span>
            </div>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Square" size={24} className="mr-3 text-primary" />
            <div>
              <span className="text-2xl font-bold text-slate-900">{formatSquareFeet(property.squareFeet)}</span>
              <span className="ml-2 text-slate-600">Square Feet</span>
            </div>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Calendar" size={24} className="mr-3 text-primary" />
            <div>
              <span className="text-2xl font-bold text-slate-900">{property.yearBuilt}</span>
              <span className="ml-2 text-slate-600">Year Built</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={property.images} title={property.title} />
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-semibold font-display text-slate-900 mb-4">
              About This Property
            </h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-semibold font-display text-slate-900 mb-4">
              Features & Amenities
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {property.features?.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <ApperIcon name="Check" size={16} className="text-green-500 mr-3" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Property Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-32">
            <h3 className="text-lg font-semibold font-display text-slate-900 mb-4">
              Property Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Property Type</span>
                <span className="font-medium text-slate-900">{property.propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Square Footage</span>
                <span className="font-medium text-slate-900">{formatSquareFeet(property.squareFeet)} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Year Built</span>
                <span className="font-medium text-slate-900">{property.yearBuilt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status</span>
                <Badge variant="accent" size="sm">{property.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Listed</span>
                <span className="font-medium text-slate-900">{formatDate(property.listingDate)}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <Button className="w-full mb-3" onClick={handleContact}>
                <ApperIcon name="MessageCircle" size={18} className="mr-2" />
                Contact Agent
              </Button>
              <Button variant="outline" className="w-full" onClick={handleSave}>
                <ApperIcon name="Heart" size={18} className="mr-2" />
                Save Property
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;