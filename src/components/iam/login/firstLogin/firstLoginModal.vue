<template>
  <el-dialog
    width="450px"
    @close="close"
    title="绑定手机号-首次登录"
    :visible="visible"
    append-to-body
    id="First_Login_Dialog">
    <div class="First_Login_Body">
      <!--首页-->
      <div class="firstPage" v-show="currentView === 1">
        <div class="tips">验证码将会发送至您的手机</div>
        <div class="formArea">
          <el-form :model="form" :rules="sendRules" ref="sendForm">
            <el-form-item prop="telephone">
              <el-input v-model="form.telephone" placeholder="请输入手机号码" clearable></el-input>
            </el-form-item>
            <el-form-item class="reset-form-btn">
              <el-button type="primary" @click="getValidCode">获取验证码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--下一页-->
      <div class="nextPage" v-show="currentView === 2">
        <div class="tips">已发送验证码至您的账号({{form.telephone}})</div>
        <div class="formArea">
          <el-form :model="form" :rules="resetRules" ref="resetForm">
            <el-form-item prop="validCode">
              <div class="warp">
                <el-input style="width:260px;" v-model="form.validCode" type="text" placeholder="请输入手机验证码" clearable></el-input>
                <el-button :disabled="!isSendFlag" @click="getValidCode">{{verText}}</el-button>
              </div>
            </el-form-item>
            <el-form-item prop="originalPassword">
              <el-input v-model="form.originalPassword" type="password" placeholder="请输入旧密码" clearable></el-input>
            </el-form-item>
            <el-form-item prop="newPassword">
              <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" clearable></el-input>
            </el-form-item>
            <el-form-item class="reset-form-btn">
              <el-button type="primary" @click="updatePwd">修改密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--模态弹框头部-->
    <span slot="title" v-if="currentView === 2" class="dialogTitle">
      <button @click="back" type="button" class="dialogTitleBtn">
        <i class="el-dialog__close el-icon el-icon-back"></i>
      </button>
      <span class="elDialogTitle">修改密码</span>
    </span>
  </el-dialog>
</template>
<script>
import {sha256} from 'js-sha256'
import {getTelephoneCode, modifyPwdAndBindTelephone, loginIn} from '../proxy'
import {validatePhone, validateCode, validatePwd} from '../../../../libs/validate'
export default {
  name: 'FirstLogin',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    account: { // 用户名
      type: String,
      default: ''
    }
  },
  watch: {
    visible (val) { // 打开重置密码框后重置数据
      if (val) {
        this.$nextTick(() => {
          this.currentView = 1
          this.$refs.sendForm.resetFields()
          this.$refs.resetForm.resetFields()
        })
      }
    },
    account (val) {
      this.form.account = val
    }
  },
  data () {
    return {
      verText: '获取验证码', // 验证码
      isSendFlag: true, // 发送验证码标识
      timer: null,
      currentView: 1, // 当前视图
      form: {
        validCode: '', // 验证码
        newPassword: '', // 新密码
        originalPassword: '', // 原始密码
        telephone: '', // 手机号
        account: '' // 用户名
      },
      sendRules: {
        telephone: [
          {
            required: true,
            validator: validatePhone,
            trigger: 'blur'
          }
        ]
      },
      resetRules: {
        validCode: [
          {
            required: true,
            validator: validateCode,
            trigger: 'blur'
          }
        ],
        originalPassword: [
          {
            required: true,
            validator: validatePwd,
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validatePwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    getValidCode () { // 获取验证码
      this.$refs.sendForm.validate((valid) => {
        if (valid) {
          getTelephoneCode({telephone: this.form.telephone}).then((res) => {
            if (res.code * 1 === 0) {
              this.currentView = 2
              this.$nextTick(() => {
                this.$refs.resetForm.resetFields()
                this.form.validCode = res.data
              })
              if (!this.timer) {
                this.startTime()
              }
            }
          })
        } else {
          return false
        }
      })
    },
    startTime () { // 启动计时器
      this.verText = `60s后发送`
      let wait = 59
      this.isSendFlag = false
      this.timer = setInterval(() => {
        if (wait > 0) {
          this.verText = `${wait}s后发送`
          wait--
        } else {
          this.isSendFlag = true
          this.verText = '重新发送'
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    back () { // 返回视图1
      this.currentView = 1
      this.$nextTick(() => {
        this.$refs.sendForm.resetFields()
      })
    },
    updatePwd () { // 绑定手机号并修改密码
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          let params = {
            validCode: this.form.validCode,
            newPassword: sha256(this.form.newPassword),
            originalPassword: sha256(this.form.originalPassword),
            telephone: this.form.telephone,
            account: this.form.account
          }
          modifyPwdAndBindTelephone(params).then((res) => {
            if (res.code * 1 === 0) {
              this.$message.success('绑定手机并修改密码成功')
              this.store.commit('user/clearData')
              this.$nextTick(() => {
                let loginParams = {
                  account: this.form.account,
                  pwd: sha256(this.form.newPassword)
                }
                loginIn(loginParams).then((res) => {
                  if (res.code * 1 === 0) {
                    this.close()
                    this.$router.push('/overview')
                  }
                })
              })
            }
          })
        } else {
          return false
        }
      })
    },
    close () { // 关闭对话框
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss">
  @import "./style.scss";
</style>
