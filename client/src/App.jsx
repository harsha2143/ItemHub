import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ViewItems from './components/ViewItems';
import AddItems from './components/AddItems';
import ItemModal from './components/ItemModel';
import SuccessMessage from './components/SuccessMessage';
import apiService from './components/apiService';

const App = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('view');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Load items from MongoDB on component mount
  useEffect(() => {
    loadItems();
  }, []);

const loadItems = async () => {
  setLoading(true);
  try {
    const fetchedItems = await apiService.fetchItems();
    setItems(fetchedItems);
  } catch (error) {
    console.error('Error loading items:', error);
    setSuccessMessage('Failed to load items. Please try again.');
    setShowSuccess(true); // Reuse success message for errors
  } finally {
    setLoading(false);
  }
};

  const handleItemAdded = (newItem) => {
    setItems(prev => [...prev, newItem]);
    setSuccessMessage('Item successfully added!');
    setShowSuccess(true);
    setCurrentPage('view'); // Switch to view page to see the new item
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleEnquire = () => {
    setSuccessMessage('Enquiry sent successfully!');
    setShowSuccess(true);
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <SuccessMessage 
        message={successMessage}
        isVisible={showSuccess}
        onClose={handleSuccessClose}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'view' ? (
          <ViewItems 
            items={items} 
            loading={loading}
            onItemClick={handleItemClick} 
          />
        ) : (
          <AddItems onItemAdded={handleItemAdded} />
        )}
      </main>

      <ItemModal
        item={selectedItem}
        isOpen={showModal}
        onClose={handleCloseModal}
        onEnquire={handleEnquire}
      />
    </div>
  );
};

export default App;