import type { CollectionConfig } from "payload";

const isSuperAdmin = (appRole?: string | string[] | null) =>
  Array.isArray(appRole)
    ? appRole.includes("super-admin")
    : appRole === "super-admin";

const showAdminAfterLogin = ({ req }: any) => Boolean(req?.user);

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: true,
    useAPIKey: false,
    tokenExpiration: 1000 * 60 * 60 * 24 * 30, // 30 days
  },

  admin: {
    useAsTitle: "fullName",
  },
  access: {
    read: ({ req }) => {
      // Public profiles only when allowed
      return {
        _status: { not_equals: "draft" },
      };
    },
    update: ({ req }) => {
      // Prevent role editing unless super-admin
      return isSuperAdmin(req.user?.appRole);
    },
  },

  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        const isFirstUserCreation = operation === "create" && !req.user;
        // Prevent role modification unless super-admin
        if (data?.appRole && !isSuperAdmin(req.user?.appRole) && !isFirstUserCreation) {
          throw new Error("Only super-admin can modify user roles.");
        }

        // Under 18 Protection — auto-ban
        if (data?.dob) {
          const age =
            new Date().getFullYear() -
            new Date(data.dob).getFullYear();
          if (age < 18) {
            data.isBanned = true;
            data.banReason = "Underage";
          }
        }

        // First user = super-admin
        if (operation === "create") {
          const result = await req.payload.find({
            collection: "users",
            limit: 1,
          });
          if (result.totalDocs === 0) {
            data.appRole = "super-admin";
          } else {
            data.appRole = "user"; // Normal user
          }
        }

        return data;
      },
    ],
  },

  fields: [
    // --------- Identity ---------
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      admin: { condition: showAdminAfterLogin },
    },
    {
      name: "bio",
      type: "textarea",
      maxLength: 300,
      admin: { condition: showAdminAfterLogin },
    },

    // --------- Location ---------
    {
      name: "location",
      type: "text",
      admin: { condition: showAdminAfterLogin },
    },

    // --------- Age verification ---------
    {
      name: "dob",
      type: "date",
      required: true,
      admin: { condition: showAdminAfterLogin },
    },
    {
      name: "idUpload",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { condition: showAdminAfterLogin },
    },
    {
      name: "selfie",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { condition: showAdminAfterLogin },
    },
    {
      name: "idVerified",
      type: "checkbox",
      defaultValue: false,
      admin: { condition: showAdminAfterLogin },
    },

    // --------- NSFW preferences ---------
    {
      name: "nsfwAllowed",
      type: "checkbox",
      defaultValue: false,
      admin: { condition: showAdminAfterLogin },
    },

    // --------- Device Bans / Security ---------
    {
      name: "isBanned",
      type: "checkbox",
      defaultValue: false,
      admin: { condition: showAdminAfterLogin },
    },
    {
      name: "banReason",
      type: "text",
      admin: { condition: showAdminAfterLogin },
    },
    {
      name: "bannedIPs",
      type: "array",
      admin: { condition: showAdminAfterLogin },
      fields: [
        { name: "ip", type: "text" },
      ],
    },
    {
      name: "bannedDevices",
      type: "array",
      admin: { condition: showAdminAfterLogin },
      fields: [
        { name: "deviceId", type: "text" },
      ],
    },
    {
      name: "bannedPhones",
      type: "array",
      admin: { condition: showAdminAfterLogin },
      fields: [
        { name: "phone", type: "text" },
      ],
    },

    // --------- Agreement Flags ---------
    {
      name: "acceptedTerms",
      type: "checkbox",
      required: true,
      defaultValue: false,
      admin: { condition: showAdminAfterLogin },
    },
    // --------- Roles ---------
    {
      name: "appRole",
      type: "select",
      defaultValue: "user",
      required: true,
      access: {
        update: ({ req }) => req.user?.appRole === "super-admin",
      },
      options: [
        { label: "Super Admin", value: "super-admin" },
        { label: "Moderator", value: "moderator" },
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },

    // --------- System ---------
    {
      name: "lastLogin",
      type: "date",
    },
    {
      name: "deviceUUID",
      type: "text",
    },
  ],
};
