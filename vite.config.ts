import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure environment variables are loaded
  envDir: '.',
  envPrefix: ['VITE_', 'RAZORPAY_'],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
