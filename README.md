# Todo API - Microservices Architecture

A containerized Node.js Todo application using a **MERN-stack** architecture, featuring a reverse proxy and automated CI/CD integration.

This is project from [Roadmap.sh](https://roadmap.sh/projects/multi-container-service) to practice using Docker Compose to run a multi-container application in production.

---

## 🚀 Architecture Overview
This project is built using a microservices approach, where each component runs in its own isolated Docker container, orchestrated by **Docker Compose**.

* **Reverse Proxy:** Nginx (Acts as the entry point, routing traffic to the app).
* **Application:** Node.js / Express (The core logic).
* **Database:** MongoDB (NoSQL storage for persistence).
* **CI/CD:** GitHub Actions (Automated image building and registry management).



---

## 🛠 Technical Decisions & Strategy

### 1. The "Hybrid-Cloud" Deployment Strategy
**Decision:** Using a simulated production environment on local hardware instead of a paid Cloud Provider (AWS/DigitalOcean).
* **The Reason:** To demonstrate full CI/CD parity without incurring unnecessary cloud costs. By building a `docker-compose.prod.yml` that pulls images directly from **Docker Hub**, the environment mimics a cloud server's behavior exactly. It proves the "Code is the same everywhere" principle—the core promise of Docker.

### 2. Nginx as a Reverse Proxy
**Decision:** Routing all traffic through Nginx on Port 80 instead of exposing Node.js directly.
* **The Reason:** This follows production best practices for security and scalability. It abstracts the internal application structure, allows for easier SSL termination in the future, and ensures the internal Node.js port (3000) is hidden from the public internet.

### 3. Development vs. Production Parity
**Decision:** Using separate Docker Compose configurations to optimize for different environments.
* **Development (`docker-compose.yml`):** Utilizes **Bind Mounts** and **Nodemon** to allow for "Hot Reloading." This enables instant feedback during coding without needing to rebuild images.
* **Production (`docker-compose.prod.yml`):** Utilizes "Frozen" images. It contains no local volumes for source code, ensuring the server runs exactly what was built and tested in the CI pipeline.

### 4. Data Persistence
**Decision:** Implementing Named Volumes for MongoDB.
* **The Reason:** To ensure that even if the containers are stopped, removed, or updated, the user's Todo data remains safe on the host machine’s disk.

---
