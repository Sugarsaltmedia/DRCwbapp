import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem as MenuItemType } from '../types';
import { useCart } from '../contexts/CartContext';
import { Plus, Minus, Check } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(item.sizes ? item.sizes[0] : '');
  const [isAdding, setIsAdding] = useState(false);

  const currentPrice = selectedSize === 'Large' && item.maxPrice ? item.maxPrice : item.price;

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(item, quantity, selectedSize || undefined);
    
    // Reset quantity after adding
    setQuantity(1);
    
    // Add a small delay for visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bento-card group hover:border-primary-500/30"
    >
      <div className="flex gap-4">
        {/* Item Image/Icon */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg border border-neutral-700">
            {item.image && item.image.startsWith('http') ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">{item.image}</span> // Fallback to emoji if not a URL
            )}
          </div>
        </div>
        
        {/* Item Details */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-neutral-100 font-semibold text-lg group-hover:text-primary-300 transition-colors duration-300">
                {item.name}
              </h3>
              <div className="text-right">
                <div className="text-xl font-bold text-primary-400">
                  ₹{currentPrice}
                </div>
                {item.maxPrice && item.maxPrice !== item.price && (
                  <div className="text-xs text-neutral-500">
                    up to ₹{item.maxPrice}
                  </div>
                )}
              </div>
            </div>
            
            {item.description && (
              <p className="text-neutral-400 text-sm leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          {/* Size Selector */}
          {item.sizes && (
            <div className="space-y-2">
              <p className="text-neutral-300 text-sm font-medium">Size</p>
              <div className="flex gap-2">
                {item.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      selectedSize === size
                        ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25'
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between pt-2">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-neutral-300 text-sm font-medium">Qty</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 border border-neutral-700 hover:border-neutral-600"
                >
                  <Minus size={14} />
                </button>
                
                <span className="text-neutral-100 font-semibold w-8 text-center">
                  {quantity}
                </span>
                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 border border-neutral-700 hover:border-neutral-600"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={isAdding}
              whileHover={!isAdding ? { scale: 1.02 } : {}}
              whileTap={!isAdding ? { scale: 0.98 } : {}}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                isAdding
                  ? 'bg-success-500 text-white shadow-lg shadow-success-500/25'
                  : 'btn-primary'
              }`}
            >
              {isAdding ? (
                <>
                  <Check size={16} />
                  <span>Added!</span>
                </>
              ) : (
                <span>Add to Cart</span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;