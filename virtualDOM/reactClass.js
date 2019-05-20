{
	class A{
        constructor(){
            this.name = '11'
        }
    }

    class B extends A{
        cc(){
            console.log(this.name)
        }
    }

    var b = new B()
    b.cc() // 11
}