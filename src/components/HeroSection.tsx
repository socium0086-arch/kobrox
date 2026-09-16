import React from 'react';
import { PageView } from '../types';
import { ShoppingBag, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import heroLifestyleImg from '../assets/images/kobrox_hero_lifestyle_1784713850417.jpg';

interface HeroSectionProps {
  setActivePage: (page: PageView) => void;
  onOpenAmazonModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActivePage,
  onOpenAmazonModal
}) => {
  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroLifestyleImg}
          alt="KOBROX Luxury Cigar Accessories Lifestyle"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Layered Luxury Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-transparent to-[#0d0d0d]/80" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#14120e]/80 border border-[#3d3222] backdrop-blur-md rounded-full text-[#d4af37] text-[11px] font-mono uppercase tracking-[0.25em] mb-6 animate-fadeIn">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Atelier Precision • Crafted to Exacting Tolerances</span>
        </div>

        <h1 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl tracking-[0.2em] font-bold text-white uppercase mb-4 drop-shadow-2xl">
          KOBROX
        </h1>

        <p className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl italic gold-gradient-text tracking-wide mb-6">
          Elevate Every Cigar Moment
        </p>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#dddddd] font-light leading-relaxed mb-10 tracking-wide text-shadow">
          Premium cigar accessories designed for those who appreciate precision engineering, refined materials, elegant design and exceptional craftsmanship.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => {
              setActivePage('collections');
              window.scrollTo({ top: 500, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#181818] hover:bg-[#252525] border border-[#d4af37]/60 hover:border-[#d4af37] text-white text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group rounded-sm shadow-xl"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenAmazonModal}
            className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] hover:bg-[#e2bd45] text-black text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-2xl hover:shadow-yellow-500/20 rounded-sm"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span>Buy On Amazon</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

      </div>
    </section>
  );
};
