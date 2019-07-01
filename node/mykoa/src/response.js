let response = {
    _body: '',
    get body(){
        this._body
    },

    set body(value){
        this._body = value
    }
}

module.exports = response