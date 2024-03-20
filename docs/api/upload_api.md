# upload API Documentation

This document provides detailed information on the API endpoints related to sample file uploads in studies. Each section contains tables that describe the request methods, paths, parameters, request bodies, response codes, and response models.

## Table of Contents

- [POST /upload/{accession_id}/{sample_id}](#post-uploadaccession_idsample_id)
- [GET /download/{accession_id}/{sample_id}](#get-downloadaccession_idsample_id)
- [DELETE /delete/{accession_id}/{sample_id}](#delete-deleteaccession_idsample_id)
- [PUT /update/{accession_id}/{sample_id}](#put-updateaccession_idsample_id)

---

### POST /upload/{accession_id}/{sample_id}

| Description                | Uploads a file for a specific sample in a study.             |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `POST /upload/{accession_id}/{sample_id}`                     |
| **Path Parameters**        | `accession_id (str)`, `sample_id (str)`                       |
| **Request Body**           | File content in form data                                     |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`, `400 Bad Request`           |
| **Response Model**         | None (HTTP status code only)                                  |

---

### GET /download/{accession_id}/{sample_id}

| Description                | Downloads a file for a specific sample in a study.           |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `GET /download/{accession_id}/{sample_id}`                    |
| **Path Parameters**        | `accession_id (str)`, `sample_id (str)`                       |
| **Request Body**           | None                                                          |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `404 Not Found`                                               |
| **Response Model**         | File content as a direct download                             |

---

### DELETE /delete/{accession_id}/{sample_id}

| Description                | Deletes a file for a specific sample in a study.              |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `DELETE /delete/{accession_id}/{sample_id}`                   |
| **Path Parameters**        | `accession_id (str)`, `sample_id (str)`                       |
| **Request Body**           | None                                                          |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`                              |
| **Response Model**         | None (HTTP status code only)                                  |

---

### PUT /update/{accession_id}/{sample_id}

| Description                | Updates a file for a specific sample in a study.              |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `PUT /update/{accession_id}/{sample_id}`                      |
| **Path Parameters**        | `accession_id (str)`, `sample_id (str)`                       |
| **Request Body**           | New file content in form data                                 |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`, `400 Bad Request`           |
| **Response Model**         | None (HTTP status code only)                                  |

---

## Common Error Responses

- `400 Bad Request`: The server cannot process the request due to a client error (e.g., malformed request syntax, invalid file format).
- `403 Forbidden`: The client does not have access rights to the content; the user is not permitted to perform this action.
- `404 Not Found`: The server cannot find the requested resource (e.g., study not found, sample not found, file not found).
