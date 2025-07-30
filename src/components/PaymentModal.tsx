import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { database } from '../firebase/config';
import { ref, push } from 'firebase/database';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (
    seatNumber: number, 
    rowSelection: string, 
    screenNumber: number,
    customerName: string,
    customerPhone: string
  ) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => { // Added layout prop for smooth transitions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seatNumber, setSeatNumber] = useState<number>(1);
  const [rowSelection, setRowSelection] = useState<string>('A');
  const [screenNumber, setScreenNumber] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const { state } = useCart();

  const handleSubmitOrder = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create order object
      const orderData = {
        items: state.items,
        total: state.total,
        seatNumber,
        rowSelection,
        screenNumber,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        timestamp: new Date().toISOString(),
        status: 'ongoing'
      };

      // Save to Firebase
      await push(ref(database, 'orders'), orderData);

      // Directly trigger success and close modal
      onPaymentSuccess(seatNumber, rowSelection, screenNumber, customerName.trim(), customerPhone.trim());
      
      // Reset form
      setCustomerName('');
      setCustomerPhone('');
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error saving order:', error);
      setIsSubmitting(false);
      alert('Error processing order. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative w-full max-w-md bg-neutral-950/95 backdrop-blur-xl rounded-3xl border border-neutral-800 overflow-hidden" // Added layout prop for smooth transitions
        >
          <>
              {/* Header */}
              <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                      <CreditCard className="text-primary-400" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-neutral-100">Secure Payment</h2>
                      <p className="text-sm text-neutral-400">Complete your order</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={isProcessing}
                    className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 disabled:opacity-50 border border-neutral-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6 border-b border-neutral-800">
                <h3 className="text-lg font-semibold text-neutral-100 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <span className="text-neutral-300">
                          {item.name} {item.selectedSize && `(${item.selectedSize})`}
                        </span>
                        <span className="text-neutral-500 ml-2">× {item.quantity}</span>
                      </div>
                      <span className="text-neutral-100 font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-neutral-800 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-neutral-100">Total Amount</span>
                    <span className="text-xl font-bold gradient-text">₹{state.total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 space-y-6">
                {/* Customer Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-100 mb-4">Customer Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Full Name *</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full input-field"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Phone Number *</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Seat Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-100 mb-4">Select Your Seat</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Screen Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Screen</label>
                      <select
                        value={screenNumber}
                        onChange={(e) => setScreenNumber(Number(e.target.value))}
                        className="w-full input-field"
                      >
                        {[1, 2, 3, 4].map(screen => (
                          <option key={screen} value={screen}>Screen {screen}</option>
                        ))}
                      </select>
                    </div>

                    {/* Row Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Row</label>
                      <select
                        value={rowSelection}
                        onChange={(e) => setRowSelection(e.target.value)}
                        className="w-full input-field"
                      >
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(row => (
                          <option key={row} value={row}>Row {row}</option>
                        ))}
                      </select>
                    </div>

                    {/* Seat Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Seat</label>
                      <select
                        value={seatNumber}
                        onChange={(e) => setSeatNumber(Number(e.target.value))}
                        className="w-full input-field"
                      >
                        {Array.from({ length: 50 }, (_, i) => i + 1).map(seat => (
                          <option key={seat} value={seat}>Seat {seat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-neutral-700 cursor-not-allowed text-neutral-400'
                      : 'btn-primary'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-neutral-500 border-t-neutral-300 rounded-full animate-spin"></div>
                      Placing Order...
                    </div>
                  ) : (
                    `Place Order - ₹${state.total}`
                  )}
                </motion.button>

                <p className="text-xs text-neutral-500 text-center mt-4">
                  Order will be sent directly to the kitchen for preparation
                </p>
              </div>
          </>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;