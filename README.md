# Book Review API

A RESTful API for managing books, users, and reviews using Node.js, Express, and MongoDB.


## Requirements

-   Node.js
-   Express js
-   MongoDB 

## 🚀 Project Setup


### 1. Clone the repository

```bash
git clone https://github.com/yourusername/book-api.git
cd book-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up environment variables
Create a .env file inside the src/ directory with the following content:
```bash
PORT=3000
MONGODB_URI=mongodb_url
JWT_SECRET=your_jwt_secret
```

### 4. Start the application
```bash
npm start
```
This will start the API server on http://localhost:3000.

# API Endpoints
### 1. **Register User**

```bash
curl -X POST http://localhost:3000/api/signup \
-H "Content-Type: application/json" \
-d '{"username":"john123", "password":"password123"}'
```

### 2. **Login**

```bash
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"username":"john123", "password":"password123"}'
```

### 3. **Create Book**

```bash
curl -X POST http://localhost:3000//api/books/ \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{ "title": "The Alchemist", "author": "Paulo Coelho", "genre": "Fiction"}'
```

### 4. **Post a Review**

```bash
curl -X POST http://localhost:3000/api/books/<bookId>/reviews \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"rating": 4, "comment":"Great read!"}'
```

---    

## Design Decisions & Assumptions

- **Authentication**: JWT-based authentication is used.
- **Authorization**: Middleware ensures users can only modify their own reviews.
- **Error Handling**: Express middleware handles all errors uniformly.
- **Validation**: Mongoose schema validation is applied for all models.
- **Password Hashing**: Passwords are hashed using bcrypt before saving to DB.
- **Minimal Dependencies**: Clean and minimal stack with `express`, `mongoose`, `jsonwebtoken`, and `bcrypt`.



