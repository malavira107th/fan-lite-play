import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut, User, Trophy, Flag, TrendingUp, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { data: stats } = trpc.dashboard.stats.useQuery();

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
          <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            My Profile
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-2xl font-bold text-primary">
            {((user as any)?.name ?? (user as any)?.username ?? "U")[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              {(user as any)?.name ?? (user as any)?.username}
            </h1>
            <p className="text-muted-foreground text-sm">{(user as any)?.email}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 mt-1 inline-block">
              {(user as any)?.role === "admin" ? "Admin" : "Strategist"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats?.totalEntries ?? 0}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Flag className="w-3 h-3" /> Entries
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{Math.round(stats?.totalPoints ?? 0)}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" /> Points
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold">
              {stats?.bestRank ? `#${stats.bestRank}` : "—"}
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3" /> Best Rank
            </div>
          </div>
        </div>

        {/* Account details */}
        <div className="glass-card rounded-xl p-5 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Account Details
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border/40">
              <span className="text-muted-foreground">Username</span>
              <span className="font-medium">{(user as any)?.username}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/40">
              <span className="text-muted-foreground">Full Name</span>
              <span className="font-medium">{(user as any)?.name ?? "—"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/40">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{(user as any)?.email}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium">
                {(user as any)?.createdAt ? new Date((user as any).createdAt).toLocaleDateString() : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <Button
          variant="outline"
          className="w-full gap-2 text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400/50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
