import { Admin, User } from "@/payload-types";
import { Access, FieldAccess } from "payload/types";

export const isAdminAccess: Access = async ({ req }) => {
  const user = req.user as User | Admin | null;

  if (!user) {
    return false;
  }

  const result = await req.payload.findByID({
    collection: "admins",
    depth: 0,
    id: user.id,
  });
  return result !== null;
};

export const isAdminFieldAccess: FieldAccess = async ({ req }) => {
  const user = req.user as User | Admin | null;

  if (!user) {
    return false;
  }

  const result = await req.payload.findByID({
    collection: "admins",
    depth: 0,
    id: user.id,
  });
  return result !== null;
};
