# IREAD Online Learning Platform Documentation

## Introduction
IREAD is a multi-phase online learning platform. The current phase focuses on authentication, event management, and blog management. The next phase will introduce course management. Designed for scalability and user experience, the platform allows seamless creation, viewing, and management of content.

## Technologies Used

**Frontend:** Next.js, Tailwind CSS  
**Backend:** Node.js, Fastify  
**Architecture:** MVC (Model-View-Controller)  
**Database:** MySQL  
**Containerization:** Docker  

## Features

### Current Phase Features
- User authentication and role management
- Event creation and management
- Blog posting and editing
- Responsive and user-friendly design
- Secure API endpoints

### Upcoming Features
- Course creation and management

## Project File Structure
The project follows the MVC pattern for better maintainability:

```
project-root
|-- client/
|   |-- public/  # Frontend assets
|   |-- src/
|       |-- app/  # Next.js root app
|       |-- home/  # Home page sections
|       |-- pages/  # Frontend inner pages
|       |-- shared/  # Shared components
|       |-- app.css  # Root CSS file
|       |-- layout.tsx  # Common layout
|       |-- page.tsx  # Home page
|   |-- package.json
|   |-- tsconfig.json
|
|-- server/
|   |-- logs/  # Log files
|   |-- public/
|       |-- assets/  # Dashboard assets
|       |-- management/  # React dashboard source code
|       |-- management_build/  # Dashboard build source code
|       |-- uploads/  # Uploaded files
|       |-- views/  # EJS templates
|   |-- src/
|       |-- bootstrap/  # Server boot dependencies
|           |-- db.sql.ts  # MySQL connection instance
|       |-- common_types/  # TypeScript common types
|       |-- configs/
|           |-- app.config.ts  # Application configuration
|       |-- helpers/
|           |-- custom_error.ts  # Custom error handling
|           |-- error_trace.ts  # Error logs management
|           |-- response.ts  # Common response handling
|       |-- modules/  # API modules
|           |-- authentication/
|               |-- controller.ts  # Auth controller
|               |-- routes.ts  # Auth routes
|               |-- services.ts  # Auth services
|               |-- models.ts  # Auth models
|           |-- events/
|           |-- blogs/
|       |-- plugins/
|       |-- routes/
|       |-- index.ts  # Server entry point
|   |-- .env
|   |-- package.json
|   |-- tsconfig.json
```

## Backend API Endpoints

### Authentication
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/auth/register     | Register a new user           |
| POST   | /api/v1/auth/login        | User login                     |
| GET    | /api/v1/auth              | Get all users                   |
| GET    | /api/v1/auth/:id          | Get user by ID                 |
| POST    | /api/v1/auth/update       | Update user details            |
| POST   | /api/v1/auth/logout       | Logout user                    |

### Events
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/events/create     | Create an event               |
| GET    | /api/v1/events            | Get all events                |
| GET    | /api/v1/events/:id        | Get event by ID               |
| PUT    | /api/v1/events/update/:id | Update event details          |
| DELETE | /api/v1/events/delete/:id | Delete an event               |

### Blogs
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/blogs/create      | Create a blog post            |
| GET    | /api/v1/blogs             | Get all blog posts            |
| GET    | /api/v1/blogs/:id         | Get a blog post by ID         |
| PUT    | /api/v1/blogs/update/:id  | Update a blog post            |
| DELETE | /api/v1/blogs/delete/:id  | Delete a blog post            |

## Setup Instructions

### Prerequisites
- Node.js (>= 16.x)
- npm or yarn
- Git
- Docker & Docker Compose

### Steps
1. Clone the Repository:
```bash
git clone <repository-url>
cd <repository-folder>
```
2. Install Dependencies:
```bash
npm install
```
3. Set Up Environment Variables:
- Create a `.env` file in the project root
- Add database credentials, API keys, etc.

4. Run the Application Locally (Without Docker):
```bash
# Start the backend server
npm run server

# Start the frontend
npm run dev
```
- Server: [http://localhost:5011](http://localhost:5011)
- Client: [http://localhost:5012](http://localhost:5012)

5. Run the Application Using Docker:
```bash
docker-compose up --build -d
```
- Server: [http://localhost:8005](http://localhost:8005)

6. Build for Production:
```bash
npm run build
```
- Deploy the build to a hosting platform.

## Deployment Instructions
1. Ensure hosting platform supports Docker.
2. Push the Docker image to a container registry (e.g., Docker Hub, AWS ECR).
3. Deploy the containerized application using AWS, Google Cloud, or Azure.
4. Configure environment variables in production.

## Usage Guide
- **Authentication:** Manage user accounts, roles, and permissions.
- **Events:** Add, edit, or view event details.
- **Blogs:** Create and manage blog posts.

## Development Process
**Frontend:**
- Built with Next.js for SSR and fast performance.
- Tailwind CSS for a modern, responsive UI.

**Backend:**
- Node.js with Fastify for optimized performance.
- Secure API endpoints.

**Containerization:**
- Docker ensures consistency across development and production environments.

## Future Improvements
- Implement course management features.
- Integrate AI-based solutions for personalized learning.

