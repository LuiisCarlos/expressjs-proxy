# ExpressJS Proxy

A lightweight proxy server built with ExpressJS that forwards HTTP requests to a target URL, adding authentication and logging.

## Features

- Forwards requests to a specified target URL via the `/proxy` endpoint
- Adds a Bearer Authorization token to outgoing requests
- Logs all requests and errors in JSON format
- Supports JSON request and response bodies

## Requirements

- Node.js v16+
- An API token for authentication

## Setup

1. Clone the repository.
2. Install dependencies:
```sh
npm install
```
3. Create a `.env` file in the project root with the following content:
```properties
PORT       = 3000
NODE_ENV   = development
AUTH_TOKEN = your_token_here
```

## Usage

Start the proxy server:
```sh
npm run start
```

Send a request to the proxy endpoint:
```curl
POST /proxy?targetUrl=https://api.yourservice.com/endpoint
```

Body example:
```json
{
    "messages": [
        {
            "role": "role",
            "content": "input"
        }
    ],
    "model": "example-ai",
    "stream": false
}
```

## Project structure
- `src/index.js`: Main server entry point
- `src/config/env.js`: Environment variable management
- `src/config/logger.js`: Simple JSON logger