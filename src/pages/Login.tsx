import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "@/lib/motion";
import { GraduationCap, Sparkles, Eye, EyeOff, ArrowLeft, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/useAuth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { role } = useParams<{ role: "student" | "admin" }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAdmin = role === "admin";
  const demoEmail = isAdmin ? "admin@campus.edu" : "student@campus.edu";
  const demoPassword = isAdmin ? "admin123" : "student123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password, role as "student" | "admin");
      if (success) {
        toast({ title: "Welcome!", description: `Logged in as ${role}` });
        navigate(isAdmin ? "/admin" : "/student");
      } else {
        toast({ title: "Login failed", description: "Invalid credentials. Try the demo credentials.", variant: "destructive" });
      }
      setLoading(false);
    }, 600);
  };

  const fillDemo = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, hsl(173 58% 39% / 0.4), transparent 50%), radial-gradient(circle at 70% 30%, hsl(258 90% 66% / 0.3), transparent 50%)" }} />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-md"
        >
          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-8 glow-teal">
            {isAdmin ? <Shield className="w-7 h-7 text-primary-foreground" /> : <GraduationCap className="w-7 h-7 text-primary-foreground" />}
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            {isAdmin ? "Admin Control Center" : "Your Campus Journey Starts Here"}
          </h2>
          <p className="text-sidebar-foreground leading-relaxed">
            {isAdmin
              ? "Monitor onboarding progress, manage student data, and leverage AI-powered analytics to optimize the entire process."
              : "Complete your onboarding seamlessly with AI-guided steps, real-time progress tracking, and instant support."}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["AR", "SP", "RG", "PM"].map((initials, i) => (
                <div key={i} className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-campus-navy">
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-xs text-sidebar-foreground">1,200+ active users this semester</span>
          </div>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              {isAdmin ? <Shield className="w-5 h-5 text-primary-foreground" /> : <Users className="w-5 h-5 text-primary-foreground" />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{isAdmin ? "Admin" : "Student"} Login</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-campus-teal" /> CampusFlow AI
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder={demoEmail} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary border-0 glow-teal" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <button onClick={fillDemo} className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-campus-teal transition-colors">
            Use demo credentials →
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {isAdmin ? "Student?" : "Admin?"}{" "}
            <Link to={isAdmin ? "/login/student" : "/login/admin"} className="text-campus-teal hover:underline font-medium">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
