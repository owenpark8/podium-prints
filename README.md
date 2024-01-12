# Podium Prints
We offer a collection of vintage automotive artwork, including posters and print-advertisements. These pieces celebrate the innovation and design of the automotive industry's past, serving as a tribute to the enduring influence and aesthetic of classic cars and engineering.

#### TODO:
1. Better products page with sorting, filtering, and searching
2. More products
3. Fix redirect to origin after sign in
4. Send receipt to no cost orders
5. Better categorization of products

## Dev Environment Setup

### Prerequisites
- Docker and Docker Compose
- Terraform or AWS CLI
- [Stripe](https://stripe.com/) (free tier is sufficient)
- [Resend](https://resend.com/home) (free tier is sufficient)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/owenpark8/podium-prints.git
   cd podium-prints
   ```

2. **Set up your environment variables:**
   Rename the `.env.local` file in the root directory to `.env`
   ```bash
   mv .env.local .env
   ```

   Populate the following values in `.env` with your own:
   ```plaintext
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   RESEND_API_KEY=your_resend_api_key
   ```

3. **Run containers:**
   Ensure Docker is running, then execute the following command:

   ```bash
   make start-development
   ```

   At this point you will be able to open [http://localhost:3000](http://localhost:3000) with your browser to see the website. The admin dashboard is also available at [http://localhost:3000/admin](http://localhost:3000/admin) to manage the database.

4. **Make AWS S3 Bucket:**
   Product files are stored in a S3 bucket. LocalStack in a Docker container provides a mock S3 server available at the endpoint `http://localhost:4566` or `http://localhost.localstack.cloud:4566`[^1]. In order to create a bucket for the website, [install Terraform](https://developer.hashicorp.com/terraform/install) and run the following:

   ```bash
   cd terraform/localstack
   terraform init
   terraform apply
   ```

   [^1]: `http://localhost.localstack.cloud:4566` is [provided by LocalStack](https://docs.localstack.cloud/references/network-troubleshooting/endpoint-url/#from-your-container) and will resolve to the LocalStack instance. It is necessary for other containers to use this endpoint to connect to LocalStack. This means that files in the bucket will be saved using this domain. Google Chrome often has trouble resolving this. Use Firefox if having trouble viewing bucket objects with the URL.

### Cleanup
   1. **Destroy S3 Resource:**
   Without LocalStack Pro, the S3 bucket and its objects will not persist if the LocalStack container goes down. So, to properly clean up our resources, run from the project directory:
      
   ```bash
   cd terraform/localstack
   terraform destroy
   ```

   2. **Stopping Containers:**
   ```bash
   make stop-development
   ```
