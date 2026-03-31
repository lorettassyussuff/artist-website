import type { SanityImageSource } from "@sanity/image-url";

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
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

export interface SanityArtwork {
  _id: string;
  _type: "artwork";
  title: string;
  year: number;
  medium?: string;
  dimensions?: string;
  exhibition?: string;
  image?: SanityImageSource;
  slug?: SanitySlug;
}

export interface SanityPage {
  _id: string;
  _type: "page";
  title: string;
  slug: SanitySlug;
  body?: SanityBlock[];
}

export interface SanityBlock {
  _key: string;
  _type: "block";
  style: string;
  children: SanitySpan[];
  markDefs: SanityMarkDef[];
}

export interface SanitySpan {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
}

export interface SanityMarkDef {
  _key: string;
  _type: string;
  href?: string;
}
