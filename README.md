# IREAD Online Learning Platform

## Introduction

This project is a multi-phase website development effort. Currently, we are working on the primary phase, which focuses on authentication management, event management, and blog management. The next phase will introduce course management. The application is designed with a focus on user experience and scalability, enabling efficient creation, viewing, and management of content.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Fastify
- **Architecture**: MVC (Model-View-Controller)
- **Database**: MySQL
- **Containerization**: Docker

## Features

### Current Phase Features
- User authentication and role management
- Event creation and management
- Blog posting and editing
- Responsive and user-friendly design
- Secure API endpoints

### Upcoming Features
- Course creation and management

## Backend Project Structure

The project follows the MVC pattern for better separation of concerns and maintainability:

```
project-root

|├── client
    ├── public // all frontend assets
    ├── src
      ├── app                 // next js root app
        ├── home              // home page sections
        ├── pages             // frontend inner pages
        ├── shared            // shared components
        ├── app.css           // frontend root css file
        ├── layout.tsx        // frontend commont layout
        ├── page.tsx          // frontend home page
    ├── .eslintrc.json
    ├── .gitignore
    ├── next-env.d.ts
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.json

|├── server
    ├── logs
    |   ├── 404.log
    |   ├── debug.log
    |   ├── fatal.log
    |   ├── info.log     
    ├── public  
    |   ├── assets            // all nessaray assets for design dashboard 
    |   ├── management        // dashboard react source code    
    |   ├── management_build  // dashboard react build source code    
    |   ├── uploads           // all dynamic uploaded files 
    |   ├── views             // base .ejs files
    |   ├── avatar.png        // default user photo
    ├── src        
        ├── bootstrap         // server boot dependencies       
        |    ├── db.sql.ts     // boot mysql connection instance       
        ├── common_types      // all common types needed by type script
        |    ├── object.ts            
        ├── configs        
        |    ├── app.config.ts // app configuration variables              
        ├── helpers           // helper methods       
        |   ├── custom_error.ts   // customer error message 
        |   ├── error_trace.ts    // save error logs into db
        |   ├── response.ts       // common response object
        ├── modules           // api modules  
        |   ├── module-1
        |       ├── api_test  // check api throug vs code rest client
        |       ├── models
        |       |   ├── seeders   // feed database test data
        |       |   ├── db.ts     // initialize models and create relations
        |       |   ├── models.ts // model defination - database columns
        |       ├── services      // each module CRUD services
        |       |   ├── all.ts
        |       |   ├── destroy.ts
        |       |   ├── details.ts
        |       |   ├── import.ts
        |       |   ├── restore.ts
        |       |   ├── soft_delete.ts
        |       |   ├── store.ts
        |       |   ├── update.ts
        |       ├── test          // test each api for differenct status codes
        |       ├── controller.ts // module controller
        |       ├── routes.ts     // module route list
        ├── plugins        
        |   ├── paginate.ts     // response record pagination
        |   ├── set_log.ts      // save error logs
        |   ├── upload.ts       // file uploader
        ├── routes              // default routes except api  
        ├── index.ts            // server index
    ├── .env        
    ├── .env.example        
    ├── .eslintignore       
    ├── .eslintrc.json        
    ├── .gitignore    
    ├── .prettierignore        
    ├── .prettierrc        
    ├── jest.config.js
    ├── nodemon.json
    ├── note.js
    ├── package.json
    ├── tsconfig.json
    ├── vite-config-admin.js
```

## Setup Instructions

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn
- Git
- Docker and Docker Compose

### Steps

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration**:

   - Create a `.env` file in the project root.
   - Add the required environment variables (e.g., database credentials, API keys).

4. **Run the Application Locally (Without Docker)**:

  - server run
   ```bash
   npm run server
   ```

  - client run
   ```bash
   npm run dev
   ```

   server will be available at `http://localhost:5003`.
   client will be available at `http://localhost:3000`.

5. **Run the Application Using Docker**:

   - Build and run the Docker container:

     ```bash
     docker-compose up --build -d
     ```

   - server will be available at `http://localhost:8005` & `http://localhost:8006`.

6. **Build for Production**:

   ```bash
   npm run build
   ```

   Deploy the production build to your preferred hosting platform.

## Deployment Instructions

- Ensure your hosting platform supports Docker.
- Push the Docker image to a container registry (e.g., Docker Hub, AWS ECR).
- Deploy the containerized application using a platform like AWS, Google Cloud, or Azure.
- Configure environment variables in the production environment.

## Usage Guide

- **Authentication**:
  - Manage user accounts, roles, and permissions through the Authentication section.
- **Events**:
  - Navigate to the Events section to add, edit, or view event details.
- **Blogs**:
  - Use the Blogs section to create and manage blog posts.

## Development Process

- **Frontend**:
  - Designed using Next.js for server-side rendering and fast performance.
  - Styled with Tailwind CSS for a modern and responsive UI.
- **Backend**:
  - Built with Express, following the MVC architecture.
  - Secure API endpoints for data interaction.
- **Containerization**:
  - Docker is used to containerize the application for consistent development and deployment environments.

## Future Improvements

- Develop course management features.
- AI based solutions.

---
