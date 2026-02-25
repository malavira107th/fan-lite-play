import { Link } from "wouter";
import { Trophy, Mail, MapPin, Twitter, Instagram, Youtube, ShieldCheck } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Footer() {
  const year = new Date().getFullYear();
  const { data: user } = trpc.auth.me.useQuery();

  const platformLinks = [
    { href: "/how-it-works", label: "How It Works", auth: false },
    { href: "/challenges",   label: "Challenges",   auth: true  },
    { href: "/leaderboard",  label: "Leaderboard",  auth: true  },
    { href: "/dashboard",    label: "My Dashboard", auth: true  },
  ].filter(l => !l.auth || !!user);

  const companyLinks = [
    { href: "/about",            label: "About Us"         },
    { href: "/contact",          label: "Contact Us"       },
    { href: "/responsible-play", label: "Responsible Play" },
    { href: "/terms",            label: "Terms of Use"     },
    { href: "/privacy",          label: "Privacy Policy"   },
  ];

  return (
    <footer className="mt-auto" style={{ background: "oklch(0.08 0.012 155)" }}>

      {/* ── 18+ Responsibility Banner ── */}
      <div
        className="border-y border-primary/15"
        style={{ background: "oklch(0.12 0.025 145 / 0.4)" }}
      >
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary/60 text-primary font-black text-sm shrink-0 select-none">
              18+
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              <span className="text-foreground font-medium">For users aged 18 and above only.</span>{" "}
              Fan Lite Play is a free-to-play cricket strategy and knowledge platform intended purely for entertainment. It does not involve any financial transactions, real-money exchange, or wagering of any kind.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="container pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Brand column — wider */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                <Trophy className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                <span className="text-gradient">Fan Lite</span>
                <span className="text-foreground"> Play</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              The ultimate cricket strategy arena. Build your dream XI, outsmart the competition, and prove your cricket knowledge on performance-driven leaderboards — completely free.
            </p>

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/60 border border-border/50 mb-6">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground">
                No financial transactions · Free forever
              </span>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { icon: Twitter,   label: "Twitter"   },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube,   label: "YouTube"   },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-secondary/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Platform links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-5">
              Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:support@fanliteplay.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    support@fanliteplay.com
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <address className="text-sm text-muted-foreground not-italic leading-relaxed">
                    F-73, DLF Promenade Mall,<br />
                    Nelson Mandela Marg,<br />
                    Vasant Kunj, New Delhi,<br />
                    Delhi – 110070, India
                  </address>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-border/40" />

      {/* ── Bottom bar ── */}
      <div className="container py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground order-2 md:order-1">
            © {year} Fan Lite Play. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center order-1 md:order-2 max-w-md">
            Fan Lite Play is a skill-based cricket strategy platform for entertainment purposes only.
            This platform is strictly for users aged 18 and above.
          </p>
          <div className="flex items-center gap-4 order-3">
            <Link href="/terms"            className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            <Link href="/privacy"         className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link href="/responsible-play" className="text-xs text-muted-foreground hover:text-primary transition-colors">Responsible Play</Link>
            <Link href="/contact"          className="text-xs text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
