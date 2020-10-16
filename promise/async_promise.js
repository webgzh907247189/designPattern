{
  async function foo() {
    await bar();
    console.log("bar end");
  }

  async function bar() {
    await xxx();
    console.log("xxx end");
  }
  async function xxx() {
    console.log("call xxx function");
  }

  foo();

  new Promise((resolve) => {
    console.log('promise--start')
    resolve("111");
  }).then(() => {
    console.log("promise then");
  });

  // call xxx function
  // promise--start
  // xxx end
  // promise then
  // bar end
}

  