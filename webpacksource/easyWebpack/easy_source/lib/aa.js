let list = [{id:1},{id:2, parentid: 1},{id: 3},{parentid: 3, id: 4}, {parentid: 4, id: 5}]


const getList = (list) => {
    return list.reduce((result, item) => {

        let id = item.id
        let flagItem = list.find(_ => _.parentid === id)
        if(flagItem){
            item.children = flagItem

            if(!item.parentid){
                result.push(item)
            }
        }
        return result
    }, [])
}

// console.log(JSON.stringify(getList(list)))
console.log(getList(list))