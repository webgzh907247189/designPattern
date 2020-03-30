// https://github.com/shengxinjing/my_blog/issues/10
{
    function leftpad(str, len, ch) {
        if (!ch && ch !== 0) ch = ' ';
        var len = len - str.length;
        return Array(len + 1).join(ch) + str;
    }
    const result = leftpad('hello',17,'h');
    console.log(result,result.length)
}


// 用一个带length属性的对象去实现join，免去了创建arr的步骤，性能应该回好点
{
    function leftpad(str, len, ch) {
        if (!ch && ch !== 0) ch = ' ';
        var len = len - str.length;

        return Array.prototype.join.call({
            length:len + 1
        },ch)+str;
    }
    
    const result = leftpad('hello',17,'h');
    console.log(result,result.length)
}


// 把Array.prototype.join缓存到外部变量里，多次使用速度更快
{
    var _join = Array.prototype.join
    function leftpad(str, len, ch) {
        if (!ch && ch !== 0) ch = ' ';
        var len = len - str.length;
        return _join.call({
            length:len + 1
        },ch)+str;
    }
    
    const result = leftpad('hello',17,'h');
    console.log(result,result.length)
}


{
    function leftpad(str, len, ch) {
        if (!ch && ch !== 0) ch = ' ';
        var len = len - str.length,
            total = ''
        
        while (true) {
            // 如果len是基数，total上就加一个ch
            if (len % 2 == 1) total += ch;
            if (len == 1) return total + str;;
            // 每次ch都变成chch
            ch += ch;
            //长度减半
            len = parseInt(len / 2);
        }
    }
    
    const result = leftpad('hello',17,'h');
    console.log(result,result.length)
}


{
    function leftpad(str, len, ch) {
        if (!ch && ch !== 0) ch = ' ';
        var len = len - str.length,
            total = ''
        while (true) {
            // 如果len是基数，total上就加一个ch
            if (len & 1 == 1) total += ch;
            if (len == 1) return total + str;;
            // 每次ch都变成chch
            ch += ch;
            //长度减半
            len = len>>1;
        }
    }
    
    const result = leftpad('hello',17,'h');
    console.log(result,result.length)
}

{

    function leftpad(str, len, ch) {
        if (!ch && ch !== 0) ch = ' ';
        var len = len - str.length,
            total = ''
        while (len) {
            // 如果len是基数，total上就加一个ch
            (len & 1) && (total += ch)
            // 每次ch都变成chch
            ch += ch;
            //长度减半
            len = len >> 1;

        }
        return total + str
    }
    const result = leftpad('hello',17,'h');
    console.log(result,result.length)
}


