<<<<<<< HEAD
import { motion } from "@/lib/motion";
=======
import { motion } from "framer-motion";
>>>>>>> 3dfa4bd057fa38ef8def02fd5a1dd511d12e0c20
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  FileText,
  CreditCard,
  BookOpen,
  Building2,
  Users,
  Shield,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const overviewStats = [
  { label: "Overall Progress", value: "68%", change: "+12% this week", icon: TrendingUp, color: "campus-teal" },
  { label: "Tasks Completed", value: "11/16", change: "5 remaining", icon: CheckCircle2, color: "campus-emerald" },
  { label: "Upcoming Deadlines", value: "3", change: "Next: 2 days", icon: Clock, color: "campus-amber" },
  { label: "AI Interactions", value: "24", change: "This month", icon: Sparkles, color: "campus-violet" },
];

const onboardingTasks = [
  { id: 1, title: "Document Verification", description: "Upload identity & academic documents", status: "completed", icon: FileText, dueDate: "Completed" },
  { id: 2, title: "Fee Payment – Semester 1", description: "Pay tuition and hostel fees", status: "completed", icon: CreditCard, dueDate: "Completed" },
  { id: 3, title: "Course Registration", description: "Select electives and lab sections", status: "in-progress", icon: BookOpen, dueDate: "Due in 2 days" },
  { id: 4, title: "LMS Onboarding", description: "Complete Moodle setup & orientation module", status: "in-progress", icon: BookOpen, dueDate: "Due in 4 days" },
  { id: 5, title: "Hostel Allocation", description: "Confirm room preference & allocation", status: "pending", icon: Building2, dueDate: "Due in 7 days" },
  { id: 6, title: "Faculty Mentor Meeting", description: "Schedule first meeting with assigned mentor", status: "pending", icon: Users, dueDate: "Due in 10 days" },
  { id: 7, title: "Anti-Ragging Compliance", description: "Sign declaration & complete awareness module", status: "overdue", icon: Shield, dueDate: "Overdue by 1 day" },
];

const statusConfig = {
  completed: { color: "text-campus-emerald", bg: "bg-campus-emerald/10", label: "Done", iconEl: CheckCircle2 },
  "in-progress": { color: "text-campus-amber", bg: "bg-campus-amber/10", label: "In Progress", iconEl: Clock },
  pending: { color: "text-muted-foreground", bg: "bg-muted", label: "Pending", iconEl: Circle },
  overdue: { color: "text-campus-rose", bg: "bg-campus-rose/10", label: "Overdue", iconEl: AlertTriangle },
};

const upcomingEvents = [
  { title: "Orientation Day", date: "Feb 20", time: "9:00 AM" },
  { title: "Lab Safety Training", date: "Feb 22", time: "2:00 PM" },
  { title: "Department Welcome", date: "Feb 25", time: "10:00 AM" },
];

const Dashboard = () => {
  const completedCount = onboardingTasks.filter((t) => t.status === "completed").length;
  const progress = Math.round((completedCount / onboardingTasks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground"
        >
          Welcome back, Arjun 👋
        </motion.h1>
        <p className="text-muted-foreground mt-1">Here's your onboarding progress overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className={cn("text-xs mt-1", `text-${stat.color}`)}>{stat.change}</p>
              </div>
              <div className={cn("p-2 rounded-lg", `bg-${stat.color}/10`)}>
                <stat.icon className={cn("w-5 h-5", `text-${stat.color}`)} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Onboarding Checklist</h2>
            <span className="text-sm text-muted-foreground">{completedCount}/{onboardingTasks.length} completed</span>
          </div>

          {/* Progress bar */}
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm font-bold text-campus-teal">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full gradient-primary rounded-full"
              />
            </div>
          </div>

          {/* Task list */}
          <div className="space-y-2">
            {onboardingTasks.map((task, i) => {
              const config = statusConfig[task.status as keyof typeof statusConfig];
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-card transition-all cursor-pointer group",
                    task.status === "overdue" && "border-campus-rose/30"
                  )}
                >
                  <div className={cn("p-2 rounded-lg", config.bg)}>
                    <task.icon className={cn("w-4 h-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium",
                      task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                    )}>
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", config.bg, config.color)}>
                      {task.dueDate}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* AI Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="gradient-hero rounded-xl p-5 text-primary-foreground"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-campus-teal-glow" />
              <span className="text-xs font-semibold uppercase tracking-wider text-campus-teal-glow">AI Insight</span>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Your <strong>Anti-Ragging Compliance</strong> is overdue. Complete it today to avoid a hold on your course registration. I can guide you through the process.
            </p>
            <button className="mt-3 text-xs font-semibold text-campus-teal-glow flex items-center gap-1 hover:gap-2 transition-all">
              Start Now <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Upcoming Events */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-campus-teal" />
              <h3 className="text-sm font-semibold text-foreground">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-medium text-muted-foreground">{event.date.split(" ")[0]}</span>
                    <span className="text-sm font-bold text-foreground">{event.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Upload Docs", icon: FileText },
                { label: "Pay Fees", icon: CreditCard },
                { label: "View Timetable", icon: Calendar },
                { label: "Contact Mentor", icon: Users },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <action.icon className="w-4 h-4" />
                  <span className="text-[11px] font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
