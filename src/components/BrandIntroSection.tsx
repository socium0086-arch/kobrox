import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Sparkles, Gem, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import cutterDetailImg from '../assets/images/kobrox_cutter_detail_1784713861967.jpg';
import craftsmanshipImg from '../assets/images/kobrox_craftsmanship_1784713873281.jpg';
import heroLifestyleImg from '../assets/images/kobrox_hero_lifestyle_1784713850417.jpg';

interface BrandIntroSectionProps {
  setActivePage: (page: PageView) => void;
}

const CAROUSEL_SLIDES = [
  {
    url: 'https://res.cloudinary.com/ktf8aefc/image/upload/f_auto,q_auto,w_1200/v1785136025/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260727140943_177_44_gg8oyg.jpg',
    alt: 'KOBROX Micro-machined Cutter Close-Up',
    caption: 'Micro-Machined Stainless Steel Cutter'
  },
  {
    url: 'https://res.cloudinary.com/ktf8aefc/image/upload/f_auto,q_auto,w_1200/v1785131685/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260727134804_176_44_pijdpm.jpg',
    alt: 'Precision Swiss-Grade Machining & Hand Finishing',
    caption: 'Advanced CNC machining transforms raw materials into precisely crafted cigar instruments with exceptional refinement.'
  },
  {
    url: heroLifestyleImg,
    alt: 'KOBROX Executive Lounge & Cigar Ritual',
    caption: 'Luxury Executive Cigar Lounge & Travel Companion'
  },
  {
    url: 'https://res.cloudinary.com/ktf8aefc/image/upload/f_auto,q_auto,w_1200/v1785130220/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260311193849_63_7_m37cyb.png',
    alt: 'Monolith Solid Brass Atelier Detail',
    caption: 'Solid CNC-Milled Brass & Dark Walnut Atelier Craft'
  }
];

export const BrandIntroSection: React.FC<BrandIntroSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play interval every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_SLIDES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  return (
    <section className="py-24 bg-[#0d0d0d] border-b border-[#1c1c1c] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>KOBROX ATELIER</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase leading-tight">
              The Art of Cigar <br />
              <span className="gold-gradient-text italic font-serif">Craftsmanship</span>
            </h2>

            <p className="text-sm sm:text-base text-[#aaaaaa] font-light leading-relaxed">
              KOBROX combines precision engineering, premium materials and refined design to create cigar accessories that enhance every cigar ritual.
            </p>

            <div className="pt-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1a1612] border border-[#3d3222] rounded-sm text-[#d4af37]">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Refined Materials</h4>
                  <p className="text-xs text-[#888888] mt-1">Premium stainless steel blades and aluminum, selected for durability, precision and refined craftsmanship.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1a1612] border border-[#3d3222] rounded-sm text-[#d4af37]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Precision Engineering Standards</h4>
                  <p className="text-xs text-[#888888] mt-1">Precision CNC machining and meticulous craftsmanship ensure exceptional accuracy, durability and refined performance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auto Carousel Column (4 Auto-rotating images, Non-clickable) */}
          <div className="lg:col-span-7 relative">
            <div className="overflow-hidden rounded-sm border border-[#2e2e2e] shadow-2xl relative w-full h-[380px] sm:h-[480px] bg-[#0a0a0a]">
              
              {/* Image Carousel Items */}
              {CAROUSEL_SLIDES.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none select-none ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={slide.url}
                    alt={slide.alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                  
                  {/* Subtle Dark Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                </div>
              ))}

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono text-[#d4af37] bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-sm border border-white/10 pointer-events-none">
                <span className="truncate max-w-[70%]">
                  {CAROUSEL_SLIDES[currentIndex].caption}
                </span>
                <span className="text-white/80 shrink-0 font-bold">
                  0{currentIndex + 1} / 0{CAROUSEL_SLIDES.length}
                </span>
              </div>

              {/* Previous & Next Manual Controls (Optional overlay arrows) */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/60 hover:bg-black text-white hover:text-[#d4af37] border border-white/10 rounded-full transition-all cursor-pointer"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/60 hover:bg-black text-white hover:text-[#d4af37] border border-white/10 rounded-full transition-all cursor-pointer"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Carousel Indicators (Dots) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                {CAROUSEL_SLIDES.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    type="button"
                    onClick={() => setCurrentIndex(dotIndex)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      dotIndex === currentIndex ? 'w-6 bg-[#d4af37]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    title={`Slide ${dotIndex + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
