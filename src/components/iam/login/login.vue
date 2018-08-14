<template>
  <div id="Login">
    <!--页头-->
    <header id="header">
      <div class="inner">
        <div class="web-logo">
          <a href="/">优乐商城</a>
        </div>
      </div>
    </header>
    <!--登录表单-->
    <section id="loginBody">
      <div class="inner">
        <div class="title">账号登录</div>
        <div class="body">
          <div id="loginForm">
            <div class="condition">
              验证身份后进行登录
            </div>
            <div class="forByPhoneDes">
              如果手机停用或原先手机号不能正常使用，请进入<a href="/linkUs" target="_blank" class="linkUs">联系我们</a>页面联系我们客服人员。
            </div>
            <div class="forget">
              <router-link to="/forgetPwd">忘记密码</router-link>
            </div>
            <!--form表单-->
            <div class="form">
              <el-form ref="form" :rules="rules" :model="form">
                <el-form-item prop="account">
                  <el-input v-model="form.account" placeholder="请输入账户名" clearable></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                  <el-input @keyup.enter.native = "submit" v-model="form.pwd" placeholder="输入新密码" type="password" clearable></el-input>
                </el-form-item>
                <el-form-item >
                  <div class="remember">
                    <el-checkbox v-model="form.checked"></el-checkbox>
                    <span>我已同意<a href="/userBook" target="_blank" class="userBook">《优乐商城用户协议》</a></span>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <!--提交 disabled-->
            <div id="inputArea">
              <div class="submit">
                <el-button @click="submit">登录</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--页脚-->
    <section id="customerFooter">
      <div class="inner">
        <div class="warrant-area">
          <p class="lItem">
            <a class="rule" href="/userBook" target="_blank">优乐帐号用户协议</a>
            <em class="foot_em">|</em>
            <a class="rule" href="/aboutUs" target="_blank">关于优乐帐号与隐私的声明</a>
            <span class="foot_em">
              <em style="font-style: normal">|</em>
              <a style="padding:0 10px;" href="/linkUs" target="blank">联系我们</a>
            </span>
          </p>
          <p class="lItem" style="margin-top:10px ">
            Copyright&nbsp;©&nbsp;2011-2018&nbsp;&nbsp;南京优乐校园电子商务有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;保留一切权利&nbsp;&nbsp;苏B2-20070200号&nbsp;|&nbsp;
            苏ICP备09062682号-9
          </p>
        </div>
      </div>
    </section>
    <!--首次登陆-->
    <first-login-modal :account.sync = "form.account" :visible.sync="isFirstLogin"></first-login-modal>>
  </div>
</template>
<script>
import {sha256} from 'js-sha256'
import {loginIn} from './proxy'
import {validateAccount, validatePwd} from '../../../libs/validate'
import firstLoginModal from './firstLogin/firstLoginModal'
import LAN from '@/libs/il8n'
export default {
  name: 'login',
  components: {
    firstLoginModal
  },
  data () {
    return {
      LAN: LAN.login,
      isFirstLogin: false, // 是否是首次登陆
      form: {
        account: '', // 账号
        pwd: '', // 密码
        checked: true // 是否同意优乐用户协议
      },
      rules: {
        account: [
          {
            validator: validateAccount,
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            validator: validatePwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    submit () {
      /*
      * 二个方面的功能后期需要追加处理-目前阶段一切从简
      * 1：账号或密码错误三次出现验证码
      * 2：对有人登录账号的情形需提示强制登录
      * */
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            account: this.form.account,
            pwd: sha256(this.form.pwd)
          }
          loginIn(params).then((res) => {
            if (res.code * 1 === 0) {
              if (res.data.isFristLogin) {
                this.isFirstLogin = true
              } else {
                this.$router.push('/overview')
              }
            }
          }).catch(() => { // 重置登录表单
            this.$refs.form.resetFields()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  #Login {
    .el-input__inner{
      background-color: #f7f7f7;
      border: none;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
    }
  }
</style>
