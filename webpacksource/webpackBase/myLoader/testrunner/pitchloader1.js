function loader1(source){
    console.log(source + 'pitchloader1')
}


loader1.pitch = function (r1, p1, data)  {
    console.log('pitchloader1--pitch')
    
    let cb = this.async();

    setTimeout(() => {
        cb()
    }, 3000)
}

module.exports = loader1