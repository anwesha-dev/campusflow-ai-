<<<<<<< HEAD
import { motion } from "@/lib/motion";
=======
import { motion } from "framer-motion";
>>>>>>> 3dfa4bd057fa38ef8def02fd5a1dd511d12e0c20
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    type: "urgent",
    title: "Anti-Ragging Compliance Overdue",
    description: "Complete the declaration form to avoid registration hold.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 2,
    type: "deadline",
    title: "Course Registration Closes in 2 Days",
    description: "Select your elective and lab section before Feb 22.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "Fee Payment Confirmed",
    description: "Tuition fee of ₹1,25,000 has been successfully processed.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    type: "info",
    title: "Orientation Day Schedule Published",
    description: "Check your dashboard for the detailed orientation schedule.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "deadline",
    title: "Hostel Preference Deadline",
    description: "Submit your hostel room preference by Feb 27.",
    time: "2 days ago",
    read: true,
  },
];

const typeConfig = {
  urgent: { icon: AlertTriangle, color: "text-campus-rose", bg: "bg-campus-rose/10" },
  deadline: { icon: Clock, color: "text-campus-amber", bg: "bg-campus-amber/10" },
  success: { icon: CheckCircle2, color: "text-campus-emerald", bg: "bg-campus-emerald/10" },
  info: { icon: Info, color: "text-campus-teal", bg: "bg-campus-teal/10" },
};

const NotificationsPanel = () => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">{unreadCount} unread notifications</p>
        </div>
        <button className="text-xs font-medium text-campus-teal hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-2">
        {notifications.map((notif, i) => {
          const config = typeConfig[notif.type as keyof typeof typeConfig];
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-card transition-all cursor-pointer group",
                !notif.read && "border-l-2 border-l-campus-teal"
              )}
            >
              <div className={cn("p-2 rounded-lg flex-shrink-0 mt-0.5", config.bg)}>
                <config.icon className={cn("w-4 h-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm font-medium", !notif.read ? "text-foreground" : "text-muted-foreground")}>
                    {notif.title}
                  </p>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-campus-teal flex-shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{notif.description}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-2">{notif.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPanel;
