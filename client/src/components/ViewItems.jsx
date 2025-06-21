import { Package, Loader2 } from 'lucide-react';
import ItemCard from './ItemCard';
const ViewItems = ({ items, loading, onItemClick }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mr-2" />
        <span className="text-gray-600">Loading items...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h2>
        <p className="text-gray-600">Discover amazing items in our inventory ({items.length} items)</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} onClick={onItemClick} />
        ))}
      </div>

      {items.length === 0 && !loading && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No items found. Add some items to get started!</p>
        </div>
      )}
    </div>
  );
};

export default ViewItems;