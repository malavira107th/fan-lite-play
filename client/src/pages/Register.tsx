import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

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
    if (!ageConfirmed) {
      toast.error("You must confirm you are 18 or older to register.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    registerMutation.mutate({ name, email, password, username });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: image panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&q=80&auto=format&fit=crop')` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, oklch(0.08 0.012 155 / 0.88) 0%, oklch(0.08 0.012 155 / 0.55) 100%)" }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Fan Lite Play</span>
          </Link>
          <div>
            <blockquote
              className="text-2xl font-bold leading-snug mb-4 text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Every great innings starts<br />with a single decision."
            </blockquote>
            <p className="text-sm text-muted-foreground">Join cricket fans building smarter teams every match day.</p>
          </div>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Trophy className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">Fan Lite Play</span>
        </Link>

        <div className="w-full max-w-sm">
          <h1
            className="text-2xl font-bold mb-1.5 text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Create Your Account
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Free to join. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="cricketfan99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                pattern="[a-zA-Z0-9_]+"
                minLength={3}
                maxLength={32}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 18+ age confirmation */}
            <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-4">
              <Checkbox
                id="age"
                checked={ageConfirmed}
                onCheckedChange={(v) => setAgeConfirmed(!!v)}
                className="mt-0.5"
              />
              <label htmlFor="age" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I confirm that I am <strong className="text-foreground">18 years of age or older</strong> and agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <Button
              type="submit"
              className="w-full gap-2 shadow-lg shadow-primary/20"
              disabled={registerMutation.isPending || !ageConfirmed}
            >
              {registerMutation.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</>
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-8 leading-relaxed">
            Fan Lite Play is completely free.<br />
            No payments, no transactions, no hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}
