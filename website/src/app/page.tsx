import Nav from "@/components/Nav";
import { HeroSection, SiteFooter } from "@/components/SiteSections";

export default function Home() {
  return (
    <main className="site-shell">
      <Nav />
      <div className="page-frame">
        <HeroSection />
      </div>
      <SiteFooter />
    </main>
  );
}
