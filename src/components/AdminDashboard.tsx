import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, CheckCircle, Phone, User, MapPin, ShoppingBag, Calendar, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { database } from '../firebase/config';
import { ref, onValue, update } from 'firebase/database';
import { Order } from '../types';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onSignOut: () => Promise<void>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onSignOut }) => {
  const [orders, setOrders] = useState<Record<string, Order>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  useEffect(() => {
    const ordersRef = ref(database, 'orders');
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOrders(data);
      } else {
        setOrders({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: 'ongoing' | 'completed') => {
    try {
      await update(ref(database, `orders/${orderId}`), {
        status: newStatus
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
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
          <p className="text-neutral-400">Loading orders...</p>
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
            <div className="flex items-center gap-4">
              <button
                onClick={onSignOut}
                className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 border border-neutral-700 hover:border-neutral-600"
              >
                <LogOut size={20} />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-neutral-100">Admin Dashboard</h1>
                <p className="text-sm text-neutral-400">Manage all orders and track performance</p>
              </div>
            </div>

            <button
              onClick={onBackToHome}
              className="btn-secondary flex items-center gap-2 px-4 py-2"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bento-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-neutral-100">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bento-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="text-amber-400" size={20} />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Ongoing</p>
                  <p className="text-2xl font-bold text-neutral-100">{stats.ongoing}</p>
                </div>
              </div>
            </div>

            <div className="bento-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="text-success-400" size={20} />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-neutral-100">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="bento-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center">
                  <Users className="text-accent-400" size={20} />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Revenue</p>
                  <p className="text-2xl font-bold gradient-text">₹{stats.revenue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(['all', 'ongoing', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  filter === status
                    ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {status === 'ongoing' ? stats.ongoing : stats.completed}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto p-4">
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
          <div className="space-y-4">
            {filteredOrders.map(([orderId, order]) => (
              <motion.div
                key={orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bento-card p-6"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Order Header */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-neutral-100">
                            Order #{orderId.slice(-8)}
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'ongoing' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-success-500/20 text-success-300 border border-success-500/30'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(order.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold gradient-text">₹{order.total}</div>
                      </div>
                    </div>

                    {/* Customer & Seat Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-neutral-300 font-medium text-sm flex items-center gap-2">
                          <User size={14} />
                          Customer Details
                        </h4>
                        <div className="space-y-1 text-sm text-neutral-400">
                          <div>Name: {order.customerName}</div>
                          <div className="flex items-center gap-1">
                            <Phone size={12} />
                            {order.customerPhone}
                          </div>
                        </div>
                      </div>

                      {order.seatNumber && order.rowSelection && order.screenNumber && (
                        <div className="space-y-2">
                          <h4 className="text-neutral-300 font-medium text-sm flex items-center gap-2">
                            <MapPin size={14} />
                            Seat Details
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-neutral-400">
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
                      <h4 className="text-neutral-300 font-medium text-sm">Order Items</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
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
                  <div className="flex flex-col justify-center">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Update Status</label>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(orderId, e.target.value as 'ongoing' | 'completed')}
                        className="input-field w-full lg:w-40"
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
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