import Nav from "@/components/Nav";
import { CVSection, SiteFooter } from "@/components/SiteSections";
import {
  getCvPageContent,
  getShellContent,
} from "@/lib/sanity/queries";

export const revalidate = 300;

export async function generateMetadata() {
  const [shellContent, cvPageContent] = await Promise.all([
    getShellContent(),
    getCvPageContent(),
  ]);

  return {
    title: `${cvPageContent.title || "CV"} | ${shellContent.siteTitle}`,
  };
}

export default async function CVPage() {
  const [shellContent, cvPageContent] = await Promise.all([
    getShellContent(),
    getCvPageContent(),
  ]);

  return (
    <main className="site-shell">
      <Nav
        siteTitle={shellContent.siteTitle}
        instagramUrl={shellContent.instagramUrl}
        instagramLabel={shellContent.instagramLabel}
        navLabels={shellContent.navLabels}
      />
      <div className="page-frame">
        <CVSection sections={cvPageContent.sections} />
      </div>
      <SiteFooter siteName={shellContent.siteName} />
    </main>
  );
}
