const http = require('http')
const url = require('url')

class MyExpress {
    constructor() {
        this.routes = [];
    }

    get(pathname, fun) {
        this.routes.push({"id":1, pathname, fun})
    }
    
    post(pathname, fun) {
        this.routes.push({"id":2, pathname, fun})
    }
    
    put(pathname, fun) {
        this.routes.push({"id":3, pathname, fun})
    }
    
    delete(pathname, fun) {
        this.routes.push({"id":4, pathname, fun})
    }
    
    all(pathname, fun) {
        this.routes.push({"id":5, pathname, fun})
    }
    
    listen(port) {
        const server = http.createServer((req, res) => {
            const { pathname } = url.parse(req.url, true)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            for (const route of this.routes) {
                 if(route.pathname === pathname) {
                    route.fun(req, res);
                }
            }
            res.end();
        });
    
        server.listen(port)
        console.log("MyExpress server listening on port ", port)
    }

    
}

const express = () => {
    return new MyExpress();
}


module.exports = express;