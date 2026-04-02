import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";
import seed from "./initialContent.data.cjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.resolve(repoRoot, ".env.local") });
dotenv.config({ path: path.resolve(repoRoot, ".env") });

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in your environment.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function resolveAssetPath(relativePath) {
  return path.resolve(repoRoot, relativePath.replace(/^website\//, ""));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

async function uploadImage(relativePath) {
  const filePath = resolveAssetPath(relativePath);
  const fileStream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("image", fileStream, {
    filename: path.basename(filePath),
    contentType: getContentType(filePath),
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function uploadFile(relativePath) {
  const filePath = resolveAssetPath(relativePath);
  const fileStream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("file", fileStream, {
    filename: path.basename(filePath),
    contentType: getContentType(filePath),
  });

  return {
    _type: "file",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

function withKeys(blocks = []) {
  return blocks.map((block, blockIndex) => ({
    ...block,
    _key: `block-${blockIndex + 1}`,
    markDefs: block.markDefs || [],
    children: (block.children || []).map((child, childIndex) => ({
      ...child,
      _key: `span-${blockIndex + 1}-${childIndex + 1}`,
      marks: child.marks || [],
    })),
  }));
}

async function buildSingletonDocs() {
  const siteSettingsDoc = {
    _id: "siteSettings",
    _type: seed.siteSettings._type,
    siteTitle: seed.siteSettings.siteTitle,
    tagline: seed.siteSettings.tagline,
    description: seed.siteSettings.description,
    email: seed.siteSettings.email,
    instagramUrl: seed.siteSettings.instagramUrl,
    mailingListUrl: seed.siteSettings.mailingListUrl,
    aboutNavLabel: seed.siteSettings.aboutNavLabel,
    selectedWorksNavLabel: seed.siteSettings.selectedWorksNavLabel,
    cvNavLabel: seed.siteSettings.cvNavLabel,
    writingsNavLabel: seed.siteSettings.writingsNavLabel,
    contactNavLabel: seed.siteSettings.contactNavLabel,
    instagramLabel: seed.siteSettings.instagramLabel,
  };

  const homePageDoc = {
    _id: "homePage",
    _type: seed.homePage._type,
    title: seed.homePage.title,
    intro: withKeys(seed.homePage.intro),
    heroImage: await uploadImage(seed.homePage.heroImageAssetPath),
    heroImageAlt: seed.homePage.heroImageAlt,
    heroCaption: seed.homePage.heroCaption,
  };

  const aboutPageDoc = {
    _id: "aboutPage",
    _type: seed.aboutPage._type,
    title: seed.aboutPage.title,
    sectionEyebrow: seed.aboutPage.sectionEyebrow,
    sectionTitle: seed.aboutPage.sectionTitle,
    body: withKeys(seed.aboutPage.body),
    portrait: await uploadImage(seed.aboutPage.portraitAssetPath),
    portraitAlt: seed.aboutPage.portraitAlt,
    cvLinkLabel: seed.aboutPage.cvLinkLabel,
    instagramLinkLabel: seed.aboutPage.instagramLinkLabel,
  };

  const selectedWorksPageDoc = {
    _id: "selectedWorksPage",
    _type: seed.selectedWorksPage._type,
    title: seed.selectedWorksPage.title,
    paintingsTitle: seed.selectedWorksPage.paintingsTitle,
    paintingsIntro: seed.selectedWorksPage.paintingsIntro,
    paintingsNavLabel: seed.selectedWorksPage.paintingsNavLabel,
    printsTitle: seed.selectedWorksPage.printsTitle,
    printsIntro: seed.selectedWorksPage.printsIntro,
    printsNavLabel: seed.selectedWorksPage.printsNavLabel,
  };

  const cvPageDoc = {
    _id: "cvPage",
    _type: seed.cvPage._type,
    title: seed.cvPage.title,
    sectionEyebrow: seed.cvPage.sectionEyebrow,
    sectionTitle: seed.cvPage.sectionTitle,
  };

  const writingsPageDoc = {
    _id: "writingsPage",
    _type: seed.writingsPage._type,
    title: seed.writingsPage.title,
    sectionEyebrow: seed.writingsPage.sectionEyebrow,
    sectionTitle: seed.writingsPage.sectionTitle,
    intro: withKeys(seed.writingsPage.intro),
    publicationTitle: seed.writingsPage.publicationTitle,
    publicationDescription: seed.writingsPage.publicationDescription,
    publicationPdf: await uploadFile(seed.writingsPage.publicationPdfAssetPath),
  };

  const contactPageDoc = {
    _id: "contactPage",
    _type: seed.contactPage._type,
    title: seed.contactPage.title,
    sectionEyebrow: seed.contactPage.sectionEyebrow,
    sectionTitle: seed.contactPage.sectionTitle,
    intro: withKeys(seed.contactPage.intro),
    items: seed.contactPage.items.map((item, index) => ({
      ...item,
      _key: `contact-item-${index + 1}`,
    })),
  };

  return [
    siteSettingsDoc,
    homePageDoc,
    aboutPageDoc,
    selectedWorksPageDoc,
    cvPageDoc,
    writingsPageDoc,
    contactPageDoc,
  ];
}

async function buildArtworkDocs() {
  return Promise.all(
    seed.artworks.map(async (artwork) => ({
      _id: `artwork-${artwork.slug.current}`,
      _type: artwork._type,
      title: artwork.title,
      slug: artwork.slug,
      category: artwork.category,
      date: artwork.date,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      exhibition: artwork.exhibition,
      credit: artwork.credit,
      featured: artwork.featured,
      sortOrder: artwork.sortOrder,
      image: await uploadImage(artwork.imageAssetPath),
    })),
  );
}

function buildCvDocs() {
  return seed.cvSections.map((section) => ({
    _id: `cvSection-${slugify(section.title)}`,
    _type: section._type,
    title: section.title,
    sortOrder: section.sortOrder,
    entries: section.entries.map((entry, index) => ({
      _key: `cv-entry-${index + 1}`,
      ...entry,
    })),
  }));
}

async function importAll() {
  const singletonDocs = await buildSingletonDocs();
  const artworkDocs = await buildArtworkDocs();
  const cvDocs = buildCvDocs();
  const docs = [...singletonDocs, ...artworkDocs, ...cvDocs];

  await client.delete("artwork-psalm-2-death-waiting-2025-cropped").catch(() => {});

  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`Imported ${doc._id}`);
  }
}

importAll().catch((error) => {
  console.error(error);
  process.exit(1);
});
