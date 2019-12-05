const express = require('./my-express');
const app = express();
const fs = require('fs')

const LOCAL_DATABASE = 'students_my-express.json'

app.get('/', function(req, res) {
    const {name} = req.query
    res.send(`<h1>Hello, ${name || 'World'}!</h1>`)
});

app.put('/students/:id/', function(req, res){
  console.log(req.params)
  res.end()
})

app.post('/students/edit', function(req, res){
  console.log(req.body)
  res.end()
})

app.render('email', function (err, html) {
})

app.render('index', { name: 'Chopper', age: 15 }, function (err, html) {
  console.log(html)
})

app.listen(4545, function() {
  console.log("MyExpress server listening on port ", 4545)
})

