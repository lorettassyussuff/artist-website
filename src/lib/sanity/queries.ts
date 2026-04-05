import { sanityClient } from "./client";
import { cache } from "react";
import type {
  SanityAboutPage,
  SanityArtwork,
  SanityBlock,
  SanityContactPage,
  SanityContactItem,
  SanityCvPage,
  SanityCvSection,
  SanityHomePage,
  SanitySelectedWorksPage,
  SanitySiteSettings,
  SanityWritingsPage,
} from "@/types/sanity";

export type ShellContent = {
  siteTitle: string;
  instagramUrl: string;
  instagramLabel: string;
  siteName: string;
  description: string;
  navLabels: {
    about: string;
    selectedWorks: string;
    cv: string;
    writings: string;
    contact: string;
  };
};

export type HeroContent = {
  imageSrc: string;
  imageAlt: string;
  caption: string;
  statement: string;
};

export type AboutContent = {
  sectionEyebrow: string;
  sectionTitle: string;
  header: string;
  paragraphs: string[];
  portraitSrc: string;
  portraitAlt: string;
  cvLinkLabel: string;
  cvLinkHref: string;
  instagramLinkLabel: string;
  instagramHref: string;
};

export type PaintingCard = {
  src: string;
  title: string;
  medium: string;
  credit: string;
  imageWidth: number;
  imageHeight: number;
};

export type PrintCard = {
  src: string;
  title: string;
  medium: string;
  credit: string;
  imageWidth: number;
  imageHeight: number;
};

export type SelectedWorksContent = {
  title: string;
  paintingsTitle: string;
  paintingsIntro: string;
  paintingsNavLabel: string;
  printsTitle: string;
  printsIntro: string;
  printsNavLabel: string;
  paintings: PaintingCard[];
  prints: PrintCard[];
};

export type CvEntryCard = {
  primary?: string;
  secondary?: string;
  meta?: string;
};

export type CvSectionContent = {
  title: string;
  lines?: string[];
  entries?: CvEntryCard[];
};

export type CvPageContent = {
  title: string;
  sectionEyebrow: string;
  sectionTitle: string;
};

export type WritingsContent = {
  title: string;
  sectionEyebrow: string;
  sectionTitle: string;
  publicationTitle: string;
  publicationDescription: string;
  pdfUrl: string;
};

