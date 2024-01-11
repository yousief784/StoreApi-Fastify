# Store API with Fastify, TypeScript, Prisma, MySQL, and Docker

## Project Overview

This project is a simple store API built using Fastify with TypeScript, Prisma for database interactions, and MySQL as the database. It includes functionality for managing categories and products, with image resizing during upload. The project is Dockerized.

## Setup

### Prerequisites

-   Node.js
-   Fastify
-   npm
-   MySQL server
-   Prisma
-   Docker

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/store-api.git
    cd store-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure the database connection in the .env file:**
    -   change username, password and database_name
    -   keep mysql_db "it's the same host we running in docker container"
    -   ADDRESS keep host_address it's the same host running in docker container
    ```bash
    DATABASE_URL="mysql://username:password@mysql_db:3306/database_name"
    PORT=5000
    NODE_ENV=development
    IMAGES_SERVER=http://localhost:5000
    ADDRESS=host_address
    ```
4.  **Run server in docker:**
    -   to run the server you only need to setup .env file and run this command.
    ```bash
     docker compose up --build -d
    ```
5.  **To Run Project in local** - setup .env file to

    ```bash
    DATABASE_URL="mysql://username:password@localhost:3306/database_name"
    PORT=5000
    NODE_ENV=development
    IMAGES_SERVER=http://localhost:5000
    ADDRESS=localhost
    ```

6.  **After setup env files Run this command**
    -   run this command to migrate database and run project in development
    ```bash
    npm run migrate:dev
    ```
7.  **Run prettier:**
    -   to run prettier for formatting the code run
    ```bash
       npm run prettier
    ```
8.  **Run Eslint:**
    ```bash
       npm run lint
    ```

# Database Schema

## Categories Table

-   **id (Primary Key):** Unique identifier for the category.
-   **name:** Name of the category.
-   **picture:** Picture associated with the category.
-   **parent_id:** Identifier of the parent category, if applicable.
-   **created_at:** Timestamp indicating when the category was created.
-   **updated_at:** Timestamp indicating when the category was last updated.

## Products Table

-   **id (Primary Key):** Unique identifier for the product.
-   **name:** Name of the product.
-   **picture:** Picture associated with the product.
-   **category_id (Foreign Key):** Identifier referencing the Categories table.
-   **created_at:** Timestamp indicating when the product was created.
-   **updated_at:** Timestamp indicating when the product was last updated.

# API Endpoints

## Categories

-   **GET /api/categories:** Find all Categories
-   **GET /api/categories/:categoryId:** Find a specific category by ID.
-   **GET /api/categories/tree:** setup all categories as a tree, if you want to logic the tree build by ![alt tree logic](tree.png)
-   **POST /api/categories:** Create a new category.
-   **PUT /api/categories/:categoryId:** Update an existing category by ID.
-   **DELETE /api/categories/:categoryId:** Delete a category by ID.

## Products

-   **GET /api/products:** Find all products.
-   **GET /api/products/:productId:** Find a specific product by ID.
-   **POST /api/products:** Create a new product.
-   **PUT /api/products/:productId:** Update an existing product by ID.
-   **DELETE /api/products/:productId:** Delete a product by ID.

## Project Structure

The project follows the structure below:

-   **controllers:** Contains the controller logic for handling HTTP requests.
-   **routes:** Defines the API routes.
-   **services:** Business logic and service layer.
-   **pisma** database schema

```plaintext
store-api/
|-- src/
|   |-- config/
|       |-- config..ts
|       |-- database.ts // user for connection prisma @client
|   |-- controllers/
|       |-- category.controller.ts
|       |-- product.controller.ts
|   |-- interfaces/
|     |-- categories/
|         |-- category.interface.ts
|         |-- category.route-opts.ts
|     |-- products/
|         |-- product.interface.ts
|         |-- product.route-opts.ts
|     |-- config.interface.ts
|   |-- middlewares/
|     |-- errorHandle.ts
|   |-- routes/
|     |-- category/
|       |-- index.routes.ts
|     |-- product/
|       |-- index.routes.ts
|   |-- services/
|       |-- category.service.ts
|       |-- product.service.ts
|   |-- utils/
|       |-- createFolders.ts
|       |-- enums.ts
|       |-- errors.ts
|       |-- uploadFile.ts
|   |-- app.ts
|-- .env.example
|-- .eslintrc.json
|-- .prettierrc
|-- docker-compose.yml
|-- Dockerfile
|-- package.json
|-- README.md
|-- tree.drawio
|-- tree.png
|-- tsconfig.json
```

## Deploy Project

1. Create Instance in server
2. create certificate .pem file
3. Setup network configuration
4. login to server with certificate
5. install docker in machine
6. install docker-compose in machine
7. setup github repository
8. in instatance git clone from repository
9. setup environment variable
10. run docker-compose up --build
