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

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | /api/v1/auth/register    | Register a new user |
| POST   | /api/v1/auth/login       | User login          |
| GET    | /api/v1/auth             | Get all users       |
| GET    | /api/v1/auth/:id         | Get user by ID      |
| POST   | /api/v1/auth/update      | Update user details |
| POST   | /api/v1/auth/logout      | Logout user         |
| POST   | /api/v1/auth/soft-delete | Soft Delete an user |
| POST   | /api/v1/auth/restore     | Restore an user     |
| POST   | /api/v1/auth/destroy     | Delete an user      |

### User Roles

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| POST   | /api/v1/user-roles/store       | Create a new user role   |
| POST   | /api/v1/user-roles/update      | Update user role details |
| GET    | /api/v1/user-roles             | Get all user roles       |
| GET    | /api/v1/user-roles/:id         | Get user role by ID      |
| POST   | /api/v1/user-roles/soft-delete | Soft Delete an user role |
| POST   | /api/v1/user-roles/restore     | Restore an user role     |
| POST   | /api/v1/user-roles/destroy     | Delete an user role      |

### User Login Histories

| Method | Endpoint                                 | Description                            |
| ------ | ---------------------------------------- | -------------------------------------- |
| POST   | /api/v1/user-login-histories/store       | Create a new user login history        |
| POST   | /api/v1/user-login-histories/update      | Update user login history details      |
| GET    | /api/v1/user-login-histories             | Get all user login histories           |
| GET    | /api/v1/user-login-histories/:id         | Get user role history by ID            |
| POST   | /api/v1/user-login-histories/soft-delete | Soft Delete an user role login history |
| POST   | /api/v1/user-login-histories/restore     | Restore an user login history          |
| POST   | /api/v1/user-login-histories/destroy     | Delete an user login history           |

### Events

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | /api/v1/events/store       | Create an event      |
| GET    | /api/v1/events             | Get all events       |
| GET    | /api/v1/events/:id         | Get event by ID      |
| POST   | /api/v1/events/update      | Update event details |
| POST   | /api/v1/events/soft-delete | Soft Delete an event |
| POST   | /api/v1/events/restore     | Restore an event     |
| POST   | /api/v1/events/destroy     | Delete an event      |

### Event Categories

| Method | Endpoint                             | Description                   |
| ------ | ------------------------------------ | ----------------------------- |
| POST   | /api/v1/event-categories/store       | Create an event category      |
| GET    | /api/v1/event-categories             | Get all event categories      |
| GET    | /api/v1/event-categories/:id         | Get event category by ID      |
| POST   | /api/v1/event-categories/update      | Update event category details |
| POST   | /api/v1/event-categories/soft-delete | Soft Delete an event category |
| POST   | /api/v1/event-categories/restore     | Restore an event category     |
| POST   | /api/v1/event-categories/destroy     | Delete an event category      |

### Event Tags

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| POST   | /api/v1/event-tags/store       | Create an event tag      |
| GET    | /api/v1/event-tags             | Get all event tags       |
| GET    | /api/v1/event-tags/:id         | Get event tag by ID      |
| POST   | /api/v1/event-tags/update      | Update event tag details |
| POST   | /api/v1/event-tags/soft-delete | Soft Delete an event tag |
| POST   | /api/v1/event-tags/restore     | Restore an event tag     |
| POST   | /api/v1/event-tags/destroy     | Delete an event tag      |

### Event Certified Users

| Method | Endpoint                                  | Description                         |
| ------ | ----------------------------------------- | ----------------------------------- |
| POST   | /api/v1/event-certified-users/store       | Create an event-certified user      |
| GET    | /api/v1/event-certified-users             | Get all event-certified users       |
| GET    | /api/v1/event-certified-users/:id         | Get event-certified user by ID      |
| POST   | /api/v1/event-certified-users/update      | Update event-certified user         |
| POST   | /api/v1/event-certified-users/soft-delete | Soft delete an event-certified user |
| POST   | /api/v1/event-certified-users/restore     | Restore an event-certified user     |
| POST   | /api/v1/event-certified-users/destroy     | Delete an event-certified user      |

### Event Resources

| Method | Endpoint                            | Description                   |
| ------ | ----------------------------------- | ----------------------------- |
| POST   | /api/v1/event-resources/store       | Create an event resource      |
| GET    | /api/v1/event-resources             | Get all event resources       |
| GET    | /api/v1/event-resources/:id         | Get event resource by ID      |
| POST   | /api/v1/event-resources/update      | Update event resource         |
| POST   | /api/v1/event-resources/soft-delete | Soft delete an event resource |
| POST   | /api/v1/event-resources/restore     | Restore an event resource     |
| POST   | /api/v1/event-resources/destroy     | Delete an event resource      |

