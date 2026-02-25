import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.72 0.18 145 / 0.06), transparent)" }} />
        <div className="container relative z-10 max-w-2xl mx-auto text-center">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Contact Us</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Have a question, a suggestion, or need help with your account? We are here to help. Reach out to us using any of the details below.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16 border-t border-border/40">
        <div className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {/* Email */}
            <div className="rounded-2xl border border-border/60 bg-card/60 p-7 text-center hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">For general queries, account help, and feedback</p>
              <a
                href="mailto:support@fanliteplay.com"
                className="text-primary text-sm font-medium hover:underline"
              >
                support@fanliteplay.com
              </a>
            </div>

            {/* Address */}
            <div className="rounded-2xl border border-border/60 bg-card/60 p-7 text-center hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Our Address</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                F-73, DLF Promenade Mall,<br />
                Nelson Mandela Marg,<br />
                Vasant Kunj, New Delhi,<br />
                Delhi – 110070, India
              </p>
            </div>

            {/* Response time */}
            <div className="rounded-2xl border border-border/60 bg-card/60 p-7 text-center hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
              <p className="text-sm text-muted-foreground mb-3">We aim to respond to all queries within</p>
              <span className="text-primary text-sm font-medium">1–2 business days</span>
            </div>
          </div>

          {/* Common questions */}
          <div className="rounded-2xl border border-border/60 bg-card/60 p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Common Questions</h2>
            </div>
            <div className="space-y-0">
              {[
                {
                  q: "How do I reset my password?",
                  a: "If you have forgotten your password, please email us at support@fanliteplay.com with the subject line 'Password Reset' and your registered email address. We will assist you promptly.",
                },
                {
                  q: "Is Fan Lite Play really free?",
                  a: "Yes, Fan Lite Play is entirely free to use. There are no charges, no transactions, and no premium tiers. Every feature on the platform is available at no cost.",
                },
                {
                  q: "Who can use Fan Lite Play?",
                  a: "Fan Lite Play is available to users aged 18 and above. By registering, you confirm that you meet this age requirement.",
                },
                {
                  q: "How are points calculated?",
                  a: "Points are based on real player performance data entered by our admin team after each match. Visit our How It Works page for the full points breakdown.",
                },
                {
                  q: "I found a bug or have a suggestion. How do I report it?",
                  a: "We welcome all feedback. Please email us at support@fanliteplay.com with a description of the issue or your suggestion. Your input helps us improve the platform.",
                },
              ].map((item, i) => (
                <div key={item.q} className={`py-5 ${i > 0 ? "border-t border-border/40" : ""}`}>
                  <h3 className="font-medium text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
