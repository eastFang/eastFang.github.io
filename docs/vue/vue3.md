## vue3的几个特性

### teleport
- [用法详细参考](https://vue3js.cn/docs/zh/guide/teleport.html)
```javascript
// 有点类似React的createPortal，指定位置渲染dom，比较适合弹出层的情况，如modal、dropdown等

// 这里简单介绍下
<teleport to="body">
  <div>
    我是弹出层内容，teleport包裹的内容将全部在指定dom下展示(这里是body)
  </div>
</teleport>
```

### setup
- 聚合逻辑关注点
```javascript
import { fetchUserList, fetchCustomerList } from '@/api/user'
// vue2.x，用1 2表示是不同的业务逻辑部分，随着业务的不断迭代，阅读代码的时候，会出现跳来跳去的情况
export default {
  data() {
    return {
      userList: [], // 1
      customerList: [], // 2
    }
  },

  methods: {
    async setUserList() { // 1
      this.userList = await fetchUserList()
    },
    async setCustomerList() { // 2
      this.fetchCustomerList = await fetchCustomerList()
    }
  },

  mounted() {
    this.setUserList() // 1
    this.setCustomerList() // 2
  }
}
/************************************我是一条合格的分界线************************************/
// vue3.x
import { ref, onMounted } from 'vue'
export default {
  setup(props) {
    let userList = ref([]) // ref包裹使之响应式
    const setUserList = async () => {
      userList.value = await fetchUserList()
    }
    onMounted(setUserList)

    let customerList = ref([])
    const setCustomerList = async () => {
      customerList.value = await fetchCustomerList()
    }
    onMounted(customerList)

    return {
      userList,
      setUserList,

      customerList,
      setCustomerList
    }
  }
}
/************************************我是一条合格的分界线************************************/
// 随着业务模块的更迭，setup函数会变得越来越臃肿，显然这不是我们想看到的结果
// 我们可以把逻辑独立出去
// ./composables/useUserList.js
export default function () {
  let userList = ref([]) // ref包裹使之响应式
  const setUserList = async () => {
    userList.value = await fetchUserList()
  }
  onMounted(setUserList)

  return {
    userList,
    setUserList
  }
}
// ./composables/useCustomerList.js
export default function () {
  let customerList = ref([]) // ref包裹使之响应式
  const setCustomerList = async () => {
    customerList.value = await fetchCustomerList()
  }
  onMounted(setCustomerList)

  return {
    customerList,
    setCustomerList
  }
}
// 最终整理后的代码
export default {
  setup() {
    const { userList } = useUserList() // 1
    const { customerList } = useCustomerList() // 2

    return {
      userList,
      customerList
    }
  }
}
/************************************我是一条合格的分界线************************************/
// setup 可以返回一个渲染函数，不论template定义了什么，都会渲染这个渲染函数返回的vnode
export default {
  setup() {
    return h('div', '我是第一优先级的') // 最终会渲染这个
  }
}
/************************************我是一条合格的分界线************************************/
// setup中拿到ref
<template>
  <div ref="root">我是根组件</div>
  // 这里的ref前面要加冒号
  <div v-for="(item, idx) in list" ref="e => roots[idx] = e"></div>
</template>

export default {
  setup() {
    const root = ref(null)
    const roots = ref([])

    onMounted(() => {
      console.log(root.value) // <div>我是根组件</div>
    })
    return {
      root,
      roots
    }
  }
}
```