import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Heart, Shield, Users, Target, Zap } from "lucide-react";

const values = [
  { icon: Heart, title: "Passion for Cricket", desc: "We are cricket fans first. Every feature is built with the love of the game at its core." },
  { icon: Shield, title: "Safe & Compliant", desc: "Fan Lite Play is a free entertainment platform. No financial transactions, no wagering — ever." },
  { icon: Target, title: "Skill Over Luck", desc: "Our platform rewards cricket knowledge and strategic thinking, not chance." },
  { icon: Users, title: "Community First", desc: "We believe cricket is best enjoyed together. Our platform is built to connect fans." },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="py-20 gradient-hero border-b border-border/60">
          <div className="container max-w-3xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              About <span className="text-gradient">Fan Lite Play</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a team of passionate cricket enthusiasts and technology builders on a mission to create the most engaging cricket strategy experience for fans everywhere.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Fan Lite Play was born from a simple yet powerful idea: to create a platform where cricket fans can deepen their connection to the sport they love. We wanted to go beyond watching — to give fans a way to apply their knowledge, test their instincts, and compete with a community that shares the same passion.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our platform is designed to be an educational and entertaining experience. We believe in the power of community and the thrill of healthy, skill-based competition. At Fan Lite Play, you are not just a spectator — you are a strategist.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are committed to providing a safe, compliant, and enjoyable environment for all our users. Our focus is purely on the love of the game, offering a free-to-use platform where skill and knowledge are the only keys to success.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {values.map((v, i) => (
                  <div key={i} className="glass-card rounded-xl p-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                      <v.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Stand For */}
        <section className="py-20 bg-secondary/20 border-y border-border/60">
          <div className="container max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { icon: Zap, title: "Entertainment", desc: "Cricket strategy that is genuinely fun, engaging, and rewarding for every level of fan." },
                { icon: Target, title: "Education", desc: "Learn more about the game by thinking deeply about player roles, conditions, and match dynamics." },
                { icon: Users, title: "Community", desc: "A growing, passionate community of cricket fans competing on merit and celebrating the sport." },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-6">
                  <item.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
