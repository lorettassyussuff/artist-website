import Nav from "@/components/Nav";
import { SelectedWorksSection, SiteFooter } from "@/components/SiteSections";
import {
  getSelectedWorksContent,
  getShellContent,
} from "@/lib/sanity/queries";
import SelectedWorksHashFix from "./SelectedWorksHashFix";

export const revalidate = 300;

export async function generateMetadata() {
  const [shellContent, selectedWorksContent] = await Promise.all([
    getShellContent(),
    getSelectedWorksContent(),
  ]);

  return {
    title: `${selectedWorksContent.title || "Selected Works"} | ${shellContent.siteTitle}`,
  };
}

export default async function SelectedWorksPage() {
  const [shellContent, selectedWorksContent] = await Promise.all([
    getShellContent(),
    getSelectedWorksContent(),
  ]);

  return (
    <main className="site-shell">
      <SelectedWorksHashFix />
      <Nav
        siteTitle={shellContent.siteTitle}
        instagramUrl={shellContent.instagramUrl}
        instagramLabel={shellContent.instagramLabel}
        navLabels={shellContent.navLabels}
      />
      <div className="page-frame">
        <SelectedWorksSection compact {...selectedWorksContent} />
      </div>
      <SiteFooter siteName={shellContent.siteName} />
    </main>
  );
}
