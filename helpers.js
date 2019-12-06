
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
    formatQueries(html, queries)
    return replaceAll(html, queries);
}

replaceAll = (html, values) => {
    for (const key in values) { 
        html = html.replace(new RegExp(`{{\\s*${key}\\s*\\|\\s*(\\w+)\\s*}}`), values[key])
        .replace(new RegExp(`{{\\s*${key}\\s*\\|\\s*(\\w+)\\s*:\\s*(\\d)\\s*}}`), values[key]);
    }
    return html;
};

formatQueries = (html, queries) => {
    let properties = html.match(/({{.+}})/g).join(" ");
    for (const key in queries) {
        const prop = getModifiers(properties, key);
        if(prop) queries[key] = modifiers(queries[key], prop);
    }
    return queries;
}

getModifiers = (properties, key) => {
    let prop = [];
    if(properties.match(new RegExp(`{{\\s*${key}\\s*\\|\\s*(\\w+)\\s*}}`))) {
        prop = properties.match(new RegExp(`{{\\s*${key}\\s*\\|\\s*(\\w+)\\s*}}`));
        return {"modifier": prop[1]};
    } else if(properties.match(new RegExp(`{{\\s*${key}\\s*\\|\\s*(\\w+)\\s*:\\s*(\\d)\\s*}}`))) {
        prop = properties.match(new RegExp(`{{\\s*${key}\\s*\\|\\s*(\\w+)\\s*:\\s*(\\d)\\s*}}`));
        return {"modifier": prop[1], "modifier_value": prop[2]};
    }
    return null;
}

modifiers = (value, prop) => {
    switch(prop.modifier) {
        case "fixed":
            return value.toFixed(prop.modifier_value);
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