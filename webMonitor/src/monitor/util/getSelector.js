export default function(pathOrTarget){
    if(Array.isArray(pathOrTarget)){
        return getSelectors(pathOrTarget)
    }else {
        let path = []
        while(pathOrTarget){
            path.push(pathOrTarget)
            pathOrTarget = pathOrTarget.parentNode
        }
        return getSelectors(path)
    }
}

function getSelectors(path){
    return path.reverse().filter(item => {
        return item !== document && item !== window
    }).map((element) => {
        
        if(element.id){
            return `${element.tagName.toLowerCase()}.#${element.id}`
        }else if(element.className && typeof element.className === 'string'){
            return `${element.nodeName.toLowerCase()}.${element.className}`
        }else{
            return element.nodeName.toLowerCase()
        }
    }).join(' ');
}