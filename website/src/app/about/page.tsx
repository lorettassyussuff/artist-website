import Nav from "@/components/Nav";
import { AboutSection, SiteFooter } from "@/components/SiteSections";

export const metadata = {
  title: "About | Loretta Yussuff",
};

export default function AboutPage() {
  return (
    <main className="site-shell">
      <Nav />
      <div className="page-frame">
        <AboutSection compact />
      </div>
      <SiteFooter />
    </main>
  );
}
