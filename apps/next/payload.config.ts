import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users,Posts,Comments,Media,Messages,Notifications,Reports } from "./collections";
import { betterAuthPlugin } from "payload-auth";
import { username } from "better-auth/plugins";

// Better Auth plugins

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Posts,
    Comments,
    Media,
    Messages,
    Notifications,
    Reports,
 ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
     // ssl: { rejectUnauthorized: false },
    },
  }),
  sharp,

  plugins: [
    betterAuthPlugin({
      users: {
        slug: "users",
      },

      /**
       * Configure Better-Auth through this object
       */
      betterAuthOptions: {
        plugins: [
          username({
            minUsernameLength: 3,
            maxUsernameLength: 30,
          }),
        ],
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            redirectURI:
              process.env.NEXT_PUBLIC_APP_URL +
              "/api/auth/callback/google",
          },
          apple: {
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
            redirectURI:
              process.env.NEXT_PUBLIC_APP_URL + "/api/auth/callback/apple",
          },
        },
      },
    }),
  ],
});
