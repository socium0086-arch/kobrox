import React from 'react';
import { CATEGORIES } from '../data/categories';
import { PageView } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CollectionCategoriesSectionProps {
  setActivePage: (page: PageView) => void;
  setSelectedCategory: (categoryKey: string) => void;
}

export const CollectionCategoriesSection: React.FC<CollectionCategoriesSectionProps> = ({
  setActivePage,
  setSelectedCategory
}) => {
  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setActivePage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#111111] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#222222]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] block mb-2">
              CURATED ATELIER COLLECTIONS
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl uppercase tracking-wider text-white">
              Product Collections
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#888888] max-w-md mt-4 md:mt-0">
            Discover meticulously crafted cigar instruments, engineered to elevate every moment of your cigar ritual.
          </p>
        </div>

        {/* Categories Grid (Luxury Prestige layout: 2 big featured cards, 3 lower cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => {
            const isLarge = idx < 2;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.key)}
                className={`group relative overflow-hidden bg-[#181818] border border-[#2a2a2a] hover:border-[#d4af37]/60 rounded-sm cursor-pointer transition-all duration-500 shadow-xl ${
                  isLarge ? 'lg:col-span-1' : 'col-span-1'
                }`}
              >
                {/* Image Container with Luxury Overlay */}
                <div className="relative h-[320px] sm:h-[380px] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#14120e]/80 backdrop-blur-md border border-[#3d3222] px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                    KOBROX ATELIER
                  </div>

                  {/* Explore Icon Trigger */}
                  <div className="absolute top-4 right-4 p-2 bg-[#14120e]/80 border border-[#3d3222] text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all rounded-full">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 relative z-10 space-y-3 -mt-12 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#c5a059]">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif-luxury text-2xl uppercase tracking-wider text-white group-hover:text-[#d4af37] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#999999] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold flex items-center gap-1 group-hover:underline">
                      Explore Category
                    </span>
                    <span className="text-[10px] font-mono text-[#666666]">
                      {cat.featuredProductCount} Models
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
