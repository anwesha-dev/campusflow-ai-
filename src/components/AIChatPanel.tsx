import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { X, Send, Sparkles, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatPanelProps {
  open: boolean;
  onClose: () => void;
}

const quickPrompts = [
  "What documents do I need to upload?",
  "How do I pay my semester fees?",
  "When is the hostel allocation deadline?",
  "Help me with course registration",
];

const simulatedResponses: Record<string, string> = {
  default:
    "I'm your CampusFlow AI assistant! I can help with document verification, fee payments, course registration, hostel allocation, and more. What would you like to know?",
  documents:
    "📄 **Documents Required for Verification:**\n\n1. **10th Marksheet** – Scanned copy (PDF)\n2. **12th Marksheet** – Scanned copy (PDF)\n3. **Entrance Exam Scorecard** – JEE/State CET\n4. **Aadhar Card** – Front & back\n5. **Transfer Certificate** – Original scan\n6. **Passport-size Photos** (4 copies)\n\n✅ You've uploaded 4/6 documents. **Transfer Certificate** and **Photos** are still pending.\n\nWould you like me to guide you through the upload process?",
  fees:
    "💳 **Fee Payment Status:**\n\n| Component | Amount | Status |\n|-----------|--------|--------|\n| Tuition Fee | ₹1,25,000 | ✅ Paid |\n| Hostel Fee | ₹45,000 | ⏳ Pending |\n| Exam Fee | ₹5,000 | ⏳ Pending |\n\n**Total Pending:** ₹50,000\n**Deadline:** February 25, 2025\n\nYou can pay via UPI, Net Banking, or Credit Card through the payment portal. Shall I take you there?",
  hostel:
    "🏠 **Hostel Allocation Update:**\n\nYour hostel preference has been recorded:\n- **1st Preference:** Block A (AC, Double Sharing)\n- **2nd Preference:** Block C (Non-AC, Triple)\n\n📅 **Allocation Date:** February 28, 2025\n\nBased on your admission rank (#142), you have a **high probability** of getting your 1st preference. I'll notify you as soon as the allocation is finalized!",
  course:
    "📚 **Course Registration Guide:**\n\n**Mandatory Courses (auto-enrolled):**\n- Engineering Mathematics I\n- Engineering Physics\n- Programming in C\n- Engineering Drawing\n\n**Electives (choose 1):**\n- 🔬 Environmental Science\n- 🌐 Introduction to Web Technologies\n- 🤖 Basics of AI & ML\n\n**Lab Sections:** Choose your preferred slot in the registration portal.\n\n⏰ **Deadline:** February 22, 2025 (2 days left!)\n\nShall I help you pick an elective based on your interests?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("document") || lower.includes("upload")) return simulatedResponses.documents;
  if (lower.includes("fee") || lower.includes("pay")) return simulatedResponses.fees;
  if (lower.includes("hostel") || lower.includes("room")) return simulatedResponses.hostel;
  if (lower.includes("course") || lower.includes("registration") || lower.includes("elective")) return simulatedResponses.course;
  return simulatedResponses.default;
}

const AIChatPanel = ({ open, onClose }: AIChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Hi Arjun! I'm your CampusFlow AI assistant. I can help you navigate your entire onboarding process — from documents to courses. How can I help?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-elevated"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">CampusFlow AI</h3>
                  <p className="text-[11px] text-campus-emerald flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-campus-emerald animate-pulse-soft" /> Online
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    msg.role === "assistant" ? "gradient-primary" : "bg-muted"
                  )}>
                    {msg.role === "assistant" ? (
                      <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "gradient-primary text-primary-foreground"
                  )}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <p className={cn(
                      "text-[10px] mt-2",
                      msg.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/60"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 text-campus-teal animate-spin" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-campus-teal/30 hover:bg-campus-teal/5 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex-shrink-0">
              <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask me anything about onboarding..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="p-2 rounded-lg gradient-primary text-primary-foreground disabled:opacity-40 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIChatPanel;
