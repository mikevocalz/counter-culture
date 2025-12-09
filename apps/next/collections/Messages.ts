import type { CollectionConfig } from "payload";

export const Messages: CollectionConfig = {
  slug: "messages",
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => {
      if (!req.user?.idVerified) return false;
      return true;
    },
    delete: ({ req }) => {
      const appRole = req.user?.appRole;
      return Array.isArray(appRole)
        ? appRole.includes("super-admin")
        : appRole === "super-admin";
    },
  },
  fields: [
    { name: "conversationId", type: "text", index: true },
    { name: "sender", type: "relationship", relationTo: "users", required: true },
    { name: "receiver", type: "relationship", relationTo: "users", required: true },
    { name: "message", type: "textarea", required: true },
  ],
};
