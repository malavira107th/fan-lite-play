import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Flag, Calendar, Users, ChevronRight, Loader2 } from "lucide-react";

const statusColor: Record<string, string> = {
  open: "bg-green-500/15 text-green-400 border-green-500/30",
  locked: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  completed: "bg-muted text-muted-foreground border-border",
};

export default function Challenges() {
  const { isAuthenticated } = useAuth();
  const { data: challenges, isLoading } = trpc.challenges.list.useQuery();
  const { data: matches } = trpc.matches.list.useQuery();

  const getMatch = (matchId: number) => matches?.find((m) => m.id === matchId);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Fan<span className="text-primary">Lite</span>Play
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/matches">
              <Button variant="ghost" size="sm">Matches</Button>
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Strategy Challenges
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Build your team, compete on the leaderboard, and prove your cricket knowledge.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : challenges?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Flag className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No challenges available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {challenges?.map((c) => {
              const match = getMatch(c.matchId);
              return (
                <div key={c.id} className="glass-card rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[c.status]}`}>
                          {c.status.toUpperCase()}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {c.title}
                      </h2>
                      {match && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {match.teamA} vs {match.teamB} · {match.format}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Max {c.maxEntriesPerUser} entries per user
                    </span>
                    <span className="flex items-center gap-1">
                      <Flag className="w-3 h-3" />
                      {c.creditLimit} credit limit
                    </span>
                    {match && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(match.matchDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {c.description && (
                    <p className="text-sm text-muted-foreground mb-4">{c.description}</p>
                  )}

                  <div className="flex items-center gap-3">
                    {c.status === "open" && (
                      isAuthenticated ? (
                        <Link href={`/challenge/${c.id}/build`}>
                          <Button className="gap-2">
                            Build Team <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/login">
                          <Button variant="outline" className="gap-2">
                            Sign in to participate
                          </Button>
                        </Link>
                      )
                    )}
                    <Link href={`/leaderboard`}>
                      <Button variant="ghost" size="sm" className="text-xs gap-1">
                        View Leaderboard
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
