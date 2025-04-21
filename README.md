<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Authentication Service API Documentation
### Overview
The Authentication Service provides secure user management with features such as:
+ User signup with OTP verification via email.
+ User login with email/password or OTP.
+ Location storage for users.
+ Admin login with role-based access.
+ Password reset functionality with OTP.
+ Secure password hashing using bcrypt.
+ JWT-based authentication. 
+ Email delivery for OTPs using nodemailer.
## Endpoints
### User Signup
+ Endpoint: POST ``/auth/signup``
+ Description: Registers a new user and sends an OTP to their email for verification. 
+ Request Body:
````bash
{
  "name": "string",
  "email": "string",
  "password": "string"
}
````
+ Response
````bash
{
  "id": number,
  "name": "string",
  "email": "string"
}
````
+ Errors:
  + ``409 Conflict`` : Email already exists.

### Resend OTP
+ Endpoint: POST ``/auth/resend-otp``
+ Description: Resends a new OTP to the user's email. 
+ Request Body:
````bash 
{
  "email": "string"
}    
````
+ Response:
````bash
{
"message": "OTP resent successfully"
}
````
+ Errors:
  + ```404 Not Found```: User not found.

### Verify OTP

+ Endpoint: ````POST /auth/verify-otp````

+ Description: Verifies the OTP and returns a JWT token for the user.

+ Request Body:
````bash
{
"email": "string",
"otp": "string"
}
````
+ Response:
```bash
{
"token": "string"
}
```
+ Errors:
  + ```404 Not Found```: User not found. 
  + ```400 Bad Request:``` Invalid or expired OTP. 
### User Login
+ Endpoint: ````POST /auth/login````
+ Description: Authenticates a user with email and password, returning a JWT token.
+ Request Body:
````bash
{
"email": "string",
"password": "string"
}
````
+ Response:
````bash
{
"token": "string"
}
````
+ Errors:
  + ```401 Unauthorized```: Invalid email or password.

### Save User Location
+ Endpoint: ```POST /auth/save-location```
+ Description: Saves or updates a user's location (latitude, longitude, and address).
+ Request Body:
````bash
{
"userId": number,
"latitude": number,
"longitude": number,
"address": "string"
}
````
+ Response: None (204 No Content)

+ Errors:
  + ```404 Not Found```: User not found.

### Admin Login
+ Endpoint: ```POST /auth/admin-login```
+ Description: Authenticates an admin user and returns a JWT token.
+ Request Body:
```bash
{
"email": "string",
"password": "string"
}
```

+ Response:
```bash
{
"token": "string"
}
```
+ Errors:

  + ```401 Unauthorized:``` Invalid email or password. 
  + ```403 Forbidden:``` User is not an admin (if role check is enabled).

### Forgot Password OTP

+ Endpoint: ```POST /auth/forgot-password```
+ Description: Sends an OTP to the user's email for password reset. 
+ Request Body:
```bash
{
"email": "string"
}
```
+ Response:
```bash
{
"message": "OTP sent successfully"
}
```
+ Errors:
  + ``400 Bad Request``: Email not found.

### Reset Password
+ Endpoint: ```POST /auth/reset-password```
+ Description: Resets the user's password after OTP verification. 
+ Request Body:
```bash
{
"email": "string",
"newPassword": "string"
}
```
+ Response:
```bash
{
"success": true,
"message": "Password reset successfully"
}
```

+ Errors:
  + ```404 Not Found:``` User not found.

## Launder Service API Documentation

### Overview

The Launder Service manages launder entities, allowing creation, retrieval, updating, and deletion of launder records. It is built with NestJS and TypeORM, interacting with a Launder entity that stores details such as name, email, phone, password, state, address, NIN/BVN, bank name, and account number.

### Endpoints

### Create Launder

+ Endpoint: ```POST /launder```
+ Description: Creates a new launder entity.
+ Request Body:
````bash
{
"name": "string",
"email": "string",
"phone": "string",
"password": "string",
"state": "string",
"address": "string",
"ninOrBvn": "string",
"bankName": "string",
"accountNumber": "string"
}
````
+ Response:
````bash
{
"id": number,
"name": "string",
"email": "string",
"phone": "string",
"password": "string",
"state": "string",
"address": "string",
"ninOrBvn": "string",
"bankName": "string",
"accountNumber": "string"
}
````

