import Nav from "@/components/Nav";
import { AboutSection, SiteFooter } from "@/components/SiteSections";
import { getAboutContent, getShellContent } from "@/lib/sanity/queries";

export const revalidate = 300;

export async function generateMetadata() {
  const shellContent = await getShellContent();

  return {
    title: `About | ${shellContent.siteTitle}`,
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
        <AboutSection {...aboutContent} />
      </div>
      <SiteFooter siteName={shellContent.siteName} />
    </main>
  );
}
