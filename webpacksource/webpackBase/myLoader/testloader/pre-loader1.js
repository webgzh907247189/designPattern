function loader(source){
    console.log('pre1')
    return source + '//pre1'
}

loader.pitch = function(){
    console.log('pre1 -- picth');
}

module.exports = loader