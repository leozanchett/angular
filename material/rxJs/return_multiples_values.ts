

// function foo() {
//    console.log('Hello');
//    return 42;
//    return 100; // dead code. will never happen
//  }

import { Observable } from 'rxjs';

const foo = new Observable(subscriber => {
   console.log('Hello');
   subscriber.next(42);
   subscriber.next(100); // "return" another value
   subscriber.next(200); // "return" yet another
});

console.log('before');
foo.subscribe(x => {
   console.log(x);
});
console.log('after');

// With synchronous output:
// "before"
// "Hello"
// 42
// 100
// 200
// "after"

const foo2 = new Observable(pao => {
   console.log('Hello');
   pao.next(42);
   pao.next(100);
   pao.next(200);
   setTimeout(() => {
      pao.next(300); // happens asynchronously
   }, 1000);
 });
  
 console.log('before');
 foo2.subscribe((x) => {
   console.log(x);
 });
 console.log('after');

// With output:
// "before"
// "Hello"
// 42
// 100
// 200
// "after"
// 300