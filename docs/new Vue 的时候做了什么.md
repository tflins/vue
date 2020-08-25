# new Vue 的时候做了什么

new Vue 的时候，调用了 vue 的构造函数。vue 的构造函数中调用了其原型上的 `_init()` 方法，`_init()` 方法主要是对 vue 进行一系列的初始化操作。

vue 的构造函数在 [src/core/instance/index.js](src/core/instance/index.js) 中：

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```
