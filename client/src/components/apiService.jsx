const apiService = {
  baseURL:'http://localhost:3001/api',

  async fetchItems() {
    try {
      const response = await fetch(`${this.baseURL}/items`);
      if (!response.ok) throw new Error('Failed to fetch items');
      return await response.json();
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error; // Let the component handle the error
    }
  },

  async addItem(itemData) {
    try {
      const response = await fetch(`${this.baseURL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
      if (!response.ok) throw new Error('Failed to add item');
      return await response.json();
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  },

  async sendEnquiry(itemId, itemName) {
    try {
      const response = await fetch(`${this.baseURL}/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          itemName,
          email: 'admin@itemhub.com',
          timestamp: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to send enquiry');
      return await response.json();
    } catch (error) {
      console.error('Error sending enquiry:', error);
      throw error;
    }
  },
};

export default apiService;