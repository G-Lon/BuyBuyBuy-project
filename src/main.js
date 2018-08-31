import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

// 引入路由
import VueRouter from 'vue-router';

// 注册VueRouter
Vue.use(VueRouter)

// 导入VueX
import Vuex from 'vuex'
// 注册VueX
Vue.use(Vuex)

// 引入axios，并添加到Vue原型中，成为一个全局
import axios from 'axios';
// 抽取axios的基地址
axios.defaults.baseURL = "http://47.106.148.205:8899";
//让ajax携带cookie
axios.defaults.withCredentials = true;
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
import GoodsInfo from './components/goodsinfo.vue';
// 引入商品购物车组件
import Cart from './components/cart.vue';
// 引入登录组件
import Login from './components/login.vue';
// 引入订单组件
import Order from './components/order.vue';

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

// 实例化store仓库
const store = new Vuex.Store({
  // 数据
  state: {
    cartData: JSON.parse(window.localStorage.getItem('cartInfo')) || {},
    isLogin: false
  },
  // 暴露的的改变方法
  mutations: {
    // 增加数据方法
    cartAdd(state, goodInfo) {
      // 查看购物车中是否存在该商品
      if (state.cartData[goodInfo.goodId] == undefined) {
        // 没有就把数据存进去，
        // vuex当需要在对象中添加新属性时，要使用Vue.set
        Vue.set(state.cartData, goodInfo.goodId, goodInfo.goodNum);
      } else {
        // 如果有，那么就读取数商品对应的数据加上变化的的数据
        state.cartData[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
    // 数据更新方法
    updateGoodsNum(state, goodInfo) {
      state.cartData[goodInfo.goodId] = goodInfo.goodNum
    },
    // 删除数据的方法
    deleteGoods(state, goodId) {
      Vue.delete(state.cartData, goodId);
    },
    // 改变登录状态
    changeLoginStatus(state, isLogin) {
      state.isLogin = isLogin
    }
  },
  // 计算属性
  getters: {
    cartCount: state => {
      let num = 0;
      if (!state.isLogin) {
        num = 0;
      } else {
        for (const key in state.cartData) {
          num += state.cartData[key]
        }
      }

      return num
    }
  }
})

// 浏览器关闭时将数据保存到 localStorage
window.onbeforeunload = function () {
  window.localStorage.setItem('cartInfo', JSON.stringify(store.state.cartData))
}

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
  // 商品购物车路由
  {
    path: '/cart',
    component: Cart
  },
  // 登录路由
  {
    path: '/login',
    component: Login
  },
  // 订单路由
  {
    path: '/order/:id',
    component: Order
  }

]

// 实例化路由对象
let router = new VueRouter({
  routes
});


// 增加导航守卫
router.beforeEach((to, from, next) => {
  // 判断要跳转的地址是不是order
  if (to.path.indexOf('/order/') != -1 || to.path.indexOf('/cart/') != -1) {
    // 如果是就要先判断是否登录
    axios.get('/site/account/islogin').then(response => {
      if (response.data.code == 'nologin') {
        // 如果没登录，就去登录页面
        next('/login')
      } else {
        // 已经登录就继续执行
        next()
      }
    })
  } else(
    next()
  )
})

// 实例化Vue
new Vue({
  render: h => h(App),
  router,
  store,
  // 生命周期函数
  beforeCreate() {
    // 登录状态保持
    axios.get('site/account/islogin').then(response => {
      if (response.data.code == 'logined') {
        store.state.isLogin = true;
      }
    })
  }
}).$mount('#app')