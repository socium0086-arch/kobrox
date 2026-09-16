import React, { useState } from 'react';
import { PageView, AmazonRegion } from '../types';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ExternalLink, 
  Sparkles, 
  SlidersHorizontal,
  Compass,
  BookOpen,
  Info,
  ShieldCheck,
  Flame
} from 'lucide-react';

interface HeaderProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  region: AmazonRegion;
  setRegion: (region: AmazonRegion) => void;
  onOpenAmazonModal: () => void;
  onOpenAdminModal: () => void;
  onOpenSearchModal: () => void;
  onSelectProduct: (productId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  setSelectedCategory,
  region,
  setRegion,
  onOpenAmazonModal,
  onOpenAdminModal,
  onOpenSearchModal,
  onSelectProduct
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  const regionNames: Record<AmazonRegion, string> = {
    US: 'United States (USD $)',
    EU: 'Europe / Universal (EUR €)'
  };

  const navItems: { label: string; page: PageView; category?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Collections', page: 'collections' },
    { label: 'Cigar Journal', page: 'journal' },
    { label: 'About KOBROX', page: 'about' }
  ];

  const handleNavClick = (page: PageView, category?: string) => {
    setActivePage(page);
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#222222]">
      {/* Top Announcement Bar */}
      <div className="bg-[#181512] text-xs py-1.5 px-4 text-[#c5a059] border-b border-[#28221b] text-center font-mono tracking-wider flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-[#a39480]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
          KOBROX Official Atelier • Amazon Prime Fulfillment
        </div>
        
        <div className="mx-auto flex items-center gap-2">
          <span>Official KOBROX Store on Amazon Prime • Express Shipping</span>
          <button 
            onClick={onOpenAmazonModal}
            className="underline hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            Visit Amazon Store
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#cccccc] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <button
            onClick={onOpenSearchModal}
            className="p-2 text-[#cccccc] hover:text-[#d4af37] transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center cursor-pointer py-1" onClick={() => handleNavClick('home')}>
          <img
            src="https://res.cloudinary.com/ktf8aefc/image/upload/f_auto,q_auto,w_800/v1785366824/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260730071206_179_44_uynrrh.png"
            alt="KOBROX Swiss Precision & Ritual"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.page, item.category)}
              className={`text-xs uppercase tracking-[0.18em] transition-all cursor-pointer relative py-2 ${
                activePage === item.page
                  ? 'text-[#d4af37] font-medium'
                  : 'text-[#bbbbbb] hover:text-white'
              }`}
            >
              {item.label}
              {activePage === item.page && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#d4af37]" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearchModal}
            className="hidden sm:flex items-center gap-1.5 text-xs text-[#aaaaaa] hover:text-white px-3 py-1.5 border border-[#2a2a2a] hover:border-[#444444] rounded-sm transition-all cursor-pointer bg-[#121212]"
          >
            <Search className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="tracking-wider">SEARCH</span>
          </button>

          {/* Admin / Configurator Drawer */}
          <button
            onClick={onOpenAdminModal}
            className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#aaaaaa] hover:text-[#d4af37] px-2.5 py-1.5 border border-[#2a2a2a] hover:border-[#c5a059] rounded-sm transition-all cursor-pointer bg-[#121212]"
            title="KOBROX Seller Control Portal — Edit products, images, Amazon links & customer support"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="tracking-widest uppercase">SELLER PORTAL</span>
          </button>

          {/* Buy on Amazon Main CTA */}
          <button
            onClick={onOpenAmazonModal}
            className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#e2bd45] text-black px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold rounded-sm transition-all shadow-md hover:shadow-yellow-500/10 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">BUY ON</span>
            <span>AMAZON</span>
            <ExternalLink className="w-3 h-3 text-black/70" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121212] border-b border-[#282828] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page, item.category)}
                className={`block w-full text-left text-sm uppercase tracking-[0.2em] py-2 border-b border-[#1f1f1f] ${
                  activePage === item.page ? 'text-[#d4af37] font-semibold' : 'text-[#cccccc]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenAmazonModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#d4af37] text-black font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 rounded-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Visit Official Amazon Store
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
