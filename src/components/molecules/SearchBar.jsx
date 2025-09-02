import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, placeholder = "Search by address, city, or zip code..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full max-w-2xl">
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" 
        />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-12 py-3 bg-white/80 backdrop-blur-sm border-slate-200 focus:bg-white"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ApperIcon name="X" size={18} />
          </button>
        )}
      </div>
      <Button 
        type="submit" 
        className="ml-3 px-6 py-3"
        disabled={!searchTerm.trim()}
      >
        <ApperIcon name="Search" size={18} className="mr-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;