import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import util from '@/commons/util'

// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element-variables.scss'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((request) => {
  store.commit('enableLoading')
  request.headers['X-Requested-With'] = 'XMLHttpRequest'
  if (request.method === 'post' && request.headers['Content-Type'] === 'multipart/form-data') {
    request.data = util.parseFileForm(request.data)
  } else if (request.method === 'post' && !request.headers['Content-Type']) {
    request.data = util.parseParams(request.data)
  } else if (request.method === 'get') {
    request.params = util.parseParams(request.params)
  }
  return request
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  store.commit('disableLoading')
  const data = response.data
  if (data && data.code) {
    if (data.code === -1) {
      // 未登陆 进行路由跳转
      router.push('/login')
    }
  }
  return data
  // 每个ajax返回的都是正常的服务， 在请求处理的时候不需要再做判断
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    Vue.prototype.$message({
      message: '发生[' + err.response.status + ']错误：' + err.response.data.message,
      type: 'error'
    })
  }
  store.commit('disableLoading')
  return Promise.reject(err)
})

// 阻断路由
router.beforeEach((to, from, next) => {
  // 从session中获取用户
  let user = sessionStorage.getItem('user')
  if (to.path !== '/login') {
    // 当前有用户信息
    document.title = to.name
    if (!user) {
      next('/login')
    }
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
