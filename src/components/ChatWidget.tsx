'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Hello! Welcome to DentalCare Pro. I am your virtual assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart bot response based on keywords
    setTimeout(() => {
      let botResponse = 'Thank you for reaching out! A member of our clinical team will review your query shortly. If this is an emergency, please call us directly at (555) 019-9000.';
      const cleanText = text.toLowerCase();

      if (cleanText.includes('hours') || cleanText.includes('open') || cleanText.includes('time')) {
        botResponse = 'Our clinic is open Monday through Friday from 8:00 AM to 7:00 PM, and Saturdays from 9:00 AM to 3:00 PM. We are closed on Sundays.';
      } else if (cleanText.includes('price') || cleanText.includes('cost') || cleanText.includes('pricing') || cleanText.includes('how much')) {
        botResponse = 'Basic consultations start at $50. Teeth whitening ranges from $200-$400, and implants start at $1,500. Detailed estimates will be provided after your initial dental checkup.';
      } else if (cleanText.includes('insurance') || cleanText.includes('pay')) {
        botResponse = 'Yes, we accept major dental insurance networks including Delta Dental, Aetna, Cigna, MetLife, and Guardian. We also offer interest-free payment plans!';
      } else if (cleanText.includes('doctor') || cleanText.includes('dentist') || cleanText.includes('emily') || cleanText.includes('michael')) {
        botResponse = 'Our specialists include Dr. Emily Vance (Cosmetic Dentistry & Implants), Dr. Michael Chen (Orthodontics & Braces), and Dr. Sarah Patel (Pediatric Dentistry).';
      } else if (cleanText.includes('appointment') || cleanText.includes('book')) {
        botResponse = 'You can book an appointment instantly using our Book Appointment page! Just click the button in the menu or go to the /book route on this site.';
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePredefinedClick = (q: string) => {
    handleSendMessage(q);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[90vw] sm:w-[360px] h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">DentalCare Pro Support</h4>
                  <div className="flex items-center gap-1.5 text-xs text-sky-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online Support Team
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="p-3 bg-white border-t border-slate-50 flex gap-2 flex-wrap">
                {[
                  'Clinic Hours',
                  'Accepted Insurances',
                  'Appointment Cost'
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handlePredefinedClick(q)}
                    className="text-xs bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-primary px-3 py-1.5 rounded-full border border-slate-100 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2"
            >
              <input
                type="text"
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-100 rounded-full px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-primary text-white rounded-full hover:bg-primary-hover active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-primary to-accent text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      >
        <MessageSquare className="h-6 w-6 group-hover:rotate-6 transition-transform" />
      </button>
    </div>
  );
};
