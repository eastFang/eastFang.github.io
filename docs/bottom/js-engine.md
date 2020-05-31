```javascript
<script>
function foo() {
  bar()
}
function bar() {
  console.log('bar')
}
foo()
</script>
```

### 浏览器是如何执行这段代码的呢?
浏览器内置js引擎，像chrome的v8引擎；js引擎扮演着非常重要的角色，编译和执行js代码；其中她本身有两个非常重要的组件：内存堆(memory heap）和执行栈（call stack）

1. main函数压入执行栈
2. foo函数入栈执行
3. bar函数入栈执行，console.log输出bar，bar函数执行完毕，出栈，foo函数执行完毕，出栈
4. main函数执行完毕，出栈，此时执行栈清空

### js引擎是单线程执行的, 为啥要这样设计？
在这样一种场景下：一条记录有修改和删除两个操作，我同时点击编辑和删除，如果js是多线程，那么页面上极大可能出现打架的情况

<!-- ### 遇到了执行时间非常久的代码，会怎样 -->

