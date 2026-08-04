# 🔄 CI/CD Pipeline — GitHub Actions

## 📌 Overview

This project uses **GitHub Actions** to automate the process of building and pushing Docker images to Docker Hub. The pipeline is defined in:

```text
.github/workflows/ci.yml
```

It follows **Continuous Integration (CI)** and **Continuous Delivery (CD)** principles:

- **Continuous Integration (CI):** Every push and pull request automatically builds the backend and frontend Docker images to verify the application is deployable.
- **Continuous Delivery (CD):** When code is merged into the `main` branch, the Docker images are automatically pushed to Docker Hub, making them ready for deployment.

---

# 🎯 Pipeline Triggers

The workflow runs automatically on the following events:

| Event | Branch | Purpose |
|--------|--------|---------|
| `push` | `main` | Build and push Docker images to Docker Hub |
| `pull_request` | `main` | Build Docker images only (no push) to validate the pull request |

---

# ⚙️ Workflow File Location

```text
.github/workflows/ci.yml
```

---

# 🧩 Pipeline Structure

The workflow contains a single job:

```text
build-and-push
```

It runs on:

```yaml
runs-on: ubuntu-latest
```

## Job Steps

| Step | Action | Description |
|------|--------|-------------|
| 1 | Checkout Repository | Downloads the latest source code using `actions/checkout@v4` |
| 2 | Set up Docker Buildx | Enables advanced Docker build features and layer caching using `docker/setup-buildx-action@v3` |
| 3 | Log in to Docker Hub *(Conditional)* | Authenticates using GitHub Secrets. Runs only on `push` to `main`. |
| 4 | Build & Push Backend | Builds the backend image from `./backend/Dockerfile` |
| 5 | Build & Push Frontend | Builds the frontend image from `./frontend/Dockerfile` |

---

# 🏷️ Image Tagging Strategy

Each Docker image is published with **two tags** for traceability:

- `latest` — Always points to the newest successful build.
- `${{ github.sha }}` — Uses the commit SHA, allowing deployments or rollbacks to a specific version.

Example:

```text
yourusername/blogverse-backend:latest
yourusername/blogverse-backend:abc123def456

yourusername/blogverse-frontend:latest
yourusername/blogverse-frontend:abc123def456
```

---

# ⚡ Production-Grade Optimizations

## 1. Docker Layer Caching

The workflow uses GitHub Actions cache storage to reuse Docker layers between builds.

Benefits:

- 🚀 50–70% faster builds
- Cached dependency installation (`npm install` / `npm ci`)
- Separate cache scopes for backend and frontend to avoid collisions

Example:

```yaml
cache-from: type=gha,scope=backend
cache-to: type=gha,mode=max,scope=backend
```

---

## 2. Concurrency Control

Old workflow runs are automatically cancelled when a newer commit is pushed to the same branch.

This helps:

- Save GitHub Actions minutes
- Prevent duplicate builds
- Avoid deployment race conditions

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

---

## 3. Conditional Docker Push

Docker images are pushed **only** when:

- The event is a `push`
- The branch is `main`

Pull requests simply verify that the images build successfully.

```yaml
if: github.ref == 'refs/heads/main' && github.event_name == 'push'
```

---

# 🐳 Dockerfile Optimizations

## Backend (`backend/Dockerfile`)

The backend image has been optimized for production deployment.

| Optimization | Before | After |
|--------------|--------|-------|
| Base Image | `node:18` (~1 GB) | `node:20-alpine` (~150 MB) |
| Build Type | Single-stage | Multi-stage |
| Runtime | `npm run dev` (Nodemon) | `node server.js` |
| Dependencies | All packages | Production dependencies only (`npm ci --only=production`) |
| Health Check | ❌ None | ✅ `HEALTHCHECK` included |

---

## Frontend (`frontend/Dockerfile`)

The frontend uses a multi-stage Docker build.

### Stage 1

- Uses `node:20-alpine`
- Installs dependencies
- Builds the React/Vite application

### Stage 2

- Uses `nginx:alpine`
- Serves the production build
- Lightweight and production-ready

---

# 📁 `.dockerignore` Files

Both the backend and frontend include `.dockerignore` files to reduce build context size and improve security.

Typical ignored files include:

```text
node_modules
.env
.git
logs
dist
coverage
```

Benefits:

- Faster Docker builds
- Smaller build context
- Prevents accidental inclusion of secrets
- Reduces image size

---

# 🔐 Required GitHub Secrets

Configure the following repository secrets in:

**GitHub → Repository → Settings → Secrets and variables → Actions**

| Secret | Description |
|---------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (recommended over password) |

> **⚠️ Important:** Never hardcode credentials in the workflow. Always store sensitive information using GitHub Secrets.

---

# 📤 Resulting Docker Images

After every successful push to the `main` branch, the following Docker images are published:

```bash
docker push yourusername/blogverse-backend:latest
docker push yourusername/blogverse-frontend:latest
```

Additionally, each image is also published using the commit SHA tag.

---

# ✅ How to Verify the Pipeline

1. Commit and push changes to the `main` branch.
2. Open the **GitHub repository**.
3. Navigate to the **Actions** tab.
4. Select the latest workflow run.
5. Verify that all workflow steps complete successfully.
6. Visit your Docker Hub repositories to confirm the new images have been published.

---

# 🛠️ Future Improvements

Potential enhancements for the CI/CD pipeline include:

- [ ] Add automated linting before Docker builds
- [ ] Add automated unit and integration testing
- [ ] Integrate Trivy vulnerability scanning
- [ ] Add Slack or email notifications for workflow failures
- [ ] Deploy automatically to AWS ECS or Kubernetes after successful image push
- [ ] Implement semantic versioning (e.g., `v1.0.0`) using Git tags

---

# 📖 Summary

This GitHub Actions pipeline provides an automated, production-ready CI/CD workflow that:

- Builds backend and frontend Docker images automatically
- Validates pull requests by ensuring images build successfully
- Publishes images to Docker Hub on every merge to `main`
- Uses Docker layer caching for significantly faster builds
- Prevents duplicate workflow executions through concurrency control
- Produces lightweight, optimized production Docker images
- Uses GitHub Secrets to securely manage Docker Hub credentials

This setup ensures consistent, reliable, and repeatable Docker image creation, making deployments faster and more dependable.