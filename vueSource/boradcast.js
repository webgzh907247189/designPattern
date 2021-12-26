// 只会向上通知
Vue.prototype.$dispatch = function(eventName,val){
    let parent = this.$parent
    while(parent){
        parent.$emit(eventName,val)
        parent = parent.$parent
    }
  }
  
  // 只会向下通知
  Vue.prototype.$boradcast = function(eventName,val){
    let children = this.$children
  
    // forEach 跳过不必要的循环[,,undefined,1] => 只有undefined,1 
    let boradcast = (children) =>{
        children.forEach((item)=>{
            item.$emit(eventName,val)
  
            if(item.$children){
                boradcast(item.$children)
            }
  
        })   
    }
  
    boradcast(children)
  }



  {
    var list = [[1,2],[3,4],[5,6]]

    function getList(list){
         
        for(let item of list){
            
            for(let item1 of item){
               console.log(item1)
            } 
        } 
    }
    getList(list)
  }