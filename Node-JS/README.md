# Web Development — Semester III

A collection of web development practice projects built while learning frontend development, Node.js, and REST APIs.

## 📁 Repository Structure

```text
web-dev/
├── Node-JS/
│   ├── index.js
│   ├── products.json
│   ├── package.json
│   └── .gitignore
├── React-JS/
└── README.md
```

## 🚀 Technologies Used

- JavaScript
- Node.js
- React.js
- HTTP Module
- File System (`fs`)
- REST API
- JSON
- Git & GitHub
- Nodemon

## 📦 Node.js Product Management API

A basic REST API built using Node.js core modules. It supports CRUD operations and stores product data in a local JSON file.

### Features

- Create new products
- Retrieve all products
- Retrieve a product by ID
- Update existing products
- Delete products
- Persist product data using `products.json`
- Automatically restart the development server using Nodemon

### Product Structure

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 50000
}
```

### Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/krishnagarg-dev/Web-dev-Sem-III.git
```

**2. Navigate to the Node.js project**

```bash
cd Web-dev-Sem-III/Node-JS
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

The server runs at `http://localhost:3000`.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/products` | Retrieve all products |
| GET | `/product/1` | Retrieve a product by ID |
| POST | `/product` | Create a product |
| PUT | `/product/1` | Update a product |
| DELETE | `/product/1` | Delete a product |

For POST and PUT requests, send JSON in the request body.

**Example POST request**

```json
{
  "name": "Mouse",
  "price": 800
}
```

Use Bruno or another API client to test the endpoints.

> Note: Product data is stored locally in a JSON file. This project is intended for learning and experimentation, not production use.

## ⚛️ React.js

The `React-JS` directory contains React learning and practice projects. More project details can be added as development progresses.

## 🎯 Learning Objectives

- Understand JavaScript and Node.js fundamentals
- Build HTTP servers using Node.js
- Implement REST API endpoints
- Practice CRUD operations
- Work with files and JSON data
- Test APIs using Bruno
- Manage projects with Git and GitHub

## 👨‍💻 Author

**Krishna Garg**

GitHub: [@krishnagarg-dev](https://github.com/krishnagarg-dev)

---

⭐ This repository documents my web development learning journey during Semester III.
