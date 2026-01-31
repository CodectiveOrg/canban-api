# Canban API

## Environment Variables

Create a `.env` file in the root of the project with values similar to `.env.example`.

## Setup

### Prerequisites

- Node.js 24 or above
- Postgres 17 running on port `5432`

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
3. Build:
   ```shell
   npm run build
   ```
4. Start:
   ```shell
   npm start
   ```

### Truncate

Use this command to clear database but keep the table structures.

```shell
npm run truncate
```

### Seed

Use this command to populate database with initial data.

```shell
npm run seed
```

## Postman

You can import `canban.postman_collection` file into Postman application and test the API.  
This file is available in the root of current project.
