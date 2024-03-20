# Dashboard API Documentation

This document provides detailed information on the API endpoints related to the dashboard. Each section contains tables that describe the request methods, paths, parameters, request bodies, response codes, and response models.

## Table of Contents

- [GET /dashboard/studies](#get-dashboardstudies)
- [POST /dashboard/{accession_id}/add-collaborator](#post-dashboardaccession_idadd-collaborator)
- [DELETE /dashboard/{accession_id}/remove-collaborator/{collaborator_email}](#delete-dashboardaccession_idremove-collaboratorcollaborator_email)
- [GET /dashboard/{accession_id}/collaborators](#get-dashboardaccession_idcollaborators)
- [GET /dashboard/{accession_id}/audit-messages](#get-dashboardaccession_idaudit-messages)

---

### GET /dashboard/studies

| Description                | Get studies owned by a user.                                  |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `GET /dashboard/studies`                                       |
| **Query Parameters**       | `status` (Optional[str])                                       |
| **Request Body**           | None                                                          |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `401 Unauthorized`                                            |
| **Response Model**         | `List[StudyResponse]`                                         |

---

### POST /dashboard/{accession_id}/add-collaborator

| Description                | Add a new collaborator to a study.                            |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `POST /dashboard/{accession_id}/add-collaborator`             |
| **Request Body**           | `CreateCollaborator`                                          |
| **Success Response Code**  | `201 Created`                                                 |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`, `400 Bad Request`           |
| **Response Model**         | `CollaboratorResponse`                                        |

---

### DELETE /dashboard/{accession_id}/remove-collaborator/{collaborator_email}

| Description                | Remove a collaborator from a study.                           |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `DELETE /dashboard/{accession_id}/remove-collaborator/{collaborator_email}` |
| **Request Body**           | None                                                          |
| **Success Response Code**  | `204 No Content`                                              |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`                              |
| **Response Model**         | None                                                          |

---

### GET /dashboard/{accession_id}/collaborators

| Description                | Get the collaborators of a study.                             |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `GET /dashboard/{accession_id}/collaborators`                  |
| **Request Body**           | None                                                          |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`                              |
| **Response Model**         | `List[CollaboratorResponse]`                                  |

---

### GET /dashboard/{accession_id}/audit-messages

| Description                | Get the audit messages of a study.                            |
|----------------------------|---------------------------------------------------------------|
| **Method & Path**          | `GET /dashboard/{accession_id}/audit-messages`                 |
| **Request Body**           | None                                                          |
| **Success Response Code**  | `200 OK`                                                      |
| **Error Response Codes**   | `404 Not Found`, `403 Forbidden`                              |
| **Response Model**         | `List[AuditMessageResponse]`                                  |

---

## Common Error Responses

- `400 Bad Request`: The server cannot process the request due to a client error (e.g., malformed request syntax).
- `401 Unauthorized`: Authentication is required and has failed or has not yet been provided.
- `403 Forbidden`: The client does not have access rights to the content; the user is not permitted to perform this action.
- `404 Not Found`: The server cannot find the requested resource.
