
```javascript
// js是单线程的解释性语言
// 单线程：先执行完一个，再执行另一个
// 解释性：先解释一行，再执行一行
// 经历下面三个过程
```
### 语法分析
js执行之前，通常会扫描代码，可以检查出一些语法错误

### 预编译
四部曲（函数内的预编译）
- 创建AO对象 ===== 也就是我们通常所说的执行上下文
- 将函数的形参和变量赋给AO对象的key，value为undefined
- 将函数实参的值与形参结合
- 在函数体找函数声明，赋值给AO，所有函数声明的优先级会比变量高

举例下面这个例子
```javascript
function fn (a){
	console.log(a); // function a(){}
	var a =123;
	console.log(a);
	function a(){}
	console.log(a);
	var b =function(){}
	console.log(b);
	function d(){}
}
fn(1)
// 1. AO = {}
// 2. AO = {
//   a: undefined,
//   b: undefined
// }
// 3. AO = {
//   a: 1,
//   b: undefined
// }
// 4. AO= {
//   a: function a() {},
//   b: undefined, // b非函数声明，而是赋值
//   d: function d() {}
// }
```
### 解释执行
解释一行，执行一行，基于预编译的产物(AO/执行上下文)

[参考](https://www.huaweicloud.com/articles/8354514.html)