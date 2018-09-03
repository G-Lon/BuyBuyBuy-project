<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="item in cartList" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isBuy" style="display: block" active-color="#13ce66" inactive-color="#ccc">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <img :src="item.img_url" alt="" style="width: 50px;">
                                        <span>{{item.title}}</span>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <!-- 计数器 -->
                                    <td width="104" align="center">
                                        <el-input-number @change="buycountChange($event,item.id)" size="mini" :min="1" :max='quantity' v-model="item.bycount"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.bycount * item.sell_price}}
                                        <td width="54" align="center">
                                            <el-button @click="delThis(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                        </td>
                                </tr>
                                <!-- 当购物车没有商品时的显示的内容 -->
                                <tr v-if="cartList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{goodsCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{priceCount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                                <button class="button">继续购物</button>
                            </router-link>

                            <button class="submit" @click="toOrder">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>

</template>


<script>
export default {
  name: "shopCart",
  // 数据
  data: function() {
    return {
      cartList: [],
      quantity: 0
    };
  },
  // 方法
  methods: {
    buycountChange(num, id) {
      //   console.log(num);
      // 当数据改变时，store仓库的数据也要发生改变
      // 调用仓库
      this.$store.commit("updateGoodsNum", { goodId: id, goodNum: num });
    },
    delThis(id) {
      this.$store.commit(
        "deleteGoods",
        this.cartList.forEach((v, i) => {
          if (v.id == id) {
            this.cartList.splice(i, 1);
          }
        })
      );
    },
    // 点击结算
    toOrder() {
      // console.log(this.priceCount);
      // 判断是否已选择商品
      if (this.priceCount <= 0) {
        this.$Message.error("你家有钱啊，不要东西就给钱！");
        return;
      }

      // 选择了商品就跳转到order页面
      let ids = "";
      this.cartList.forEach(v => {
        if (v.isBuy) {
          ids += v.id;
          ids += ",";
        }
      });
      ids = ids.slice(0, -1);
      this.$router.push(`/order/${ids}`);

      //   // 判断是否已经登录
      //   this.$axios("site/account/islogin").then(response => {
      //     // console.log(response);
      //     if (response.data.code == "nologin") {
      //       // 未登录就跳转到登录页面
      //       // 页面跳转需要使用到路由的
      //       this.$router.push("/login");
      //     } else {
      //       // 登录了就跳转到结算页面
      //       this.$router.push("/order");
      //     }
      //   });
    }
  },
  // 生命周期函数
  created() {
    // 通过在全局的$store库来获取购物车的商品信息
    // console.log(this.$store.state.cartData);
    let cartData = this.$store.state.cartData;
    let ids = "";
    for (const key in this.$store.state.cartData) {
      ids += key;
      ids += ",";
    }
    ids = ids.slice(0, -1);
    // 根据id请求数据
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      response.data.message.forEach(v => {
        // console.log(v);
        v.bycount = cartData[v.id];
        v.isBuy = false;

        //  再次获取到商品id调用接口，获取该商品的库存量
        this.$axios.get(`site/goods/getgoodsinfo/${v.id}`).then(response => {
          // console.log(response);
          this.quantity = response.data.message.goodsinfo.stock_quantity;
        });
      });
      //   console.log(response.data.message);
      this.cartList = response.data.message;
    });
  },
  // 计算属性
  computed: {
    goodsCount() {
      let totalCount = 0;
      this.cartList.forEach(v => {
        if (v.isBuy) {
          totalCount += v.bycount;
        }
      });
      return totalCount;
    },
    priceCount() {
      let totalPrice = 0;
      this.cartList.forEach(v => {
        if (v.isBuy) {
          totalPrice += v.bycount * v.sell_price;
        }
      });
      return totalPrice;
    }
  }
};
</script>

<style lang="less">
</style>

