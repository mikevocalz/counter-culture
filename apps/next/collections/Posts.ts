import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    read: ({ req }) => {
      if (!req.user?.nsfwAllowed) return { nsfw: { equals: false } };
      return true;
    },
    create: ({ req }) => {
      if (!req.user) return false;
      if (req.user.suspended) throw new Error("Account suspended.");
      if (!req.user.idVerified) throw new Error("ID verification required.");
      return true;
    },
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.appRole === "super-admin",
  },
  admin: { useAsTitle: "content" },
  fields: [
    { name: "content", type: "textarea", required: true },
    { name: "media", type: "upload", relationTo: "media" },
    { name: "nsfw", type: "checkbox", defaultValue: false, index: true },
    { name: "location", type: "text" },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "likes",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
    },
  ],
};
