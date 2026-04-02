import { defineField, defineType } from "sanity";

export const artworkType = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Painting", value: "painting" },
          { title: "Print", value: "print" },
          { title: "Installation", value: "installation" },
        ],
      },
    }),
    defineField({ name: "date", title: "Date", type: "number" }),
    defineField({ name: "medium", title: "Medium", type: "string" }),
    defineField({ name: "dimensions", title: "Dimensions", type: "string" }),
    defineField({ name: "exhibition", title: "Exhibition", type: "string" }),
    defineField({ name: "credit", title: "Credit", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "category",
    },
  },
});
