import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "sectionEyebrow",
      title: "Section eyebrow",
      type: "string",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section title",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "items",
      title: "Contact items",
      type: "array",
      of: [{ type: "contactItem" }],
    }),
  ],
});
