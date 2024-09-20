

# ZENOTES - Project Setup Guide

## Overview

This project is a Laravel application using Laravel Breeze as the authentication scaffold with a React frontend. It is set up to work with PostgreSQL as the database. This guide will help you set up the development environment to run this application on your local machine.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **XAMPP** (for PHP and Apache)
- **PostgreSQL** (for the database)
- **Composer** (PHP dependency manager)
- **Node.js** (for npm and frontend dependencies)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

### 2. Install Dependencies

- **Install PHP dependencies** using Composer:

    ```bash
    composer install
    ```

- **Install frontend dependencies** using npm:

    ```bash
    npm install
    ```

### 3. Set Up XAMPP

XAMPP provides a local server for PHP and Apache. Here’s how to set it up:

1. Download and install XAMPP from [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html).
2. After installation, open the XAMPP Control Panel and start **Apache**.
3. Make sure PHP is accessible in your terminal:
    - Add the XAMPP `php` directory (usually located at `C:\xampp\php`) to your system's PATH.

You can verify the installation by running:

```bash
php -v
```

### 4. Set Up PostgreSQL

1. Download and install PostgreSQL from [https://www.postgresql.org/download/](https://www.postgresql.org/download/).
2. Create a new database for the project. You can do this using the **pgAdmin** tool or through the PostgreSQL command line:

   Example (via command line):
   ```bash
   psql -U postgres
   CREATE DATABASE yourproject_db;
   ```

3. Configure your database connection in the `.env` file:

   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=yourproject_db
   DB_USERNAME=your_postgres_username
   DB_PASSWORD=your_postgres_password
   ```

### 5. Run Migrations

After setting up the database, run the migrations to create the necessary tables:

```bash
php artisan migrate
```

### 6. Start the Development Server

Once the environment is set up, you can start both the Laravel backend and the React frontend.

- **Backend** (Laravel):

  Start the Laravel backend server:

   ```bash
   php artisan serve
   ```

  By default, this will run the backend at `http://localhost:8000`.

- **Frontend** (React):

  To serve the frontend using Vite, run the following command:

   ```bash
   npm run dev
   ```

  The React frontend will be available at `http://localhost:3000` by default.

### 7. Build Frontend Assets

When you are ready for production, build the frontend assets:

```bash
npm run build
```

### 8. Accessing the Application

After both the backend and frontend are running, you can access the application at `http://localhost:8000`.

---

## Additional Tips

- If you're using XAMPP and Laravel, make sure to point the document root of Apache to the `public` folder of the Laravel project.
- For PostgreSQL, if you encounter authentication issues, try changing the `pg_hba.conf` file to use `md5` instead of `peer` authentication.

## License

This project is licensed under the MIT License.

---

This `README.md` should give frontend developers all the information they need to get started with the Laravel + React application and configure the environment with XAMPP and PostgreSQL.
