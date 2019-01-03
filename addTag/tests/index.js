/**
 * 单元测试
 */
let {composeFn} = require('../util/index');
let {expect} = require('chai');
let {test1,test2,test3} = require('./helper')

describe('compose测试', function() {
    it('compose 结果应该是 HELLO, NAME IS TEST', function() {
        let composeResult = composeFn(test3,test2,test1)
        expect(composeResult('name is test')).to.be.equal('HELLO, NAME IS TEST');
    });
});