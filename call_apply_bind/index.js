/**
 * https://juejin.im/post/5c73a602e51d457fd6235f66
 */

{
    // call 可以继承
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    function Food(name, price) {
        Product.call(this, name, price);
        this.category = 'food';
    }
    var cheese = new Food('feta', 5);
    console.log(cheese)
    // Food { name: 'feta', price: 5, category: 'food' }
}


{
    // apply 
    var array = ['a', 'b'];
    var elements = [0, 1, 2];
    array.push.apply(array, elements);
    console.log(array); // ["a", "b", 0, 1, 2]
}
{
    var numbers = [5, 6, 2, 3, 7];
    var max = Math.max.apply(null, numbers)  // 7
    var min = Math.min.apply(null, numbers); // 2
}


