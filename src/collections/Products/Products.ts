import { Product } from "../../payload-types";
import { isAdminAccess, isAdminFieldAccess } from "../../app/access/isAdmin";
import { PRODUCT_BRANDS, PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { stripe } from "../../lib/stripe";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: isAdminAccess,
    read: () => true,
    update: isAdminAccess,
    delete: isAdminAccess,
  },
  hooks: {
    beforeChange: [
      async (args) => {
        if (args.operation === "create") {
          const data = args.data as Product;

          const createdProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: "USD",
              unit_amount: Math.round(data.price * 100),
            },
          });
          const created: Product = {
            ...data,
            stripeId: createdProduct.id,
            priceId: createdProduct.default_price as string,
          };

          return created;
        } else if (args.operation === "update") {
          const data = args.data as Product;

          const updatedProduct = await stripe.products.update(data.stripeId!, {
            name: data.name,
            default_price: data.priceId!,
          });
          const updated: Product = {
            ...data,
            stripeId: updatedProduct.id,
            priceId: updatedProduct.default_price as string,
          };

          return updated;
        }
      },
    ],
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Product Details",
      type: "textarea",
    },
    {
      name: "price",
      label: "Price",
      min: 0,
      max: 1000,
      type: "number",
      required: true,
    },
    {
      name: "brand",
      label: "Brand",
      type: "select",
      options: PRODUCT_BRANDS.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: false,
      hasMany: true,
    },
    {
      name: "product_file",
      label: "Product File",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: isAdminFieldAccess,
        update: () => false,
      },
      type: "text",
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: isAdminFieldAccess,
        update: () => false,
      },
      type: "text",
    },
    {
      name: "images",
      type: "array",
      label: "Product Images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
