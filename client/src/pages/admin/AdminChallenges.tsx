import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Flag, Calendar, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";

const statusColor: Record<string, string> = {
  open: "bg-green-500/15 text-green-400 border-green-500/30",
  closed: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  completed: "bg-muted text-muted-foreground border-border",
};

export default function AdminChallenges() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ matchId: "", name: "", maxEntries: "3", creditLimit: "100", entryDeadline: "" });
  const utils = trpc.useUtils();

  const { data: challenges, isLoading } = trpc.challenges.list.useQuery();
  const { data: matches } = trpc.matches.list.useQuery();

  const createMutation = trpc.challenges.create.useMutation({
    onSuccess: () => {
      toast.success("Challenge created");
      utils.challenges.list.invalidate();
      setOpen(false);
      setForm({ matchId: "", name: "", maxEntries: "3", creditLimit: "100", entryDeadline: "" });
    },
    onError: (e) => toast.error(e.message),
  });

  const updateStatusMutation = trpc.challenges.update.useMutation({
    onSuccess: () => { toast.success("Status updated"); utils.challenges.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      matchId: Number(form.matchId),
      title: form.name,
      maxEntriesPerUser: Number(form.maxEntries),
      creditLimit: String(form.creditLimit),
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Challenges</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage match challenges</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Challenge</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle>Create Challenge</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Match</Label>
                <Select value={form.matchId} onValueChange={(v) => setForm({ ...form, matchId: v })}>
                  <SelectTrigger className="bg-secondary/50 border-border/60"><SelectValue placeholder="Select match" /></SelectTrigger>
                  <SelectContent>
                    {matches?.filter(m => m.status === "upcoming").map(m => (
                      <SelectItem key={m.id} value={String(m.id)}>{m.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Challenge Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Grand Challenge" className="bg-secondary/50 border-border/60" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Max Entries</Label>
                  <Input type="number" min="1" max="10" value={form.maxEntries} onChange={(e) => setForm({ ...form, maxEntries: e.target.value })} className="bg-secondary/50 border-border/60" />
                </div>
                <div className="space-y-2">
                  <Label>Credit Limit</Label>
                  <Input type="number" min="50" max="200" value={form.creditLimit} onChange={(e) => setForm({ ...form, creditLimit: e.target.value })} className="bg-secondary/50 border-border/60" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Entry Deadline</Label>
                <Input type="datetime-local" value={form.entryDeadline} onChange={(e) => setForm({ ...form, entryDeadline: e.target.value })} required className="bg-secondary/50 border-border/60" />
              </div>
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Create Challenge
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : challenges?.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Flag className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No challenges yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {challenges?.map((c) => (
            <div key={c.id} className="glass-card rounded-xl p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{c.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[c.status]}`}>{c.status}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Created: {new Date(c.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />Max {c.maxEntriesPerUser} entries · {c.creditLimit} credits</span>
                </div>
              </div>
              <Select value={c.status} onValueChange={(v) => updateStatusMutation.mutate({ id: c.id, status: v as "open" | "locked" | "completed" })}>
                <SelectTrigger className="w-32 h-8 text-xs bg-secondary/50 border-border/60"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
