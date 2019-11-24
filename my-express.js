const http = require('http')
const url = require('url')
const {formatUrl, generateParams, getUrlId, checkEnds, error} = require('./helpers')
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
    
    listen(port, fun) {
        const server = http.createServer((req, res) => {
            let { query, pathname } = url.parse(req.url, true)
            let isRouteExist = false;
            for (const route of this.routes) {
                pathname = checkEnds(pathname);
                const id = getUrlId(route.pathname, pathname);
                const urlFormat = formatUrl(route.pathname, id);

                if(urlFormat === pathname
                    && (route.method === req.method 
                        || route.method === "ALL") ) {
                    req.query = query;
                    req.params = generateParams(route.pathname, id);
                    res.send = (content = "") => {
                        res.write(content)
                        res.end()
                    }
                    route.fun(req, res);
                    isRouteExist = true;
                }
            }
            if(!isRouteExist) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(error(`Cannot ${req.method} ${pathname}`))
            }
        });
        server.listen(port)
        if(typeof fun === "function")
            fun()
    }
}

const express = () => {
    return new MyExpress();
}


module.exports = express;