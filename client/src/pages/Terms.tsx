import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Fan Lite Play ("the Platform"), you agree to be bound by these Terms of Use. If you do not agree to these terms, you must not use the Platform. These terms apply to all users of the Platform, including registered users and visitors.`,
  },
  {
    title: "2. Eligibility",
    content: `Fan Lite Play is intended for users who are 18 years of age or older. By registering an account or using the Platform, you confirm that you are at least 18 years old. We reserve the right to suspend or terminate any account where we have reason to believe the user does not meet this age requirement.`,
  },
  {
    title: "3. Nature of the Platform",
    content: `Fan Lite Play is a free-to-use, skill-based cricket strategy and entertainment platform. Users build virtual cricket teams from real match player pools and compete on performance-based leaderboards. The Platform does not involve any financial transactions, real-money exchange, wagering, or betting of any kind. All participation is free of charge.`,
  },
  {
    title: "4. User Accounts",
    content: `To access certain features of the Platform, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must provide accurate and complete information when registering. You must not create accounts on behalf of other individuals or entities without authorisation.`,
  },
  {
    title: "5. Acceptable Use",
    content: `You agree to use the Platform only for lawful purposes and in accordance with these Terms. You must not: use the Platform in any way that violates applicable laws or regulations; attempt to gain unauthorised access to any part of the Platform; submit false or misleading information; use automated tools to interact with the Platform without our prior written consent; or engage in any conduct that disrupts or interferes with the Platform's operation.`,
  },
  {
    title: "6. Intellectual Property",
    content: `All content on the Platform, including but not limited to text, graphics, logos, and software, is the property of Fan Lite Play or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any Platform content without our express written permission.`,
  },
  {
    title: "7. Points and Leaderboards",
    content: `Points on Fan Lite Play are calculated based on real player performance data entered by our administrative team after each match. Points have no monetary value and cannot be exchanged for any form of currency, goods, or services. Leaderboard rankings are for entertainment purposes only and do not confer any financial or material benefit.`,
  },
  {
    title: "8. Disclaimer of Warranties",
    content: `The Platform is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components. We are not responsible for the accuracy of player performance data or points calculations, which are subject to human error.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `To the fullest extent permitted by applicable law, Fan Lite Play and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Platform. Our total liability to you for any claim arising from these Terms or your use of the Platform shall not exceed zero, as the Platform is provided entirely free of charge.`,
  },
  {
    title: "10. Modifications to the Platform and Terms",
    content: `We reserve the right to modify, suspend, or discontinue the Platform at any time without notice. We may also update these Terms of Use from time to time. Continued use of the Platform after any changes constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.`,
  },
  {
    title: "11. Termination",
    content: `We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. You may also delete your account at any time by contacting us at support@fanliteplay.com.`,
  },
  {
    title: "12. Governing Law",
    content: `These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.`,
  },
  {
    title: "13. Contact",
    content: `If you have any questions about these Terms of Use, please contact us at support@fanliteplay.com or write to us at F-73, DLF Promenade Mall, Nelson Mandela Marg, Vasant Kunj, New Delhi, Delhi – 110070, India.`,
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-10 border-b border-border/40">
        <div className="container max-w-3xl mx-auto">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Legal</div>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Terms of Use
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: February 2025</p>
        </div>
      </section>

      {/* Intro */}
      <section className="pt-10 pb-0">
        <div className="container max-w-3xl mx-auto">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please read these Terms of Use carefully before using Fan Lite Play. Fan Lite Play is a free-to-use entertainment platform and does not involve any financial transactions of any kind. These terms govern your access to and use of the platform.
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
