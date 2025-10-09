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
                    
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="text-amber-400" size={16} />
                        <span className="text-amber-300 font-medium text-sm">Refund & Cancellation Policy</span>
                      </div>
                      <div className="space-y-2 text-neutral-400 text-xs leading-relaxed">
                        <p><strong>Cancellations:</strong> Orders cannot be canceled once payment is confirmed and preparation has begun. All sales are final.</p>
                        <p><strong>Refunds:</strong> Refunds are only issued for:</p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                          <li>Failed payment transactions (processed within 5-7 business days)</li>
                          <li>Duplicate charges (verified and processed within 3-5 business days)</li>
                          <li>Technical errors on our platform (case-by-case basis)</li>
                        </ul>
                        <p><strong>Refund Process:</strong> Contact us at info@drccinema.com with your order ID and payment details. Refunds will be processed to the original payment method after verification.</p>
                      </div>
                      </p>
                    </div>

                    <p className="text-neutral-400 leading-relaxed text-sm">
                      You are responsible for providing accurate information during the checkout process, including your 
                      contact details and order preferences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing & Services */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-success-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-success-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Services & Pricing</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm mb-4">
                      DRC Cinema Hall offers a comprehensive food ordering service with the following features:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-success-500/10 rounded-xl border border-success-500/20">
                        <h4 className="text-success-300 font-medium text-sm mb-2">🍿 Food & Beverage Services</h4>
                        <ul className="text-neutral-400 text-xs space-y-1">
                          <li>• Premium Popcorn (₹130 - ₹340)</li>
                          <li>• Fresh Beverages & Milkshakes (₹50 - ₹150)</li>
                          <li>• Hot Food Items & Combos (₹70 - ₹230)</li>
                          <li>• Snacks & Desserts (₹40 - ₹160)</li>
                          <li>• 100+ items across 11 categories</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                        <h4 className="text-primary-300 font-medium text-sm mb-2">⚡ Service Features</h4>
                        <ul className="text-neutral-400 text-xs space-y-1">
                          <li>• Seat-side delivery within cinema halls</li>
                          <li>• Real-time order tracking</li>
                          <li>• Secure online payment processing</li>
                          <li>• Admin dashboard for order management</li>
                        </ul>
                      </div>
                    </div>
                    
                    <p className="text-neutral-400 leading-relaxed text-sm mt-4">
                      All prices are inclusive of applicable taxes. Prices may vary based on size selections and seasonal availability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Policy */}
              <div className="bento-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <Users className="text-accent-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100 mb-3">Delivery & Service Policy</h3>
                    <p className="text-neutral-400 leading-relaxed text-sm mb-4">
                      Our in-cinema delivery service ensures you receive your order quickly and efficiently.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-accent-500/10 rounded-xl border border-accent-500/20">
                        <h4 className="text-accent-300 font-medium text-sm mb-2">⏱️ Delivery Timelines</h4>
                        <ul className="text-neutral-400 text-xs space-y-1">
                          <li>• <strong>Minimum Delivery Time:</strong> 8-10 minutes from order confirmation</li>
                          <li>• <strong>Maximum Delivery Time:</strong> 15-20 minutes during peak hours</li>
                          <li>• <strong>Average Delivery Time:</strong> 10-15 minutes</li>
                          <li>• <strong>Rush Hour Delays:</strong> Up to 25 minutes during movie intervals</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                        <h4 className="text-primary-300 font-medium text-sm mb-2">🎯 Delivery Process</h4>
                        <ul className="text-neutral-400 text-xs space-y-1">
                          <li>• Orders are delivered directly to your cinema seat</li>
                          <li>• Staff will locate you using screen, row, and seat number</li>
                          <li>• Contactless delivery available upon request</li>
                          <li>• Real-time SMS updates on order status</li>
                        </ul>
                      </div>
                    </div>
                    
                    <p className="text-neutral-400 leading-relaxed text-sm mt-4">
                      Delivery times may vary based on order complexity, cinema occupancy, and movie showtimes. We strive to minimize disruption during movie screenings.
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
                    <div className="p-4 bg-primary-500/10 rounded-xl border border-primary-500/20 space-y-2">
                      <div className="text-primary-300 font-bold text-sm">
                        V H ENTERPRISES
                      </div>
                      <p className="text-primary-300 font-medium text-sm">
                        📞 Phone: +91 98765-43210 (India)
                      </p>
                      <p className="text-primary-300 font-medium text-sm">
                        📧 Email: info@drccinema.com
                      </p>
                      <p className="text-primary-300 font-medium text-sm">
                        📍 Address: DRC Cinema Hall, Main Street, India
                      </p>
                      <p className="text-neutral-400 text-xs mt-1">
                        Business Hours: 10:00 AM - 11:00 PM (All Days) | We'll respond to inquiries within 24-48 hours.
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