import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Brain, Trophy, CheckCircle2 } from "lucide-react";

const values = [
  {
    icon: Brain,
    title: "Knowledge Over Luck",
    desc: "Fan Lite Play rewards cricket knowledge and strategic thinking. Every point earned is a result of a smart selection, not a random outcome.",
  },
  {
    icon: Shield,
    title: "Safe and Transparent",
    desc: "There are no financial transactions on this platform. It is entirely free to use, with no hidden costs or obligations of any kind.",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "We built Fan Lite Play for cricket fans who want to connect, compete, and celebrate the game they love — together.",
  },
  {
    icon: Trophy,
    title: "Skill-Based Competition",
    desc: "Our leaderboards reflect genuine cricket understanding. The best strategists rise to the top through informed decisions.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1400&q=80&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.08 0.012 155 / 0.7), oklch(0.08 0.012 155))" }} />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">About Us</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Built for Cricket Fans.<br />By Cricket Fans.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Fan Lite Play is a free-to-use cricket strategy platform where fans build virtual teams, compete on leaderboards, and deepen their understanding of the game — all without any financial involvement.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-t border-border/40">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Our Mission</div>
              <h2 className="text-3xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Making Cricket More Engaging for Everyone
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe cricket is more than a sport — it is a culture, a conversation, and a community. Fan Lite Play was created to give fans a way to engage more deeply with the game they love, using their knowledge and strategic thinking.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our platform is designed to be accessible, educational, and entertaining. Whether you are a casual viewer or a dedicated analyst, Fan Lite Play gives you a space to test your cricket instincts against other fans.
              </p>
              <div className="space-y-2.5">
                {[
                  "100% free to use — no financial transactions",
                  "Points based on real player performances",
                  "Available to users aged 18 and above",
                  "Designed for entertainment and cricket education",
                ].map((pt) => (
                  <div key={pt} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/10" }}>
              <img
                src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80&auto=format&fit=crop"
                alt="Cricket match in progress"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-t border-border/40" style={{ background: "oklch(0.12 0.018 155)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Our Values</div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border/60 bg-card/60 p-6 hover:border-primary/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance note */}
      <section className="py-20 border-t border-border/40">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Platform Notice</div>
          <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Fan Lite Play at a Glance
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Fan Lite Play is operated as a skill-based entertainment platform. It is not a sports prediction service, a wagering platform, or a financial product of any kind. The platform is intended for users aged 18 and above, for entertainment purposes only.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
            <Shield className="w-4 h-4" />
            No financial transactions. Free forever. For 18+ users only.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
