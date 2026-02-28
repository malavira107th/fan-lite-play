import { useEffect, useState } from "react";

const STORAGE_KEY = "flp_age_confirmed";

export default function AgeModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user already confirmed — use localStorage so it persists across sessions
    const confirmed = localStorage.getItem(STORAGE_KEY);
    if (!confirmed) {
      // Small delay so the page renders first (better for perceived performance)
      const t = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(t);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const handleDecline = () => {
    // Redirect away if user is under 18
    window.location.href = "https://www.google.com";
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          animation: "ageModalIn 0.25s ease-out both",
        }}
      >
        <style>{`
          @keyframes ageModalIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes ageCardIn {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Card */}
        <div
          style={{
            background: "#0d1f14",
            border: "1px solid rgba(22,163,74,0.35)",
            borderRadius: "1rem",
            padding: "2rem 1.75rem",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(22,163,74,0.1)",
            animation: "ageCardIn 0.3s ease-out 0.05s both",
          }}
        >
          {/* Shield icon */}
          <div style={{ marginBottom: "1.25rem", display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 64, height: 64,
              borderRadius: "50%",
              background: "rgba(22,163,74,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1.5px solid rgba(22,163,74,0.4)",
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
          </div>

          {/* Age badge */}
          <div style={{
            display: "inline-block",
            background: "rgba(22,163,74,0.15)",
            border: "1px solid rgba(22,163,74,0.4)",
            borderRadius: "999px",
            padding: "0.25rem 0.875rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#4ade80",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            18+ Only
          </div>

          <h2 style={{
            color: "#f0fdf4",
            fontSize: "1.375rem",
            fontWeight: 700,
            marginBottom: "0.75rem",
            lineHeight: 1.3,
          }}>
            Age Verification
          </h2>

          <p style={{
            color: "#86efac",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            marginBottom: "0.5rem",
          }}>
            Fan Lite Play is a free cricket knowledge platform intended for users aged <strong style={{ color: "#f0fdf4" }}>18 years and above</strong>.
          </p>

          <p style={{
            color: "#6b7280",
            fontSize: "0.8rem",
            lineHeight: 1.5,
            marginBottom: "1.75rem",
          }}>
            By continuing, you confirm that you are 18 or older and agree to our{" "}
            <a href="/terms" style={{ color: "#4ade80", textDecoration: "underline" }}>Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" style={{ color: "#4ade80", textDecoration: "underline" }}>Privacy Policy</a>.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <button
              onClick={handleConfirm}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: "0.625rem",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.15s",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#15803d")}
              onMouseLeave={e => (e.currentTarget.style.background = "#16a34a")}
            >
              Yes, I am 18 or older — Enter
            </button>

            <button
              onClick={handleDecline}
              style={{
                width: "100%",
                padding: "0.625rem 1rem",
                background: "transparent",
                color: "#6b7280",
                border: "1px solid rgba(107,114,128,0.3)",
                borderRadius: "0.625rem",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(156,163,175,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.borderColor = "rgba(107,114,128,0.3)"; }}
            >
              No, I am under 18 — Exit
            </button>
          </div>

          {/* No real money disclaimer */}
          <p style={{
            marginTop: "1.25rem",
            color: "#4b5563",
            fontSize: "0.72rem",
            lineHeight: 1.5,
          }}>
            Fan Lite Play is free to use. No real money, no wagering, no financial transactions of any kind.
          </p>
        </div>
      </div>
    </>
  );
}
