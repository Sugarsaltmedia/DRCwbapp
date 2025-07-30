import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import PaymentModal from './components/PaymentModal';
import OrderConfirmation from './components/OrderConfirmation';
import AdminDashboard from './components/AdminDashboard';

type AppState = 'hero' | 'menu' | 'confirmation' | 'admin';

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
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    seatNumber: null,
    rowSelection: null,
    screenNumber: null,
    customerName: null,
    customerPhone: null
  });

  const handleStartOrdering = () => {
    setCurrentState('menu');
  };

  const handleBackToHome = () => {
    setCurrentState('hero');
  };

  const handleGoToAdmin = () => {
    setCurrentState('admin');
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

        {currentState === 'admin' && (
          <AdminDashboard onBackToHome={handleBackToHome} />
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