import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Eye, Database, CreditCard, Phone, Mail } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950/95 backdrop-blur-xl rounded-3xl border border-neutral-800 overflow-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="text-primary-400" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-100">Privacy Policy</h2>
                  <p className="text-sm text-neutral-400">Effective from {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 border border-neutral-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            <div className="space-y-6">
              {/* Introduction */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="text-primary-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Our Commitment to Your Privacy</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      DRC Cinema Hall ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
                      outlines how we collect, use, and protect the personal information you provide through our food ordering platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <Database className="text-accent-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Information We Collect</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm mb-4">
                      When you place an order or use our admin features, we may collect information such as your name, 
                      email address, phone number, and order details. We also collect device and usage data, including your IP address, 
                      browser type, and interactions with our website, to improve user experience and platform performance. 
                      Payment information is handled securely through Instamojo, and we do not store your card or banking details.
                    </p>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-success-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="text-success-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">How We Use Your Information</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      The information you provide is used to process your orders, send confirmation and updates, 
                      enhance customer service, and maintain the security of the platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Sharing */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="text-amber-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Data Sharing & Third Parties</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      We do not sell or share your personal data with third parties, except when necessary to complete 
                      a transaction (e.g., with Instamojo or Firebase) or when required by law.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookies */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Database className="text-primary-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Cookies</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      We use cookies to personalize your experience and understand usage trends. These cookies can be 
                      controlled through your browser settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-success-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="text-success-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Data Security</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      All your data is secured through industry-standard protocols including encryption, authentication 
                      via Firebase, and secure database storage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Third-Party Links */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="text-accent-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Third-Party Links</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      Our platform may contain links to third-party sites such as Instamojo, and we are not responsible 
                      for their privacy practices.
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="text-primary-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Your Rights</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      You have the right to access your data, request correction or deletion, and withdraw consent at any time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-amber-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Policy Updates</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      We may update this policy from time to time, and any changes will be reflected on this page with 
                      a new effective date.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-primary-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Contact Us</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm mb-3">
                      If you have any questions about this policy or how your data is used, you may contact us at:
                    </p>
                    <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                      <p className="text-primary-300 font-medium text-sm">
                        📧 Email: info@drccinema.com
                      </p>
                      <p className="text-neutral-400 text-xs mt-1">
                        We'll respond to your privacy inquiries within 48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PrivacyPolicyModal;