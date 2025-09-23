import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Shield, CheckCircle, Lock, ShoppingBag } from 'lucide-react';
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
  onGoToPrivacyPolicy?: () => void;
  onGoToTermsOfService?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess, onGoToPrivacyPolicy, onGoToTermsOfService }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [seatNumber, setSeatNumber] = useState<number>(1);
  const [rowSelection, setRowSelection] = useState<string>('A');
  const [screenNumber, setScreenNumber] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const { state } = useCart();

  const handlePaymentWithInstamojo = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    console.log('🚀 Starting Instamojo payment process...');
    setIsProcessing(true);
    
    let response;
    let result;
    
    try {
      // Create payment request via Supabase Edge Function
      const paymentData = {
        amount: state.total,
        buyer_name: customerName.trim(),
        phone: customerPhone.trim(),
        redirect_url: `${window.location.origin}/#/payment-success`
      };

      console.log('💳 Creating payment request:', paymentData);

      response = await fetch('/.netlify/functions/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      console.log('💳 Payment creation response:', result);

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP error response:', errorText);
        throw new Error(`Server error (${response.status}): ${errorText || 'Unknown error'}`);
      }

      // Parse JSON response
      result = await response.json();
      console.log('💳 Payment creation response:', result);

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create payment request');
      }

      // Save order to Firestore before redirecting to payment
      console.log('💾 Saving order to Firestore before payment...');
      await handleSubmitOrder();

      // Redirect to Instamojo payment page
      console.log('🔄 Redirecting to Instamojo payment page...');
      window.location.href = result.payment_url;

    } catch (error) {
      console.error('❌ Payment creation error:', error);
      setIsProcessing(false);
      alert(`Payment setup failed: ${error.message}. Please try again.`);
    }
  };

  const handleSubmitOrder = async () => {
    console.log('🚀 Starting Firestore order submission...');
    console.log('📋 Order form data:', {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      seatNumber,
      rowSelection,
      screenNumber
    });
    console.log('🛒 Cart items count:', state.items.length);
    console.log('💰 Order total:', state.total);

    setIsSubmitting(true);
    
    try {
      // Create order object for Firestore
      const orderData = {
        items: state.items,
        total: state.total,
        seatNumber,
        rowSelection,
        screenNumber,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        timestamp: serverTimestamp(), // Use Firestore server timestamp
        status: 'ongoing'
      };

      console.log('📦 Order data for Firestore:', {
        ...orderData,
        timestamp: 'serverTimestamp()' // Log placeholder since serverTimestamp() is a special object
      });
      
      // Validate order data before saving
      const validation = {
        hasItems: orderData.items && orderData.items.length > 0,
        hasTotal: orderData.total > 0,
        hasCustomerName: orderData.customerName && orderData.customerName.length > 0,
        hasCustomerPhone: orderData.customerPhone && orderData.customerPhone.length > 0,
        hasSeatInfo: orderData.seatNumber && orderData.rowSelection && orderData.screenNumber
      };
      console.log('✅ Firestore order validation:', validation);
      
      if (!validation.hasItems) {
        throw new Error('No items in cart');
      }
      if (!validation.hasCustomerName || !validation.hasCustomerPhone) {
        throw new Error('Missing customer information');
      }

      // Save to Firestore
      console.log('💾 Attempting to save to Firestore...');
      console.log('🔥 Firestore instance:', firestore);
      const ordersCollection = collection(firestore, 'orders');
      console.log('📁 Orders collection reference:', ordersCollection);
      
      const docRef = await addDoc(ordersCollection, orderData);
      console.log('🎉 Order saved to Firestore successfully!');
      console.log('🆔 Document ID:', docRef.id);
      console.log('📍 Document path:', docRef.path);

      // Trigger success callback
      console.log('✅ Triggering success callback...');
      onPaymentSuccess(seatNumber, rowSelection, screenNumber, customerName.trim(), customerPhone.trim());
      
      // Reset form
      setCustomerName('');
      setCustomerPhone('');
      setIsSubmitting(false);
      console.log('🔄 Form reset complete');
      
    } catch (error) {
      console.error('❌ Error saving order to Firestore:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error code:', error.code);
      console.error('❌ Full error object:', error);
      setIsSubmitting(false);
      alert(`Error saving order to database: ${error.message}. Please try again.`);
    }
  };

  const handlePayment = handlePaymentWithInstamojo;

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
          {paymentComplete ? (
            // Success Screen
            <div className="p-8 text-center">
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
              <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="text-primary-400" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-neutral-100">Place Order</h2>
                      <p className="text-sm text-neutral-400">Complete your order details</p>
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

                <div className="bento-card p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="text-primary-400" size={16} />
                    </div>
                    <div>
                      <span className="text-neutral-100 font-medium text-sm">Powered by Instamojo</span>
                      <p className="text-neutral-500 text-xs">256-bit SSL encrypted payment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Lock size={12} />
                    <span>Your payment information is secure</span>
                  </div>
                </div>

                <motion.button
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  whileHover={!isProcessing ? { scale: 1.02 } : {}}
                  whileTap={!isProcessing ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    isProcessing
                      ? 'bg-neutral-700 cursor-not-allowed text-neutral-400'
                      : 'btn-primary'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-neutral-500 border-t-neutral-300 rounded-full animate-spin"></div>
                      Setting up payment...
                    </div>
                  ) : (
                    `Pay ₹${state.total}`
                  )}
                </motion.button>

              <div className="text-xs text-neutral-500 text-center mt-4 space-y-1">
                <p>Secure payment powered by Instamojo</p>
                <p>
                  By proceeding, you agree to our{' '}
                  <button className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
                    onClick={onGoToPrivacyPolicy}
                    Privacy Policy
                  </button>
                  {' '}and{' '}
                  <button className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
                    onClick={onGoToTermsOfService}
                    Terms of Service
                  </button>
                </p>
              </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;