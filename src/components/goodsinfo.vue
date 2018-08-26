<template>
    <div>
        <!-- 路径导航开始 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <!-- 路径导航结束 -->

        <!-- 商品详情开始 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">

                        <!-- 商品信息开始 -->
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- vue2.0zoom放大镜 -->
                                <!-- <el-carousel indicator-position="outside" trigger="click" height="327.8px" arrow="never">
                                    <el-carousel-item v-for="item in imglist" :key="item.id">
                                        <img-zoom :src="item.original_path" width="450" height="250" bigsrc="img-big.jpg" :configs="configs"></img-zoom>
                                    </el-carousel-item>
                                </el-carousel> -->

                                <ProductZoomer v-if="images.normal_size!=0" :base-images="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.value}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" size="mini" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <!-- 商品信息结束 -->

                        <!-- 商品评论开始 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- Affix 吸顶效果 -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=false" :class="{selected:showDiscuss==false}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss==true}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div class="tab-content entry" v-show="showDiscuss==false" v-html="goodsinfo.content">

                            </div>
                            <div class="tab-content" v-show="showDiscuss==true">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | capitalize}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 评论分页 -->
                                        <Page :total="totalCount" show-sizer show-elevator placement="top" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 商品信息结束 -->
                    </div>

                    <!-- 热销商品推荐开始 -->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/site/goodsinfo/' + item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/site/goodsinfo/' + item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | capitalize}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 热销商品推荐结束 -->
                </div>
            </div>
        </div>
        <!-- 商品详情结束 -->

        <!-- 返回顶部 -->
        <BackTop></BackTop>
    </div>
</template>


<script>
// 引入axios发送请求以获取数据
import axios from "axios";

// vue2.0-zoom放大镜效果
// import imgZoom from "vue2.0-zoom";

// 要暴露出去的内容
export default {
  name: "goods",
  // 数据
  data: function() {
    return {
      goodsinfo: {}, // 商品信息
      hotgoodslist: [], //  热销商品推荐
      imglist: [], // 图片
      productId: undefined, // 商品id
      commentlist: [], // 评论
      buyCount: 0, // 购买数量
      showDiscuss: false,
      pageSize: 1, // 页码
      pageCount: 5, // 页容量
      totalCount: 0, // 总页数
      images: {
        // 放大镜图片
        normal_size: [
          // required
        ]
      },
      zoomerOptions: {
        zoomFactor: 2,
        pane: "container-round",
        hoverDelay: 200,
        namespace: "container-zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#ff3d00"
      }
      //   Vue2.0 Zoom
      //   configs: {
      //     width: 650,
      //     height: 350,
      //     maskWidth: 100,
      //     maskHeight: 100,
      //     maskColor: "rgba(200,200,200,0.9)",
      //     maskOpacity: 0.2
      //   }
    };
  },

  // 时间方法
  methods: {
    //   轮播图切换效果
    handleChange() {},

    // 封装数据请求方法
    getGoodsInfo() {
      //   console.log(this.$route.params.id) // 获取到的是路由传递过来的id的值
      this.productId = this.$route.params.id;
      // console.log(id);

      // 商品详情数据
      axios
        .get(
          `http://47.106.148.205:8899/site/goods/getgoodsinfo/${this.productId}`
        )
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          // console.log(this.goodsinfo);
          // console.log(this.hotgoodslist);

          let temArr = [];
          this.imglist.forEach(element => {
            temArr.push({
              id: element.id,
              url: element.original_path
            });
          });

          this.images.normal_size = temArr;
          //   console.log(this.images.normal_size);
        });

      // 商品评论数据
      axios
        .get(
          `http://47.106.148.205:8899/site/comment/getbypage/goods/${
            this.productId
          }?pageIndex=${this.pageSize}&pageSize=${this.pageCount}`
        )
        .then(response => {
          console.log(response);
          this.commentlist = response.data.message;
          this.totalCount = response.data.totalcount;
        });
    }
  },
  created() {
    //  调用数据请求方法
    this.getGoodsInfo();
  },

  // watch 监视
  watch: {
    $route: {
      handler: function(val) {
        // this.productId = val.params.id;
        // console.log(this.productId);
        // 监视路由发生改变时调用请求数据方法
        this.images.normal_size = [];
        this.getGoodsInfo();
      },
      deep: true
      //   immediate: true
    }
  }

  // vue2.0-zoom放大镜的组件
  //   components: {
  //     imgZoom
  //   }
};
</script>

<style lang="less">
.tab-content img {
  width: 100%;
  display: block;
}

.pic-box {
  width: 395px;
  .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .control {
    display: flex;
    justify-content: center;
  }
}
</style>
