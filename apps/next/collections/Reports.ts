export const Reports = {
  slug: "reports",
  access: {
    read: ({ req }) =>
      req.user?.appRole === "moderator" || req.user?.appRole === "super-admin",
    create: ({ req }) => !!req.user,
    update: ({ req }) => req.user?.appRole === "super-admin",
    delete: ({ req }) => req.user?.appRole === "super-admin",
  },
  fields: [
    { name: "type", type: "select", options: ["user", "post"] },
    { name: "reportedUser", type: "relationship", relationTo: "users" },
    { name: "reportedPost", type: "relationship", relationTo: "posts" },
    { name: "reason", type: "textarea" },
    { name: "resolved", type: "checkbox", defaultValue: false },
  ],
};
