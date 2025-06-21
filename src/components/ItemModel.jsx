import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Mail, Loader2 } from 'lucide-react';
import apiService from './apiService';

const ItemModel = ({ item, isOpen, onClose, onEnquire }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [enquiring, setEnquiring] = useState(false);

  const nextImage = () => {
    if (item) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % item.additionalImages.length
      );
    }
  };

  const prevImage = () => {
    if (item) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? item.additionalImages.length - 1 : prev - 1
      );
    }
  };

  const handleEnquire = async () => {
    setEnquiring(true);
    try {
      await apiService.sendEnquiry(item._id, item.name);
      onEnquire();
    } catch (error) {
      console.error('Enquiry error:', error);
    } finally {
      setEnquiring(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
          <button
            onClick={() => {
              setCurrentImageIndex(0);
              onClose();
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Image Carousel */}
          <div className="relative mb-6">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={item.additionalImages[currentImageIndex]}
                alt={`${item.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Found';
                }}
              />
            </div>
            
            {item.additionalImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="flex justify-center mt-4 space-x-2">
                  {item.additionalImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Type</h4>
              <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {item.type}
              </span>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>
            
            <div className="pt-6">
              <button
                onClick={handleEnquire}
                disabled={enquiring}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {enquiring ? (
                  <>
                    <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
                    Sending Enquiry...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 inline mr-2" />
                    Enquire
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModel;