# LogisticsPro API Documentation

## Authentication Endpoints (`/api/auth`)
* **`POST /register`**
  * **Description:** Registers a new user (Admin or Driver).
  * **Body:** `{ "name": "John Doe", "email": "john@test.com", "password": "123", "role": "driver" }`
* **`POST /login`**
  * **Description:** Authenticates a user and returns a JWT token.
  * **Body:** `{ "email": "john@test.com", "password": "123" }`
* **`GET /drivers`**
  * **Description:** Fetches all users with the 'driver' role. (Requires Admin Token).

## Load Management Endpoints (`/api/loads`)
* **`POST /`**
  * **Description:** Creates a new load request and calculates the quote.
  * **Body:** `{ "origin": "NY", "destination": "LA", "weight": 5000 }`
* **`GET /`**
  * **Description:** Fetches all loads in the system. (Requires Admin Token).
* **`PUT /assign`**
  * **Description:** Assigns a specific driver to a load.
  * **Body:** `{ "loadId": 1, "driverId": 5 }`
* **`DELETE /:id`**
  * **Description:** Deletes a load from the database. (Requires Admin Token).

## Driver Portal Endpoints (`/api/loads`)
* **`GET /my-loads`**
  * **Description:** Fetches active loads assigned to the currently logged-in driver. (Requires Driver Token).
* **`PUT /deliver`**
  * **Description:** Updates a load's status to 'delivered'.
  * **Body:** `{ "loadId": 1 }`
* **`DELETE /driver/:id`**
  * **Description:** Deletes a driver from the system. Will block deletion if the driver has active assigned loads. (Requires Admin Token).