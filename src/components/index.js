// import PageTolls from '@/components/PageTolls/PageTolls.vue'
// const components = [PageTolls]
import * as directives from '@/directives'
import * as filter from '@/filters'
// 实现组件的动态注册
// require.context()查找路径，参数：路径，是否查找子目录，正则（查找的路径要求）
// console.log(fn.keys()) // 路径
// console.log(fn('./PageTools/index.vue'))
const fn = require.context('./', true, /\.vue$/)

// 一次性导入所有的模块
// fn.keys()=》返回所有模块,对模块进行映射，并返回使用，ele为这个模块
const components = fn.keys().map(ele => {
  return fn(ele)
})
// 根据路径查找模块
// 函数可以自动解析成install
export default (Vue) => {
  components.forEach(ele => {
    // vue.component('组件名字'，'组件对象')
    // 全局组件
    Vue.component(ele.default.name, ele.default)
    // 自定义指令
    Object.keys(directives).forEach((item) => Vue.directive(item, directives[item]))
    // 全局过滤器
    Object.keys(filter).forEach(key => {
      // 注册过滤器。 Vue.filter(过滤器名称, 过滤器方法)
      Vue.filter(key, filter[key])
    })
  })
}

// Vue.use(plugins,参数1，参数2)
// 引入要注册的组件
// 把组件用数组收集起来
// Vue.use(pligin)
// pligin 如果是对象必须要有 install属性 =》会被执行install方法==》第一个参数Vue
// 函数被识别成 install方法=》会被执行  函数第一个参数VUe
// Vue.use({})
// 使用公共组件的时候要用组建的name属性值
