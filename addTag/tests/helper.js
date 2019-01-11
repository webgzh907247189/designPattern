function test1(firstName){
    return ` hello, ${firstName} `;
}

function test2(str){
    return str.toUpperCase();
}

function test3(str){
    return str.trim();
}

module.exports = {
    test1,
    test2,
    test3
}

