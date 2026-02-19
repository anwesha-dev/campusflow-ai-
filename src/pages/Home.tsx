import { motion } from "@/lib/motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  Shield,
  Zap,
  BarChart3,
  MessageSquare,
  ClipboardCheck,
  ArrowRight,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: MessageSquare, title: "AI Chat Assistant", desc: "Get instant answers to onboarding queries with context-aware AI." },
  { icon: ClipboardCheck, title: "Smart Checklists", desc: "Auto-prioritized tasks with deadline tracking and nudges." },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Track onboarding progress across departments in real time." },
  { icon: Shield, title: "Secure & Compliant", desc: "Role-based access with encrypted document storage." },
  { icon: Zap, title: "Workflow Automation", desc: "Automate document verification, fee sync, and LMS enrollment." },
  { icon: Users, title: "Admin Controls", desc: "Bulk communications, drop-off detection, and escalation tools." },
];

const stats = [
  { value: "50+", label: "Colleges" },
  { value: "1.2M", label: "Students Onboarded" },
  { value: "72%", label: "Faster Onboarding" },
  { value: "98%", label: "Satisfaction Rate" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">CampusFlow</span>
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-campus-teal" /> AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Impact</a>
            <a href="#cta" className="hover:text-foreground transition-colors">Get Started</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login/student">Student Login</Link>
            </Button>
            <Button size="sm" className="gradient-primary border-0 glow-teal" asChild>
              <Link to="/login/admin">Admin Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(173 58% 39% / 0.3), transparent 50%), radial-gradient(circle at 80% 20%, hsl(258 90% 66% / 0.2), transparent 50%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-campus-teal/10 border border-campus-teal/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-campus-teal" />
              <span className="text-xs font-semibold text-campus-teal">AI-Powered Student Onboarding</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight">
              One Platform.{" "}
              <span className="text-gradient">Zero Chaos.</span>
              <br />
              Smart Onboarding.
            </h1>
            <p className="mt-6 text-lg text-sidebar-foreground max-w-2xl leading-relaxed">
              CampusFlow AI replaces fragmented portals with an intelligent agent that guides every student from admission to campus life — automatically.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button size="lg" className="gradient-primary border-0 glow-teal text-base px-8" asChild>
                <Link to="/login/student">
                  Student Portal <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-sidebar-border text-primary-foreground bg-transparent hover:bg-sidebar-accent text-base px-8" asChild>
                <Link to="/login/admin">
                  Admin Dashboard <Building2 className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-extrabold text-gradient">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything You Need</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              A unified AI agent that handles every stage of the student onboarding lifecycle.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow group"
              >
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:glow-teal transition-shadow">
                  <f.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl gradient-hero p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, hsl(173 58% 39% / 0.4), transparent 60%)" }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Onboarding?
              </h2>
              <p className="text-sidebar-foreground max-w-lg mx-auto mb-8">
                Join 50+ colleges using CampusFlow AI to deliver seamless student experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="gradient-primary border-0 glow-teal text-base px-8" asChild>
                  <Link to="/login/student">Get Started <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-campus-teal" />
            <span className="text-sm font-semibold text-foreground">CampusFlow AI</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 CampusFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
