import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import apiService from './apiService';

const AddItems = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: ['']
  });
  const [loading, setLoading] = useState(false);

  const itemTypes = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Accessories', 'Other'];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdditionalImageChange = (index, value) => {
    const newImages = [...formData.additionalImages];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      additionalImages: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, '']
    }));
  };

  const removeImageField = (index) => {
    if (formData.additionalImages.length > 1) {
      const newImages = formData.additionalImages.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        additionalImages: newImages
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.type || !formData.description || !formData.coverImage) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const itemData = {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        coverImage: formData.coverImage,
        additionalImages: [formData.coverImage, ...formData.additionalImages.filter(img => img.trim() !== '')]
      };

      const newItem = await apiService.addItem(itemData);
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: '',
        additionalImages: ['']
      });

      onItemAdded(newItem);
    } catch (error) {
      alert('Error adding item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-16 px-4 sm:px-6 lg:px-8 py-8 mt-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h2>
        <p className="text-gray-600">Fill in the details to add a new item to your collection</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter name of the item"
            disabled={loading}
          />
        </div>

        {/* Item Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleFormChange('type', e.target.value)}
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            disabled={loading}
          >
            <option value="">Select type</option>
            {itemTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Item Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleFormChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            placeholder="Describe the details of the item"
            disabled={loading}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image URL *
          </label>
          <input
            type="url"
            value={formData.coverImage}
            onChange={(e) => handleFormChange('coverImage', e.target.value)}
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter the URL of the cover image"
            disabled={loading}
          />
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Images
          </label>
          {formData.additionalImages.map((image, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={image}
                onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                className="flex-1 px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Additional image URLs"
                disabled={loading}
              />
              {formData.additionalImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            + Add Another Image
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
              Adding Item...
            </>
          ) : (
            'Add Item'
          )}
        </button>
      </div>
    </div>
  );
};

export default AddItems;