import React, { useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { CartProvider } from './contexts/CartContext';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import PaymentModal from './components/PaymentModal';
import OrderConfirmation from './components/OrderConfirmation';
import AdminDashboard from './components/AdminDashboard';
import AdminSignIn from './components/AdminSignIn';

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
    setOrderDetails({ seatNumber, rowSelection, screenNumber, customerName, customerPhone });
    setShowPaymentModal(false);
    setCurrentState('confirmation');
  };

  return (
    <CartProvider>
      <div className="min-h-screen">
        {currentState === 'hero' && (
          <Hero onStartOrdering={handleStartOrdering} onGoToAdmin={handleGoToAdmin} />
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
        />
      </div>
    </CartProvider>
  );
}

export default App;