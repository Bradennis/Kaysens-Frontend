import { useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { authApi } from "../../api/resources";
import { useAuth } from "../../context/AuthContext";
import { PageLoader, PageError } from "../../components/Feedback";

export default function UsersAdmin() {
  const { user: me } = useAuth();
  const { data: users, loading, error, reload } = useFetch(() => authApi.listUsers(), []);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor" });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setFormError("");
    try {
      await authApi.createUser(form);
      setForm({ name: "", email: "", password: "", role: "editor" });
      reload();
    } catch (err) {
      setFormError(err.message || "Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  const handleRemove = async (user) => {
    if (!window.confirm(`Remove ${user.name}'s access?`)) return;
    await authApi.removeUser(user._id);
    reload();
  };

  if (loading) return <PageLoader label="Loading users…" />;
  if (error) return <PageError message={error} onRetry={reload} />;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-forest">CMS Users</h1>
      <p className="text-sm text-forest/60 mt-1">Manage who can sign in and edit the Kaysens Group website.</p>

      <form onSubmit={handleCreate} className="mt-6 bg-white rounded-2xl ring-1 ring-forest/10 p-6 space-y-4">
        <h2 className="font-semibold text-forest text-sm">Add a new user</h2>
        {formError && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{formError}</div>}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="px-3.5 py-2.5 rounded-lg bg-cream border border-forest/15 text-sm focus:outline-none focus:ring-2 focus:ring-emerald"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="px-3.5 py-2.5 rounded-lg bg-cream border border-forest/15 text-sm focus:outline-none focus:ring-2 focus:ring-emerald"
          />
          <input
            required
            type="password"
            placeholder="Temporary password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="px-3.5 py-2.5 rounded-lg bg-cream border border-forest/15 text-sm focus:outline-none focus:ring-2 focus:ring-emerald"
          />
          <select
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            className="px-3.5 py-2.5 rounded-lg bg-cream border border-forest/15 text-sm focus:outline-none focus:ring-2 focus:ring-emerald"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          disabled={creating}
          className="inline-flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald transition disabled:opacity-60"
        >
          <UserPlus size={16} /> {creating ? "Creating…" : "Create user"}
        </button>
      </form>

      <div className="mt-6 bg-white rounded-2xl ring-1 ring-forest/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-forest/60 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Email</th>
              <th className="text-left px-4 py-3 font-semibold">Role</th>
              <th className="text-right px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/5">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-muted/30">
                <td className="px-4 py-3 text-forest/80">{u.name}</td>
                <td className="px-4 py-3 text-forest/80">{u.email}</td>
                <td className="px-4 py-3 text-forest/80 capitalize">{u.role}</td>
                <td className="px-4 py-3 text-right">
                  {u._id !== me?._id && (
                    <button
                      onClick={() => handleRemove(u)}
                      className="inline-flex items-center gap-1 text-destructive/80 hover:text-destructive text-xs font-semibold"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
