// const arr = ['a', 'b', 'c'];
// const iter = arr[Symbol.iterator]();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// for (const str of arr) {
//   console.log(str);
// }

// --------------------------

// class RangeIterator {
//   constructor(start, stop) {
//     this.start = start;
//     this.stop = stop;
//   }

//   [Symbol.iterator]() { return this; }

//   next() {
//     const value = this.value;
//     if (value < this.stop) {
//       this.value += 1;
//       return { value, done: false };
//     }
//     return { value: undefined, done: true };
//   }
// }

// function range(start, stop) {
//   return new RangeIterator(start, stop);
// }

// const obj = range(0, 3);
// console.log(obj);

// // 为什么没有输出？？？
// for (const value of obj) {
//   console.log('x');
//   console.log(value);
// }

// --------------------------
function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
  let current = this;

  function next() {
    if (current) {
      const value = current.value;
      current = current.next;
      return { done: false, value };
    }
    return { done: true };
  }
  const iterator = { next };
  return iterator;
};

const one = new Obj(1);
const two = new Obj(2);
const three = new Obj(3);
one.next = two;
two.next = three;

for (const i of one) {
  console.log(i);
}
