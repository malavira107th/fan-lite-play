import { trpc } from "@/lib/trpc";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Loader2, Shield, User } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsers() {
  const utils = trpc.useUtils();
  const { data: users, isLoading } = trpc.admin.allUsers.useQuery();

  const updateRoleMutation = trpc.admin.setUserRole.useMutation({
    onSuccess: () => { toast.success("Role updated"); utils.admin.allUsers.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Users</h1>
        <p className="text-muted-foreground text-sm mt-1">{users?.length ?? 0} registered users</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-3">
          {users?.map((u) => (
            <div key={u.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                {(u.name ?? u.username ?? "U")[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{u.name ?? u.username}</span>
                  {u.role === "admin" ? (
                    <Shield className="w-3 h-3 text-primary" />
                  ) : (
                    <User className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{u.email} · Joined {new Date(u.createdAt).toLocaleDateString()}</div>
              </div>
              <Select
                value={u.role}
                onValueChange={(v: "user" | "admin") => updateRoleMutation.mutate({ userId: (u as any).id, role: v })}>
                <SelectTrigger className="w-28 h-8 text-xs bg-secondary/50 border-border/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
