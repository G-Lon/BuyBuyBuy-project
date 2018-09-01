<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <!-- <a class="selected" href="javascript:;">账户登录</a> -->
                        <router-link to="/login">账户登录</router-link>
                        <i>|</i>
                        <!-- <a href="/register.html">免费注册</a> -->
                        <router-link to="/register">免费注册</router-link>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model.trim="username" placeholder="请输入用户名" autofocus></el-input>
                        <br>
                        <br>
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" @click="login" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods:{
      login(){
          this.$axios.post("site/account/login",{user_name:this.username,password:this.password}).then(response=>{
            //   console.log(response);
              if(response.data.message == "用户名或密码错误"){
                  this.$Message.error(response.data.message)
              }else{
                  this.$store.commit('changeLoginStatus',true)
                //   this.$router.push('/cart')
                // 返回到上一页面
                this.$router.back(-1)
              }
          })
      }
  }
};
</script>

<style lang="less">
</style>


