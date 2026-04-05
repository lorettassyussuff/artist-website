import type { SanityImageSource } from "@sanity/image-url";

export interface SanitySlug {
  _type?: "slug";
  current: string;
}

export interface SanityImageAsset {
  _type: "image";
  asset?: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityFileAsset {
  _type: "file";
  asset?: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
}

export interface SanityMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface SanitySpan {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
}

export interface SanityBlock {
  _key: string;
  _type: "block";
  style: string;
  children: SanitySpan[];
  markDefs?: SanityMarkDef[];
}

export interface SanityHeroSlide {
  _key: string;
  _type: "heroSlide";
  alt?: string;
  caption?: string;
  image?: SanityImageSource;
  imageUrl?: string;
}

export interface SanityContactItem {
  _key: string;
  _type: "contactItem";
  label: string;
  value: string;
  href: string;
  icon?: "email" | "instagram" | "none";
}

export interface SanityArtwork {
  _id: string;
  _type: "artwork";
  title: string;
  date?: number;
  medium?: string;
  dimensions?: string;
  exhibition?: string;
  credit?: string;
  category: "painting" | "print" | "installation";
  featured?: boolean;
  sortOrder?: number;
  image?: SanityImageSource;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  slug?: SanitySlug;
}

export interface SanityCvEntry {
  _key: string;
  primary?: string;
  secondary?: string;
  meta?: string;
  line?: string;
}

export interface SanityCvSection {
  _id: string;
  _type: "cvSection";
  title: string;
  sortOrder?: number;
  entries: SanityCvEntry[];
}

export interface SanitySiteSettings {
  _id: string;
  _type: "siteSettings";
  siteTitle: string;
  tagline?: string;
  description?: string;
  email?: string;
  instagramUrl?: string;
  mailingListUrl?: string;
  aboutNavLabel?: string;
  selectedWorksNavLabel?: string;
  cvNavLabel?: string;
  writingsNavLabel?: string;
  contactNavLabel?: string;
  instagramLabel?: string;
}

export interface SanityHomePage {
  _id: string;
  _type: "homePage";
  title?: string;
  intro?: SanityBlock[];
  heroImage?: SanityImageAsset;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroCaption?: string;
}

export interface SanityAboutPage {
  _id: string;
  _type: "aboutPage";
  title?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  body?: SanityBlock[];
  portrait?: SanityImageAsset;
  portraitUrl?: string;
  portraitAlt?: string;
  cvLinkLabel?: string;
  instagramLinkLabel?: string;
}

export interface SanitySelectedWorksPage {
  _id: string;
  _type: "selectedWorksPage";
  title?: string;
  paintingsTitle?: string;
  paintingsIntro?: string;
  paintingsNavLabel?: string;
  printsTitle?: string;
  printsIntro?: string;
  printsNavLabel?: string;
}

export interface SanityCvPage {
  _id: string;
  _type: "cvPage";
  title?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
}

export interface SanityWritingsPage {
  _id: string;
  _type: "writingsPage";
  title?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  intro?: SanityBlock[];
  publicationTitle?: string;
  publicationDescription?: string;
  publicationPdf?: SanityFileAsset;
  publicationPdfUrl?: string;
}

export interface SanityContactPage {
  _id: string;
  _type: "contactPage";
  title?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  intro?: SanityBlock[];
  items?: SanityContactItem[];
}
