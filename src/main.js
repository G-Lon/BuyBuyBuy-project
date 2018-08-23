import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

// 引入路由
import VueRouter from 'vue-router';

// 注册VueRouter
Vue.use(VueRouter)

// 引入组件
import Index from './components/index.vue';


// 定义路由
let routes = [
  // 使用重定向vue-router
  // {
  //   path:'/',
  //   redirect:'/index'
  // },
  {
    path:'/',
    component:Index
  },
  {
    path:'/index',
    component:Index
  }
]

// 实例化路由对象
let router = new VueRouter({
  routes
})

// 
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
