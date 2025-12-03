import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsOfServiceModal from './components/TermsOfServiceModal';

interface OrderDetails {
  seatNumber: number | null;
  rowSelection: string | null;
  screenNumber: number | null;
  customerName: string | null;
  customerPhone: string | null;
}

function App() {
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
    });

    return () => unsubscribe();
  }, []);

  const handleAdminSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
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
  };

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={
              <Hero 
                onStartOrdering={() => window.location.href = '/menu'} 
                onGoToAdmin={() => window.location.href = '/admin'}
                onGoToPrivacyPolicy={() => setShowPrivacyModal(true)}
                onGoToTermsOfService={() => setShowTermsModal(true)}
              />
            } />
            
            <Route path="/menu" element={<Menu onBack={() => window.location.href = '/'} />} />

            <Route path="/confirmation" element={
              <OrderConfirmation 
                onBackToHome={() => window.location.href = '/'}
                seatNumber={orderDetails.seatNumber}
                rowSelection={orderDetails.rowSelection}
                screenNumber={orderDetails.screenNumber}
                customerName={orderDetails.customerName}
                customerPhone={orderDetails.customerPhone}
              />
            } />

            <Route path="/admin-signin" element={
              isAdminAuthenticated ? <Navigate to="/admin" /> : 
              <AdminSignIn onSignIn={() => window.location.href = '/admin'} onBack={() => window.location.href = '/'} />
            } />

            <Route path="/admin" element={
              isAdminAuthenticated ? 
              <AdminDashboard onBackToHome={() => window.location.href = '/'} onSignOut={handleAdminSignOut} /> : 
              <Navigate to="/admin-signin" />
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <Cart onCheckout={() => setShowPaymentModal(true)} />

          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            onPaymentSuccess={handlePaymentSuccess}
            onGoToPrivacyPolicy={() => setShowPrivacyModal(true)}
            onGoToTermsOfService={() => setShowTermsModal(true)}
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
      </Router>
    </CartProvider>
  );
}

export default App;
