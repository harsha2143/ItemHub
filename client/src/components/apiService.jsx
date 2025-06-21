const apiService = {
  baseURL:'http://localhost:3001/api',

  async fetchItems() {
    try {
      const response = await fetch(`${this.baseURL}/items`);
      if (!response.ok) throw new Error('Failed to fetch items');
      return await response.json();
    } catch (error) {
      console.error('Error fetching items:', error);
      return [
        {
          _id: '1',
          name: "Classic Blue Jeans",
          type: "Pant",
          description: "Premium quality denim jeans with a classic fit. Made from 100% cotton with a comfortable stretch. Perfect for casual and semi-formal occasions.",
          coverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
          additionalImages: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1506629905607-676e5048775d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop"
          ],
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: "White Cotton T-Shirt",
          type: "Shirt",
          description: "Soft and breathable white cotton t-shirt. Pre-shrunk fabric ensures lasting fit. Ideal for everyday wear and layering.",
          coverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          additionalImages: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop"
          ],
          createdAt: new Date().toISOString()
        }
      ];
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
          email: 'adminitemhub@gmail.com',
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