export type ContactContent = {
  title: string;
  sectionEyebrow: string;
  sectionTitle: string;
  email: string;
  emailDescription: string;
  mailingListHref: string;
  mailingListLabel: string;
  instagramHref: string;
  instagramLabel: string;
};

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  _type,
  siteTitle,
  tagline,
  description,
  email,
  instagramUrl,
  mailingListUrl,
  aboutNavLabel,
  selectedWorksNavLabel,
  cvNavLabel,
  writingsNavLabel,
  contactNavLabel,
  instagramLabel
}`;

const homePageQuery = `*[_type == "homePage"][0]{
  _id,
  _type,
  title,
  intro,
  heroImageAlt,
  heroCaption,
  "heroImageUrl": heroImage.asset->url
}`;

const aboutPageQuery = `*[_type == "aboutPage"][0]{
  _id,
  _type,
  title,
  sectionEyebrow,
  sectionTitle,
  body,
  portraitAlt,
  cvLinkLabel,
  instagramLinkLabel,
  "portraitUrl": portrait.asset->url
}`;

const selectedWorksPageQuery = `*[_type == "selectedWorksPage"][0]{
  _id,
  _type,
  title,
  paintingsTitle,
  paintingsIntro,
  paintingsNavLabel,
  printsTitle,
  printsIntro,
  printsNavLabel
}`;

const cvPageQuery = `*[_type == "cvPage"][0]{
  _id,
  _type,
  title,
  sectionEyebrow,
  sectionTitle
}`;

const writingsPageQuery = `*[_type == "writingsPage"][0]{
  _id,
  _type,
  title,
  sectionEyebrow,
  sectionTitle,
  intro,
  publicationTitle,
  publicationDescription,
  "publicationPdfUrl": publicationPdf.asset->url
}`;

const contactPageQuery = `*[_type == "contactPage"][0]{
  _id,
  _type,
  title,
  sectionEyebrow,
  sectionTitle,
  intro,
  items[]{
    _key,
    _type,
    label,
    value,
    href,
    icon
  }
}`;

const artworksQuery = `*[_type == "artwork"] | order(sortOrder asc, date desc){
  _id,
  _type,
  title,
  slug,
  category,
  date,
  medium,
  dimensions,
  exhibition,
  credit,
  featured,
  sortOrder,
  "imageUrl": image.asset->url,
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height
}`;

const cvSectionsQuery = `*[_type == "cvSection"] | order(sortOrder asc){
  _id,
  _type,
  title,
  sortOrder,
  entries[]{
    _key,
    primary,
    secondary,
    meta,
    line
  }
}`;

const fetchFromSanity = cache(async function fetchFromSanity<T>(
  query: string,
): Promise<T | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    console.warn("Sanity disabled: NEXT_PUBLIC_SANITY_PROJECT_ID is missing.");
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query);
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
});

function blocksToParagraphs(blocks?: SanityBlock[]) {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks
    .map((block) =>
      block.children
        ?.map((child) => child.text)
        .join("")
        .trim(),
    )
    .filter((paragraph): paragraph is string => Boolean(paragraph));
}

function combineMedium(artwork: SanityArtwork) {
  const parts = [artwork.medium, artwork.dimensions].filter(Boolean);
  return parts.join(", ");
}

function combineTitle(artwork: SanityArtwork) {
  return artwork.date ? `${artwork.title}, ${artwork.date}` : artwork.title;
}

function findContactItem(
  items: SanityContactItem[] | undefined,
  label: string,
  icon?: string,
) {
  return (
    items?.find((item) => item.label.toLowerCase() === label.toLowerCase()) ??
    items?.find((item) => item.icon === icon)
  );
}

function logSelectedWorksAspectRatios(artworks: SanityArtwork[]) {
  if (process.env.NODE_ENV === "production" || artworks.length === 0) {
    return;
  }

  console.table(
    artworks
      .filter((artwork) => artwork.imageUrl && artwork.imageWidth && artwork.imageHeight)
      .map((artwork) => ({
        category: artwork.category,
        title: combineTitle(artwork),
        width: artwork.imageWidth,
        height: artwork.imageHeight,
        aspectRatio: Number((artwork.imageWidth! / artwork.imageHeight!).toFixed(3)),
      })),
  );
}

const getSiteSettings = cache(async function getSiteSettings() {
  return fetchFromSanity<SanitySiteSettings>(siteSettingsQuery);
});

export async function getShellContent(): Promise<ShellContent> {
  const settings = await getSiteSettings();

  return {
    siteTitle: settings?.siteTitle ?? "",
    instagramUrl: settings?.instagramUrl ?? "",
    instagramLabel: settings?.instagramLabel ?? "",
    siteName: settings?.siteTitle ?? "",
    description: settings?.description ?? "",
    navLabels: {
      about: settings?.aboutNavLabel ?? "",
      selectedWorks: settings?.selectedWorksNavLabel ?? "",
      cv: settings?.cvNavLabel ?? "",
      writings: settings?.writingsNavLabel ?? "",
      contact: settings?.contactNavLabel ?? "",
    },
  };
}

export async function getHomeContent(): Promise<HeroContent> {
  const [settings, homePage] = await Promise.all([
    getSiteSettings(),
    fetchFromSanity<SanityHomePage>(homePageQuery),
  ]);
  const introParagraphs = blocksToParagraphs(homePage?.intro);
  const statement =
    introParagraphs[0] && introParagraphs[0] !== settings?.tagline
      ? introParagraphs[0]
      : "";

  return {
    imageSrc: homePage?.heroImageUrl ?? "",
    imageAlt:
      homePage?.heroImageAlt || homePage?.heroCaption || settings?.tagline || "",
    caption: homePage?.heroCaption || settings?.tagline || "",
    statement,
  };
}

export async function getAboutContent(): Promise<AboutContent> {
  const [settings, aboutPage] = await Promise.all([
    getSiteSettings(),
    fetchFromSanity<SanityAboutPage>(aboutPageQuery),
  ]);

  return {
    sectionEyebrow: aboutPage?.sectionEyebrow ?? "",
    sectionTitle: aboutPage?.sectionTitle ?? "",
    header: settings?.tagline ?? "",
    paragraphs: blocksToParagraphs(aboutPage?.body),
    portraitSrc: aboutPage?.portraitUrl ?? "",
    portraitAlt: aboutPage?.portraitAlt ?? "",
    cvLinkLabel: aboutPage?.cvLinkLabel ?? "",
    cvLinkHref: "/cv",
    instagramLinkLabel: aboutPage?.instagramLinkLabel ?? "",
    instagramHref: settings?.instagramUrl ?? "",
  };
}

export async function getSelectedWorksContent(): Promise<SelectedWorksContent> {
  const [page, artworks] = await Promise.all([
    fetchFromSanity<SanitySelectedWorksPage>(selectedWorksPageQuery),
    fetchFromSanity<SanityArtwork[]>(artworksQuery),
  ]);
  const artworkList = artworks ?? [];

  logSelectedWorksAspectRatios(artworkList);

  return {
    title: page?.title ?? "",
    paintingsTitle: page?.paintingsTitle ?? "",
    paintingsIntro: page?.paintingsIntro ?? "",
    paintingsNavLabel: page?.paintingsNavLabel ?? "",
    printsTitle: page?.printsTitle ?? "",
    printsIntro: page?.printsIntro ?? "",
    printsNavLabel: page?.printsNavLabel ?? "",
    paintings: artworkList
      .filter(
        (artwork) =>
          artwork.category === "painting" &&
          artwork.imageUrl,
      )
      .map((artwork) => ({
        src: artwork.imageUrl as string,
        title: combineTitle(artwork),
        medium: combineMedium(artwork),
        credit: artwork.credit || "",
        imageWidth: artwork.imageWidth || 1920,
        imageHeight: artwork.imageHeight || 1080,
      })),
    prints: artworkList
      .filter((artwork) => artwork.category === "print" && artwork.imageUrl)
      .map((artwork) => ({
        src: artwork.imageUrl as string,
        title: combineTitle(artwork),
        medium: combineMedium(artwork),
        credit: artwork.credit || "",
        imageWidth: artwork.imageWidth || 1200,
        imageHeight: artwork.imageHeight || 1600,
      })),
  };
}

export async function getCvContent(): Promise<CvSectionContent[]> {
  const sections =
    (await fetchFromSanity<SanityCvSection[]>(cvSectionsQuery)) ?? [];

  return sections.map((section) => {
    const lineEntries = section.entries
      .map((entry) => entry.line?.trim())
      .filter((line): line is string => Boolean(line));

    if (
      lineEntries.length === section.entries.length &&
      lineEntries.length > 0
    ) {
      return {
        title: section.title,
        lines: lineEntries,
      };
    }

    return {
      title: section.title,
      entries: section.entries.map((entry) => ({
        primary: entry.primary,
        secondary: entry.secondary,
        meta: entry.meta,
      })),
    };
  });
}

export async function getCvPageContent(): Promise<CvPageContent> {
  const page = await fetchFromSanity<SanityCvPage>(cvPageQuery);

  return {
    title: page?.title ?? "",
    sectionEyebrow: page?.sectionEyebrow ?? "",
    sectionTitle: page?.sectionTitle ?? "",
  };
}

export async function getWritingsContent(): Promise<WritingsContent> {
  const writingsPage =
    await fetchFromSanity<SanityWritingsPage>(writingsPageQuery);

  return {
    title: writingsPage?.title ?? "",
    sectionEyebrow: writingsPage?.sectionEyebrow ?? "",
    sectionTitle: writingsPage?.sectionTitle ?? "",
    publicationTitle: writingsPage?.publicationTitle ?? "",
    publicationDescription: writingsPage?.publicationDescription ?? "",
    pdfUrl: writingsPage?.publicationPdfUrl ?? "",
  };
}

export async function getContactContent(): Promise<ContactContent> {
  const [settings, contactPage] = await Promise.all([
    getSiteSettings(),
    fetchFromSanity<SanityContactPage>(contactPageQuery),
  ]);

  const emailItem = findContactItem(contactPage?.items, "Email", "email");
  const mailingListItem = findContactItem(contactPage?.items, "Mailing List");
  const instagramItem = findContactItem(
    contactPage?.items,
    "Instagram",
    "instagram",
  );
  const introParagraphs = blocksToParagraphs(contactPage?.intro);

  return {
    title: contactPage?.title ?? "",
    sectionEyebrow: contactPage?.sectionEyebrow ?? "",
    sectionTitle: contactPage?.sectionTitle ?? "",
    email: emailItem?.value || settings?.email || "",
    emailDescription: introParagraphs[0] || "",
    mailingListHref: mailingListItem?.href || settings?.mailingListUrl || "",
    mailingListLabel: mailingListItem?.value || "",
    instagramHref: instagramItem?.href || settings?.instagramUrl || "",
    instagramLabel: instagramItem?.value || "",
  };
}
