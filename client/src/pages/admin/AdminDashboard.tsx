import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Users, Calendar, Flag, Trophy, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: stats, isLoading } = trpc.admin.stats.useQuery();

  const statCards = [
    { label: "Total Users", value: stats?.users ?? 0, icon: Users, href: "/admin/users", color: "text-blue-400" },
    { label: "Matches", value: stats?.matches ?? 0, icon: Calendar, href: "/admin/matches", color: "text-primary" },
    { label: "Challenges", value: stats?.challenges ?? 0, icon: Flag, href: "/admin/challenges", color: "text-gold" },
    { label: "Team Entries", value: stats?.entries ?? 0, icon: Trophy, href: "#", color: "text-purple-400" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of Fan Lite Play platform activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              {isLoading ? (
                <div className="h-8 w-16 bg-secondary rounded animate-pulse" />
              ) : (
                <div className="text-3xl font-bold text-foreground">{card.value.toLocaleString()}</div>
              )}
              <div className="text-xs text-muted-foreground mt-1">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link href="/admin/matches">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Calendar className="w-4 h-4" />
                Manage Matches
                <ArrowRight className="w-3 h-3 ml-auto" />
              </Button>
            </Link>
            <Link href="/admin/challenges">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Flag className="w-4 h-4" />
                Manage Challenges
                <ArrowRight className="w-3 h-3 ml-auto" />
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Users className="w-4 h-4" />
                Manage Users
                <ArrowRight className="w-3 h-3 ml-auto" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Platform Info
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/40">
              <span className="text-muted-foreground">Platform</span>
              <span className="font-medium">Fan Lite Play</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/40">
              <span className="text-muted-foreground">Support Email</span>
              <span className="font-medium text-primary text-xs">support@fanliteplay.com</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/40">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium">Free-to-Play</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Status</span>
              <span className="text-primary font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
