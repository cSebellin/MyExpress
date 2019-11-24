
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

module.exports = {
    generateParams,
    formatUrl,
    getUrlId,
    checkEnds
}