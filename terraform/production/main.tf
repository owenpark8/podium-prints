provider "aws" {
  access_key                  = "test"
  secret_key                  = "test"
  region                      = "us-east-1"
}

resource "aws_s3_bucket" "my_local_bucket" {
  bucket = "podium-prints-dev-bucket"
  force_destroy = true
}
