import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  GraduationCap,
  Bell,
  ChevronLeft,
  Sparkles,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminAnalytics from "@/components/AdminAnalytics";
import NotificationsPanel from "@/components/NotificationsPanel";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const adminNav = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "students", label: "Students", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell, badge: "3" },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("analytics");
  const [collapsed, setCollapsed] = useState(false);
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
      case "analytics":
      default:
        return <AdminAnalytics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-sidebar border-r border-sidebar-border"
      >
        <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg gradient-primary flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-sidebar-accent-foreground truncate">CampusFlow</span>
              <span className="text-[10px] font-medium text-sidebar-foreground truncate flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-campus-teal" /> Admin Panel
              </span>
            </motion.div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto p-1.5 rounded-md text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent transition-colors">
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {adminNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                activeSection === item.id
                  ? "bg-sidebar-accent text-campus-teal"
                  : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-campus-rose text-primary-foreground flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {!collapsed && (
          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-2 rounded-lg">
              <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                PM
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-sidebar-accent-foreground truncate">{user?.name}</p>
                <p className="text-[11px] text-sidebar-foreground truncate">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <main className={cn("transition-all duration-200 ease-in-out min-h-screen", collapsed ? "ml-[72px]" : "ml-[260px]")}>
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-6">
          <div className="text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-muted">
            Admin Control Panel
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </header>

        <div className="p-6 max-w-7xl">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
