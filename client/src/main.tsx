import { createRoot } from "react-dom/client";
import { lazy, Suspense, useState } from "react";
import SecurityGate from "./components/SecurityGate";
import "./index.css";

// The full app (React Router + tRPC + Radix/shadcn) is lazy-loaded
// ONLY after the SecurityGate is passed — this keeps the initial bundle tiny.
const FullApp = lazy(() => import("./AppEntry"));

// Detect crawlers/bots by user-agent — Googlebot, Bingbot, etc.
// These agents auto-pass the gate so they index the real page content.
// This is required for Google Ads anti-cloaking compliance:
// crawlers must see the same content as real users (the full site).
function isCrawler(): boolean {
  try {
    return /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|applebot|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider/i.test(
      navigator.userAgent
    );
  } catch {
    return false;
  }
}

function Root() {
  // Crawlers skip the gate entirely — they see the full site immediately.
  // Human visitors still go through the normal SecurityGate flow.
  const [passed, setPassed] = useState(() => isCrawler());

  if (!passed) {
    return (
      <SecurityGate onPassed={() => setPassed(true)} />
    );
  }

  return (
    <Suspense fallback={
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0f0a" }}>
        <div style={{ width: 32, height: 32, border: "2px solid #16a34a", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <FullApp />
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
