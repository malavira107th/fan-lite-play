import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut, User, Trophy, TrendingUp, Flag, Shield, Loader2, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Profile() {
  const [, navigate] = useLocation();
  const { data: user, isLoading } = trpc.auth.me.useQuery();
  const { data: stats } = trpc.dashboard.stats.useQuery();
  const utils = trpc.useUtils();

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      navigate("/");
      toast.success("You have been signed out.");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const displayName = (user as any)?.name || (user as any)?.username || "User";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="container max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-xl font-bold text-primary">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                {displayName}
              </h1>
              <p className="text-sm text-muted-foreground">{(user as any)?.email}</p>
            </div>
            {(user as any)?.role === "admin" && (
              <div className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-semibold text-primary">
                <Shield className="w-3 h-3" />
                Admin
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-border/60 bg-card/60 p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats?.totalEntries ?? 0}</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Flag className="w-3 h-3" /> Entries
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/60 p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{Math.round(stats?.totalPoints ?? 0)}</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" /> Points
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/60 p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: "oklch(0.78 0.15 85)" }}>
                {stats?.bestRank ? `#${stats.bestRank}` : "—"}
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Trophy className="w-3 h-3" /> Best Rank
              </div>
            </div>
          </div>

          {/* Account details */}
          <div className="rounded-2xl border border-border/60 bg-card/60 divide-y divide-border/40 mb-6">
            <div className="px-6 py-4">
              <h2 className="text-sm font-semibold text-foreground">Account Details</h2>
            </div>
            <div className="px-6 py-5 flex items-center gap-4">
              <User className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Full Name</p>
                <p className="text-sm font-medium text-foreground">{(user as any)?.name || "—"}</p>
              </div>
            </div>
            {(user as any)?.username && (
              <div className="px-6 py-5 flex items-center gap-4">
                <Trophy className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Username</p>
                  <p className="text-sm font-medium text-foreground">{(user as any).username}</p>
                </div>
              </div>
            )}
            <div className="px-6 py-5 flex items-center gap-4">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email Address</p>
                <p className="text-sm font-medium text-foreground">{(user as any)?.email}</p>
              </div>
            </div>
            <div className="px-6 py-5 flex items-center gap-4">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Member Since</p>
                <p className="text-sm font-medium text-foreground">
                  {(user as any)?.createdAt
                    ? new Date((user as any).createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Platform notice */}
          <div className="rounded-xl border border-border/40 bg-card/30 px-5 py-4 mb-6">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fan Lite Play is a free-to-use cricket strategy platform. No financial transactions take place on this platform. For account support, contact us at{" "}
              <a href="mailto:support@fanliteplay.com" className="text-primary hover:underline">
                support@fanliteplay.com
              </a>.
            </p>
          </div>

          {/* Sign out */}
          <Button
            variant="outline"
            className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Sign Out
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
