import { useState, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Star, Shield, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const roleColors: Record<string, string> = {
  "batsman": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "bowler": "text-red-400 bg-red-400/10 border-red-400/20",
  "all-rounder": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "wicket-keeper": "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

const roleLabels: Record<string, string> = {
  "batsman": "BAT", "bowler": "BOWL", "all-rounder": "AR", "wicket-keeper": "WK",
};

const TEAM_SIZE = 11;

export default function TeamBuilder() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [, navigate] = useLocation();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<number | null>(null);
  const [teamName, setTeamName] = useState("");
  const [step, setStep] = useState<"select" | "captain" | "name">("select");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const { data: challenge, isLoading: challengeLoading } = trpc.challenges.byId.useQuery({ id: Number(challengeId) });
  const { data: players, isLoading: playersLoading } = trpc.players.byMatch.useQuery(
    { matchId: challenge?.matchId ?? 0 },
    { enabled: !!challenge?.matchId }
  );

  const utils = trpc.useUtils();
  const submitMutation = trpc.teams.create.useMutation({
    onSuccess: () => {
      toast.success("Team submitted successfully!");
      utils.teams.myEntries.invalidate();
      navigate("/dashboard");
    },
    onError: (e) => toast.error(e.message),
  });

  const creditLimit = Number(challenge?.creditLimit ?? 100);

  const usedCredits = useMemo(() => {
    if (!players) return 0;
    return players
      .filter((p) => selectedIds.includes(p.id))
      .reduce((sum, p) => sum + Number(p.credits), 0);
  }, [selectedIds, players]);

  const remainingCredits = creditLimit - usedCredits;

  const togglePlayer = (id: number, credits: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((s) => s !== id));
      if (captainId === id) setCaptainId(null);
      if (viceCaptainId === id) setViceCaptainId(null);
    } else {
      if (selectedIds.length >= TEAM_SIZE) {
        toast.error(`You can only select ${TEAM_SIZE} players`);
        return;
      }
      if (usedCredits + credits > creditLimit) {
        toast.error(`Not enough credits. Remaining: ${remainingCredits.toFixed(1)}`);
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredPlayers = players?.filter((p) =>
    roleFilter === "all" ? true : p.role === roleFilter
  ) ?? [];

  const roleCounts = useMemo(() => {
    const selected = players?.filter((p) => selectedIds.includes(p.id)) ?? [];
    return {
      batsman: selected.filter((p) => p.role === "batsman").length,
      bowler: selected.filter((p) => p.role === "bowler").length,
      "all-rounder": selected.filter((p) => p.role === "all-rounder").length,
      "wicket-keeper": selected.filter((p) => p.role === "wicket-keeper").length,
    };
  }, [selectedIds, players]);

  const canProceedToCaption =
    selectedIds.length === TEAM_SIZE &&
    roleCounts["wicket-keeper"] >= 1 &&
    roleCounts["batsman"] >= 3 &&
    roleCounts["bowler"] >= 3;

  const handleSubmit = () => {
    if (!captainId || !viceCaptainId || !teamName.trim()) {
      toast.error("Please complete all fields");
      return;
    }
    submitMutation.mutate({
      challengeId: Number(challengeId),
      matchId: challenge!.matchId,
      playerIds: selectedIds,
      captainId,
      viceCaptainId,
      teamName: teamName.trim(),
    });
  };

  if (challengeLoading || playersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Challenge not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/matches">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>
          <div className="flex-1">
            <div className="text-sm font-semibold">{challenge.title}</div>
            <div className="text-xs text-muted-foreground">Select {TEAM_SIZE} players</div>
          </div>
          {/* Credit bar */}
          <div className="text-right">
            <div className={`text-sm font-bold ${remainingCredits < 0 ? "text-red-400" : "text-primary"}`}>
              {usedCredits.toFixed(1)} / {creditLimit}
            </div>
            <div className="text-xs text-muted-foreground">credits used</div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-secondary">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${Math.min((usedCredits / creditLimit) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {step === "select" && (
          <>
            {/* Role counts */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              {[
                { key: "wicket-keeper", label: "WK", min: 1 },
                { key: "batsman", label: "BAT", min: 3 },
                { key: "all-rounder", label: "AR", min: 1 },
                { key: "bowler", label: "BOWL", min: 3 },
              ].map(({ key, label, min }) => (
                <div key={key} className={`glass-card rounded-lg p-2 text-center ${roleCounts[key as keyof typeof roleCounts] >= min ? "border-primary/30" : ""}`}>
                  <div className="text-lg font-bold">{roleCounts[key as keyof typeof roleCounts]}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="text-xs text-muted-foreground/60">min {min}</div>
                </div>
              ))}
            </div>

            {/* Selection count */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                {selectedIds.length}/{TEAM_SIZE} players selected
              </div>
              {/* Role filter */}
              <div className="flex gap-1">
                {["all", "batsman", "bowler", "all-rounder", "wicket-keeper"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`text-xs px-2 py-1 rounded-md border transition-all ${
                      roleFilter === r
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border/60 text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {r === "all" ? "All" : roleLabels[r]}
                  </button>
                ))}
              </div>
            </div>

            {/* Player list */}
            <div className="space-y-2 mb-6">
              {filteredPlayers.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                const canAfford = usedCredits + Number(p.credits) <= creditLimit || isSelected;
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePlayer(p.id, Number(p.credits))}
                    disabled={!canAfford && !isSelected}
                    className={`w-full text-left glass-card rounded-xl p-3.5 flex items-center gap-3 transition-all ${
                      isSelected
                        ? "border-primary/50 bg-primary/5"
                        : !canAfford
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}>
                      {isSelected ? <CheckCircle2 className="w-4 h-4" /> : p.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{p.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${roleColors[p.role] ?? ""}`}>
                          {roleLabels[p.role] ?? p.role}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">{p.team}</div>
                    </div>
                    <div className="text-sm font-semibold text-primary shrink-0">{p.credits}cr</div>
                  </button>
                );
              })}
            </div>

            {/* Validation hint */}
            {selectedIds.length === TEAM_SIZE && !canProceedToCaption && (
              <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4 glass-card rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Need: 1 WK, 3+ Batsmen, 3+ Bowlers
              </div>
            )}

            <Button
              className="w-full"
              disabled={!canProceedToCaption}
              onClick={() => setStep("captain")}
            >
              Continue — Select Captain & Vice-Captain
            </Button>
          </>
        )}

        {step === "captain" && (
          <>
            <h2 className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Choose Captain & Vice-Captain
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Captain earns <strong className="text-primary">2×</strong> points. Vice-captain earns <strong className="text-primary">1.5×</strong> points.
            </p>
            <div className="space-y-2 mb-6">
              {players?.filter((p) => selectedIds.includes(p.id)).map((p) => (
                <div key={p.id} className="glass-card rounded-xl p-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                    {p.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.team}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCaptainId(p.id);
                        if (viceCaptainId === p.id) setViceCaptainId(null);
                      }}
                      className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                        captainId === p.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border/60 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <Star className="w-3 h-3" /> C
                    </button>
                    <button
                      onClick={() => {
                        setViceCaptainId(p.id);
                        if (captainId === p.id) setCaptainId(null);
                      }}
                      className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                        viceCaptainId === p.id
                          ? "bg-secondary text-foreground border-foreground/40"
                          : "border-border/60 text-muted-foreground hover:border-foreground/30"
                      }`}
                    >
                      <Shield className="w-3 h-3" /> VC
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("select")} className="flex-1">Back</Button>
              <Button
                className="flex-1"
                disabled={!captainId || !viceCaptainId || captainId === viceCaptainId}
                onClick={() => setStep("name")}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {step === "name" && (
          <>
            <h2 className="text-lg font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Name Your Team
            </h2>
            <p className="text-sm text-muted-foreground mb-5">Give your team a unique name to identify it on the leaderboard.</p>
            <div className="space-y-2 mb-6">
              <Label>Team Name</Label>
              <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Thunder Strikers XI"
                maxLength={40}
                className="bg-secondary/50 border-border/60"
              />
            </div>

            {/* Summary */}
            <div className="glass-card rounded-xl p-4 mb-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Players</span>
                <span className="font-medium">{selectedIds.length}/11</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credits Used</span>
                <span className="font-medium">{usedCredits.toFixed(1)} / {creditLimit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Captain</span>
                <span className="font-medium text-primary">
                  {players?.find((p) => p.id === captainId)?.name ?? "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vice-Captain</span>
                <span className="font-medium">
                  {players?.find((p) => p.id === viceCaptainId)?.name ?? "—"}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("captain")} className="flex-1">Back</Button>
              <Button
                className="flex-1"
                disabled={!teamName.trim() || submitMutation.isPending}
                onClick={handleSubmit}
              >
                {submitMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Submit Team
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
