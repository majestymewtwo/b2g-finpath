import { motion } from "framer-motion";
import {
  Gift,
  Star,
  ShoppingBag,
  Coffee,
  Smartphone,
  CreditCard,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const rewards = [
  {
    id: 1,
    brand: "Amazon",
    points: 500,
    icon: ShoppingBag,
    desc: "$5 Gift Card",
    image: "/amazon.png",
  },
  {
    id: 2,
    brand: "Starbucks",
    points: 300,
    icon: Coffee,
    desc: "$3 Reward",
    image: "/starbucks.png",
  },
  {
    id: 3,
    brand: "Apple",
    points: 1000,
    icon: Smartphone,
    desc: "$10 Credit",
    image: "/apple.png",
  },
  {
    id: 4,
    brand: "Visa",
    points: 750,
    icon: CreditCard,
    desc: "$7.50 Prepaid",
    image: "/visa.png",
  },
  {
    id: 5,
    brand: "Netflix",
    points: 400,
    icon: Star,
    desc: "1 Month Free",
    image: "/netflix.png",
  },
  {
    id: 6,
    brand: "Target",
    points: 600,
    icon: Gift,
    desc: "$6 Gift Card",
    image: "/target.png",
  },
];

const Rewards = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-14 pb-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Rewards</h1>

        {/* Points */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-primary rounded-2xl p-6 text-center text-primary-foreground mb-8"
        >
          <Star className="w-8 h-8 mx-auto mb-2 opacity-80" />
          <p className="text-4xl font-bold">2,350</p>
          <p className="text-sm opacity-80 mt-1">Available Points</p>
        </motion.div>

        {/* Grid */}
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Redeem Rewards
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="elevated-card flex flex-col items-center text-center"
              >
                <div className="h-20 overflow-clip rounded-t-lg">
                  <img src={r.image} alt={r.brand} className="w-full" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">
                  {r.brand}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{r.desc}</p>
                <button className="w-full py-2 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors">
                  {r.points} pts
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Rewards;
