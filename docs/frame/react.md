最近在写【博客】的项目，技术栈是react + react-router + redux + react-redux + webpack，这篇写下期间用react的一些小心得

## 生命周期
- 帮助我们更好的编写组件，优化性能

```
getDefaultProps =>       getInitialState      => componentWillMount => render => componentDidMount
                  (es6 constructor this.state)

componentWillReceiveProps => shouldComponentUpdate => componentWillUpdate => render => componentDidUpdate
    this.setState                (return true)     ||
                                       forceUpdate =

componentWillUnmount
```
## React.Children.XXX
- React.Children.map
this.props.children可以是任何类型, 所以在遍历children时, 不通过this.props.children.map 防止出错；通过该方法循环遍历children
- React.Children.count
例如: "hello, world", this.props.children.length = 12; 
- React.Children.forEach
与上面的X.map类似，区别在于返回值
- React.Children.toArray
- React.cloneElement