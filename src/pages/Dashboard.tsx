import { motion } from "framer-motion";
import { Plus, TrendingUp, PiggyBank, CreditCard, Bell, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const goals = [
  { id: 1, title: "Emergency Fund", target: 10000, current: 6500, icon: PiggyBank, category: "Savings" },
  { id: 2, title: "S&P 500 Index", target: 5000, current: 2200, icon: TrendingUp, category: "Investing" },
  { id: 3, title: "Student Loan", target: 15000, current: 9800, icon: CreditCard, category: "Debt-payoff" },
];

const categoryColors: Record<string, string> = {
  Savings: "bg-primary/10 text-primary",
  Investing: "bg-info/10 text-info",
  "Debt-payoff": "bg-warning/10 text-warning",
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-6 pt-14 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Good morning</p>
            <h1 className="text-2xl font-bold text-foreground">Muthu 👋</h1>
          </div>
          <button className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
          </button>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-primary rounded-2xl p-5 text-primary-foreground"
        >
          <p className="text-sm opacity-80 mb-1">Total Savings</p>
          <p className="text-3xl font-bold mb-3">$18,500</p>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">+12.5%</span>
            <span className="opacity-70">this month</span>
          </div>
        </motion.div>
      </div>

      {/* Goals */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Goals</h2>
          <button className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          {goals.map((goal, i) => {
            const progress = (goal.current / goal.target) * 100;
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="elevated-card p-4 flex items-center gap-4"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${categoryColors[goal.category]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-foreground">{goal.title}</h3>
                    <span className="text-xs font-medium text-muted-foreground">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      className="h-full gradient-primary rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[goal.category]}`}>
                      {goal.category}
                    </span>
                    <span className="text-xs font-semibold text-primary">{Math.round(progress)}%</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
