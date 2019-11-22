const http = require('http')
const url = require('url')

class MyExpress {
    constructor() {
        this.routes = [];
    }

    get(pathname, fun) {
        this.routes.push({"method": "GET", pathname, fun})
    }
    
    post(pathname, fun) {
        this.routes.push({"method": "POST", pathname, fun})
    }
    
    put(pathname, fun) {
        this.routes.push({"method": "PUT", pathname, fun})
    }
    
    delete(pathname, fun) {
        this.routes.push({"method": "DELETE", pathname, fun})
    }
    
    all(pathname, fun) {
        this.routes.push({"method": "ALL", pathname, fun})
    }
    
    listen(port) {
        const server = http.createServer((req, res) => {
            const { query, pathname } = url.parse(req.url, true)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            for (const route of this.routes) {
                if(route.pathname.match(/.+(\:.+).*/g)) {
                    const id = pathname.replace(/.+\/(\d).*/g, "$1")
                    route.pathname = route.pathname.replace(/\/$/g, "")
                    route.pathname = route.pathname.replace(/(\:.+)/g, id)
                }
                 if(route.pathname === pathname
                    && route.method === req.method ) {
                    req.query = query;
                    res.send = (content = "") => {
                        res.write(content)
                        res.end()
                    }
                    route.fun(req, res);
                }
            }
        });
    
        server.listen(port)
    }
}

const express = () => {
    return new MyExpress();
}


module.exports = express;