### Event FAQs

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| POST   | /api/v1/event-faqs/store       | Create an event FAQ      |
| GET    | /api/v1/event-faqs             | Get all event FAQs       |
| GET    | /api/v1/event-faqs/:id         | Get event FAQ by ID      |
| POST   | /api/v1/event-faqs/update      | Update event FAQ         |
| POST   | /api/v1/event-faqs/soft-delete | Soft delete an event FAQ |
| POST   | /api/v1/event-faqs/restore     | Restore an event FAQ     |
| POST   | /api/v1/event-faqs/destroy     | Delete an event FAQ      |

### Event Sessions

| Method | Endpoint                           | Description                  |
| ------ | ---------------------------------- | ---------------------------- |
| POST   | /api/v1/event-sessions/store       | Create an event session      |
| GET    | /api/v1/event-sessions             | Get all event sessions       |
| GET    | /api/v1/event-sessions/:id         | Get event session by ID      |
| POST   | /api/v1/event-sessions/update      | Update event session         |
| POST   | /api/v1/event-sessions/soft-delete | Soft delete an event session |
| POST   | /api/v1/event-sessions/restore     | Restore an event session     |
| POST   | /api/v1/event-sessions/destroy     | Delete an event session      |

### Event Session Assessments

| Method | Endpoint                                      | Description                             |
| ------ | --------------------------------------------- | --------------------------------------- |
| POST   | /api/v1/event-session-assessments/store       | Create an event session assessment      |
| GET    | /api/v1/event-session-assessments             | Get all event session assessments       |
| GET    | /api/v1/event-session-assessments/:id         | Get event session assessment by ID      |
| POST   | /api/v1/event-session-assessments/update      | Update event session assessment         |
| POST   | /api/v1/event-session-assessments/soft-delete | Soft delete an event session assessment |
| POST   | /api/v1/event-session-assessments/restore     | Restore an event session assessment     |
| POST   | /api/v1/event-session-assessments/destroy     | Delete an event session assessment      |

### Event Session Assessment Submissions

| Method | Endpoint                                                 | Description                                        |
| ------ | -------------------------------------------------------- | -------------------------------------------------- |
| POST   | /api/v1/event-session-assessment-submissions/store       | Submit an event session assessment                 |
| GET    | /api/v1/event-session-assessment-submissions             | Get all event session assessment submissions       |
| GET    | /api/v1/event-session-assessment-submissions/:id         | Get event session assessment submission by ID      |
| POST   | /api/v1/event-session-assessment-submissions/update      | Update event session assessment submission         |
| POST   | /api/v1/event-session-assessment-submissions/soft-delete | Soft delete an event session assessment submission |
| POST   | /api/v1/event-session-assessment-submissions/restore     | Restore an event session assessment submission     |
| POST   | /api/v1/event-session-assessment-submissions/destroy     | Delete an event session assessment submission      |

### Event Attendance

| Method | Endpoint                             | Description                            |
| ------ | ------------------------------------ | -------------------------------------- |
| POST   | /api/v1/event-attendance/store       | Record event attendance                |
| GET    | /api/v1/event-attendance             | Get all event attendance records       |
| GET    | /api/v1/event-attendance/:id         | Get event attendance record by ID      |
| POST   | /api/v1/event-attendance/update      | Update event attendance                |
| POST   | /api/v1/event-attendance/soft-delete | Soft delete an event attendance record |
| POST   | /api/v1/event-attendance/restore     | Restore an event attendance record     |
| POST   | /api/v1/event-attendance/destroy     | Delete an event attendance record      |

### Event Enrollments

| Method | Endpoint                              | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| POST   | /api/v1/event-enrollments/store       | Enroll in an event              |
| GET    | /api/v1/event-enrollments             | Get all event enrollments       |
| GET    | /api/v1/event-enrollments/:id         | Get event enrollment by ID      |
| POST   | /api/v1/event-enrollments/update      | Update event enrollment         |
| POST   | /api/v1/event-enrollments/soft-delete | Soft delete an event enrollment |
| POST   | /api/v1/event-enrollments/restore     | Restore an event enrollment     |
| POST   | /api/v1/event-enrollments/destroy     | Delete an event enrollment      |

### Event Payments

| Method | Endpoint                           | Description                  |
| ------ | ---------------------------------- | ---------------------------- |
| POST   | /api/v1/event-payments/store       | Process an event payment     |
| GET    | /api/v1/event-payments             | Get all event payments       |
| GET    | /api/v1/event-payments/:id         | Get event payment by ID      |
| POST   | /api/v1/event-payments/update      | Update event payment         |
| POST   | /api/v1/event-payments/soft-delete | Soft delete an event payment |
| POST   | /api/v1/event-payments/restore     | Restore an event payment     |
| POST   | /api/v1/event-payments/destroy     | Delete an event payment      |

### Event Payment Refunds

