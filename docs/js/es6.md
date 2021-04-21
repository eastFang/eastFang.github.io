## generator

- 关键词：状态积、遍历器对象
- 调用函数的时候不会执行，只有手动调用遍历器对象的next方法依次执行，碰到yield结束
- 具体细节[参考](https://es6.ruanyifeng.com/#docs/generator)

```javascript
function * generateStudentLevel() {
  console.log('开始求学之路')
  yield '小学'
  yield '初中'
  yield '高中'
  yield '大学'
  return '工作'
}

const studentLevelInstance = generateStudentLevel() //不会执行函数体内的任何代码 

console.log(studentLevelInstance, 'studentLevelInstance')
for(let item of studentLevelInstance) {
  console.log(item, 'item')
}
// console.log(studentLevelInstance.next()) // 开始求学之路 小学

// console.log(studentLevelInstance.next()) // 初中

// console.log(studentLevelInstance.next()) // 高中

// console.log(studentLevelInstance.next()) // 大学

// console.log(studentLevelInstance.next()) // 工作
```

- 从下面的例子理解何处停止
```javascript
function *gen() {
  console.log(`1. ${yield}`)
}
const g = gen()
g.next() // { value: undefined, done: false }
g.next() // { value: undefined, done: true }  输出1. undefined
```

- yield 不能在普通函数中声明，否则会出现语法错误
```javascript
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield flat(item);
    } else {
      yield item;
    }
  }
};

const f = flat([1,2,4])
for(let item of f) {
  console.log(item, 'item')
}
```

- next的参数
```javascript
// yield表达式没有返回值, 或者说返回undefined
function * gen() {
  const result = yield 1
  console.log(result, 'result')
}
const g = gen()
g.next() // { value: 1, done: false }
g.next() // { value: undefined, done: true } 且打印: undefined, 'result'

// 如果想要result有值，可以通过next传入一个参数调用
// 这个功能很重要，可以往函数内部注入值，进行逻辑控制
g.next()
g.next('result value') // 会将参数当作给上一个yield表达式的返回值
```

