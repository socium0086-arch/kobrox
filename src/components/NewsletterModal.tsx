import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#14120e] border border-[#3d3222] p-8 rounded-sm shadow-2xl space-y-6 text-white text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1e1a14] border border-[#443826] rounded-full text-[10px] font-mono text-[#d4af37] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRIVATE CONNOISSEUR CLUB</span>
          </div>

          <h3 className="font-serif-luxury text-3xl font-bold uppercase tracking-wider">
            Join The KOBROX Club
          </h3>

          <p className="text-xs text-[#aaaaaa] leading-relaxed">
            Receive private cigar insights, new accessory launches, and exclusive editorial content directly to your inbox.
          </p>
        </div>

        {subscribed ? (
          <div className="p-6 bg-[#1a1812] border border-[#443826] rounded-sm space-y-2 text-center animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-[#d4af37] mx-auto" />
            <h4 className="font-serif-luxury text-xl text-white">Welcome To The Atelier</h4>
            <p className="text-xs text-[#aaaaaa]">Your membership invitation has been dispatched.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#333333] px-4 py-3 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37] text-center"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-[#e2bd45] transition-colors"
            >
              Subscribe To Club
            </button>

            <span className="text-[10px] font-mono text-[#666666] block">
              Strictly private • Zero spam • Unsubscribe anytime
            </span>
          </form>
        )}

      </div>
    </div>
  );
};
