import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Database, CreditCard, Phone, Mail, Calendar } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 border border-neutral-700 hover:border-neutral-600"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Shield className="text-primary-400" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-100">Privacy Policy</h1>
                <p className="text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Shield className="text-primary-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-2">Your Privacy Matters</h2>
                <p className="text-neutral-400 leading-relaxed">
                  At DRC Cinema Hall, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data when you use our food ordering platform.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center">
                <Database className="text-accent-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Information We Collect</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                      <Phone size={18} className="text-primary-400" />
                      Personal Information
                    </h3>
                    <ul className="space-y-2 text-neutral-400 ml-6">
                      <li>• Full name and contact information (phone number)</li>
                      <li>• Seat and screen details for order delivery</li>
                      <li>• Order history and preferences</li>
                      <li>• Payment information (processed securely through Instamojo)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                      <Eye size={18} className="text-primary-400" />
                      Usage Information
                    </h3>
                    <ul className="space-y-2 text-neutral-400 ml-6">
                      <li>• Device information and browser type</li>
                      <li>• IP address and location data</li>
                      <li>• App usage patterns and preferences</li>
                      <li>• Order timestamps and frequency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center">
                <Lock className="text-success-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">How We Use Your Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-neutral-200">Order Processing</h3>
                    <ul className="space-y-2 text-neutral-400 text-sm">
                      <li>• Process and fulfill your food orders</li>
                      <li>• Deliver orders to your specified seat</li>
                      <li>• Send order confirmations and updates</li>
                      <li>• Handle customer support inquiries</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-neutral-200">Service Improvement</h3>
                    <ul className="space-y-2 text-neutral-400 text-sm">
                      <li>• Analyze usage patterns to improve our app</li>
                      <li>• Personalize your ordering experience</li>
                      <li>• Develop new features and services</li>
                      <li>• Ensure platform security and prevent fraud</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Security */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <CreditCard className="text-primary-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Payment Security</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
                    <h3 className="text-lg font-semibold text-primary-300 mb-2">Secure Payment Processing</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      All payments are processed through Instamojo, a PCI DSS compliant payment gateway. We do not store your 
                      credit card information on our servers. Your payment data is encrypted and transmitted securely using 
                      industry-standard SSL encryption.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-neutral-800/30 rounded-xl">
                      <Lock className="text-success-400 mx-auto mb-2" size={24} />
                      <h4 className="text-neutral-200 font-medium text-sm">256-bit SSL</h4>
                      <p className="text-neutral-500 text-xs">Bank-level encryption</p>
                    </div>
                    <div className="text-center p-4 bg-neutral-800/30 rounded-xl">
                      <Shield className="text-success-400 mx-auto mb-2" size={24} />
                      <h4 className="text-neutral-200 font-medium text-sm">PCI Compliant</h4>
                      <p className="text-neutral-500 text-xs">Industry standards</p>
                    </div>
                    <div className="text-center p-4 bg-neutral-800/30 rounded-xl">
                      <Database className="text-success-400 mx-auto mb-2" size={24} />
                      <h4 className="text-neutral-200 font-medium text-sm">No Card Storage</h4>
                      <p className="text-neutral-500 text-xs">Zero data retention</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Eye className="text-amber-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Data Sharing & Third Parties</h2>
                
                <div className="space-y-4">
                  <p className="text-neutral-400 leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties. We only share your data in the following circumstances:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-neutral-200 font-medium">Payment Processing</h4>
                        <p className="text-neutral-400 text-sm">With Instamojo for secure payment processing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-neutral-200 font-medium">Service Providers</h4>
                        <p className="text-neutral-400 text-sm">With Firebase/Google Cloud for data storage and analytics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="text-neutral-200 font-medium">Legal Requirements</h4>
                        <p className="text-neutral-400 text-sm">When required by law or to protect our rights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center">
                <Shield className="text-success-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Your Rights</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-neutral-200">Data Access & Control</h3>
                    <ul className="space-y-2 text-neutral-400 text-sm">
                      <li>• Request access to your personal data</li>
                      <li>• Update or correct your information</li>
                      <li>• Delete your account and data</li>
                      <li>• Export your order history</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-neutral-200">Privacy Controls</h3>
                    <ul className="space-y-2 text-neutral-400 text-sm">
                      <li>• Opt-out of marketing communications</li>
                      <li>• Control data sharing preferences</li>
                      <li>• Request data portability</li>
                      <li>• File privacy complaints</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="text-accent-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Data Retention</h2>
                
                <div className="space-y-4">
                  <p className="text-neutral-400 leading-relaxed">
                    We retain your personal information only as long as necessary to provide our services and comply with legal obligations:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-neutral-800/30 rounded-xl">
                      <h4 className="text-neutral-200 font-medium mb-2">Order Data</h4>
                      <p className="text-neutral-400 text-sm">Retained for 2 years for customer service and analytics</p>
                    </div>
                    <div className="p-4 bg-neutral-800/30 rounded-xl">
                      <h4 className="text-neutral-200 font-medium mb-2">Account Data</h4>
                      <p className="text-neutral-400 text-sm">Deleted within 30 days of account closure</p>
                    </div>
                    <div className="p-4 bg-neutral-800/30 rounded-xl">
                      <h4 className="text-neutral-200 font-medium mb-2">Payment Data</h4>
                      <p className="text-neutral-400 text-sm">Not stored on our servers (handled by Instamojo)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Mail className="text-primary-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Contact Us</h2>
                
                <div className="space-y-4">
                  <p className="text-neutral-400 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-neutral-200">General Inquiries</h3>
                      <div className="space-y-2 text-neutral-400 text-sm">
                        <p>📧 Email: privacy@drccinema.com</p>
                        <p>📞 Phone: +91 XXXX-XXXX-XX</p>
                        <p>🏢 Address: DRC Cinema Hall, [Your Address]</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-neutral-200">Data Protection Officer</h3>
                      <div className="space-y-2 text-neutral-400 text-sm">
                        <p>📧 Email: dpo@drccinema.com</p>
                        <p>⏰ Response Time: Within 48 hours</p>
                        <p>🔒 Secure Contact: Available upon request</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Updates */}
          <div className="bento-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="text-amber-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Policy Updates</h2>
                
                <div className="space-y-4">
                  <p className="text-neutral-400 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                    We will notify you of any material changes by:
                  </p>

                  <ul className="space-y-2 text-neutral-400 ml-6">
                    <li>• Posting the updated policy on our platform</li>
                    <li>• Sending you an email notification (if you have an account)</li>
                    <li>• Displaying a prominent notice in the app</li>
                  </ul>

                  <div className="p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
                    <p className="text-primary-300 text-sm font-medium">
                      Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-neutral-500 text-sm">
              This Privacy Policy is effective as of {new Date().toLocaleDateString()} and applies to all users of the DRC Cinema Hall food ordering platform.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;