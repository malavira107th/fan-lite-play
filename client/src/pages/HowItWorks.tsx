import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, Search, Users, TrendingUp, Trophy, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create a Free Account",
    desc: "Sign up with your email and a username. It takes less than a minute and is completely free. No credit card, no hidden requirements.",
  },
  {
    icon: Search,
    number: "02",
    title: "Browse Upcoming Matches",
    desc: "Explore our list of upcoming real-world cricket matches. Filter by format — T20, ODI, or Test — and find the challenge that excites you most.",
  },
  {
    icon: Users,
    number: "03",
    title: "Build Your Team of 11",
    desc: "Select exactly 11 players from the match's player pool. You must include at least one wicket-keeper, three batsmen, three bowlers, and one all-rounder. Each player has a credit value — stay within your budget.",
  },
  {
    icon: Trophy,
    number: "04",
    title: "Choose Your Captain & Vice-Captain",
    desc: "Pick a captain who earns 2× points and a vice-captain who earns 1.5× points. This is where your strategic edge can make the biggest difference.",
  },
  {
    icon: TrendingUp,
    number: "05",
    title: "Watch Points Accumulate",
    desc: "As the live match unfolds, your selected players earn points for every run scored, wicket taken, catch held, stumping made, and more. Your team's total updates in real time.",
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Check Your Rank & Analytics",
    desc: "After the match, view your final rank on the challenge leaderboard and explore detailed performance analytics. Learn from each challenge to sharpen your strategy.",
  },
];

const pointsTable = [
  { action: "Run Scored", points: "+1 per run" },
  { action: "Four Hit", points: "+1 bonus" },
  { action: "Six Hit", points: "+2 bonus" },
  { action: "Half Century (50+ runs)", points: "+8 bonus" },
  { action: "Century (100+ runs)", points: "+16 bonus" },
  { action: "Duck (0 runs, out)", points: "−2" },
  { action: "Wicket Taken", points: "+25 per wicket" },
  { action: "3-Wicket Haul", points: "+4 bonus" },
  { action: "4-Wicket Haul", points: "+8 bonus" },
  { action: "5-Wicket Haul", points: "+16 bonus" },
  { action: "Maiden Over", points: "+8" },
  { action: "Dot Ball", points: "+1" },
  { action: "Catch", points: "+8" },
  { action: "Stumping", points: "+12" },
  { action: "Run Out", points: "+6" },
  { action: "Captain Multiplier", points: "2× total points" },
  { action: "Vice-Captain Multiplier", points: "1.5× total points" },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-20 gradient-hero border-b border-border/60">
          <div className="container max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              How <span className="text-gradient">Fan Lite Play</span> Works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From creating your account to climbing the leaderboard — here is everything you need to know to get started as a cricket strategist.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 p-6 glass-card rounded-xl hover:border-primary/30 transition-all duration-300">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Step {step.number}</div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Points System */}
        <section className="py-20 bg-secondary/20 border-y border-border/60">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Points Scoring System
              </h2>
              <p className="text-muted-foreground">
                Points are calculated automatically based on real player performances after each match.
              </p>
            </div>
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/40">
                    <th className="text-left px-6 py-3 font-semibold text-foreground">Action</th>
                    <th className="text-right px-6 py-3 font-semibold text-foreground">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {pointsTable.map((row, i) => (
                    <tr key={i} className={`border-b border-border/40 ${i % 2 === 0 ? "" : "bg-secondary/20"}`}>
                      <td className="px-6 py-3 text-muted-foreground">{row.action}</td>
                      <td className="px-6 py-3 text-right font-medium text-primary">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container max-w-xl text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Create your free account and join your first challenge today.
            </p>
            <Link href="/register">
              <Button size="lg" className="gap-2 shadow-xl shadow-primary/25 px-10">
                Play for Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
