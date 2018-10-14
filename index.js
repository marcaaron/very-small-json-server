const http = require('http');
const fs = require('fs');

// Place JSON files in /db directory
// Launch Server
// access route by <filename>.json
// e.g. /db/posts.json = http://localhost:8080/posts

// Generate Generic Bad Response
const badResponse = JSON.stringify({error: 'File Not Found'});

// Get file and pipe response
const getFileContents = (fn, res) => {
    const data = fs.createReadStream(`${__dirname}/db/${fn.slice(1)}.json`);
    data.on('error', () => res.end(badResponse));
    return data.pipe(res);
};

// set up server
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'application/json'});
    getFileContents(req.url, res);
});

// listen
server.listen(8080);
console.log('Server running at http://localhost:8080');