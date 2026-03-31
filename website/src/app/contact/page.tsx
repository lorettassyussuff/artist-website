import Nav from "@/components/Nav";
import { ContactSection, SiteFooter } from "@/components/SiteSections";

export const metadata = {
  title: "Contact | Loretta Yussuff",
};

export default function ContactPage() {
  return (
    <main className="site-shell">
      <Nav />
      <div className="page-frame">
        <ContactSection compact />
      </div>
      <SiteFooter />
    </main>
  );
}
