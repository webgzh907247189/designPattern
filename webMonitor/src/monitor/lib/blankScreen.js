import tracker from "../util/tracker";

export function blankScreen(){
    for (let index = 0; index < 9; index++) {
        // 横坐标 纵坐标 上面取 18个 dom 点
        const xElement = document.elementFromPoint(window.inhherWidth / 10 * i, window.innerHeight / 2);
        const yElement =  document.elementFromPoint(window.inhherWidth / 2, window.innerHeight / 10 * i );

        isWrapper(xElement[0])
        isWrapper(yElement[0])
    }
}

let wrapperElement = ['html', 'body', '#container']
function isWrapper(element){

}