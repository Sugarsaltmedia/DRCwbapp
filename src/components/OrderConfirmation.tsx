import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, Home, Clock, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface OrderConfirmationProps {
  onBackToHome: () => void;
  seatNumber: number | null;
  rowSelection: string | null;
  screenNumber: number | null;
  customerName: string | null;
  customerPhone: string | null;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ 
  onBackToHome, 
  seatNumber, 
  rowSelection, 
  screenNumber,
  customerName,
  customerPhone
}) => {
  const { state, clearCart } = useCart();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; type: string }>>([]);

  useEffect(() => {
    console.log('OrderConfirmation mounted with:', { seatNumber, rowSelection, screenNumber, customerName, customerPhone });
    console.log('Cart state:', state);
    
    // Generate subtle particles
    const particleItems = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -50, // Start higher for more visible entry
      delay: Math.random() * 3,
      type: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]
    }));
    setParticles(particleItems);

    // Clear cart after a delay
    setTimeout(() => {
      console.log('Clearing cart...');
      clearCart();
    }, 5000);
  }, [clearCart]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Particle Animation */}
      {particles.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-lg opacity-60"
          style={{ left: `${item.x}%` }}
          animate={{ // Adjusted particle animation for a more subtle, professional look
            y: [item.y, window.innerHeight + 50],
            rotate: [0, 180],
            opacity: [0.6, 0]
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            ease: "easeOut"
          }}
        >
          {item.type}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bento-card text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', duration: 0.6 }}
          className="w-20 h-20 bg-success-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="text-success-400" size={40} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-neutral-100 mb-2"
        >
          Order Confirmed! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-neutral-400 mb-8 text-lg"
        >
          Your delicious order is being prepared with care
        </motion.p>

        {/* Status Cards */}
        <div className="space-y-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bento-card p-4 bg-success-500/10 border-success-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-success-400" size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-neutral-100 font-semibold text-sm">Order Saved</h3>
                <p className="text-neutral-400 text-xs">Order details saved to admin dashboard</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="bento-card p-4 bg-success-500/10 border-success-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-500/20 rounded-xl flex items-center justify-center">
                <Clock className="text-success-400" size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-neutral-100 font-semibold text-sm">Preparation Time</h3>
                <p className="text-neutral-400 text-xs">Ready in 10-15 minutes</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bento-card p-4 mb-8 text-left"
        >
          <h3 className="text-neutral-100 font-semibold mb-3 flex items-center gap-2">
            <Star className="text-accent-400" size={16} />
            Order Summary
          </h3>
          
          {/* Customer Information */}
          {customerName && customerPhone && (
            <div className="mb-4 p-3 bg-accent-500/10 rounded-xl border border-accent-500/20">
              <h4 className="text-accent-300 font-medium text-sm mb-2">Customer Details</h4>
              <div className="space-y-1 text-sm text-neutral-300">
                <div>Name: {customerName}</div>
                <div>Phone: {customerPhone}</div>
              </div>
            </div>
          )}
          
          {/* Seat Information */}
          {seatNumber && rowSelection && screenNumber && (
            <div className="mb-4 p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
              <h4 className="text-primary-300 font-medium text-sm mb-2">Your Seat</h4>
              <div className="flex items-center gap-4 text-sm text-neutral-300">
                <span>Screen {screenNumber}</span>
                <span>•</span>
                <span>Row {rowSelection}</span>
                <span>•</span>
                <span>Seat {seatNumber}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-2 text-sm">
            {state.items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-neutral-300">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-800 mt-3 pt-3 flex justify-between font-bold">
            <span className="text-neutral-100">Total</span>
            <span className="gradient-text text-lg">₹{state.total}</span>
          </div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.button
          onClick={onBackToHome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary py-4 text-lg font-semibold rounded-2xl flex items-center justify-center gap-3"
        >
          <Home size={20} />
          Back to Home
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-xs text-neutral-500 mt-4"
        >
          Thank you for choosing DRC Cafe! 🙏
        </motion.p>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;