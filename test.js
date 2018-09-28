// 数组去重
// 循环遍历数组，若新数组不存在值，不断的往新数组里push值；
const arr1 = [1, 1, 2, 3, 4]
const result = []
console.time("test")
for(let item of arr1) {
  if (result.indexOf(item) === -1) {
    result.push(item)
  }
}
console.timeEnd("test")
console.log(result)

// es6的Set
const arr2 = [1, 1, 2, 3, 4]
console.time("test")
const result2 = [...new Set(arr2)]
console.timeEnd("test")
console.log(result2)

// 利用对象的key不能相同，再用原生方法；拿到values
const arr3 = [1, 1, 2, 3, 4]
const tmp3 = {}
console.time("test")
for(let item of arr3) {
  tmp3[item] = item
}
console.timeEnd("test")
const result3 = Object.values(tmp3)
console.log(result3)

const obj1 = new Object()
const obj2 = { key1: 2 }
console.log(obj1.__proto__ === Object.prototype, obj2.__proto__ === Object.prototype)

function Animal() {
  this.type = 'animal'
  this.legs = 4
}
Animal.prototype.sound = function(sound) {
  console.log(sound)
}

function Dog() {
  Animal.call(this)
  this.legs = 3
}
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.contructor = Dog
const dog = new Dog()
const animal = new Animal()
console.log(Dog.prototype)


const logger = () => next => action => {
  // console.log('【logger】即将执行:', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
  let returnValue = next(action)

  // console.log('【logger】执行完成后 state:', getState())
  return returnValue
}

const middlewares = [logger]
const chain = middlewares.map(middleware => middleware())
console.log(chain)