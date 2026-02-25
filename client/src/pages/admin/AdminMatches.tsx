import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Users, Calendar, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

type MatchForm = {
  title: string;
  teamA: string;
  teamB: string;
  venue: string;
  matchDate: string;
  format: "T20" | "ODI" | "Test";
};

const defaultForm: MatchForm = {
  title: "",
  teamA: "",
  teamB: "",
  venue: "",
  matchDate: "",
  format: "T20",
};

const statusColor: Record<string, string> = {
  upcoming: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  live: "bg-green-500/15 text-green-400 border-green-500/30",
  completed: "bg-muted text-muted-foreground border-border",
};

export default function AdminMatches() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editMatch, setEditMatch] = useState<any>(null);
  const [form, setForm] = useState<MatchForm>(defaultForm);
  const utils = trpc.useUtils();

  const { data: matches, isLoading } = trpc.matches.list.useQuery();

  const createMutation = trpc.matches.create.useMutation({
    onSuccess: () => {
      toast.success("Match created successfully");
      utils.matches.list.invalidate();
      setCreateOpen(false);
      setForm(defaultForm);
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.matches.update.useMutation({
    onSuccess: () => {
      toast.success("Match updated");
      utils.matches.list.invalidate();
      setEditMatch(null);
    },
    onError: (e) => toast.error(e.message),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMatch) return;
    updateMutation.mutate({ id: editMatch.id, ...form });
  };

  const openEdit = (match: any) => {
    setEditMatch(match);
    setForm({
      title: match.title,
      teamA: match.teamA,
      teamB: match.teamB,
      venue: match.venue ?? "",
      matchDate: new Date(match.matchDate).toISOString().slice(0, 16),
      format: match.format,
    });
  };

  const MatchForm = ({ onSubmit, loading }: { onSubmit: (e: React.FormEvent) => void; loading: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Match Title</Label>
        <Input placeholder="e.g. India vs Australia - 1st T20" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} required
          className="bg-secondary/50 border-border/60" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Team A</Label>
          <Input placeholder="India" value={form.teamA}
            onChange={(e) => setForm({ ...form, teamA: e.target.value })} required
            className="bg-secondary/50 border-border/60" />
        </div>
        <div className="space-y-2">
          <Label>Team B</Label>
          <Input placeholder="Australia" value={form.teamB}
            onChange={(e) => setForm({ ...form, teamB: e.target.value })} required
            className="bg-secondary/50 border-border/60" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Venue</Label>
        <Input placeholder="Wankhede Stadium, Mumbai" value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
          className="bg-secondary/50 border-border/60" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Match Date & Time</Label>
          <Input type="datetime-local" value={form.matchDate}
            onChange={(e) => setForm({ ...form, matchDate: e.target.value })} required
            className="bg-secondary/50 border-border/60" />
        </div>
        <div className="space-y-2">
          <Label>Format</Label>
          <Select value={form.format} onValueChange={(v) => setForm({ ...form, format: v as any })}>
            <SelectTrigger className="bg-secondary/50 border-border/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="T20">T20</SelectItem>
              <SelectItem value="ODI">ODI</SelectItem>
              <SelectItem value="Test">Test</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {editMatch ? "Update Match" : "Create Match"}
      </Button>
    </form>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Matches</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage cricket matches</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Match</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Match</DialogTitle>
            </DialogHeader>
            <MatchForm onSubmit={handleCreate} loading={createMutation.isPending} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editMatch} onOpenChange={(o) => !o && setEditMatch(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Match</DialogTitle>
          </DialogHeader>
          {editMatch && (
            <div className="space-y-4">
              <MatchForm onSubmit={handleUpdate} loading={updateMutation.isPending} />
              <div className="space-y-2">
                <Label>Match Status</Label>
                <Select
                  value={editMatch.status}
                  onValueChange={(v) => {
                    updateMutation.mutate({ id: editMatch.id, status: v as any });
                  }}>
                  <SelectTrigger className="bg-secondary/50 border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : matches?.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No matches yet. Create your first match.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {matches?.map((match) => (
            <div key={match.id} className="glass-card rounded-xl p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-sm truncate">{match.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[match.status]}`}>
                    {match.status}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {match.format}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/players/${match.id}`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Users className="w-3 h-3" /> Players
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => openEdit(match)}>
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
