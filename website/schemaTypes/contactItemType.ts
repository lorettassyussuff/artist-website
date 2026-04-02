import { defineField, defineType } from "sanity";

export const contactItemType = defineType({
  name: "contactItem",
  title: "Contact Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "value", title: "Value", type: "string" }),
    defineField({ name: "href", title: "Link", type: "string" }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Instagram", value: "instagram" },
          { title: "Email", value: "email" },
        ],
      },
    }),
  ],
});
