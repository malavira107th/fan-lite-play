import { useState, useRef, useCallback } from "react";

interface SliderCaptchaProps {
  onVerified: () => void;
}

const SLIDER_WIDTH = 320; // total track width in px
const THUMB_SIZE = 48;    // draggable thumb size in px
const SUCCESS_THRESHOLD = 0.88; // must drag to 88% of track

export default function SliderCaptcha({ onVerified }: SliderCaptchaProps) {
  const [progress, setProgress] = useState(0); // 0 → 1
  const [isDragging, setIsDragging] = useState(false);
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);

  const getTrackLeft = () => {
    if (!trackRef.current) return 0;
    return trackRef.current.getBoundingClientRect().left;
  };

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (verified) return;
    e.preventDefault();
    setFailed(false);
    setIsDragging(true);
    startXRef.current = e.clientX;
    startProgressRef.current = progress;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [verified, progress]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || verified) return;
    const trackLeft = getTrackLeft();
    const maxTravel = SLIDER_WIDTH - THUMB_SIZE;
    const rawX = e.clientX - trackLeft - THUMB_SIZE / 2;
    const newProgress = clamp(rawX / maxTravel, 0, 1);
    setProgress(newProgress);
  }, [isDragging, verified]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (progress >= SUCCESS_THRESHOLD) {
      setProgress(1);
      setVerified(true);
      setTimeout(() => onVerified(), 600);
    } else {
      // Snap back with a shake animation
      setFailed(true);
      setProgress(0);
      setTimeout(() => setFailed(false), 600);
    }
  }, [isDragging, progress, onVerified]);

  // Also handle pointer events on the track itself for better UX
  const handleTrackPointerDown = useCallback((e: React.PointerEvent) => {
    if (verified) return;
    const trackLeft = getTrackLeft();
    const maxTravel = SLIDER_WIDTH - THUMB_SIZE;
    const rawX = e.clientX - trackLeft - THUMB_SIZE / 2;
    const newProgress = clamp(rawX / maxTravel, 0, 1);
    setProgress(newProgress);
    setFailed(false);
    setIsDragging(true);
    startXRef.current = e.clientX;
    startProgressRef.current = newProgress;
  }, [verified]);

  const thumbLeft = progress * (SLIDER_WIDTH - THUMB_SIZE);
  const fillWidth = thumbLeft + THUMB_SIZE / 2;

  return (
    <div className="w-full space-y-3">
      <p className="text-sm text-zinc-400 text-center">
        {verified
          ? "Verification complete"
          : "Slide to verify you're human"}
      </p>

      {/* Track */}
      <div
        ref={trackRef}
        onPointerDown={handleTrackPointerDown}
        className={`relative select-none rounded-full overflow-hidden cursor-pointer transition-all duration-200 ${
          failed ? "animate-[shake_0.4s_ease-in-out]" : ""
        }`}
        style={{
          width: SLIDER_WIDTH,
          height: THUMB_SIZE,
          maxWidth: "100%",
          background: verified
            ? "linear-gradient(90deg, #16a34a, #22c55e)"
            : failed
            ? "rgba(239,68,68,0.15)"
            : "rgba(255,255,255,0.06)",
          border: `1px solid ${verified ? "#22c55e" : failed ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
          boxShadow: verified
            ? "0 0 20px rgba(34,197,94,0.3)"
            : "none",
        }}
      >
        {/* Fill bar */}
        {!verified && (
          <div
            className="absolute inset-y-0 left-0 transition-none rounded-full"
            style={{
              width: fillWidth,
              background: failed
                ? "rgba(239,68,68,0.2)"
                : "linear-gradient(90deg, rgba(22,163,74,0.4), rgba(22,163,74,0.15))",
              transition: isDragging ? "none" : "width 0.3s ease",
            }}
          />
        )}

        {/* Track label */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: verified ? 0 : Math.max(0, 1 - progress * 3),
            transition: "opacity 0.2s",
          }}
        >
          <span className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            Drag to the right
          </span>
        </div>

        {/* Verified label */}
        {verified && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-sm font-semibold text-white flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              Verified
            </span>
          </div>
        )}

        {/* Thumb */}
        {!verified && (
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute top-0 flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing touch-none transition-shadow ${
              isDragging ? "shadow-lg shadow-green-900/50" : ""
            }`}
            style={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              left: thumbLeft,
              background: isDragging
                ? "linear-gradient(135deg, #16a34a, #15803d)"
                : failed
                ? "linear-gradient(135deg, #ef4444, #dc2626)"
                : "linear-gradient(135deg, #22c55e, #16a34a)",
              boxShadow: isDragging
                ? "0 4px 20px rgba(22,163,74,0.5)"
                : "0 2px 8px rgba(0,0,0,0.4)",
              transition: isDragging ? "none" : "left 0.3s ease, background 0.2s ease",
              zIndex: 10,
            }}
          >
            {/* Arrow icon inside thumb */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: isDragging ? 0.7 : 1,
                transform: isDragging ? "scale(0.9)" : "scale(1)",
                transition: "transform 0.1s",
              }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Shake keyframe via inline style */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
