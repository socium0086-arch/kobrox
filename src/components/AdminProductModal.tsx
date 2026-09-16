import React, { useState, useEffect } from 'react';
import { Product, ProductMedia, SupportTicket, ChatMessage, DetailImageItem, Review, AmazonRegion } from '../types';
import { compressImageFile } from '../utils/image';
import { 
  SlidersHorizontal, 
  X, 
  Save, 
  Trash2, 
  MessageSquare, 
  Send, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Tag, 
  ShieldCheck, 
  Search, 
  Eye, 
  Upload, 
  Plus, 
  Maximize2, 
  FileText, 
  Image as ImageIcon, 
  Sparkles, 
  Layers, 
  Copy, 
  Download, 
  GripVertical, 
  ChevronUp, 
  ChevronDown, 
  ArrowUpDown,
  Star,
  Edit2,
  Check,
  RotateCcw
} from 'lucide-react';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
  onAddProduct?: (newProduct: Product) => void;
  tickets: SupportTicket[];
  onSaveTickets: (updatedTickets: SupportTicket[]) => void;
}

const generateNewProductTemplate = (): Product => {
  const timestamp = Date.now();
  const randomSkuNum = Math.floor(1000 + Math.random() * 9000);
  return {
    id: `prod-custom-${timestamp}`,
    sku: `KBX-${randomSkuNum}`,
    name: 'New KOBROX Luxury Cigar Accessory',
    series: 'Atelier Series',
    tagline: 'Engineered Precision For The Modern Connoisseur',
    category: 'cutters',
    price: 98,
    originalPrice: 120,
    rating: 5.0,
    reviewCount: 1,
    inStock: true,
    isFeatured: false,
    badge: 'NEW ARRIVAL',
    overview: 'Meticulously crafted from aerospace-grade materials to deliver an effortless, pristine cut and elevated smoking ritual.',
    description: 'The latest addition to the KOBROX collection combines architectural precision with ergonomic balance. Hand-inspected and calibrated in our atelier to ensure timeless performance and effortless style.',
    craftsmanshipNotes: 'Forged and CNC-milled with micro-honed blades for exceptional longevity and smooth tactile feedback.',
    keyFeatures: [
      'Precision Aerospace-Grade Construction',
      'Ergonomic Balance & Smooth Actuation',
      'Luxury Gift Packaging & Authenticity Certificate'
    ],
    materials: [
      { name: '440C High-Carbon Stainless Steel', description: 'Hardened to 58 HRC for razor-sharp edge retention.' },
      { name: 'Aviation Aluminum Chassis', description: 'Lightweight, corrosion-resistant body with PVD finish.' }
    ],
    specifications: {
      'Dimensions': '75mm x 45mm x 9mm',
      'Weight': '88g',
      'Material': 'Stainless Steel & Aviation Aluminum',
      'Finish': 'Gunmetal & Brushed Gold PVD',
      'Warranty': 'Lifetime Atelier Craftsmanship Guarantee'
    },
    packageContents: [
      '1x KOBROX Luxury Accessory',
      '1x Velvet Travel Pouch',
      '1x Luxury Presentation Gift Box'
    ],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
        alt: 'New Product Showcase',
        caption: 'Front Atelier View',
        isCustomUploaded: true
      }
    ],
    detailImages: [],
    amazonLinks: {
      US: '',
      EU: ''
    },
    reviews: []
  };
};

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProduct,
  onAddProduct,
  tickets,
  onSaveTickets
}) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'products' | 'reviews'>('products');
  
  // Product state
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [editedProduct, setEditedProduct] = useState<Product | null>(products[0] || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  
  // Detail images & preview state
  const [newDetailImageUrl, setNewDetailImageUrl] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Drag & drop sorting states
  const [draggedMediaIndex, setDraggedMediaIndex] = useState<number | null>(null);
  const [dragOverMediaIndex, setDragOverMediaIndex] = useState<number | null>(null);
  const [draggedDetailIndex, setDraggedDetailIndex] = useState<number | null>(null);
  const [dragOverDetailIndex, setDragOverDetailIndex] = useState<number | null>(null);

  // Reviews state
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<{
    author: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    verifiedAmazonPurchase: boolean;
    region: AmazonRegion;
  }>({
    author: '',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    verifiedAmazonPurchase: true,
    region: 'US'
  });

  // Ticket state
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [sellerReplyText, setSellerReplyText] = useState('');
  const [ticketSearchQuery, setTicketSearchQuery] = useState('');

  // Sync state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      const p = products.find(prod => prod.id === selectedProductId) || products[0];
      if (p && !isCreatingNew) {
        setEditedProduct({ ...p });
      }
    }
  }, [isOpen, products, selectedProductId]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showConfirmModal) {
          setShowConfirmModal(false);
        } else if (previewImageUrl) {
          setPreviewImageUrl(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showConfirmModal, previewImageUrl, onClose]);

  if (!isOpen || !editedProduct) return null;

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0] || null;
  const totalReviewsCount = products.reduce((acc, p) => acc + (p.reviews?.length || 0), 0);

  const resetReviewForm = () => {
    setReviewForm({
      author: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      title: '',
      content: '',
      verifiedAmazonPurchase: true,
      region: 'US'
    });
    setIsAddingReview(false);
    setEditingReviewId(null);
  };

  const handleSelectProductChange = (id: string) => {
    const p = products.find(prod => prod.id === id);
    if (p) {
      setIsCreatingNew(false);
      setSelectedProductId(id);
      setEditedProduct({ ...p });
      resetReviewForm();
    }
  };

  const handleStartCreateNew = () => {
    const newTemplate = generateNewProductTemplate();
    setEditedProduct(newTemplate);
    setIsCreatingNew(true);
  };

  const handleCancelCreateNew = () => {
    setIsCreatingNew(false);
    const p = products.find(prod => prod.id === selectedProductId) || products[0];
    if (p) {
      setEditedProduct({ ...p });
    }
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    setEditedProduct(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleAmazonLinkChange = (regionKey: string, url: string) => {
    setEditedProduct(prev => prev ? {
      ...prev,
      amazonLinks: { ...prev.amazonLinks, [regionKey]: url }
    } : null);
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImageUrl.trim() && editedProduct) {
      const newMedia: ProductMedia = {
        type: 'image',
        url: newImageUrl.trim(),
        alt: editedProduct.name,
        caption: newImageCaption || 'Detail Photo',
        isCustomUploaded: true
      };
      setEditedProduct({
        ...editedProduct,
        media: [...editedProduct.media, newMedia]
      });
      setNewImageUrl('');
      setNewImageCaption('');
    }
  };

  const handleRemoveImage = (index: number) => {
    if (editedProduct && editedProduct.media.length > 1) {
      const updated = editedProduct.media.filter((_, i) => i !== index);
      setEditedProduct({ ...editedProduct, media: updated });
    }
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (!editedProduct || fromIndex === toIndex) return;
    if (toIndex < 0 || toIndex >= editedProduct.media.length) return;
    const items = [...editedProduct.media];
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    setEditedProduct({ ...editedProduct, media: items });
  };

  const handleMediaDragStart = (e: React.DragEvent, index: number) => {
    setDraggedMediaIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleMediaDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverMediaIndex !== index) {
      setDragOverMediaIndex(index);
    }
  };

  const handleMediaDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedMediaIndex !== null && draggedMediaIndex !== dropIndex) {
      handleMoveImage(draggedMediaIndex, dropIndex);
    }
    setDraggedMediaIndex(null);
    setDragOverMediaIndex(null);
  };

  const handleMediaDragEnd = () => {
    setDraggedMediaIndex(null);
    setDragOverMediaIndex(null);
  };

  const handleAddDetailImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDetailImageUrl.trim() && editedProduct) {
      const currentDetails = editedProduct.detailImages || [];
      const newItem: DetailImageItem = {
        url: newDetailImageUrl.trim(),
        caption: `${editedProduct.name} — Detail Graphic #${currentDetails.length + 1}`
      };
      setEditedProduct({
        ...editedProduct,
        detailImages: [...currentDetails, newItem]
      });
      setNewDetailImageUrl('');
    }
  };

  const handleRemoveDetailImage = (index: number) => {
    if (editedProduct && editedProduct.detailImages) {
      const updated = editedProduct.detailImages.filter((_, i) => i !== index);
      setEditedProduct({ ...editedProduct, detailImages: updated });
    }
  };

  const handleMoveDetailImage = (fromIndex: number, toIndex: number) => {
    if (!editedProduct || !editedProduct.detailImages || fromIndex === toIndex) return;
    if (toIndex < 0 || toIndex >= editedProduct.detailImages.length) return;
    const items = [...editedProduct.detailImages];
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    setEditedProduct({ ...editedProduct, detailImages: items });
  };

  const handleDetailDragStart = (e: React.DragEvent, index: number) => {
    setDraggedDetailIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDetailDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverDetailIndex !== index) {
      setDragOverDetailIndex(index);
    }
  };

  const handleDetailDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedDetailIndex !== null && draggedDetailIndex !== dropIndex) {
      handleMoveDetailImage(draggedDetailIndex, dropIndex);
    }
    setDraggedDetailIndex(null);
    setDragOverDetailIndex(null);
  };

  const handleDetailDragEnd = () => {
    setDraggedDetailIndex(null);
    setDragOverDetailIndex(null);
  };

  const handleUpdateDetailCaption = (index: number, captionText: string) => {
    if (!editedProduct || !editedProduct.detailImages) return;
    const updated = editedProduct.detailImages.map((item, i) => {
      if (i !== index) return item;
      const url = typeof item === 'string' ? item : item.url;
      return { url, caption: captionText };
    });
    setEditedProduct({ ...editedProduct, detailImages: updated });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'media' | 'detail') => {
    const file = e.target.files?.[0];
    if (file && editedProduct) {
      setIsUploading(true);
      try {
        const compressedBase64 = await compressImageFile(file, 1200, 0.85);
        if (target === 'media') {
          const newMedia: ProductMedia = {
            type: 'image',
            url: compressedBase64,
            alt: editedProduct.name,
            caption: 'Uploaded Photo',
            isCustomUploaded: true
          };
          setEditedProduct({
            ...editedProduct,
            media: [...editedProduct.media, newMedia]
          });
        } else {
          const currentDetails = editedProduct.detailImages || [];
          const newItem: DetailImageItem = {
            url: compressedBase64,
            caption: `${editedProduct.name} — Detail Graphic #${currentDetails.length + 1}`
          };
          setEditedProduct({
            ...editedProduct,
            detailImages: [...currentDetails, newItem]
          });
        }
      } catch (err) {
        console.error('Image compression/upload failed:', err);
        alert('Failed to process image file. Please try another image or URL.');
      } finally {
        setIsUploading(false);
        e.target.value = '';
      }
    }
  };

  // Customer Reviews Handlers
  const handleStartAddReview = () => {
    resetReviewForm();
    setIsAddingReview(true);
  };

  const handleStartEditReview = (rev: Review) => {
    setIsAddingReview(false);
    setEditingReviewId(rev.id);
    setReviewForm({
      author: rev.author,
      rating: rev.rating,
      date: rev.date,
      title: rev.title,
      content: rev.content,
      verifiedAmazonPurchase: rev.verifiedAmazonPurchase,
      region: rev.region
    });
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedProduct) return;
    if (!reviewForm.author.trim()) {
      alert('Please enter a Reviewer Name (评价人姓名).');
      return;
    }
    if (!reviewForm.title.trim()) {
      alert('Please enter a Review Title (评价标题).');
      return;
    }
    if (!reviewForm.content.trim()) {
      alert('Please enter Review Content (评价内容).');
      return;
    }

    if (editingReviewId) {
      const updatedReviews = (editedProduct.reviews || []).map(r => 
        r.id === editingReviewId 
          ? {
              ...r,
              author: reviewForm.author.trim(),
              rating: Number(reviewForm.rating) || 5,
              date: reviewForm.date || new Date().toISOString().split('T')[0],
              title: reviewForm.title.trim(),
              content: reviewForm.content.trim(),
              verifiedAmazonPurchase: Boolean(reviewForm.verifiedAmazonPurchase),
              region: reviewForm.region
            }
          : r
      );
      setEditedProduct({
        ...editedProduct,
        reviews: updatedReviews
      });
    } else {
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        author: reviewForm.author.trim(),
        rating: Number(reviewForm.rating) || 5,
        date: reviewForm.date || new Date().toISOString().split('T')[0],
        title: reviewForm.title.trim(),
        content: reviewForm.content.trim(),
        verifiedAmazonPurchase: Boolean(reviewForm.verifiedAmazonPurchase),
        region: reviewForm.region
      };
      setEditedProduct({
        ...editedProduct,
        reviews: [newReview, ...(editedProduct.reviews || [])]
      });
    }

    resetReviewForm();
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!editedProduct) return;
    if (confirm('Are you sure you want to delete this customer review? (确定删除此条评价吗？)')) {
      const updated = (editedProduct.reviews || []).filter(r => r.id !== reviewId);
      setEditedProduct({
        ...editedProduct,
        reviews: updated
      });
      if (editingReviewId === reviewId) {
        resetReviewForm();
      }
    }
  };

  const handleSyncRatingFromReviews = () => {
    if (!editedProduct || !editedProduct.reviews || editedProduct.reviews.length === 0) {
      alert('No customer reviews available for this product yet.');
      return;
    }
    const total = editedProduct.reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = Number((total / editedProduct.reviews.length).toFixed(1));
    setEditedProduct({
      ...editedProduct,
      rating: avg,
      reviewCount: Math.max(editedProduct.reviewCount, editedProduct.reviews.length)
    });
  };

  // Render Customer Reviews Manager Section
  const renderReviewsManager = (isStandaloneView: boolean) => {
    if (!editedProduct) return null;
    const currentReviews = editedProduct.reviews || [];

    return (
      <div className={`space-y-4 ${isStandaloneView ? 'p-6 max-w-5xl mx-auto' : 'pt-4 border-t border-[#222222]'}`}>
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#161410] border border-[#3d3222] p-4 rounded-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
              <h4 className="text-xs font-mono uppercase text-[#d4af37] font-bold">
                Customer Reviews / 客户评价管理 ({currentReviews.length})
              </h4>
            </div>
            <p className="text-[11px] text-[#aaaaaa]">
              Manage genuine customer feedback, verified purchase badges, and Amazon regional ratings for <strong>{editedProduct.name}</strong>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {currentReviews.length > 0 && (
              <button
                type="button"
                onClick={handleSyncRatingFromReviews}
                className="px-3 py-1.5 bg-[#221e17] hover:bg-[#332b1e] text-[#d4af37] border border-[#4d3d26] text-[11px] font-mono rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Calculate average stars from existing reviews and update storefront rating"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Sync Rating & Count</span>
              </button>
            )}

            {!isAddingReview && !editingReviewId && (
              <button
                type="button"
                onClick={handleStartAddReview}
                className="px-3.5 py-1.5 bg-[#d4af37] hover:bg-[#e2bd45] text-black font-bold text-[11px] font-mono uppercase rounded-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-[1.02]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Review (添加评价)</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Ratings Metric Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-3 bg-[#101010] border border-[#222222] rounded-xs flex flex-col">
            <span className="text-[10px] font-mono text-[#777777] uppercase">Storefront Rating</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
              <span className="text-base font-bold text-white font-mono">{editedProduct.rating}</span>
              <span className="text-[10px] text-[#888888]">/ 5.0</span>
            </div>
          </div>

          <div className="p-3 bg-[#101010] border border-[#222222] rounded-xs flex flex-col">
            <span className="text-[10px] font-mono text-[#777777] uppercase">Displayed Reviews</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-base font-bold text-white font-mono">{editedProduct.reviewCount}</span>
              <span className="text-[10px] text-[#888888]">ratings total</span>
            </div>
          </div>

          <div className="p-3 bg-[#101010] border border-[#222222] rounded-xs flex flex-col">
            <span className="text-[10px] font-mono text-[#777777] uppercase">Verified Purchases</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-base font-bold text-emerald-400 font-mono">
                {currentReviews.filter(r => r.verifiedAmazonPurchase).length}
              </span>
              <span className="text-[10px] text-[#888888]">/ {currentReviews.length} reviews</span>
            </div>
          </div>

          <div className="p-3 bg-[#101010] border border-[#222222] rounded-xs flex flex-col">
            <span className="text-[10px] font-mono text-[#777777] uppercase">5-Star Ratio</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-base font-bold text-[#d4af37] font-mono">
                {currentReviews.length > 0 
                  ? Math.round((currentReviews.filter(r => r.rating === 5).length / currentReviews.length) * 100) 
                  : 100}%
              </span>
              <span className="text-[10px] text-[#888888]">positive</span>
            </div>
          </div>
        </div>

        {/* Add / Edit Review Form Card */}
        {(isAddingReview || editingReviewId) && (
          <form onSubmit={handleSaveReview} className="p-4 bg-[#14120e] border-2 border-[#d4af37]/60 rounded-xs space-y-4 animate-fadeIn shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2e261a] pb-2.5">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Edit2 className="w-4 h-4" />
                <h5 className="font-mono text-xs uppercase font-bold text-white">
                  {editingReviewId ? 'Edit Customer Review / 修改评价' : 'Add New Customer Review / 新增客户评价'}
                </h5>
              </div>
              <button
                type="button"
                onClick={resetReviewForm}
                className="text-xs text-[#888888] hover:text-white font-mono cursor-pointer"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {/* Reviewer Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#d4af37] block">
                  Reviewer Name / 评价人姓名:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander V. or Marcus Sterling"
                  value={reviewForm.author}
                  onChange={e => setReviewForm(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#333333] px-3 py-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Star Rating Interactive Picker */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#d4af37] block">
                  Star Rating / 星级评分: ({reviewForm.rating} Stars)
                </label>
                <div className="flex items-center gap-2 h-9 px-3 bg-[#0a0a0a] border border-[#333333] rounded-xs">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(starNum => (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: starNum }))}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                        title={`${starNum} Stars`}
                      >
                        <Star 
                          className={`w-4 h-4 ${
                            starNum <= reviewForm.rating 
                              ? 'text-[#d4af37] fill-[#d4af37]' 
                              : 'text-[#444444]'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#d4af37] font-bold ml-2">
                    {reviewForm.rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#d4af37] block">
                  Review Date / 评价日期:
                </label>
                <input
                  type="date"
                  value={reviewForm.date}
                  onChange={e => setReviewForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#333333] px-3 py-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37] [color-scheme:dark]"
                />
              </div>

              {/* Amazon Marketplace Region & Verified toggle */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#d4af37] block">
                    Region / 站点:
                  </label>
                  <select
                    value={reviewForm.region}
                    onChange={e => setReviewForm(prev => ({ ...prev, region: e.target.value as AmazonRegion }))}
                    className="w-full bg-[#0a0a0a] border border-[#333333] px-2.5 py-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="US">Amazon US (美亚)</option>
                    <option value="EU">Amazon EU (欧亚)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-[#d4af37] block">
                    Amazon Verified / 认证:
                  </label>
                  <label className="flex items-center gap-2 h-9 px-2.5 bg-[#0a0a0a] border border-[#333333] rounded-xs cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={reviewForm.verifiedAmazonPurchase}
                      onChange={e => setReviewForm(prev => ({ ...prev, verifiedAmazonPurchase: e.target.checked }))}
                      className="accent-[#d4af37] w-3.5 h-3.5"
                    />
                    <span className="text-[10px] text-emerald-400 font-mono font-medium truncate">
                      ✓ Verified Buyer
                    </span>
                  </label>
                </div>
              </div>

              {/* Review Headline / Title */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#d4af37] block">
                  Review Headline / 评价标题:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Rolex of Cigar Cutters — Crisp cut and unrivaled heft"
                  value={reviewForm.title}
                  onChange={e => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#333333] px-3 py-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Review Content */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#d4af37] block">
                  Review Body Text / 评价详细内容:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Paste or write the customer's full review feedback here..."
                  value={reviewForm.content}
                  onChange={e => setReviewForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full bg-[#0a0a0a] border border-[#333333] p-3 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37] leading-relaxed"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#262016]">
              <button
                type="button"
                onClick={resetReviewForm}
                className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-[#cccccc] font-mono text-xs uppercase rounded-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#d4af37] hover:bg-[#e2bd45] text-black font-bold font-mono text-xs uppercase rounded-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{editingReviewId ? 'Update Review (更新评价)' : 'Save New Review (确认添加)'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Existing Reviews List */}
        <div className="space-y-3">
          {currentReviews.length === 0 ? (
            <div className="p-8 border border-dashed border-[#333333] rounded-xs text-center space-y-2 bg-[#0c0c0c]">
              <Star className="w-8 h-8 text-[#555555] mx-auto" />
              <p className="text-xs text-[#888888] font-mono">
                No customer reviews added yet for {editedProduct.name}.
              </p>
              <button
                type="button"
                onClick={handleStartAddReview}
                className="text-xs text-[#d4af37] hover:underline font-mono"
              >
                + Click here to add the first customer review
              </button>
            </div>
          ) : (
            currentReviews.map((rev, index) => (
              <div 
                key={rev.id || index}
                className="p-4 bg-[#111111] border border-[#242424] hover:border-[#3d3322] rounded-xs transition-colors space-y-2.5"
              >
                {/* Review Header Line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="flex items-center text-[#d4af37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                      ))}
                      {[...Array(Math.max(0, 5 - rev.rating))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#444444]" />
                      ))}
                    </div>

                    <span className="text-xs font-bold text-white font-mono">
                      {rev.author}
                    </span>

                    {rev.verifiedAmazonPurchase && (
                      <span className="text-[9px] font-mono bg-[#162417] text-emerald-400 border border-emerald-900/80 px-2 py-0.5 rounded-xs">
                        ✓ Verified Amazon Purchase ({rev.region || 'US'})
                      </span>
                    )}
                  </div>

                  {/* Actions & Date */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#777777]">
                      {rev.date}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleStartEditReview(rev)}
                        className="px-2 py-1 bg-[#1c1c1c] hover:bg-[#282828] text-[#d4af37] border border-[#333333] rounded-xs text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                        title="Edit this review"
                      >
                        <Edit2 className="w-2.5 h-2.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteReview(rev.id)}
                        className="px-2 py-1 bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-white border border-red-900/60 rounded-xs text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                        title="Delete this review"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Review Title & Content */}
                <div className="space-y-1">
                  <h6 className="text-xs font-bold text-white uppercase tracking-wide">
                    {rev.title}
                  </h6>
                  <p className="text-xs text-[#cccccc] leading-relaxed whitespace-pre-line">
                    {rev.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Informative Tip */}
        <div className="p-3 bg-[#0f0e0c] border border-[#2d2416] rounded-xs text-[11px] text-[#888888] font-mono flex items-center justify-between">
          <span>
            💡 Changes to reviews will be saved when you click <strong>Save Product Changes</strong>.
          </span>
          <span className="text-[#d4af37]">
            Live on Storefront REVIEWS Tab
          </span>
        </div>
      </div>
    );
  };

  // Step 1: Open Confirmation Modal
  const handleInitiateSave = () => {
    if (!editedProduct) return;
    if (!editedProduct.name.trim()) {
      alert('Please enter a valid Product Name before saving.');
      return;
    }
    if (!editedProduct.sku.trim()) {
      alert('Please enter a valid SKU.');
      return;
    }
    setShowConfirmModal(true);
  };

  // Step 2: Confirm and commit save
  const handleConfirmSave = () => {
    if (!editedProduct) return;

    if (isCreatingNew) {
      if (onAddProduct) {
        onAddProduct(editedProduct);
      } else {
        onUpdateProduct(editedProduct);
      }
      setSelectedProductId(editedProduct.id);
      setIsCreatingNew(false);
      setSuccessMessage(`✓ New product "${editedProduct.name}" created and added to KOBROX Catalog!`);
    } else {
      onUpdateProduct(editedProduct);
      setSuccessMessage(`✓ Changes for "${editedProduct.name}" saved successfully!`);
    }

    setShowConfirmModal(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleSendSellerReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerReplyText.trim() || !selectedTicket) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyMsg: ChatMessage = {
      id: 'msg-seller-' + Date.now(),
      sender: 'seller',
      text: sellerReplyText.trim(),
      timestamp: now
    };

    const updatedTicket: SupportTicket = {
      ...selectedTicket,
      status: 'replied',
      unreadBySeller: false,
      messages: [...selectedTicket.messages, replyMsg]
    };

    const updatedList = tickets.map(t => (t.id === selectedTicket.id ? updatedTicket : t));
    onSaveTickets(updatedList);
    setSellerReplyText('');
  };

  const handleUpdateTicketStatus = (ticketId: string, status: 'open' | 'replied' | 'resolved') => {
    const updatedList = tickets.map(t => (t.id === ticketId ? { ...t, status } : t));
    onSaveTickets(updatedList);
  };

  const filteredTickets = tickets.filter(
    t =>
      t.email.toLowerCase().includes(ticketSearchQuery.toLowerCase()) ||
      t.amazonOrderId.includes(ticketSearchQuery)
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#141414] border border-[#333333] rounded-sm shadow-2xl flex flex-col text-white overflow-hidden">
        
        {/* Top Bar Header */}
        <div className="bg-[#1a1712] border-b border-[#33281b] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#262016] border border-[#443826] rounded-sm text-[#d4af37]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-lg font-bold uppercase tracking-wider text-white">
                  KOBROX Seller Control Portal
                </span>
                <span className="text-[10px] font-mono bg-[#d4af37] text-black font-bold px-2 py-0.5 rounded-xs">
                  SELLER ACCESS ONLY
                </span>
              </div>
              <p className="text-xs text-[#aaaaaa]">
                Real-time Amazon customer support desk & product management console.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#222222] hover:bg-[#333333] text-[#cccccc] hover:text-white border border-[#444444] rounded-xs text-xs font-mono transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Close (关闭)</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#181818] border-b border-[#262626] flex items-center px-4">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tickets'
                ? 'border-[#d4af37] text-[#d4af37] font-bold bg-[#1e1b15]'
                : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Support Desk ({tickets.length})</span>
            {tickets.some(t => t.unreadBySeller) && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#d4af37] text-[#d4af37] font-bold bg-[#1e1b15]'
                : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Product Catalog & Amazon Links ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#d4af37] text-[#d4af37] font-bold bg-[#1e1b15]'
                : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            <Star className="w-4 h-4 text-[#d4af37]" />
            <span>Customer Reviews / 评价管理 ({totalReviewsCount})</span>
          </button>
        </div>

        {/* Tab 1: Customer Support Desk */}
        {activeTab === 'tickets' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Ticket List */}
            <div className="w-80 border-r border-[#262626] bg-[#101010] flex flex-col">
              <div className="p-3 border-b border-[#222222]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#888888]" />
                  <input
                    type="text"
                    placeholder="Filter by Order ID or Email..."
                    value={ticketSearchQuery}
                    onChange={e => setTicketSearchQuery(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2e2e2e] pl-8 pr-2 py-1.5 text-[11px] text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#1f1f1f]">
                {filteredTickets.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#666666]">
                    No customer support requests found.
                  </div>
                ) : (
                  filteredTickets.map(tkt => (
                    <button
                      key={tkt.id}
                      onClick={() => {
                        setSelectedTicketId(tkt.id);
                        if (tkt.unreadBySeller) {
                          const updated = tickets.map(t =>
                            t.id === tkt.id ? { ...t, unreadBySeller: false } : t
                          );
                          onSaveTickets(updated);
                        }
                      }}
                      className={`w-full text-left p-3.5 transition-colors cursor-pointer block ${
                        selectedTicket?.id === tkt.id
                          ? 'bg-[#1f1b14] border-l-2 border-[#d4af37]'
                          : 'hover:bg-[#161616]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-[#d4af37]">
                          #{tkt.amazonOrderId}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded-xs uppercase ${
                            tkt.status === 'open'
                               ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : tkt.status === 'replied'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {tkt.status}
                        </span>
                      </div>

                      <div className="text-[11px] text-white font-medium truncate mb-1">
                        {tkt.email}
                      </div>

                      <div className="text-[10px] text-[#777777] flex items-center justify-between">
                        <span className="truncate max-w-[160px]">
                          {tkt.messages[tkt.messages.length - 1]?.text || 'No messages'}
                        </span>
                        <span>{tkt.messages[tkt.messages.length - 1]?.timestamp}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Right Chat History & Reply */}
            <div className="flex-1 flex flex-col bg-[#141414] overflow-hidden">
              {selectedTicket ? (
                <>
                  {/* Selected Ticket Top Info */}
                  <div className="p-4 bg-[#1a1814] border-b border-[#2a2a2a] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                        <span className="text-xs font-mono uppercase text-[#aaaaaa]">Amazon Order ID:</span>
                        <span className="text-sm font-mono font-bold text-[#d4af37]">
                          #{selectedTicket.amazonOrderId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#cccccc]">
                        <Mail className="w-3.5 h-3.5 text-[#888888]" />
                        <span>{selectedTicket.email}</span>
                        <span className="text-[#555555]">|</span>
                        <Clock className="w-3.5 h-3.5 text-[#888888]" />
                        <span>Submitted: {selectedTicket.createdAt}</span>
                      </div>
                    </div>

                    {/* Status Toggle Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'resolved')}
                        className="px-3 py-1.5 bg-[#1e1e1e] hover:bg-emerald-900/40 text-emerald-400 border border-emerald-800 text-[10px] font-mono uppercase rounded-xs transition-colors cursor-pointer"
                      >
                        ✓ Mark Resolved
                      </button>
                    </div>
                  </div>

                  {/* Messages Thread */}
                  <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#121212]">
                    {selectedTicket.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.sender === 'seller' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-[#777777]">
                          <span>{msg.sender === 'seller' ? 'KOBROX Seller Support (You)' : 'Customer (' + selectedTicket.email + ')'}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-[80%] p-3.5 rounded-md text-xs leading-relaxed ${
                            msg.sender === 'seller'
                              ? 'bg-[#d4af37] text-black font-semibold rounded-tr-none'
                              : 'bg-[#1d1a15] border border-[#3d3222] text-white rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input Box */}
                  <form onSubmit={handleSendSellerReply} className="p-4 bg-[#181818] border-t border-[#2a2a2a] flex gap-3">
                    <input
                      type="text"
                      placeholder={`Reply to ${selectedTicket.email}...`}
                      value={sellerReplyText}
                      onChange={e => setSellerReplyText(e.target.value)}
                      className="flex-1 bg-[#0d0d0d] border border-[#333333] px-4 py-3 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#d4af37] hover:bg-[#e2bd45] text-black font-bold uppercase tracking-wider text-xs rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Seller Reply</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-xs text-[#666666]">
                  Select a customer support ticket from the list to view conversation.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Products & Amazon Links */}
        {activeTab === 'products' && (
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs">
            
            {/* Top Selection & Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171510] border border-[#3d3222] p-3.5 rounded-xs">
              <div className="flex-1 w-full space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#d4af37] flex items-center gap-1.5 font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>
                    {isCreatingNew 
                      ? 'Creating New Product Listing / 正在新增产品:' 
                      : 'Select Product To Edit / 选择需修改的产品:'}
                  </span>
                </label>

                {!isCreatingNew ? (
                  <select
                    value={selectedProductId}
                    onChange={e => handleSelectProductChange(e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#3d3324] p-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        [{p.sku}] {p.name} — ${p.price} USD ({p.category.toUpperCase()})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center justify-between p-2.5 bg-[#221b12] border border-[#d4af37]/40 text-xs text-[#f5c760] font-mono rounded-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                      <span>Drafting New Item: [{editedProduct.sku}] {editedProduct.name}</span>
                    </div>
                    <span className="text-[9px] bg-[#d4af37] text-black font-bold px-1.5 py-0.5 rounded-xs uppercase">
                      Unpublished Draft
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Add New Product / Cancel New */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto pt-1 sm:pt-4">
                {!isCreatingNew ? (
                  <button
                    type="button"
                    onClick={handleStartCreateNew}
                    className="w-full sm:w-auto px-4 py-2.5 bg-[#d4af37] hover:bg-[#e2bd45] text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02]"
                    title="Add a brand new product to the KOBROX catalog"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>+ Add New Product (新增产品)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCancelCreateNew}
                    className="w-full sm:w-auto px-4 py-2.5 bg-[#222222] hover:bg-[#333333] border border-[#444444] text-[#cccccc] hover:text-white font-mono text-xs uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel New Draft (取消新增)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[#888888] uppercase font-mono block">Product Name / 产品名称</label>
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  placeholder="e.g. KOBROX Apex Double Blade Cigar Cutter"
                  className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#888888] uppercase font-mono block">SKU / 编号</label>
                <input
                  type="text"
                  value={editedProduct.sku}
                  onChange={e => handleInputChange('sku', e.target.value)}
                  placeholder="e.g. KBX-8801"
                  className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs font-mono focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#888888] uppercase font-mono block">Category / 分类</label>
                <select
                  value={editedProduct.category}
                  onChange={e => handleInputChange('category', e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="cutters">Cutters (雪茄剪)</option>
                  <option value="lighters">Lighters (雪茄打火机)</option>
                  <option value="sets">Sets & Kits (套装礼盒)</option>
                  <option value="accessories">Accessories (配件周边)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#888888] uppercase font-mono block">Series / 系列</label>
                <input
                  type="text"
                  value={editedProduct.series || ''}
                  onChange={e => handleInputChange('series', e.target.value)}
                  placeholder="e.g. Atelier Series, Apex Series"
                  className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#888888] uppercase font-mono block">MSRP Price ($ USD) / 售价</label>
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={e => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#888888] uppercase font-mono block">Original Price ($ USD) / 原价 (划线价)</label>
                <input
                  type="number"
                  value={editedProduct.originalPrice || ''}
                  onChange={e => handleInputChange('originalPrice', parseFloat(e.target.value) || undefined)}
                  placeholder="e.g. 120"
                  className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#888888] uppercase font-mono block">Badge / 标签 (如 NEW ARRIVAL)</label>
                <input
                  type="text"
                  value={editedProduct.badge || ''}
                  onChange={e => handleInputChange('badge', e.target.value)}
                  placeholder="e.g. NEW ARRIVAL, BEST SELLER"
                  className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                <label className="text-[#888888] uppercase font-mono block">Tagline / Slogan / 产品副标</label>
                <input
                  type="text"
                  value={editedProduct.tagline}
                  onChange={e => handleInputChange('tagline', e.target.value)}
                  placeholder="e.g. Ultra-precise double guillotine for ring gauges up to 60"
                  className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Product Overview & Description Content */}
            <div className="space-y-3 pt-3 border-t border-[#222222]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#d4af37]" />
                <h4 className="text-xs font-mono uppercase text-[#d4af37]">
                  Product Overview & Description Content (PRODUCT OVERVIEW 内容修改):
                </h4>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[#888888] uppercase font-mono block">Product Overview Summary</label>
                  <textarea
                    rows={3}
                    value={editedProduct.overview || ''}
                    onChange={e => handleInputChange('overview', e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#333333] p-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37] leading-relaxed"
                    placeholder="Enter product overview summary..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#888888] uppercase font-mono block">Extended Product Description</label>
                  <textarea
                    rows={3}
                    value={editedProduct.description || ''}
                    onChange={e => handleInputChange('description', e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#333333] p-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37] leading-relaxed"
                    placeholder="Enter detailed description..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#888888] uppercase font-mono block">Atelier Craftsmanship Note</label>
                  <textarea
                    rows={2}
                    value={editedProduct.craftsmanshipNotes || ''}
                    onChange={e => handleInputChange('craftsmanshipNotes', e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#333333] p-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37] leading-relaxed"
                    placeholder="Enter craftsmanship notes..."
                  />
                </div>
              </div>
            </div>

            {/* Official Amazon Link */}
            <div className="space-y-3 pt-2 border-t border-[#222222]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase text-[#d4af37]">Official Amazon Storefront Product Link:</h4>
                {(editedProduct.amazonLinks?.US || editedProduct.amazonLinks?.EU) ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-xs">
                    ✓ Listed on Amazon
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded-xs">
                    ⏱ Coming Soon Notice Active
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#888888] uppercase font-mono block">Amazon US Link (.com)</label>
                  <input
                    type="text"
                    placeholder="e.g. https://www.amazon.com/dp/B0KOBROXCUT1"
                    value={editedProduct.amazonLinks?.US || ''}
                    onChange={e => {
                      const val = e.target.value;
                      handleAmazonLinkChange('US', val);
                      if (!editedProduct.amazonLinks?.EU) handleAmazonLinkChange('EU', val);
                    }}
                    className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#888888] uppercase font-mono block">Amazon EU Link (.de/.eu)</label>
                  <input
                    type="text"
                    placeholder="e.g. https://www.amazon.de/dp/B0KOBROXCUT1"
                    value={editedProduct.amazonLinks?.EU || ''}
                    onChange={e => handleAmazonLinkChange('EU', e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[10px] text-[#888888]">
                  Leave blank if this product is not yet listed on Amazon. Customers will be shown the "Coming Soon to Amazon" notice.
                </p>
                {(editedProduct.amazonLinks?.US || editedProduct.amazonLinks?.EU) && (
                  <button
                    type="button"
                    onClick={() => {
                      handleAmazonLinkChange('US', '');
                      handleAmazonLinkChange('EU', '');
                    }}
                    className="text-[10px] font-mono text-red-400 hover:text-red-300 underline cursor-pointer shrink-0"
                  >
                    Clear Link (Set as Coming Soon)
                  </button>
                )}
              </div>
            </div>

            {/* Media Gallery Management */}
            <div className="space-y-3 pt-3 border-t border-[#222222]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="text-xs font-mono uppercase text-[#d4af37]">
                    Manage Image Gallery ({editedProduct.media.length}):
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#888888] font-mono">
                  <ArrowUpDown className="w-3 h-3 text-[#d4af37]" />
                  <span>Drag cards or use buttons to reorder</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {editedProduct.media.map((med, i) => {
                  const isDragging = draggedMediaIndex === i;
                  const isDragOver = dragOverMediaIndex === i;

                  return (
                    <div 
                      key={i} 
                      draggable
                      onDragStart={(e) => handleMediaDragStart(e, i)}
                      onDragOver={(e) => handleMediaDragOver(e, i)}
                      onDrop={(e) => handleMediaDrop(e, i)}
                      onDragEnd={handleMediaDragEnd}
                      className={`relative group rounded-xs overflow-hidden h-28 bg-[#0a0a0a] transition-all flex flex-col items-center justify-between p-1.5 cursor-grab active:cursor-grabbing border ${
                        isDragOver
                          ? 'border-[#d4af37] ring-2 ring-[#d4af37]/50 scale-[1.02] bg-[#1a160d]'
                          : isDragging
                          ? 'opacity-40 border-dashed border-[#888888]'
                          : 'border-[#2a2a2a] hover:border-[#d4af37]/70'
                      }`}
                    >
                      {/* Top bar with drag handle & quick move */}
                      <div className="w-full flex items-center justify-between z-10">
                        <div className="flex items-center gap-1 bg-black/85 text-[9px] font-mono text-[#d4af37] px-1.5 py-0.5 rounded-xs border border-[#333333]">
                          <GripVertical className="w-2.5 h-2.5 opacity-70" />
                          <span>#{i + 1}</span>
                        </div>

                        <div className="flex items-center gap-0.5 bg-black/85 rounded-xs p-0.5 border border-[#333333]">
                          <button
                            type="button"
                            disabled={i === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveImage(i, i - 1);
                            }}
                            className="p-0.5 text-[#aaaaaa] hover:text-[#d4af37] disabled:opacity-30 disabled:hover:text-[#aaaaaa] cursor-pointer"
                            title="Move Left / Forward"
                          >
                            <ChevronUp className="w-3 h-3 -rotate-90" />
                          </button>
                          <button
                            type="button"
                            disabled={i === editedProduct.media.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveImage(i, i + 1);
                            }}
                            className="p-0.5 text-[#aaaaaa] hover:text-[#d4af37] disabled:opacity-30 disabled:hover:text-[#aaaaaa] cursor-pointer"
                            title="Move Right / Backward"
                          >
                            <ChevronDown className="w-3 h-3 -rotate-90" />
                          </button>
                        </div>
                      </div>

                      {/* Image Thumbnail */}
                      <div 
                        className="w-full flex-1 flex items-center justify-center overflow-hidden cursor-pointer my-1"
                        onClick={() => setPreviewImageUrl(med.url)}
                      >
                        <img src={med.url} alt={med.alt} className="max-w-full max-h-16 object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none" />
                      </div>

                      {/* Bottom action bar */}
                      <div className="w-full flex items-center justify-between z-10 pt-1">
                        <button
                          type="button"
                          onClick={() => setPreviewImageUrl(med.url)}
                          className="text-[9px] font-mono text-[#888888] hover:text-[#d4af37] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-2.5 h-2.5" />
                          <span>Preview</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(i);
                          }}
                          className="p-1 bg-red-950/80 hover:bg-red-800 text-red-300 hover:text-white border border-red-800/60 rounded-xs transition-colors cursor-pointer"
                          title="Delete image"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 pt-1">
                <form onSubmit={handleAddImage} className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste image URL..."
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    className="flex-1 bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#222222] hover:bg-[#333333] border border-[#444444] text-xs text-[#d4af37] font-mono uppercase rounded-xs cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add URL</span>
                  </button>
                </form>

                <div className="flex items-center gap-2">
                  <label className="px-3 py-1.5 bg-[#181818] hover:bg-[#222222] border border-[#333333] text-[11px] text-[#cccccc] font-mono uppercase rounded-xs cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload Local Image File</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => handleFileUpload(e, 'media')} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Product Detail Showcase Images (Featured in PRODUCT OVERVIEW) */}
            <div className="space-y-3 pt-3 border-t border-[#222222]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="text-xs font-mono uppercase text-[#d4af37]">
                    Manage Product Detail Showcase Images / 图片详情 ({(editedProduct.detailImages || []).length}):
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#888888] font-mono">
                  <ArrowUpDown className="w-3 h-3 text-[#d4af37]" />
                  <span>Drag items or use buttons to reorder</span>
                </div>
              </div>

              <p className="text-[11px] text-[#aaaaaa]">
                Upload or paste high-resolution product feature detail graphics. Drag any item to rearrange the sequence on the product detail page.
              </p>

              <div className="space-y-2.5">
                {(editedProduct.detailImages || []).map((item, i) => {
                  const imgUrl = typeof item === 'string' ? item : item.url;
                  const caption = typeof item === 'object' && item.caption !== undefined
                    ? item.caption
                    : `${editedProduct.name} — Detail Graphic #${i + 1}`;

                  const isDragging = draggedDetailIndex === i;
                  const isDragOver = dragOverDetailIndex === i;

                  return (
                    <div 
                      key={i} 
                      draggable
                      onDragStart={(e) => handleDetailDragStart(e, i)}
                      onDragOver={(e) => handleDetailDragOver(e, i)}
                      onDrop={(e) => handleDetailDrop(e, i)}
                      onDragEnd={handleDetailDragEnd}
                      className={`p-2.5 bg-[#0a0a0a] rounded-xs flex flex-col sm:flex-row items-center gap-3 transition-all cursor-grab active:cursor-grabbing border ${
                        isDragOver
                          ? 'border-[#d4af37] ring-2 ring-[#d4af37]/50 bg-[#1a160d] scale-[1.01]'
                          : isDragging
                          ? 'opacity-40 border-dashed border-[#888888]'
                          : 'border-[#2a2a2a] hover:border-[#444444]'
                      }`}
                    >
                      {/* Left Drag & Order Controls */}
                      <div className="flex sm:flex-col items-center justify-center gap-1 shrink-0 p-1 bg-[#141414] border border-[#2a2a2a] rounded-xs">
                        <div className="text-[10px] font-mono text-[#d4af37] font-bold px-1 flex items-center gap-0.5">
                          <GripVertical className="w-3 h-3 opacity-60" />
                          <span>#{i + 1}</span>
                        </div>
                        <div className="flex sm:flex-row gap-0.5">
                          <button
                            type="button"
                            disabled={i === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveDetailImage(i, i - 1);
                            }}
                            className="p-1 text-[#888888] hover:text-[#d4af37] disabled:opacity-20 disabled:hover:text-[#888888] cursor-pointer"
                            title="Move Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={i === (editedProduct.detailImages || []).length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveDetailImage(i, i + 1);
                            }}
                            className="p-1 text-[#888888] hover:text-[#d4af37] disabled:opacity-20 disabled:hover:text-[#888888] cursor-pointer"
                            title="Move Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Image Thumbnail with preview and delete */}
                      <div 
                        className="relative group border border-[#222222] hover:border-[#d4af37] rounded-xs overflow-hidden w-full sm:w-28 h-20 bg-[#0a0a0a] shrink-0 cursor-pointer flex items-center justify-center p-1"
                        onClick={() => setPreviewImageUrl(imgUrl)}
                      >
                        <img src={imgUrl} alt={`Detail image ${i + 1}`} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          <span className="p-1 bg-[#d4af37] text-black rounded-full shadow-lg" title="Click to Preview">
                            <Eye className="w-3 h-3" />
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveDetailImage(i);
                            }}
                            className="p-1 bg-red-900/90 text-white hover:bg-red-700 rounded-full shadow-lg transition-colors cursor-pointer"
                            title="Delete image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Caption Input */}
                      <div className="flex-1 w-full space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-mono uppercase text-[#d4af37] flex items-center gap-1">
                            <span>Image Caption / 详情图描述文字 (修改此处文字):</span>
                          </label>
                          <span className="text-[9px] text-[#666666] font-mono">Displayed under graphic</span>
                        </div>
                        <input
                          type="text"
                          value={caption}
                          onChange={e => handleUpdateDetailCaption(i, e.target.value)}
                          className="w-full bg-[#141414] border border-[#333333] px-3 py-1.5 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37] leading-relaxed"
                          placeholder="Enter custom image caption..."
                        />
                      </div>
                    </div>
                  );
                })}

                {(editedProduct.detailImages || []).length === 0 && (
                  <div className="p-4 border border-dashed border-[#333333] rounded-xs text-center text-[#777777] text-xs font-mono">
                    No product detail showcase images added yet. Add URLs or upload files below.
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-1">
                <form onSubmit={handleAddDetailImage} className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste detail image URL..."
                    value={newDetailImageUrl}
                    onChange={e => setNewDetailImageUrl(e.target.value)}
                    className="flex-1 bg-[#0d0d0d] border border-[#333333] p-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#222222] hover:bg-[#333333] border border-[#444444] text-xs text-[#d4af37] font-mono uppercase rounded-xs cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Detail Image</span>
                  </button>
                </form>

                <div className="flex items-center gap-2">
                  <label className="px-3 py-1.5 bg-[#181818] hover:bg-[#222222] border border-[#333333] text-[11px] text-[#cccccc] font-mono uppercase rounded-xs cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload Detail Image File</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => handleFileUpload(e, 'detail')} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Manage Customer Reviews Section */}
            {renderReviewsManager(false)}

            {/* Save CTA */}
            <div className="pt-4 border-t border-[#222222] flex items-center justify-between gap-3">
              <div className="text-[11px] text-[#888888] font-mono">
                {isCreatingNew ? (
                  <span className="text-[#d4af37]">✨ Ready to add new product to catalog.</span>
                ) : (
                  <span>Product: <strong className="text-white">{editedProduct.name}</strong></span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {isCreatingNew && (
                  <button
                    type="button"
                    onClick={handleCancelCreateNew}
                    className="px-4 py-2.5 bg-[#222222] hover:bg-[#333333] border border-[#444444] text-[#cccccc] hover:text-white font-mono text-xs uppercase rounded-xs transition-colors cursor-pointer"
                  >
                    Cancel Draft
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleInitiateSave}
                  className="px-6 py-2.5 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-[#e2bd45] transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02]"
                >
                  <Save className="w-4 h-4" />
                  <span>{isCreatingNew ? 'Publish New Product' : 'Save Product Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dedicated Reviews Management */}
        {activeTab === 'reviews' && (
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs">
            {/* Top Product Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171510] border border-[#3d3222] p-3.5 rounded-xs">
              <div className="flex-1 w-full space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#d4af37] flex items-center gap-1.5 font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Select Product to Manage Reviews / 选择需要管理评价的产品:</span>
                </label>

                <select
                  value={selectedProductId}
                  onChange={e => handleSelectProductChange(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#3d3324] p-2.5 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.sku}] {p.name} — {(p.reviews || []).length} Reviews ({p.rating}★)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Render the reviews management interface */}
            {renderReviewsManager(true)}

            {/* Bottom Save CTA */}
            <div className="pt-4 border-t border-[#222222] flex items-center justify-between gap-3">
              <div className="text-[11px] text-[#888888] font-mono">
                Product: <strong className="text-white">{editedProduct?.name}</strong> ({(editedProduct?.reviews || []).length} reviews)
              </div>

              <button
                type="button"
                onClick={handleInitiateSave}
                className="px-6 py-2.5 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-[#e2bd45] transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <Save className="w-4 h-4" />
                <span>Save Product & Reviews Changes</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Confirmation Step Modal */}
      {showConfirmModal && editedProduct && (
        <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#14120e] border border-[#d4af37]/40 rounded-sm shadow-2xl overflow-hidden text-white flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#1e1911] border-b border-[#3d3222] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[#d4af37]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-serif-luxury text-base font-bold uppercase tracking-wider text-white">
                  {isCreatingNew ? 'Confirm Adding New Product' : 'Confirm Product Changes'}
                </h3>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-[#888888] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content / Review Card */}
            <div className="p-5 space-y-4 text-xs">
              <p className="text-[#aaaaaa] leading-relaxed">
                {isCreatingNew 
                  ? 'Please review the new product specifications before publishing to the KOBROX Catalog & Storefront:'
                  : 'Please review and confirm your changes before updating the KOBROX live catalog:'
                }
              </p>

              {/* Product Snapshot Card */}
              <div className="p-4 bg-[#0d0d0d] border border-[#2e261a] rounded-xs space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-[#0a0a0a] border border-[#333333] rounded-xs overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img 
                      src={editedProduct.media[0]?.url || 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80'} 
                      alt={editedProduct.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-[#d4af37] text-black font-bold px-1.5 py-0.5 rounded-xs">
                        {editedProduct.sku}
                      </span>
                      <span className="font-mono text-[10px] text-[#888888] uppercase">
                        {editedProduct.category}
                      </span>
                    </div>
                    <h4 className="font-serif-luxury text-sm text-white font-bold truncate">
                      {editedProduct.name}
                    </h4>
                    <p className="text-[11px] text-[#c5a059] truncate font-mono">
                      {editedProduct.tagline || 'No tagline set'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#222222] font-mono text-[11px]">
                  <div>
                    <span className="text-[#777777] block">MSRP Price:</span>
                    <span className="text-white font-bold">${editedProduct.price} USD</span>
                    {editedProduct.originalPrice && (
                      <span className="text-[#666666] line-through ml-1.5">${editedProduct.originalPrice}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[#777777] block">Stock Status:</span>
                    <span className={editedProduct.inStock ? 'text-emerald-400' : 'text-red-400'}>
                      {editedProduct.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#777777] block">Gallery Media:</span>
                    <span className="text-white">{editedProduct.media.length} Images</span>
                  </div>
                  <div>
                    <span className="text-[#777777] block">Detail Showcase:</span>
                    <span className="text-white">{(editedProduct.detailImages || []).length} Graphics</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#777777] block">Customer Reviews:</span>
                    <span className="text-white">{(editedProduct.reviews || []).length} Reviews ({editedProduct.rating}★, {editedProduct.reviewCount} total count)</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#777777] block">Amazon US Link:</span>
                    <span className={editedProduct.amazonLinks?.US ? 'text-emerald-400 truncate block' : 'text-amber-400'}>
                      {editedProduct.amazonLinks?.US ? editedProduct.amazonLinks.US : '⏱ Coming Soon (No link configured)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-[#1a1711] border-t border-[#2e261a] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-[#cccccc] hover:text-white text-xs font-mono uppercase rounded-xs transition-colors cursor-pointer"
              >
                Cancel (取消修改)
              </button>
              <button
                type="button"
                onClick={handleConfirmSave}
                className="px-5 py-2 bg-[#d4af37] hover:bg-[#e2bd45] text-black font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Confirm & Save (确认保存)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Preview Lightbox Modal */}
      {previewImageUrl && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] bg-[#111111] border border-[#333333] rounded-sm p-3 flex flex-col items-center justify-center overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImageUrl(null)}
              className="absolute top-3 right-3 p-2 bg-black/80 hover:bg-black text-white hover:text-[#d4af37] border border-[#333333] rounded-full transition-colors z-10 cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full flex items-center justify-between px-3 py-2 border-b border-[#222222] mb-3">
              <span className="text-xs font-mono text-[#d4af37] uppercase flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Product Image Preview / 图片预览</span>
              </span>
              <span className="text-[10px] font-mono text-[#888888]">
                Click outside or press X to close
              </span>
            </div>

            <div className="p-2 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={previewImageUrl}
                alt="Preview"
                className="max-w-full max-h-[70vh] object-contain rounded-xs border border-[#222222] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full pt-3 border-t border-[#222222] px-3 pb-1 flex items-center justify-between text-[11px] text-[#888888] font-mono gap-4">
              <span className="truncate max-w-md">{previewImageUrl}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(previewImageUrl);
                  alert('Image URL copied to clipboard!');
                }}
                className="text-[#d4af37] underline hover:text-white cursor-pointer shrink-0"
              >
                Copy Image URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-[120] bg-[#102213] border border-emerald-500/80 text-emerald-300 px-5 py-3 rounded-xs shadow-2xl flex items-center gap-3 font-mono text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

    </div>
  );
};
