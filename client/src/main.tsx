import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

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
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
