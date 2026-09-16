import React, { useState } from 'react';
import { PageView } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { Sparkles, CheckCircle2, ShoppingBag, ExternalLink, Flame, Shield, ArrowRight } from 'lucide-react';

interface CigarPairingToolProps {
  setActivePage: (page: PageView) => void;
  onSelectProduct: (productId: string) => void;
  onOpenAmazonModal: () => void;
}

export const CigarPairingTool: React.FC<CigarPairingToolProps> = ({
  setActivePage,
  onSelectProduct,
  onOpenAmazonModal
}) => {
  const [ringGauge, setRingGauge] = useState<'standard' | 'large' | 'gordo' | 'torpedo'>('large');
  const [wrapper, setWrapper] = useState<'maduro' | 'connecticut' | 'habano'>('maduro');
  const [occasion, setOccasion] = useState<'lounge' | 'golf' | 'gifting' | 'travel'>('lounge');

  // Recommendation Logic
  const getRecommendation = () => {
    if (ringGauge === 'gordo' || ringGauge === 'torpedo') {
      return {
        cutter: INITIAL_PRODUCTS[0], // Signature Dual-Blade Cutter
        lighter: INITIAL_PRODUCTS[1], // Titan Triple Jet Torch
        ashtray: INITIAL_PRODUCTS[2], // Monolith Brass Ashtray
        reason: 'Large ring gauges (56-64 RG) & torpedo shapes require ultra-wide 440C dual guillotine blades to prevent wrapper tearing, paired with a windproof triple torch for uniform foot ignition.'
      };
    } else if (occasion === 'gifting') {
      return {
        cutter: INITIAL_PRODUCTS[3], // Heritage Exec Set
        lighter: INITIAL_PRODUCTS[1],
        ashtray: INITIAL_PRODUCTS[2],
        reason: 'For milestone gifts and executive honors, the KOBROX Heritage 3-Piece Executive Set delivers piano-lacquer presentation, full-grain leather, and complete ritual instruments.'
      };
    } else if (occasion === 'travel' || occasion === 'golf') {
      return {
        cutter: INITIAL_PRODUCTS[0],
        lighter: INITIAL_PRODUCTS[1],
        ashtray: INITIAL_PRODUCTS[4], // Sovereign Travel Humidor
        reason: 'Windy outdoor courses and travel require IP67 airtight armor humidor cases and high-altitude triple jet flames.'
      };
    } else {
      return {
        cutter: INITIAL_PRODUCTS[0],
        lighter: INITIAL_PRODUCTS[1],
        ashtray: INITIAL_PRODUCTS[2],
        reason: 'A classic executive lounge configuration engineered for pristine 50-54 Toro and Robusto sticks.'
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="bg-[#0d0d0d] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1e1a14] border border-[#3d3222] rounded-full text-[11px] font-mono text-[#d4af37] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KOBROX RITUAL ASSISTANT</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl uppercase tracking-wider">
            Cigar & Accessory Pairing Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#aaaaaa]">
            Select your cigar specs and setting to discover the mathematically optimal cutter geometry and torch flame configuration.
          </p>
          <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mt-4" />
        </div>

        {/* Selector Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#141414] border border-[#262626] p-6 sm:p-8 rounded-sm">
          
          {/* Step 1: Ring Gauge */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-[#d4af37] block">
              1. Cigar Ring Gauge & Shape:
            </label>
            <div className="space-y-2">
              {[
                { id: 'standard', label: '42 - 48 RG (Coronas & Petit Robustos)' },
                { id: 'large', label: '50 - 54 RG (Robusto & Toro)' },
                { id: 'gordo', label: '56 - 64 RG (Gordo & Gigante)' },
                { id: 'torpedo', label: 'Torpedo / Belicoso / Figurado' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRingGauge(item.id as any)}
                  className={`w-full text-left p-3 text-xs border rounded-xs transition-colors cursor-pointer ${
                    ringGauge === item.id
                      ? 'bg-[#1e1a14] border-[#d4af37] text-white font-semibold'
                      : 'bg-[#181818] border-[#2a2a2a] text-[#888888] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Wrapper Type */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-[#d4af37] block">
              2. Tobacco Wrapper Leaf:
            </label>
            <div className="space-y-2">
              {[
                { id: 'maduro', label: 'Broadleaf / San Andrés Maduro (Thick)' },
                { id: 'connecticut', label: 'Connecticut Shade (Delicate Wrapper)' },
                { id: 'habano', label: 'Ecuadorian / Nicaraguan Habano' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setWrapper(item.id as any)}
                  className={`w-full text-left p-3 text-xs border rounded-xs transition-colors cursor-pointer ${
                    wrapper === item.id
                      ? 'bg-[#1e1a14] border-[#d4af37] text-white font-semibold'
                      : 'bg-[#181818] border-[#2a2a2a] text-[#888888] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Setting */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-[#d4af37] block">
              3. Primary Setting / Occasion:
            </label>
            <div className="space-y-2">
              {[
                { id: 'lounge', label: 'Executive Office & Indoor Lounge' },
                { id: 'golf', label: 'Golf Course & Outdoor Terrace' },
                { id: 'travel', label: 'Air & Yacht Expeditions' },
                { id: 'gifting', label: 'Milestone Honor / Gift Presentation' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setOccasion(item.id as any)}
                  className={`w-full text-left p-3 text-xs border rounded-xs transition-colors cursor-pointer ${
                    occasion === item.id
                      ? 'bg-[#1e1a14] border-[#d4af37] text-white font-semibold'
                      : 'bg-[#181818] border-[#2a2a2a] text-[#888888] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Pairing Result Box */}
        <div className="p-8 bg-[#16130f] border border-[#443826] rounded-sm space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2e261b] pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block">MATHEMATICAL PAIRING RECOMMENDATION</span>
              <h3 className="font-serif-luxury text-2xl text-white uppercase">Your Optimal KOBROX Setup</h3>
            </div>

            <button
              onClick={onOpenAmazonModal}
              className="px-6 py-2.5 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest rounded-xs hover:bg-[#e2bd45] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Get Setup On Amazon</span>
            </button>
          </div>

          <p className="text-xs text-[#cccccc] italic leading-relaxed">
            "{rec.reason}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Recommended Cutter */}
            <div className="p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm space-y-3 flex items-center gap-4">
              <div className="w-20 h-20 bg-[#0a0a0a] rounded-xs border border-[#333333] flex items-center justify-center p-1 shrink-0">
                <img
                  src={rec.cutter.media[0]?.url || ''}
                  alt={rec.cutter.name}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase">Recommended Cutter</span>
                <h4 className="font-serif-luxury text-sm text-white font-bold">{rec.cutter.name}</h4>
                <button
                  onClick={() => {
                    onSelectProduct(rec.cutter.id);
                    setActivePage('product-detail');
                    window.scrollTo(0, 0);
                  }}
                  className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Recommended Lighter */}
            <div className="p-4 bg-[#141414] border border-[#2a2a2a] rounded-sm space-y-3 flex items-center gap-4">
              <div className="w-20 h-20 bg-[#0a0a0a] rounded-xs border border-[#333333] flex items-center justify-center p-1 shrink-0">
                <img
                  src={rec.lighter.media[0]?.url || ''}
                  alt={rec.lighter.name}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase">Recommended Lighter</span>
                <h4 className="font-serif-luxury text-sm text-white font-bold">{rec.lighter.name}</h4>
                <button
                  onClick={() => {
                    onSelectProduct(rec.lighter.id);
                    setActivePage('product-detail');
                    window.scrollTo(0, 0);
                  }}
                  className="text-xs text-[#d4af37] hover:underline flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
