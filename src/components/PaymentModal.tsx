import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Shield, CheckCircle, Lock, ShoppingBag, ExternalLink } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { firestore } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [seatNumber, setSeatNumber] = useState<number>(1);
  const [rowSelection, setRowSelection] = useState<string>('A');
  const [screenNumber, setScreenNumber] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const { state } = useCart();

  const handleInstamojoPayment = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    setIsSubmitting(true);
    setIsProcessing(true);
    
    try {
      console.log('🚀 Starting Instamojo payment process...');
      
      // Prepare payment data for Instamojo
      const paymentData = {
        amount: state.total,
        purpose: `DRC Cafe Order - ${state.items.length} items`,
        buyer_name: customerName.trim(),
        phone: customerPhone.trim(),
        redirect_url: `${window.location.origin}/payment-success`,
        webhook: `${window.location.origin}/api/instamojo-webhook`,
        send_email: false,
        send_sms: false,
        allow_repeated_payments: false,
        // Order details for reference
        orderDetails: {
          items: state.items,
          seatNumber,
          rowSelection,
          screenNumber,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim()
        }
      };
      
      console.log('💳 Payment data prepared:', {
        amount: paymentData.amount,
        purpose: paymentData.purpose,
        buyer_name: paymentData.buyer_name,
        phone: paymentData.phone
      });

      // Call backend to create Instamojo payment request
      console.log('📡 Calling backend to create Instamojo payment...');
      const response = await fetch('/api/create-instamojo-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      
      if (!response.ok) {
        throw new Error(`Backend error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Backend response:', result);
      
      if (result.success && result.payment_url) {
        console.log('🔗 Redirecting to Instamojo payment URL:', result.payment_url);
        
        // Save order to Firestore before redirecting
        await saveOrderToFirestore();
        
        // Redirect to Instamojo payment page
        window.location.href = result.payment_url;
      } else {
        throw new Error(result.message || 'Failed to create payment request');
      }
      
    } catch (error) {
      console.error('❌ Payment initiation error:', error);
      
      // Handle different types of errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Unable to connect to payment service. Please check your internet connection and try again.');
      } else if (error.message.includes('Backend error')) {
        alert('Payment service is temporarily unavailable. Please try again later.');
      } else {
        alert(`Payment error: ${error.message}. Please try again.`);
      }
      
      setIsSubmitting(false);
      setIsProcessing(false);
    }
  };
  
  const saveOrderToFirestore = async () => {
    try {
      console.log('💾 Saving order to Firestore...');
      
      const orderData = {
        items: state.items,
        total: state.total,
        seatNumber,
        rowSelection,
        screenNumber,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        timestamp: serverTimestamp(),
        status: 'ongoing',
        paymentStatus: 'pending'
      };
      
      const ordersCollection = collection(firestore, 'orders');
      const docRef = await addDoc(ordersCollection, orderData);
      
      console.log('✅ Order saved to Firestore:', docRef.id);
      return docRef.id;
      
    } catch (error) {
      console.error('❌ Error saving to Firestore:', error);
      throw error;
    }
  };

  // Fallback function for demo purposes (when backend is not available)
  const handleDemoPayment = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    setIsSubmitting(true);
    setIsProcessing(true);
    
    try {
      console.log('🎭 Demo payment mode - saving order directly...');
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await saveOrderToFirestore();
      
      // Trigger success callback
      onPaymentSuccess(seatNumber, rowSelection, screenNumber, customerName.trim(), customerPhone.trim());
      
      // Reset form
      setCustomerName('');
      setCustomerPhone('');
      
    } catch (error) {
      console.error('❌ Demo payment error:', error);
      alert(`Error processing order: ${error.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
      setIsProcessing(false);
    }
  };

  const handlePayment = handleInstamojoPayment;

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
          className="relative w-full max-w-md mx-auto bg-neutral-950/95 backdrop-blur-xl rounded-3xl border border-neutral-800 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {paymentComplete ? (
            // Success Screen
            <div className="p-4 sm:p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-20 h-20 bg-success-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="text-success-400" size={40} />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-neutral-100 mb-2">Payment Successful!</h2>
              <p className="text-neutral-400 mb-6">Your order has been confirmed and is being prepared</p>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-4xl mb-4"
              >
                🎉
              </motion.div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="text-primary-400" size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-neutral-100">Place Order</h2>
                      <p className="text-xs sm:text-sm text-neutral-400">Complete your order details</p>
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
              <div className="p-4 sm:p-6 border-b border-neutral-800">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-100 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center text-xs sm:text-sm">
                      <div className="flex-1">
                        <span className="text-neutral-300">
                          {item.name} {item.selectedSize && `(${item.selectedSize})`}
                        </span>
                        <span className="text-neutral-500 ml-2">× {item.quantity}</span>
                      </div>
                      <span className="text-neutral-100 font-medium text-sm">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-neutral-800 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-semibold text-neutral-100">Total Amount</span>
                    <span className="text-lg sm:text-xl font-bold gradient-text">₹{state.total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Customer Details */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-100 mb-4">Customer Details</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Full Name *</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full input-field"
                        required
                        disabled={isProcessing}
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
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </div>
                {/* Seat Selection */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-100 mb-4">Select Your Seat</h3>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {/* Screen Selection */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-neutral-300">Screen</label>
                      <select
                        value={screenNumber}
                        onChange={(e) => setScreenNumber(Number(e.target.value))}
                        className="w-full input-field text-xs sm:text-sm"
                        disabled={isProcessing}
                      >
                        {[1, 2, 3, 4].map(screen => (
                          <option key={screen} value={screen}>Screen {screen}</option>
                        ))}
                      </select>
                    </div>

                    {/* Row Selection */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-neutral-300">Row</label>
                      <select
                        value={rowSelection}
                        onChange={(e) => setRowSelection(e.target.value)}
                        className="w-full input-field text-xs sm:text-sm"
                        disabled={isProcessing}
                      >
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(row => (
                          <option key={row} value={row}>Row {row}</option>
                        ))}
                      </select>
                    </div>

                    {/* Seat Number */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-neutral-300">Seat</label>
                      <select
                        value={seatNumber}
                        onChange={(e) => setSeatNumber(Number(e.target.value))}
                        className="w-full input-field text-xs sm:text-sm"
                        disabled={isProcessing}
                      >
                        {Array.from({ length: 50 }, (_, i) => i + 1).map(seat => (
                          <option key={seat} value={seat}>Seat {seat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Method Info */}
                <div className="bento-card p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-primary-400" size={16} />
                    </div>
                    <div>
                      <span className="text-neutral-100 font-medium text-xs sm:text-sm">Powered by Instamojo</span>
                      <p className="text-neutral-500 text-xs">Secure payment gateway</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Shield size={12} />
                      <span>256-bit SSL encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Lock size={12} />
                      <span>UPI, Cards, Net Banking supported</span>
                    </div>
                  </div>
                </div>

                {/* Payment Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handlePayment}
                    disabled={isProcessing || !customerName.trim() || !customerPhone.trim()}
                    whileHover={!isProcessing ? { scale: 1.02 } : {}}
                    whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    className={`w-full py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      isProcessing || !customerName.trim() || !customerPhone.trim()
                        ? 'bg-neutral-700 cursor-not-allowed text-neutral-400'
                        : 'btn-primary'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-neutral-500 border-t-neutral-300 rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        <span>Pay ₹{state.total} via Instamojo</span>
                        <ExternalLink size={16} />
                      </>
                    )}
                  </motion.button>
                  
                  {/* Demo Payment Button */}
                  <motion.button
                    onClick={handleDemoPayment}
                    disabled={isProcessing || !customerName.trim() || !customerPhone.trim()}
                    whileHover={!isProcessing ? { scale: 1.02 } : {}}
                    whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    className={`w-full py-2 sm:py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isProcessing || !customerName.trim() || !customerPhone.trim()
                        ? 'bg-neutral-800 cursor-not-allowed text-neutral-500 border border-neutral-700'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 hover:border-neutral-600'
                    }`}
                  >
                    Demo Payment (Skip Gateway)
                  </motion.button>
                </div>

                <p className="text-xs text-neutral-500 text-center">
                  By proceeding, you agree to our terms and conditions
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;