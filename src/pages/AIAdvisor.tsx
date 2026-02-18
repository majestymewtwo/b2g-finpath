import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const quickPrompts = ["Investment Tips", "Market Trends", "Budget Plan", "Debt Strategy"];

const initialMessages: Message[] = [
  { id: 1, role: "ai", text: "Hi! I'm your AI Financial Advisor. How can I help you today? 🎯" },
];

const AIAdvisor = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    const aiMsg: Message = {
      id: Date.now() + 1,
      role: "ai",
      text: `Great question about "${text}"! Based on current market conditions, I'd recommend diversifying your portfolio with a mix of index funds and bonds. Would you like me to break this down further?`,
    };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">AI Advisor</h1>
            <p className="text-xs text-primary font-medium">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "ai" && (
              <div className="w-7 h-7 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "gradient-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
        {quickPrompts.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            className="flex-shrink-0 px-3 py-1.5 bg-accent text-accent-foreground text-xs font-medium rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-6 pb-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask me anything..."
            className="flex-1 h-12 px-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
          />
          <button
            onClick={() => send(input)}
            className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AIAdvisor;
