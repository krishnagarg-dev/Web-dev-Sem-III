
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const FILE_PATH = path.join(__dirname, "products.json");

// Create file if it does not exist
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "[]");
}

// Read products
function readProducts() {
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

// Save products
function writeProducts(products) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(products, null, 2));
}

// Send JSON response
function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify(data));
}

// Read JSON body
function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;

            if (body.length > 1_000_000) {
                reject(new Error("Request body too large"));
                req.destroy();
            }
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("Invalid JSON body"));
            }
        });

        req.on("error", reject);
    });
}

// Extract ID from /product/1 or /product?id=1
function getProductId(url) {
    const match = url.pathname.match(/^\/product\/(\d+)$/);

    return match
        ? match[1]
        : url.pathname === "/product"
            ? url.searchParams.get("id")
            : null;
}

// Main request handler
async function main(req, res) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;
    const method = req.method;

    try {
        // HOME
        if (method === "GET" && pathname === "/") {
            return sendJson(res, 200, {
                message: "Welcome to Node.js",
                methods: ["GET", "POST", "PUT", "DELETE"],
                port: PORT
            });
        }

        // GET ALL PRODUCTS
        if (method === "GET" && pathname === "/products") {
            return sendJson(res, 200, readProducts());
        }

        // GET PRODUCT BY ID
        if (
            method === "GET" &&
            (pathname === "/product" || /^\/product\/\d+$/.test(pathname))
        ) {
            const id = getProductId(url);

            if (!id) {
                return sendJson(res, 400, {
                    error: "Product ID is required"
                });
            }

            const products = readProducts();
            const product = products.find(p => String(p.id) === id);

            if (!product) {
                return sendJson(res, 404, {
                    error: "Product not found"
                });
            }

            return sendJson(res, 200, product);
        }

        // POST: CREATE PRODUCT
        if (method === "POST" && pathname === "/product") {
            const body = await readBody(req);

            if (
                !body ||
                typeof body.name !== "string" ||
                !body.name.trim() ||
                body.price == null ||
                body.price === "" ||
                !Number.isFinite(Number(body.price)) ||
                Number(body.price) < 0
            ) {
                return sendJson(res, 400, {
                    error: "Valid product name and price are required"
                });
            }

            const products = readProducts();

            const nextId = products.reduce(
                (max, p) => Math.max(max, Number(p.id) || 0),
                0
            ) + 1;

            const newProduct = {
                id: nextId,
                name: body.name.trim(),
                price: Number(body.price)
            };

            products.push(newProduct);
            writeProducts(products);

            return sendJson(res, 201, {
                message: "Product created successfully",
                product: newProduct
            });
        }

        // PUT: UPDATE PRODUCT
        if (
            method === "PUT" &&
            (pathname === "/product" || /^\/product\/\d+$/.test(pathname))
        ) {
            const id = getProductId(url);

            if (!id) {
                return sendJson(res, 400, {
                    error: "Product ID is required"
                });
            }

            const body = await readBody(req);

            if (!body || typeof body !== "object" || Array.isArray(body)) {
                return sendJson(res, 400, {
                    error: "Request body must be a JSON object"
                });
            }

            const products = readProducts();
            const index = products.findIndex(p => String(p.id) === id);

            if (index === -1) {
                return sendJson(res, 404, {
                    error: "Product not found"
                });
            }

            if (
                body.name !== undefined &&
                (typeof body.name !== "string" || !body.name.trim())
            ) {
                return sendJson(res, 400, {
                    error: "Product name must be a non-empty string"
                });
            }

            if (
                body.price !== undefined &&
                (
                    body.price === "" ||
                    !Number.isFinite(Number(body.price)) ||
                    Number(body.price) < 0
                )
            ) {
                return sendJson(res, 400, {
                    error: "Price must be a non-negative number"
                });
            }

            if (body.name !== undefined) {
                products[index].name = body.name.trim();
            }

            if (body.price !== undefined) {
                products[index].price = Number(body.price);
            }

            writeProducts(products);

            return sendJson(res, 200, {
                message: "Product updated successfully",
                product: products[index]
            });
        }

        // DELETE PRODUCT
        if (
            method === "DELETE" &&
            (pathname === "/product" || /^\/product\/\d+$/.test(pathname))
        ) {
            const id = getProductId(url);

            if (!id) {
                return sendJson(res, 400, {
                    error: "Product ID is required"
                });
            }

            const products = readProducts();
            const index = products.findIndex(p => String(p.id) === id);

            if (index === -1) {
                return sendJson(res, 404, {
                    error: "Product not found"
                });
            }

            const deletedProduct = products.splice(index, 1)[0];
            writeProducts(products);

            return sendJson(res, 200, {
                message: "Product deleted successfully",
                product: deletedProduct
            });
        }

        // UNKNOWN ROUTE
        return sendJson(res, 404, {
            error: "Route not found"
        });

    } catch (error) {
        console.error(error);

        if (res.writableEnded || res.destroyed) return;

        const statusCode =
            error.message === "Invalid JSON body" ? 400 :
            error.message === "Request body too large" ? 413 :
            500;

        return sendJson(res, statusCode, {
            error: statusCode === 500
                ? "Internal server error"
                : error.message
        });
    }
}

// Start server
const server = http.createServer(main);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
