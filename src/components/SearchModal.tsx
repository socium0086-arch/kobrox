import React, { useState } from 'react';
import { Product, Article, PageView } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  articles: Article[];
  setActivePage: (page: PageView) => void;
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  articles,
  setActivePage,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedProducts = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedArticles = query.trim()
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#333333] p-6 rounded-sm shadow-2xl space-y-6 text-white">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888888] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-3.5 text-[#d4af37]" />
          <input
            type="text"
            autoFocus
            placeholder="Search KOBROX cutters, lighters, journal articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-[#333333] pl-10 pr-4 py-3 text-sm text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {query.trim() && (
          <div className="max-h-96 overflow-y-auto space-y-6">
            {/* Products Match */}
            <div>
              <h4 className="text-xs font-mono uppercase text-[#d4af37] mb-3">
                Matching Products ({matchedProducts.length})
              </h4>
              {matchedProducts.length === 0 ? (
                <p className="text-xs text-[#777777]">No accessories matched "{query}".</p>
              ) : (
                <div className="space-y-2">
                  {matchedProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p.id);
                        setActivePage('product-detail');
                        onClose();
                      }}
                      className="p-3 bg-[#181818] hover:bg-[#222222] border border-[#262626] rounded-xs flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0a0a0a] rounded-xs border border-[#333333] flex items-center justify-center p-0.5 shrink-0">
                          <img src={p.media[0]?.url || ''} alt={p.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{p.name}</h5>
                          <span className="text-[10px] text-[#aaaaaa]">${p.price.toFixed(2)} USD</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#d4af37]" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Articles Match */}
            <div>
              <h4 className="text-xs font-mono uppercase text-[#d4af37] mb-3">
                Matching Journal Articles ({matchedArticles.length})
              </h4>
              {matchedArticles.length === 0 ? (
                <p className="text-xs text-[#777777]">No journal features matched.</p>
              ) : (
                <div className="space-y-2">
                  {matchedArticles.map(a => (
                    <div
                      key={a.id}
                      onClick={() => {
                        setActivePage('journal');
                        onClose();
                      }}
                      className="p-3 bg-[#181818] hover:bg-[#222222] border border-[#262626] rounded-xs flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h5 className="text-xs font-bold text-white">{a.title}</h5>
                        <span className="text-[10px] text-[#aaaaaa]">{a.readTime}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#d4af37]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
