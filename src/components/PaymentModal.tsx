import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Shield, CheckCircle, Lock, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { firestore } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Declare Razorpay interface for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

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

  // Validate phone number format
  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  // Format phone number input
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 10);
  };
  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const trimmedName = customerName.trim();
    const trimmedPhone = customerPhone.trim();
    
    if (!trimmedName) {
      alert('Please enter your full name');
      return;
    }
    
    if (!trimmedPhone) {
      alert('Please enter your phone number');
      return;
    }
    
    if (!validatePhoneNumber(trimmedPhone)) {
      alert('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    console.log('🚀 Starting Razorpay payment process...');
    setIsProcessing(true);
    
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Save order to Firestore before payment
      console.log('💾 Preparing order for payment...');
      const orderReceipt = `order_${Date.now()}`;

      // Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_RYS8jZKMNTvoe6', // Use env variable or fallback
        amount: state.total * 100, // Amount in paise (multiply by 100)
        currency: 'INR',
        name: 'DRC Cinema Hall',
        description: 'Food Order Payment',
        receipt: orderReceipt,
        handler: function (response: any) {
          console.log('✅ Payment successful:', response);
          
          // Save order to Firestore after successful payment
          handleSubmitOrderAfterPayment(response);
          
          // Trigger success callback
          onPaymentSuccess(seatNumber, rowSelection, screenNumber, customerName.trim(), customerPhone.trim());
          setIsProcessing(false);
        },
        prefill: {
          name: customerName.trim(),
          contact: customerPhone.trim(),
        },
        notes: {
          seat_number: seatNumber,
          row_selection: rowSelection,
          screen_number: screenNumber,
          order_total: state.total
        },
        theme: {
          color: '#0ea5e9' // Primary blue color
        },
        modal: {
          ondismiss: function() {
            console.log('❌ Payment cancelled by user');
            setIsProcessing(false);
          }
        }
      };

      console.log('💳 Razorpay Config:', {
        hasKey: !!options.key,
        keySource: import.meta.env.VITE_RAZORPAY_KEY_ID ? 'environment' : 'fallback',
        amount: options.amount
      });

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('❌ Payment setup error:', error);
      setIsProcessing(false);
      alert(`Payment setup failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  const handleSubmitOrderAfterPayment = async (paymentResponse: any) => {
    console.log('🚀 Saving order to Firestore after successful payment...');
    
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
        timestamp: serverTimestamp(),
        status: 'ongoing',
        paymentId: paymentResponse.razorpay_payment_id,
        paymentSignature: paymentResponse.razorpay_signature,
        orderReceipt: paymentResponse.razorpay_order_id || `order_${Date.now()}`
      };

      // Save to Firestore
      const ordersCollection = collection(firestore, 'orders');
      const docRef = await addDoc(ordersCollection, orderData);
      console.log('🎉 Order saved to Firestore after payment:', docRef.id);
      
    } catch (error) {
      console.error('❌ Error saving order after payment:', error);
    }
  };

  const handleSubmitOrderDirect = async () => {
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
      // Don't trigger success callback here for Razorpay - it's handled in the payment handler
      
      // Reset form
      setCustomerName('');
      setCustomerPhone('');
      setIsSubmitting(false);
      console.log('🔄 Form reset complete');
      
      // Return the document ID
      return docRef.id;
      
    } catch (error) {
      console.error('❌ Error saving order to Firestore:', error);
      setIsSubmitting(false);
      alert(`Error saving order to database: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
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
          className="relative w-full max-w-md max-h-[95vh] bg-neutral-950/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-neutral-800 overflow-hidden flex flex-col m-2 sm:m-4"
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
                          {item.name} {item.selectedSize && `(${item.selectedSize})`} × {item.quantity}
                        </span>
                      </div>
                      <span className="text-neutral-100 font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Subtotal</span>
                    <span className="text-neutral-100 font-medium text-sm">₹{state.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Service Fee</span>
                    <span className="text-neutral-100 font-medium text-sm">₹0</span>
                  </div>
                </div>
                
                <div className="border-t border-neutral-800 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-semibold text-neutral-100">Total</span>
                    <span className="text-xl sm:text-2xl font-bold gradient-text">₹{state.total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex-1 overflow-y-auto">
                {/* Customer Details */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-100 mb-3 sm:mb-4">Customer Details</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-neutral-300">Full Name *</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full input-field text-sm"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-neutral-300">Phone Number *</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(formatPhoneNumber(e.target.value))}
                        placeholder="Enter your phone number"
                        className="w-full input-field text-sm"
                        maxLength={10}
                        required
                      />
                      {customerPhone && !validatePhoneNumber(customerPhone) && (
                        <p className="text-red-400 text-xs">Please enter a valid 10-digit mobile number</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Seat Selection */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-100 mb-3 sm:mb-4">Select Your Seat</h3>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {/* Screen Selection */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-medium text-neutral-300">Screen</label>
                      <select
                        value={screenNumber}
                        onChange={(e) => setScreenNumber(Number(e.target.value))}
                        className="w-full input-field text-xs sm:text-sm"
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
                      >
                        {Array.from({ length: 50 }, (_, i) => i + 1).map(seat => (
                          <option key={seat} value={seat}>Seat {seat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bento-card p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-primary-400" size={16} />
                    </div>
                    <div>
                      <span className="text-neutral-100 font-medium text-xs sm:text-sm">Powered by Razorpay</span>
                      <p className="text-neutral-500 text-xs">256-bit SSL encrypted payment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Lock size={12} />
                    <span>Your payment information is secure</span>
                  </div>
                </div>
              </div>

              {/* Fixed Footer for Payment Button */}
              <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-950/90 backdrop-blur-sm">
                <motion.button
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  whileHover={!isProcessing ? { scale: 1.02 } : {}}
                  whileTap={!isProcessing ? { scale: 0.98 } : {}}
                  className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 ${
                    isProcessing
                      ? 'bg-neutral-700 cursor-not-allowed text-neutral-400'
                      : 'btn-primary'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-neutral-500 border-t-neutral-300 rounded-full animate-spin"></div>
                      Setting up payment...
                    </div>
                  ) : (
                    `Pay ₹${state.total}`
                  )}
                </motion.button>

                <div className="text-xs text-neutral-500 text-center mt-3 sm:mt-4 space-y-1">
                  <p>Secure payment powered by Razorpay</p>
                  <p>
                    By proceeding, you agree to our{' '}
                    <button 
                      onClick={onGoToPrivacyPolicy}
                      className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                    >
                      Privacy Policy
                    </button>
                    {' '}and{' '}
                    <button 
                      onClick={onGoToTermsOfService}
                      className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                    >
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