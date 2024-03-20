# Quick Start Guide

## Backend Setup:

### Prerequisites
- Docker: https://www.docker.com/get-started/

### Installation steps

1. Clone the repository containing the source code for the backend and frontend apps.
2. Copy the `.env.example` file in the both root directories of the repository and change the name to `.env.dev` with the correct information based on the requirements highlighted in `.env.example`.
3. In the terminal, navigate to the root directory of the cloned repository. Build and start the    Docker containers using the `docker-compose.yml` configuration file in the backend directory:
   ```
   docker compose -f "backend\docker-compose.yml" up -d --build 
   ```

## Frontend Setup:

### Prerequisites
- Node v18: https://nodejs.org/en/blog/release/v18.18.0

### Installation steps
Follow the following commands in this order:
   ```
   cd frontend
   npm install 
   npm run dev
   ```

This will generate the static files that can be served to the client in the dist file folder. You can either use a server of your choice or run it directly via npm run preview. 
Now you're app will be running on port 8080.

### Disclaimer
This setup of MOSAIC may only be used for development purposes



