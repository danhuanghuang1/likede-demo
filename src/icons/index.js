import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
// require.context 这个方法有 3 个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。
const req = require.context('./svg', false, /\.svg$/)
// req 函数==>根据路径对应的模块导入进来
// 函数keys属性 =》方法 =》 数组
// console.log(req.keys())// 返回的是一个数组，内容为所有符合路径的数组
// console.log(req('./dashboard.svg'));
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
console.log(requireAll(req))
