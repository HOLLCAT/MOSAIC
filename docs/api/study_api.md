# Study API Documentation

This document provides detailed information on the API endpoints related to studies. Each section contains tables that describe the request methods, paths, parameters, request bodies, response codes, and response models.

## Table of Contents

- [GET /studies](#get-studies)
- [POST /studies](#post-studies)
- [GET /studies/search/{title}](#get-studiessearchtitle)
- [GET /studies/{accession_id}](#get-studiesaccession_id)
- [DELETE /studies/{accession_id}](#delete-studiesaccession_id)
- [PUT /studies/{accession_id}](#put-studiesaccession_id)
- [POST /studies/upload-metadata](#post-studiesupload-metadata)

---

### GET /studies

| Description                | Retrieve all studies from the database.                     |
|----------------------------|-------------------------------------------------------------|
| **Method & Path**          | `GET /studies`                                              |
| **Query Parameters**       | None                                                        |
| **Request Body**           | None                                                        |
| **Success Response Code**  | `200 OK`                                                    |
| **Error Response Codes**   | `404 Not Found`                                             |
| **Response Model**         | `List[StudyResponse]`                                       |

---

### POST /studies

| Description                | Create a new study and add it to the database.              |
|----------------------------|-------------------------------------------------------------|
| **Method & Path**          | `POST /studies`                                             |
| **Request Body**           | `study (CreateStudy)`, `audit (CreateAuditMessage)`         |
| **Success Response Code**  | `201 Created`                                               |
| **Error Response Codes**   | `400 Bad Request`                                           |
| **Response Model**         | `StudyResponse`                                             |

---

### GET /studies/search/{title}

| Description                | Search studies by title.                                    |
|----------------------------|-------------------------------------------------------------|
| **Method & Path**          | `GET /studies/search/{title}`                               |
| **Path Parameters**        | `title (str)`                                               |
| **Request Body**           | None                                                        |
| **Success Response Code**  | `200 OK`                                                    |
| **Error Response Codes**   | `404 Not Found`, `400 Bad Request` (if title is missing)    |
| **Response Model**         | `List[StudyResponse]`                                       |

---

### GET /studies/{accession_id}

| Description                | Retrieve a study by its accession ID.                       |
|----------------------------|-------------------------------------------------------------|
| **Method & Path**          | `GET /studies/{accession_id}`                               |
| **Path Parameters**        | `accession_id (str)`                                        |
| **Request Body**           | None                                                        |
| **Success Response Code**  | `200 OK`                                                    |
| **Error Response Codes**   | `404 Not Found`                                             |
| **Response Model**         | `StudyResponse`                                             |

---

### DELETE /studies/{accession_id}

| Description                | Delete a study from the database.                           |
|----------------------------|-------------------------------------------------------------|
| **Method & Path**          | `DELETE /studies/{accession_id}`                            |
| **Path Parameters**        | `accession_id (str)`                                        |
| **Request Body**           | None                                                        |
| **Success Response Code**  | `200 OK`                                                    |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`                            |
| **Response Model**         | `StudyResponse`                                             |

---

### PUT /studies/{accession_id}

| Description                | Update a study in the database.                             |
|----------------------------|-------------------------------------------------------------|
| **Method & Path**          | `PUT /studies/{accession_id}`                               |
| **Path Parameters**        | `accession_id (str)`                                        |
| **Request Body**           | `updated_study (StudyUpdate)`, `audit (CreateAuditMessage)` |
| **Success Response Code**  | `200 OK`                                                    |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`                            |
| **Response Model**         | `StudyResponse`                                             |

---

### POST /studies/upload-metadata

| Description                | Upload a metadata file and process it to create samples.    |
|----------------------------|-------------------------------------------------------------|
| **Method & Path**          | `POST /studies/upload-metadata`                             |
| **Request Body**           | `metadata (UploadFile)`, `metadata_file_type (str)`         |
| **Success Response Code**  | `201 Created`                                               |
| **Error Response Codes**   | `400 Bad Request`                                           |
| **Response Model**         | `List[SampleResponse]`                                      |

---

## Common Error Responses

- `400 Bad Request`: The server cannot process the request due to a client error (e.g., malformed request syntax).
- `403 Forbidden`: The client does not have access rights to the content.
- `404 Not Found`: The server can not find the requested resource.
