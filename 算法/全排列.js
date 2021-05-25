{
    const list = [['热', '冷', '冰'], ['大', '中', '小'], ['重辣', '微辣'], ['重麻', '微麻']];

    function getAllList(list){
        let result = []
        let [list1, ...list2] = list

        list2.forEach((item) => {
        
            let copylist = result.slice();
            let listArr = copylist.length ? copylist : list1;
            result = []
        
            listArr.forEach((itemVal) => {

                item.forEach((itemVal1) => {
                    result.push(itemVal + itemVal1)
                })
                    
            })
        })
        return result
    }
    console.log(getAllList(list));
}