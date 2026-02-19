import { motion } from "@/lib/motion";
import {
  BarChart3,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Total Students", value: "1,247", change: "+86", trend: "up", icon: Users },
  { label: "Onboarding Complete", value: "72%", change: "+5.2%", trend: "up", icon: CheckCircle2 },
  { label: "At Risk Students", value: "43", change: "-8", trend: "down", icon: AlertTriangle },
  { label: "Avg. Completion Time", value: "4.2 days", change: "-0.8d", trend: "down", icon: Clock },
];

const departmentData = [
  { name: "Computer Science", total: 320, completed: 248, rate: 78 },
  { name: "Electronics", total: 280, completed: 198, rate: 71 },
  { name: "Mechanical", total: 240, completed: 160, rate: 67 },
  { name: "Civil Engineering", total: 200, completed: 130, rate: 65 },
  { name: "Information Tech.", total: 207, completed: 152, rate: 73 },
];

const recentAlerts = [
  { student: "Priya Sharma", issue: "Document verification pending for 5 days", severity: "high" },
  { student: "Rahul Gupta", issue: "Fee payment deadline missed", severity: "critical" },
  { student: "Sneha Patel", issue: "LMS enrollment incomplete", severity: "medium" },
  { student: "Arun Kumar", issue: "Hostel preference not submitted", severity: "low" },
];

const severityConfig = {
  critical: { color: "text-campus-rose", bg: "bg-campus-rose/10", dot: "bg-campus-rose" },
  high: { color: "text-campus-amber", bg: "bg-campus-amber/10", dot: "bg-campus-amber" },
  medium: { color: "text-campus-teal", bg: "bg-campus-teal/10", dot: "bg-campus-teal" },
  low: { color: "text-muted-foreground", bg: "bg-muted", dot: "bg-muted-foreground" },
};

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Analytics</h1>
        <p className="text-muted-foreground mt-1">Real-time onboarding insights across all departments</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-5 shadow-card border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon className="w-5 h-5 text-campus-teal" />
              <div className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                kpi.trend === "up" ? "text-campus-emerald" : "text-campus-rose"
              )}>
                {kpi.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
          </motion.div>
        )})}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-5 shadow-card border border-border"
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-campus-teal" />
            <h3 className="text-sm font-semibold text-foreground">Department Progress</h3>
          </div>
          <div className="space-y-4">
            {departmentData.map((dept) => (
              <div key={dept.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-foreground font-medium">{dept.name}</span>
                  <span className="text-muted-foreground text-xs">{dept.completed}/{dept.total} · {dept.rate}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dept.rate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-5 shadow-card border border-border"
        >
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-4 h-4 text-campus-amber" />
            <h3 className="text-sm font-semibold text-foreground">Drop-off Alerts</h3>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert, i) => {
              const config = severityConfig[alert.severity as keyof typeof severityConfig];
              return (
                <div key={i} className={cn("flex items-start gap-3 p-3 rounded-lg", config.bg)}>
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", config.dot)} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{alert.student}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.issue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-xl p-5 shadow-card border border-border"
      >
        <h3 className="text-sm font-semibold text-foreground mb-5">Onboarding Funnel</h3>
        <div className="flex items-end justify-between gap-3">
          {[
            { stage: "Admitted", count: 1247, pct: 100 },
            { stage: "Docs Verified", count: 1120, pct: 90 },
            { stage: "Fees Paid", count: 980, pct: 79 },
            { stage: "Course Reg.", count: 890, pct: 71 },
            { stage: "LMS Active", count: 820, pct: 66 },
            { stage: "Hostel Alloc.", count: 750, pct: 60 },
            { stage: "Fully Onboarded", count: 698, pct: 56 },
          ].map((step, i) => (
            <div key={step.stage} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-foreground">{step.count}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${step.pct * 1.8}px` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-full rounded-t-md gradient-primary min-h-[8px]"
                style={{ opacity: 0.5 + (step.pct / 200) }}
              />
              <span className="text-[10px] text-muted-foreground text-center leading-tight">{step.stage}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
