import { isAdminAccess } from "../app/access/isAdmin";
import { Access, CollectionConfig } from "payload/types";

const yourOwnOrder: Access = async ({ req }) => {
  const isAdmin = await isAdminAccess({ req });
  if (isAdmin) {
    return true;
  }

  return {
    user: {
      equals: req.user?.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: isAdminAccess,
    read: yourOwnOrder,
    update: isAdminAccess,
    delete: isAdminAccess,
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};
