import React from 'react';
import { Coffee, Users, Clock, Star } from 'lucide-react';

interface HeroProps {
  onStartOrdering: () => void;
  onGoToAdmin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartOrdering, onGoToAdmin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Coffee className="w-16 h-16 sm:w-20 sm:h-20 text-amber-600 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-amber-600">DRC Cafe</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the finest coffee and delicious treats in a cozy atmosphere. 
            Order now and taste the difference!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="flex flex-col items-center p-4">
            <Star className="w-8 h-8 text-amber-500 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Premium Quality</h3>
            <p className="text-sm text-gray-600 text-center">Freshly roasted beans and finest ingredients</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Clock className="w-8 h-8 text-amber-500 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Quick Service</h3>
            <p className="text-sm text-gray-600 text-center">Fast preparation without compromising quality</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Users className="w-8 h-8 text-amber-500 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Friendly Staff</h3>
            <p className="text-sm text-gray-600 text-center">Welcoming atmosphere and excellent service</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartOrdering}
            className="btn-primary w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
          >
            Start Ordering
          </button>
          <button
            onClick={onGoToAdmin}
            className="btn-secondary w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;