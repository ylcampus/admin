<template>
  <div id="Personal">
    <div class="page-personel">
      <!--个人资料-->
      <div class="info-block">
        <div class="info-block-title">{{LAN.titleTxt}}</div>
        <el-form :model="form" :rules="rules" ref="personalForm" label-width="100px" style="width:386px">
          <el-form-item :label="LAN.account">{{form.account}}</el-form-item>
          <el-form-item :label="LAN.name" prop="name">
            <el-input :placeholder="LAN.name" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="LAN.sex" prop="sex" required>
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">{{LAN.male}}</el-radio>
              <el-radio :label="2">{{LAN.female}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="LAN.telephone">{{form.telephone}}</el-form-item>
          <el-form-item :label="LAN.email" prop="email">
            <el-input :placeholder="LAN.emailHolder" v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
        <div class="info-block-btn">
          <el-button type="primay" @click="submit">{{LAN.save}}</el-button>
        </div>
      </div>
      <!--账号安全-->
      <div class="info-block">
        <div class="info-block-title">{{LAN.safety}}</div>
        <div class="info-block-edit">
          <div class="edit-label">
            <span class="edit-label-title">{{LAN.validPhone}}</span>
            <span class="edit-label-text">{{LAN.yourPhone}}:{{form.telephone}}{{LAN.phoneChangeTxt}}</span>
          </div>
          <div class="edit-btn">
            <el-button @click="changePhone = true" style="width:110px;" type="primary">{{LAN.change}}</el-button>
          </div>
        </div>
        <div class="info-block-edit">
          <div class="edit-label">
            <span class="edit-label-title">{{LAN.setPwd}}</span>
            <span class="edit-label-text">{{LAN.setPwdTips}}</span>
          </div>
          <div class="edit-btn">
            <el-button @click="changePwd = true" style="width:110px;" type="primary">{{LAN.update}}</el-button>
          </div>
        </div>
      </div>
      <!--弹窗-->
      <phone-modal @refresh = "getUserInfo" :visible.sync="changePhone"></phone-modal>
      <password-modal :visible.sync="changePwd"></password-modal>
    </div>
  </div>
</template>
<script>
import {getUserInfo, editUser} from './proxy'
import {validateName, validateSex, checkSpecialChar} from '../../libs/validate'
import passwordModal from './modal/passwordModal.vue'
import phoneModal from './modal/phoneModal.vue'
import LAN from '@/libs/il8n'
export default {
  name: 'personal',
  components: {
    passwordModal,
    phoneModal
  },
  data () {
    return {
      LAN: LAN.personal,
      changePhone: false,
      changePwd: false,
      form: {
        account: '', // 账号
        name: '', // 姓名
        sex: 1, // 性别 1:男 2：女
        telephone: '', // 联系手机
        email: '' // 电子邮件
      },
      rules: {
        name: [
          {
            validator: validateName,
            trigger: 'blur'
          },
          {
            validator: checkSpecialChar,
            trigger: 'blur'
          }
        ],
        sex: [
          {
            validator: validateSex,
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
            message: LAN.personal.emailError,
            trigger: 'blur'
          },
          {
            max: 30,
            message: LAN.personal.emailLengthLimit
          }
        ]
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () { // 获取用户详情
      getUserInfo().then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
          this.form.sex = parseInt(res.data.sex, 10)
        }
      })
    },
    submit () {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          let params = {}
          if (this.form.name) {
            params.name = this.form.name
          }
          if (this.form.sex) {
            params.sex = parseInt(this.form.sex, 10)
          }
          if (this.form.email) {
            params.email = this.form.email
          }
          editUser(params).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.$message.success(this.LAN.updateSuccess)
              this.getUserInfo()
            }
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
