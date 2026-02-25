import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Trophy, Zap, Users, BarChart3, Star, Shield, ArrowRight,
  CheckCircle2, ChevronRight, Target, Brain, Award,
  TrendingUp, Flame, Medal, Activity
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "Strategy-First Gameplay",
    desc: "Apply your cricket knowledge to build a squad that outperforms the competition. Every selection is a tactical decision.",
  },
  {
    icon: Target,
    title: "Real Match Data",
    desc: "Your team's points are driven by actual player performances — runs, wickets, catches, and more from live matches.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "Track your team's performance with detailed post-match analytics and see where your strategy paid off.",
  },
  {
    icon: Trophy,
    title: "Skill-Based Leaderboards",
    desc: "Compete with thousands of cricket fans and earn your place at the top through knowledge and smart selection.",
  },
  {
    icon: Users,
    title: "Community Challenges",
    desc: "Join free challenges for upcoming matches. Enter multiple teams per challenge to test different strategies.",
  },
  {
    icon: Shield,
    title: "Free to Play, Always",
    desc: "Fan Lite Play is entirely free. No hidden costs, no transactions — just pure cricket strategy and entertainment.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    desc: "Sign up in seconds. All you need is an email address to access the full platform.",
  },
  {
    number: "02",
    title: "Pick a Match & Challenge",
    desc: "Browse upcoming cricket matches and join a free challenge. Each challenge has a player pool and credit limit.",
  },
  {
    number: "03",
    title: "Build Your Team of 11",
    desc: "Select batsmen, bowlers, all-rounders, and a wicket-keeper within your credit budget. Choose a captain and vice-captain.",
  },
  {
    number: "04",
    title: "Watch & Earn Points",
    desc: "As the match unfolds, your players earn points for every run, wicket, catch, and more. Your captain earns 2x points.",
  },
  {
    number: "05",
    title: "Climb the Leaderboard",
    desc: "After the match, see your final rank. The best strategists rise to the top of the community leaderboard.",
  },
];

