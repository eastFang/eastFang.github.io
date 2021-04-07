### vue源码(v2.5.0)

- debug方法
  1. git clone vue代码仓库到本地
  2. build/config.js的genConfig方法的 config增加sourceMap: true
  3. npm run dev
  4. 打开项目下的expamples的页面可以开始调试了

- 找到入口
  1. 根据debug方法的第三步 npm run dev, 关键词搜索web-full-dev，可以看到入口文件是web/entry-runtime-with-compiler.js
  2. 项目有alias配置（build/alias.js）web被alias到src/platforms/web
  3. 可找到src/platforms/web/entry-runtime-with-compiler.js文件

- 代码分析(这里会说明一些主要的逻辑代码, 像源码里面一些环境判断和warn相关的就省略了)
  - src/platforms/web/entry-runtime-with-compiler.js
  ```javascript
  import Vue from './runtime/index'

  const idToTemplate = cached(id => {
    const el = query(id)
    return el && el.innerHTML
  })
  // 缓存id对应的html,减少dom的访问
  // 在平常写业务代码的过程中,可以利用闭包访问缓存结果减少性能开销
  function cached(fn) { // 缓存id对应的html,减少dom的访问
    const cachedData = Object.create(null)
    return function(id) {
      const hint = cachedData[id]
      return hint || cachedData[id] = fn.call(this, id)
    }
  }

  const mount = Vue.prototype.$mount // 暂存runtime定义的mount方法
  // 对mount函数的一个wrap处理, 将tempalte el 都转为render
  Vue.prototype.$mount = function(el, hydrating) {
    el = el && query(el)
    const options = this.$options // 在_init()函数中，实例化对象会赋值这个属性； 见 引用1
    // 如果没有定义render
    if (!options.render) {
      let template = options.tempalte
      // 取options定义的template和el，template > el
      if (template) {
        if (typeof template === 'string')  { // 在常规的vue组件里面该条件为true
          if (template.charAt(0) === '#') {
            template = idToTemplate(template)
          }
        } else if (template.nodeType) { // TODO:暂时没碰到过
          template = template.innerHTML
        }
      } else if (el) {
        tempalte = getOuterHTML(el)
      }
    }
    if (template) {
      // TODO:
    }
    mount.call(this, el, hydrating)
  }
  ```
  ```javascript
  // src/platforms/web/runtime/index.js
  import Vue from 'core/index'
  import { mountComponent } from 'core/instance/lifecycle'

  Vue.prototype.$mount = function(el, hydrating) { // hydrating:暂时不用管
    // 浏览器环境才有效
    return mountComponent(this, el, hydrating)
  }
  ```
  - src/core/index.js
  ```javascript
  import Vue from './instance/index'
  import { initGlobalAPI } from './global-api/index'

  initGlobalAPI(Vue) // 扩展Vue属性
  ```
  ```javascript
  // src/core/instance/index.js
  // 扩展Vue.prototype，使实例对象能访问到
  function Vue(options) {
    if (!this instanceof Vue) { // 用instanceof判断对象的原型链上是否有Vue
      throw new Error('Vue是构造函数，必须被new关键字调用')
    }
    this._init(options)
  }
  ```
  ```javascript
  // src/core/global-api/index.js
  export const ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ]

  export function initGlobalAPI(Vue) {
    // TODO:
    // 引用2 构造函数扩展属性
    Vue.options = Object.create(null)
    ASSET_TYPES.forEach(type => {
      Vue.options[type + 's'] = Object.create(null)
    })
    Vue.options._base = Vue
  }
  ```
  - src/core/instance/lifecycle.js
  ```javascript
  function mountComponent() {
    // TODO:
  }
  ```