| Method | Endpoint                                  | Description                         |
| ------ | ----------------------------------------- | ----------------------------------- |
| POST   | /api/v1/event-payment-refunds/store       | Request an event payment refund     |
| GET    | /api/v1/event-payment-refunds             | Get all event payment refunds       |
| GET    | /api/v1/event-payment-refunds/:id         | Get event payment refund by ID      |
| POST   | /api/v1/event-payment-refunds/update      | Update event payment refund         |
| POST   | /api/v1/event-payment-refunds/soft-delete | Soft delete an event payment refund |
| POST   | /api/v1/event-payment-refunds/restore     | Restore an event payment refund     |
| POST   | /api/v1/event-payment-refunds/destroy     | Delete an event payment refund      |

### Event Feedback Form Fields

| Method | Endpoint                                       | Description                       |
| ------ | ---------------------------------------------- | --------------------------------- |
| POST   | /api/v1/event-feedback-form-fields/store       | Create a feedback form field      |
| GET    | /api/v1/event-feedback-form-fields             | Get all feedback form fields      |
| GET    | /api/v1/event-feedback-form-fields/:id         | Get feedback form field by ID     |
| POST   | /api/v1/event-feedback-form-fields/update      | Update feedback form field        |
| POST   | /api/v1/event-feedback-form-fields/soft-delete | Soft delete a feedback form field |
| POST   | /api/v1/event-feedback-form-fields/restore     | Restore a feedback form field     |
| POST   | /api/v1/event-feedback-form-fields/destroy     | Delete a feedback form field      |

### Blogs

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| POST   | /api/v1/blogs/store       | Create a blog post      |
| GET    | /api/v1/blogs             | Get all blog posts      |
| GET    | /api/v1/blogs/:id         | Get a blog post by ID   |
| GET    | /api/v1/blogs/:slug       | Get a blog post by slug |
| POST   | /api/v1/blogs/update      | Update a blog post      |
| POST   | /api/v1/blogs/soft-delete | Soft Delete a blog post |
| POST   | /api/v1/blogs/restore     | Restore a blog post     |
| POST   | /api/v1/blogs/destroy     | Delete a blog post      |

### Blog Categories

| Method | Endpoint                            | Description                   |
| ------ | ----------------------------------- | ----------------------------- |
| POST   | /api/v1/blog-categories/store       | Create a blog category        |
| GET    | /api/v1/blog-categories             | Get all blog categories       |
| GET    | /api/v1/blog-categories/:id         | Get a blog category by ID     |
| POST   | /api/v1/blog-categories/update      | Update a blog category        |
| POST   | /api/v1/blog-categories/soft-delete | Soft delete a blog categories |
| POST   | /api/v1/blog-categories/restore     | Restore a blog categories     |
| POST   | /api/v1/blog-categories/destroy     | Delete a blog category        |

### Blog Tags

| Method | Endpoint                      | Description            |
| ------ | ----------------------------- | ---------------------- |
| POST   | /api/v1/blog-tags/store       | Create a blog tag      |
| GET    | /api/v1/blog-tags             | Get all blog tags      |
| GET    | /api/v1/blog-tags/:id         | Get a blog tag by ID   |
| POST   | /api/v1/blog-tags/update      | Update a blog tag      |
| POST   | /api/v1/blog-tags/soft-delete | Soft delete a blog tag |
| POST   | /api/v1/blog-tags/restore     | Restore a blog tag     |
| POST   | /api/v1/blog-tags/destroy     | Delete a blog tag      |

### Blog Comments

| Method | Endpoint                          | Description                |
| ------ | --------------------------------- | -------------------------- |
| POST   | /api/v1/blog-comments/store       | Create a blog comment      |
| GET    | /api/v1/blog-comments             | Get all blog comments      |
| GET    | /api/v1/blog-comments/:id         | Get a blog comment by ID   |
| POST   | /api/v1/blog-comments/update      | Update a blog comment      |
| POST   | /api/v1/blog-comments/soft-delete | Soft delete a blog comment |
| POST   | /api/v1/blog-comments/restore     | Restore a blog comment     |
| POST   | /api/v1/blog-comments/destroy     | Delete a blog comment      |

### Blog Comment Replies

| Method | Endpoint                                 | Description                      |
| ------ | ---------------------------------------- | -------------------------------- |
| POST   | /api/v1/blog-comment-replies/store       | Create a reply to a blog comment |
| GET    | /api/v1/blog-comment-replies             | Get all blog comment replies     |
| GET    | /api/v1/blog-comment-replies/:id         | Get a blog comment reply by ID   |
| POST   | /api/v1/blog-comment-replies/update      | Update a blog comment reply      |
| POST   | /api/v1/blog-comment-replies/soft-delete | Soft delete a blog comment reply |
| POST   | /api/v1/blog-comment-replies/restore     | Restore a blog comment reply     |
| POST   | /api/v1/blog-comment-replies/destroy     | Delete a blog comment reply      |

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
