import Nav from "@/components/Nav";
import { CVSection, SiteFooter } from "@/components/SiteSections";
import {
  getCvContent,
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
  const [shellContent, cvPageContent, sections] = await Promise.all([
    getShellContent(),
    getCvPageContent(),
    getCvContent(),
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
        <CVSection compact sections={sections} {...cvPageContent} />
      </div>
      <SiteFooter siteName={shellContent.siteName} />
    </main>
  );
}
