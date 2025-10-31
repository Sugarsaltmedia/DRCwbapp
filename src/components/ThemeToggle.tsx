import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-12 h-12 rounded-xl bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-700 light:hover:bg-neutral-300 flex items-center justify-center text-neutral-300 dark:text-neutral-300 light:text-neutral-700 hover:text-white dark:hover:text-white light:hover:text-neutral-900 transition-all duration-300 border border-neutral-700 dark:border-neutral-700 light:border-neutral-300 hover:border-neutral-600 dark:hover:border-neutral-600 light:hover:border-neutral-400"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'light' ? 0 : 180,
          scale: theme === 'light' ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Sun size={20} className="text-amber-500" />
        ) : (
          <Moon size={20} className="text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;