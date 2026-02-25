import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Introduction",
    content: `Fan Lite Play ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and how we protect it when you use our platform. By using Fan Lite Play, you agree to the collection and use of information in accordance with this policy.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect the following information when you register and use Fan Lite Play: your name, email address, and password (stored in encrypted form) when you create an account; your team selections, challenge entries, and leaderboard activity while using the platform; and basic usage data such as pages visited and features used, collected automatically to help us improve the platform.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect to: create and manage your account; operate the platform and provide its features, including team building, challenges, and leaderboards; communicate with you about your account or in response to your support queries; improve the platform based on usage patterns; and ensure compliance with our Terms of Use, including age verification requirements.`,
  },
  {
    title: "4. Data Storage and Security",
    content: `Your data is stored on secure servers. Passwords are stored using industry-standard encryption (bcrypt hashing) and are never stored in plain text. We take reasonable technical and organisational measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "5. Sharing of Information",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating the platform, provided they agree to keep your information confidential. We may also disclose your information if required by law or to protect the rights, property, or safety of Fan Lite Play, our users, or others.`,
  },
  {
    title: "6. Cookies and Tracking",
    content: `Fan Lite Play uses session cookies to maintain your login state while you use the platform. These cookies are essential for the platform to function correctly and are deleted when you sign out or close your browser. We do not use third-party advertising cookies or tracking technologies.`,
  },
  {
    title: "7. Your Rights",
    content: `You have the right to access the personal information we hold about you, to request correction of inaccurate data, and to request deletion of your account and associated data. To exercise any of these rights, please contact us at support@fanliteplay.com. We will respond to your request within a reasonable timeframe.`,
  },
  {
    title: "8. Data Retention",
    content: `We retain your account information for as long as your account is active. If you request deletion of your account, we will remove your personal information from our systems within a reasonable period, except where we are required to retain it for legal or compliance purposes.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Fan Lite Play is not intended for users under the age of 18. We do not knowingly collect personal information from individuals under 18. If we become aware that we have collected personal information from a user under 18, we will take steps to delete that information promptly.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify users of significant changes by posting a notice on the platform. Your continued use of Fan Lite Play after any changes constitutes your acceptance of the updated policy. We encourage you to review this policy periodically.`,
  },
  {
    title: "11. Contact Us",
    content: `If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at support@fanliteplay.com or write to us at F-73, DLF Promenade Mall, Nelson Mandela Marg, Vasant Kunj, New Delhi, Delhi – 110070, India.`,
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-10 border-b border-border/40">
        <div className="container max-w-3xl mx-auto">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Legal</div>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: February 2025</p>
        </div>
      </section>

      {/* Intro notice */}
      <section className="pt-10 pb-0">
        <div className="container max-w-3xl mx-auto">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fan Lite Play does not collect financial information of any kind. We do not process payments, store card details, or handle any monetary transactions. This policy covers only the personal information required to operate your account and the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-20">
        <div className="container max-w-3xl mx-auto">
          <div className="space-y-0">
            {sections.map((section, i) => (
              <div key={section.title} className={`py-8 ${i < sections.length - 1 ? "border-b border-border/30" : ""}`}>
                <h2 className="text-base font-semibold text-foreground mb-3">{section.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
