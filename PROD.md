# Odin production deployment instructions

Prerequisites:
1. Ensure you have a working AWS API key
2. Install Terraform
3. Clone the odin-infra repository.

Deployment:
1. Check diff to currently deployed configuration with `terraform plan`
2. Run `terraform apply`

Building the terraform configuration from scratch:
1. Allocate Ubuntu 20.04 LTS amazon ECS instances in 3 different availability regions, for frontend and backend
2. Ensure DNS / routing rules are correct
