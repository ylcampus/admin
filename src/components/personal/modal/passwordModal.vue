<template>
  <el-dialog
    title="修改密码"
    :visible="visible"
    width="450px"
    @close="close"
    :close-on-click-modal="false"
    id="Modify_Pwd_Dialog">
    <div class="pwdModal">
      <el-form
        :model="form"
        :rules="modifyPwdRules"
        ref="modifyPwdForm"
        label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input placeholder="旧密码" type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input placeholder="新密码" type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input placeholder="确认密码" type="password" v-model="form.confirmPwd" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item class="modify-form-btn">
          <el-button type="primary" @click="submit">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import {modifyPwd, loginOut} from '../proxy'
import {validatePwd} from '../../../libs/validate'
import {sha256} from 'js-sha256'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.modifyPwdForm.resetFields()
        })
      }
    }
  },
  data () {
    // 确认密码验证
    let validateConfirmPwd = (rule, value, callback) => {
      if (
        !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{8,20}$/.test(value)
      ) {
        callback(new Error('包含数字，字母及特殊字符且8到12位'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPwd: ''
      },
      modifyPwdRules: {
        oldPassword: [
          {
            validator: validatePwd,
            trigger: 'blur'
          }
        ],
        newPassword: [
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
  mounted () {},
  methods: {
    submit () { // 修改密码
      this.$refs.modifyPwdForm.validate((valid) => {
        if (valid) {
          let params = {
            oldPassword: sha256(this.form.oldPassword),
            newPassword: sha256(this.form.newPassword),
            confirmPwd: sha256(this.form.confirmPwd)
          }
          modifyPwd(params).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.$message.success('已成功修改密码，请重新登录')
              loginOut().then((res) => {
                if (res.code * 1 === 0) {
                  this.close()
                  this.$router.push('/login')
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    close () { // 关闭弹窗
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="scss">
  .pwdModal{
    width:400px;
    .modify-form-btn{
      text-align: right;
    }
  }
</style>
