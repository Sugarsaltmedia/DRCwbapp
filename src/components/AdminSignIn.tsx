import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminSignInProps {
  onSignIn: () => void;
  onBack: () => void;
}

const AdminSignIn: React.FC<AdminSignInProps> = ({ onSignIn, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data?.user) {
        onSignIn();
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.message || 'Invalid email or password');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mb-6 w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 border border-neutral-700 hover:border-neutral-600"
        >
          <ArrowLeft size={20} />
        </motion.button>

        <div className="bento-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', duration: 0.6 }}
              className="w-16 h-16 bg-primary-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="text-primary-400" size={32} />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-neutral-100 mb-2">Admin Access</h1>
            <p className="text-neutral-400">Sign in to access the admin dashboard</p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-field w-full pl-12 pr-4"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field w-full pl-12 pr-12"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors duration-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
              >
                <p className="text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}

            {/* Sign In Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !email.trim() || !password.trim()}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                isLoading || !email.trim() || !password.trim()
                  ? 'bg-neutral-700 cursor-not-allowed text-neutral-400'
                  : 'btn-primary'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-neutral-500 border-t-neutral-300 rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In to Dashboard'
              )}
            </motion.button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-neutral-800/30 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <Lock className="text-primary-400" size={14} />
              </div>
              <span className="text-neutral-300 font-medium text-sm">Secure Access</span>
            </div>
            <p className="text-neutral-500 text-xs leading-relaxed">
              This area is restricted to authorized personnel only. All access attempts are logged for security purposes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSignIn;