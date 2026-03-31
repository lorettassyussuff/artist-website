import Nav from "@/components/Nav";
import { CVSection, SiteFooter } from "@/components/SiteSections";

export const metadata = {
  title: "CV | Loretta Yussuff",
};

export default function CVPage() {
  return (
    <main className="site-shell">
      <Nav />
      <div className="page-frame">
        <CVSection compact />
      </div>
      <SiteFooter />
    </main>
  );
}
