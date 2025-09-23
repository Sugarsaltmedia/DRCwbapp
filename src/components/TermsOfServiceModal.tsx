import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Shield, CreditCard, Users, AlertTriangle, Scale, Mail } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
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
                <div className="w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="text-accent-400" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-100">Terms & Conditions</h2>
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
                  <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="text-accent-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Agreement to Terms</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      By accessing and using the DRC Cinema Hall Food Ordering Platform, you agree to the following terms 
                      and conditions. This platform is intended for users who are at least 13 years old. By using our services, 
                      you confirm that you meet this requirement and agree to use the platform only for lawful and authorized purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Processing */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-primary-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Order Processing & Payment</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm mb-4">
                      All orders placed through the platform are subject to availability and confirmation. Once an order 
                      is submitted and payment is processed via Instamojo, it cannot be modified or canceled.
                    </p>
                    
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="text-amber-400" size={16} />
                        <span className="text-amber-300 font-medium text-sm">Refund Policy</span>
                      </div>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        Refunds are only issued for failed or duplicate transactions, after verification by our team.
                      </p>
                    </div>

                    <p className="text-neutral-400 leading-relaxed text-sm">
                      You are responsible for providing accurate information during the checkout process, including your 
                      contact details and order preferences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Access */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-success-500/20 rounded-lg flex items-center justify-center">
                    <Users className="text-success-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Admin Access & Security</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm mb-4">
                      Access to the admin dashboard is restricted to authorized personnel. If you are an admin, you are 
                      responsible for keeping your login credentials secure.
                    </p>

                    <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="text-red-400" size={16} />
                        <span className="text-red-300 font-medium text-sm">Security Warning</span>
                      </div>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        Any unauthorized access or misuse of the admin area is strictly prohibited and may lead to 
                        account suspension or legal action.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <Scale className="text-accent-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Intellectual Property</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      All intellectual property on the platform, including but not limited to the code, user interface, 
                      branding, and content, is owned by DRC Cinema Hall or its developers. You may not reproduce, 
                      redistribute, or use any part of the platform for commercial purposes without express written permission.
                    </p>
                  </div>
                </div>
              </div>

              {/* Liability & Disclaimers */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="text-amber-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Liability & Disclaimers</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm mb-4">
                      We are not liable for any delays, interruptions, or issues caused by third-party services, 
                      internet failures, or unauthorized access.
                    </p>

                    <div className="p-3 bg-neutral-800/30 rounded-xl border border-neutral-700">
                      <p className="text-neutral-300 text-xs leading-relaxed">
                        The platform is provided "as is" without any warranties of any kind, and we reserve the right 
                        to modify, suspend, or discontinue any part of the service at our sole discretion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Updates */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="text-primary-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Terms Updates</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      By continuing to use the platform, you accept any updates or modifications to these terms. 
                      We will notify users of significant changes through the platform or via email.
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
                      For questions regarding these terms or any legal concerns, please contact us at:
                    </p>
                    <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                      <p className="text-primary-300 font-medium text-sm">
                        📧 Email: info@drccinema.com
                      </p>
                      <p className="text-neutral-400 text-xs mt-1">
                        We'll respond to your legal inquiries within 48 hours.
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

export default TermsOfServiceModal;