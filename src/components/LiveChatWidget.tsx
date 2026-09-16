import React, { useState, useEffect, useRef } from 'react';
import { SupportTicket, ChatMessage } from '../types';
import { MessageSquare, X, Send, ShoppingBag, CheckCircle2, Headphones, AlertCircle } from 'lucide-react';

interface LiveChatWidgetProps {
  tickets: SupportTicket[];
  onSaveTickets: (updatedTickets: SupportTicket[]) => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ tickets, onSaveTickets }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [amazonOrderId, setAmazonOrderId] = useState('');
  const [initialMessage, setInitialMessage] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load existing ticket session if user registered before
  useEffect(() => {
    const savedEmail = localStorage.getItem('kobrox_customer_email');
    const savedOrder = localStorage.getItem('kobrox_customer_order');
    if (savedEmail && savedOrder) {
      setEmail(savedEmail);
      setAmazonOrderId(savedOrder);
      const existing = tickets.find(
        t => t.email.toLowerCase() === savedEmail.toLowerCase() && t.amazonOrderId === savedOrder
      );
      if (existing) {
        setActiveTicketId(existing.id);
      }
    }

    const handleOpenChatEvent = () => {
      setIsOpen(true);
    };
    window.addEventListener('kobrox-open-live-chat', handleOpenChatEvent);
    return () => window.removeEventListener('kobrox-open-live-chat', handleOpenChatEvent);
  }, [tickets]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, tickets, activeTicketId]);

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !amazonOrderId.trim() || !initialMessage.trim()) return;

    // Check if ticket already exists
    const existing = tickets.find(
      t => t.email.toLowerCase() === email.trim().toLowerCase() && t.amazonOrderId === amazonOrderId.trim()
    );

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: initialMessage.trim(),
      timestamp: now
    };

    if (existing) {
      const updated: SupportTicket = {
        ...existing,
        status: 'open',
        unreadBySeller: true,
        messages: [...existing.messages, userMsg]
      };
      const newTicketsList = tickets.map(t => (t.id === existing.id ? updated : t));
      onSaveTickets(newTicketsList);
      setActiveTicketId(existing.id);
    } else {
      const newTicket: SupportTicket = {
        id: 'tkt-' + Date.now(),
        email: email.trim(),
        amazonOrderId: amazonOrderId.trim(),
        createdAt: new Date().toLocaleDateString() + ' ' + now,
        status: 'open',
        unreadBySeller: true,
        messages: [
          userMsg,
          {
            id: 'msg-system-welcome',
            sender: 'seller',
            text: `Hello! Thank you for contacting KOBROX Live Support. We have received your Amazon Order ID #${amazonOrderId.trim()}. Our support team is reviewing your details and will reply shortly.`,
            timestamp: now
          }
        ]
      };
      onSaveTickets([newTicket, ...tickets]);
      setActiveTicketId(newTicket.id);
    }

    localStorage.setItem('kobrox_customer_email', email.trim());
    localStorage.setItem('kobrox_customer_order', amazonOrderId.trim());
    setInitialMessage('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: replyText.trim(),
      timestamp: now
    };

    const updatedTicket: SupportTicket = {
      ...activeTicket,
      status: 'open',
      unreadBySeller: true,
      messages: [...activeTicket.messages, newMsg]
    };

    const updatedList = tickets.map(t => (t.id === activeTicket.id ? updatedTicket : t));
    onSaveTickets(updatedList);
    setReplyText('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 bg-[#181512] hover:bg-[#241f19] border border-[#d4af37] text-white px-5 py-3.5 rounded-full shadow-2xl transition-all cursor-pointer hover:scale-105"
        >
          <div className="relative">
            <Headphones className="w-5 h-5 text-[#d4af37]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          <div className="text-left font-sans">
            <span className="text-xs font-bold block text-white uppercase tracking-wider">Live Support</span>
            <span className="text-[10px] text-[#aaaaaa] font-mono">Order Verification & Chat</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] bg-[#121212] border border-[#3d3222] rounded-lg shadow-2xl flex flex-col overflow-hidden text-white animate-fadeIn">
          {/* Header */}
          <div className="bg-[#1a1712] border-b border-[#33281b] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#262016] border border-[#443826] rounded-full text-[#d4af37]">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-serif-luxury uppercase tracking-wider text-white">
                  KOBROX Seller Support
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Online • Official Amazon Service</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#888888] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {!activeTicket ? (
            /* Registration Form */
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
              <div className="bg-[#181511] border border-[#3d3222] p-3 rounded-xs text-[#cccccc] space-y-1">
                <div className="flex items-center gap-1.5 text-[#d4af37] font-bold">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Amazon Order Verification</span>
                </div>
                <p className="text-[11px] text-[#aaaaaa]">
                  Enter your email and Amazon Order ID to start real-time messaging directly with our seller team.
                </p>
              </div>

              <form onSubmit={handleStartChat} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#888888] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. customer@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#333333] px-3 py-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#888888] uppercase mb-1">
                    Amazon Order ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 112-9876543-1234567"
                    value={amazonOrderId}
                    onChange={e => setAmazonOrderId(e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#333333] px-3 py-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#888888] uppercase mb-1">
                    How Can We Help You? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Type your message or question about your order..."
                    value={initialMessage}
                    onChange={e => setInitialMessage(e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#333333] p-3 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xs hover:bg-[#e2bd45] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start Live Chat</span>
                </button>
              </form>
            </div>
          ) : (
            /* Active Chat Thread */
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Top Order Badge */}
              <div className="bg-[#181818] border-b border-[#262626] px-4 py-2 flex items-center justify-between text-[11px] font-mono text-[#aaaaaa]">
                <div>
                  <span>Order: </span>
                  <span className="text-[#d4af37] font-bold">#{activeTicket.amazonOrderId}</span>
                </div>
                <button
                  onClick={() => setActiveTicketId(null)}
                  className="text-[10px] text-[#888888] hover:text-white underline cursor-pointer"
                >
                  Switch Order
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {activeTicket.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-[#777777]">
                      <span>{msg.sender === 'user' ? 'You' : 'KOBROX Seller Support'}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-3 rounded-md text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#d4af37] text-black font-medium rounded-tr-none'
                          : 'bg-[#1e1c18] border border-[#3d3222] text-[#e0e0e0] rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="p-3 bg-[#181818] border-t border-[#2a2a2a] flex gap-2">
                <input
                  type="text"
                  placeholder="Type message to seller..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="flex-1 bg-[#0d0d0d] border border-[#333333] px-3 py-2 text-xs text-white rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#d4af37] hover:bg-[#e2bd45] text-black font-bold rounded-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
