
/**
 * https://juejin.im/post/5bec223f5188250c102116b5
 */
const fetch = require('node-fetch')

const data = {
  "results":[
    {"gender":"female","email":"oona.niemela@example.com","phone":"06-552-942","cell":"041-297-66-95","nat":"FI"},
    {"gender":"female","email":"angelika.corneliussen@example.com","phone":"53793124","cell":"98727645","nat":"NO"},
    {"gender":"female","email":"ines.gerard@example.com","phone":"076 163 86 86","cell":"075 814 57 38","nat":"CH"},
    {"gender":"male","email":"niilo.autio@example.com","phone":"03-675-306","cell":"044-144-33-08","nat":"FI"},
    {"gender":"female","email":"billie.matthews@example.com","phone":"(456)-666-1923","cell":"(486)-356-7540","nat":"US"},
    {"gender":"male","email":"jonathan.rasmussen@example.com","phone":"52549748","cell":"69393648","nat":"DK"},
    {"gender":"female","email":"aubree.ennis@example.com","phone":"161-548-1134","cell":"140-646-8166","nat":"CA"},
    {"gender":"female","email":"veera.makela@example.com","phone":"09-090-323","cell":"041-323-20-99","nat":"FI"},
    {"gender":"female","email":"ella.tervo@example.com","phone":"06-695-711","cell":"041-580-64-68","nat":"FI"},
    {"gender":"female","email":"tamara.patterson@example.com","phone":"09-1507-5534","cell":"0452-222-810","nat":"AU"}
  ],
  "info":{"seed":"c813ef74027e5257","results":10,"page":1,"version":"1.3"}
}
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
          // 一个元素，并且也没有出现过的情况
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