import React from 'react';
import { PageView, AmazonRegion } from '../types';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  ExternalLink,
  Instagram,
  Facebook,
  Youtube,
  Twitter
} from 'lucide-react';

interface FooterProps {
  setActivePage: (page: PageView) => void;
  onOpenAmazonModal: () => void;
  region: AmazonRegion;
  setRegion: (r: AmazonRegion) => void;
  onOpenNewsletter: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActivePage,
  onOpenAmazonModal,
  region,
  setRegion,
  onOpenNewsletter
}) => {
  return (
    <footer className="bg-[#080808] border-t border-[#1a1a1a] text-[#888888] text-sm pt-16 pb-12">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center cursor-pointer" onClick={() => { setActivePage('home'); window.scrollTo(0,0); }}>
            <img
              src="https://res.cloudinary.com/ktf8aefc/image/upload/f_auto,q_auto,w_800/v1785366824/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260730071206_179_44_uynrrh.png"
              alt="KOBROX"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>
          <p className="text-xs text-[#888888] leading-relaxed max-w-sm">
            KOBROX creates premium cigar accessories for modern cigar enthusiasts who appreciate precision engineering, refined materials, elegant design and exceptional craftsmanship.
          </p>
          <p className="text-xs text-[#c5a059] font-serif-luxury italic">
            "Elevate Every Cigar Moment."
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAmazonModal}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] hover:text-white border border-[#443826] hover:border-[#d4af37] px-4 py-2 rounded-sm transition-all"
            >
              <span>Visit KOBROX Amazon Store</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => { setActivePage('home'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => { setActivePage('collections'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                Collections
              </button>
            </li>
            <li>
              <button onClick={() => { setActivePage('journal'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                Cigar Journal
              </button>
            </li>
            <li>
              <button onClick={() => { setActivePage('about'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                About KOBROX
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Brand Story */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => { setActivePage('about'); window.scrollTo(0,0); }} className="hover:text-white transition-colors">
                The KOBROX Philosophy
              </button>
            </li>
            <li>
              <button onClick={() => { setActivePage('terms'); window.scrollTo(0,0); }} className="hover:text-white transition-colors text-left cursor-pointer">
                Terms & Conditions
              </button>
            </li>
            <li>
              <button onClick={() => { setActivePage('privacy'); window.scrollTo(0,0); }} className="hover:text-white transition-colors text-left cursor-pointer">
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Club Subscription & Social */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4">The KOBROX Club</h4>
          <p className="text-xs text-[#777777] mb-3">
            Subscribe for private cigar insights, new accessory drops, and editorial features.
          </p>
          <button
            onClick={onOpenNewsletter}
            className="w-full py-2.5 bg-[#181818] hover:bg-[#222222] border border-[#333333] hover:border-[#d4af37] text-xs text-[#c5a059] uppercase tracking-wider rounded-sm transition-all"
          >
            Join The KOBROX Club
          </button>

          <div className="mt-6 space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#666666] block">Follow KOBROX</span>
            <div className="flex items-center space-x-3 text-[#aaaaaa]">
              <a href="#" className="p-2 bg-[#121212] hover:text-[#d4af37] hover:bg-[#1f1f1f] rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-[#121212] hover:text-[#d4af37] hover:bg-[#1f1f1f] rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-[#121212] hover:text-[#d4af37] hover:bg-[#1f1f1f] rounded-full transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-[#121212] hover:text-[#d4af37] hover:bg-[#1f1f1f] rounded-full transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#121212] flex flex-col md:flex-row items-center justify-between text-xs text-[#555555]">
        <p>© {new Date().getFullYear()} KOBROX Luxury Cigar Accessories. All Rights Reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <span>Official Amazon Brand Registered Partner</span>
          <button onClick={onOpenAmazonModal} className="text-[#888888] hover:text-[#d4af37]">
            Amazon Storefront
          </button>
        </div>
      </div>
    </footer>
  );
};
