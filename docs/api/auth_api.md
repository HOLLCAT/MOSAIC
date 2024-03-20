# Auth API Documentation

This document provides detailed information on the API endpoints related to authentication. Each section contains tables that describe the request methods, paths, parameters, request bodies, response codes, and response models.

## Table of Contents

- [POST /token](#post-token)
- [POST /login](#post-login)
- [POST /register](#post-register)

---

### POST /token

| Description                | Authenticates a user and generates an access token.          |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `POST /token`                                                 |
| **Request Body**           | `OAuth2PasswordRequestForm`                                   |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `400 Bad Request`, `401 Unauthorized`                         |
| **Response Model**         | `UserResponse`                                                |

---

### POST /login

| Description                | Authenticates a user and generates an access token.          |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `POST /login`                                                 |
| **Request Body**           | `LoginRequest`                                                |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `400 Bad Request`, `401 Unauthorized`                         |
| **Response Model**         | `UserResponse`                                                |

---

### POST /register

| Description                | Registers a new user.                                         |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `POST /register`                                              |
| **Request Body**           | `RegisterRequest`                                             |
| **Success Response Code**  | `201 Created`                                                 |
| **Error Response Codes**   | `400 Bad Request`, `409 Conflict` (for email already taken)   |
| **Response Model**         | `UserResponse`                                                |

---

## Common Error Responses

- `400 Bad Request`: The server cannot process the request due to a client error (e.g., malformed request syntax).
- `401 Unauthorized`: Authentication is required and has failed or has not yet been provided.
- `403 Forbidden`: The client does not have access rights to the content.
- `404 Not Found`: The server can not find the requested resource.
- `409 Conflict`: A request conflict with current state of the server (e.g., duplicate email).
