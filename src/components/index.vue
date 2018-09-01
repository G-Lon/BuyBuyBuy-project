<template>
    <div>
        <!-- 路径导航开始 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <!-- /路径导航结束 -->

        <!-- 商品列表开始 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 商品列表导航 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id"> 
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="item in catelist" :key="item.id">{{item.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- /商品列表导航 -->

                    <!--轮播图-->
                    <div class="left-705">
                        <div class="banner-img">
                        <div class="block">
                            <!-- <span class="demonstration">Click 指示器触发</span> -->
                            <el-carousel trigger="click">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="">
                            </el-carousel-item>
                            </el-carousel>
                        </div>

                        </div>
                    </div>
                    <!--/轮播图-->

                    <!-- 热销商品 -->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <!-- 动态生成的元素添加属性时需要绑定 -->
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | capitalize}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- /热销商品 -->
                </div>
            </div>
        </div>
        <!-- 商品列表结束 -->

        <!-- 商品各分类详情开始 -->
        <div class="section" v-for="item in list" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="item in item.datas" :key="item.artID">
                            <!-- <a :href="'#/site/goodsinfo/' + item.artID"  class=""> -->
                            <router-link :to="'/goodsinfo/' + item.artID">
                            <div class="img-box">
                                    <!-- <img :src="item.img_url"> -->
                                    <!-- 使用懒加载 -->
                                    <img v-lazy="item.img_url" alt="">
                                </div>
                                <div class="info">
                                    <h3>{{item.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{item.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{item.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{item.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                                
                            <!-- </a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 商品各分类详情结束 -->
        
    </div>
    
</template>

<script>
// 引入this.$axios,发请求获取数据
// import this.$axios from "this.$axios";

// 引入moment.js,处理时间
// import moment from "moment";

// 要暴露出去的内容
export default {
  name: "index",
  // 数据
  data: function() {
    return {
      catelist: [], // 分类
      sliderlist: [], // 轮播图
      toplist: [], // 热门商品
      list: [], // 商品分类列表
    };
  },

  // 使用Vue的过滤器（管道符） filter
//   filters: {
//     //  对时间格式进行过滤
//     capitalize(value) {
//       return moment(value).format("YYYY年MM月DD日");
//     }
//   },

  //  使用Vue生命周期函数,
  created() {
    // 获取商品列表数据
    this.$axios
      .get("site/goods/gettopdata/goods")
      .then(response => {
        // console.log(response);
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
        //   console.log(this.catelist);
        // console.log(this.sliderlist);
        //   console.log(this.toplist);
      });

    // 获取商品分类数据
    this.$axios
      .get("site/goods/getgoodsgroup")
      .then(response => {
        // console.log(response);
        this.list = response.data.message;
        // console.log(response.data.message);
      });
  }
};
</script>


<style>
.block,
.el-carousel,
.el-carousel__container {
  height: 100%;
}

/* 轮播图的图片样式设置 */
.block img {
  width: 100%;
  height: 100%;
}

/* 调整鼠标悬停上去时左右两个按钮的样式 */
.el-carousel__arrow i {
  color: gray;
  font-size: 20px;
}

.el-carousel__arrow {
  background-color: rgba(200, 200, 200, 0.6);
}
</style>

