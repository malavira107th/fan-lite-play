import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Medal, TrendingUp, Loader2, Crown } from "lucide-react";

const rankColors = ["text-yellow-400", "text-gray-300", "text-amber-600"];
const rankIcons = [Crown, Medal, Medal];

export default function Leaderboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"overall" | "challenge">("overall");
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");

  const { data: overall, isLoading: overallLoading } = trpc.leaderboard.overall.useQuery({ limit: 50 });
  const { data: challenges } = trpc.challenges.list.useQuery();
  const { data: challengeBoard, isLoading: challengeLoading } = trpc.leaderboard.byChallenge.useQuery(
    { challengeId: Number(selectedChallenge), limit: 50 },
    { enabled: !!selectedChallenge }
  );

  const myUserId = (user as any)?.id;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Fan<span className="text-primary">Lite</span>Play
            </span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">My Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Top strategists ranked by performance</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("overall")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === "overall"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Overall Rankings
          </button>
          <button
            onClick={() => setTab("challenge")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === "challenge"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            By Challenge
          </button>
        </div>

        {tab === "overall" && (
          <>
            {overallLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-2">
                {overall?.map((entry, i) => {
                  const isMe = entry.userId === myUserId;
                  const RankIcon = rankIcons[i];
                  return (
                    <div
                      key={entry.userId}
                      className={`glass-card rounded-xl p-4 flex items-center gap-4 ${
                        isMe ? "border-primary/40 bg-primary/5" : ""
                      }`}
                    >
                      <div className={`w-8 text-center font-bold shrink-0 ${rankColors[i] ?? "text-muted-foreground"}`}>
                        {i < 3 ? <RankIcon className="w-5 h-5 mx-auto" /> : `#${i + 1}`}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold shrink-0">
                        {(entry.userName ?? entry.username ?? "U")[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm flex items-center gap-2">
                          {entry.userName ?? entry.username}
                          {isMe && <span className="text-xs text-primary">(you)</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.entriesCount} {Number(entry.entriesCount) === 1 ? "entry" : "entries"}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-primary">{Math.round(Number(entry.totalPoints))}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  );
                })}
                {overall?.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No rankings yet. Be the first to compete!</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {tab === "challenge" && (
          <>
            <div className="mb-4">
              <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
                <SelectTrigger className="bg-secondary/50 border-border/60">
                  <SelectValue placeholder="Select a challenge" />
                </SelectTrigger>
                <SelectContent>
                  {challenges?.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!selectedChallenge ? (
              <div className="text-center py-20 text-muted-foreground">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Select a challenge to view its leaderboard</p>
              </div>
            ) : challengeLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-2">
                {challengeBoard?.map((entry, i) => {
                  const isMe = entry.userId === myUserId;
                  const RankIcon = rankIcons[i];
                  return (
                    <div
                      key={`${entry.userId}-${i}`}
                      className={`glass-card rounded-xl p-4 flex items-center gap-4 ${
                        isMe ? "border-primary/40 bg-primary/5" : ""
                      }`}
                    >
                      <div className={`w-8 text-center font-bold shrink-0 ${rankColors[i] ?? "text-muted-foreground"}`}>
                        {i < 3 ? <RankIcon className="w-5 h-5 mx-auto" /> : `#${i + 1}`}
                      </div>
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold shrink-0">
                        {(entry.userName ?? entry.username ?? "U")[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm flex items-center gap-2">
                          {entry.teamName}
                          {isMe && <span className="text-xs text-primary">(you)</span>}
                        </div>
                        <div className="text-xs text-muted-foreground">{entry.userName ?? entry.username}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-primary">{Math.round(Number(entry.totalPoints))}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  );
                })}
                {challengeBoard?.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">
                    <p>No entries yet for this challenge.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
