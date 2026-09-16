import React, { useState } from 'react';
import { Product, AmazonRegion } from '../types';
import { 
  ShoppingBag, 
  ExternalLink, 
  Star, 
  ShieldCheck, 
  Play, 
  FileText, 
  MessageSquare, 
  ChevronRight
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  region: AmazonRegion;
  setRegion: (r: AmazonRegion) => void;
  onOpenAmazonModal: (product?: Product) => void;
  onUpdateProductMedia?: (productId: string, newMedia: any[]) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  region,
  setRegion,
  onOpenAmazonModal
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const currentMedia = product.media[activeMediaIndex] || product.media[0];
  const amazonUrl = product.amazonLinks[region] || product.amazonLinks.US;

  return (
    <div className="bg-[#0d0d0d] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#888888] mb-6 uppercase tracking-widest">
          <span>KOBROX ATELIER</span>
          <ChevronRight className="w-3 h-3 text-[#d4af37]" />
          <span>{product.category}</span>
          <ChevronRight className="w-3 h-3 text-[#d4af37]" />
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-[#222222]">
          
          {/* Left Column: Large Image & Video Gallery */}
          <div className="lg:col-span-7 space-y-3">
            
            {/* Main Image Stage - Pure seamless framing without bottom caption bar */}
            <div className="relative overflow-hidden rounded-sm border border-[#2e2e2e] bg-[#0a0a0a] shadow-2xl group flex items-center justify-center min-h-[380px] sm:min-h-[480px] max-h-[580px] p-2 sm:p-3">
              <img
                src={currentMedia.url}
                alt={currentMedia.alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[540px] w-auto h-auto object-contain transition-all duration-500 group-hover:scale-[1.01]"
              />

              {/* Video Trigger Overlay if media is video or interactive preview */}
              {currentMedia.type === 'video' && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all cursor-pointer group"
                >
                  <div className="p-5 rounded-full bg-[#d4af37] text-black shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-black" />
                  </div>
                </button>
              )}

              {/* Badge */}
              <div className="absolute top-3.5 left-3.5 z-10 bg-[#14120e]/90 backdrop-blur-md border border-[#3d3222] px-3 py-1 text-xs font-mono text-[#d4af37] uppercase tracking-widest shadow-md">
                {product.badge || 'KOBROX Atelier'}
              </div>
            </div>

            {/* Thumbnail Gallery Bar */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {product.media.map((med, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative shrink-0 w-20 h-20 rounded-sm overflow-hidden border bg-[#0a0a0a] transition-all cursor-pointer flex items-center justify-center p-0.5 ${
                    activeMediaIndex === idx
                      ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                      : 'border-[#222222] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={med.url}
                    alt={med.alt}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain"
                  />
                  {med.type === 'video' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Key Details, Amazon Conversion & Region Switcher */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">
                  {product.series}
                </span>
                <span className="text-xs text-[#555555]">|</span>
                <span className="text-xs font-mono text-[#888888]">{product.sku}</span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold leading-tight mb-2">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#c5a059] font-serif-luxury italic mb-4">
                "{product.tagline}"
              </p>

              {/* Reviews Summary */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                  ))}
                </div>
                <span className="text-xs text-[#dddddd] font-semibold">{product.rating} / 5.0</span>
                <span className="text-xs text-[#888888]">({product.reviewCount} Verified Reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm space-y-2">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif-luxury text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#777777] line-through font-mono">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-xs">
                  In Stock & Ready
                </span>
              </div>

              {/* Amazon Prime & Logistics Notice */}
              <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-xs text-[#aaaaaa]">
                <span className="flex items-center gap-1.5 text-blue-400 font-semibold font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  Amazon Prime Express Delivery
                </span>
                <span>Sold & Fulfilled by Amazon</span>
              </div>
            </div>

            {/* BUY ON AMAZON PRIMARY CTA */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => onOpenAmazonModal(product)}
                className="w-full py-4 bg-[#d4af37] hover:bg-[#e2bd45] text-black text-sm uppercase tracking-[0.2em] font-bold rounded-sm shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-black" />
                <span>Buy On Amazon</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </button>

              <button
                onClick={() => onOpenAmazonModal(product)}
                className="block w-full text-center text-xs text-[#888888] hover:text-[#d4af37] transition-colors underline cursor-pointer"
              >
                Official Amazon Listing
              </button>
            </div>
          </div>

        </div>

        {/* Tabbed Product Details Sections */}
        <div className="pt-16">
          {/* Tabs Bar */}
          <div className="flex items-center gap-2 sm:gap-6 border-b border-[#2a2a2a] overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'overview', label: 'Product Overview', icon: FileText },
              { id: 'reviews', label: `Reviews (${product.reviews.length})`, icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-3 text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border-b-2 font-medium ${
                    activeTab === tab.id
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-transparent text-[#888888] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="py-10">
            {/* Overview Panel */}
            {activeTab === 'overview' && (
              <div className="max-w-4xl space-y-8 text-sm text-[#cccccc] leading-relaxed animate-fadeIn">
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-2xl text-white uppercase tracking-wider">
                    Product Overview
                  </h3>
                  {product.overview && (
                    <p className="text-base text-[#e0e0e0] leading-relaxed">{product.overview}</p>
                  )}
                  {product.description && (
                    <div className="space-y-4 pt-1">
                      {product.description.split(/(?=\d+：|\d+:)/g).map((section, sIdx) => {
                        const trimmed = section.trim();
                        if (!trimmed) return null;
                        const match = trimmed.match(/^(\d+[：:])\s*(.*)$/);
                        if (match) {
                          const num = match[1];
                          const body = match[2];
                          return (
                            <div key={sIdx} className="p-4 bg-[#111111] border border-[#222222] rounded-sm space-y-1.5">
                              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block font-semibold">
                                FEATURE {num}
                              </span>
                              <p className="text-sm text-[#e5e5e5] leading-relaxed whitespace-pre-line">{body}</p>
                            </div>
                          );
                        }
                        return (
                          <p key={sIdx} className="text-sm text-[#aaaaaa] leading-relaxed whitespace-pre-line">
                            {trimmed}
                          </p>
                        );
                      })}
                    </div>
                  )}
                  
                  {product.craftsmanshipNotes && (
                    <div className="p-6 bg-[#141414] border border-[#2a2a2a] rounded-sm space-y-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block">
                        KOBROX Atelier Note:
                      </span>
                      <p className="text-xs text-[#aaaaaa] italic">
                        "{product.craftsmanshipNotes}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Detail Images Showcase under KOBROX Atelier Note */}
                {product.detailImages && product.detailImages.length > 0 && (
                  <div className="space-y-6 pt-6 border-t border-[#222222]">
                    <div className="space-y-6">
                      {product.detailImages.map((item, index) => {
                        const imgUrl = typeof item === 'string' ? item : item.url;
                        const caption = typeof item === 'object' && item.caption && item.caption.trim()
                          ? item.caption
                          : '';

                        return (
                          <div 
                            key={index} 
                            className="group border border-[#262626] hover:border-[#d4af37]/50 rounded-sm overflow-hidden bg-[#080808] transition-all duration-300 shadow-xl"
                          >
                            <div className="w-full flex items-center justify-center p-1 sm:p-2 bg-[#080808]">
                              <img
                                src={imgUrl}
                                alt={`${product.name} Graphic ${index + 1}`}
                                className="w-full h-auto object-contain mx-auto block group-hover:scale-[1.005] transition-transform duration-500 rounded-xs"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            {caption && (
                              <div className="p-3 bg-[#111111] border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#888888]">
                                <span className="leading-relaxed text-[#cccccc]">{caption}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Customer Reviews Panel */}
            {activeTab === 'reviews' && (
              <div className="max-w-4xl space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-2xl text-white uppercase tracking-wider">
                    Amazon Customer Reviews
                  </h3>
                  <button
                    onClick={() => onOpenAmazonModal(product)}
                    className="text-xs text-[#d4af37] underline hover:text-white"
                  >
                    Write a Review on Amazon
                  </button>
                </div>

                <div className="space-y-4">
                  {(product.reviews || []).length === 0 ? (
                    <div className="p-8 border border-dashed border-[#333333] rounded-sm text-center text-xs text-[#888888]">
                      No reviews posted yet for this item. Be the first to share your experience on Amazon!
                    </div>
                  ) : (
                    (product.reviews || []).map((rev) => (
                      <div key={rev.id} className="p-6 bg-[#141414] border border-[#2a2a2a] rounded-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{rev.author}</span>
                            {rev.verifiedAmazonPurchase && (
                              <span className="text-[10px] font-mono bg-[#1c221a] text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded-xs">
                                Verified Amazon Purchase ({rev.region})
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#777777] font-mono">{rev.date}</span>
                        </div>

                        <div className="flex items-center text-[#d4af37]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                          ))}
                        </div>

                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">{rev.title}</h4>
                        <p className="text-xs text-[#cccccc] leading-relaxed">{rev.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
