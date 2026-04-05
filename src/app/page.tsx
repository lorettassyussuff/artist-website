import Nav from "@/components/Nav";
import { HeroSection, SiteFooter } from "@/components/SiteSections";
import { getHomeContent, getShellContent } from "@/lib/sanity/queries";

export const revalidate = 300;

export default async function Home() {
  const [shellContent, homeContent] = await Promise.all([
    getShellContent(),
    getHomeContent(),
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
        <HeroSection {...homeContent} />
      </div>
      <SiteFooter siteName={shellContent.siteName} />
    </main>
  );
}
