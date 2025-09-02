import ApperIcon from "@/components/ApperIcon";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-48 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Property Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse"></div>
            <div className="p-5 space-y-3">
              <div className="flex space-x-2">
                <div className="h-5 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-pulse"></div>
                <div className="h-5 w-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-pulse"></div>
              </div>
              <div className="h-5 w-3/4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              <div className="h-6 w-32 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded animate-pulse"></div>
              <div className="flex justify-between pt-2">
                <div className="h-4 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-full bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-3 text-primary">
          <ApperIcon name="Loader2" size={24} className="animate-spin" />
          <span className="text-lg font-medium">Loading properties...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;