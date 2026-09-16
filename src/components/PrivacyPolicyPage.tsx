import React from 'react';
import { PageView } from '../types';
import { ShieldCheck, Lock, Mail, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  setActivePage: (page: PageView) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ setActivePage }) => {
  return (
    <div className="bg-[#0d0d0d] text-white py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation back & Header */}
        <div className="space-y-6">
          <button
            onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#aaaaaa] hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="text-center space-y-4 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1e1a14] border border-[#3d3222] rounded-full text-[#d4af37] text-[11px] font-mono uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>LEGAL & COMPLIANCE</span>
            </div>
            
            <h1 className="font-serif-luxury text-3xl sm:text-5xl uppercase tracking-wider text-white">
              Privacy Policy
            </h1>

            <p className="text-xs font-mono text-[#888888] tracking-widest">
              LAST UPDATED: JULY 2026
            </p>

            <div className="w-20 h-[1px] bg-[#d4af37] mx-auto my-6" />
          </div>
        </div>

        {/* Policy Content Card Container */}
        <div className="bg-[#121212] border border-[#222222] rounded-sm p-6 sm:p-10 space-y-10 shadow-2xl text-xs sm:text-sm text-[#cccccc] leading-relaxed">
          
          {/* Section 1 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                1. Introduction
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              At KOBROX, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, purchase our products, or interact with our services.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                2. Information We Collect
              </h2>
            </div>
            <p className="text-[#b0b0b0]">
              We may collect the following information:
            </p>
            <ul className="space-y-2 pl-2">
              {[
                'Name and contact information',
                'Shipping and billing address',
                'Email address',
                'Payment information processed securely through third-party payment providers',
                'Order history and product preferences',
                'Website browsing data and cookies'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[#e0e0e0]">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                3. How We Use Your Information
              </h2>
            </div>
            <p className="text-[#b0b0b0]">
              KOBROX uses your information to:
            </p>
            <ul className="space-y-2 pl-2">
              {[
                'Process and fulfill your orders',
                'Provide customer support and after-sales service',
                'Improve our products and shopping experience',
                'Send important updates regarding your orders',
                'Communicate product information and brand updates (with your consent)'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[#e0e0e0]">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Lock className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                4. Information Protection
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or misuse.
            </p>
            <p className="text-[#b0b0b0] leading-relaxed">
              Payment information is processed through secure third-party payment systems, and KOBROX does not store your complete payment details.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                5. Cookies
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              Our website uses cookies to enhance your browsing experience, analyze website performance, and provide personalized services.
            </p>
            <p className="text-[#b0b0b0] leading-relaxed">
              You may disable cookies through your browser settings; however, some website features may not function properly.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                6. Third-Party Services
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              We may work with trusted third-party service providers, including payment processors, shipping partners, and analytics providers, to support our business operations.
            </p>
            <p className="text-[#b0b0b0] leading-relaxed">
              These providers are required to protect your information and only use it for authorized purposes.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                7. Your Rights
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              You have the right to request access, correction, or deletion of your personal information. To make such a request, please contact us.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-4 p-6 bg-[#181512] border border-[#3d3222] rounded-sm">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Mail className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg uppercase font-bold tracking-wider text-white">
                8. Contact Us
              </h2>
            </div>
            <p className="text-[#cccccc]">
              If you have questions about this Privacy Policy, please contact:
            </p>
            <div className="text-sm font-mono text-[#d4af37]">
              Email: <a href="mailto:support@kobrox.com" className="underline hover:text-white transition-colors">support@kobrox.com</a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
