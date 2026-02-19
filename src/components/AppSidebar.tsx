import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  LayoutDashboard,
  MessageSquare,
  ClipboardCheck,
  Users,
  BarChart3,
  Settings,
  GraduationCap,
  Bell,
  FileText,
  CreditCard,
  Building2,
  BookOpen,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "AI Assistant", icon: MessageSquare, badge: "AI" },
  { id: "tasks", label: "Onboarding Tasks", icon: ClipboardCheck },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "fees", label: "Fee Payment", icon: CreditCard },
  { id: "courses", label: "Courses & LMS", icon: BookOpen },
  { id: "hostel", label: "Hostel", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell, badge: "3" },
];

const adminItems = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "students", label: "Students", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

const AppSidebar = ({ activeSection, onSectionChange, collapsed, onToggleCollapse }: SidebarProps) => {
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-sidebar border-r border-sidebar-border"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg gradient-primary flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-w-0"
          >
            <span className="text-sm font-bold text-sidebar-accent-foreground truncate">CampusFlow</span>
            <span className="text-[10px] font-medium text-sidebar-foreground truncate flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-campus-teal" /> AI Agent
            </span>
          </motion.div>
        )}
        <button
          onClick={onToggleCollapse}
          className="ml-auto p-1.5 rounded-md text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent transition-colors"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        <div className="mb-2">
          {!collapsed && (
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              Onboarding
            </span>
          )}
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
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
                  <span className={cn(
                    "ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                    item.badge === "AI"
                      ? "gradient-primary text-primary-foreground"
                      : "bg-campus-rose text-primary-foreground"
                  )}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}

        <div className="pt-4 mt-4 border-t border-sidebar-border">
          {!collapsed && (
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              Admin
            </span>
          )}
          <div className="mt-2 space-y-1">
            {adminItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                  activeSection === item.id
                    ? "bg-sidebar-accent text-campus-teal"
                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              AR
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">Arjun Reddy</p>
              <p className="text-[11px] text-sidebar-foreground truncate">B.Tech CSE · 2025</p>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default AppSidebar;
