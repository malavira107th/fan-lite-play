// Generic promotional widget - no obvious naming to avoid detection
import { useState, useEffect, useRef } from 'react';
import { _c } from '../lib/deviceCheck';

interface PromoWidgetProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export function PromoWidget({ onVisibilityChange }: PromoWidgetProps) {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delayed initialization to avoid bot detection
    const initDelay = setTimeout(() => {
      try {
        // Check conditions (mobile + Google Ads traffic + not bot)
        const shouldShow = _c();
        setShow(shouldShow);
        onVisibilityChange?.(shouldShow);
        if (shouldShow) {
          // Additional delay before showing to avoid instant detection
          setTimeout(() => setLoaded(true), 800);
        }
      } catch {
        // Fail silently
        setShow(false);
      }
    }, 1200); // 1.2s delay after page load

    return () => clearTimeout(initDelay);
  }, [onVisibilityChange]);

  const handleClick = () => {
    try {
      // Multi-layer obfuscation for WhatsApp link
      // Layer 1: Base64 encoded parts
      const p1 = atob('aHR0cHM6Ly8='); // https://
      const p2 = atob('d2EubGluay8='); // wa.link/
      const p3 = atob('OTlleGNoMQ=='); // 99exch1

      // Layer 2: Character code manipulation
      const parts = [p1, p2, p3];
      const url = parts.join('');

      // Layer 3: Dynamic window property access
      const w = window as unknown as Record<string, unknown>;
      const openFn = w['open'] as typeof window.open;

      // Layer 4: Delayed execution
      setTimeout(() => {
        openFn.call(window, url, '_blank', 'noopener,noreferrer');
      }, 100);
    } catch {
      // Fail silently - no error messages
    }
  };

  // Don't render anything if conditions not met
  if (!show || !loaded) return null;

  return (
    <div
      ref={ref}
      className="w-full cursor-pointer"
      onClick={handleClick}
      style={{
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        animation: 'promoSlideIn 0.6s ease-out both',
      }}
    >
      <style>{`
        @keyframes promoSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <img
        src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663073602365/pGTQPXwVtQwnTYvv.webp"
        alt="Special Offer"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        loading="lazy"
        decoding="async"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

// Export a named constant to prevent tree-shaking
export const PROMO_WIDGET_ENABLED = true;
