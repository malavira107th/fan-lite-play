import { useState } from "react";
import { Shield, CheckCircle, AlertCircle, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import SliderCaptcha from "./SliderCaptcha";



interface SecurityGateProps {
  onPassed: () => void;
}

type Step = "captcha" | "age" | "passed";



export default function SecurityGate({ onPassed }: SecurityGateProps) {
  const [step, setStep] = useState<Step>("captcha");
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [ageLoading, setAgeLoading] = useState(false);

  const handleSliderVerified = () => {
    setCaptchaPassed(true);
    setTimeout(() => setStep("age"), 700);
  };

  const handleAgeConfirm = async () => {
    if (!ageConfirmed) {
      setAgeError("Please confirm you are 18 years of age or older to continue.");
      return;
    }
    setAgeLoading(true);
    setAgeError(null);
    await new Promise(r => setTimeout(r, 600));
    setStep("passed");
    setAgeLoading(false);
  };

  if (step === "passed") {
    onPassed();
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0f0a]">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #16a34a 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #ca8a04 0%, transparent 50%)`,
        }}
      />

      <div className="relative w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img src="/logo.png" alt="Fan Lite Play" width="201" height="112" className="h-16 w-auto object-contain" />
          </picture>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                captchaPassed
                  ? "bg-green-500 text-white"
                  : step === "captcha"
                  ? "bg-green-600 text-white ring-2 ring-green-400 ring-offset-2 ring-offset-[#0a0f0a]"
                  : "bg-zinc-700 text-zinc-400"
              }`}
            >
              {captchaPassed ? <CheckCircle className="w-4 h-4" /> : "1"}
            </div>
            <span
              className={`text-sm font-medium ${
                captchaPassed ? "text-green-400" : step === "captcha" ? "text-white" : "text-zinc-500"
              }`}
            >
              Security Check
            </span>
          </div>

          <div className={`h-px w-8 transition-all duration-500 ${captchaPassed ? "bg-green-500" : "bg-zinc-700"}`} />

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                step === "age"
                  ? "bg-amber-500 text-white ring-2 ring-amber-400 ring-offset-2 ring-offset-[#0a0f0a]"
                  : "bg-zinc-700 text-zinc-400"
              }`}
            >
              {step === "age" ? <Calendar className="w-4 h-4" /> : "2"}
            </div>
            <span className={`text-sm font-medium ${step === "age" ? "text-white" : "text-zinc-500"}`}>
              Age Verification
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">

          {/* ── STEP 1: Custom Slider Captcha ── */}
          {step === "captcha" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-900/40 flex items-center justify-center">
                    {captchaPassed ? (
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    ) : (
                      <Shield className="w-8 h-8 text-green-400" />
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Security Verification</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {captchaPassed
                    ? "Security check passed. Moving to age verification..."
                    : "Slide the button all the way to the right to verify you're human."}
                </p>
              </div>

              {!captchaPassed && (
                <div className="flex justify-center">
                  <SliderCaptcha onVerified={handleSliderVerified} />
                </div>
              )}

              {captchaPassed && (
                <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verification successful</span>
                </div>
              )}
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
                  Fan Lite Play is a platform for users aged{" "}
                  <strong className="text-white">18 years and above</strong> only. You must confirm
                  your age before entering.
                </p>
              </div>

              {/* Age confirmation checkbox */}
              <div
                onClick={() => {
                  setAgeConfirmed(!ageConfirmed);
                  setAgeError(null);
                }}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  ageConfirmed
                    ? "border-amber-500 bg-amber-900/20"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200 ${
                    ageConfirmed ? "bg-amber-500 border-amber-500" : "border-zinc-500"
                  }`}
                >
                  {ageConfirmed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-zinc-300 leading-relaxed select-none">
                  I confirm that I am <strong className="text-white">18 years of age or older</strong>{" "}
                  and I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-amber-400 underline hover:text-amber-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-amber-400 underline hover:text-amber-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>

              {ageError && (
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {ageError}
                </p>
              )}

              <Button
                onClick={handleAgeConfirm}
                disabled={ageLoading}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 text-base"
              >
                {ageLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                I Am 18+ — Enter Site
              </Button>

              <p className="text-xs text-zinc-600 text-center">
                By entering, you confirm you meet the age requirement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
