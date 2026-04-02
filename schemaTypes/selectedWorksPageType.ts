import { defineField, defineType } from "sanity";

export const selectedWorksPageType = defineType({
  name: "selectedWorksPage",
  title: "Selected Works Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "paintingsTitle",
      title: "Paintings title",
      type: "string",
    }),
    defineField({
      name: "paintingsIntro",
      title: "Paintings intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "paintingsNavLabel",
      title: "Paintings nav label",
      type: "string",
    }),
    defineField({
      name: "printsTitle",
      title: "Prints title",
      type: "string",
    }),
    defineField({
      name: "printsIntro",
      title: "Prints intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "printsNavLabel",
      title: "Prints nav label",
      type: "string",
    }),
  ],
});
