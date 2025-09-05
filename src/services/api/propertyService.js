import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "listing_date_c"}},
          {"field": {"Name": "status_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('property_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data?.length) {
        return [];
      }

      // Transform database fields to match UI expectations
      return response.data.map(property => ({
        Id: property.Id,
        title: property.title_c || '',
        price: parseFloat(property.price_c) || 0,
        address: property.address_c || '',
        city: property.city_c || '',
        state: property.state_c || '',
        zipCode: property.zip_code_c || '',
        propertyType: property.property_type_c || '',
        bedrooms: parseInt(property.bedrooms_c) || 0,
        bathrooms: parseFloat(property.bathrooms_c) || 0,
        squareFeet: parseInt(property.square_feet_c) || 0,
        yearBuilt: parseInt(property.year_built_c) || 0,
        description: property.description_c || '',
        images: property.images_c ? property.images_c.split('\n').filter(img => img.trim()) : [],
        features: property.features_c ? property.features_c.split('\n').filter(feat => feat.trim()) : [],
        listingDate: property.listing_date_c || new Date().toISOString(),
        status: property.status_c || 'For Sale'
      }));
    } catch (error) {
      console.error("Error fetching properties:", error?.response?.data?.message || error);
      toast.error("Failed to load properties");
      return [];
    }
  },

  async getById(id) {
    try {
      await delay(200);

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "property_type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "square_feet_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "features_c"}},
          {"field": {"Name": "listing_date_c"}},
          {"field": {"Name": "status_c"}}
        ]
      };

      const response = await apperClient.getRecordById('property_c', id, params);

      if (!response?.data) {
        throw new Error("Property not found");
      }

      const property = response.data;

      // Transform database fields to match UI expectations
      return {
        Id: property.Id,
        title: property.title_c || '',
        price: parseFloat(property.price_c) || 0,
        address: property.address_c || '',
        city: property.city_c || '',
        state: property.state_c || '',
        zipCode: property.zip_code_c || '',
        propertyType: property.property_type_c || '',
        bedrooms: parseInt(property.bedrooms_c) || 0,
        bathrooms: parseFloat(property.bathrooms_c) || 0,
        squareFeet: parseInt(property.square_feet_c) || 0,
        yearBuilt: parseInt(property.year_built_c) || 0,
        description: property.description_c || '',
        images: property.images_c ? property.images_c.split('\n').filter(img => img.trim()) : [],
        features: property.features_c ? property.features_c.split('\n').filter(feat => feat.trim()) : [],
        listingDate: property.listing_date_c || new Date().toISOString(),
        status: property.status_c || 'For Sale'
      };
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load property");
      throw error;
    }
  },

  async create(property) {
    try {
      await delay(400);

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Transform UI fields to database fields, only include Updateable fields
      const recordData = {
        Name: property.title || 'Untitled Property',
        title_c: property.title || '',
        price_c: parseFloat(property.price) || 0,
        address_c: property.address || '',
        city_c: property.city || '',
        state_c: property.state || '',
        zip_code_c: property.zipCode || '',
        property_type_c: property.propertyType || '',
        bedrooms_c: parseInt(property.bedrooms) || 0,
        bathrooms_c: parseFloat(property.bathrooms) || 0,
        square_feet_c: parseInt(property.squareFeet) || 0,
        year_built_c: parseInt(property.yearBuilt) || 0,
        description_c: property.description || '',
        images_c: Array.isArray(property.images) ? property.images.join('\n') : '',
        features_c: Array.isArray(property.features) ? property.features.join('\n') : '',
        listing_date_c: property.listingDate || new Date().toISOString(),
        status_c: property.status || 'For Sale'
      };

      const params = {
        records: [recordData]
      };

      const response = await apperClient.createRecord('property_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success('Property created successfully');
          return this.transformToUI(successful[0].data);
        }
      }

      throw new Error('Property creation failed');
    } catch (error) {
      console.error("Error creating property:", error?.response?.data?.message || error);
      toast.error("Failed to create property");
      throw error;
    }
  },

  async update(id, data) {
    try {
      await delay(350);

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Transform UI fields to database fields, only include Updateable fields
      const recordData = {
        Id: id,
        ...data.title && { Name: data.title, title_c: data.title },
        ...data.price && { price_c: parseFloat(data.price) },
        ...data.address && { address_c: data.address },
        ...data.city && { city_c: data.city },
        ...data.state && { state_c: data.state },
        ...data.zipCode && { zip_code_c: data.zipCode },
        ...data.propertyType && { property_type_c: data.propertyType },
        ...data.bedrooms && { bedrooms_c: parseInt(data.bedrooms) },
        ...data.bathrooms && { bathrooms_c: parseFloat(data.bathrooms) },
        ...data.squareFeet && { square_feet_c: parseInt(data.squareFeet) },
        ...data.yearBuilt && { year_built_c: parseInt(data.yearBuilt) },
        ...data.description && { description_c: data.description },
        ...data.images && { images_c: Array.isArray(data.images) ? data.images.join('\n') : data.images },
        ...data.features && { features_c: Array.isArray(data.features) ? data.features.join('\n') : data.features },
        ...data.listingDate && { listing_date_c: data.listingDate },
        ...data.status && { status_c: data.status }
      };

      const params = {
        records: [recordData]
      };

      const response = await apperClient.updateRecord('property_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success('Property updated successfully');
          return this.transformToUI(successful[0].data);
        }
      }

      throw new Error('Property update failed');
    } catch (error) {
      console.error("Error updating property:", error?.response?.data?.message || error);
      toast.error("Failed to update property");
      throw error;
    }
  },

  async delete(id) {
    try {
      await delay(300);

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('property_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successful.length > 0) {
          toast.success('Property deleted successfully');
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Error deleting property:", error?.response?.data?.message || error);
      toast.error("Failed to delete property");
      throw error;
    }
  },

  transformToUI(property) {
    return {
      Id: property.Id,
      title: property.title_c || '',
      price: parseFloat(property.price_c) || 0,
      address: property.address_c || '',
      city: property.city_c || '',
      state: property.state_c || '',
      zipCode: property.zip_code_c || '',
      propertyType: property.property_type_c || '',
      bedrooms: parseInt(property.bedrooms_c) || 0,
      bathrooms: parseFloat(property.bathrooms_c) || 0,
      squareFeet: parseInt(property.square_feet_c) || 0,
      yearBuilt: parseInt(property.year_built_c) || 0,
      description: property.description_c || '',
      images: property.images_c ? property.images_c.split('\n').filter(img => img.trim()) : [],
      features: property.features_c ? property.features_c.split('\n').filter(feat => feat.trim()) : [],
      listingDate: property.listing_date_c || new Date().toISOString(),
      status: property.status_c || 'For Sale'
};
  }
};