## Getting Started

A .env file in the root directory should be populated with the following variables:

    PAYLOAD_SECRET=examplesecret123
    MONGODB_URL=
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    STRIPE_SECRET_KEY=
    STRIPE_WEBHOOK_SECRET=
    RESEND_API_KEY=

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


**TODO:**
1. Fix download link
2. Better products page with sorting and filtering
3. Storing product files and images in S3
   1. [https://payloadcms.com/blog/plugin-cloud-storage](https://payloadcms.com/blog/plugin-cloud-storage)
4. Send receipt to no cost orders
5. Better categorization of products