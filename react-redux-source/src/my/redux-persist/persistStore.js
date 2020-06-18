export default function(store){
    let persitor = {
        ...store,
        init(){
            store.dispatch('PERSIST_INIT')
        }
    }
    return persitor
}