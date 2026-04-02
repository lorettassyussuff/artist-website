import { defineField, defineType } from "sanity";

export const cvPageType = defineType({
  name: "cvPage",
  title: "CV Page",
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
  ],
});