+ Errors:
  + ```400 Bad Request```: Failed to create launder (e.g., invalid input or database error).

### Get All Launders
+ Endpoint: ``GET /launder``
+ Description: Retrieves a list of all launder entities.
+ Request Body: None
+ Response:
```bash
[
{
"id": number,
"name": "string",
"email": "string",
"phone": "string",
"password": "string",
"state": "string",
"address": "string",
"ninOrBvn": "string",
"bankName": "string",
"accountNumber": "string"
}
]
```
+ Errors: None

### Get Launder by ID

+ Endpoint: ```GET /launder/:id```
+ Description: Retrieves a single launder entity by its ID.
+ Parameters:
````bash
id: number (path parameter)
````
+ Response:
````bash
{
"id": number,
"name": "string",
"email": "string",
"phone": "string",
"password": "string",
"state": "string",
"address": "string",
"ninOrBvn": "string",
"bankName": "string",
"accountNumber": "string"
}
````
+ Errors:
  + None (returns ``null`` if launder is not found).

### Update Launder

+ Endpoint: ```PATCH /launder/:id```
+ Description: Updates an existing launder entity by its ID.
+ Parameters:
````bash
id: number (path parameter)
````
+ Request Body:
````bash
{
"name": "string",
"email": "string",
"phone": "string",
"password": "string",
"state": "string",
"address": "string",
"ninOrBvn": "string",
"bankName": "string",
"accountNumber": "string"
}
````
+ Response:
````bash
{
"id": number,
"name": "string",
"email": "string",
"phone": "string",
"password": "string",
"state": "string",
"address": "string",
"ninOrBvn": "string",
"bankName": "string",
"accountNumber": "string"
}
````
+ Errors:
  + None (returns ``null`` if launder is not found).

### Delete Launder
+ Endpoint: ``DELETE /launder/:id``
+ Description: Deletes a launder entity by its ID.
+ Parameters:
````bash
id: number (path parameter)
````
+ Response:
```bash
{
"deleted": boolean
}
```
+ Errors:
  + None (returns ```{ deleted: false }``` if launder is not found).

Laundry Service Management

Overview

The Laundry Service Management system handles laundry service entities, allowing creation, retrieval, updating, and deletion of laundry service records. It supports querying services by type and is built with NestJS and TypeORM, interacting with a ```LaundryService``` entity.

### Endpoints

#### Create Laundry Service
   + Endpoint: ```POST /laundry-service``` 
   + Description: Creates a new laundry service entity. 
   + Request Body:
```bash
{
"type": "string",
"description": "string",
"price": number
}
```
+ Response:
```bash
{
"id": number,
"type": "string",
"description": "string",
"price": number
}
```
+ Errors: ``None``

#### Get All Laundry Services


+ Endpoint: ```GET /laundry-service```

+ Description: Retrieves a list of all laundry service entities.

+ Request Body: ``None``

+ Response:
```bash
[
{
"id": number,
"type": "string",
"description": "string",
"price": number
}
]
```

+ Errors: ``None``

#### Get Laundry Service by ID

+ Endpoint: ``GET /laundry-service/:id``

+ Description: Retrieves a single laundry service entity by its ID. 
+ Parameters:
``
id: number (path parameter)
``

+ Response:
````bash
{
"id": number,
"type": "string",
"description": "string",
"price": number
}
````

+ Errors: None (returns null if service is not found).

#### Get Laundry Services by Type

+ Endpoint: ```GET /laundry-service/type/:type```
+ Description: Retrieves all laundry service entities of a specific type. 
+ Parameters:
```
 type: string (path parameter)
```

+ Response:
```bash
[
{
"id": number,
"type": "string",
"description": "string",
"price": number
}
]
```

+ Errors: None

#### Update Laundry Service

+ Endpoint: ```PATCH /laundry-service/:id```
+ Description: Updates an existing laundry service entity by its ID. 
+ Parameters:
```
id: number (path parameter)

```
+ Request Body:
```bash
{
"type": "string",
"description": "string",
"price": number
}
```
+ Response:
```bash
{
"id": number,
"type": "string",
"description": "string",
"price": number
}
```
+ Errors: None (returns null if service is not found).

