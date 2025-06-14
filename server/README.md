# IREAD Server

This is the server-side application for the IREAD Online Learning Platform. It handles the business logic, API endpoints, and database interactions for the platform.

## Technologies Used

- Node.js
- Fastify
- MySQL
- TypeScript

## Running the Server

To run the server application locally:

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Set up environment variables:
    - Create a `.env` file by copying `.env.example`.
    - Update the `.env` file with your database credentials and other necessary configurations.
4. Run database migrations:
   ```bash
   npm run migrate # Or the specific command used in your project, e.g., npx sequelize-cli db:migrate
   ```
5. Start the development server:
   ```bash
   npm run server
   ```

   Additionally, to build and watch the super admin panel (which might be part of the backend's served assets), you can run:

   ```bash
   npm run super_admin
   ```
   This command typically builds the super admin interface. Check the `server/package.json` for more details on this and other build scripts.

The server application will be accessible at [http://localhost:5011](http://localhost:5011) (or the port specified in your project configuration if different).

Refer to the main [README.md](../README.md) for API endpoint documentation and more details on the overall project.
