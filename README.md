# Canban API

## Environment Variables

Create a `.env` file in the root of the project with values similar to `.env.example`.

## Setup Automatically With Docker

- Postgres `17-alpine` runs on port `5432`.
- API runs on port `5000`.

### Quick start

1. Copy and edit env
   ```shell
   cp .env.example .env
   ```
2. Build and start in the background
   ```shell
   docker compose up -d --build
   ```
3. View logs
   ```shell
   docker compose logs -f api
   ```

### Volumes

- Postgres data is persisted in the `db_data` volume.
- Uploaded files are stored in the `file_storage` volume.

## Setup Manually

### Prerequisites

- Node.js 22 installed.
- Postgres 17 running on port `5432`.

### Quick start

1. Copy and edit env
   ```shell
   cp .env.example .env
   ```
2. Install dependencies
   ```shell
   npm i
   ```
3. Start
   ```shell
   npm start
   ```
