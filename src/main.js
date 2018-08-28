import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

// 引入路由
import VueRouter from 'vue-router';

// 注册VueRouter
Vue.use(VueRouter)


// 引入axios，并添加到Vue原型中，成为一个全局
import axios from 'axios';
// 抽取axios的基地址
axios.defaults.baseURL = "http://47.106.148.205:8899";
// 加入到Vue原型中
Vue.prototype.$axios = axios;


// 引入element-ui
import ElementUI from 'element-ui';
// 注册element-ui
Vue.use(ElementUI);


// 引入VueLazyload
import VueLazyload from 'vue-lazyload';
// 注册VueLazyload
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 错误提示
  // error: 'dist/error.png',
  // 给loading时需要使用模块引入
  loading: require('./assets/img/loading.gif'),
  attempt: 1
});


// 引入iview
import iView from 'iview';
// 引入iview的样式
import 'iview/dist/styles/iview.css';
// 注册iview
Vue.use(iView)
// 引入element-ui的样式 
import 'element-ui/lib/theme-chalk/index.css';


// 引入首页组件
import Index from './components/index.vue';
// 引入商品信息组件
import GoodsInfo from './components/goodsinfo.vue'

// 引入moment.js 
import moment from 'moment';


// 引入放大镜vue zoom
import ProductZoomer from 'vue-product-zoomer';
// 注册ProductZoomer
Vue.use(ProductZoomer)

// 定义全局过滤器
Vue.filter('capitalize', function (value) {
  return moment(value).format("YYYY年MM月DD日");
})

// 定义路由
let routes = [
  // 使用重定向vue-router
  // {
  //   path:'/',
  //   redirect:'/index'
  // },
  // 默认路由
  {
    path: '/',
    component: Index
  },
  // 首页路由
  {
    path: '/index',
    component: Index
  },
  // 商品详情路由
  {
    path: '/site/goodsinfo/:id',
    component: GoodsInfo
  },

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