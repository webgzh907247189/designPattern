function loader(source){
    console.log('pre2')
    return source + '//pre2'
}

loader.pitch = function(){
    console.log('pre2 -- picth');
}

module.exports = loader