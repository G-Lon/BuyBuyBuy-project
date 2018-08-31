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
                                <li class="active">
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
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <div class="form-box address-info">
                                    <el-form-item style="width:500px" label="收货人姓名:" prop="accept_name">
                                        <el-input style="width:500px" v-model="ruleForm.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区:" prop="area">
                                        <v-distpicker @selected="selected" :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址:" prop="address">
                                        <el-input style="width:500px" v-model="ruleForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码:" prop="mobile">
                                        <el-input style="width:500px" v-model="ruleForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话:" prop="phone">
                                        <el-input style="width:500px" v-model="ruleForm.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱:" prop="email">
                                        <el-input style="width:500px" v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码:" prop="post_code">
                                        <el-input style="width:200px" v-model="ruleForm.post_code"></el-input>
                                    </el-form-item>
                                </div>

                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                        <span style="color:#666">手续费:0.00元</span>
                                        <!-- <label>
                                        <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                                        <input name="payment_price" type="hidden" value="0.00">在线支付
                                        <em>手续费：0.00元</em>
                                    </label> -->
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio-group v-model=" ruleForm.express_id">
                                            <el-radio @change="expressChange(20)" label="1">顺丰快递</el-radio>
                                            <el-radio @change="expressChange(15)" label="2">中通快递</el-radio>
                                            <el-radio @change="expressChange(10)" label="3">EMS快递</el-radio>
                                        </el-radio-group>
                                        <!-- <label>
                                        <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                        <input name="express_price" type="hidden" value="20.00">顺丰快递
                                        <em>费用：20.00元</em>
                                        <span class="Validform_checktip"></span>
                                    </label> -->
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <!-- 商品订单信息 -->
                                        <tr v-for="item in goodsList" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price * item.buycount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注:" prop="message">
                                                <el-input style="width:300px" rows="3" type="textarea" resize="none" v-model="ruleForm.message" placeholder="100字以内"></el-input>
                                            </el-form-item>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{ruleForm.goodsAmount + ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/cart">返回购物车</router-link>
                                            <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                            <a @click="submit" id="btnSubmit" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入distpicker 省市级联动
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  // 省市级联动组件
  components: { VDistpicker },
  // 数据
  data: function() {
    //   自定义验证
    //  验证手机号
    var checkMobile = (rule, value, callback) => {
      //   console.log(rule);
      //   console.log(value);
      let exep = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // 正则测试方法  正则条件.test(要测试的数据)
      // 判断是否符合正则条件，符合就返回
      if (exep.test(value) == true) {
        callback();
      } else {
        // 不符合正则条件就爆出错误
        callback(new Error("请输入正确的手机号码格式"));
      }

      // setTimeout(() => {}, 1000);
    };

    // 验证邮箱
    var checkEmail = (rule, value, callback) => {
      let exep = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (exep.test(value) == true) {
        callback();
      } else {
        callback(new Error("你输入的邮箱格式不正确"));
      }
    };

    // 验证邮编
    var checkPostCode = (rule, value, callback) => {
      let exep = /^[1-9]\d{5}(?!\d)$/;
      if (exep.test(value) == true) {
        callback();
      } else {
        callback(new Error("你输入的邮编格式不正确"));
      }
    };
    return {
      goodsList: [],
      ruleForm: {
        accept_name: "", // 收货人姓名
        area: {
          province: { code: 110000, value: "北京市" },
          city: { code: 110000, value: "北京城区" },
          area: { code: 110001, value: "东城区" }
        },
        address: "", // 收货地址
        mobile: "", // 手机号码
        phone: "", // 联系电话
        email: "", // 邮箱
        post_code: "", // 邮编
        payment_id: "6", // 支付方式
        express_id: "1", // 快递方式
        expressMoment: 20, // 运费
        goodsAmount: "", // 商品总价
        message: "", // 商品备注
        goodsids: "", // 购买的商品的id
        cargoodsobj: "" // 购物车的商品信息
      },
      // 验证规则
      rules: {
        // 收货人姓名
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        // 收货地址
        address: [
          {
            required: true,
            message: "请输入收货人的详细地址",
            trigger: "blur"
          },
          { min: 1, max: 200, trigger: "blur" }
        ],
        // 手机号码
        mobile: [{ required: true, validator: checkMobile, trigger: "blur" }],
        // 邮箱
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        // 邮编
        post_code: [
          { required: true, validator: checkPostCode, trigger: "blur" }
        ]
      }
    };
  },
  // 方法
  methods: {
    // 点击省市级联动后记录最后的选定状态
    selected(value) {
      // console.log(value);
      // 将选定的省市区的数据给reluForm的area
      this.ruleForm.area = value;
    },
    // 快递方式改变运费改变
    expressChange(price) {
      this.ruleForm.expressMoment = price;
    },

    // 确认提交
    submit() {
      this.$axios
        .post("site/validate/order/setorder", this.ruleForm)
        .then(response => {
          // console.log(response);
          let orderid = response.data.message.orderid;

          // 去支付页
          this.$router.push("/payOrder/" + orderid);

          this.goodsList.forEach(v=>{
              this.$store.commit('deleteGoods',v.id)
          })
        });
    }
  },
  // 生命周期函数
  created() {
    // console.log(this.$store.state.cartData);
    // console.log(this.$route.params.id);
    let ids = this.$route.params.id;
    this.ruleForm.goodsids = ids;
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      //
      let cargoodsobj = {};
      response.data.message.forEach(v => {
        // for (const key in this.$store.state.cartData) {
        //   //  console.log(this.$store.state.cartData[key]);
        //   if (v.id == key) {
        //     v.buycount = this.$store.state.cartData[key];
        //   }
        // }
        v.buycount = this.$store.state.cartData[v.id];

        // 将数据给到对象里
        cargoodsobj[v.id] = v.buycount;
      });
      this.ruleForm.cargoodsobj = cargoodsobj;
      // console.log(response.data.message);
      this.goodsList = response.data.message;
    });
  },
  // 计算属性
  computed: {
    // 总数量
    totalCount() {
      let totalCount = 0;
      this.goodsList.forEach(v => {
        totalCount += v.buycount;
      });
      return totalCount;
    },
    // 总金额
    totalPrice() {
      let totalPrice = 0;
      this.goodsList.forEach(v => {
        totalPrice += v.buycount * v.sell_price;
      });
      this.ruleForm.goodsAmount = totalPrice;
      return totalPrice;
    }
  }
};
</script>

<style lang="less">
</style>