- 重点代码 src/core/instance/index.js
```javascript
initMixin(Vue)
export function initMixin(Vue) {
  // 扩展_init方法
  Vue.prototype._init = function(options) {
    const vm = this
    vm._isVue = true // _isVue可以避免被数据劫持
    if (options && options._isComponent) {
      // TODO:
    } else {
      // 引用1: 定义$options
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor), // 见引用2,获取挂在Vue函数的options
        options || {},
        vm
      )
    }
    initProxy(vm) // 定义vm._renderProxy，后续要用到，暂时不知道干啥的。TODO:
    // vm._renderProxy = vm
    /************ 生命周期 start **************/
    initLifecycle(vm)
    function initLifecycle(vm) {
      const $options = vm.$options
      
      vm.$parent = parent
      vm.$root = parent ? parent.$root : vm

      vm.$children = []
      vm.$ref = {}
    }
    /************ 生命周期 end ***********/
    /************ 组件event start ***********/
    initEvents(vm)
    function initEvents(vm) {
      vm._events = Object.create(null)
      vm._hasHookEvent = false // TODO:
      const listeners = vm.$options._parentListeners // 父组件@event
      if (listeners) {
        updateComponentListeners(vm, listeners)
      }
    }
    function updateComponentListeners(vm, listeners, oldListeners) {
      target = vm
      // 见引用3
      updateListeners(listeners, oldListeners || {}, add, remove, vm)
    }
    /************ 组件event end ***********/
    /************ render start ***********/
    initRender(vm)
    function initRender(vm) {
      vm._vnode = null
      // 实例对象挂载createElement方法
      vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
      vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
    }
    /************ render end ***********/
    // beforeCreate
    // 无法用this.xxx的方式获取数据. 但是_init方法，在初始化时，把options挂载在了$options上
    // 可以用this.$options.data() 或者 this.$options.methods.xxx的方式获取，但是由于这两个集合里面大多数都会用this.xxx引用其他数据，导致根本不可用...
    callhook('beforeCreate') // 执行生命周期函数, beforeCreate
    /************ inject start ***********/
    // 用的不是很多. 最核心的代码就是initInjections 会从parent递归拿_provide的数据，
    initInjections(vm)
    /************ inject end *************/
    /************ initState start 比较核心(着重介绍) *********/
    initState(vm)
    function initState(vm) {
      vm._watchers = []
      const opts = vm.$options
      // 暂时不考虑，只考虑最简单的情况
      if (opts.props) initProps(vm, opts.props)
      if (opts.data) initData(vm)
      if (opts.methods) initMethods(vm, opts.methods)
      if (opts.computed) initComputed(vm, opts.computed)
      if (opts.watch) initWatch(vm, opts.watch)
    }
    // function initProps(vm, propsOptions) {
    //   const propsData = vm.$options.propsData // create-components的时候会定义这个值，之后会说明
    // }
    function initMethods(vm, methodOptions) {
      const keys = Object.keys(methodOptions)
      let i = keys.length
      while(i--) {
        const key = keys[i]
        vm[key] = methodOptions[key].bind(vm)// 这里注意下要bind下, vu源码内部自己实现了一个简单的bind函数，比原生更快, 实际是缺少了bind函数的
      }
    }
    // 1. vm挂载了_computedWatchers，存放Watcher实例, lazy为true，不会马上计算结果
    // 2. vm挂载computed所有属性, 当template引用computed属性，触发get
    function initComputed(vm, computedOptions) {
      const watchers = vm._computedWatchers = Object.create(null)
      const keys = Object.keys(computedOptions)
      let i = keys.length
      while(i--) {
        const key = keys[i]
        const userDef =  computedOptions[key]
        const getter = typeof userDef === 'function' ? userDef : userDef.getter
        // 内部的watchers
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          {
            lazy: true // 暂时不执行Watcher的get函数, 获取value值，只有当template中引用或者watch监听的时候，才会执行
          }
        )
        // 将computed的属性全部挂载在vm下
        Object.defineProperty(vm, key, {
          get() {
            return userDef.get || userDef
          },
          set() {
            userDef.set || noop
          }
        })
      }
    }
    // 同理，将watch中定义的所有属性全部挂载在vm下, 有不一样的地方是,会给每个属性，创建watcher实例
    function initWatch(vm, watchOptions) {
      const keys = Object.keys(watchOptions)
      let i = keys.length
      while(i--) {
        const key = keys[i]
        const handler = watchOptions[key]
        createWatcher(vm, key, handler)
      }
    }
    function createWatcher(vm, key, handler) {
      vm.$watch(key, handler)
    }
    // Vue.prototype.$watch = 
    function initData(vm) {
      let data = vm.$options.data
      // 转化为对象
      data = vm._data = typeof data === 'function' ? data.call(this) : data
      const keys = Object.keys(data)
      // vm._data下所有的属性全部挂到vm下，使得vm.xxx可访问
      proxy(vm, '_data')
      // let i = keys.length
      // while(i--) {
      //   const key = keys[i]
      //   Object.defineProperty(vm, key, {
      //     get() {
      //       return vm._data[key]
      //     },
      //     set(val) {
      //       vm._data[key] = val
      //     }
      //   })
      // }
      // 遍历data下所有的属性, 响应式处理
      observe(data, true)
      // 这里贴出一些主要的代码
      function observe(value, asRootData) {
        let ob = new Observe(value)
        if (asRootData && ob)  {
          ob.vmCount++
        }
        return ob
      }
      // 贴下Observe类
      class Observe {
        constructor(value) {
          this.walk(value)
        }

        walk(value) {
          const keys = Object.keys(value)
          let i = keys.length
          while(i--) {
            defineReactive(value, keys[i], value[keys[i]])
          }
        }
      }
      // defineReactive 劫持数据响应式 getter依赖收集，setter通知依赖更新
      function defineReactive(obj, key, val, shallow) {
        const property = Object.getOwnPropertyDescriptor(obj, key)
        const getter = property && property.getter
        const setter = property && property.setter
        Object.defineProperty(obj, key, {
          get() { // getter在模版里面用到了，才会调用并开始依赖收集
            const value = getter ? getter.call(obj) : value
            !shallow && observe(value)
            return value
          },
          set(newVal) {
            if (setter) {
              setter.call(obj, newVal)
            } else {
              val = newVal
            }
          }
        })
      }
    }
    /************* initState  end **********/
    /************* initProvide start *******/
    /************* initProvide end ******/
    callHook(vm, 'created') // 至此走到了created生命周期钩子函数
  }
}
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```
- src/core/vdom/helpers/update-listeners.js
```javascript
// 引用3
function updateListeners(on, oldOn, add, remove, vm) {

}
```

- 写在最后
  - Observer 响应式: 会对data定义的属性进行getter，setter劫持，getter进行依赖收集, setter通知依赖更新, 每个响应式数据都有个dep实例
  - Dep 依赖管理: 收集依赖的容器和通知依赖更新
  - Watcher 依赖: 实现update的方法，依赖更新
