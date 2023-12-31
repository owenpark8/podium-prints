import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";
import { Admins } from "./collections/Admins";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { ProductFiles } from "./collections/ProductFiles";
import { Products } from "./collections/Products/Products";
import { Users } from "./collections/Users";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Admins, Products, ProductFiles, Orders, Media],
  plugins: [
    // Pass the plugin to Payload
    cloudStorage({
      collections: {
        // Enable cloud storage for ProductFiles collection
        product_files: {
          // Create the S3 adapter
          adapter: s3Adapter({
            config: {
              endpoint: process.env.S3_ENDPOINT,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
              },
              forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
              region: process.env.S3_REGION,
            },
            bucket: process.env.S3_BUCKET ?? "",
          }),
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
        },
      },
    }),
  ],
  routes: {
    admin: "/admin",
  },
  admin: {
    user: "admins",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- PodiumPrints",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
