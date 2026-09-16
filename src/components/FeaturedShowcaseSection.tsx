import React from 'react';
import { PageView } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { ShoppingBag, Eye, ExternalLink, CheckCircle2, Shield, Star } from 'lucide-react';

interface FeaturedShowcaseSectionProps {
  setActivePage: (page: PageView) => void;
  onSelectProduct: (productId: string) => void;
  onOpenAmazonModal: () => void;
}

export const FeaturedShowcaseSection: React.FC<FeaturedShowcaseSectionProps> = ({
  setActivePage,
  onSelectProduct,
  onOpenAmazonModal
}) => {
  const featuredProduct = INITIAL_PRODUCTS[0]; // KOBROX Signature Series Dual-Action Cutter

  const handleViewProduct = () => {
    onSelectProduct(featuredProduct.id);
    setActivePage('product-detail');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-24 bg-[#0d0d0d] border-b border-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a059] block">
            EDITORIAL PRODUCT SHOWCASE
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-6xl uppercase tracking-wider">
            KOBROX Signature Series
          </h2>
          <p className="font-serif-luxury text-xl italic text-[#d4af37]">
            Premium Cigar Cutter
          </p>
          <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mt-4" />
        </div>

        {/* Editorial Side-by-Side Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center bg-[#141414] border border-[#262626] p-6 sm:p-10 lg:p-12 rounded-sm shadow-2xl">
          
          {/* Left Column: Large Product Image Gallery Preview */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-sm border border-[#333333] bg-[#0a0a0a] min-h-[380px] sm:min-h-[480px] max-h-[520px] flex items-center justify-center p-1.5 sm:p-2 shadow-2xl group">
              <img
                src={featuredProduct.media[0]?.url || 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'}
                alt={featuredProduct.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[450px] w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 bg-[#14120e]/90 border border-[#3d3222] px-3 py-1.5 text-xs font-mono text-[#d4af37] tracking-widest uppercase shadow-md">
                {featuredProduct.badge || 'Signature Series'}
              </div>

              <div className="absolute bottom-4 right-4 z-10 bg-black/85 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-white flex items-center gap-1.5 border border-[#333333] shadow-md rounded-xs">
                <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                <span>4.9 / 5.0 Rating (148 Reviews)</span>
              </div>
            </div>

            {/* Thumbnail preview row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {featuredProduct.media.slice(0, 3).map((item, idx) => (
                <div key={idx} className="overflow-hidden rounded-sm border border-[#2a2a2a] h-20 bg-[#0a0a0a] flex items-center justify-center p-1">
                  <img
                    src={item.url}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain filter brightness-90 hover:brightness-110 transition-all cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Editorial Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#aaaaaa]">
                MODEL: {featuredProduct.sku}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white tracking-wide">
                KOBROX Signature Series Premium Cigar Cutter
              </h3>
              <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed">
                {featuredProduct.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 pt-2 border-t border-[#222222]">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37]">
                Key Features
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#dddddd]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Precision stainless steel blade</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Durable cutting performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Luxury metallic finish</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Ergonomic design & thumb spring</span>
                </li>
              </ul>
            </div>

            {/* Materials & Craftsmanship Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#222222]">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#c5a059]">
                  Materials
                </h4>
                <p className="text-xs text-[#bbbbbb] mt-1 font-medium">
                  Premium Stainless Steel (440C Hardened)
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#c5a059]">
                  Craftsmanship
                </h4>
                <p className="text-xs text-[#bbbbbb] mt-1 font-medium">
                  Precision manufacturing and refined surface finishing.
                </p>
              </div>
            </div>

            {/* Pricing & Amazon Guarantee Notice */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#888888] font-mono block">MSRP List Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-luxury text-3xl font-bold text-white">${featuredProduct.price.toFixed(2)}</span>
                  {featuredProduct.originalPrice && (
                    <span className="text-xs text-[#666666] line-through font-mono">${featuredProduct.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block">Amazon Prime Eligible</span>
                <span className="text-xs text-[#888888]">In Stock & Ready To Ship</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleViewProduct}
                className="w-full sm:w-1/2 py-3.5 bg-[#222222] hover:bg-[#2e2e2e] border border-[#d4af37]/50 hover:border-[#d4af37] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer rounded-sm"
              >
                <Eye className="w-4 h-4 text-[#d4af37]" />
                <span>View Product</span>
              </button>

              <button
                onClick={onOpenAmazonModal}
                className="w-full sm:w-1/2 py-3.5 bg-[#d4af37] hover:bg-[#e2bd45] text-black text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer rounded-sm shadow-xl"
              >
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>Buy On Amazon</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
