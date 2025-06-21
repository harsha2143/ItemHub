const ItemCard = ({ item, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
      onClick={() => onClick(item)}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{item.type}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
};

export default ItemCard;