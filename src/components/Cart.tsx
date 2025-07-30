import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

interface CartProps {
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ onCheckout }) => {
  const { state, removeItem, updateQuantity, closeCart } = useCart();

  if (!state.isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Cart Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="ml-auto w-full max-w-md bg-neutral-950/95 backdrop-blur-xl border-l border-neutral-800 flex flex-col h-full"
        >
          {/* Header */}
          <div className="p-6 border-b border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-primary-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-100">Your Order</h2>
                  <p className="text-sm text-neutral-400">
                    {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 border border-neutral-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 bg-neutral-800/50 rounded-3xl flex items-center justify-center mb-6"
                >
                  <ShoppingBag className="text-neutral-500" size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold text-neutral-300 mb-2">Your cart is empty</h3>
                <p className="text-neutral-500 text-sm">Add some delicious items to get started!</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {state.items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
                    exit={{ opacity: 0, x: -20 }}
                    layout // Enable layout animations for smooth reordering
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}


                    className="bento-card p-4"
                  >
                    <div className="flex gap-3">
                      {/* Item Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-neutral-100 font-medium text-sm">{item.name}</h3>
                          {item.selectedSize && (
                            <p className="text-neutral-500 text-xs">Size: {item.selectedSize}</p>
                          )}
                          <p className="text-primary-400 font-semibold text-sm">₹{item.price}</p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 border border-neutral-700"
                            >
                              <Minus size={12} />
                            </button>
                            
                            <span className="text-neutral-100 text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 border border-neutral-700"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-neutral-100 font-bold text-sm">
                              ₹{item.price * item.quantity}
                            </span>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 border border-red-500/30"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
              {/* Order Summary */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-neutral-100 font-medium">₹{state.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Service Fee</span>
                  <span className="text-neutral-100 font-medium">₹0</span>
                </div>
                <div className="border-t border-neutral-800 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-neutral-100">Total</span>
                    <span className="text-2xl font-bold gradient-text">₹{state.total}</span>
                  </div>
                </div>
              </div>
              
              {/* Checkout Button */}
              <motion.button
                onClick={onCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-4 text-lg font-semibold rounded-2xl"
              >
                Proceed to Checkout
              </motion.button>
              
              <p className="text-xs text-neutral-500 text-center mt-3">
                Secure payment via Instamojo
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Cart;