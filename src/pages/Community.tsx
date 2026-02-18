import { motion } from "framer-motion";
import { Plus, Search, Users, ChevronRight, TrendingUp } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const communities = [
  { id: 1, name: "Debt-Free Warriors", members: 1240, category: "Debt Payoff", trending: true },
  { id: 2, name: "Index Fund Investors", members: 890, category: "Investing", trending: false },
  { id: 3, name: "Budget Beginners", members: 2100, category: "Budgeting", trending: true },
  { id: 4, name: "Crypto Curious", members: 560, category: "Crypto", trending: false },
  { id: 5, name: "Side Hustle Club", members: 1750, category: "Earning", trending: true },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-14 pb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Communities</h1>
        <p className="text-sm text-muted-foreground mb-6">Find your financial tribe</p>

        {/* Create Button */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full gradient-primary text-primary-foreground rounded-2xl p-4 flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Create a Community</p>
            <p className="text-xs opacity-80">Start your own financial group</p>
          </div>
          <ChevronRight className="w-5 h-5 ml-auto opacity-70" />
        </motion.button>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search communities..."
            className="w-full h-12 pl-11 pr-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {communities.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="elevated-card p-4 flex items-center gap-4"
            >
              <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-foreground truncate">{c.name}</h3>
                  {c.trending && <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {c.members.toLocaleString()} members · {c.category}
                </p>
              </div>
              <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors">
                Join
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Community;
