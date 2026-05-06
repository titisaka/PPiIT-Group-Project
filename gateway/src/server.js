const http = require('node:http')
const mysql = require('mysql2/promise');
require('dotenv').config()

console.log(process.env.DB_HOST + process.env.DB_USER + process.env.DB_PORT + process.env.DB_NAME + process.env.SERVER_PORT);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

const server = http.createServer(async (req, res) => {

    if (req.url === '/') {
        console.log('/');
        res.writeHead(200, { "content-type": "text/plain" });
        return res.end('Hello World');
    }

    if (req.url === '/products' && req.method === 'GET') {
        console.log('/products');
        try {
            const [rows] = await pool.query('SELECT * FROM products');

            res.writeHead(200, { "content-type": "application/json" });
            return res.end(JSON.stringify(rows));
        } catch (err) {
            res.writeHead(500, { "content-type": "application/json" });
            return res.end(JSON.stringify({ error: err.message }));
        }
    }

    
    /* if (req.url === '/products/add' && req.method === 'POST') {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });

            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);

                    
                    const [result] = await pool.execute(
                        'INSERT INTO products (name, price) VALUES (?, ?)',
                        [data.name, data.price]
                    );

                    res.writeHead(201, { "content-type": "application/json" });
                    res.end(JSON.stringify({
                        message: 'Product added',
                        insertId: result.insertId
                    }));
                } catch (err) {
                    res.writeHead(500, { "content-type": "application/json" });
                    res.end(JSON.stringify({ error: err.message }));
                }
            });

        } catch (err) {
            res.writeHead(500, { "content-type": "application/json" });
            return res.end(JSON.stringify({ error: err.message }));
        }

        return;
    } */

    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Page Not Found");
});


server.on('connection', (socket) => {
    console.log('New Connection');
})

server.listen(process.env.SERVER_PORT, '0.0.0.0');

console.log("listening on port:" + process.env.SERVER_PORT);