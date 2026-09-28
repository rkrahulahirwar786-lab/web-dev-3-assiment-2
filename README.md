# Student Management REST API

A simple REST API built with **Node.js** and **Express.js** to manage student records
using in-memory Array/JSON data (no database used, as per assignment restrictions).

## Project Structure

```
student-management-api/
├── app.js                 # Main server file
├── package.json
├── routes/
│   └── studentRoutes.js   # All /students CRUD routes (Express Router)
├── middleware/
│   └── logger.js          # Custom logger middleware
└── data/
    └── students.js        # In-memory student data (array)
```

## How to Run

1. Make sure Node.js is installed (`node -v` to check).
2. Open a terminal inside the `student-management-api` folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. You should see:
   ```
   Server running at http://localhost:3000
   ```

## API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|---------------------------|
| GET    | /students        | Get all students          |
| GET    | /students/:id    | Get a single student      |
| POST   | /students        | Add a new student         |
| PUT    | /students/:id    | Update a student          |
| DELETE | /students/:id    | Delete a student          |

## Testing with Postman

1. Open Postman and create a new request.
2. **GET all students**
   - Method: `GET`
   - URL: `http://localhost:3000/students`
3. **GET one student**
   - Method: `GET`
   - URL: `http://localhost:3000/students/1`
4. **POST (create) a student**
   - Method: `POST`
   - URL: `http://localhost:3000/students`
   - Body → raw → JSON:
     ```json
     {
       "name": "Neha Gupta",
       "course": "BCA",
       "age": 20,
       "email": "neha.gupta@example.com",
       "phone": "9123456780"
     }
     ```
5. **PUT (update) a student**
   - Method: `PUT`
   - URL: `http://localhost:3000/students/1`
   - Body → raw → JSON:
     ```json
     {
       "age": 23
     }
     ```
6. **DELETE a student**
   - Method: `DELETE`
   - URL: `http://localhost:3000/students/1`

## Status Codes Used

- `200 OK` – Successful GET/PUT/DELETE
- `201 Created` – Successful POST
- `400 Bad Request` – Missing/invalid input
- `404 Not Found` – Student ID does not exist
- `500 Internal Server Error` – Unexpected server error

## Notes

- Data resets every time the server restarts (stored in memory only, as required).
- Custom logger middleware prints every request's method, URL, and timestamp to the console.
- Each student record now also includes `email` and `phone` fields (both optional, but validated for format when provided: email must look like an email, phone must be a 10-digit number).
