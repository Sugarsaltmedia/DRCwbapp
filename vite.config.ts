import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ✅ Important: make paths work correctly after upload
  base: './', // <-- ADD THIS LINE

  // Ensure environment variables are loaded
  envDir: '.',
  envPrefix: ['VITE_', 'RAZORPAY_'],

  build: {
    // Optimize build for smaller bundle size
    minify: 'esbuild',
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  // Add image optimization
  assetsInclude: [
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.png',
    '**/*.gif',
    '**/*.svg',
    '**/*.webp'
  ],

  server: {
    https: false,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    }
  }
});