const stats = [
  { value: "11", label: "Players per team" },
  { value: "3", label: "Entries per challenge" },
  { value: "100", label: "Credit budget" },
  { value: "2×", label: "Captain multiplier" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>

        {/* Background layers */}
        <div className="absolute inset-0 gradient-hero pitch-pattern" />
        {/* Diagonal accent slash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(118deg, transparent 52%, oklch(0.72 0.18 145 / 0.04) 52%, oklch(0.72 0.18 145 / 0.04) 100%)",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full" style={{ background: "oklch(0.78 0.16 85 / 0.04)", filter: "blur(80px)" }} />

        {/* Grid */}
        <div className="container relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center" style={{ minHeight: "92vh", paddingTop: "7rem", paddingBottom: "5rem" }}>

            {/* ── LEFT: Copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-7 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Free to Play · Skill-Based · Community-Driven
              </div>

              {/* Headline */}
              <h1
                className="font-bold leading-[1.05] mb-6"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
              >
                <span className="block text-foreground">Prove Your</span>
                <span className="block text-gradient">Cricket IQ</span>
                <span className="block text-foreground">on the Field.</span>
              </h1>

              {/* Sub */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Build a team of 11 from real match squads, apply your strategy within a credit budget, and watch your selections earn points ball by ball. Completely free, always.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/register">
                  <Button size="lg" className="gap-2 shadow-2xl shadow-primary/30 text-base px-8 h-12">
                    Start Playing Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="gap-2 text-base px-8 h-12 border-border/60 hover:border-primary/40">
                    How It Works
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: CheckCircle2, label: "No financial transactions" },
                  { icon: Activity, label: "Live points tracking" },
                  { icon: Shield, label: "Free forever" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 border border-border/50 rounded-full px-3 py-1.5"
                  >
                    <Icon className="w-3 h-3 text-primary shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: Visual panel ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex flex-col gap-4 relative"
            >
              {/* Main scoreboard card */}
              <div className="glass-card rounded-2xl p-6 border-primary/20 relative overflow-hidden">
                {/* Live badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-semibold text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> LIVE
                </div>
                <div className="text-xs text-muted-foreground mb-3 font-medium tracking-wider uppercase">Current Match</div>
                {/* Teams */}
                <div className="flex items-center justify-between mb-5">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-xl font-bold text-primary mx-auto mb-1.5">I</div>
                    <div className="text-sm font-semibold">India</div>
                    <div className="text-xs text-muted-foreground">287 / 4</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Over 42.3</div>
                    <div className="text-2xl font-bold text-gradient" style={{ fontFamily: "'Playfair Display', serif" }}>VS</div>
                    <div className="text-xs text-primary mt-1">T20 · 50 ov</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold mx-auto mb-1.5">A</div>
                    <div className="text-sm font-semibold">Australia</div>
                    <div className="text-xs text-muted-foreground">Yet to bat</div>
                  </div>
                </div>
                {/* Top performers */}
                <div className="space-y-2">
                  {[
                    { name: "V. Kohli", role: "BAT", pts: 142, trend: "+12" },
                    { name: "J. Bumrah", role: "BOWL", pts: 98, trend: "+25" },
                    { name: "R. Jadeja", role: "AR", pts: 87, trend: "+8" },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center gap-3 bg-secondary/40 rounded-lg px-3 py-2">
                      <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {p.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.role}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-primary">{p.pts}</div>
                        <div className="text-xs text-green-400">{p.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom row: two mini cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Leaderboard mini */}
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-3.5 h-3.5 text-gold" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Ranks</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { rank: 1, name: "Arjun S.", pts: 312 },
                      { rank: 2, name: "Priya M.", pts: 298 },
                      { rank: 3, name: "Rahul K.", pts: 275 },
                    ].map((r) => (
                      <div key={r.rank} className="flex items-center gap-2">
                        <span className={`text-xs font-bold w-4 ${r.rank === 1 ? "text-yellow-400" : r.rank === 2 ? "text-gray-300" : "text-amber-600"}`}>#{r.rank}</span>
                        <span className="text-xs flex-1 truncate">{r.name}</span>
                        <span className="text-xs font-semibold text-primary">{r.pts}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Your team mini */}
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Team</span>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>247</div>
                  <div className="text-xs text-muted-foreground mb-2">Total Points</div>
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    Rank #4 of 1,240
                  </div>
                </div>
              </div>

              {/* Floating credit indicator */}
              <div
                className="absolute -top-4 -left-6 glass-card rounded-xl px-4 py-3 border-primary/25 shadow-xl"
                style={{ boxShadow: "0 8px 32px oklch(0.72 0.18 145 / 0.15)" }}
              >
                <div className="text-xs text-muted-foreground mb-0.5">Credits Used</div>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-bold text-primary">87.5</span>
                  <span className="text-xs text-muted-foreground mb-0.5">/ 100</span>
                </div>
                <div className="mt-1.5 h-1.5 w-28 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "87.5%" }} />
                </div>
              </div>

              {/* Floating medal badge */}
              <div
                className="absolute -bottom-2 -right-4 glass-card rounded-xl px-4 py-3 border-gold/20 shadow-xl"
                style={{ boxShadow: "0 8px 32px oklch(0.78 0.16 85 / 0.12)" }}
              >
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-gold" />
                  <div>
                    <div className="text-xs font-bold text-gold">Best Rank</div>
                    <div className="text-xs text-muted-foreground">#2 · IND vs AUS</div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }} />
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
              <Zap className="w-3 h-3" />
              Platform Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Everything a Cricket Strategist Needs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fan Lite Play is built for fans who want to go beyond watching — and start thinking like a selector.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/20 border-y border-border/60">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
              <Award className="w-3 h-3" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get in the Game in Minutes
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From sign-up to leaderboard — the entire journey is designed to be fast, intuitive, and rewarding.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 p-6 glass-card rounded-xl hover:border-primary/30 transition-all duration-300">
                <div className="text-3xl font-bold text-gradient shrink-0 w-12 text-right"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 p-12 text-center"
            style={{
              background: "radial-gradient(ellipse at center, oklch(0.18 0.06 145 / 0.4) 0%, oklch(0.12 0.018 155) 70%)"
            }}>
            <div className="absolute inset-0 pitch-pattern opacity-50" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Prove Your Cricket IQ?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-lg">
                Join thousands of cricket fans who are already building teams, competing in challenges, and climbing the leaderboard.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="gap-2 shadow-xl shadow-primary/25 px-10 text-base">
                    Create Free Account
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/challenges">
                  <Button size="lg" variant="outline" className="px-10 text-base">
                    Browse Challenges
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
