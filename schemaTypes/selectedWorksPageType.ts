import { defineField, defineType } from "sanity";

const artworkFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "date", title: "Date", type: "number" }),
  defineField({ name: "medium", title: "Medium", type: "string" }),
  defineField({ name: "dimensions", title: "Dimensions", type: "string" }),
  defineField({ name: "credit", title: "Credit", type: "string" }),
  defineField({ name: "image", title: "Image", type: "image" }),
  defineField({
    name: "alt",
    title: "Alt text",
    type: "string",
    description: "Short image description for accessibility.",
    validation: (rule) => rule.max(160),
  }),
];

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
      name: "paintings",
      title: "Paintings",
      type: "array",
      of: [
        {
          type: "object",
          preview: { select: { title: "title", media: "image" } },
          fields: artworkFields,
        },
      ],
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
    defineField({
      name: "prints",
      title: "Prints",
      type: "array",
      of: [
        {
          type: "object",
          preview: { select: { title: "title", media: "image" } },
          fields: artworkFields,
        },
      ],
    }),
  ],
});
