# Blog Application

A basic full-stack blog application where users can create posts, upload images, like posts, and comment on posts.

This project was built as a learning project to practice backend development, REST APIs, authentication, database relationships, and file uploads.

## Features

* User registration and login
* JWT authentication
* Create blog posts
* Edit and delete your own posts
* View all posts
* View a single post
* Upload images with Cloudinary
* Like and unlike posts
* Add comments
* Delete your own comments
* PostgreSQL database
* Prisma ORM
* Repository, Service, and Controller architecture

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma
* PostgreSQL
* JWT
* bcrypt
* Multer
* Cloudinary

### Frontend

Frontend will be added separately using React.

## Project Structure

```text
src/
├── config/
│   ├── database.ts
│   └── cloudinary.ts
│
├── middleware/
│   ├── auth.middleware.ts
│   └── upload.middleware.ts
│
├── modules/
│   ├── auth/
│   ├── post/
│   ├── like/
│   └── comment/
│
├── utils/
├── types/
├── app.ts
└── server.ts
```

## Architecture

The backend follows a simple layered architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
PostgreSQL
```

* **Routes** handle API endpoints.
* **Controllers** handle requests and responses.
* **Services** contain business logic.
* **Repositories** handle database operations.
* **Prisma** is used to communicate with PostgreSQL.

## API Routes

### Auth

```text
POST /api/auth/register
POST /api/auth/login
```

### Posts

```text
POST   /api/posts
GET    /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
```

### Likes

```text
POST   /api/posts/:postId/like
DELETE /api/posts/:postId/like
```

### Comments

```text
POST   /api/posts/:postId/comments
GET    /api/posts/:postId/comments
DELETE /api/comments/:commentId
```

## Environment Variables

Create a `.env` file in the server folder:

```env
PORT=5000

DATABASE_URL="your_postgresql_database_url"

JWT_SECRET="your_jwt_secret"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Do not commit the `.env` file to GitHub.

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run the development server:

```bash
npm run dev
```

## Image Upload

Images are uploaded using Multer and stored on Cloudinary.

Only the image URL is stored in PostgreSQL.

```text
Image
  ↓
Multer
  ↓
Cloudinary
  ↓
Image URL
  ↓
PostgreSQL
```

## What I Learned

While building this project, I practiced:

* Building REST APIs with Express
* Working with PostgreSQL
* Using Prisma ORM
* JWT authentication
* Password hashing
* Database relationships
* Authorization and ownership checks
* File uploads with Multer
* Cloudinary image storage
* Layered backend architecture
* Organizing a TypeScript backend by modules

## Future Improvements

* React frontend
* User profiles
* Pagination
* Search posts
* Like and comment counts
* Better validation
* Global error handling
* Image replacement and deletion
* Responsive UI

## Status

Backend is currently functional. Frontend and additional features will be added as the project continues.
