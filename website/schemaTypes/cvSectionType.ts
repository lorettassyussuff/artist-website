import { defineField, defineType } from "sanity";

export const cvSectionType = defineType({
  name: "cvSection",
  title: "CV Section",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
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
});
