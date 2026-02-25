import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock } from "lucide-react";

const sections = [
  {
    title: "1. Introduction",
    content: "Fan Lite Play (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cricket strategy platform. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Platform.",
  },
  {
    title: "2. Information We Collect",
    content: "We collect information you provide directly when you register, such as your username, email address, and password (stored in encrypted form). We also collect data related to your platform activity, including team selections, challenge participation, and leaderboard performance. We may collect technical data such as your IP address, browser type, and device information to ensure the security and proper functioning of the Platform.",
  },
  {
    title: "3. How We Use Your Information",
    content: "We use the information we collect to operate and maintain the Platform, to create and manage your account, to personalize your experience, to process your team entries and calculate performance scores, to communicate with you about your account and platform updates, and to improve the Platform based on usage patterns and feedback.",
  },
  {
    title: "4. Information Sharing and Disclosure",
    content: "We do not sell, trade, or rent your personal information to third parties for marketing purposes. We may share your information with trusted service providers who assist us in operating the Platform, provided they agree to keep your information confidential. We may disclose your information if required to do so by law or in response to valid legal requests.",
  },
  {
    title: "5. Data Security",
    content: "We implement a variety of security measures to protect your personal information. Passwords are stored using industry-standard bcrypt hashing. Sessions are managed using secure, HTTP-only cookies. We use HTTPS encryption for all data transmitted between your browser and our servers. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "6. Data Retention",
    content: "We retain your personal information for as long as your account is active or as needed to provide you with our services. If you wish to delete your account, please contact us at support@fanliteplay.com. We will delete your personal data within a reasonable timeframe, except where we are required to retain it by law.",
  },
  {
    title: "7. Your Rights",
    content: "You have the right to access, correct, or delete your personal information. You may update your account information at any time through your profile settings. You may request a copy of the personal data we hold about you by contacting us at support@fanliteplay.com. You may also request that we restrict the processing of your data or object to its use.",
  },
  {
    title: "8. Cookies",
    content: "We use session cookies to maintain your login state and provide a seamless experience on the Platform. These cookies are essential for the Platform to function correctly. We do not use tracking cookies or third-party advertising cookies.",
  },
  {
    title: "9. Children's Privacy",
    content: "Fan Lite Play is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information promptly.",
  },
  {
    title: "10. Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting a notice on the Platform. Your continued use of the Platform after any changes constitutes your acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    content: "If you have any questions or concerns about this Privacy Policy, please contact us at support@fanliteplay.com or write to us at: F-73, DLF Promenade Mall, Nelson Mandela Marg, Vasant Kunj, New Delhi, Delhi – 110070, India.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-16 gradient-hero border-b border-border/60">
          <div className="container max-w-3xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-5">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-muted-foreground">Last updated: February 2025</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container max-w-3xl">
            <div className="glass-card rounded-xl p-8 mb-6">
              <p className="text-muted-foreground leading-relaxed">
                Your privacy matters to us. Fan Lite Play is a free entertainment platform and does not process any financial information. This policy explains how we handle the limited personal data we collect to operate our cricket strategy platform.
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
