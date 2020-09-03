export default class Subscription{
    constructor(store){
        console.log(store, 'store')
        this.listener = []
        store.subscribe(() => this.notify())
    }

    subscripte(listener){
        this.listener.push(listener)
    }

    notify(){
        this.listener.forEach(_ => _());
    }
}