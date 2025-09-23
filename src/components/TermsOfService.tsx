import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Shield, CreditCard, Users, AlertTriangle, Scale, Mail } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
              <div className="w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center">
                <FileText className="text-accent-400" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-100">Terms & Conditions</h1>
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
              <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center">
                <FileText className="text-accent-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Agreement to Terms</h2>
                <p className="text-neutral-400 leading-relaxed">
                  By accessing and using the DRC Cinema Hall Food Ordering Platform, you agree to the following terms 
                  and conditions. This platform is intended for users who are at least 13 years old. By using our services, 
                  you confirm that you meet this requirement and agree to use the platform only for lawful and authorized purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Order Processing */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <CreditCard className="text-primary-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Order Processing & Payment</h2>
                
                <div className="space-y-4">
                  <p className="text-neutral-400 leading-relaxed">
                    All orders placed through the platform are subject to availability and confirmation. Once an order 
                    is submitted and payment is processed via Instamojo, it cannot be modified or canceled.
                  </p>

                  <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="text-amber-400" size={20} />
                      <span className="text-amber-300 font-medium">Refund Policy</span>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Refunds are only issued for failed or duplicate transactions, after verification by our team.
                    </p>
                  </div>

                  <p className="text-neutral-400 leading-relaxed">
                    You are responsible for providing accurate information during the checkout process, including your 
                    contact details and order preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Access */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center">
                <Users className="text-success-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Admin Access & Security</h2>
                
                <div className="space-y-4">
                  <p className="text-neutral-400 leading-relaxed">
                    Access to the admin dashboard is restricted to authorized personnel. If you are an admin, you are 
                    responsible for keeping your login credentials secure.
                  </p>

                  <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="text-red-400" size={20} />
                      <span className="text-red-300 font-medium">Security Warning</span>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Any unauthorized access or misuse of the admin area is strictly prohibited and may lead to 
                      account suspension or legal action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center">
                <Scale className="text-accent-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Intellectual Property</h2>
                
                <p className="text-neutral-400 leading-relaxed">
                  All intellectual property on the platform, including but not limited to the code, user interface, 
                  branding, and content, is owned by DRC Cinema Hall or its developers. You may not reproduce, 
                  redistribute, or use any part of the platform for commercial purposes without express written permission.
                </p>
              </div>
            </div>
          </div>

          {/* Liability & Disclaimers */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="text-amber-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Liability & Disclaimers</h2>
                
                <div className="space-y-4">
                  <p className="text-neutral-400 leading-relaxed">
                    We are not liable for any delays, interruptions, or issues caused by third-party services, 
                    internet failures, or unauthorized access.
                  </p>

                  <div className="p-4 bg-neutral-800/30 rounded-xl border border-neutral-700">
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      The platform is provided "as is" without any warranties of any kind, and we reserve the right 
                      to modify, suspend, or discontinue any part of the service at our sole discretion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Updates */}
          <div className="bento-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <FileText className="text-primary-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-4">Terms Updates</h2>
                
                <p className="text-neutral-400 leading-relaxed">
                  By continuing to use the platform, you accept any updates or modifications to these terms. 
                  We will notify users of significant changes through the platform or via email.
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
                  For questions regarding these terms or any legal concerns, please contact us at:
                </p>

                <div className="p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
                  <p className="text-primary-300 font-medium">
                    📧 Email: info@drccinema.com
                  </p>
                  <p className="text-neutral-400 text-sm mt-2">
                    We'll respond to your legal inquiries within 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-neutral-500 text-sm">
              These Terms & Conditions are effective as of {new Date().toLocaleDateString()} and apply to all users of the DRC Cinema Hall food ordering platform.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;