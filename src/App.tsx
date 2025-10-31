import React, { useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';

// Lazy load components for code splitting
const Hero = React.lazy(() => import('./components/Hero'));
const Menu = React.lazy(() => import('./components/Menu'));
const Cart = React.lazy(() => import('./components/Cart'));
const PaymentModal = React.lazy(() => import('./components/PaymentModal'));
const OrderConfirmation = React.lazy(() => import('./components/OrderConfirmation'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const AdminSignIn = React.lazy(() => import('./components/AdminSignIn'));
const PrivacyPolicyModal = React.lazy(() => import('./components/PrivacyPolicyModal'));
const TermsOfServiceModal = React.lazy(() => import('./components/TermsOfServiceModal'));

type AppState = 'hero' | 'menu' | 'confirmation' | 'admin-signin' | 'admin';

interface OrderDetails {
  seatNumber: number | null;
  rowSelection: string | null;
  screenNumber: number | null;
  customerName: string | null;
  customerPhone: string | null;
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    seatNumber: null,
    rowSelection: null,
    screenNumber: null,
    customerName: null,
    customerPhone: null
  });

  // Listen for authentication state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdminAuthenticated(!!user);
      if (user && currentState === 'admin-signin') {
        setCurrentState('admin');
      } else if (!user && currentState === 'admin') {
        setCurrentState('hero');
      }
    });

    return () => unsubscribe();
  }, [currentState]);

  const handleStartOrdering = () => {
    setCurrentState('menu');
  };

  const handleBackToHome = () => {
    setCurrentState('hero');
  };

  const handleGoToAdmin = () => {
    if (isAdminAuthenticated) {
      setCurrentState('admin');
    } else {
      setCurrentState('admin-signin');
    }
  };

  const handleGoToPrivacyPolicy = () => {
    setShowPrivacyModal(true);
  };

  const handleGoToTermsOfService = () => {
    setShowTermsModal(true);
  };

  const handleAdminSignIn = () => {
    setCurrentState('admin');
  };

  const handleAdminSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentState('hero');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleCheckout = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (
    seatNumber: number, 
    rowSelection: string, 
    screenNumber: number,
    customerName: string,
    customerPhone: string
  ) => {
    console.log('🎉 Payment success callback triggered!');
    console.log('📋 Order details received:', { 
      seatNumber, 
      rowSelection, 
      screenNumber, 
      customerName, 
      customerPhone 
    });
    
    setOrderDetails({ seatNumber, rowSelection, screenNumber, customerName, customerPhone });
    console.log('💾 Order details saved to state');
    
    setShowPaymentModal(false);
    console.log('❌ Payment modal closed');
    
    setCurrentState('confirmation');
    console.log('✅ Navigated to confirmation screen');
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <React.Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
          </div>
        }>
          <div className="min-h-screen">
            {currentState === 'hero' && (
              <Hero 
                onStartOrdering={handleStartOrdering} 
                onGoToAdmin={handleGoToAdmin}
                onGoToPrivacyPolicy={handleGoToPrivacyPolicy}
                onGoToTermsOfService={handleGoToTermsOfService}
              />
            )}
            
            {currentState === 'menu' && (
              <Menu onBack={handleBackToHome} />
            )}
            
            {currentState === 'confirmation' && (
              <OrderConfirmation 
                onBackToHome={handleBackToHome}
                seatNumber={orderDetails.seatNumber}
                rowSelection={orderDetails.rowSelection}
                screenNumber={orderDetails.screenNumber}
                customerName={orderDetails.customerName}
                customerPhone={orderDetails.customerPhone}
              />
            )}

            {currentState === 'admin-signin' && (
              <AdminSignIn 
                onSignIn={handleAdminSignIn}
                onBack={handleBackToHome}
              />
            )}

            {currentState === 'admin' && (
              <AdminDashboard 
                onBackToHome={handleBackToHome}
                onSignOut={handleAdminSignOut}
              />
            )}
            <Cart onCheckout={handleCheckout} />
            
            <PaymentModal
              isOpen={showPaymentModal}
              onClose={() => setShowPaymentModal(false)}
              onPaymentSuccess={handlePaymentSuccess}
              onGoToPrivacyPolicy={handleGoToPrivacyPolicy}
              onGoToTermsOfService={handleGoToTermsOfService}
            />
            
            <PrivacyPolicyModal
              isOpen={showPrivacyModal}
              onClose={() => setShowPrivacyModal(false)}
            />
            
            <TermsOfServiceModal
              isOpen={showTermsModal}
              onClose={() => setShowTermsModal(false)}
            />
          </div>
        </React.Suspense>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;