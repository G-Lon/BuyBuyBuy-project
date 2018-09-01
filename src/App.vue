<template>
    <!-- 使用template模板是必须使用一个根节点 -->
    <div>
        <!-- 顶部 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>黑马买买买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <!-- 登录注册 -->
                        <span v-show="!$store.state.isLogin">
                            <!-- <a href="" class="">登录</a> -->
                            <router-link to="/login">登录</router-link>
                            <strong>|</strong>
                            <!-- <a href="" class="">注册</a> -->
                            <router-link to="/register">注册</router-link>
                            <strong>|</strong>
                        </span>
                        <!-- 会员中心 -->
                        <span v-show="$store.state.isLogin">
                            <!-- <a href="" class="">会员中心</a> -->
                            <router-link to="/userCenter">会员中心</router-link>
                            <strong>|</strong>
                            <a @click="logout">退出</a>
                            <strong>|</strong>
                        </span>
                        <router-link to="/cart">
                            <i class="iconfont icon-cart"></i>购物车(
                            <span id="shoppingCartCount">
                                <span>{{$store.getters.cartCount}}</span>
                            </span>)
                        </router-link>

                    </div>
                </div>
            </div>

            <!-- 2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <router-link to="/index">
                                    <span class="out" style="top: 0px;">首页</span>
                                </router-link>

                            </li>
                            <li class="news">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">每日精选</span>
                                </a>
                            </li>
                            <li class="photo">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">秒杀专区</span>
                                </a>
                            </li>
                            <li class="video">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">黑马超市</span>
                                </a>
                            </li>
                            <li class="down">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">会员权益</span>
                                </a>
                            </li>
                            <li class="goods">
                                <a href="" class=" ">
                                    <span class="out" style="top: 0px;">购物商城</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 路由出口 -->
        <router-view></router-view>

        <!-- 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 点击退出弹出模态框 -->
        <Modal v-model="isShow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>退出确认</span>
            </p>
            <div style="text-align:center">
                <p>你确定你要退出吗</p>
            </div>
            <div slot="footer" style="display:flex;justify-content: space-around">
                <Button type="warning" size="large" @click="isShow=false">取消</Button>
                <Button type="success" size="large" @click="logout">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: "app",
  // 数据
  data: function() {
    return {
      isShow: false
    };
  },
  // 方法
  methods: {
    logout() {
      // 模态框隐藏
      this.isShow = false;
      // 显示提示信息
      this.$Message.success("你已退出，将返回到首页");
      this.$axios.get("site/account/logout").then(response => {
        // console.log(response);
        if (response.data.status == 0) {
          // 改变登录状态
          this.$store.commit("changeLoginStatus", false);
          this.$router.push("/index");
        }
      });
    }
  }
};
// 引入jQuery包
import $ from "jquery";

// 导航条的效果
$(document).ready(function() {
  $("#menu2 li a").wrapInner('<span class="out"></span>');
  $("#menu2 li a").each(function() {
    $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
  });

  $("#menu2 li a").hover(
    function() {
      $(".out", this)
        .stop()
        .animate({ top: "48px" }, 300); // move down - hide
      $(".over", this)
        .stop()
        .animate({ top: "0px" }, 300); // move down - show
    },
    function() {
      $(".out", this)
        .stop()
        .animate({ top: "0px" }, 300); // move up - show
      $(".over", this)
        .stop()
        .animate({ top: "-48px" }, 300); // move up - hide
    }
  );
});
</script>

<style lang="less">
    
/* 引入 头部底部的CSS 样式 */
@import url("./assets/statics/site/css/style.css");

/* 引入导航的CSS样式*/
@import url("./assets/lib/css/style.css");

/* 覆盖样式*/
#menu2 {
  background-image: none;
}

.search-box {
    .input-box {
        >input {
            outline: none;
        }
    }
}
</style>
