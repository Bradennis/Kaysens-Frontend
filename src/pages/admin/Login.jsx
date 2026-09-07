import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    const from = location.state?.from?.pathname || "/admin";
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email, password);
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest px-4">
      <div className="w-full max-w-sm bg-cream rounded-3xl p-8 ring-1 ring-black/5">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="size-9 bg-gold rounded-md flex items-center justify-center">
            <span className="text-forest font-semibold">K</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-forest">Kaysens CMS</span>
        </div>

        <h1 className="text-xl font-semibold text-forest mb-1">Sign in</h1>
        <p className="text-sm text-forest/60 mb-6">Manage the Kaysens Group website content.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
          <div>
            <label className="text-sm font-medium text-forest">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full px-4 py-2.5 rounded-xl bg-white border border-forest/15 focus:outline-none focus:ring-2 focus:ring-emerald"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-forest">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full px-4 py-2.5 rounded-xl bg-white border border-forest/15 focus:outline-none focus:ring-2 focus:ring-emerald"
            />
          </div>
          <button
            disabled={submitting}
            className="w-full bg-forest text-cream px-6 py-3 rounded-full font-semibold text-sm hover:bg-emerald transition disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
