import { motion } from "framer-motion";
import { Play, BookOpen, Clock, ChevronRight, Star } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const videos = [
  { id: 1, title: "Investing 101", duration: "12 min", instructor: "Sarah Chen" },
  { id: 2, title: "Budget Like a Pro", duration: "8 min", instructor: "Mike Ross" },
  { id: 3, title: "Crypto Basics", duration: "15 min", instructor: "Alex Kim" },
  { id: 4, title: "Tax Strategies", duration: "10 min", instructor: "Lisa Park" },
];

const courses = [
  { id: 1, title: "Financial Freedom Masterclass", instructor: "James Clear", lessons: 24, progress: 65 },
  { id: 2, title: "Stock Market for Beginners", instructor: "Sarah Chen", lessons: 18, progress: 30 },
  { id: 3, title: "Personal Budgeting Blueprint", instructor: "Mike Ross", lessons: 12, progress: 0 },
];

const Learning = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-14 pb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Learning Center</h1>
        <p className="text-sm text-muted-foreground mb-6">Level up your financial knowledge</p>

        {/* Videos */}
        <h2 className="text-lg font-semibold text-foreground mb-3">Featured Videos</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 mb-6">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-44 elevated-card overflow-hidden"
            >
              <div className="h-24 gradient-hero flex items-center justify-center relative">
                <div className="w-10 h-10 bg-card/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] bg-card/30 backdrop-blur text-primary-foreground px-1.5 py-0.5 rounded-md font-medium">
                  {v.duration}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-foreground truncate">{v.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{v.instructor}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Courses */}
        <h2 className="text-lg font-semibold text-foreground mb-3">Active Courses</h2>
        <div className="space-y-3">
          {courses.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="elevated-card p-4 flex items-center gap-4"
            >
              <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground truncate">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{c.instructor} · {c.lessons} lessons</p>
                {c.progress > 0 && (
                  <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                )}
              </div>
              <button className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                c.progress > 0
                  ? "bg-primary/10 text-primary"
                  : "gradient-primary text-primary-foreground"
              }`}>
                {c.progress > 0 ? `${c.progress}%` : "Start"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Learning;
