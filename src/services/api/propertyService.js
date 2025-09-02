import mockProperties from "@/services/mockData/properties.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...mockProperties];
  },

  async getById(id) {
    await delay(200);
    const property = mockProperties.find(p => p.Id === id);
    if (!property) {
      throw new Error("Property not found");
    }
    return { ...property };
  },

  async create(property) {
    await delay(400);
    const newProperty = {
      ...property,
      Id: Math.max(...mockProperties.map(p => p.Id)) + 1,
      listingDate: new Date().toISOString()
    };
    mockProperties.push(newProperty);
    return { ...newProperty };
  },

  async update(id, data) {
    await delay(350);
    const index = mockProperties.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }
    mockProperties[index] = { ...mockProperties[index], ...data };
    return { ...mockProperties[index] };
  },

  async delete(id) {
    await delay(300);
    const index = mockProperties.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }
    const deleted = mockProperties.splice(index, 1)[0];
    return { ...deleted };
  }
};