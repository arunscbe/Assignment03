import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { textToText } from '../services/textService';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';

const TextToText = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm Nova, your AI assistant. How can I help you today?", id: 1 }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await textToText(input);
      const aiMessage = { 
        role: 'assistant', 
        content: response.response || "I'm sorry, I couldn't process that.", 
        id: Date.now() + 1 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      // toast is handled by axios interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "Chat cleared. How can I help you today?", id: Date.now() }]);
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-0">
      {/* Header - Stays top */}
      <header className="flex items-center justify-between pb-4 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold">Text To Text</h2>
          <p className="text-sm text-slate-500">Engage with our most advanced language model.</p>
        </div>
        <Button variant="outline" size="sm" onClick={clearChat} className="text-red-500 hover:text-red-600">
          <Trash2 className="w-4 h-4" /> Clear Chat
        </Button>
      </header>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0 scroll-smooth pr-2 scrollbar-hide pb-32" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6 py-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300' 
                  : 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tr-none'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-none shadow-sm'
              }`}>
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed at bottom of the main content area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/80 dark:via-slate-950/80 to-transparent pt-12 pb-6 px-4">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto">
          <div className="relative flex items-center gap-2 glass-card p-1 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Type your message here..."
              className="w-full bg-transparent border-none rounded-xl py-3 px-4 pr-12 focus:ring-0 resize-none max-h-32 min-h-[52px] scrollbar-hide text-sm md:text-base"
              rows={1}
            />
            <Button 
              type="submit" 
              className="absolute right-2 p-2 h-10 w-10 btn-primary" 
              isLoading={isLoading}
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            AI can make mistakes. Consider checking important information.
          </p>
        </form>
      </div>
    </div>
  );
};

export default TextToText;
