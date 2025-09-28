🛍️ Full-Stack E-commerce Platform
A complete e-commerce web application built with a Django REST Framework backend and a React (Vite) frontend. This platform allows users to register, browse products, manage a shopping cart, and place orders. It also includes a basic dashboard for administrative users.

✨ Live Demo
Frontend: https://ecommerce-frontend-65m8.onrender.com

Backend API: https://ecommerce-backend-pw45.onrender.com/api/

## Features
User Authentication: Secure user registration and login using JWT (JSON Web Tokens).

Role-Based Access: Differentiates between regular users and admin users.

Product Management: Admins can create, read, update, and delete products.

Shopping Cart: Authenticated users can add products to their cart and view their cart.

Order System: Users can "check out," which converts their cart into a persistent order.

Admin Dashboard: A view for admins to see site statistics and manage products/users.

## Tech Stack
Backend: Python, Django, Django REST Framework, Simple JWT

Frontend: React, Vite, Axios, React Router

Database: PostgreSQL (Production), MySQL/SQLite (Development)

Deployment: Render (Web Service for Backend, Static Site for Frontend)

## Project Structure
The project is a monorepo containing both the backend and frontend code.

ecommerce-project/
├── ecommerce_backend/      # Django REST Framework application
└── ecommerce_frontend/     # Vite + React application
## 🚀 Getting Started (Local Setup)
### Prerequisites
Node.js and npm

Python and pip

A local MySQL server (or you can modify settings.py to use SQLite)

### Backend Setup (ecommerce_backend)
Navigate to the backend directory:

Bash

cd ecommerce_backend
Create and activate a virtual environment:

Bash

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:

Bash

pip install -r requirements.txt
Set up environment variables:

Create a .env file in this directory.

Add your database URL and a secret key. See .env.example below.

Run database migrations:

Bash

python manage.py migrate
Create a superuser:

Bash

python manage.py createsuperuser
Run the server:

Bash

python manage.py runserver
The backend will be running at http://127.0.0.1:8000.

### Frontend Setup (ecommerce_frontend)
Navigate to the frontend directory:

Bash

cd ecommerce_frontend
Install dependencies:

Bash

npm install
Set up environment variables:

Vite uses .env.local for local variables. Create this file.

Add the backend API URL. See .env.example below.

Run the development server:

Bash

npm run dev
The frontend will be running at http://localhost:5173.

## Environment Variables
You will need to create .env files for local development. Do not commit these to Git.

Backend (ecommerce_backend/.env):

# .env.example
SECRET_KEY=your-super-secret-key-here
DEBUG=True
DATABASE_URL=mysql://your_db_user:your_db_password@localhost:3306/your_db_name
Frontend (ecommerce_frontend/.env.local):

# .env.local.example
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
