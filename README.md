## 开发步骤笔记

### 初始化项目，引入elementUI vue-router
### 引入axios
- BASE_URL = import.meta.env.VITE_API_BASE_URL
- 引入pinia全局状态管理
- token持久化
- 路由守卫
- 自定义路由meta属性，增加权限控制
  - 增加permissionStore管理当前用户权限，控制菜单渲染
- 自定义指令-自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```


