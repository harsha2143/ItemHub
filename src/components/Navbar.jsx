import { Package, Eye, Plus } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="bg-white shadow-lg border-b-4 border-indigo-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">ItemHub</h1>
          </div>
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setCurrentPage('view')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                currentPage === 'view' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              View Items
            </button>
            <button
              onClick={() => setCurrentPage('add')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                currentPage === 'add' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Items
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;