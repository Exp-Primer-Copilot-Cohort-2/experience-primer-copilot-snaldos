// Create web server
// 1. Load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
var mime = require('mime');
var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        //1. read index.html
        var filename = path.join(__dirname, 'index.html');
        var content = fs.readFileSync(filename);
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    } else if (pathname === '/post') {
        //2. read post.html
        var filename = path.join(__dirname, 'post.html');
        var content = fs.readFileSync(filename);
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    } else if (pathname === '/comment') {
        //3. save comment
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else if (pathname === '/getComments') {
        //4. get comment
        var json = JSON.stringify(comments);
        res.end(json);
    } else {
        //5. read other files
        var filename = path.join(__dirname, pathname);
        fs.exists(filename, function(exists) {
            if (exists) {
                var content = fs.readFileSync(filename);
                res.setHeader('Content-Type', mime.lookup(filename));
                res.end(content);
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
        });
    }
});
server.listen(8080);
console.log('Server is running at http://