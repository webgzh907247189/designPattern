export default class Subscription{
    constructor(store){
        this.listener = []
        store.subscripte(() => this.notify())
    }

    subscripte(listener){
        this.listener.push(listener)
    }

    notify(){
        this.listener.forEach(_ => _());
    }
}