#### Delete Laundry Service


+ Endpoint: ```DELETE /laundry-service/:id```
+ Description: Deletes a laundry service entity by its ID. 
+ Parameters:
```id: number (path parameter)```

+ Response: None (204 No Content)
+ Errors: None

### Packages Service
## Overview

The Packages Service manages package entities, allowing creation, retrieval, updating, and deletion of packages with associated services. It is built with NestJS and TypeORM, interacting with Package and Service entities, where each package can have multiple services linked to it.
### Endpoints
## Create Package

+ Endpoint: ``POST /packages``
+ Description: Creates a new package entity with associated services. 
+ Request Body:
````bash

    {
      "name": "string",
      "description": "string",
      "price": number,
      "services": [
        {
          "name": "string",
          "description": "string",
          "price": number
        }
      ]
    }
````
+ Response:
  ````bash  

    {
      "id": number,
      "name": "string",
      "description": "string",
      "price": number,
      "services": [
        {
          "id": number,
          "name": "string",
          "description": "string",
          "price": number
        }
      ]
    }
  ````

+ Errors: None

### Get All Packages

+ Endpoint: ``GET /packages``
+ Description: Retrieves a list of all package entities with their associated services. 
+ Request Body: ``None``
+ Response:
````bash
    [
      {
        "id": number,
        "name": "string",
        "description": "string",
        "price": number,
        "services": [
          {
            "id": number,
            "name": "string",
            "description": "string",
            "price": number
          }
        ]
      }
    ]
````
+ Errors: ``None``

### Get Package by ID
 + Endpoint: ``GET /packages/:id``
 + Description: Retrieves a single package entity by its ID, including its associated services. 
   + Parameters:
   ``id: number (path parameter)``
   + Response:
````bash
      {
        "id": number,
        "name": "string",
        "description": "string",
        "price": number,
        "services": [
          {
            "id": number,
            "name": "string",
            "description": "string",
            "price": number
          }
        ]
      }
````
+ Errors: None (returns null if package is not found).

### Update Package
 + Endpoint: ```PATCH /packages/:id```
 + Description: Updates an existing package entity by its ID. Note: This endpoint does not update associated services. 
 + Parameters:
 ```id: number (path parameter)```
 + Request Body:
````bash
    {
      "name": "string",
      "description": "string",
      "price": number
    }
````
+ Response:
````bash
    {
      "id": number,
      "name": "string",
      "description": "string",
      "price": number,
      "services": [
        {
          "id": number,
          "name": "string",
          "description": "string",
          "price": number
        }
      ]
    }
````
+ Errors: None (returns null if package is not found).

### Delete Package

+ Endpoint: ```DELETE /packages/:id```
+ Description: Deletes a package entity by its ID. 
+ Parameters:
```` id: number (path parameter)````
+ Response: None (204 No Content)
+ Errors: None


### Error Handling

#### The service uses the following NestJS exceptions for error handling:

+ ```ConflictException```: Resource conflict (e.g., email already exists). 
+ ```NotFoundException```: Resource not found (e.g., user not found). 
+ ```BadRequestException```: Invalid input (e.g., invalid OTP). 
+ ```UnauthorizedException```: Authentication failure (e.g., invalid credentials).
+ ```ForbiddenException```: Access denied (e.g., non-admin user).
+ ```BadRequestException```: Invalid input or database error during launder creation.

### Dependencies

+ NestJS: Framework for building the service. 
+ TypeORM: ORM for database interactions. 
+ JWT: For token-based authentication. 
+ bcrypt: For password hashing. 
+ nodemailer: For sending OTP emails. 
+ dotenv: For environment variable management.

### Environment Variables

#### The service relies on the following environment variables for email configuration:

+ ```SMTP_HOST```: SMTP server host (default: smtp.gmail.com). 
+ ```SMTP_PORT```: SMTP server port (default: 465). 
+ ```SMTP_USER```: SMTP email address.
+ ```SMTP_PASS```: SMTP email password.

Ensure these variables are set in a ```.env``` file or your environment for email functionality to work.
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
