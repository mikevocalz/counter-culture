import type { CollectionConfig } from "payload";

export const Notifications: CollectionConfig = {
  slug: "notifications",
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    delete: ({ req }) => req.user?.appRole === "super-admin",
  },
  fields: [
    { name: "user", type: "relationship", relationTo: "users", required: true },
    {
      name: "type",
      type: "select",
      options: ["like", "comment", "follow", "mention", "system"],
      required: true,
    },
    { name: "content", type: "text" },
    { name: "read", type: "checkbox", defaultValue: false },
  ],
};
