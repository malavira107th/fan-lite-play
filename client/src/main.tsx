import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import AgeModal from "./components/AgeModal";
import "./index.css";

// The full app loads immediately — no gate blocking rendering.
// This means Googlebot indexes the real page content (anti-cloaking compliant).
// The AgeModal overlays the page for human visitors who haven't confirmed yet.
const FullApp = lazy(() => import("./AppEntry"));

function Root() {
  return (
    <Suspense fallback={
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0f0a" }}>
        <div style={{ width: 32, height: 32, border: "2px solid #16a34a", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <FullApp />
      {/* Non-blocking age confirmation — renders on top of the full app.
          Googlebot never triggers useEffect so it sees the page without this modal.
          Human visitors see the modal until they confirm they are 18+. */}
      <AgeModal />
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
