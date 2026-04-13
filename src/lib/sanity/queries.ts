import { sanityClient } from "./client";
import { cache } from "react";
import type {
  SanityAboutPage,
  SanityBlock,
  SanityContactPage,
  SanityContactItem,
  SanityCvPage,
  SanityHomePage,
  SanityInlineArtwork,
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
  sectionTitle: string;
  header: string;
  paragraphs: string[];
  portraitSrc: string;
  portraitAlt: string;
};

export type PaintingCard = {
  src: string;
  title: string;
  alt: string;
  medium: string;
  credit: string;
  imageWidth: number;
  imageHeight: number;
};

export type PrintCard = {
  src: string;
  title: string;
  alt: string;
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
  sections: CvSectionContent[];
};

export type WritingsContent = {
  title: string;
  sectionTitle: string;
  publicationTitle: string;
  publicationDescription: string;
  pdfUrl: string;
};

export type ContactContent = {
  title: string;
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
  intro,
  heroImageAlt,
  heroCaption,
  "heroImageUrl": heroImage.asset->url
}`;

const aboutPageQuery = `*[_type == "aboutPage"][0]{
  _id,
  _type,
  sectionTitle,
  body,
  portraitAlt,
  "portraitUrl": portrait.asset->url
}`;

const selectedWorksPageQuery = `*[_type == "selectedWorksPage"][0]{
  _id,
  _type,
  title,
  paintingsTitle,
  paintingsIntro,
  paintingsNavLabel,
  paintings[]{
    _key,
    title,
    date,
    medium,
    dimensions,
    credit,
    alt,
    "imageUrl": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height
  },
  printsTitle,
  printsIntro,
  printsNavLabel,
  prints[]{
    _key,
    title,
    date,
    medium,
    dimensions,
    credit,
    alt,
    "imageUrl": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height
  }
}`;

const cvPageQuery = `*[_type == "cvPage"][0]{
  _id,
  _type,
  title,
  sections[]{
    _key,
    title,
    entries[]{
      _key,
      primary,
      secondary,
      meta,
      line
    }
  }
}`;

const writingsPageQuery = `*[_type == "writingsPage"][0]{
  _id,
  _type,
  title,
  sectionTitle,
  publicationTitle,
  publicationDescription,
  "publicationPdfUrl": publicationPdf.asset->url
}`;

const contactPageQuery = `*[_type == "contactPage"][0]{
  _id,
  _type,
  title,
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

function combineMedium(artwork: SanityInlineArtwork) {
  const parts = [artwork.medium, artwork.dimensions].filter(Boolean);
  return parts.join(", ");
}

function combineTitle(artwork: SanityInlineArtwork) {
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

function logSelectedWorksAspectRatios(paintings: SanityInlineArtwork[], prints: SanityInlineArtwork[]) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const rows = [...paintings.map(a => ({ category: "painting", ...a })), ...prints.map(a => ({ category: "print", ...a }))]
    .filter((a) => a.imageUrl && a.imageWidth && a.imageHeight)
    .map((a) => ({
      category: a.category,
      title: combineTitle(a),
      width: a.imageWidth,
      height: a.imageHeight,
      aspectRatio: Number((a.imageWidth! / a.imageHeight!).toFixed(3)),
    }));

  if (rows.length > 0) {
    console.table(rows);
  }
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
    sectionTitle: aboutPage?.sectionTitle ?? "",
    header: settings?.tagline ?? "",
    paragraphs: blocksToParagraphs(aboutPage?.body),
    portraitSrc: aboutPage?.portraitUrl ?? "",
    portraitAlt: aboutPage?.portraitAlt ?? "",
  };
}

export async function getSelectedWorksContent(): Promise<SelectedWorksContent> {
  const page = await fetchFromSanity<SanitySelectedWorksPage>(selectedWorksPageQuery);
  const paintings = page?.paintings ?? [];
  const prints = page?.prints ?? [];

  logSelectedWorksAspectRatios(paintings, prints);

  return {
    title: page?.title ?? "",
    paintingsTitle: page?.paintingsTitle ?? "",
    paintingsIntro: page?.paintingsIntro ?? "",
    paintingsNavLabel: page?.paintingsNavLabel ?? "",
    printsTitle: page?.printsTitle ?? "",
    printsIntro: page?.printsIntro ?? "",
    printsNavLabel: page?.printsNavLabel ?? "",
    paintings: paintings
      .filter((artwork) => artwork.imageUrl)
      .map((artwork) => ({
        src: artwork.imageUrl as string,
        title: combineTitle(artwork) ?? "",
        alt: artwork.alt || combineTitle(artwork) || "",
        medium: combineMedium(artwork),
        credit: artwork.credit || "",
        imageWidth: artwork.imageWidth || 1920,
        imageHeight: artwork.imageHeight || 1080,
      })),
    prints: prints
      .filter((artwork) => artwork.imageUrl)
      .map((artwork) => ({
        src: artwork.imageUrl as string,
        title: combineTitle(artwork) ?? "",
        alt: artwork.alt || combineTitle(artwork) || "",
        medium: combineMedium(artwork),
        credit: artwork.credit || "",
        imageWidth: artwork.imageWidth || 1200,
        imageHeight: artwork.imageHeight || 1600,
      })),
  };
}

export async function getCvPageContent(): Promise<CvPageContent> {
  const page = await fetchFromSanity<SanityCvPage>(cvPageQuery);
  const rawSections = page?.sections ?? [];

  const sections = rawSections.map((section) => {
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

  return {
    title: page?.title ?? "",
    sections,
  };
}

export async function getWritingsContent(): Promise<WritingsContent> {
  const writingsPage =
    await fetchFromSanity<SanityWritingsPage>(writingsPageQuery);

  return {
    title: writingsPage?.title ?? "",
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
    email: emailItem?.value || settings?.email || "",
    emailDescription: introParagraphs[0] || "",
    mailingListHref: mailingListItem?.href || settings?.mailingListUrl || "",
    mailingListLabel: mailingListItem?.value || "",
    instagramHref: instagramItem?.href || settings?.instagramUrl || "",
    instagramLabel: instagramItem?.value || "",
  };
}
