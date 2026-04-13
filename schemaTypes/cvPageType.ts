import { defineField, defineType } from "sanity";

export const cvPageType = defineType({
  name: "cvPage",
  title: "CV Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "entries",
              title: "Entries",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "primary", title: "Primary", type: "string" }),
                    defineField({ name: "secondary", title: "Secondary", type: "string" }),
                    defineField({ name: "meta", title: "Meta", type: "string" }),
                    defineField({ name: "line", title: "Single-line entry", type: "string" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
