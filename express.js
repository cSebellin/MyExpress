const express = require('express');
const app = express();
const fs = require('fs')

const LOCAL_DATABASE = 'students_express.json'

app.get('/', function(req, res) {
    const {name} = req.query
    res.send(`<h1>Hello, ${name || 'World'}!</h1>`)
});

app.post('/students/edit', function(req, res){
    console.log(req)
    res.end()
})
app.listen(4242, function() {
    console.log("Express server listening on port 4242")
})