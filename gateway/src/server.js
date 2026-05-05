import { createServer } from 'node:http';
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config()

const server = createServer(async (req, res) => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST, //ENDPOINT 
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        connectionLimit: 5
    });

    if (req.url === '/') {
        console.log('/');
        res.write('Hello World');
        res.end();
    }
    //Returns list of products as json
    else if (req.url === '/products' && req.method === 'GET') {
        console.log('/products');

        pool.getConnection((err, conn) => {
            if (err) {
                res.writeHead(500, { "content-type": "application/json" });
                return res.end(JSON.stringify({ error: err.message }));
            }

            conn.query('SELECT * FROM products', (err, results) => {
                conn.release();

                if (err) {
                    res.writeHead(500, { "content-type": "application/json" });
                    return res.end(JSON.stringify({ error: err.message }));
                }

                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify(results));
            });
        });
    }

    else if (req.url === '/products/add' && req.method === 'POST') {
        console.log('products/add');
        pool.getConnection((err, conn) => {
            let body = '';
            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => { //FIND OUT WHAT THIS MEANS FULLY (REQUESTS ARE GETTING TIMED OUT!!!)
                console.log(body);
                conn.query('describe products', (err, results, fields) => {
                    conn.release();

                    if (err) {
                        console.log(err);
                        res.writeHead(500, { "content-type": "application/json" });
                        return res.end(JSON.stringify({ error: err.message }));
                    }
                    //IMPLEMENT OBJECT VALIDATION AND INSERTION INTO DB
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify(results));
                });
            });
        })
    }
    else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Page Not Found");
    }
});

//Register a listener/handler
server.on('connection', (socket) => {
    console.log('New Connection');//runs everytime someone connects
})

server.listen(3000);

console.log("listening on port 3000...")