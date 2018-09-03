<template>
    <div>
        <div>
            <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="javascript:;">支付中心</a>
                </div>
            </div>

            <div class="section">
                <div class="wrapper">
                    <div class="bg-wrap">
                        <div class="nav-tit pay">
                            <a href="javascript:;" class="selected">支付中心</a>
                        </div>
                        <div class="form-box payment">
                            <div class="el-row" v-for="item in goodsInfo" :key="item.id">
                                <div class="el-col el-col-18">
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>订 单 号：</dt>
                                                <dd>{{item.order_no}}</dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>收货人姓名：</dt>
                                                <dd>{{item.accept_name}}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>送货地址：</dt>
                                                <dd>{{item.area}}
                                                </dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>手机号码：</dt>
                                                <dd>{{item.mobile}}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>支付金额：</dt>
                                                <dd>{{item.order_amount}} 元</dd>
                                            </dl>
                                        </div>
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>支付方式：</dt>
                                                <dd>在线支付</dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="el-row">
                                        <div class="el-col el-col-12">
                                            <dl class="form-group">
                                                <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                <dd>{{item.message}}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div class="el-col el-col-6">
                                    <div id="container2">
                                        <!-- <canvas width="300" height="300"></canvas> -->
                                        <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+ $route.params.orderid" :options="{ size: 200 }"></qrcode>
                                    </div>
                                    <el-button @click="pay" size="mini" type="primary">点我跳转支付</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "payOrder",
  data: function() {
    return {
      goodsInfo: [],
      payStatus: 0
    };
  },
  methods: {
    pay() {
      //   window.open() 在另一个页面打开新网页
      window.open(
        "http://47.106.148.205:8899/site/validate/pay/alipay/" +
          this.$route.params.orderid
      );
    }
  },
  created() {
    this.$axios
      .get(`site/validate/order/getorder/${this.$route.params.orderid}`)
      .then(response => {
        // console.log(response.data.message[0].status);
        this.goodsInfo = response.data.message;
      });

    // 查看订单是否支付
    // 不停的发请求查看支付状态
    this.payStatus = setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${this.$route.params.orderid}`)
        .then(response => {
          //   console.log(response.data.message[0].status);

          // 查看状态码
          if (response.data.message[0].status == 2) {
            this.$Message.success("付款成功，卖家正在处理订单");
            setTimeout(() => {
              this.$router.push("/paySuccess/" + this.$route.params.orderid);
            }, 500);
            clearInterval(this.payStatus);
          } else {
          }
        });
    }, 1000);
  },
  // 生命周期函数，销毁
  destroyed() {
    // console.log("销毁啦+payOrder");
    clearInterval(this.payStatus);
  }
};
</script>

<style lang="less">
</style>
