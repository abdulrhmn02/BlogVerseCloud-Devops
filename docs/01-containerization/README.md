# Phase 01 – Containerization with Docker

## Objective

The objective of this phase was to containerize the complete BlogVerse MERN application using Docker and Docker Compose.

By containerizing the application, the development environment becomes consistent across different machines, dependencies are isolated from the host system, and deployment becomes significantly easier. This phase also establishes the foundation for future DevOps practices such as CI/CD, cloud deployment, monitoring, and Kubernetes.

---

# Problem Statement

Running a MERN application traditionally requires installing and configuring multiple components on every machine:

* Node.js
* npm
* MongoDB
* Project dependencies
* Environment configuration

This often leads to issues such as:

* "It works on my machine" problems
* Dependency version conflicts
* Manual setup for every developer
* Difficult deployments

A standardized environment was needed to ensure the application could run consistently anywhere.

---

# Solution Overview

Docker was introduced to package each component of the application into isolated containers.

The application was divided into three independent services:

* Frontend (React + Nginx)
* Backend (Node.js + Express)
* MongoDB Database

Docker Compose orchestrates these services, allowing the complete application to start with a single command.

---

# Architecture

```
                Browser
                    │
        http://localhost:3000
                    │
                    ▼
        ┌────────────────────┐
        │ Frontend Container │
        │  React + Nginx     │
        └────────────────────┘
                    │
              API Requests
                    │
                    ▼
        ┌────────────────────┐
        │ Backend Container  │
        │ Node.js + Express  │
        └────────────────────┘
                    │
             MongoDB Driver
                    │
                    ▼
        ┌────────────────────┐
        │ MongoDB Container  │
        └────────────────────┘
```

> *(Replace this ASCII diagram later with your architecture image in the `diagrams/` folder.)*

---

# Implementation

The application was containerized using three services defined in `docker-compose.yml`.

## Frontend

The frontend is built using React (Vite) and served through Nginx.

Responsibilities:

* Build the React application
* Serve static assets
* Receive user requests
* Forward API requests to the backend

---

## Backend

The backend container hosts the Express.js application.

Responsibilities:

* Authentication
* Blog CRUD operations
* API endpoints
* Database communication

The backend listens on port **4000**.

---

## Database

MongoDB runs inside its own dedicated container.

Responsibilities:

* Store user information
* Store blog data
* Persist application data

---

# Why Docker?

Docker provides a standardized runtime environment by packaging the application and all its dependencies into containers.

Benefits include:

* Consistent environments across development and deployment
* Isolation from the host operating system
* Simplified onboarding for new developers
* Easy portability between local machines and cloud platforms
* Foundation for CI/CD and Kubernetes deployments

Without Docker, every machine would require manual installation and configuration of Node.js, MongoDB, and project dependencies.

---

# Why Docker Compose?

This application consists of multiple services that must work together.

Instead of starting each service manually, Docker Compose defines the entire application stack in a single YAML file.

Using Docker Compose provides:

* Single-command application startup
* Automatic Docker network creation
* Service dependency management
* Simplified port mapping
* Centralized configuration

The complete application can be started using:

```bash
docker compose up --build
```

---

# Why a Multi-stage Build?

The frontend Docker image uses a multi-stage build.

### Stage 1 – Build

* Install dependencies
* Compile the React application
* Generate production-ready static files

### Stage 2 – Runtime

Instead of shipping Node.js and all build dependencies, only the generated static files are copied into an Nginx image.

Benefits:

* Smaller Docker image
* Faster deployments
* Better security
* Reduced attack surface
* Production-ready architecture

---

# Why Nginx?

React applications generate static files after the build process.

Rather than running the React development server in production, Nginx is used to serve these files efficiently.

Advantages:

* High performance
* Lightweight
* Optimized for static content
* Lower memory consumption
* Widely used in production environments

---

# Container Communication

Docker Compose automatically creates a private bridge network for all services.

Instead of communicating through IP addresses, containers communicate using service names.

For example:

Backend connects to MongoDB using:

```text
mongodb://mongo:27017/blogverse
```

Here:

* `mongo` → Docker Compose service name
* `27017` → MongoDB default port

Docker automatically resolves the service name to the correct container.

---

# Data Persistence

The MongoDB service uses a named Docker volume:

```yaml
volumes:
  mongo_data:
```

This ensures database data is preserved even if the MongoDB container is removed or recreated.

Without a persistent volume, all stored blogs and user data would be lost whenever the database container is deleted.

---

# Project Structure

```
BlogVerseCloud-DevOps
│
├── backend/
├── frontend/
├── docker-compose.yml
└── docs/
    └── 01-containerization/
```

---

# How to Run the Project

## Prerequisites

* Docker Desktop
* Docker Compose

### Clone the Repository

```bash
git clone <repository-url>
```

### Navigate to the Project

```bash
cd BlogVerseCloud-DevOps
```

### Start the Application

```bash
docker compose up --build
```

### Stop the Application

```bash
docker compose down
```

---

# Application URLs

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:4000
```

MongoDB:

```
localhost:27017
```

---

# Screenshots

This phase includes screenshots demonstrating:

* Docker Compose build
* Running containers
* Docker images
* Application running in browser
* Docker Desktop

Screenshots are available in the `images/` directory.

---

# Challenges Faced

* Creating Dockerfiles for multiple services
* Configuring communication between containers
* Serving the React production build through Nginx
* Managing environment variables for containerized services

---

# Key Learnings

Through this phase I gained practical experience with:

* Writing Dockerfiles
* Multi-stage Docker builds
* Docker Compose orchestration
* Docker networking
* Persistent volumes
* Production-ready frontend deployment using Nginx

---

# Future Improvements

The next phase introduces Continuous Integration using GitHub Actions.

Planned improvements include:

* Automated application builds
* Docker image validation
* CI pipeline execution on every push
* Automated quality checks

---

# Outcome

At the end of this phase, the BlogVerse application successfully runs as a multi-container application consisting of a React frontend, Node.js backend, and MongoDB database.

This implementation provides a reproducible development environment and serves as the foundation for the remaining Cloud and DevOps phases in this project.
