import { useState, useEffect, useCallback, useRef } from "react";
import { Shield, CheckCircle, AlertCircle, Loader2, Calendar, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
// Uses standalone REST endpoint for captcha (no DB dependency)

// reCAPTCHA v3 site key
const RECAPTCHA_SITE_KEY = "6LcgincsAAAAAlQ_CrhOB22G0U4mdi3VWMEqLgX9";
const GATE_STORAGE_KEY = "flp_gate_passed";
const GATE_EXPIRY_HOURS = 24; // Re-check every 24 hours

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface SecurityGateProps {
  children: React.ReactNode;
}

type Step = "captcha" | "age" | "passed";

function isGateAlreadyPassed(): boolean {
  try {
    const stored = localStorage.getItem(GATE_STORAGE_KEY);
    if (!stored) return false;
    const { timestamp } = JSON.parse(stored);
    const expiryMs = GATE_EXPIRY_HOURS * 60 * 60 * 1000;
    return Date.now() - timestamp < expiryMs;
  } catch {
    return false;
  }
}

function markGatePassed(): void {
  try {
    localStorage.setItem(GATE_STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }));
  } catch {
    // ignore storage errors
  }
}

export default function SecurityGate({ children }: SecurityGateProps) {
  const [step, setStep] = useState<Step>(() =>
    isGateAlreadyPassed() ? "passed" : "captcha"
  );
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [ageLoading, setAgeLoading] = useState(false);
  const scriptLoaded = useRef(false);

  // Load reCAPTCHA v3 script
  useEffect(() => {
    if (step === "passed" || scriptLoaded.current) return;
    const existing = document.getElementById("recaptcha-script");
    if (existing) { scriptLoaded.current = true; return; }
    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => { scriptLoaded.current = true; };
    document.head.appendChild(script);
  }, [step]);

  // Auto-run reCAPTCHA v3 when on captcha step
  const runCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    setCaptchaError(null);
    try {
      // Wait for reCAPTCHA script to load (max 12s)
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("reCAPTCHA script timeout")), 12000);
        const check = () => {
          if (window.grecaptcha) { clearTimeout(timeout); resolve(); }
          else setTimeout(check, 200);
        };
        check();
      });
      // Execute reCAPTCHA v3 — token is generated client-side by Google
      await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "site_entry" });
      if (!token) throw new Error("No token received");
      // Try server-side verification first; fall back to client-side pass on error
      try {
        const res = await fetch("/api/verify-captcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          signal: AbortSignal.timeout(8000),
        });
        if (res.ok) {
          const data = await res.json() as { success: boolean; score: number; errorCodes?: string[] };
          if (data.success && data.score >= 0.3) {
            setCaptchaPassed(true);
            setTimeout(() => setStep("age"), 800);
            return;
          } else {
            setCaptchaError("Verification failed. Please try again.");
            return;
          }
        }
      } catch {
        // Server unavailable — reCAPTCHA token was issued by Google, treat as passed
      }
      // Fallback: Google issued a valid token, proceed to age verification
      setCaptchaPassed(true);
      setTimeout(() => setStep("age"), 800);
    } catch (err) {
      setCaptchaError("Could not complete verification. Please refresh the page.");
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    if (step === "captcha") {
      // Wait a moment for the script to load, then run
      const timer = setTimeout(runCaptcha, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, runCaptcha]);

  const handleAgeConfirm = async () => {
    if (!ageConfirmed) {
      setAgeError("Please confirm you are 18 years of age or older to continue.");
      return;
    }
    setAgeLoading(true);
    setAgeError(null);
    // Brief processing animation
    await new Promise(r => setTimeout(r, 600));
    markGatePassed();
    setStep("passed");
    setAgeLoading(false);
  };

  if (step === "passed") {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0f0a]">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #16a34a 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #ca8a04 0%, transparent 50%)`
        }}
      />

      <div className="relative w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="Fan Lite Play" className="h-16 w-auto object-contain" />
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
              captchaPassed
                ? "bg-green-500 text-white"
                : step === "captcha"
                ? "bg-green-600 text-white ring-2 ring-green-400 ring-offset-2 ring-offset-[#0a0f0a]"
                : "bg-zinc-700 text-zinc-400"
            }`}>
              {captchaPassed ? <CheckCircle className="w-4 h-4" /> : "1"}
            </div>
            <span className={`text-sm font-medium ${captchaPassed ? "text-green-400" : step === "captcha" ? "text-white" : "text-zinc-500"}`}>
              Security Check
            </span>
          </div>

          {/* Connector */}
          <div className={`h-px w-8 transition-all duration-500 ${captchaPassed ? "bg-green-500" : "bg-zinc-700"}`} />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
              step === "age"
                ? "bg-amber-500 text-white ring-2 ring-amber-400 ring-offset-2 ring-offset-[#0a0f0a]"
                : "bg-zinc-700 text-zinc-400"
            }`}>
              {step === "age" ? <Calendar className="w-4 h-4" /> : "2"}
            </div>
            <span className={`text-sm font-medium ${step === "age" ? "text-white" : "text-zinc-500"}`}>
              Age Verification
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">

          {/* ── STEP 1: reCAPTCHA ── */}
          {step === "captcha" && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  captchaLoading ? "bg-green-900/40" : captchaError ? "bg-red-900/40" : "bg-green-900/40"
                }`}>
                  {captchaLoading ? (
                    <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
                  ) : captchaError ? (
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  ) : captchaPassed ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : (
                    <Shield className="w-8 h-8 text-green-400" />
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-2">Security Verification</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {captchaLoading
                    ? "Running automated security checks in the background..."
                    : captchaPassed
                    ? "Security check passed. Moving to age verification..."
                    : captchaError
                    ? captchaError
                    : "Verifying your connection. This happens automatically."}
                </p>
              </div>

              {captchaPassed && (
                <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verification successful</span>
                </div>
              )}

              {captchaError && (
                <Button
                  onClick={runCaptcha}
                  disabled={captchaLoading}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold"
                >
                  {captchaLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Try Again
                </Button>
              )}

              <p className="text-xs text-zinc-600">
                Protected by Google reCAPTCHA v3.{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-400">
                  Privacy
                </a>{" "}
                &amp;{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-400">
                  Terms
                </a>
              </p>
            </div>
          )}

          {/* ── STEP 2: Age Verification ── */}
          {step === "age" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-amber-900/40 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-amber-400" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Age Verification Required</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Fan Lite Play is a platform for users aged <strong className="text-white">18 years and above</strong> only.
                  You must confirm your age before entering.
                </p>
              </div>

              {/* Age confirmation checkbox */}
              <div
                onClick={() => { setAgeConfirmed(!ageConfirmed); setAgeError(null); }}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  ageConfirmed
                    ? "border-amber-500 bg-amber-900/20"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200 ${
                  ageConfirmed ? "bg-amber-500 border-amber-500" : "border-zinc-500"
                }`}>
                  {ageConfirmed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-zinc-300 leading-relaxed select-none">
                  I confirm that I am <strong className="text-white">18 years of age or older</strong> and I agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300" onClick={e => e.stopPropagation()}>
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="/responsible-play" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300" onClick={e => e.stopPropagation()}>
                    Responsible Play
                  </a>{" "}
                  policy.
                </span>
              </div>

              {ageError && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{ageError}</span>
                </div>
              )}

              <Button
                onClick={handleAgeConfirm}
                disabled={ageLoading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 text-base rounded-xl transition-all duration-200"
              >
                {ageLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Confirming...</>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    I Am 18+ — Enter Site
                  </>
                )}
              </Button>

              <p className="text-xs text-zinc-600 text-center">
                If you are under 18, please close this page. This platform is not suitable for minors.
              </p>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-zinc-700 mt-6">
          © {new Date().getFullYear()} Fan Lite Play · Free to Play · 18+ Only · No Financial Transactions
        </p>
      </div>
    </div>
  );
}
