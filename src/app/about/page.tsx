import Nav from "@/components/Nav";
import { AboutSection, SiteFooter } from "@/components/SiteSections";
import { getAboutContent, getShellContent } from "@/lib/sanity/queries";

export async function generateMetadata() {
  const [shellContent, aboutContent] = await Promise.all([
    getShellContent(),
    getAboutContent(),
  ]);

  return {
    title: `${aboutContent.sectionEyebrow || "About"} | ${shellContent.siteTitle}`,
  };
}

export default async function AboutPage() {
  const [shellContent, aboutContent] = await Promise.all([
    getShellContent(),
    getAboutContent(),
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
        <AboutSection compact {...aboutContent} />
      </div>
      <SiteFooter siteName={shellContent.siteName} />
    </main>
  );
}
