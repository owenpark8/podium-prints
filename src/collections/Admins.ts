import { isAdminAccess } from "../app/access/isAdmin";
import { CollectionConfig } from "payload/types";

export const Admins: CollectionConfig = {
  slug: "admins",
  auth: {},
  access: {
    create: isAdminAccess,
    read: isAdminAccess,
    update: isAdminAccess,
    delete: isAdminAccess,
  },
  fields: [],
};
