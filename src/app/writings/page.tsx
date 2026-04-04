import Nav from "@/components/Nav";
import { SiteFooter, WritingsSection } from "@/components/SiteSections";
import { getShellContent, getWritingsContent } from "@/lib/sanity/queries";

export const revalidate = 300;

export async function generateMetadata() {
  const [shellContent, writingsContent] = await Promise.all([
    getShellContent(),
    getWritingsContent(),
  ]);

  return {
    title: `${writingsContent.title || writingsContent.sectionEyebrow || "Writings"} | ${shellContent.siteTitle}`,
  };
}

export default async function WritingsPage() {
  const [shellContent, writingsContent] = await Promise.all([
    getShellContent(),
    getWritingsContent(),
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
        <WritingsSection compact {...writingsContent} />
      </div>
      <SiteFooter siteName={shellContent.siteName} />
    </main>
  );
}
