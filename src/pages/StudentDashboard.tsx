import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import Dashboard from "@/components/Dashboard";
import AIChatPanel from "@/components/AIChatPanel";
import NotificationsPanel from "@/components/NotificationsPanel";
import { MessageSquare, Sparkles, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "notifications":
        return <NotificationsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={(section) => {
          if (section === "chat") {
            setChatOpen(true);
          } else {
            setActiveSection(section);
          }
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className={cn("transition-all duration-200 ease-in-out min-h-screen", sidebarCollapsed ? "ml-[72px]" : "ml-[260px]")}>
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-muted">
              {user?.department} · Batch {user?.batch}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setChatOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity glow-teal">
              <Sparkles className="w-4 h-4" /> Ask AI
            </button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </header>

        <div className="p-6 max-w-7xl">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {renderContent()}
          </motion.div>
        </div>
      </main>

      {!chatOpen && (
        <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setChatOpen(true)} className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary text-primary-foreground shadow-elevated flex items-center justify-center z-40 glow-teal">
          <MessageSquare className="w-5 h-5" />
        </motion.button>
      )}

      <AIChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default StudentDashboard;
