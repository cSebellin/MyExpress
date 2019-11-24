const express = require('./my-express');
const app = express();
const fs = require('fs')

const LOCAL_DATABASE = 'students_my-express.json'

app.get('/', function(req, res) {
    const {name} = req.query
    res.send(`<h1>Hello, ${name || 'World'}!</h1>`)
});

app.put('/students/:id/', function(req, res){
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
      })

      req.on('end', () => {
        const {id} = req.params;
        const user = JSON.parse(body)
        const data = require(`./${LOCAL_DATABASE}`)
        const index = data.findIndex(obj => obj.id == id)
        data[index].name = user.name
        fs.writeFileSync(LOCAL_DATABASE, JSON.stringify(data, null, 4))
        res.send()
      })
})
app.listen(4545)
console.log("MyExpress server listening on port ", 4545)