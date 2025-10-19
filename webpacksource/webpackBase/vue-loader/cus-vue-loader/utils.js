const stringiftRequest = (loaderContext, requestPath) => {
    return JSON.stringify(loaderContext.utils.contextify(loaderContext.context, requestPath))
}


module.exports = {
    stringiftRequest
}