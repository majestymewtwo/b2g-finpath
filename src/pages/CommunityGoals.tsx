import { useState } from "react";
import { motion } from "framer-motion";
import { Target, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const tabs = ["Weekly", "Monthly", "Yearly"];

const CommunityGoals = () => {
  const [activeTab, setActiveTab] = useState("Monthly");
  const [target, setTarget] = useState("5000");
  const navigate = useNavigate();

  const current = 3200;
  const targetNum = parseInt(target) || 0;
  const progress = targetNum > 0 ? Math.min((current / targetNum) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-14 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Community Goals</h1>
            <p className="text-xs text-muted-foreground">Debt-Free Warriors</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-xl p-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Progress Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative w-52 h-52">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="80" fill="none" className="stroke-muted" strokeWidth="8" />
              <motion.circle
                cx="90" cy="90" r="80" fill="none"
                className="stroke-primary"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Target className="w-5 h-5 text-primary mb-1" />
              <span className="text-2xl font-bold text-foreground">${current.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">of ${targetNum.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-sm font-medium text-primary mt-3">{Math.round(progress)}% completed</p>
        </motion.div>

        {/* Form */}
        <div className="elevated-card p-5">
          <h3 className="font-semibold text-foreground mb-3">Set {activeTab} Target</h3>
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full h-12 pl-8 pr-4 bg-muted/50 border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
            />
          </div>
          <button className="w-full h-12 gradient-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Update Goal
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default CommunityGoals;
