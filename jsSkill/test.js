class Test {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(this.name);
    }
}
let t = new Test('name');
class Test1 {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(this.name);
    }
}
let t1 = new Test1('name');
class Test2 extends Test1 {
    constructor(name, sex) {
        super(name);
        this.sex = sex;
    }
    aa() {
        super.eat();
    }
}
let t2 = new Test2('11', '22');
class Test3 extends Test1 {
    constructor(name, sex) {
        super(name);
        this.sex = sex;
    }
    aa() {
        super.eat();
    }
}
let t3 = new Test3('33', '44');
