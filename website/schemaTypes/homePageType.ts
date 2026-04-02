import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero image alt",
      type: "string",
    }),
    defineField({
      name: "heroCaption",
      title: "Hero caption",
      type: "string",
    }),
  ],
});
