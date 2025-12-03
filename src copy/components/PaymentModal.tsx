import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, CheckCircle } from 'lucide-react';
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

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  onGoToPrivacyPolicy,
  onGoToTermsOfService
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [seatNumber, setSeatNumber] = useState(1);
  const [rowSelection, setRowSelection] = useState('A');
  const [screenNumber, setScreenNumber] = useState(1);
  const [error, setError] = useState('');
  const { state } = useCart();

  const razorpayKeyId = 'rzp_test_RTzZoniisim7KO';

  const validateInputs = () => {
    if (!customerName.trim()) return 'Name is required';
    if (!customerPhone.trim()) return 'Phone number is required';
    if (!/^\d{10}$/.test(customerPhone)) return 'Phone number must be 10 digits';
    return '';
  };

  const handlePaymentWithRazorpay = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
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
      description: 'Movie Ticket Purchase (Test Payment)',
      image: '/logo.png',
      handler: async function (response: any) {
        try {
          await addDoc(collection(firestore, 'orders'), {
            items: state.items,
            total: state.total,
            seatNumber,
            rowSelection,
            screenNumber,
            customerName: customerName.trim(),
            customerPhone: customerPhone.trim(),
            timestamp: serverTimestamp(),
            status: 'paid_test',
            razorpayPaymentId: response.razorpay_payment_id,
          });

          setIsProcessing(false);
          setIsSuccess(true);

          setTimeout(() => {
            onPaymentSuccess(seatNumber, rowSelection, screenNumber, customerName, customerPhone);
            setIsSuccess(false);
          }, 2000);
        } catch (err: any) {
          console.error('Firestore Save Error:', err);
          alert('Payment succeeded but saving to database failed. Contact support.');
          setIsProcessing(false);
        }
      },
      prefill: { name: customerName, email: 'testuser@example.com', contact: customerPhone },
      notes: { purpose: 'Test Payment via Razorpay' },
      theme: { color: '#8b5cf6' },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      console.error('Payment failed:', response.error);
      setIsProcessing(false);
      alert(`Payment failed: ${response.error.description}`);
    });

    rzp.open();
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
          className="relative w-full max-w-md bg-neutral-950/95 backdrop-blur-xl rounded-3xl border border-neutral-800 overflow-hidden"
        >
          <div className="p-6 border-b border-neutral-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-primary-400" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-100">Test Payment</h2>
                  <p className="text-sm text-neutral-400">Pay securely using Razorpay (Test Mode)</p>
                  <p className="text-xs text-yellow-400 mt-1">🧪 Sandbox environment</p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 border border-neutral-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="input-field w-full"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="input-field w-full"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
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
                `Pay ₹${state.total} (Test Mode)`
              )}
            </motion.button>

            <div className="text-xs text-neutral-500 text-center mt-4 space-y-1">
              <p>Secure test payment powered by Razorpay</p>
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
