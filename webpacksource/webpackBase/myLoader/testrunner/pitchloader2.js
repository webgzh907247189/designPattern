function loader2(source){
    console.log(source + 'pitchloader2')
    return source + 'pitchloader2'
}
loader2.pitch = () => {
    console.log('pitchloader2--pitch')
    return 'zzz'
}

module.exports = loader2