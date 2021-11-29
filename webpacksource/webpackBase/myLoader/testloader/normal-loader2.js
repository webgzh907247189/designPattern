function loader(source){
    console.log('normal2')
    return source + '//normal2'
}

loader.pitch = function(){
    console.log('normal2 -- picth');
}

module.exports = loader