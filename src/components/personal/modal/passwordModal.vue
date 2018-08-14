<template>
  <el-dialog
    :title="LAN.updatePWd"
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
        <el-form-item :label="LAN.oldPwd" prop="oldPassword">
          <el-input :placeholder="LAN.oldPwd" type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.newPwd" prop="newPassword">
          <el-input :placeholder="LAN.newPwd" type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.confirmPwd" prop="confirmPwd">
          <el-input :placeholder="LAN.confirmPwd" type="password" v-model="form.confirmPwd" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item class="modify-form-btn">
          <el-button type="primary" @click="submit">{{LAN.enter}}</el-button>
          <el-button @click="close">{{LAN.cancel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import {modifyPwd, loginOut} from '../proxy'
import {validatePwd} from '../../../libs/validate'
import {sha256} from 'js-sha256'
import LAN from '@/libs/il8n'
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
        callback(new Error(this.LAN.pwdVaild1))
      } else if (value !== this.form.newPassword) {
        callback(new Error(this.LAN.pwdValid2))
      } else {
        callback()
      }
    }
    return {
      LAN: LAN.personal.pwdModal,
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
              this.$message.success(this.LAN.updateSuccess)
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
