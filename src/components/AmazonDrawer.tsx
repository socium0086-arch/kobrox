import React from 'react';
import { Product, AmazonRegion } from '../types';
import { ShoppingBag, ExternalLink, X, Clock, Headphones, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';

interface AmazonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  region: AmazonRegion;
  setRegion: (r: AmazonRegion) => void;
}

export const AmazonDrawer: React.FC<AmazonDrawerProps> = ({
  isOpen,
  onClose,
  product,
  region
}) => {
  if (!isOpen) return null;

  const rawUrl = product
    ? (product.amazonLinks?.[region] || product.amazonLinks?.US || '')
    : 'https://www.amazon.com/stores/KOBROX/page/default?tag=kobrox-20';

  const hasValidAmazonUrl = Boolean(
    rawUrl &&
    rawUrl.trim() !== '' &&
    rawUrl.trim() !== '#' &&
    rawUrl.startsWith('http')
  );

  const handleProceedToAmazon = () => {
    if (hasValidAmazonUrl) {
      window.open(rawUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }
  };

  const handleContactSupport = () => {
    window.dispatchEvent(new CustomEvent('kobrox-open-live-chat'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141414] border border-[#333333] p-6 sm:p-8 rounded-sm shadow-2xl space-y-6 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!hasValidAmazonUrl ? (
          /* NOT YET ON AMAZON NOTICE */
          <div className="space-y-6">
            {/* Modal Header */}
            <div className="space-y-2 border-b border-[#222222] pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] uppercase">
                <Clock className="w-4 h-4" />
                <span>COMMERCE NOTICE • COMING SOON TO AMAZON</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase text-white">
                Launching Soon On Amazon
              </h3>

              <p className="text-xs text-[#aaaaaa]">
                Official KOBROX Amazon Store Availability
              </p>
            </div>

            {/* Product Summary */}
            {product && (
              <div className="p-4 bg-[#1a1814] border border-[#3d3222] rounded-sm flex items-center gap-4">
                {product.media?.[0]?.url && (
                  <div className="w-16 h-16 bg-[#0a0a0a] rounded-xs border border-[#333333] flex items-center justify-center p-1 shrink-0">
                    <img
                      src={product.media[0].url}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[#d4af37] uppercase">{product.sku}</span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{product.name}</h4>
                  <span className="text-sm font-serif-luxury font-bold text-[#d4af37]">
                    ${product.price.toFixed(2)} USD
                  </span>
                </div>
              </div>
            )}

            {/* Message Body */}
            <div className="p-4 bg-[#181612] border border-[#2e261a] rounded-sm text-xs text-[#dddddd] leading-relaxed space-y-2">
              <p className="font-semibold text-[#d4af37]">
                This precision product will be launching on our official KOBROX Amazon store shortly.
              </p>
              <p className="text-[#bbbbbb]">
                Our inventory is currently being prepared for Amazon Brand Registry & Prime Fulfillment. Please wait patiently or feel free to contact our customer support team for release updates, pre-orders, or direct assistance.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleContactSupport}
                className="w-full py-3.5 bg-[#d4af37] hover:bg-[#e2bd45] text-black font-bold uppercase tracking-[0.15em] text-xs rounded-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-black" />
                <span>Contact Customer Support</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#333333] text-[#aaaaaa] hover:text-white font-mono uppercase text-xs rounded-sm transition-colors cursor-pointer"
              >
                Close & Wait Patiently
              </button>
            </div>
          </div>
        ) : (
          /* VALID AMAZON LINK GATEWAY */
          <div className="space-y-6">
            <div className="space-y-2 border-b border-[#222222] pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] uppercase">
                <ShoppingBag className="w-4 h-4" />
                <span>KOBROX OFFICIAL AMAZON GATEWAY</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase">
                {product ? 'Buy On Amazon' : 'Visit KOBROX Amazon Store'}
              </h3>

              <p className="text-xs text-[#aaaaaa]">
                Direct connection to verified Amazon Brand Registered inventory.
              </p>
            </div>

            {product && (
              <div className="p-4 bg-[#1a1814] border border-[#3d3222] rounded-sm flex items-center gap-4">
                {product.media?.[0]?.url && (
                  <div className="w-16 h-16 bg-[#0a0a0a] rounded-xs border border-[#333333] flex items-center justify-center p-1 shrink-0">
                    <img
                      src={product.media[0].url}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[#d4af37] uppercase">{product.sku}</span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{product.name}</h4>
                  <span className="text-sm font-serif-luxury font-bold text-[#d4af37]">
                    ${product.price.toFixed(2)} USD
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-[#222222] text-xs text-[#cccccc]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fulfilled by Amazon Prime Express Logistics</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>30-Day Amazon Return & Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Authentic KOBROX Lifetime Craftsmanship Protection</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleProceedToAmazon}
                className="w-full py-4 bg-[#d4af37] hover:bg-[#e2bd45] text-black font-bold uppercase tracking-[0.2em] text-xs rounded-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>Proceed To Amazon Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
