import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, CheckCircle, PartyPopper, RefreshCw, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { firestore } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  onGoToPrivacyPolicy,
  onGoToTermsOfService
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessBoard, setShowSuccessBoard] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [seatNumber, setSeatNumber] = useState(1);
  const [rowSelection, setRowSelection] = useState('A');
  const [screenNumber, setScreenNumber] = useState(1);
  const [error, setError] = useState('');
  const { state, dispatch, clearCart } = useCart();
  const navigate = useNavigate();

  const razorpayKeyId = 'rzp_live_RYS8jZKMNTvoe6';
  // const razorpayKeyId = 'rzp_test_1DP5mmOlF5G5ag';
//  const razorpayKeySecret = "7X1gyVYuayETVi7MBS4xO92f";

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCustomerName('');
      setCustomerPhone('');
      setSeatNumber(1);
      setRowSelection('A');
      setScreenNumber(1);
      setError('');
      setPaymentError('');
      setIsProcessing(false);
      setIsSuccess(false);
      setShowSuccessBoard(false);
    }
  }, [isOpen]);

  const validateInputs = () => {
    if (!customerName.trim()) return 'Name is required';
    if (!customerPhone.trim()) return 'Phone number is required';
    if (!/^\d{10}$/.test(customerPhone)) return 'Phone number must be 10 digits';
    return '';
  };

  const clearPaymentFields = () => {
    setCustomerName('');
    setCustomerPhone('');
    setSeatNumber(1);
    setRowSelection('A');
    setScreenNumber(1);
    setError('');
    setPaymentError('');
    setIsProcessing(false);
    setIsSuccess(false);
    setShowSuccessBoard(false);
  };

  const clearCartItems = () => {
    console.log('Attempting to clear cart...');
    console.log('Cart state before clearing:', state);
    
    // Try multiple methods to clear the cart
    if (clearCart && typeof clearCart === 'function') {
      console.log('Using clearCart function');
      clearCart();
      
      // Force a re-render by dispatching an additional action
      setTimeout(() => {
        console.log('Dispatching additional action to force re-render');
        dispatch({ type: 'FORCE_UPDATE' });
      }, 100);
      return;
    }
    
    // Try dispatching CLEAR_CART action
    if (dispatch) {
      console.log('Using dispatch with CLEAR_CART action');
      dispatch({ type: 'CLEAR_CART' });
      return;
    }
    
    // Try dispatching RESET_CART action
    if (dispatch) {
      console.log('Using dispatch with RESET_CART action');
      dispatch({ type: 'RESET_CART' });
      return;
    }
    
    // Try dispatching EMPTY_CART action
    if (dispatch) {
      console.log('Using dispatch with EMPTY_CART action');
      dispatch({ type: 'EMPTY_CART' });
      return;
    }
    
    console.error('Could not clear cart - no clear method found');
  };

  // Check cart state after clearing
  useEffect(() => {
    if (isSuccess) {
      console.log('Cart state after clearing:', state);
    }
  }, [state, isSuccess]);

  const handlePaymentWithRazorpay = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setPaymentError('');
    setIsProcessing(true);

    const orderData = {
      amount: state.total * 100, // Razorpay expects paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const options = {
      key: razorpayKeyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'DRC Cinema',
      description: 'Movie Ticket Purchase',
      image: '/logo.png',
      handler: async function (response: any) {
        try {
          // Save order to Firestore with all required fields
          await addDoc(collection(firestore, 'orders'), {
            items: state.items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              selectedSize: item.selectedSize
            })),
            total: state.total,
            seatNumber,
            rowSelection,
            screenNumber,
            customerName: customerName.trim(),
            customerPhone: customerPhone.trim(),
            timestamp: serverTimestamp(),
            status: 'paid',
            razorpayPaymentId: response.razorpay_payment_id,
          });

          setIsProcessing(false);
          setIsSuccess(true);
          setShowSuccessBoard(true);

          // Close modal and show success board
          setTimeout(() => {
            onPaymentSuccess(seatNumber, rowSelection, screenNumber, customerName, customerPhone);
            setIsSuccess(false);
            onClose();
            
            // Clear the cart after successful payment
            clearCartItems();
            
            // Force navigate to home page with a full page reload
            setTimeout(() => {
              console.log('Navigating to home page');
              window.location.href = '/';
            }, 500);
          }, 3000);
        } catch (err: any) {
          console.error('Firestore Save Error:', err);
          setPaymentError('Payment succeeded but saving to database failed. Please contact support.');
          setIsProcessing(false);
        }
      },
      prefill: { name: customerName, email: 'user@example.com', contact: customerPhone },
      notes: { purpose: 'Movie Ticket Purchase' },
      theme: { color: '#8b5cf6' },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          clearPaymentFields();
        },
        escape: true,
        confirmclose: false,
        backdropclose: false,
        animation: 'fadeIn',
        // backdropclose: false,
        handleback: false,
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      console.error('Payment failed:', response.error);
      setIsProcessing(false);
      setPaymentError(`Payment failed: ${response.error.description || 'Payment was not completed. Please try again.'}`);
    });

    rzp.open();
  };

  const handleCloseModal = () => {
    if (!isProcessing && !isSuccess) {
      clearPaymentFields();
      onClose();
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
          onClick={handleCloseModal}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Success Board Overlay */}
        <AnimatePresence>
          {showSuccessBoard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border border-green-500/30"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PartyPopper className="text-white" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                <p className="text-white/80 mb-6">Your order has been confirmed and will be ready soon.</p>
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <p className="text-white/90 text-sm mb-1">Order Total</p>
                  <p className="text-2xl font-bold text-white">₹{state.total}</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                  <CheckCircle size={16} />
                  <span>Redirecting to home...</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative w-full max-w-md bg-neutral-950/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-neutral-800"
        >
          <div className="p-6 border-b border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-100">Secure Payment</h2>
                  <p className="text-sm text-neutral-400">Pay securely using Razorpay</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                disabled={isProcessing || isSuccess}
                className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-600 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Order Summary */}
              <div className="mb-6 p-4 bg-neutral-800/50 rounded-xl">
                <h3 className="text-sm font-medium text-neutral-300 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between text-neutral-400">
                      <span>{item.name}{item.selectedSize ? ` (${item.selectedSize})` : ''} <span className="text-neutral-500 ml-2">× {item.quantity}</span></span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-neutral-700 mt-3 pt-3 flex justify-between font-bold">
                  <span className="text-neutral-100">Total</span>
                  <span className="text-violet-400">₹{state.total}</span>
                </div>
              </div>

              {/* Error Display */}
              {paymentError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="text-red-400" size={20} />
                    <h3 className="text-lg font-semibold text-red-400">Payment Error</h3>
                  </div>
                  <p className="text-red-300 text-sm">{paymentError}</p>
                  <button
                    onClick={clearPaymentFields}
                    className="mt-3 w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-400 hover:text-red-300 font-medium text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={16} />
                    Clear and Try Again
                  </button>
                </div>
              )}

              {/* Customer Details */}
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input-field w-full"
                  disabled={isProcessing || isSuccess}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="input-field w-full"
                  disabled={isProcessing || isSuccess}
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>

              {/* Seat Details */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Screen</label>
                  <select
                    value={screenNumber}
                    onChange={(e) => setScreenNumber(Number(e.target.value))}
                    className="input-field w-full"
                    disabled={isProcessing || isSuccess}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Row</label>
                  <select
                    value={rowSelection}
                    onChange={(e) => setRowSelection(e.target.value)}
                    className="input-field w-full"
                    disabled={isProcessing || isSuccess}
                  >
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
                      <option key={row} value={row}>{row}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Seat</label>
                  <select
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(Number(e.target.value))}
                    className="input-field w-full"
                    disabled={isProcessing || isSuccess}
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                onClick={handlePaymentWithRazorpay}
                disabled={isProcessing || isSuccess}
                whileHover={!isProcessing && !isSuccess ? { scale: 1.02 } : {}}
                whileTap={!isProcessing && !isSuccess ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isProcessing || isSuccess
                    ? 'bg-neutral-700 cursor-not-allowed text-neutral-400'
                    : 'btn-primary'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-neutral-500 border-t-neutral-300 rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <CheckCircle size={20} /> Payment Successful!
                  </div>
                ) : (
                  `Pay ₹${state.total}`
                )}
              </motion.button>

              <div className="text-xs text-neutral-500 text-center mt-4 space-y-1">
                <p>Secure payment powered by Razorpay</p>
                {onGoToTermsOfService && onGoToPrivacyPolicy && (
                  <p>
                    By proceeding, you agree to{' '}
                    <button onClick={onGoToTermsOfService} className="underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button onClick={onGoToPrivacyPolicy} className="underline">
                      Privacy Policy
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;