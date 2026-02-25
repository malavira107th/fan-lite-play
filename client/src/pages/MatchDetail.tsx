import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Flag, Loader2, ChevronRight, Users } from "lucide-react";

const statusColor: Record<string, string> = {
  upcoming: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  live: "bg-green-500/15 text-green-400 border-green-500/30 animate-pulse",
  completed: "bg-muted text-muted-foreground border-border",
};

const formatColor: Record<string, string> = {
  T20: "text-primary bg-primary/10 border-primary/20",
  ODI: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Test: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default function MatchDetail() {
  const { isAuthenticated } = useAuth();
  const { data: matches, isLoading } = trpc.matches.list.useQuery();
  const { data: challenges } = trpc.challenges.list.useQuery();

  const getChallengesForMatch = (matchId: number) =>
    challenges?.filter((c) => c.matchId === matchId && c.status === "open") ?? [];

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
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="outline" size="sm">My Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Cricket Matches
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Browse upcoming matches and join strategy challenges
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : matches?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No matches scheduled yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches?.map((match) => {
              const openChallenges = getChallengesForMatch(match.id);
              return (
                <div key={match.id} className="glass-card rounded-2xl overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[match.status]}`}>
                            {match.status === "live" ? "● LIVE" : match.status.toUpperCase()}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${formatColor[match.format]}`}>
                            {match.format}
                          </span>
                        </div>
                        <h2 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {match.title}
                        </h2>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1 text-center">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-bold mx-auto mb-1">
                          {match.teamA[0]}
                        </div>
                        <div className="text-sm font-semibold">{match.teamA}</div>
                      </div>
                      <div className="text-muted-foreground font-bold text-sm">VS</div>
                      <div className="flex-1 text-center">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-bold mx-auto mb-1">
                          {match.teamB[0]}
                        </div>
                        <div className="text-sm font-semibold">{match.teamB}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(match.matchDate).toLocaleString()}
                      </span>
                      {match.venue && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {match.venue}
                        </span>
                      )}
                    </div>

                    {/* Challenges */}
                    {openChallenges.length > 0 && (
                      <div className="border-t border-border/40 pt-4">
                        <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Flag className="w-3 h-3" /> Open Challenges
                        </div>
                        <div className="space-y-2">
                          {openChallenges.map((c) => (
                            <div key={c.id} className="flex items-center justify-between bg-secondary/40 rounded-lg px-3 py-2">
                              <div>
                                <div className="text-sm font-medium">{c.title}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                  <Users className="w-3 h-3" />
                                  Max {c.maxEntriesPerUser} entries · {c.creditLimit} credits
                                </div>
                              </div>
                              {isAuthenticated ? (
                                <Link href={`/challenge/${c.id}/build`}>
                                  <Button size="sm" className="gap-1 text-xs">
                                    Build Team <ChevronRight className="w-3 h-3" />
                                  </Button>
                                </Link>
                              ) : (
                                <Link href="/login">
                                  <Button size="sm" variant="outline" className="text-xs">
                                    Sign in to join
                                  </Button>
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {match.status === "completed" && (
                      <div className="border-t border-border/40 pt-4">
                        <Link href={`/leaderboard?matchId=${match.id}`}>
                          <Button variant="outline" size="sm" className="gap-2 text-xs w-full">
                            <Flag className="w-3 h-3" /> View Results & Leaderboard
                          </Button>
                        </Link>
                      </div>
                    )}
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
