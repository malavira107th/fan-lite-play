import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Trophy, Flag, TrendingUp, Star, Calendar, ArrowRight, Loader2, Medal } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = trpc.dashboard.stats.useQuery();
  const { data: entries, isLoading: entriesLoading } = trpc.teams.myEntries.useQuery();
  const { data: overallRank } = trpc.leaderboard.overall.useQuery({ limit: 100 });

  const myOverallRank = overallRank?.findIndex((r) => r.userId === (user as any)?.id);
  const myRankDisplay = myOverallRank !== undefined && myOverallRank >= 0 ? myOverallRank + 1 : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Fan<span className="text-primary">Lite</span>Play
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/matches">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-3.5 h-3.5" /> Matches
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" size="sm" className="gap-2">
                <Trophy className="w-3.5 h-3.5" /> Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome back, {user?.name ?? (user as any)?.username ?? "Strategist"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Track your cricket strategy performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card rounded-xl p-5 animate-pulse">
                <div className="h-8 w-16 bg-secondary rounded mb-2" />
                <div className="h-4 w-24 bg-secondary/60 rounded" />
              </div>
            ))
          ) : (
            <>
              <div className="glass-card rounded-xl p-5">
                <div className="text-3xl font-bold text-foreground">{stats?.totalEntries ?? 0}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Flag className="w-3 h-3" /> Total Entries
                </div>
              </div>
              <div className="glass-card rounded-xl p-5">
                <div className="text-3xl font-bold text-primary">{Math.round(stats?.totalPoints ?? 0)}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Total Points
                </div>
              </div>
              <div className="glass-card rounded-xl p-5">
                <div className="text-3xl font-bold text-gold">
                  {stats?.bestRank ? `#${stats.bestRank}` : "—"}
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Medal className="w-3 h-3" /> Best Rank
                </div>
              </div>
              <div className="glass-card rounded-xl p-5">
                <div className="text-3xl font-bold text-foreground">{stats?.challengesJoined ?? 0}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Star className="w-3 h-3" /> Challenges
                </div>
              </div>
            </>
          )}
        </div>

        {/* Overall Rank Banner */}
        {myRankDisplay && (
          <div className="glass-card rounded-xl p-5 mb-8 border-primary/20 bg-primary/5 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Your Overall Rank</div>
              <div className="text-2xl font-bold text-primary">#{myRankDisplay}</div>
            </div>
            <Link href="/leaderboard">
              <Button variant="outline" size="sm" className="gap-2">
                View Leaderboard <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        )}

        {/* Recent Entries */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Recent Team Entries
            </h2>
            <Link href="/matches">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Join a challenge <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {entriesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : entries?.length === 0 ? (
            <div className="glass-card rounded-xl p-10 text-center">
              <Trophy className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No team entries yet.</p>
              <Link href="/matches">
                <Button className="mt-4 gap-2" size="sm">
                  <Calendar className="w-3.5 h-3.5" /> Browse Matches
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {entries?.slice(0, 10).map((entry) => (
                <div key={entry.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{entry.teamName}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-primary">{Math.round(Number(entry.totalPoints))} pts</div>
                    {entry.rank && (
                      <div className="text-xs text-muted-foreground">Rank #{entry.rank}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
