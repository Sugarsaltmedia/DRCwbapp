import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Search, Filter } from 'lucide-react';
import { menuData, categories } from '../data/menu';
import CategoryCard from './CategoryCard';
import MenuItem from './MenuItem';
import { useCart } from '../contexts/CartContext';

interface MenuProps {
  onBack: () => void;
}

const Menu: React.FC<MenuProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { state, openCart } = useCart();

  const filteredItems = useMemo(() => {
    let items = menuData;
    
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase().trim()))
      );
    }
    
    return items;
  }, [selectedCategory, searchQuery]);

  const categoryItemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category.id] = menuData.filter(item => item.category === category.id).length;
    });
    return counts;
  }, []);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={selectedCategory ? () => setSelectedCategory(null) : onBack}
                className="w-10 h-10 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 border border-neutral-700 hover:border-neutral-600 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              </button>
              
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-100">
                  {selectedCategory ? selectedCategoryData?.name : 'Menu'}
                </h1>
                {selectedCategory && (
                  <p className="text-xs sm:text-sm text-neutral-400">
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                  </p>
                )}
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative btn-primary flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm lg:text-base flex-shrink-0"
            >
              <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Cart</span>
              {state.items.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-accent-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-neutral-950"
                >
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </motion.div>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={16} />
            <input
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10 sm:pl-12 pr-3 sm:pr-4 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-2 sm:p-4">
        {!selectedCategory ? (
          // Categories Grid
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">Choose Your Category</h2>
              <p className="text-neutral-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                Explore our carefully curated menu categories, each offering unique flavors and experiences
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => setSelectedCategory(category.id)}
                  itemCount={categoryItemCounts[category.id] || 0}
                />
              ))}
            </div>
          </div>
        ) : (
          // Menu Items
          <div className="space-y-4 sm:space-y-6">
            {/* Category Header */}
            <div className="text-center space-y-4 py-4 sm:py-6 lg:py-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto border border-neutral-700">
                {selectedCategoryData?.imageUrl && (
                  <img 
                    src={selectedCategoryData.imageUrl} 
                    alt={selectedCategoryData.name} 
                    className="w-full h-full object-cover rounded-3xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </div> 
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">{selectedCategoryData?.name}</h2>
              <p className="text-neutral-400 text-sm sm:text-base">
                {filteredItems.length} delicious {filteredItems.length === 1 ? 'option' : 'options'} to choose from
              </p>
            </div>

            {/* Items Grid */}
            <div className="space-y-3 sm:space-y-4">
              {filteredItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
              
              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6"
                  >
                    🔍
                  </motion.div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-300 mb-2">No items found</h3>
                  <p className="text-neutral-500 text-sm sm:text-base">Try adjusting your search or browse other categories</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;