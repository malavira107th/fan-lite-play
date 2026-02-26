import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      toast.success("Welcome back!");
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Invalid email or password.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: image panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1000&q=80&auto=format&fit=crop')` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, oklch(0.08 0.012 155 / 0.88) 0%, oklch(0.08 0.012 155 / 0.55) 100%)" }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center">
            <picture><source srcSet="/logo.webp" type="image/webp" /><img src="/logo.png" alt="Fan Lite Play" style={{height: '48px'}} className="w-auto object-contain" width="201" height="112" /></picture>
          </Link>
          <div>
            <blockquote
              className="text-2xl font-bold leading-snug mb-4 text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Cricket is not just a sport.<br />It is a way of thinking."
            </blockquote>
            <p className="text-sm text-muted-foreground">Sign in to continue building your strategy.</p>
          </div>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center mb-10 lg:hidden">
          <picture><source srcSet="/logo.webp" type="image/webp" /><img src="/logo.png" alt="Fan Lite Play" style={{height: '44px'}} className="w-auto object-contain" width="201" height="112" /></picture>
        </Link>

        <div className="w-full max-w-sm">
          <h1
            className="text-2xl font-bold mb-1.5 text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sign In
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Welcome back. Enter your details to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
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

            <Button
              type="submit"
              className="w-full gap-2 shadow-lg shadow-primary/20"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing In...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Create one free
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-8 leading-relaxed">
            Fan Lite Play is for users aged 18 and above.<br />
            No financial transactions of any kind.
          </p>
        </div>
      </div>
    </div>
  );
}
