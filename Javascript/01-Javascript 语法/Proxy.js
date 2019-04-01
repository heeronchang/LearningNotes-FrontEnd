const _name = new WeakMap();
class Person {
  constructor(name) {
    _name.set(this, name);
  }

  get name() {
    return _name.get(this);
  }
}

const jane = new Person('jane');
console.log(jane.name);
const proxy = new Proxy(jane, {});
console.log(proxy.name);
