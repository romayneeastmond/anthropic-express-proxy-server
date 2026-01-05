# Anthropic Express Proxy Server

This project is a lightweight Express.js server that acts as a proxy between client applications and the Anthropic Messages API. It is intended to safely handle API key usage on the server side, support browser-based clients via CORS, and provide a simple deployment target for platforms such as Azure App Service.

## How to Use

Clone the repository and install dependencies:

```
npm install
```

Edit environment variables (rename .env.txt accordingly)

```
ANTHROPIC_API_KEY=
PORT=
```

To run the server locally with environment variables loaded from .env and without a build step:

```
npm run server
```

If hosting in an Azure environment ensure that the environment variables and necessary CORS access are set. 

## Copyright and Ownership

All terms used are copyright to their original authors.