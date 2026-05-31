function solution(a) {
    // Write your answer here
    let result
    let C = 'c'
    let D = 'd'
    let ADD = '+'
    if(Array.isArray(a)){
      let resultList = a.reduce((r, item, idx) => {
        if(item === C){
          r.pop()
        }
        if(item === D){
          r.push(item * 2)
        }
        if(item === ADD){
          r.push(Number(r[idx - 2]) + Number(r[idx - 1]))
        }
        r.push(Number(item))
        return r
      }, [])
      console.log(resultList, 'resultList')
      result = resultList.reduce((sum, item) => {
        return sum += item
      }, 0)
    }else{
      result = 0
    }
    return result
  }
  
 