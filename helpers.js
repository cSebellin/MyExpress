
const fs = require('fs')

checkEnds = (url) => {
    if(url.endsWith("/")) return url.slice(0, -1); 
    return url;
}

generateParams = (route, id) => {
    let name = "";
    route = checkEnds(route);
    if(route.match(/(.+)(\:\w+)$/g)) name = route.replace(/(.+\:)(\w+)$/g, "$2");
    else if(route.match(/(.+)(\:\w+)(\/.+)/g)) name = route.replace(/(.+\:)(\w+)(\/.+)/g, "$2")

    return (name.length > 0) ? {[name] : id} : {};
}

formatUrl = (route, id) => {
    route = checkEnds(route);
    if(route.match(/(.+)(\:\w+)$/g)) return route.replace(/(.+)(\:\w+)$/g, `$1${id}`);
    else if(route.match(/(.+)(\:\w+)(\/.+)/g)) return route.replace(/(.+)(\:\w+)(\/.+)/g, `$1${id}$3`);
    else return route;
}

getUrlId = (route, url) => {
    if(route.match(/.+(\:.+).*/g)) return url.replace(/.+\/(\d).*/g, "$1");
    return -1;
}

transformHtml = (html, queries) => {
    return replaceAll(html, queries);
}

replaceAll = (html, values) => {
    for (const key in values) { 
        html = html.replace(new RegExp(`{{${key}}}`,"g"), values[key]);
    }
    return html;
};

formatQueries = (html, queries) => {
    console.log(queries)
    /*let properties = html.match(new RegExp(`({{.+}})`,"gm")).join(" ");

    for (const key in queries) {
        const prop = properties.replace(new RegExp(`{{${key}\s*\|\s*(\w+)}}`,"gm"), "$1");
        console.log(prop)
        console.log(properties)
        properties = properties.replace(new RegExp(`} {`,"gm"), "}---{");
        const objects = properties.split("---");
        
       // queries[key] = modifiers(queries[key], ,);
    }*/
    return queries;
}

modifiers = (value, modifier, modifier_value) => {
    switch(modifier) {
        case "fixed":
            return value.toFixed(modifier_value);
        case "upper":
            return value.toUpperCase();
        case "lower":
            return value.toLowerCase();
        default: return value;
    }
}

checkParam = param => {
    switch(typeof param) {
        case "string": return {"filename": param};
        case "function": return {"fun": param};
        case "object": return {"queries": param};
        default: return;
    }
}

checkFile = filename => {
    const template = `${filename}.html.mustache`;
    if (fs.existsSync(template)) {
        return fs.readFileSync(template, 'utf8');
    } else {
        return false;
    }
}

error = (error) => {
    return `<!DOCTYPE html>\
    <html lang=\"en\">\
    <head>\
        <meta charset=\"utf-8\">\
        <title>Error</title>\
    </head>\
    <body>\
        <pre>${error}</pre>\
    </body>\
    </html>`;
}

module.exports = {
    generateParams,
    formatUrl,
    getUrlId,
    checkEnds,
    checkParam,
    checkFile,
    transformHtml,
    error
}