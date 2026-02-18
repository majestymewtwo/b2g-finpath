import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, RotateCcw, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const transactions = [
  { id: 1, user: "Sarah M.", type: "contribute", amount: 150, time: "2h ago" },
  { id: 2, user: "James K.", type: "request", amount: 200, time: "5h ago" },
  { id: 3, user: "Emily R.", type: "payback", amount: 100, time: "1d ago" },
  { id: 4, user: "You", type: "contribute", amount: 300, time: "2d ago" },
  { id: 5, user: "Mike T.", type: "request", amount: 75, time: "3d ago" },
];

const typeStyles: Record<string, { icon: typeof ArrowUpRight; color: string; label: string }> = {
  contribute: { icon: ArrowUpRight, color: "text-success bg-success/10", label: "Contributed" },
  request: { icon: ArrowDownLeft, color: "text-warning bg-warning/10", label: "Requested" },
  payback: { icon: RotateCcw, color: "text-info bg-info/10", label: "Paid back" },
};

const Transactions = () => {
  const [showKeypad, setShowKeypad] = useState(false);
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("");

  const handleDigit = (d: string) => {
    if (d === "." && amount.includes(".")) return;
    if (d === "⌫") return setAmount((a) => a.slice(0, -1));
    setAmount((a) => a + d);
  };

  const openAction = (a: string) => {
    setAction(a);
    setAmount("");
    setShowKeypad(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-14 pb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Community Pot</h1>
        <p className="text-sm text-muted-foreground mb-6">Debt-Free Warriors</p>

        {/* Balance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="elevated-card p-5 text-center mb-6"
        >
          <p className="text-sm text-muted-foreground mb-1">Pot Balance</p>
          <p className="text-3xl font-bold text-foreground">$2,450</p>
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { key: "request", label: "Request", icon: ArrowDownLeft, cls: "bg-warning/10 text-warning" },
            { key: "contribute", label: "Contribute", icon: ArrowUpRight, cls: "bg-success/10 text-success" },
            { key: "payback", label: "Payback", icon: RotateCcw, cls: "bg-info/10 text-info" },
          ].map((a) => (
            <motion.button
              key={a.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => openAction(a.key)}
              className="elevated-card p-4 flex flex-col items-center gap-2"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.cls}`}>
                <a.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-foreground">{a.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Ledger */}
        <h2 className="text-lg font-semibold text-foreground mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {transactions.map((tx, i) => {
            const style = typeStyles[tx.type];
            const Icon = style.icon;
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 py-3 border-b border-border last:border-0"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{tx.user}</p>
                  <p className="text-xs text-muted-foreground">{style.label} · {tx.time}</p>
                </div>
                <span className={`text-sm font-semibold ${tx.type === "request" ? "text-warning" : "text-foreground"}`}>
                  {tx.type === "request" ? "-" : "+"}${tx.amount}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Keypad Overlay */}
      <AnimatePresence>
        {showKeypad && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-card border-t border-border rounded-t-3xl p-6 z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground capitalize">{action}</h3>
              <button onClick={() => setShowKeypad(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-4xl font-bold text-center text-foreground mb-6">
              ${amount || "0"}
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["1","2","3","4","5","6","7","8","9",".","0","⌫"].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDigit(d)}
                  className="h-14 bg-muted rounded-xl text-lg font-semibold text-foreground hover:bg-muted/70 transition-colors"
                >
                  {d}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowKeypad(false)}
              className="w-full h-12 gradient-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity capitalize"
            >
              Confirm {action}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default Transactions;
