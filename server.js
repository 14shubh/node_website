const http = require('http');
const path = require('node:path/win32');
const url = require('url');
const fs = require('fs');
const mysql = require('mysql');

http.createServer((req, res) => {
    let getUrl = url.parse(req.url, true);
    console.log(getUrl.pathname);

    if (getUrl.pathname == '/' || getUrl.pathname == '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let filePath = path.join(__dirname, './views/home.html');
        let response_data = fs.readFileSync(filePath);
        res.end(response_data);
    } else if (getUrl.pathname == '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        let filePath = path.join(__dirname, './views/about.html');
        let response_data = fs.readFileSync(filePath);
        res.end(response_data);
    } else if (getUrl.pathname == '/work') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let filePath = path.join(__dirname, './views/work.html');
        let response_data = fs.readFileSync(filePath);
        res.end(response_data);
    } else if (getUrl.pathname == '/registration') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let filePath = path.join(__dirname, './views/registration.html');
        let response_data = fs.readFileSync(filePath);
        res.end(response_data);
    } else if (getUrl.pathname == '/login') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let filePath = path.join(__dirname, './views/login.html');
        let response_data = fs.readFileSync(filePath);
        res.end(response_data);
    } else if (getUrl.pathname.match('\.css')) {
        let filePath = path.join(__dirname, getUrl.pathname);
        let response_stream = fs.createReadStream(filePath);
        response_stream.pipe(res);
    } else if (getUrl.pathname.match('\.jpg')) {
        let filePath = path.join(__dirname, getUrl.pathname);
        let response_stream = fs.createReadStream(filePath);
        response_stream.pipe(res);
    } else if (getUrl.pathname == '/user_data') {
        let fname = getUrl.query.fname;
        let lname = getUrl.query.lname;
        let email = getUrl.query.email;
        let password = getUrl.query.password;
        let mobile = getUrl.query.mobile;
        

        // mysql database connection

        try {
            let connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'user_data'
            });
            let sqlQuery = 'insert into user(fname,lname,email,password,mobile) values(?,?,?,?,?)';
            connection.query(sqlQuery, [fname, lname, email, password, mobile], (err, reult) => {
                // err ? res.end('<h1>Registration failed<h1>') : res.end('<h1>Registration successful</h1>');
                if (err) {
                    res.end('<h1>Registration failed<h1>');
                    console.log(err);
                } else {
                    res.end('<h1>Registration successful</h1>');
                }
            });
        } catch (e) {
            console.log(e);
        }
    } else {
        res.end('<h1>Opps Page not found.....</h1>');
    }
}).listen(3001, (err) => {
    err ? console.log(err) : console.log("Server is listening on port http://localhost:3001");
});