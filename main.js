const express = require('./my-express');
const app = express();

let i = 0;
let j = 0;

app.get('/', function(req, res) {
    res.write('Hello');
});

app.get('/hello', function(req, res) {
    res.write('Hello world');
});

app.get('/hi', function(req, res) {
    res.write('Hello universe');
});

app.post('/search', function(req, res) {
    res.write('H');
});
app.listen(4545)