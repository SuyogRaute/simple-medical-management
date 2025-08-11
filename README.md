
# MediManager

A full-stack medical store management system with a **Spring Boot backend API** and a **React frontend** built using Vite, TypeScript, and Tailwind CSS.

---

## Overview

MediManager enables managing medicines, billing, and bill history efficiently. The backend API handles business logic and data storage, while the frontend provides a user-friendly interface for interacting with the system.

---

## Backend (Spring Boot API)

### Features

* Manage medicines: create, update, delete, view
* Manage bills: create bills with multiple items, track bill history
* **Automatic stock deduction**: Medicine quantities are automatically reduced when a bill is created to prevent overselling
* Handles medicine stock validation and updates
* Exposes RESTful endpoints for frontend integration

### Prerequisites

* Java 17+
* Maven 3.6+
* Running on default port: `8080`

### Running Backend

1. Navigate to the backend folder:

   ```bash
   cd medimanagerbackend
   ```
2. Build and run:

   ```bash
   ./mvnw spring-boot:run
   ```
3. API base URL: `http://localhost:8080`

---

## Frontend (React)

### Features

* View, add, edit, and delete medicines
* Filter medicines by name, low stock, or expiry
* Create bills with automatic total calculation
* View detailed bill history
* Responsive design with Tailwind CSS
* Notifications for user actions via React Toastify

### Prerequisites

* Node.js (v18+)
* Backend API running locally at `http://localhost:8080`

### Running Frontend

1. Navigate to the frontend folder:

   ```bash
   cd medimanagerfrontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start development server:

   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser

---

## Project Structure

```
/medimanager
├── medimanagerbackend/   # Spring Boot backend project
│   ├── src/main/java/... # Java source code
│   ├── src/main/resources/application.properties
│   ├── mvnw
│   └── pom.xml
└── medimanagerfrontend/  # React frontend project
    ├── src/components/   # Reusable UI components
    ├── src/pages/        # Page-level components
    ├── src/lib/          # API calls and types
    ├── src/styles/       # CSS and Tailwind config
    └── package.json
```

---

## API Endpoints (Summary)

* **Medicines**

  * `GET /api/medicines` — List all medicines
  * `POST /api/medicines` — Create new medicine
  * `PUT /api/medicines/{id}` — Update medicine
  * `DELETE /api/medicines/{id}` — Delete medicine

* **Bills**

  * `GET /api/bills` — List all bills with items
  * `GET /api/bills/{id}` — Get bill details
  * `POST /api/bills` — Create a new bill with bill items (**automatically deducts medicine stock**)

*(Refer to backend code for full details)*

---

## Technologies Used

* Backend: Java, Spring Boot, Spring Data JPA, Hibernate, Lombok
* Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, Axios, React Toastify

---

## Notes

* Ensure backend is running before starting frontend to enable API calls.
* Configure `application.properties` for your database.
* Adjust frontend API base URL if backend runs on different host/port.

