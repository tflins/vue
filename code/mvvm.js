// function isObject(value) {
//   return typeof value !== null && typeof value === 'object'
// }

// const { observe } = require('../src/core/observer')

// function cb() {
//   console.log('数据更新了')
// }

// function defineReactive(obj, key, val) {
//   const dep = new Dep()
//   Object.defineProperty(obj, key, {
//     enumerable: true,
//     configurable: true,
//     get() {
//       dep.addSub(Dep.target)
//       return val
//     },
//     set(newVal) {
//       if (val === newVal) return
//       dep.notify()
//     }
//   })
// }

// function observer(value) {
//   if (!isObject(value)) return
//   Object.keys(value).forEach(key => {
//     defineReactive(value, key, value[key])
//   })
// }

// class Mvvm {
//   constructor(options) {
//     this._data = options.data
//     observer(this._data)
//     new Watcher()

//     console.log('渲染了', this._data.test)
//   }
// }

// class Dep {
//   constructor() {
//     this.subs = []
//   }

//   addSub(sub) {
//     this.subs.push(sub)
//   }

//   notify() {
//     this.subs.forEach(sub => {
//       sub.update && sub.update()
//     })
//   }
// }

// Dep.target = null

// class Watcher {
//   constructor() {
//     Dep.target = this
//   }

//   update() {
//     console.log('视图更新了')
//   }
// }

// class VNode {
//   constructor(tag, data, children, text, elm) {
//     this.tag = tag
//     this.data = data
//     this.children = children
//     this.text = text
//     this.elm = elm
//   }
// }

// const vm = new Mvvm({
//   data: {
//     test: 1
//   }
// })

// vm._data.test = 2

function isObject(value) {
  return typeof value !== null && typeof value === 'object'
}

class MVVM {
  constructor(options) {
    this._data = options.data
    observe(this._data)
    new Watcher()
    
    this.render()
  }

  render() {
    console.log('render', this._data.test)
  }
}

function observe(value) {
  if (!isObject(value)) return

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key])
  })
}

function defineReactive(obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.addSub(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal === val) return
      dep.notify()
    }
  })
}

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update && sub.update()
    })
  }
}

Dep.target = null

class Watcher {
  constructor() {
    Dep.target = this
  }

  update() {
    console.log('view update')
  }
}

const vm = new MVVM({
  data: {
    test: 1
  }
})

vm._data.test = 2
