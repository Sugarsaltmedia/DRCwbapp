import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Clock, ArrowRight, Sparkles, Award, Users, Star } from 'lucide-react';

interface HeroProps {
  onStartOrdering: () => void;
  onGoToAdmin: () => void;
  onGoToPrivacyPolicy: () => void;
  onGoToTermsOfService: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartOrdering, onGoToAdmin, onGoToPrivacyPolicy, onGoToTermsOfService }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden flex flex-col">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 max-w-7xl mx-auto py-12">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Main Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 bento-card lg:p-12"
          >
            <div className="space-y-8">
              {/* Brand Identity */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-3 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full"
                >
                  <Coffee className="text-primary-400" size={20} />
                  <span className="text-primary-300 font-medium text-sm">Premium Cafe Experience</span>
                </motion.div>
                
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                  <span className="gradient-text">DRC</span>
                  {' '}
                  <span className="text-neutral-100">CAFE</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-neutral-400 font-light max-w-2xl text-balance">
                  Artisanal coffee, gourmet snacks, and premium dining experience crafted for the modern palate.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center gap-3 p-4 bg-neutral-800/30 rounded-xl border border-neutral-800">
                  <Award className="text-success-400" size={20} />
                  <span className="text-neutral-300 text-xs sm:text-sm font-medium">Premium Quality</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-neutral-800/30 rounded-xl border border-neutral-800">
                  <Clock className="text-primary-400" size={20} />
                  <span className="text-neutral-300 text-xs sm:text-sm font-medium">Quick Service</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-neutral-800/30 rounded-xl border border-neutral-800 sm:col-span-2 lg:col-span-1">
                  <Users className="text-accent-400" size={20} />
                  <span className="text-neutral-300 text-xs sm:text-sm font-medium">100+ Items</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={onStartOrdering}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl w-full sm:w-auto justify-center"
              >
                <span>Start Ordering</span>
                <ArrowRight 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                  size={20} 
                />
              </motion.button>

              {/* Admin Button */}
              <motion.button
                onClick={onGoToAdmin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl w-full sm:w-auto justify-center sm:ml-4 mt-3 sm:mt-0"
              >
                <span>Admin Dashboard</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats & Features Cards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quality Assurance */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bento-card group hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="text-success-400" size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-neutral-100 font-semibold text-lg">Premium Quality</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">Fresh ingredients sourced daily from trusted suppliers</p>
                  <div className="flex items-center gap-2 text-success-400 text-xs font-medium">
                    <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                    <span>Quality Guaranteed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Speed & Efficiency */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bento-card group hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="text-primary-400" size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-neutral-100 font-semibold text-lg">Lightning Fast</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">Orders ready in 10-15 minutes with real-time tracking</p>
                  <div className="flex items-center gap-2 text-primary-400 text-xs font-medium">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                    <span>Express Service</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Menu Variety */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bento-card group hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="text-accent-400" size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-neutral-100 font-semibold text-lg">Diverse Menu</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">100+ carefully curated items across 11 categories</p>
                  <div className="flex items-center gap-2 text-accent-400 text-xs font-medium">
                    <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                    <span>Something for Everyone</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Footer with Privacy Policy Link */}
      <div className="relative z-20 p-4 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-neutral-500">
            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center select-text">
              <span className="flex items-center gap-2">
                📞 +91 98765-43210
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                📧 info@drccinema.com
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                📍 DRC Cinema Hall, Main Street
              </span>
            </div>
            
            {/* Copyright and Legal Links */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center select-text">
              <span className="select-text">© 2025 DRC Cinema Hall. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <button
                onClick={onGoToPrivacyPolicy}
                className="hover:text-primary-400 transition-colors duration-300 underline underline-offset-4 cursor-pointer bg-transparent border-none text-neutral-500 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 relative z-30"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={onGoToTermsOfService}
                className="hover:text-primary-400 transition-colors duration-300 underline underline-offset-4 cursor-pointer bg-transparent border-none text-neutral-500 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 relative z-30"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;