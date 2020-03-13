/**
 * "/home/" -> "/home"
 * "/home//foo/" -> "/home/foo"
 * "/a/../../b/../c//.//" -> "/c"
 * "/a//b////c/d//././/.." -> "/a/b/c"
 */

 function simplifyPath(str){
    const list = str.split('/').reduce((result,item) => {
        if(item === '..'){
            result.pop();
        } else if(item != '' && item !== '.') {
            result.push(item);
        }
        return result;
    },[])
    
    return `/${list.join('/')}`
 }
 console.log(simplifyPath('/a/../../b/../c//.//'))
 console.log(simplifyPath('/home/'))
 console.log(simplifyPath('/home//foo/'))
 console.log(simplifyPath('/a//b////c/d//././/..'))