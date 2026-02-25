import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ username: "", email: "", password: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success("Account created! Welcome to Fan Lite Play.");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Registration failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(form);
  };

  const perks = [
    "Free to play, always",
    "Build unlimited teams",
    "Compete on leaderboards",
    "Real match performance tracking",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero pitch-pattern p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Perks */}
        <div className="hidden md:block">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">
              <span className="text-gradient">Fan Lite</span>
              <span className="text-foreground"> Play</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join the Cricket Strategy Community
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Create your free account and start building teams, competing in challenges, and proving your cricket knowledge.
          </p>
          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Form */}
        <div>
          <div className="text-center mb-6 md:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Trophy className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-gradient">Fan Lite</span>
                <span className="text-foreground"> Play</span>
              </span>
            </Link>
          </div>
          <div className="glass-card rounded-2xl p-8">
            <h1 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Create Your Account
            </h1>
            <p className="text-sm text-muted-foreground mb-6">Free forever. No credit card needed.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-secondary/50 border-border/60 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username <span className="text-destructive">*</span></Label>
                  <Input
                    id="username"
                    placeholder="cricketfan99"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                    pattern="[a-zA-Z0-9_]+"
                    minLength={3}
                    maxLength={32}
                    className="bg-secondary/50 border-border/60 focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  autoComplete="email"
                  className="bg-secondary/50 border-border/60 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="bg-secondary/50 border-border/60 focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full shadow-lg shadow-primary/20 mt-2"
                disabled={registerMutation.isPending}>
                {registerMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Account...</>
                ) : "Create Free Account"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By registering, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
