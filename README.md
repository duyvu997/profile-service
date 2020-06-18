# RENTHOUSE - Profile Microservices

This repository contains the implementation of a microservice to provide house management function to RENTHOUSE including: get houses, get house detail,... This base around and AWS serverless architecture with the following important technologies:

* TypeScript: to provide highly productive development tools for JavaScript IDEs and practices, like static checking. TypeScript makes code easier to read and understand.
* Serverless framework: for developing and deploying serverless application to AWS
* Mongoose, Typegoose and mongo-unit: for interacting with and unit-testing MongoDB
* Mocha / Chai / Sinon: for unit testing the application
* husky, tslint and prettier: for enforcing coding style and practices right on development environment
* AWS Lambda: for implementing business function with JavaScript
* AWS API Gateway: for accessing Lambda functions
* AWS S3: as file storage
* MongoDB (hosted by AWS DocumentDB): as main data storage
* AWS SNS: for pushing notification to mobile app 

## System requirements for local development

* MongoDB (via Docker)
* Localstack (via Docker): for locally development with SNS
* NodeJS 12+
* Yarn
* Visual Studio Code
* Docker

## Deploy
*  serverless deploy --force --aws-profile rent-house --stage dev 