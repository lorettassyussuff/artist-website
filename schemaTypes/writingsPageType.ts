import { defineField, defineType } from "sanity";

export const writingsPageType = defineType({
  name: "writingsPage",
  title: "Writings Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "sectionTitle",
      title: "Section title",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "publicationTitle",
      title: "Publication title",
      type: "string",
    }),
    defineField({
      name: "publicationDescription",
      title: "Publication description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publicationPdf",
      title: "Publication PDF",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
});
