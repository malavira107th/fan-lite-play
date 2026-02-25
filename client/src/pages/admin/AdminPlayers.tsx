import { useState } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Edit2, Loader2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

type PlayerRole = "batsman" | "bowler" | "all-rounder" | "wicket-keeper";

type PlayerForm = {
  name: string;
  team: string;
  role: PlayerRole;
  credits: string;
};

const defaultForm: PlayerForm = { name: "", team: "", role: "batsman", credits: "8" };

const roleColors: Record<string, string> = {
  "batsman": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "bowler": "text-red-400 bg-red-400/10 border-red-400/20",
  "all-rounder": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "wicket-keeper": "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

const roleLabels: Record<string, string> = {
  "batsman": "BAT", "bowler": "BOWL", "all-rounder": "AR", "wicket-keeper": "WK",
};

export default function AdminPlayers() {
  const { matchId } = useParams<{ matchId: string }>();
  const [createOpen, setCreateOpen] = useState(false);
  const [editPlayer, setEditPlayer] = useState<any>(null);
  const [form, setForm] = useState<PlayerForm>(defaultForm);
  const [statsPlayer, setStatsPlayer] = useState<any>(null);
  const [statsForm, setStatsForm] = useState({
    runsScored: "0", ballsFaced: "0", fours: "0", sixes: "0",
    fifties: "0", hundreds: "0", ducks: "0",
    wickets: "0", maidens: "0", dotBalls: "0",
    catches: "0", stumpings: "0", runOuts: "0",
  });
  const utils = trpc.useUtils();

  const { data: match } = trpc.matches.byId.useQuery({ id: Number(matchId) });
  const { data: players, isLoading } = trpc.players.byMatch.useQuery({ matchId: Number(matchId) });

  const createMutation = trpc.players.create.useMutation({
    onSuccess: () => {
      toast.success("Player added");
      utils.players.byMatch.invalidate();
      setCreateOpen(false);
      setForm(defaultForm);
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.players.update.useMutation({
    onSuccess: () => {
      toast.success("Player updated");
      utils.players.byMatch.invalidate();
      setEditPlayer(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const updateStatsMutation = trpc.performance.upsert.useMutation({
    onSuccess: () => {
      toast.success("Stats updated & points recalculated");
      utils.players.byMatch.invalidate();
      setStatsPlayer(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ matchId: Number(matchId), ...form });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPlayer) return;
    updateMutation.mutate({ id: editPlayer.id, ...form });
  };

  const handleUpdateStats = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statsPlayer) return;
    updateStatsMutation.mutate({
      playerId: statsPlayer.id,
      matchId: Number(matchId),
      runsScored: parseInt(statsForm.runsScored),
      ballsFaced: parseInt(statsForm.ballsFaced),
      fours: parseInt(statsForm.fours),
      sixes: parseInt(statsForm.sixes),
      fifties: parseInt(statsForm.fifties),
      hundreds: parseInt(statsForm.hundreds),
      ducks: parseInt(statsForm.ducks),
      wickets: parseInt(statsForm.wickets),
      maidens: parseInt(statsForm.maidens),
      dotBalls: parseInt(statsForm.dotBalls),
      catches: parseInt(statsForm.catches),
      stumpings: parseInt(statsForm.stumpings),
      runOuts: parseInt(statsForm.runOuts),
    });
  };

  const openEdit = (p: any) => {
    setEditPlayer(p);
    setForm({ name: p.name, team: p.team, role: p.role as PlayerRole, credits: String(p.credits) });
  };

  const openStats = (p: any) => {
    setStatsPlayer(p);
    setStatsForm({
      runsScored: "0", ballsFaced: "0", fours: "0", sixes: "0",
      fifties: "0", hundreds: "0", ducks: "0",
      wickets: "0", maidens: "0", dotBalls: "0",
      catches: "0", stumpings: "0", runOuts: "0",
    });
  };

  const PlayerFormFields = ({ onSubmit, loading }: { onSubmit: (e: React.FormEvent) => void; loading: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Player Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Virat Kohli" className="bg-secondary/50 border-border/60" />
        </div>
        <div className="space-y-2">
          <Label>Team</Label>
          <Input value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} required placeholder="India" className="bg-secondary/50 border-border/60" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Role</Label>
          <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as PlayerRole })}>
            <SelectTrigger className="bg-secondary/50 border-border/60"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="batsman">Batsman</SelectItem>
              <SelectItem value="bowler">Bowler</SelectItem>
              <SelectItem value="all-rounder">All-Rounder</SelectItem>
              <SelectItem value="wicket-keeper">Wicket-Keeper</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Credits (1–15)</Label>
          <Input type="number" min="1" max="15" step="0.5" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })} required className="bg-secondary/50 border-border/60" />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        {editPlayer ? "Update Player" : "Add Player"}
      </Button>
    </form>
  );

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/matches">
          <Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="w-4 h-4" /> Matches</Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            {match?.title ?? "Match"} — Players
          </h1>
          <p className="text-muted-foreground text-sm">{players?.length ?? 0} players in pool</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Player</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle>Add Player to Pool</DialogTitle></DialogHeader>
            <PlayerFormFields onSubmit={handleCreate} loading={createMutation.isPending} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editPlayer} onOpenChange={(o) => !o && setEditPlayer(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Edit Player</DialogTitle></DialogHeader>
          {editPlayer && <PlayerFormFields onSubmit={handleUpdate} loading={updateMutation.isPending} />}
        </DialogContent>
      </Dialog>

      {/* Stats Dialog */}
      <Dialog open={!!statsPlayer} onOpenChange={(o) => !o && setStatsPlayer(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Update Performance — {statsPlayer?.name}</DialogTitle></DialogHeader>
          {statsPlayer && (
            <form onSubmit={handleUpdateStats} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "runsScored", label: "Runs" }, { key: "ballsFaced", label: "Balls Faced" },
                  { key: "fours", label: "Fours" }, { key: "sixes", label: "Sixes" },
                  { key: "fifties", label: "Fifties" }, { key: "hundreds", label: "Hundreds" },
                  { key: "ducks", label: "Ducks" }, { key: "wickets", label: "Wickets" },
                  { key: "maidens", label: "Maidens" }, { key: "dotBalls", label: "Dot Balls" },
                  { key: "catches", label: "Catches" }, { key: "stumpings", label: "Stumpings" },
                  { key: "runOuts", label: "Run Outs" },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-xs">{label}</Label>
                    <Input type="number" min="0" value={(statsForm as any)[key]}
                      onChange={(e) => setStatsForm({ ...statsForm, [key]: e.target.value })}
                      className="bg-secondary/50 border-border/60 h-8 text-sm" />
                  </div>
                ))}
              </div>
              <Button type="submit" className="w-full" disabled={updateStatsMutation.isPending}>
                {updateStatsMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Save & Recalculate Points
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : players?.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>No players yet. Add players to the pool.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {players?.map((p) => (
            <div key={p.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground shrink-0">
                {p.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-sm">{p.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${roleColors[p.role] ?? ""}`}>
                    {roleLabels[p.role] ?? p.role}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{p.team} · {p.credits} credits</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => openStats(p)} className="gap-1 text-xs">
                  <TrendingUp className="w-3 h-3" /> Stats
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
