# Task Management API

## Introduction

The Task Management API provides endpoints for managing tasks and user accounts. It allows users to perform CRUD operations (Create, Read, Update, Delete) on tasks and register/login to manage their tasks securely.
### SwaggerUI
  -  Visit http://localhost:8080/api-docs/
  -  server url- https://odd-teal-alligator-toga.cyclic.app/
  -  server url-https://taskmanagement-2-uinu.onrender.com/
#### If you want to use above deployed Url on swagger use this extension 
  -  Cors unblock -https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino
  - follow this video for instruction -https://youtu.be/8berLeTjKDM
 #### Add this , then activate the extension , render url may take a minute or two to start.

## Endpoints

### User Management

#### Register a New User

- **URL:** `/user/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "example_user",
    "email": "example@example.com",
    "password": "example_password"
  }

#### User Login

- **URL:** `/user/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "example@example.com",
    "password": "example_password"
  }

## Task Management API

### Create a New Task

- **URL:** `/task`
- **Method:** `POST`
- **Authentication:** Required (JWT token)
- **Request Body:**
  ```json
  {
    "title": "Example Task",
    "description": "This is an example task",
    "priority": "Medium"
  }
### Get All Tasks

- **URL:** `/task`
- **Method:** `GET`
- **Authentication:** Required (JWT token)
- **Response:**
  - `200 OK` with an array of tasks belonging to the authenticated user.
  - `400 Bad Request` if fetching tasks fails.

### Get a Task by ID

- **URL:** `/task/:taskId`
- **Method:** `GET`
- **Authentication:** Required (JWT token)
- **Parameters:**
  - `taskId`: ID of the task to get
- **Response:**
  - `200 OK` with the task details if the user has access to the task.
  - `403 Forbidden` if the user does not have access to the task.
  - `400 Bad Request` if fetching the task fails.
### Update a Task

- **URL:** `/task/:taskId`
- **Method:** `PATCH`
- **Authentication:** Required (JWT token)
- **Parameters:**
  - `taskId`: ID of the task to update
- **Request Body:**
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated task description",
    "priority": "High"
  }

### Delete a Task

- **URL:** `/task/:taskId`
- **Method:** `DELETE`
- **Authentication:** Required (JWT token)
- **Parameters:**
  - `taskId`: ID of the task to delete
- **Response:**
  - `200 OK` if task deletion is successful.
  - `403 Forbidden` if the user is not authorized to delete the task.
  - `400 Bad Request` if task deletion fails.


How to Use
----------
1.  Install dependencies using `npm i`.
1.  Start the server using `npm run server`.
2.  Register a new user using the `/user/register` endpoint.
3.  Log in with the registered user using the `/user/login` endpoint to get the JWT token.
4.  Use the obtained token to access the task management endpoints (`/task` endpoints) by including it in the request headers as `Authorization: Bearer <token>`.

Dependencies
------------

-   Express.js
-   bcrypt
-   jsonwebtoken
-   mongoose
-   cors
-   swagger-jsdoc
-   swagger-ui-express

