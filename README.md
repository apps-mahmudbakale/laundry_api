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

### Error Handling

#### The service uses the following NestJS exceptions for error handling:

+ ```ConflictException```: Resource conflict (e.g., email already exists). 
+ ```NotFoundException```: Resource not found (e.g., user not found). 
+ ```BadRequestException```: Invalid input (e.g., invalid OTP). 
+ ```UnauthorizedException```: Authentication failure (e.g., invalid credentials).
+ ```ForbiddenException```: Access denied (e.g., non-admin user).

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
