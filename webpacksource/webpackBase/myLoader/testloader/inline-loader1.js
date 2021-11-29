function loader(source){
    console.log('inline1')
    return source + '//inline1'
}

loader.pitch = function(){
    console.log('inline1 -- picth');
}

module.exports = loader