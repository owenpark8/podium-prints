import { isAdminAccess } from "../app/access/isAdmin";
import { Admin, User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const purchased: Access = async ({ req }) => {
  const isAdmin = await isAdminAccess({ req });
  if (isAdmin) {
    return true;
  }

  const user = req.user as User | Admin | null;

  if (!user) {
    return false;
  }

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductFileIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === "string") {
          return req.payload.logger.error(
            "Search depth not sufficient to find purchased file IDs"
          );
        }
        return typeof product.product_file === "string"
          ? product.product_file
          : product.product_file.id;
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: purchasedProductFileIds,
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    useAsTitle: "Product Files",
  },
  access: {
    create: isAdminAccess,
    read: purchased,
    update: isAdminAccess,
    delete: isAdminAccess,
  },
  // TODO: Impolement S3 bucket
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["application/pdf", "image/*"],
  },
  fields: [],
};
