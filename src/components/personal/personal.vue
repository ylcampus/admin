<template>
  <div id="Personal">
    <div class="page-personel">
      <!--个人资料-->
      <div class="info-block">
        <div class="info-block-title">个人资料</div>
        <el-form :model="form" :rules="rules" ref="personalForm" label-width="100px" style="width:386px">
          <el-form-item label="账号">{{form.account}}</el-form-item>
          <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="用户姓名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" required>
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号码">{{form.telephone}}</el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="邮箱" v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
        <div class="info-block-btn">
          <el-button type="primay" @click="submit">保 存</el-button>
        </div>
      </div>
      <!--账号安全-->
      <div class="info-block">
        <div class="info-block-title">账号安全</div>
        <div class="info-block-edit">
          <div class="edit-label">
            <span class="edit-label-title">验证手机</span>
            <span class="edit-label-text">您的手机:{{form.telephone}}若已丢失或停用，请立即更换，避免账号被盗</span>
          </div>
          <div class="edit-btn">
            <el-button @click="changePhone = true" style="width:110px;" type="primary">更换手机号</el-button>
          </div>
        </div>
        <div class="info-block-edit">
          <div class="edit-label">
            <span class="edit-label-title">密码设置</span>
            <span class="edit-label-text">安全性高的密码可以使账号更安全，建议您定期更换密码，且设置包含数字、字母及特殊字符且8位以上</span>
          </div>
          <div class="edit-btn">
            <el-button @click="changePwd = true" style="width:110px;" type="primary">修 改</el-button>
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
export default {
  name: 'personal',
  components: {
    passwordModal,
    phoneModal
  },
  data () {
    return {
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
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '不能超过30个字'
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
              this.$message.success('修改成功')
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
