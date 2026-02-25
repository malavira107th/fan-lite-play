import { Link } from "wouter";
import { Trophy, Mail, MapPin, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/40 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Trophy className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-gradient">Fan Lite</span>
                <span className="text-foreground"> Play</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The ultimate cricket strategy platform. Build your dream team, compete on leaderboards, and celebrate the game you love.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              {[
                { href: "/challenges", label: "Challenges" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/dashboard", label: "My Dashboard" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/terms", label: "Terms of Use" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a href="mailto:support@fanliteplay.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  support@fanliteplay.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <address className="text-sm text-muted-foreground not-italic leading-relaxed">
                  F-73, DLF Promenade Mall,<br />
                  Nelson Mandela Marg,<br />
                  Vasant Kunj, New Delhi,<br />
                  Delhi – 110070, India
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} Fan Lite Play. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Fan Lite Play is a free-to-play cricket strategy platform for entertainment purposes only. No financial transactions are involved.
          </p>
        </div>
      </div>
    </footer>
  );
}
