### 生命周期
- 帮助我们更好的编写组件，优化性能

```javascript
// 初始化
constructor
// mount（挂载）
componentWillMount=>render=>componentDidMount
// update(更新)
1. props改变
componentWillReceiveProps=>shouldComponentUpdate
1.1. 若shouldComponentUpdate返回true 则继续走下去, componentWillUpdate=>render=>componentDidUpdate
1.2. 否则不进行之后的生命周期
2. state改变
shouldComponentUpdate
2.1. 同1.1
2.2. 同1.2
// unmount(销毁)
componentWillUnmount
```
### React.Children.XXX
- React.Children.map
this.props.children可以是任何类型, 所以在遍历children时, 不通过this.props.children.map 防止出错；通过该方法循环遍历children
- React.Children.count
例如: "hello, world", this.props.children.length = 12; 
- React.Children.forEach
与上面的X.map类似，区别在于返回值
- React.Children.toArray
- React.cloneElement

### 单向数据流
- props只读，子组件无法通过赋值的方式修改props

### 组件
- 基础组件一定要用propTypes类型检查
- defaultProps定义默认props

### setState
- 异步的过程
```javascript
    this.setState({ count: count++ })
    console.log(count) // count是++之前的值；

    // 解决方式，setState第二个参数是回调函数
    this.setState({
        count: count++
        }, () => {
        console.log(count) // 正常
    })
```