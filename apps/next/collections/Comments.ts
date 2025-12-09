import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    create: ({ req }) => {
      if (!req.user) return false;
      if (req.user.suspended) throw new Error("Suspended.");
      if (!req.user.idVerified) throw new Error("ID verification required.");
      return true;
    },
    read: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.appRole === "super-admin",
  },
  fields: [
    { name: "text", type: "textarea", required: true },
    { name: "post", type: "relationship", relationTo: "posts", required: true },
    { name: "author", type: "relationship", relationTo: "users", required: true },
    {
      name: "parent",
      type: "relationship",
      relationTo: "comments",
    },
  ],
};
