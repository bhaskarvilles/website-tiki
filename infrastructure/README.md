Infrastructure
===========
Terraform is used for all infrastructure provisioning, 
updates, management, etc. The only exception are IAM 
Permissions which must be pre-configured. 

## Requires
- **Terraform Cloud** - Used for execution, variables, and 
remote state management. 
- **AWS** - Sole supported cloud provider.
- **GH Actions** - Preps static site files and lambda zips

## Project Structure
- provider_\<xyz>.tf - infrastructure providers
- resource_\<xyz>.tf - flat resource scripts (includes 
vars, data, resource, and outputs)
- variables_global.tf - cross file vars and locals

## Execution
Execution automated via [GH action](../.github/workflows/deploy.yml)
to generate and then deploy the static site and corresponding
backend functions. Deployments trigger on push to master. Terraform
Cloud does the actual terraform execution as well as maintains
the workspace variables and state. 
