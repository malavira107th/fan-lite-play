import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Users, Clock, HeartHandshake, AlertTriangle, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

const principles = [
  {
    icon: ShieldCheck,
    title: "Free to Play, Always",
    body:
      "Fan Lite Play does not involve any financial transactions of any kind. There is no entry fee, no payment required to join a challenge, and no monetary reward of any kind. Every feature on this platform is completely free to use.",
  },
  {
    icon: Users,
    title: "18+ Only",
    body:
      "This platform is strictly for users aged 18 years and above. We ask every user to confirm their age at the point of registration. If we become aware that a user is under 18, their account will be suspended immediately.",
  },
  {
    icon: Clock,
    title: "Play in Moderation",
    body:
      "Fan Lite Play is designed for entertainment and cricket education. We encourage all users to engage with the platform in a balanced way — it should be a fun addition to your cricket experience, not a source of stress or compulsion.",
  },
  {
    icon: HeartHandshake,
    title: "Skill Over Chance",
    body:
      "Every outcome on Fan Lite Play is determined entirely by your cricket knowledge and strategy. There is no element of chance, no randomness, and no wagering. Your rank reflects your understanding of the game — nothing else.",
  },
];

const selfCheckItems = [
  "Am I spending more time on this platform than I intended?",
  "Am I neglecting other responsibilities to participate in challenges?",
  "Am I feeling frustrated or distressed when my team does not perform well?",
  "Am I using this platform as an escape from real-life problems?",
];

export default function ResponsiblePlay() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1400&q=60&auto=format&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.08 0.012 155 / 0.95), oklch(0.08 0.012 155 / 1))" }} />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            Our Commitment
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Responsible Play
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Fan Lite Play is a free, skill-based cricket strategy platform. We are committed to ensuring that every user has a safe, healthy, and enjoyable experience on our platform.
          </p>
        </div>
      </section>

      {/* Core principles */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto">
          <h2
            className="text-2xl font-bold text-foreground mb-10 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Core Principles
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border/60 bg-card/60 p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What this platform is NOT */}
      <section className="py-16 border-t border-border/40">
        <div className="container max-w-3xl mx-auto">
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  What Fan Lite Play Is Not
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Fan Lite Play is <strong className="text-foreground">not a wagering, betting, or gambling platform</strong>. No real money is staked, exchanged, or won on this platform under any circumstances.
                  </p>
                  <p>
                    Fan Lite Play is <strong className="text-foreground">not a prediction service</strong>. Users build virtual teams based on their cricket knowledge and strategy — no outcome predictions or financial forecasts are made.
                  </p>
                  <p>
                    Fan Lite Play does <strong className="text-foreground">not offer monetary rewards, prizes, or any financial incentive</strong> of any kind. Leaderboard rankings are for recognition and entertainment purposes only.
                  </p>
                  <p>
                    Fan Lite Play is <strong className="text-foreground">not available to users under the age of 18</strong>. By registering, users confirm they meet the minimum age requirement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Self-check */}
      <section className="py-16 border-t border-border/40">
        <div className="container max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Healthy Engagement Check
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Although Fan Lite Play involves no financial risk, we encourage all users to reflect on their engagement with the platform. If you find yourself answering "yes" to any of the following questions, we encourage you to take a break and speak to someone you trust.
          </p>
          <div className="space-y-3">
            {selfCheckItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/40 px-5 py-4"
              >
                <div className="w-6 h-6 rounded-full border-2 border-border/60 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age verification */}
      <section className="py-16 border-t border-border/40">
        <div className="container max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Age Verification
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fan Lite Play is strictly for users aged 18 years and above. During registration, every user is required to confirm that they meet this age requirement. We reserve the right to suspend or permanently close any account where we have reason to believe the user is under 18.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you are aware of a minor using this platform, please contact us immediately at{" "}
            <a href="mailto:support@fanliteplay.com" className="text-primary hover:underline font-medium">
              support@fanliteplay.com
            </a>{" "}
            and we will take prompt action.
          </p>
        </div>
      </section>

      {/* Contact support */}
      <section className="py-16 border-t border-border/40">
        <div className="container max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Need Help or Have a Concern?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            If you have any concerns about your use of Fan Lite Play, or if you wish to report a potential issue, our support team is here to help. We take all responsible play concerns seriously and will respond promptly.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="mailto:support@fanliteplay.com"
              className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 px-6 py-5 hover:border-primary/40 hover:bg-card/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email Support</p>
                <p className="text-sm font-medium text-foreground">support@fanliteplay.com</p>
              </div>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 px-6 py-5 hover:border-primary/40 hover:bg-card/80 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <HeartHandshake className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Contact Us</p>
                <p className="text-sm font-medium text-foreground">Visit our Contact page</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom disclaimer */}
      <section className="py-10 border-t border-border/40">
        <div className="container max-w-3xl mx-auto">
          <p className="text-xs text-muted-foreground leading-relaxed text-center">
            Fan Lite Play is operated by Fan Lite Play. Registered address: F-73, DLF Promenade Mall, Nelson Mandela Marg, Vasant Kunj, New Delhi, Delhi – 110070, India. This platform is for entertainment and educational purposes only. No financial transactions of any kind take place on this platform. This platform is strictly for users aged 18 and above.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
