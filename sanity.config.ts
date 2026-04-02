import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Loretta Yussuff Studio",
  basePath: "/studio",
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID ||
    "yourProjectId",
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  releases: {
    enabled: false,
  },
  scheduledDrafts: {
    enabled: false,
  },
});
