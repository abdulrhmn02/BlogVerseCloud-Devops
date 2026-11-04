Here is your clean, polished README with the badges removed and the layout structured for GitHub:

```markdown
# Cloud-Native Full-Stack Blog Application (AWS + Terraform + GitHub Actions)

A highly available, production-grade, containerized full-stack blog application deployed on AWS using modular Infrastructure as Code (Terraform) and fully automated via an end-to-end GitHub Actions CI/CD pipeline.

---

## 🏗️ Architecture Overview

The application is built on a secure, multi-tier, multi-Availability Zone (AZ) AWS network architecture designed for resilience, scalability, and security.

                        +---------------------------+
                        | GitHub Actions CI/CD Pipe |
                        +---------------------------+
                              /               \
                             /                 \
                            v                   v
            +-----------------------+     +-----------------------+
            |  Frontend Deployment  |     |  Backend Deployment   |
            |     (React + Vite)    |     |   (Node.js / Express) |
            +-----------------------+     +-----------------------+
                        |                             |
                        v                             v
            +-----------------------+     +-----------------------+
            |      Amazon S3        |     |      Amazon ECR       |
            | (Static Web Hosting)  |     |   (Docker Registry)   |
            +-----------------------+     +-----------------------+
                        |                             |
                        |                             v
                        |                 +-----------------------+
                        |                 |   AWS ECS Fargate     |
                        |                 |  (Private Subnets)    |
                        |                 +-----------------------+
                        |                             ^
                        \                             /
                         \                           /
                        +-----------------------------+
                        |  Application Load Balancer  |
                        |    (Public Subnets / AZs)   |
                        +-----------------------------+

### Key Infrastructure Components:

* **Custom VPC:** Spans 2 Availability Zones for high availability.
* **Public Subnets:** House the Internet Gateway and Application Load Balancer (ALB).
* **Private Subnets:** House ECS Fargate container tasks running the backend service securely away from direct public access.
* **Frontend:** React + Vite single-page application hosted on Amazon S3.
* **Backend:** Node.js & Express REST API containerized with Docker, running on AWS ECS Fargate.
* **Database:** MongoDB instance managing blog persistence.
* **Automation:** Modular Terraform for provisioning infrastructure and GitHub Actions for continuous integration and deployment.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, JavaScript, HTML/CSS
* **Backend:** Node.js, Express, Docker
* **Database:** MongoDB
* **Cloud & DevOps (AWS):** VPC, S3, ALB, ECS Fargate, ECR, IAM
* **Infrastructure as Code:** Terraform (Modular Design)
* **CI/CD:** GitHub Actions

---

## 📂 Project Structure

```text
├── .github/
│   └── workflows/
│       └── ci.yml          # End-to-end GitHub Actions CI/CD pipeline
├── backend/                # Node.js Express REST API
│   ├── Dockerfile          # Container definition
│   └── server.js           # API routes & health checks
├── frontend/               # React + Vite Single Page App
│   ├── src/                # UI components and views
│   └── package.json        # Frontend dependencies
└── terraform/              # Infrastructure as Code (AWS)
    ├── modules/            # Modularized AWS components
    │   ├── vpc/            # Custom VPC, subnets, IGW, NAT, route tables
    │   ├── alb/            # Application Load Balancer & target groups
    │   ├── ecs/            # ECS Cluster, Task Definitions, Fargate service
    │   └── s3/             # Frontend S3 bucket & static hosting policy
    ├── main.tf             # Root module instantiating child modules
    ├── variables.tf        # Global input variables
    └── outputs.tf          # Dynamic outputs (ALB DNS, ECR URL, etc.)

```

---

## ⚙️ Environment Variables Reference

| Component | Variable Name | Description | Example |
| --- | --- | --- | --- |
| **Frontend** | `VITE_API_URL` | Points frontend build to the backend ALB | `http://my-alb-123.ap-south-2.elb.amazonaws.com/api` |
| **Backend** | `PORT` | Port the Express server listens on | `5000` |
| **Backend** | `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |

---

## 🚀 CI/CD Automation Pipeline

The repository features a fully automated GitHub Actions workflow (`.github/workflows/ci.yml`) that triggers on every push to the `main` branch:

1. **Backend Job:**
* Authenticates with AWS via repository secrets.
* Builds the Express Docker image.
* Tags the image with unique commit hashes (`${{ github.sha }}`) and `latest`, then pushes it to Amazon ECR.
* Forces a zero-downtime rolling update on the ECS Fargate service.


2. **Frontend Job:**
* Dynamically queries AWS CLI for the active ALB DNS endpoint.
* Injects the endpoint into Vite at build-time (`VITE_API_URL`).
* Bundles the static site assets (`npm run build`).
* Syncs the build artifacts directly to the Amazon S3 bucket (`aws s3 sync`).



---

## 💻 Local Setup & Deployment

### 1. Provision Infrastructure with Terraform

```bash
cd terraform
terraform init
terraform apply

```

### 2. Run the Backend Locally

```bash
cd backend
npm install
npm start

```

### 3. Build and Run the Frontend Locally

```bash
cd frontend
npm install
export VITE_API_URL=http://<YOUR_ALB_DNS>/api
npm run dev

```

---

## 🧹 Clean Up (Cost Prevention)

To tear down all AWS resources created by Terraform and avoid unintended charges, run:

```bash
cd terraform
terraform destroy -auto-approve

```

