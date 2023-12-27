import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { isAdminAccess } from "../app/access/isAdmin";
import { Access, CollectionConfig } from "payload/types";

const isLoggedInUser: Access = async ({ req }) => {
  const isAdmin = await isAdminAccess({ req });
  if (isAdmin) {
    return true;
  }
  return {
    id: {
      equals: req.user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: () => true,
    read: () => true,
    update: isAdminAccess,
    delete: isAdminAccess,
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
        });
      },
    },
  },
  fields: [],
};
