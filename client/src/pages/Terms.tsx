import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using Fan Lite Play (\"the Platform\"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Platform. These terms apply to all visitors, registered users, and any other persons who access or use the Platform.",
  },
  {
    title: "2. Eligibility",
    content: "You must be at least 18 years of age to register for and use Fan Lite Play. By using the Platform, you represent and warrant that you meet this age requirement. Users who are found to be under 18 years of age will have their accounts terminated.",
  },
  {
    title: "3. Nature of the Platform",
    content: "Fan Lite Play is a free-to-use cricket strategy and entertainment platform. It is a game of skill in which users create virtual cricket teams based on their knowledge of the sport. The Platform does not involve any financial transactions, wagering, or the exchange of monetary value. All challenges and competitions on Fan Lite Play are entirely free to enter and participate in.",
  },
  {
    title: "4. User Accounts",
    content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately at support@fanliteplay.com of any unauthorized use of your account. Fan Lite Play reserves the right to terminate accounts that violate these Terms of Use.",
  },
  {
    title: "5. Acceptable Use",
    content: "You agree to use Fan Lite Play only for its intended purpose as a skill-based cricket strategy platform. You will not engage in any activity that is unlawful, harmful, abusive, or disruptive to other users or the Platform. You will not attempt to manipulate leaderboards, exploit technical vulnerabilities, or engage in any form of cheating.",
  },
  {
    title: "6. Intellectual Property",
    content: "All content on Fan Lite Play, including but not limited to logos, graphics, user interface design, and software, is the intellectual property of Fan Lite Play and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on the Platform without our express written permission.",
  },
  {
    title: "7. Disclaimer of Warranties",
    content: "Fan Lite Play is provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components. The Platform is provided for entertainment and educational purposes only.",
  },
  {
    title: "8. Limitation of Liability",
    content: "To the fullest extent permitted by applicable law, Fan Lite Play and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Platform.",
  },
  {
    title: "9. Changes to Terms",
    content: "Fan Lite Play reserves the right to modify these Terms of Use at any time. We will notify users of significant changes by posting a notice on the Platform. Your continued use of the Platform after any changes constitutes your acceptance of the new terms.",
  },
  {
    title: "10. Governing Law",
    content: "These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.",
  },
  {
    title: "11. Contact",
    content: "If you have any questions about these Terms of Use, please contact us at support@fanliteplay.com or write to us at: F-73, DLF Promenade Mall, Nelson Mandela Marg, Vasant Kunj, New Delhi, Delhi – 110070, India.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-16 gradient-hero border-b border-border/60">
          <div className="container max-w-3xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Terms of <span className="text-gradient">Use</span>
            </h1>
            <p className="text-muted-foreground">Last updated: February 2025</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container max-w-3xl">
            <div className="glass-card rounded-xl p-8 mb-6">
              <p className="text-muted-foreground leading-relaxed">
                Please read these Terms of Use carefully before using Fan Lite Play. These terms govern your access to and use of our cricket strategy platform. Fan Lite Play is a free-to-play entertainment platform and does not involve any financial transactions of any kind.
              </p>
            </div>
            <div className="space-y-6">
              {sections.map((s, i) => (
                <div key={i} className="glass-card rounded-xl p-6">
                  <h2 className="font-semibold text-foreground mb-3">{s.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
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
