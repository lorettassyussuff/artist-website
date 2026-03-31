import Nav from "@/components/Nav";
import { SelectedWorksSection, SiteFooter } from "@/components/SiteSections";

export const metadata = {
  title: "Selected Works | Loretta Yussuff",
};

export default function SelectedWorksPage() {
  return (
    <main className="site-shell">
      <Nav />
      <div className="page-frame">
        <SelectedWorksSection compact />
      </div>
      <SiteFooter />
    </main>
  );
}
