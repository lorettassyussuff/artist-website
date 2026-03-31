import Nav from "@/components/Nav";
import { SiteFooter, WritingsSection } from "@/components/SiteSections";

export const metadata = {
  title: "Writings | Loretta Yussuff",
};

export default function WritingsPage() {
  return (
    <main className="site-shell">
      <Nav />
      <div className="page-frame">
        <WritingsSection compact />
      </div>
      <SiteFooter />
    </main>
  );
}
