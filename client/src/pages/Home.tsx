import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Brain, Target, BarChart3, Trophy, Users, Shield,
  ArrowRight, ChevronRight, CheckCircle2, Star,
  UserPlus, Search, Layers, Eye, TrendingUp
} from "lucide-react";

/* ─── Feature cards ─── */
const features = [
  {
    icon: Brain,
    title: "Strategy-First Gameplay",
    desc: "Every selection is a tactical decision. Apply your cricket knowledge to build a squad that outperforms the competition.",
  },
  {
    icon: Target,
    title: "Real Player Performances",
    desc: "Points are calculated from actual match stats — runs, wickets, catches, and more. No guesswork, just cricket.",
  },
  {
    icon: BarChart3,
    title: "Post-Match Analytics",
    desc: "Review your team's performance after every match with a clear breakdown of how each player contributed.",
  },
  {
    icon: Trophy,
    title: "Skill-Based Leaderboards",
    desc: "Earn your rank through cricket knowledge and smart selection. The best strategists rise to the top.",
  },
  {
    icon: Users,
    title: "Community Challenges",
    desc: "Join free challenges for upcoming matches. Enter up to three teams per challenge to test different strategies.",
  },
  {
    icon: Shield,
    title: "Always Free",
    desc: "Fan Lite Play is entirely free to use. No hidden costs, no transactions — just pure cricket strategy.",
  },
];

/* ─── How it works steps ─── */
const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    desc: "Sign up with your email in under a minute. Your account gives you access to all matches and challenges.",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse Upcoming Matches",
    desc: "Pick a live or upcoming cricket match and join a challenge. Each challenge has its own player pool.",
  },
  {
    number: "03",
    icon: Layers,
    title: "Build Your Team of 11",
    desc: "Select batsmen, bowlers, all-rounders, and a wicket-keeper within a 100-credit budget. Pick your captain.",
  },
  {
    number: "04",
    icon: Eye,
    title: "Watch the Match",
    desc: "As the match plays out, your players earn points for every run, wicket, catch, and fielding contribution.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Check Your Rank",
    desc: "After the match, your final score is calculated and your rank on the challenge leaderboard is confirmed.",
  },
];

/* ─── Why Fan Lite Play ─── */
const whyPoints = [
  "No financial transactions of any kind",
  "Free to join every challenge",
  "Designed for cricket fans aged 18+",
  "Points based on real match performance",
  "Multiple team entries per challenge",
  "Detailed post-match performance review",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* ══════════════════════════════════════
          HERO — Full-width image background
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&q=80&auto=format&fit=crop')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, oklch(0.08 0.012 155 / 0.97) 0%, oklch(0.08 0.012 155 / 0.85) 55%, oklch(0.08 0.012 155 / 0.55) 100%)" }} />

        {/* Content */}
        <div className="container relative z-10 flex items-center" style={{ minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
          <div className="max-w-2xl">
            <div className="animate-fade-in-up">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-7 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Free · Skill-Based · 18+ Only
              </div>

              {/* Headline */}
              <h1
                className="font-bold leading-[1.08] mb-6 text-foreground"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
              >
                Build Your Cricket XI.<br />
                <span className="text-gradient">Prove Your Strategy.</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Fan Lite Play is a free cricket strategy platform for fans aged 18 and above. Select 11 players from real match squads, apply your cricket knowledge, and see how your team performs on the leaderboard.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/register">
                  <Button size="lg" className="gap-2 shadow-xl shadow-primary/25 text-base px-8 h-12">
                    Start Playing Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="gap-2 text-base px-8 h-12 border-border/60 bg-background/20 hover:bg-background/40 backdrop-blur-sm">
                    How It Works
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  "No financial transactions",
                  "No real money involved",
                  "Free forever",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background/30 backdrop-blur-sm border border-border/40 rounded-full px-3 py-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT IS FAN LITE PLAY — Intro strip
      ══════════════════════════════════════ */}
      <section className="py-20 border-y border-border/40" style={{ background: "oklch(0.12 0.018 155)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80&auto=format&fit=crop"
                alt="Cricket match in progress"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Text */}
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">What is Fan Lite Play?</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                A Cricket Strategy Game for Real Fans
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Fan Lite Play is a free-to-use platform where cricket fans build virtual teams from real match squads and compete on performance-based leaderboards. It is a game of knowledge, not luck — and it costs nothing to play.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-7">
                There are no financial transactions, no real money, and no wagering of any kind. This platform is purely for entertainment and cricket education, available to users aged 18 and above.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {whyPoints.map((pt) => (
                  <div key={pt} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Platform Features</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Everything a Cricket Strategist Needs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fan Lite Play is built for fans who want to go beyond watching — and start thinking like a selector.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border/60 bg-card/60 p-6 hover:border-primary/30 hover:bg-card transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS — Image + steps
      ══════════════════════════════════════ */}
      <section className="py-24 border-t border-border/40" style={{ background: "oklch(0.12 0.018 155)" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Simple Process</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get in the Game in Minutes
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From sign-up to leaderboard — the entire journey is designed to be fast, intuitive, and rewarding.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="flex gap-5 items-start animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-8 bg-border/50 mt-2" />
                    )}
                  </div>
                  <div className="pb-2">
                    <div className="text-xs font-bold text-primary/60 mb-1 tracking-widest">{step.number}</div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80&auto=format&fit=crop"
                alt="Cricket fans watching a match"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-2.5">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Skill-based. Free. For cricket fans.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM BUILDER PREVIEW — static visual
      ══════════════════════════════════════ */}
      <section className="py-24 border-t border-border/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80&auto=format&fit=crop"
                alt="Cricket stadium aerial view"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Team Builder</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Pick 11. Stay Within Budget. Outsmart Everyone.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Each challenge gives you a pool of real players and a 100-credit budget. You must select exactly 11 players — including at least one wicket-keeper, two batsmen, two bowlers, and one all-rounder.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-7">
                Choose a captain (who earns 2× points) and a vice-captain (1.5× points). Your strategy determines your rank — not chance.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Players per team", value: "11" },
                  { label: "Credit budget", value: "100" },
                  { label: "Captain multiplier", value: "2×" },
                  { label: "Max entries", value: "3 teams" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border/60 bg-card/60 p-4">
                    <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — Final call to action
      ══════════════════════════════════════ */}
      <section className="py-24 border-t border-border/40 relative overflow-hidden" style={{ background: "oklch(0.12 0.018 155)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.72 0.18 145 / 0.07), transparent)" }} />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Prove Your Cricket IQ?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Create a free account, join a challenge, and start building your team. Fan Lite Play is open to cricket fans aged 18 and above.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2 shadow-xl shadow-primary/25 text-base px-8 h-12">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="gap-2 text-base px-8 h-12 border-border/60">
                Learn More
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
