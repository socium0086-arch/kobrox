import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { Article, PageView } from '../types';
import { ArrowRight, Search } from 'lucide-react';
import { optimizeImage } from '../utils/image';

interface JournalPageProps {
  setActivePage: (page: PageView) => void;
  onSelectProduct: (productId: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ setActivePage, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = ['All', 'History', 'KOBROX Stories', 'Lifestyle', 'Etiquette', 'Cigar Knowledge'];

  const filteredArticles = JOURNAL_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0d0d0d] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a059] block">
            THE EDITORIAL CHRONICLES
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl uppercase tracking-wider">
            KOBROX Cigar Journal
          </h1>
          <p className="font-serif-luxury text-xl italic text-[#d4af37]">
            Insights on tobacco rituals, cutter physics, flame ignition, and connoisseur culture.
          </p>
          <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mt-4" />
        </div>

        {/* Article Full Reader View Modal if an article is open */}
        {activeArticle ? (
          <div className="bg-[#141414] border border-[#2a2a2a] p-6 sm:p-12 rounded-sm space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="text-xs font-mono uppercase tracking-widest text-[#d4af37] hover:text-white flex items-center gap-2 cursor-pointer mb-4"
            >
              ← Back To All Journal Articles
            </button>

            <div className="space-y-3 border-b border-[#222222] pb-6">
              <div className="flex items-center gap-3 text-xs font-mono text-[#aaaaaa]">
                <span className="bg-[#1e1a14] text-[#d4af37] border border-[#3d3222] px-2.5 py-0.5 rounded-xs">
                  {activeArticle.category}
                </span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white uppercase leading-tight">
                {activeArticle.title}
              </h2>

              <p className="font-serif-luxury text-xl text-[#c5a059] italic">
                {activeArticle.subtitle}
              </p>
            </div>

            {/* Cover Image (Hidden if article content has section-specific images) */}
            {!activeArticle.content.some((sec) => !!sec.image) && activeArticle.coverImage && (
              <div className="overflow-hidden rounded-sm border border-[#2e2e2e] h-[350px]">
                <img
                  src={optimizeImage(activeArticle.coverImage, 1200)}
                  alt={activeArticle.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content Paragraphs */}
            <div className="space-y-6 text-sm text-[#cccccc] leading-relaxed">
              {activeArticle.content.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  {sec.heading && (
                    <h3 className="font-serif-luxury text-2xl text-white uppercase tracking-wide pt-4">
                      {sec.heading}
                    </h3>
                  )}
                  {sec.subheading && (
                    <h4 className="font-serif-luxury text-lg text-[#d4af37] tracking-wider pt-2 font-medium">
                      {sec.subheading}
                    </h4>
                  )}
                  {sec.image && (
                    <div className="my-4 overflow-hidden rounded-sm border border-[#2e2e2e] bg-[#1a1a1a]">
                      <img
                        src={optimizeImage(sec.image, 1200)}
                        alt={sec.imageAlt || sec.heading || activeArticle.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover max-h-[480px]"
                      />
                    </div>
                  )}
                  {sec.paragraph && <p className="leading-relaxed whitespace-pre-line">{sec.paragraph}</p>}
                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <ul className="space-y-1.5 pl-5 my-2 list-disc marker:text-[#d4af37] text-[#cccccc]">
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="pl-1">{bp}</li>
                      ))}
                    </ul>
                  )}
                  {sec.quote && (
                    <blockquote className="p-4 bg-[#1a1812] border-l-2 border-[#d4af37] font-serif-luxury italic text-lg text-[#f0e0b0] my-4">
                      "{sec.quote}"
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Article Grid View */
          <>
            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141414] border border-[#262626] p-4 rounded-sm">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-[#d4af37] text-black font-bold'
                        : 'bg-[#1e1e1e] text-[#888888] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#888888]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#333333] pl-9 pr-3 py-1.5 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="bg-[#141414] border border-[#222222] hover:border-[#d4af37]/60 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="h-48 overflow-hidden relative bg-[#1a1a1a]">
                      <img
                        src={optimizeImage(article.coverImage, 600)}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      />
                      <div className="absolute top-3 left-3 bg-[#14120e]/80 backdrop-blur-md border border-[#3d3222] px-2.5 py-1 text-[10px] font-mono text-[#d4af37] uppercase">
                        {article.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-serif-luxury text-2xl text-white group-hover:text-[#d4af37] transition-colors leading-tight">
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#999999] leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#d4af37] font-mono uppercase tracking-wider">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
