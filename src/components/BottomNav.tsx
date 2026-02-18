import { useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Wallet, Gift, BookOpen, MessageSquare } from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Home" },
  { path: "/community", icon: Users, label: "Community" },
  { path: "/transactions", icon: Wallet, label: "Pot" },
  { path: "/rewards", icon: Gift, label: "Rewards" },
  { path: "/advisor", icon: MessageSquare, label: "AI" },
  { path: "/learning", icon: BookOpen, label: "Learn" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 inset-x-0 bg-card/80 backdrop-blur-xl border-t border-border z-40">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
