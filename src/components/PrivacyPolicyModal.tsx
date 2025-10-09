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
                    <div className="space-y-4">
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        We collect information to provide and improve our food ordering services. The types of information we collect include:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-accent-500/10 rounded-xl border border-accent-500/20">
                          <h4 className="text-accent-300 font-medium text-sm mb-2">👤 Personal Information</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• Full name and contact details (phone number, email)</li>
                            <li>• Cinema seat information (screen, row, seat number)</li>
                            <li>• Order history and preferences</li>
                            <li>• Account credentials for admin users</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                          <h4 className="text-primary-300 font-medium text-sm mb-2">💳 Payment Information</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• Payment transaction details (handled by Instamojo)</li>
                            <li>• Order amounts and payment status</li>
                            <li>• We do NOT store credit card or banking details</li>
                            <li>• All payment data is encrypted and PCI compliant</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-success-500/10 rounded-xl border border-success-500/20">
                          <h4 className="text-success-300 font-medium text-sm mb-2">📊 Technical Information</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• IP address and browser information</li>
                            <li>• Device type and operating system</li>
                            <li>• Website usage patterns and interactions</li>
                            <li>• Cookies for session management</li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
                    <div className="space-y-4">
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        We use your information solely for legitimate business purposes to provide our services:
                      </p>
                      
                      <div className="space-y-2">
                        <div className="p-3 bg-success-500/10 rounded-xl border border-success-500/20">
                          <h4 className="text-success-300 font-medium text-sm mb-2">🛒 Order Processing</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• Process and fulfill your food orders</li>
                            <li>• Deliver items to your cinema seat</li>
                            <li>• Send order confirmations and status updates</li>
                            <li>• Handle payment processing and receipts</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                          <h4 className="text-primary-300 font-medium text-sm mb-2">🔧 Service Improvement</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• Analyze usage patterns to improve user experience</li>
                            <li>• Maintain platform security and prevent fraud</li>
                            <li>• Provide customer support and resolve issues</li>
                            <li>• Optimize delivery times and service quality</li>
                          </ul>
                        </div>
                      </div>
                      
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        We do not use your information for marketing purposes or share it with third parties for advertising.
                      </p>
                    </div>
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
                    <div className="space-y-4">
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        We maintain strict control over your personal data and only share it in specific circumstances:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-success-500/10 rounded-xl border border-success-500/20">
                          <h4 className="text-success-300 font-medium text-sm mb-2">✅ Authorized Sharing</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• <strong>Instamojo:</strong> Payment processing (encrypted transaction data only)</li>
                            <li>• <strong>Firebase:</strong> Secure data storage and authentication</li>
                            <li>• <strong>Netlify:</strong> Website hosting and serverless functions</li>
                            <li>• <strong>Legal Requirements:</strong> When required by Indian law or court orders</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                          <h4 className="text-red-300 font-medium text-sm mb-2">❌ We Never Share</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• Personal data with advertisers or marketers</li>
                            <li>• Contact information with third parties</li>
                            <li>• Order history for commercial purposes</li>
                            <li>• Any data for profit or revenue generation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
                    <div className="space-y-4">
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        We use cookies to enhance your browsing experience and maintain platform functionality:
                      </p>
                      
                      <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                        <h4 className="text-primary-300 font-medium text-sm mb-2">🍪 Cookie Types</h4>
                        <ul className="text-neutral-400 text-xs space-y-1">
                          <li>• <strong>Essential Cookies:</strong> Required for cart functionality and user sessions</li>
                          <li>• <strong>Performance Cookies:</strong> Help us understand how you use our website</li>
                          <li>• <strong>Authentication Cookies:</strong> Keep admin users logged in securely</li>
                        </ul>
                      </div>
                      
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        You can control cookies through your browser settings, but disabling them may affect website functionality.
                      </p>
                    </div>
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
                    <div className="space-y-4">
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        We implement comprehensive security measures to protect your personal information:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-success-500/10 rounded-xl border border-success-500/20">
                          <h4 className="text-success-300 font-medium text-sm mb-2">🔒 Technical Security</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• SSL/TLS encryption for all data transmission</li>
                            <li>• Firebase Authentication with industry-standard protocols</li>
                            <li>• Encrypted database storage with access controls</li>
                            <li>• Regular security updates and monitoring</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                          <h4 className="text-primary-300 font-medium text-sm mb-2">🛡️ Access Controls</h4>
                          <ul className="text-neutral-400 text-xs space-y-1">
                            <li>• Admin access restricted to authorized personnel only</li>
                            <li>• Multi-factor authentication for sensitive operations</li>
                            <li>• Regular access reviews and permission audits</li>
                            <li>• Secure API endpoints with rate limiting</li>
                          </ul>
                        </div>
                      </div>
                      
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        Despite our security measures, no system is 100% secure. We continuously monitor and improve our security practices.
                      </p>
                    </div>
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
                    <div className="space-y-4">
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        Under Indian data protection laws, you have the following rights regarding your personal information:
                      </p>
                      
                      <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
                        <h4 className="text-primary-300 font-medium text-sm mb-2">⚖️ Your Data Rights</h4>
                        <ul className="text-neutral-400 text-xs space-y-1">
                          <li>• <strong>Access:</strong> Request a copy of your personal data we hold</li>
                          <li>• <strong>Correction:</strong> Update or correct inaccurate information</li>
                          <li>• <strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                          <li>• <strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                          <li>• <strong>Withdrawal:</strong> Withdraw consent for data processing at any time</li>
                        </ul>
                      </div>
                      
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        To exercise these rights, contact us at info@drccinema.com with your request and proof of identity.
                      </p>
                    </div>
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
                        Data Protection Officer: Available via email | Response time: 24-48 hours
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