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
                <p className="text-sm text-neutral-400">Effective from {new Date().toLocaleDateString()}</p>
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
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Our Commitment to Your Privacy</h2>
                <p className="text-neutral-400 leading-relaxed">
                  DRC Cinema Hall ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
                  outlines how we collect, use, and protect the personal information you provide through our food ordering platform.
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
                    <p className="text-neutral-400 leading-relaxed">
                      When you place an order or use our admin features, we may collect information such as your name, 
                      email address, phone number, and order details.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                      <Eye size={18} className="text-primary-400" />
                      Usage Information
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      We also collect device and usage data, including your IP address, browser type, and interactions 
                      with our website, to improve user experience and platform performance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-200 mb-3 flex items-center gap-2">
                      <CreditCard size={18} className="text-primary-400" />
                      Payment Information
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      Payment information is handled securely through Instamojo, and we do not store your card or banking details.
                    </p>
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
                
                <p className="text-neutral-400 leading-relaxed mb-4">
                  The information you provide is used to:
                </p>

                <ul className="space-y-2 text-neutral-400 ml-6">
                  <li>• Process your orders</li>
                  <li>• Send confirmation and updates</li>
                  <li>• Enhance customer service</li>
                  <li>• Maintain the security of the platform</li>
                </ul>
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
                
                <p className="text-neutral-400 leading-relaxed">
                  We do not sell or share your personal data with third parties, except when necessary to complete 
                  a transaction (e.g., with Instamojo or Firebase) or when required by law.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Database className="text-primary-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Cookies</h2>
                
                <p className="text-neutral-400 leading-relaxed">
                  We use cookies to personalize your experience and understand usage trends. These cookies can be 
                  controlled through your browser settings.
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center">
                <Shield className="text-success-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Data Security</h2>
                
                <p className="text-neutral-400 leading-relaxed">
                  All your data is secured through industry-standard protocols including encryption, authentication 
                  via Firebase, and secure database storage.
                </p>
              </div>
            </div>
          </div>

          {/* Third-Party Links */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center">
                <Eye className="text-accent-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Third-Party Links</h2>
                
                <p className="text-neutral-400 leading-relaxed">
                  Our platform may contain links to third-party sites such as Instamojo, and we are not responsible 
                  for their privacy practices.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Lock className="text-primary-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Your Rights</h2>
                
                <p className="text-neutral-400 leading-relaxed">
                  You have the right to access your data, request correction or deletion, and withdraw consent at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="text-amber-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Policy Updates</h2>
                
                <p className="text-neutral-400 leading-relaxed">
                  We may update this policy from time to time, and any changes will be reflected on this page with 
                  a new effective date.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bento-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Mail className="text-primary-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Contact Us</h2>
                
                <p className="text-neutral-400 leading-relaxed mb-4">
                  If you have any questions about this policy or how your data is used, you may contact us at:
                </p>

                <div className="p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
                  <p className="text-primary-300 font-medium">
                    📧 Email: info@drccinema.com
                  </p>
                  <p className="text-neutral-400 text-sm mt-2">
                    We'll respond to your privacy inquiries within 48 hours.
                  </p>
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