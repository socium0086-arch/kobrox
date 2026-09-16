import React, { useState, useEffect } from 'react';
import { PageView, AmazonRegion, Product, ProductMedia } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { JOURNAL_ARTICLES } from './data/journal';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { BrandIntroSection } from './components/BrandIntroSection';
import { CollectionCategoriesSection } from './components/CollectionCategoriesSection';
import { FeaturedShowcaseSection } from './components/FeaturedShowcaseSection';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CollectionsPage } from './components/CollectionsPage';
import { AboutPage } from './components/AboutPage';
import { JournalPage } from './components/JournalPage';
import { CigarPairingTool } from './components/CigarPairingTool';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';

import { AmazonDrawer } from './components/AmazonDrawer';
import { AdminProductModal } from './components/AdminProductModal';
import { NewsletterModal } from './components/NewsletterModal';
import { SearchModal } from './components/SearchModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { SupportTicket } from './types';

import { Instagram, Facebook, Youtube, Twitter, Music2, Share2, ArrowUpRight } from 'lucide-react';

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-sample-1',
    email: 'alexander.v@luxuryhumidor.com',
    amazonOrderId: '112-9842109-8837192',
    createdAt: new Date().toLocaleDateString() + ' 09:15 AM',
    status: 'open',
    unreadBySeller: true,
    messages: [
      {
        id: 'msg-sample-1',
        sender: 'user',
        text: 'Hello KOBROX team! I just placed an order for the Apex Stainless Steel Guillotine Cutter on Amazon US. Excited to receive it!',
        timestamp: '09:15 AM'
      },
      {
        id: 'msg-sample-2',
        sender: 'seller',
        text: 'Hello Alexander! Thank you for choosing KOBROX. Your cutter has been dispatched via Amazon Prime logistics.',
        timestamp: '09:20 AM'
      }
    ]
  }
];

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>(INITIAL_PRODUCTS[0].id);
  const [region, setRegion] = useState<AmazonRegion>('US');

  // Dynamic Product State for custom edits/uploads with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('kobrox_products_v4');
      if (saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem('kobrox_products_v4', JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // Live Chat & Support Ticket State
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem('kobrox_support_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch (e) {
      return INITIAL_TICKETS;
    }
  });

  const handleSaveTickets = (updatedTickets: SupportTicket[]) => {
    setTickets(updatedTickets);
    try {
      localStorage.setItem('kobrox_support_tickets', JSON.stringify(updatedTickets));
    } catch (e) {
      console.error('Failed to save tickets:', e);
    }
  };

  // Modals state
  const [amazonModalOpen, setAmazonModalOpen] = useState(false);
  const [amazonModalProduct, setAmazonModalProduct] = useState<Product | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];

  const handleOpenAmazonModal = (product?: Product) => {
    const targetProduct = product || (activePage === 'product-detail' ? currentProduct : null);
    const rawUrl = targetProduct
      ? (targetProduct.amazonLinks?.[region] || targetProduct.amazonLinks?.US || '')
      : 'https://www.amazon.com/stores/KOBROX/page/default?tag=kobrox-20';

    const hasValidUrl = Boolean(
      rawUrl &&
      rawUrl.trim() !== '' &&
      rawUrl.trim() !== '#' &&
      rawUrl.startsWith('http')
    );

    if (hasValidUrl) {
      window.open(rawUrl, '_blank', 'noopener,noreferrer');
    } else {
      setAmazonModalProduct(targetProduct || null);
      setAmazonModalOpen(true);
    }
  };

  const saveProductsToStorage = (updatedProducts: Product[]) => {
    try {
      localStorage.setItem('kobrox_products_v4', JSON.stringify(updatedProducts));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  const handleUpdateProductMedia = (productId: string, newMedia: ProductMedia[]) => {
    setProducts(prev => {
      const updated = prev.map(p => (p.id === productId ? { ...p, media: newMedia } : p));
      saveProductsToStorage(updated);
      return updated;
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => {
      const exists = prev.some(p => p.id === updatedProduct.id);
      const updated = exists
        ? prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
        : [updatedProduct, ...prev];
      saveProductsToStorage(updated);
      return updated;
    });
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => {
      const updated = [newProduct, ...prev];
      saveProductsToStorage(updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e5e5e5] flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        region={region}
        setRegion={setRegion}
        onOpenAmazonModal={() => handleOpenAmazonModal()}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onOpenSearchModal={() => setSearchModalOpen(true)}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <HeroSection
              setActivePage={setActivePage}
              onOpenAmazonModal={() => handleOpenAmazonModal(INITIAL_PRODUCTS[0])}
            />

            <BrandIntroSection setActivePage={setActivePage} />

            <CollectionCategoriesSection
              setActivePage={setActivePage}
              setSelectedCategory={setSelectedCategory}
            />

            <FeaturedShowcaseSection
              setActivePage={setActivePage}
              onSelectProduct={(id) => setSelectedProductId(id)}
              onOpenAmazonModal={() => handleOpenAmazonModal(INITIAL_PRODUCTS[0])}
            />

            {/* Social Media Section */}
            <section className="py-20 bg-[#111111] border-b border-[#222222]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a059]">
                    KOBROX LIFESTYLE COMMUNITY
                  </span>
                  <h2 className="font-serif-luxury text-3xl sm:text-5xl uppercase tracking-wider text-white">
                    Follow KOBROX
                  </h2>
                  <p className="text-xs text-[#888888] max-w-md mx-auto">
                    Tag @KOBROX.Official for a chance to be featured in our monthly curated cigar lounge gallery.
                  </p>
                </div>

                {/* Social Icons Grid */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
                  {[
                    { name: 'Instagram', icon: Instagram, handle: '@kobrox.official' },
                    { name: 'Facebook', icon: Facebook, handle: 'KOBROX Atelier' },
                    { name: 'YouTube', icon: Youtube, handle: 'KOBROX Cigars' },
                    { name: 'TikTok', icon: Music2, handle: '@kobrox_cigar' },
                    { name: 'Pinterest', icon: Share2, handle: 'KOBROX Luxury' },
                    { name: 'X / Twitter', icon: Twitter, handle: '@KOBROX_Official' }
                  ].map((soc) => {
                    const Icon = soc.icon;
                    return (
                      <a
                        key={soc.name}
                        href="#"
                        className="px-5 py-3 bg-[#181818] hover:bg-[#222222] border border-[#2a2a2a] hover:border-[#d4af37] text-white rounded-sm transition-all flex items-center gap-2 group cursor-pointer shadow-md"
                      >
                        <Icon className="w-4 h-4 text-[#d4af37]" />
                        <span>{soc.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] group-hover:text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-[#14120e] border-b border-[#3d3222]">
              <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
                <h2 className="font-serif-luxury text-3xl sm:text-5xl uppercase text-white tracking-wider">
                  Join The KOBROX Club
                </h2>
                <p className="text-xs sm:text-sm text-[#aaaaaa] max-w-xl mx-auto leading-relaxed">
                  Receive cigar insights, product launches, exclusive updates and premium lifestyle content directly to your private inbox.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setNewsletterModalOpen(true)}
                    className="px-8 py-4 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-[#e2bd45] transition-colors shadow-2xl cursor-pointer"
                  >
                    Subscribe To Club
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activePage === 'collections' && (
          <CollectionsPage
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            region={region}
            setActivePage={setActivePage}
            onSelectProduct={(id) => setSelectedProductId(id)}
            onOpenAmazonModal={handleOpenAmazonModal}
          />
        )}

        {activePage === 'featured' && (
          <FeaturedShowcaseSection
            setActivePage={setActivePage}
            onSelectProduct={(id) => setSelectedProductId(id)}
            onOpenAmazonModal={() => handleOpenAmazonModal(products[0])}
          />
        )}

        {activePage === 'product-detail' && (
          <ProductDetailPage
            product={currentProduct}
            region={region}
            setRegion={setRegion}
            onOpenAmazonModal={handleOpenAmazonModal}
            onUpdateProductMedia={handleUpdateProductMedia}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            setActivePage={setActivePage}
            onOpenAmazonModal={() => handleOpenAmazonModal()}
          />
        )}

        {activePage === 'privacy' && (
          <PrivacyPolicyPage
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'terms' && (
          <TermsPage
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'journal' && (
          <JournalPage
            setActivePage={setActivePage}
            onSelectProduct={(id) => setSelectedProductId(id)}
          />
        )}

        {activePage === 'pairing-tool' && (
          <CigarPairingTool
            setActivePage={setActivePage}
            onSelectProduct={(id) => setSelectedProductId(id)}
            onOpenAmazonModal={() => handleOpenAmazonModal()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenAmazonModal={() => handleOpenAmazonModal()}
        region={region}
        setRegion={setRegion}
        onOpenNewsletter={() => setNewsletterModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <AmazonDrawer
        isOpen={amazonModalOpen}
        onClose={() => setAmazonModalOpen(false)}
        product={amazonModalProduct}
        region={region}
        setRegion={setRegion}
      />

      <AdminProductModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onAddProduct={handleAddProduct}
        tickets={tickets}
        onSaveTickets={handleSaveTickets}
      />

      <LiveChatWidget
        tickets={tickets}
        onSaveTickets={handleSaveTickets}
      />

      <NewsletterModal
        isOpen={newsletterModalOpen}
        onClose={() => setNewsletterModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        products={products}
        articles={JOURNAL_ARTICLES}
        setActivePage={setActivePage}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

    </div>
  );
}
