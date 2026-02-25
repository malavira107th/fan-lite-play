import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  UserPlus, Search, Layers, Eye, TrendingUp, BarChart3,
  ArrowRight, CheckCircle2, Info
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create a Free Account",
    desc: "Register with your name, email, and a password. Your account is free and gives you full access to all challenges and matches on the platform. You must be 18 years of age or older to register.",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse Upcoming Matches",
    desc: "View the list of upcoming cricket matches on the platform. Each match has a dedicated player pool curated by our admin team, with players assigned credit values based on their recent form and role.",
  },
  {
    number: "03",
    icon: Layers,
    title: "Join a Challenge and Build Your Team",
    desc: "Select a challenge for a match and build your team of exactly 11 players. You must stay within a 100-credit budget and include at least one wicket-keeper, two batsmen, two bowlers, and one all-rounder. You can submit up to three different team entries per challenge.",
  },
  {
    number: "04",
    icon: Eye,
    title: "Pick Your Captain and Vice-Captain",
    desc: "Every team requires a captain and a vice-captain. Your captain earns 2× the points scored by that player. Your vice-captain earns 1.5× points. Choosing the right captain is one of the most important strategic decisions in the game.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Watch the Match and Track Points",
    desc: "As the match is played, our admin team enters player performance data. Points are calculated based on runs scored, wickets taken, catches, stumpings, run-outs, and other performance metrics.",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Check the Leaderboard",
    desc: "Once the match is complete and all performance data has been entered, your final score is calculated and your rank on the challenge leaderboard is confirmed. The leaderboard shows all participants ranked by total points.",
  },
];

const pointsTable = [
  { action: "Run scored", points: "+1 per run" },
  { action: "Boundary (4)", points: "+1 bonus" },
  { action: "Six (6)", points: "+2 bonus" },
  { action: "Half-century (50+ runs)", points: "+8 bonus" },
  { action: "Century (100+ runs)", points: "+16 bonus" },
  { action: "Wicket taken", points: "+25 per wicket" },
  { action: "3-wicket haul", points: "+4 bonus" },
  { action: "5-wicket haul", points: "+8 bonus" },
  { action: "Maiden over", points: "+4 per over" },
  { action: "Catch", points: "+8 per catch" },
  { action: "Stumping", points: "+12" },
  { action: "Run-out (direct)", points: "+12" },
  { action: "Run-out (assist)", points: "+6" },
  { action: "Duck (0 runs, batsman)", points: "-2" },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1400&q=80&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.08 0.012 155 / 0.75), oklch(0.08 0.012 155))" }} />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">How It Works</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            From Sign-Up to Leaderboard
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Fan Lite Play is designed to be simple to start and rewarding to master. Here is a complete guide to how the platform works.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 border-t border-border/40">
        <div className="container max-w-4xl mx-auto">
          <div className="space-y-10">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border/50 mt-3 min-h-[2.5rem]" />
                  )}
                </div>
                <div className="pb-4">
                  <div className="text-xs font-bold text-primary/60 tracking-widest mb-1">STEP {step.number}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points system */}
      <section className="py-20 border-t border-border/40" style={{ background: "oklch(0.12 0.018 155)" }}>
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Scoring System</div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              How Points Are Calculated
            </h2>
            <p className="text-muted-foreground">
              Points are based entirely on real player performance during the match.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 overflow-hidden">
            <div className="grid grid-cols-2 bg-secondary/60 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Player Action</span>
              <span className="text-right">Points</span>
            </div>
            {pointsTable.map((row, i) => (
              <div
                key={row.action}
                className={`grid grid-cols-2 px-5 py-3 text-sm border-t border-border/40 ${i % 2 === 0 ? "bg-card/40" : "bg-card/20"}`}
              >
                <span className="text-foreground">{row.action}</span>
                <span className="text-right font-medium text-primary">{row.points}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 flex gap-3">
            <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Captain earns <strong className="text-foreground">2×</strong> the points for all actions. Vice-captain earns <strong className="text-foreground">1.5×</strong>. Points are entered by our admin team after the match concludes.
            </p>
          </div>
        </div>
      </section>

      {/* Team rules */}
      <section className="py-20 border-t border-border/40">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Team Rules</div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Team Selection Rules
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Exactly 11 players per team",
              "Maximum 100 credits per team",
              "At least 1 wicket-keeper",
              "At least 2 batsmen",
              "At least 2 bowlers",
              "At least 1 all-rounder",
              "1 captain (2× points)",
              "1 vice-captain (1.5× points)",
              "Up to 3 team entries per challenge",
              "Teams locked at match start",
            ].map((rule) => (
              <div key={rule} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-foreground">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border/40 text-center" style={{ background: "oklch(0.12 0.018 155)" }}>
        <div className="container max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Play?
          </h2>
          <p className="text-muted-foreground mb-7">
            Create a free account and join your first challenge today. Fan Lite Play is open to cricket fans aged 18 and above.
          </p>
          <Link href="/register">
            <Button size="lg" className="gap-2 shadow-xl shadow-primary/25 px-8 h-12">
              Start Playing Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
