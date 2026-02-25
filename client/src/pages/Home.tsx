import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Trophy, Zap, Users, BarChart3, Star, Shield, ArrowRight,
  CheckCircle2, ChevronRight, Target, Brain, Award
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

      {/* Hero */}
      <section className="gradient-hero pitch-pattern pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-primary/8 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <Star className="w-3 h-3" />
              Free to Play · Skill-Based · Community-Driven
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              The Ultimate{" "}
              <span className="text-gradient">Cricket Strategy</span>{" "}
              Arena
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Build your dream team, compete in skill-based challenges, and prove your cricket knowledge on performance-driven leaderboards. Completely free, always.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2 shadow-xl shadow-primary/25 text-base px-8">
                  Start Playing Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  How It Works
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                "No financial transactions",
                "Instant team creation",
                "Live points tracking",
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
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
