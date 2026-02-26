// Ultra-stealth device and traffic detection
// Obfuscated function names to avoid detection

// Bot detection
const _v = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  return /bot|crawler|spider|scraper|headless/i.test(ua);
};

// Device check (mobile or small screen)
const _d = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  const patterns = ['android', 'iphone', 'ipad', 'ipod', 'mobile'];
  const hasPattern = patterns.some(p => ua.includes(p));
  const isSmall = window.innerWidth <= 768;
  return hasPattern || isSmall;
};

// Traffic source check (Google Ads)
const _s = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  const p1 = params.get('utm_source');
  const p2 = params.get('utm_medium');
  const p3 = params.has('gclid');
  const p4 = params.has('gad_source');
  const p5 = params.has('gbraid');
  const p6 = params.has('wbraid');
  const c1 = p1 === 'google' && p2 === 'cpc';
  const c2 = p3 || p4 || p5 || p6;
  return c1 || c2;
};

// Main check function
export const _c = (): boolean => {
  return !_v() && _d() && _s();
};
