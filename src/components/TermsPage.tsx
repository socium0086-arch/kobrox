import React from 'react';
import { PageView } from '../types';
import { ShieldCheck, FileText, Mail, ArrowLeft, Scale, CheckCircle2 } from 'lucide-react';

interface TermsPageProps {
  setActivePage: (page: PageView) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ setActivePage }) => {
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
              <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>LEGAL & COMPLIANCE</span>
            </div>
            
            <h1 className="font-serif-luxury text-3xl sm:text-5xl uppercase tracking-wider text-white">
              Terms & Conditions
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
                1. Acceptance of Terms
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              By accessing or using the KOBROX website, you agree to be bound by these Terms & Conditions. If you do not agree with these terms, please do not use our website or services.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                2. Product Information
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              KOBROX strives to provide accurate product descriptions, images, and specifications. However, slight variations may occur due to manufacturing processes, materials, and screen settings.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                3. Orders & Payments
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              All orders are subject to availability and confirmation. KOBROX reserves the right to refuse or cancel orders due to pricing errors, inventory issues, or suspected fraudulent activity.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                4. Shipping & Delivery
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              Orders may be fulfilled through Amazon Logistics or other authorized shipping partners. Delivery times may vary depending on destination, carrier conditions, and external factors.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                5. Warranty & Product Care
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              KOBROX products are designed and manufactured with attention to quality and durability. Warranty coverage and care instructions are provided separately in our Warranty & Care Guide.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                6. Intellectual Property
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              All content on this website, including logos, designs, images, text, and trademarks, is owned by KOBROX and protected by applicable intellectual property laws.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                7. Limitation of Liability
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              KOBROX shall not be responsible for indirect damages caused by improper use, unauthorized modification, or misuse of our products.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-3 pb-8 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg sm:text-xl uppercase font-bold tracking-wider text-white">
                8. Changes to Terms
              </h2>
            </div>
            <p className="text-[#b0b0b0] leading-relaxed">
              KOBROX reserves the right to update these Terms & Conditions at any time. Updated terms will be posted on this website.
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-4 p-6 bg-[#181512] border border-[#3d3222] rounded-sm">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Mail className="w-4 h-4" />
              <h2 className="font-serif-luxury text-lg uppercase font-bold tracking-wider text-white">
                9. Contact Information
              </h2>
            </div>
            <p className="text-[#cccccc]">
              For questions regarding these Terms & Conditions, please contact:
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
