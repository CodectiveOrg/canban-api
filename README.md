# Canban API

## Environment Variables

Create a `.env` file in the root of the project with values similar to `.env.example`.

## Option 1: Setup Automatically With Docker Compose

### Prerequisites

- Docker installed.

### Results

- Postgres `17-alpine` will run on port `5432`.
- API will run on port `5000` or the one you specified in `.env`.

### Quick Start

1. Copy and edit env:
   ```shell
   cp .env.example .env
   ```
2. Build and start in the background:
   ```shell
   docker compose up -d --build
   ```
3. View logs:
   ```shell
   docker compose logs -f api
   ```

### Volumes

- Postgres data is persisted in the `db_data` volume.
- Uploaded files are stored in the `file_storage` volume.

## Option 2: Setup Automatically With Dockerfile

### Prerequisites

- Docker installed.
- Postgres 17 running on port `5432`.

### Results

- API will run on port `5000` or the one you specified in `.env`.

### Quick Start

1. Copy and edit env:
   ```shell
   cp .env.example .env
   ```
2. Build the Docker image:
   ```shell
   docker build -t canban-api .
   ```
3. Run the container:
   ```shell
   docker run -p 5000:5000 --env-file .env canban-api
   ```

## Option 3: Setup Manually Without Docker

### Prerequisites

- Node.js 22 installed.
- Postgres 17 running on port `5432`.

### Results

- API will run on port `5000` or the one you specified in `.env`.

### Quick Start

1. Copy and edit env:
   ```shell
   cp .env.example .env
   ```
2. Install dependencies:
   ```shell
   npm i
   ```
3. Start:
   ```shell
   npm start
   ```
