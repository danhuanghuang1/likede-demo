import Vue from 'vue'

Vue.directive('imgerror', imgerror)

export const imgerror = {
// 什么时候去换图片地址
// 图片加载失败会触发img的onerror事件
  inserted(el, binding, vnode) {
    // el dom
    // console.log(el)
    // binding当前指令的相关信息
    // console.log(binding)
    // vnode虚拟节点
    // console.log(vnode)
    el.onerror = function() {
      el.src = binding.value
    }
  } }
