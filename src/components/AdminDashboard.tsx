import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, CheckCircle, Phone, User, MapPin, ShoppingBag, Calendar, LogOut, Trash2, TrendingUp, TrendingDown, Filter, Search, DollarSign, BarChart3, Receipt, ChefHat, Package, X, Download } from 'lucide-react';
import { auth } from '../firebase/config';
import { firestore } from '../firebase/config';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, where, getDocs } from 'firebase/firestore';
import { Order } from '../types';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onSignOut: () => Promise<void>;
}

interface DailySales {
  date: string;
  revenue: number;
  orderCount: number;
  fullDate: Date;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onSignOut }) => {
  const [orders, setOrders] = useState<Record<string, Order>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'paid' | 'confirmed' | 'preparing' | 'ready' | 'ongoing' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'time' | 'total' | 'status'>('time');
  const [searchTerm, setSearchTerm] = useState('');
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
  const [dailySales, setDailySales] = useState<DailySales[]>([]);
  const [showSalesReport, setShowSalesReport] = useState(false);
  
  // Date filtering states
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'custom'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Firestore listener
  useEffect(() => {
    const ordersCollection = collection(firestore, 'orders');
    const ordersQuery = query(ordersCollection, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const firestoreOrders: Record<string, Order> = {};

      snapshot.docs.forEach((docItem) => {
        const data = docItem.data();
        const timestamp = data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp);

        firestoreOrders[docItem.id] = {
          id: docItem.id,
          ...data,
          timestamp,
        } as Order;
      });

      setOrders(firestoreOrders);
      setLoading(false);
    }, (error) => {
      console.error('Firestore error:', error);
      setLoading(false);
      alert(`Error connecting to Firestore: ${error.message}`);
    });

    return () => unsubscribe();
  }, []);

  // Calculate today's and yesterday's revenue and daily sales
  useEffect(() => {
    const calculateRevenue = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Today's revenue
      const todayQuery = query(
        collection(firestore, 'orders'),
        where('timestamp', '>=', today),
        where('timestamp', '<', tomorrow)
      );
      
      const todaySnapshot = await getDocs(todayQuery);
      let todayRev = 0;
      todaySnapshot.forEach((doc) => {
        todayRev += doc.data().total || 0;
      });
      setTodayRevenue(todayRev);
      
      // Yesterday's revenue
      const yesterdayQuery = query(
        collection(firestore, 'orders'),
        where('timestamp', '>=', yesterday),
        where('timestamp', '<', today)
      );
      
      const yesterdaySnapshot = await getDocs(yesterdayQuery);
      let yesterdayRev = 0;
      yesterdaySnapshot.forEach((doc) => {
        yesterdayRev += doc.data().total || 0;
      });
      setYesterdayRevenue(yesterdayRev);
      
      // Calculate percentage change
      const change = yesterdayRev > 0 ? ((todayRev - yesterdayRev) / yesterdayRev) * 100 : 0;
      setRevenueChange(change);
    };
    
    calculateRevenue();
  }, [orders]);

  // Calculate daily sales based on date filter
  useEffect(() => {
    const calculateDailySales = async () => {
      const dateRange = getDateRange();
      let salesData: DailySales[] = [];
      
      if (dateRange.start && dateRange.end) {
        // Calculate days between start and end date
        const daysDiff = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
        
        // Generate sales data for each day in range
        for (let i = 0; i < daysDiff; i++) {
          const currentDate = new Date(dateRange.start);
          currentDate.setDate(currentDate.getDate() + i);
          currentDate.setHours(0, 0, 0, 0);
          
          const nextDate = new Date(currentDate);
          nextDate.setDate(nextDate.getDate() + 1);
          
          const dayQuery = query(
            collection(firestore, 'orders'),
            where('timestamp', '>=', currentDate),
            where('timestamp', '<', nextDate)
          );
          
          const daySnapshot = await getDocs(dayQuery);
          let dayRevenue = 0;
          let orderCount = 0;
          daySnapshot.forEach((doc) => {
            dayRevenue += doc.data().total || 0;
            orderCount++;
          });
          
          salesData.push({
            date: currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            revenue: dayRevenue,
            orderCount,
            fullDate: currentDate
          });
        }
      } else {
        // Default: show last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          date.setHours(0, 0, 0, 0);
          
          const nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);
          
          const dayQuery = query(
            collection(firestore, 'orders'),
            where('timestamp', '>=', date),
            where('timestamp', '<', nextDate)
          );
          
          const daySnapshot = await getDocs(dayQuery);
          let dayRevenue = 0;
          let orderCount = 0;
          daySnapshot.forEach((doc) => {
            dayRevenue += doc.data().total || 0;
            orderCount++;
          });
          
          salesData.push({
            date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            revenue: dayRevenue,
            orderCount,
            fullDate: date
          });
        }
      }
      
      setDailySales(salesData);
    };
    
    if (showSalesReport) {
      calculateDailySales();
    }
  }, [orders, dateFilter, startDate, endDate, showSalesReport]);

  const handleStatusChange = async (orderId: string, newStatus: 'new' | 'paid' | 'confirmed' | 'preparing' | 'ready' | 'ongoing' | 'completed') => {
    try {
      const orderDoc = doc(firestore, 'orders', orderId);
      await updateDoc(orderDoc, { status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status.');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const orderDoc = doc(firestore, 'orders', orderId);
      await deleteDoc(orderDoc);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    }
  };

  const getDateRange = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    const monthStart = new Date(today);
    monthStart.setDate(1);
    
    switch (dateFilter) {
      case 'today':
        return { start: today, end: tomorrow };
      case 'yesterday':
        return { start: yesterday, end: today };
      case 'thisWeek':
        return { start: weekStart, end: tomorrow };
      case 'thisMonth':
        return { start: monthStart, end: tomorrow };
      case 'custom':
        return { 
          start: startDate ? new Date(startDate) : null, 
          end: endDate ? new Date(endDate + 'T23:59:59') : null 
        };
      default:
        return { start: null, end: null };
    }
  };

  const getSalesReportTitle = () => {
    const dateRange = getDateRange();
    
    if (dateFilter === 'all') {
      return 'Daily Sales Report (Last 7 Days)';
    } else if (dateFilter === 'today' || dateFilter === 'yesterday') {
      return `Sales Report for ${dateFilter === 'today' ? 'Today' : 'Yesterday'}`;
    } else if (dateFilter === 'thisWeek') {
      return 'Sales Report (This Week)';
    } else if (dateFilter === 'thisMonth') {
      return 'Sales Report (This Month)';
    } else if (dateFilter === 'custom' && dateRange.start && dateRange.end) {
      const start = dateRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const end = dateRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `Sales Report (${start} - ${end})`;
    }
    
    return 'Daily Sales Report';
  };

  const filteredOrders = Object.entries(orders)
    .filter(([_, order]) => {
      // Apply status filter
      if (filter !== 'all' && order.status !== filter) return false;
      
      // Apply date filter
      const dateRange = getDateRange();
      if (dateRange.start && dateRange.end) {
        const orderDate = new Date(order.timestamp);
        if (orderDate < dateRange.start || orderDate > dateRange.end) return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          order.customerName?.toLowerCase().includes(searchLower) ||
          order.customerPhone?.includes(searchLower) ||
          order.id.toLowerCase().includes(searchLower) ||
          order.items.some(item => item.name.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    })
    .sort(([_, a], [__, b]) => {
      if (sortBy === 'total') {
        return b.total - a.total;
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const stats = {
    total: Object.keys(orders).length,
    new: Object.values(orders).filter(order => order.status === 'new').length,
    paid: Object.values(orders).filter(order => order.status === 'paid').length,
    confirmed: Object.values(orders).filter(order => order.status === 'confirmed').length,
    preparing: Object.values(orders).filter(order => order.status === 'preparing').length,
    ready: Object.values(orders).filter(order => order.status === 'ready').length,
    ongoing: Object.values(orders).filter(order => order.status === 'ongoing').length,
    completed: Object.values(orders).filter(order => order.status === 'completed').length,
    revenue: Object.values(orders).reduce((sum, order) => sum + order.total, 0),
  };

  const exportData = () => {
    const csvContent = [
      ['Order ID', 'Customer Name', 'Phone', 'Status', 'Total', 'Date', 'Items'],
      ...filteredOrders.map(([orderId, order]) => [
        orderId.slice(-8),
        order.customerName,
        order.customerPhone,
        order.status,
        order.total,
        new Date(order.timestamp).toLocaleString(),
        order.items.map(item => `${item.name} (${item.quantity})`).join('; ')
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-400">Connecting to Firestore...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Main Container with Full Page Scrolling */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header - No Sticky Positioning */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onSignOut}
                className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-600 transition-all"
              >
                <LogOut size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-neutral-100">Admin Dashboard</h1>
                <p className="text-sm text-neutral-400">Manage all orders and track revenue</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={exportData}
                className="btn-secondary flex items-center gap-2 px-3 py-2"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button 
                onClick={() => setShowSalesReport(!showSalesReport)}
                className="btn-secondary flex items-center gap-2 px-3 py-2"
              >
                <BarChart3 size={16} />
                <span className="hidden sm:inline">{showSalesReport ? 'Hide' : 'Show'} Sales</span>
              </button>
              <button onClick={onBackToHome} className="btn-secondary flex items-center gap-2 px-3 py-2">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 mb-6">
            <div className="bento-card p-3 lg:p-4 flex items-center gap-3 h-full">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="text-primary-400" size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-neutral-400 text-xs lg:text-sm truncate">Total Orders</p>
                <p className="text-xl lg:text-2xl font-bold text-neutral-100">{stats.total}</p>
              </div>
            </div>
            <div className="bento-card p-3 lg:p-4 flex items-center gap-3 h-full">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Receipt className="text-blue-400" size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-neutral-400 text-xs lg:text-sm truncate">New Orders</p>
                <p className="text-xl lg:text-2xl font-bold text-neutral-100">{stats.new}</p>
              </div>
            </div>
            <div className="bento-card p-3 lg:p-4 flex items-center gap-3 h-full">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="text-green-400" size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-neutral-400 text-xs lg:text-sm truncate">Paid</p>
                <p className="text-xl lg:text-2xl font-bold text-neutral-100">{stats.paid}</p>
              </div>
            </div>
            <div className="bento-card p-3 lg:p-4 flex items-center gap-3 h-full">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="text-amber-400" size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-neutral-400 text-xs lg:text-sm truncate">In Progress</p>
                <p className="text-xl lg:text-2xl font-bold text-neutral-100">{stats.confirmed + stats.preparing + stats.ready + stats.ongoing}</p>
              </div>
            </div>
            <div className="bento-card p-3 lg:p-4 flex items-center gap-3 h-full">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accent-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="text-accent-400" size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-neutral-400 text-xs lg:text-sm truncate">Total Revenue</p>
                <p className="text-xl lg:text-2xl font-bold gradient-text">₹{stats.revenue}</p>
              </div>
            </div>
          </div>

          {/* Today's Revenue Card */}
          <div className="bento-card p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">Today's Revenue</h3>
                <p className="text-2xl sm:text-3xl font-bold gradient-text mt-1">₹{todayRevenue}</p>
              </div>
              <div className="text-right">
                <div className={`flex items-center gap-1 text-sm ${revenueChange >= 0 ? 'text-success-400' : 'text-red-400'}`}>
                  {revenueChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{Math.abs(revenueChange).toFixed(1)}% from yesterday</span>
                </div>
                <p className="text-neutral-500 text-sm mt-1">Yesterday: ₹{yesterdayRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Sales Report - Filterable */}
        {showSalesReport && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bento-card p-4 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-100">{getSalesReportTitle()}</h3>
              <div className="text-sm text-neutral-400">
                {dailySales.length > 0 && (
                  <>
                    Total: ₹{dailySales.reduce((sum, day) => sum + day.revenue, 0)} 
                    <span className="ml-2">({dailySales.reduce((sum, day) => sum + day.orderCount, 0)} orders)</span>
                  </>
                )}
              </div>
            </div>
            
            {dailySales.length === 0 ? (
              <div className="text-center py-8">
                <Calendar size={48} className="text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400">No sales data for the selected period</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dailySales.map((day, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-neutral-800/50 rounded-lg gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar size={16} className="text-primary-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-neutral-100 font-medium text-sm truncate">{day.date}</p>
                        <p className="text-neutral-500 text-xs">{day.orderCount} orders</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                      <p className="text-neutral-100 font-bold">₹{day.revenue}</p>
                      <div className="w-24 sm:w-32 h-2 bg-neutral-700 rounded-full overflow-hidden flex-shrink-0">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (day.revenue / Math.max(...dailySales.map(d => d.revenue))) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Order Status Progress - Fully Responsive */}
        <div className="bento-card p-4 mb-6">
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Order Status Flow</h3>
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center justify-between min-w-max gap-2 sm:gap-4">
              {[
                { status: 'new', label: 'New', count: stats.new, color: 'blue', icon: Receipt },
                { status: 'paid', label: 'Paid', count: stats.paid, color: 'green', icon: DollarSign },
                { status: 'confirmed', label: 'Confirmed', count: stats.confirmed, color: 'indigo', icon: CheckCircle },
                { status: 'preparing', label: 'Preparing', count: stats.preparing, color: 'orange', icon: ChefHat },
                { status: 'ready', label: 'Ready', count: stats.ready, color: 'purple', icon: Package },
                { status: 'ongoing', label: 'Ongoing', count: stats.ongoing, color: 'amber', icon: Clock },
                { status: 'completed', label: 'Completed', count: stats.completed, color: 'emerald', icon: CheckCircle },
              ].map((stage, index) => (
                <div key={stage.status} className="flex flex-col items-center px-2 sm:px-3 min-w-[60px] sm:min-w-[80px]">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${stage.color}-500/20 rounded-full flex items-center justify-center mb-2`}>
                    <stage.icon className={`text-${stage.color}-400`} size={16} />
                  </div>
                  <p className="text-xs text-neutral-400 mb-1 hidden sm:block">{stage.label}</p>
                  <p className="text-sm font-bold text-neutral-100">{stage.count}</p>
                  {index < 6 && (
                    <div className="hidden sm:block absolute h-0.5 w-8 bg-neutral-700 ml-14 mt-6"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter & Sort - Fully Responsive */}
        <div className="bento-card p-4 mb-6">
          <div className="flex flex-col gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Date Filter - Mobile Optimized */}
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border flex items-center justify-center gap-2 ${
                    dateFilter !== 'all' 
                      ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25' 
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600'
                  }`}
                >
                  <Calendar size={16} />
                  {dateFilter === 'all' && 'All Time'}
                  {dateFilter === 'today' && 'Today'}
                  {dateFilter === 'yesterday' && 'Yesterday'}
                  {dateFilter === 'thisWeek' && 'This Week'}
                  {dateFilter === 'thisMonth' && 'This Month'}
                  {dateFilter === 'custom' && 'Custom Range'}
                </button>
                
                {/* Date Picker - Fixed Positioning */}
                {showDatePicker && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 w-full max-w-md"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-medium text-neutral-200">Filter by Date</h4>
                        <button onClick={() => setShowDatePicker(false)}>
                          <X size={16} className="text-neutral-400 hover:text-neutral-200" />
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          { value: 'all', label: 'All Time' },
                          { value: 'today', label: 'Today' },
                          { value: 'yesterday', label: 'Yesterday' },
                          { value: 'thisWeek', label: 'This Week' },
                          { value: 'thisMonth', label: 'This Month' },
                          { value: 'custom', label: 'Custom Range' }
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setDateFilter(option.value as any);
                              if (option.value !== 'custom') {
                                setShowDatePicker(false);
                              // Apply filter immediately for non-custom options
                              setTimeout(() => {
                                // Trigger a re-render to apply the filter
                                window.dispatchEvent(new Event('resize'));
                              }, 100);
                              }
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              dateFilter === option.value 
                                ? 'bg-primary-500/20 text-primary-400' 
                                : 'hover:bg-neutral-700 text-neutral-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      
                      {dateFilter === 'custom' && (
                        <div className="mt-3 pt-3 border-t border-neutral-700 space-y-3">
                          <div>
                            <label className="text-xs text-neutral-400 block mb-1">Start Date</label>
                            <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-400 block mb-1">End Date</label>
                            <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white text-sm"
                            />
                          </div>
                          <button
                            onClick={() => {
                              setShowDatePicker(false);
                              // Trigger a re-render to apply the filter
                              setTimeout(() => {
                                window.dispatchEvent(new Event('resize'));
                              }, 100);
                            }}
                            className="w-full px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            Apply Filter
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </div>
              
              {/* Status Filters - Responsive */}
              {(['all', 'new', 'paid', 'confirmed', 'preparing', 'ready', 'ongoing', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 border flex-shrink-0 ${
                    filter === status
                      ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'time' | 'total' | 'status')}
                className="input-field w-full sm:w-40 flex-shrink-0"
              >
                <option value="time">Sort by Time</option>
                <option value="total">Sort by Total</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders - Fully Responsive */}
        <div className="pb-8">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">
                📋
              </motion.div>
              <h3 className="text-2xl font-bold text-neutral-300 mb-2">No orders found</h3>
              <p className="text-neutral-500">
                {searchTerm ? 'No orders match your search criteria' : 
                 filter === 'all' && dateFilter === 'all' ? 'No orders have been placed yet' : 
                 `No orders found for the selected period`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <p className="text-neutral-400 text-sm">
                  Showing {filteredOrders.length} of {Object.keys(orders).length} orders
                </p>
              </div>
              
              {filteredOrders.map(([orderId, order]) => (
                <motion.div key={orderId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bento-card p-4 lg:p-6">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-neutral-100">Order #{orderId.slice(-8)}</h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'new' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                            order.status === 'paid' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                            order.status === 'confirmed' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                            order.status === 'preparing' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                            order.status === 'ready' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                            order.status === 'ongoing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
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
                      <div className="text-xl sm:text-2xl font-bold gradient-text">₹{order.total}</div>
                    </div>

                    {/* Customer & Seat */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-neutral-300 font-medium text-sm flex items-center gap-2">
                          <User size={14} /> Customer Details
                        </h4>
                        <div className="space-y-1 text-sm text-neutral-400">
                          <div>Name: {order.customerName}</div>
                          <div className="flex items-center gap-1"><Phone size={12} /> {order.customerPhone}</div>
                        </div>
                      </div>
                      {order.seatNumber && order.rowSelection && order.screenNumber && (
                        <div className="space-y-2">
                          <h4 className="text-neutral-300 font-medium text-sm flex items-center gap-2">
                            <MapPin size={14} /> Seat Details
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-neutral-400">
                            <span>Screen {order.screenNumber}</span>•<span>Row {order.rowSelection}</span>•<span>Seat {order.seatNumber}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      <h4 className="text-neutral-300 font-medium text-sm">Order Items</h4>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-neutral-400">{item.name}{item.selectedSize ? ` (${item.selectedSize})` : ''} <span className="text-neutral-500 ml-2">× {item.quantity}</span></span>
                            <span className="text-neutral-300 font-medium">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status & Delete */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-neutral-800">
                      <div className="w-full sm:w-auto">
                        <label className="text-sm font-medium text-neutral-300 block mb-2">Update Status</label>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(orderId, e.target.value as any)}
                          className="input-field w-full sm:w-40"
                        >
                          <option value="new">New</option>
                          <option value="paid">Paid</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <motion.button
                        onClick={() => handleDeleteOrder(orderId)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl text-red-400 hover:text-red-300 font-medium text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 size={14} /> Delete Order
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;