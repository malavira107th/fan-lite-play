import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-20 gradient-hero border-b border-border/60">
          <div className="container max-w-3xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a question, a suggestion, or just want to say hello? We would love to hear from you. Our team is here to help.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 glass-card rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Support</h3>
                      <a href="mailto:support@fanliteplay.com" className="text-primary hover:underline text-sm">
                        support@fanliteplay.com
                      </a>
                      <p className="text-xs text-muted-foreground mt-1">We respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 glass-card rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Address</h3>
                      <address className="text-sm text-muted-foreground not-italic leading-relaxed">
                        Fan Lite Play<br />
                        F-73, DLF Promenade Mall,<br />
                        Nelson Mandela Marg, Vasant Kunj,<br />
                        New Delhi, Delhi – 110070, India
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 glass-card rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Support Hours</h3>
                      <p className="text-sm text-muted-foreground">Monday – Saturday</p>
                      <p className="text-sm text-muted-foreground">10:00 AM – 6:00 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "Is Fan Lite Play free to use?",
                      a: "Yes, Fan Lite Play is completely free. There are no charges, transactions, or hidden fees of any kind.",
                    },
                    {
                      q: "How are points calculated?",
                      a: "Points are based on real player performances in live matches — runs, wickets, catches, and more. Visit our How It Works page for the full scoring system.",
                    },
                    {
                      q: "Can I create multiple teams for one challenge?",
                      a: "Yes! You can create up to the maximum number of entries allowed per challenge to test different strategies.",
                    },
                    {
                      q: "How do I report an issue?",
                      a: "Email us at support@fanliteplay.com with a description of the issue and we will get back to you promptly.",
                    },
                  ].map((faq, i) => (
                    <div key={i} className="glass-card rounded-xl p-5">
                      <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
