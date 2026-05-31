const NormalModle = require('./NormalModle');

module.exports = class NormalModleFactory {
    create(data){
        return new NormalModle(data)
    }
}