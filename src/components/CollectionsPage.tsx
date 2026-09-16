import React, { useState } from 'react';
import { Product, AmazonRegion, PageView } from '../types';
import { CATEGORIES } from '../data/categories';
import { ShoppingBag, Eye, ExternalLink, Star, SlidersHorizontal } from 'lucide-react';

interface CollectionsPageProps {
  products: Product[];
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  region: AmazonRegion;
  setActivePage: (page: PageView) => void;
  onSelectProduct: (productId: string) => void;
  onOpenAmazonModal: (product?: Product) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  region,
  setActivePage,
  onSelectProduct,
  onOpenAmazonModal
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filteredProducts = products.filter((p) => {
    if (!selectedCategory || selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="bg-[#0d0d0d] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a059] block">
            ATELIER INSTRUMENTS & ACCESSORIES
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl uppercase tracking-wider">
            Product Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#aaaaaa]">
            Precision cigar cutters, jet lighters, walnut ashtrays, and executive gift sets.
          </p>
          <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mt-4" />
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141414] border border-[#262626] p-4 rounded-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs cursor-pointer transition-colors ${
                !selectedCategory || selectedCategory === 'all'
                  ? 'bg-[#d4af37] text-black font-bold'
                  : 'bg-[#1e1e1e] text-[#888888] hover:text-white'
              }`}
            >
              All Atelier ({products.length})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs cursor-pointer transition-colors whitespace-nowrap ${
                  selectedCategory === cat.key
                    ? 'bg-[#d4af37] text-black font-bold'
                    : 'bg-[#1e1e1e] text-[#888888] hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0d0d0d] border border-[#333333] px-3 py-1.5 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#141414] border border-[#262626] hover:border-[#d4af37]/60 rounded-sm overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badge Stage with Auto-Adapting Contain */}
                <div
                  className="h-72 sm:h-80 bg-[#0a0a0a] border-b border-[#1f1f1f] flex items-center justify-center p-1 sm:p-2 relative overflow-hidden cursor-pointer"
                  onClick={() => {
                    onSelectProduct(prod.id);
                    setActivePage('product-detail');
                    window.scrollTo(0,0);
                  }}
                >
                  <img
                    src={prod.media[0]?.url || 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10 bg-[#14120e]/90 backdrop-blur-md border border-[#3d3222] px-2.5 py-1 text-[10px] font-mono text-[#d4af37] uppercase tracking-widest shadow-md">
                    {prod.badge || 'KOBROX'}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 z-10 bg-black/85 px-2.5 py-1 text-[10px] font-mono text-white flex items-center gap-1 border border-[#333333] shadow-md rounded-xs">
                    <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                    <span>{prod.rating} ({prod.reviewCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-widest block">
                    {prod.series}
                  </span>

                  <h3
                    onClick={() => {
                      onSelectProduct(prod.id);
                      setActivePage('product-detail');
                      window.scrollTo(0,0);
                    }}
                    className="font-serif-luxury text-xl text-white group-hover:text-[#d4af37] transition-colors line-clamp-2 cursor-pointer font-bold"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed">
                    {prod.tagline}
                  </p>

                  <div className="pt-2 flex items-baseline justify-between border-t border-[#1c1c1c]">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-luxury text-2xl font-bold text-white">${prod.price.toFixed(2)}</span>
                      {prod.originalPrice && (
                        <span className="text-xs text-[#666666] line-through font-mono">${prod.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Prime Eligible</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onSelectProduct(prod.id);
                    setActivePage('product-detail');
                    window.scrollTo(0,0);
                  }}
                  className="py-2.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#333333] text-white text-[11px] uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onOpenAmazonModal(prod)}
                  className="py-2.5 bg-[#d4af37] hover:bg-[#e2bd45] text-black text-[11px] uppercase tracking-wider font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-black" />
                  <span>Buy Amazon</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
