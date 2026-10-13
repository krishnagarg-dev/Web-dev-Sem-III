# Product Management UI

React + Vite CRUD dashboard for the Node.js JSON-file product API.

## Requirements
- Node.js and npm
- Backend running from `../Node-JS` on `http://localhost:3000`

## Run
```powershell
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## API routes used
- `GET /products` — list products
- `POST /product` — create a product
- `PUT /product/:id` — update a product
- `DELETE /product/:id` — delete a product

Vite proxies `/product` and `/products` requests to `http://localhost:3000`.
