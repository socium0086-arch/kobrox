import React from 'react';
import { PageView } from '../types';
import { ShieldCheck, Compass, Award, Sparkles, Gem, CheckCircle2, HeartHandshake } from 'lucide-react';
import heroLifestyleImg from '../assets/images/kobrox_hero_lifestyle_1784713850417.jpg';
import craftsmanshipImg from '../assets/images/kobrox_craftsmanship_1784713873281.jpg';

interface AboutPageProps {
  setActivePage: (page: PageView) => void;
  onOpenAmazonModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActivePage, onOpenAmazonModal }) => {
  return (
    <div className="bg-[#0d0d0d] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: Hero Section */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-serif-luxury text-3xl sm:text-5xl uppercase tracking-wider text-white leading-tight">
              Crafted for Those Who Appreciate the Art of Cigar Enjoyment
            </h1>
            <div className="w-20 h-[1px] bg-[#d4af37] mx-auto my-6" />
          </div>

          <div className="relative rounded-sm overflow-hidden border border-[#2a2a2a] shadow-2xl">
            <img
              src={heroLifestyleImg}
              alt="KOBROX Atelier Atmosphere"
              referrerPolicy="no-referrer"
              className="w-full h-[380px] sm:h-[480px] object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
            <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 max-w-3xl bg-black/80 backdrop-blur-md p-6 sm:p-8 border border-[#3d3222] rounded-sm space-y-3">
              <p className="text-sm sm:text-base text-[#e5e5e5] font-serif-luxury leading-relaxed">
                At KOBROX, we believe that enjoying a cigar is more than a moment — it is a ritual of patience, craftsmanship, and appreciation.
              </p>
              <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed">
                Every cigar enthusiast understands that the right accessories can transform a simple experience into something truly memorable. That is why we are dedicated to creating premium cigar accessories that combine refined design, reliable performance, and timeless style.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Our Philosophy */}
        <div className="p-8 sm:p-12 bg-[#12110e] border border-[#2e261a] rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full filter blur-3xl pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1e1a14] border border-[#3d3222] rounded-full text-[#d4af37] text-[11px] font-mono uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Our Philosophy</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl uppercase tracking-wider text-white">
              Designed with Purpose. Made for Passion.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#cccccc] leading-relaxed">
              <p>
                KOBROX was created with one simple idea: cigar accessories should be more than functional tools — they should represent personal taste and craftsmanship.
              </p>
              <p className="text-[#888888]">
                From precision cutting to elegant finishes, every detail is carefully considered to deliver a premium experience for cigar lovers around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Our Products */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059]">
              PRODUCT STANDARDS
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl uppercase text-white">
              Precision. Quality. Experience.
            </h2>
            <p className="text-xs sm:text-sm text-[#aaaaaa]">
              Our products are designed for those who value quality and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Precision Engineering', desc: 'Crafted with laser-sharp tolerances and smooth mechanical engagement for a clean cut every time.' },
              { title: 'Premium Materials', desc: 'Sourced high-density stainless steel, solid brass, and aircraft-grade aluminum alloy.' },
              { title: 'Comfortable Handling', desc: 'Ergonomically balanced weight distribution designed to feel authoritative in your hand.' },
              { title: 'Elegant Design', desc: 'Minimalist luxury aesthetic with refined finishes suitable for any setting.' }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-[#141414] border border-[#222222] rounded-sm space-y-3 hover:border-[#3d3222] transition-colors">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <h3 className="font-serif-luxury text-sm uppercase font-bold tracking-wider text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[#888888] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-[#d4af37] font-serif-luxury italic">
              Whether for personal enjoyment or as a thoughtful gift, KOBROX products are made to become part of meaningful cigar moments.
            </p>
          </div>
        </div>

        {/* Section 4: Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-8 border-t border-[#1f1f1f]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1e1a14] border border-[#3d3222] rounded-full text-[#d4af37] text-[11px] font-mono uppercase tracking-widest">
              <Gem className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Craftsmanship</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl uppercase text-white">
              Attention to Every Detail
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#aaaaaa] leading-relaxed">
              <p className="text-white font-medium">
                Great products are defined by details.
              </p>
              <p>
                We carefully select materials, refine manufacturing processes, and continuously improve our designs to ensure every KOBROX accessory delivers durability, precision, and confidence.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-[#2e2e2e] shadow-xl">
            <img
              src={craftsmanshipImg}
              alt="KOBROX Engineering Workshop"
              referrerPolicy="no-referrer"
              className="w-full h-[300px] object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Section 5: Customer Commitment */}
        <div className="p-8 sm:p-10 bg-[#141414] border border-[#262626] rounded-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#1e1a14] border border-[#3d3222] text-[#d4af37] rounded-sm">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                OUR PROMISE
              </span>
              <h3 className="font-serif-luxury text-2xl uppercase tracking-wider text-white">
                Our Commitment to You
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#bbbbbb] leading-relaxed max-w-3xl">
            <p className="text-white font-serif-luxury text-base">
              Your satisfaction is at the heart of everything we do.
            </p>
            <p>
              We are committed to providing dependable products and responsive customer support. If you have any questions or need assistance, our team is always ready to help.
            </p>
          </div>
        </div>

        {/* Section 6: Ending Brand Statement & CTA */}
        <div className="p-12 bg-gradient-to-b from-[#181511] to-[#100e0b] border border-[#3d3222] rounded-sm text-center space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h2 className="font-serif-luxury text-3xl sm:text-5xl uppercase tracking-wider gold-gradient-text font-bold">
              KOBROX — Elevating Every Cigar Moment.
            </h2>
            <p className="text-sm sm:text-lg text-[#dddddd] font-serif-luxury italic tracking-wide">
              More than an accessory. A statement of taste.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={onOpenAmazonModal}
              className="px-8 py-4 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-[#e2bd45] transition-all transform hover:scale-105 shadow-xl cursor-pointer"
            >
              Explore KOBROX On Amazon
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

