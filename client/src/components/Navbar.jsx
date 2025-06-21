import { Package, Eye, Plus } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg border-b-4 border-indigo-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">ItemHub</h1>
          </div>
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setCurrentPage('view')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                currentPage === 'view' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
               <Eye className="w-5 h-5" />
                <span className="hidden  lg:inline ml-2">View Items</span>
                <span className="hidden sm:inline lg:hidden ml-2">View</span>
            </button>
            <button
              onClick={() => setCurrentPage('add')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                currentPage === 'add' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline ml-2">Add Items</span>
              <span className="hidden sm:inline lg:hidden ml-2">Add</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
