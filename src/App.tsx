import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import CommunityGoals from "./pages/CommunityGoals";
import Transactions from "./pages/Transactions";
import Rewards from "./pages/Rewards";
import AIAdvisor from "./pages/AIAdvisor";
import Learning from "./pages/Learning";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/goals" element={<CommunityGoals />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/advisor" element={<AIAdvisor />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
