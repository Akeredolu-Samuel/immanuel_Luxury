import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Eye, EyeOff, LogIn, Shield } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Small artificial delay for UX polish
    await new Promise((r) => setTimeout(r, 600));

    const ok = login(password);
    if (ok) {
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% -20%, hsl(40 48% 56% / 0.12) 0%, transparent 70%), hsl(214 57% 11%)",
      }}
    >
      {/* Decorative glow lines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-96"
          style={{
            background:
              "linear-gradient(to bottom, transparent, hsl(40 48% 56% / 0.3), transparent)",
          }}
        />
      </div>

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div
          className={`bg-card border border-gold/20 shadow-elevated p-10 transition-all duration-300 ${shake ? "animate-[shakeX_0.35s_ease]" : ""}`}
          style={{ boxShadow: "0 32px 80px hsl(214 57% 4% / 0.8), 0 0 0 1px hsl(40 48% 56% / 0.08)" }}
        >
          {/* Logo / icon */}
          <div className="flex flex-col items-center mb-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ background: "var(--gradient-gold)", boxShadow: "0 0 32px hsl(40 48% 56% / 0.35)" }}
            >
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-light text-foreground tracking-wide">
              Admin Portal
            </h1>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mt-1">
              Immanuel Luxury Homes
            </p>
            <div className="gold-divider mt-4" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="block font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  className="w-full bg-background border border-gold/20 focus:border-gold/60 text-foreground font-body text-sm px-4 py-3 pr-12 outline-none transition-colors duration-200 placeholder:text-muted-foreground/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="font-body text-xs text-destructive text-center tracking-wide">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !password}
              id="admin-login-btn"
              className="w-full flex items-center justify-center gap-2 gradient-gold text-primary-foreground font-body text-xs tracking-[0.25em] uppercase py-3.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <LogIn size={15} />
              )}
              {loading ? "Verifying…" : "Sign In"}
            </button>
          </form>

          <p className="font-body text-center text-[11px] text-muted-foreground/50 mt-8">
            This portal is restricted to authorized personnel only.
          </p>
        </div>

        {/* Back to site link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="font-body text-xs text-muted-foreground hover:text-gold transition-colors tracking-wide"
          >
            ← Back to main site
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
