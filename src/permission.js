import router from '@/router'
import store from '@/store'
// created() {
//   this.$store.dispatch('user/getUserInfo')
// },
// 1,判断token是否存在
// 1.1存在 处于 登录状态是否去往登录页处于则去首页否则放行
// 1.2不存在 不处于 登录状态是否处于白名单处于则放行否则登录页
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    // 只要一有token就调用用户信息
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') { // token是否存在
      next('./')// 存在跳去首页
    } else {
      next() // 不存在留在当前页
    }
  } else { // 没登陆
    if (whiteList.includes(to.path)) { // 是否在白名单
      next() // 在就让他去
    } else {
      next('/login') // 不在就让他去登陆
    }
  }
})
