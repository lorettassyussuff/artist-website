import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "mailingListUrl", title: "Mailing list URL", type: "url" }),
    defineField({ name: "aboutNavLabel", title: "About nav label", type: "string" }),
    defineField({
      name: "selectedWorksNavLabel",
      title: "Selected works nav label",
      type: "string",
    }),
    defineField({ name: "cvNavLabel", title: "CV nav label", type: "string" }),
    defineField({
      name: "writingsNavLabel",
      title: "Writings nav label",
      type: "string",
    }),
    defineField({
      name: "contactNavLabel",
      title: "Contact nav label",
      type: "string",
    }),
    defineField({
      name: "instagramLabel",
      title: "Instagram label",
      type: "string",
    }),
  ],
});
