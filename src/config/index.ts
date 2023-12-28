export const PRODUCT_BRANDS = [
  {
    label: "McLaren",
    value: "McLaren" as const,
  },
  {
    label: "Porsche",
    value: "porsche" as const,
  },
  {
    label: "Ferrari",
    value: "ferrari" as const,
  },
  {
    label: "BMW",
    value: "bmw" as const,
  },
];

export const PRODUCT_CATEGORIES = [
  {
    label: "Best Sellers",
    value: "best_seller" as const,
  },
  {
    label: "New Arrivals",
    value: "new_arrival" as const,
  },
  {
    label: "Free Downloads",
    value: "free_download" as const,
  },
  {
    label: "Formula One",
    value: "formula_one" as const,
  },
  {
    label: "24 Hours of Le Mans",
    value: "le_mans" as const,
  },
];

export const NAV_CATEGORIES = [
  // {
  //   label: "All Products",
  //   value: "all_products" as const,
  //   featured: [
  //     {
  //       name: "Best Sellers",
  //       href: "#",
  //       imageSrc: "/nav/categories/best.jpg",
  //     },
  //     {
  //       name: "New Arrivals",
  //       href: "#",
  //       imageSrc: "/nav/categories/new.jpg",
  //     },
  //     {
  //       name: "Free Downloads",
  //       href: "#",
  //       imageSrc: "/nav/categories/free.jpg",
  //     },
  //   ],
  // },
  {
    label: "Popular Brands",
    value: "brands" as const,
    featured: [
      {
        name: "Porsche",
        href: "/products?brand=porsche",
        imageSrc: "/nav/brands/porsche.webp",
      },
      {
        name: "Ferrari",
        href: "/products?brand=ferrari",
        imageSrc: "/nav/brands/ferrari.webp",
      },
      {
        name: "BMW",
        href: "/products?brand=bmw",
        imageSrc: "/nav/brands/bmw.webp",
      },
    ],
  },
];
