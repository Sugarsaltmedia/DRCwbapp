import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, CheckCircle, Phone, User, MapPin, ShoppingBag, Calendar, LogOut, Trash2 } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { firestore } from '../firebase/config';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Order } from '../types';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onSignOut: () => Promise<void>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onSignOut }) => {
  const [orders, setOrders] = useState<Record<string, Order>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔧 Setting up Firestore listener for orders...');
    console.log('🔥 Firestore instance:', firestore);
    
    const ordersCollection = collection(firestore, 'orders');
    const ordersQuery = query(ordersCollection, orderBy('timestamp', 'desc'));
    console.log('📁 Orders collection reference:', ordersCollection);
    
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      console.log('📨 Firestore listener triggered');
      console.log('📊 Snapshot size:', snapshot.size);
      console.log('📊 Snapshot empty:', snapshot.empty);
      
      const firestoreOrders: Record<string, Order> = {};
      
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        console.log(`📄 Firestore Order ${doc.id}:`, data);
        
        // Convert Firestore timestamp to Date if it exists
        const timestamp = data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        
        firestoreOrders[doc.id] = {
          id: doc.id,
          ...data,
          timestamp
        } as Order;
      });
      
      console.log('✅ Orders found in Firestore:', Object.keys(firestoreOrders).length);
      console.log('📋 Firestore Order IDs:', Object.keys(firestoreOrders));
      
      setOrders(firestoreOrders);
      console.log('✅ Orders state updated');
      setLoading(false);
    }, (error) => {
      console.error('❌ Firestore listener error:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error message:', error.message);
      console.error('❌ Full error object:', error);
      
      // Show empty state on error
      console.log('🔄 Setting empty orders due to Firestore error');
      setOrders({});
      setLoading(false);
      alert(`Error connecting to Firestore: ${error.message}. Using demo data.`);
    });

    console.log('👂 Firestore listener attached');
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: 'ongoing' | 'completed') => {
    setUpdating(orderId);
    try {
      console.log('🔄 Updating order status in Firestore:', orderId, newStatus);
      
      // Update order in Firestore
      const orderDoc = doc(firestore, 'orders', orderId);
      await updateDoc(orderDoc, {
        status: newStatus
      });
      console.log('✅ Firestore order status updated successfully');
    } catch (error) {
      console.error('❌ Error updating order status in Firestore:', error);
      alert(`Error updating order status: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setUpdating(null);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete order from Firestore
      console.log('🗑️ Deleting order from Firestore:', orderId);
      const orderDoc = doc(firestore, 'orders', orderId);
      await deleteDoc(orderDoc);
      console.log('✅ Order deleted from Firestore successfully:', orderId);
    } catch (error) {
      console.error('❌ Error deleting order from Firestore:', error);
      alert(`Error deleting order from database: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  const filteredOrders = Object.entries(orders).filter(([_, order]) => {
    if (filter === 'all') return true;
    return order.status === filter;
  }).sort(([_, a], [__, b]) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const stats = {
    total: Object.keys(orders).length,
    ongoing: Object.values(orders).filter(order => order.status === 'ongoing').length,
    completed: Object.values(orders).filter(order => order.status === 'completed').length,
    revenue: Object.values(orders).reduce((sum, order) => sum + order.total, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-400">Connecting to Firestore...</p>
          <p className="text-neutral-500 text-sm mt-2">If this takes too long, check Firestore configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={onSignOut}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 border border-neutral-700 hover:border-neutral-600"
              >
                <LogOut size={16} className="sm:w-5 sm:h-5" />
              </button>
              
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-100">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-neutral-400 hidden sm:block">Manage all orders and track performance</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onBackToHome}
                className="btn-secondary flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bento-card p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-primary-400" size={16} />
                </div>
                <div>
                  <p className="text-neutral-400 text-xs sm:text-sm">Total Orders</p>
                  <p className="text-lg sm:text-2xl font-bold text-neutral-100">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bento-card p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Clock className="text-amber-400" size={16} />
                </div>
                <div>
                  <p className="text-neutral-400 text-xs sm:text-sm">Ongoing</p>
                  <p className="text-lg sm:text-2xl font-bold text-neutral-100">{stats.ongoing}</p>
                </div>
              </div>
            </div>

            <div className="bento-card p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-success-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-success-400" size={16} />
                </div>
                <div>
                  <p className="text-neutral-400 text-xs sm:text-sm">Completed</p>
                  <p className="text-lg sm:text-2xl font-bold text-neutral-100">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="bento-card p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Users className="text-accent-400" size={16} />
                </div>
                <div>
                  <p className="text-neutral-400 text-xs sm:text-sm">Revenue</p>
                  <p className="text-lg sm:text-2xl font-bold gradient-text">₹{stats.revenue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
            {(['all', 'ongoing', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border whitespace-nowrap ${
                  filter === status
                    ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {status === 'ongoing' ? stats.ongoing : stats.completed}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto p-2 sm:p-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              📋
            </motion.div>
            <h3 className="text-2xl font-bold text-neutral-300 mb-2">No orders found</h3>
            <p className="text-neutral-500">
              {filter === 'all' ? 'No orders have been placed yet' : `No ${filter} orders`}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredOrders.map(([orderId, order]) => (
              <motion.div
                key={orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bento-card p-3 sm:p-4 lg:p-6"
              >
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  {/* Order Header */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-neutral-100">
                            Order #{orderId.slice(-8)}
                          </h3>
                          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'ongoing' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-success-500/20 text-success-300 border border-success-500/30'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span>{new Date(order.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text">₹{order.total}</div>
                      </div>
                    </div>

                    {/* Customer & Seat Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <h4 className="text-neutral-300 font-medium text-xs sm:text-sm flex items-center gap-2">
                          <User size={12} className="sm:w-3.5 sm:h-3.5" />
                          Customer Details
                        </h4>
                        <div className="space-y-1 text-xs sm:text-sm text-neutral-400">
                          <div>Name: {order.customerName}</div>
                          <div className="flex items-center gap-1">
                            <Phone size={10} className="sm:w-3 sm:h-3" />
                            {order.customerPhone}
                          </div>
                        </div>
                      </div>

                      {order.seatNumber && order.rowSelection && order.screenNumber && (
                        <div className="space-y-2">
                          <h4 className="text-neutral-300 font-medium text-xs sm:text-sm flex items-center gap-2">
                            <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                            Seat Details
                          </h4>
                          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-400">
                            <span>Screen {order.screenNumber}</span>
                            <span>•</span>
                            <span>Row {order.rowSelection}</span>
                            <span>•</span>
                            <span>Seat {order.seatNumber}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      <h4 className="text-neutral-300 font-medium text-xs sm:text-sm">Order Items</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                            <span className="text-neutral-400">
                              {item.name}
                              {item.selectedSize && ` (${item.selectedSize})`}
                              <span className="text-neutral-500 ml-2">× {item.quantity}</span>
                            </span>
                            <span className="text-neutral-300 font-medium">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status Control */}
                  <div className="flex flex-col justify-center lg:min-w-[160px]">
                    <div className="space-y-3">
                      <label className="text-xs sm:text-sm font-medium text-neutral-300">Update Status</label>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(orderId, e.target.value as 'ongoing' | 'completed')}
                        disabled={updating === orderId}
                        className="input-field w-full lg:w-40 text-xs sm:text-sm"
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      {updating === orderId && (
                        <div className="flex items-center gap-2 text-xs text-primary-400">
                          <div className="w-3 h-3 border border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </div>
                      )}
                      
                      {/* Delete Button */}
                      <motion.button
                        onClick={() => handleDeleteOrder(orderId)}
                        disabled={updating === orderId}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full lg:w-40 px-3 sm:px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-lg sm:rounded-xl text-red-400 hover:text-red-300 font-medium text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">Delete Order</span>
                        <span className="sm:hidden">Delete</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;