import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    imageUrl: string; // Changed from icon to imageUrl
    color: string;
  };
  onClick: () => void;
  itemCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, itemCount }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="bento-card h-full hover:border-primary-500/30 transition-all duration-300">
        <div className="flex flex-col h-full">
          
          {/* Icon Section */}
          <div className="flex items-center justify-between mb-4">
            <ImageWithFallback
              src={category.imageUrl}
              alt={category.name}
              className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg"
              fallbackClassName="w-16 h-16"
              loading="lazy"
              priority={true}
            />
            
            <motion.div
              className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-neutral-700"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowRight className="text-neutral-400 group-hover:text-primary-400 transition-colors duration-300" size={16} />
            </motion.div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-neutral-100 font-semibold text-lg mb-1 group-hover:text-primary-300 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-neutral-500 text-sm">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} available
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="pt-2">
              <div className="w-full bg-neutral-800 rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-1 rounded-full transition-all duration-500 group-hover:from-primary-400 group-hover:to-accent-400"
                  style={{ width: `${Math.min(100, (itemCount / 15) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;