import Nav from "@/components/Nav";
import { ContactSection, SiteFooter } from "@/components/SiteSections";
import { getContactContent, getShellContent } from "@/lib/sanity/queries";

export const revalidate = 300;

export async function generateMetadata() {
  const [shellContent, contactContent] = await Promise.all([
    getShellContent(),
    getContactContent(),
  ]);

  return {
    title: `${contactContent.title || contactContent.sectionEyebrow || "Contact"} | ${shellContent.siteTitle}`,
  };
}

export default async function ContactPage() {
  const [shellContent, contactContent] = await Promise.all([
    getShellContent(),
    getContactContent(),
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
        <ContactSection compact {...contactContent} />
      </div>
      <SiteFooter siteName={shellContent.siteName} />
    </main>
  );
}
