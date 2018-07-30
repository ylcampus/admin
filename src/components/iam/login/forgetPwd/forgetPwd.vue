<template>
  <div id="ForgetPwd">
    <!--页头-->
    <header id="header">
      <div class="inner">
        <div class="web-logo">
          <a href="/">优乐校园</a>
        </div>
      </div>
    </header>
    <!--主体-->
    <section id="pwdBody">
      <div class="inner">
        <div class="title">忘记密码</div>
        <div class="body">
          <!--页面一-->
          <div id="resetByIdFromP1" v-show="currentPage === 1">
            <div class="tips">提示：点击图片可刷新验证码</div>
            <el-form ref="formP1" :rules="forgetSrep1Rules" :model="formP1">
              <el-form-item prop="account">
                <el-input v-model="formP1.account" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item prop="validCode">
                <div class="codeInner">
                  <div class="codeInput">
                    <el-input @keyup.enter.native = "nextStep" v-model="formP1.validCode" placeholder="请输入验证码"></el-input>
                  </div>
                  <div class="validCode" id="validCode" @click="refreshvalidCode"></div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="nextStep">下一步</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--页面二-->
          <div id="resetByIdFromP2"  v-show="currentPage === 2">
            <div class="forByPhoneSubTitle">
              验证身份后设置新密码
            </div>
            <div class="forByPhoneDes">
              如果您有其他设备使用此帐号，设置新密码后需重新登录，以确保正常使用华为服务。
            </div>
            <div class="tel">
              <span class="telphone">{{telTxt}}</span>
              <span v-if="sendFlag" class="forCode" @click="getTelephoneCode">获取验证码</span>
              <span v-if="!sendFlag" class="verText">{{verText}}</span>
            </div>
            <!--form表单-->
            <div class="form">
              <el-form ref="formP2" :rules="forgetSrep2Rules" :model="formP2">
                <el-form-item prop="validCode">
                  <el-input  v-model="formP2.validCode" placeholder="验证码" clearable></el-input>
                </el-form-item>
                <el-form-item prop="newPwd">
                  <el-input type="password" v-model="formP2.newPwd" placeholder="输入新密码" clearable></el-input>
                </el-form-item>
                <el-form-item prop="confirmPwd">
                  <el-input type="password" @keyup.enter.native = "backPwd" v-model="formP2.confirmPwd" placeholder="输入确认密码" clearable></el-input>
                </el-form-item>
              </el-form>
            </div>
            <!--提交-->
            <div id="inputArea">
              <div class="submit">
                <el-button type="primary" @click="backPwd">确定</el-button>
                <el-button @click="cancel">取消</el-button>
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
  </div>
</template>
<script>
import {sha256} from 'js-sha256'
import {getCaptcha, checkAccountMsg, getTelephoneCode, backPwd} from '../proxy'
import {validateAccount, validateCode, validatePwd} from '../../../../libs/validate'
export default {
  name: 'ForgetPwd',
  data () {
    // 确认密码验证
    let validateConfirmPwd = (rule, value, callback) => {
      if (
        !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{8,20}$/.test(value)
      ) {
        callback(new Error('包含数字，字母及特殊字符且8到12位'))
      } else if (value !== this.formP2.newPwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      verText: '获取验证码',
      sendFlag: true,
      currentPage: 1,
      telephone: null,
      telTxt: null,
      formP1: {
        account: '', // 账户名
        validCode: '' // 验证码
      },
      forgetSrep1Rules: {
        account: [
          {
            validator: validateAccount,
            trigger: 'blur'
          }
        ],
        validCode: [
          {
            validator: validateCode,
            trigger: 'blur'
          }
        ]
      },
      formP2: {
        validCode: '', // 手机验证码
        newPwd: '', // 密码
        confirmPwd: '' // 确认密码
      },
      forgetSrep2Rules: {
        validCode: [
          {
            validator: validateCode,
            trigger: 'blur'
          }
        ],
        newPwd: [
          {
            validator: validatePwd,
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          {
            validator: validateConfirmPwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () { // 获取验证码
      getCaptcha().then((res) => {
        if (res.code * 1 === 0) {
          document.getElementById('validCode').innerHTML = res.data.data
        }
      })
    },
    refreshvalidCode () { // 刷新验证码
      this.getCaptcha()
    },
    nextStep () { // 下一步
      this.$refs.formP1.validate((valid) => {
        if (valid) {
          checkAccountMsg(this.formP1).then((res) => {
            if (res.code * 1 === 0) {
              this.currentPage = 2
              let tel = res.data.telephone || ''
              this.telephone = tel
              let arr = []
              arr.push(tel.substr(0, 3))
              arr.push('****')
              arr.push(tel.substr(7))
              this.telTxt = arr.join('')
            }
          }).catch(() => {
            this.formP1.validCode = ''
            this.formP1.account = ''
            this.getCaptcha()
          })
        } else {
          return false
        }
      })
    },
    getTelephoneCode () { // 获取手机验证码
      getTelephoneCode({telephone: this.telephone}).then((res) => {
        if (res.code * 1 === 0) {
          this.formP2.validCode = res.data
          this.startTime()
        }
      })
    },
    backPwd () { // 找回密码
      this.$refs.formP2.validate((valid) => {
        if (valid) {
          if (this.formP2.newPwd !== this.formP2.confirmPwd) {
            this.$message.error('两次密码输入不一致')
          } else {
            let params = {
              validCode: this.formP2.validCode,
              pwd: sha256(this.formP2.newPwd),
              confirmPwd: sha256(this.formP2.confirmPwd)
            }
            backPwd(params).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('修改密码成功')
                this.$nextTick(() => {
                  this.cancel()
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    startTime () { // 启动计时器
      this.verText = `60s后发送`
      let wait = 59
      this.sendFlag = false
      let timer = setInterval(() => {
        if (wait > 0) {
          this.verText = `${wait}s后发送`
          wait--
        } else {
          this.sendFlag = true
          this.verText = '重新发送'
          clearInterval(timer)
        }
      }, 1000)
    },
    cancel () { // 取消操作
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  #ForgetPwd {
    .el-input__inner{
      background-color: #f7f7f7;
      border: none;
      border-radius: 20px;
      height: 40px;
      line-height: 40px;
    }
  }
</style>
