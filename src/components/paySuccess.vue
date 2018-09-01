<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="goodsinfo routeanimate">
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
                                    <div class="msg-tips">
                                        <div class="icon">
                                            <i class="iconfont icon-check"></i>
                                        </div>
                                        <div class="info">
                                            <strong>订单已支付成功！</strong>
                                            <span>
                                                <i style="font-size:24px;color:red">{{time}}</i>
                                                <span>秒后进入到订单详情页</span>
                                            </span>
                                            <p>您可以点击这里进入
                                                <!-- <a href="/user/center/index.html">会员中心</a> -->
                                                <router-link to="/userCenter">会员中心</router-link>查看订单状态！</p>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
                                    </div>
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
  data: function() {
    return {
      time: 5
    };
  },
  methods: {},
  // 渲染完成之后
  mounted() {
    // 设定一个定时器
    let timeId = setInterval(() => {
      // 时间每一秒自减
      this.time--;
      if (this.time == 0) {
        // 时间等于0的时候清除定时器，跳转到用户中心
        clearInterval(timeId);
        this.$router.push("/orderDetail/"+this.$route.params.id);
      }
    }, 1000);
  }
};
</script>

<style lang="less">
</style>

