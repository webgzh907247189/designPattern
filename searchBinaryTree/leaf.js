
/**
 * https://juejin.im/post/5bec223f5188250c102116b5
 */
const fetch = require('node-fetch')

class Leaf {
  constructor(id = "", value = "") {
    this.ids = id ? [id] : [];
    this.value = value;
    this.children = {};
  }
  share(id) {
    this.ids.push(id);
  }
}

function normalize(identify, data) {
  return data.reduce((result,item) => {
    const idValue = item[identify];
    result[idValue] = item;
    return result;
  },Object.create(null));
};
  
console.log('1111')
fetch("https://randomuser.me/api/?results=10&inc=gender,email,phone,cell,nat")
.then(response => {
  return response.json();
})
.then(data => {
  const { results } = data;
  const root = new Leaf();
  const identifyKey = "email";

  results.forEach(item => {
    const identifyValue = item[identifyKey];
    Object.values(item).forEach(itemValue => {
      // 注意这里会把 Number 和 Boolean 类型也字符串化
      const stringifiedValue = String(itemValue);
      let tempRoot = root;
      const arraiedStringifiedValue = Array.from(stringifiedValue);
      arraiedStringifiedValue.forEach((character, characterIndex) => {
        const reachEnd = characterIndex === arraiedStringifiedValue.length - 1;
        if (!tempRoot.children[character]) {
          tempRoot.children[character] = new Leaf(
            reachEnd ? identifyValue : "",
            character
          );
          tempRoot = tempRoot.children[character];
        } else {
          if (reachEnd) {
            tempRoot.children[character].share(identifyValue);
          }
          tempRoot = tempRoot.children[character];
        }
        console.log(tempRoot)
      });
    });
  });
})

//viewkey=ph5e2c057da2227