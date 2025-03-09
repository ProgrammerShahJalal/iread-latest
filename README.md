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

### Authentication (users)
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/auth/register     | Register a new user           |
| POST   | /api/v1/auth/login        | User login                     |
| GET    | /api/v1/auth              | Get all users                   |
| GET    | /api/v1/auth/:id          | Get user by ID                 |
| POST    | /api/v1/auth/update       | Update user details            |
| POST   | /api/v1/auth/logout       | Logout user                    |
| POST | /api/v1/auth/soft-delete  |  Soft Delete an user            |
| POST | /api/v1/auth/restore  |  Restore an user          |
| POST | /api/v1/auth/destroy  | Delete an user         |

### User Roles
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/user-roles/store        | Create a new user role        |
| POST   | /api/v1/user-roles/update       | Update user role details      |
| GET    | /api/v1/user-roles              | Get all user roles            |
| GET    | /api/v1/user-roles/:id          | Get user role by ID           |
| POST   | /api/v1/user-roles/soft-delete  |  Soft Delete an user role     |
| POST   | /api/v1/user-roles/restore  |  Restore an user role             |
| POST   | /api/v1/user-roles/destroy  | Delete an user role               |


### User Login Histories
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/user-login-histories/store        | Create a new user login history        |
| POST   | /api/v1/user-login-histories/update       | Update user login history details      |
| GET    | /api/v1/user-login-histories              | Get all user login histories  |
| GET    | /api/v1/user-login-histories/:id          | Get user role history by ID           |
| POST   | /api/v1/user-login-histories/soft-delete  |  Soft Delete an user role login history     |
| POST   | /api/v1/user-login-histories/restore  |  Restore an user login history             |
| POST   | /api/v1/user-login-histories/destroy  | Delete an user login history              |


### Events
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/events/store     | Create an event               |
| GET    | /api/v1/events            | Get all events                |
| GET    | /api/v1/events/:id        | Get event by ID               |
| POST    | /api/v1/events/update    | Update event details          |
| POST | /api/v1/events/soft-delete | Soft Delete an event               |
| POST | /api/v1/events/restore | Restore an event               |
| POST | /api/v1/events/destroy | Delete an event               |


### Event Categories
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/event-categories/store     | Create an event  category              |
| GET    | /api/v1/event-categories            | Get all event categories              |
| GET    | /api/v1/event-categories/:id        | Get event category by ID               |
| POST    | /api/v1/event-categories/update    | Update event category details          |
| POST | /api/v1/event-categories/soft-delete | Soft Delete an event category           |
| POST | /api/v1/event-categories/restore | Restore an event  category               |
| POST | /api/v1/event-categories/destroy | Delete an event category               |


### Blogs
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | /api/v1/blogs/store      | Create a blog post            |
| GET    | /api/v1/blogs             | Get all blog posts            |
| GET    | /api/v1/blogs/:id         | Get a blog post by ID         |
| GET    | /api/v1/blogs/:slug         | Get a blog post by slug     |
| POST   | /api/v1/blogs/update      | Update a blog post               |
| POST | /api/v1/blogs/soft-delete  |  Soft Delete a blog post            |
| POST | /api/v1/blogs/restore  |  Restore a blog post          |
| POST | /api/v1/blogs/destroy  | Delete a blog post            |

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

