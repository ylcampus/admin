<template>
  <div id="UserAddEdit">
    <div class="yle_detail_title"><span>{{title}}</span></div>
    <!--form表单-->
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" size="small">
        <el-form-item :label="LAN.role" prop="roleId">
          <el-select v-model="form.roleId" :placeholder="LAN.roleSelect">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.name"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="LAN.account" prop="account">
          <el-input  :disabled="pflag === 'UserEdit'" v-model="form.account" :placeholder="LAN.accountHolder"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.name" prop="name">
          <el-input  :disabled="pflag === 'UserEdit'" v-model="form.name" :placeholder="LAN.nameHolder"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.sex" prop="sex">
          <el-radio-group v-model="form.sex" :disabled="pflag === 'UserEdit'">
            <el-radio :label="1" border>{{LAN.male}}</el-radio>
            <el-radio :label="2" border>{{LAN.female}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if = "pflag === 'UserEdit'" :label="LAN.telephone">
          <el-input v-model="form.telephone" :placeholder="LAN.telephoneHolder" disabled></el-input>
        </el-form-item>
        <el-form-item v-if = "pflag === 'UserEdit'" :label="LAN.email">
          <el-input  v-model="form.email" :placeholder="LAN.emailHolder" disabled></el-input>
        </el-form-item>
        <el-form-item :label="LAN.desc" prop="desc">
          <el-input @keyup.enter.native="submitForm" rows = "4" type="textarea" v-model="form.desc" :placeholder="LAN.descHolder"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">
            {{pflag === 'UserAdd' ? LAN.create : LAN.save }}
          </el-button>
          <el-button @click="cancel()">{{LAN.cancel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getRoleList, addUser, getUserDetail, editUser} from '../proxy'
import {validateAccount, checkSpecialChar} from '../../../../libs/validate'
import LAN from '@/libs/il8n'
export default {
  name: 'userAddEdit',
  data () {
    return {
      LAN: LAN.userManagement.addEdit,
      title: '添加用户',
      pflag: 'UserAdd', // 添加or编辑 默认为添加
      form: {
        account: '', // 账户名
        roleId: '', // 角色Id
        name: '', // 用户姓名
        sex: '', // 性别
        desc: '' // 描述
      },
      roleList: [], // 角色列表
      rules: {
        roleId: [
          {
            required: true,
            message: LAN.userManagement.addEdit.roleError,
            trigger: 'change'
          }
        ],
        account: [
          {
            required: true,
            validator: validateAccount,
            trigger: 'blur'
          }
        ],
        name: [
          {
            min: 1,
            max: 32,
            message: LAN.userManagement.addEdit.nameError,
            trigger: 'blur'
          },
          {
            validator: checkSpecialChar,
            trigger: 'blur'
          }
        ],
        desc: [
          {
            min: 0,
            max: 255,
            message: LAN.userManagement.addEdit.descError,
            trigger: 'blur'
          },
          {
            validator: checkSpecialChar,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.pflag = this.$route.name
    this.title = this.pflag === 'UserAdd' ? this.LAN.addUser : this.LAN.editUser
    // 若是编辑页面则首先去获取资源详情
    if (this.pflag === 'UserEdit') {
      let userId = this.$route.query.userId
      getUserDetail(userId).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
          this.form.sex = parseInt(res.data.sex, 10)
          let roleId = this.form.roleId
          this.getRoleList().then((roleList) => {
            let flag = roleList.findIndex((value, index) => {
              return value.roleId === roleId
            })
            if (flag === -1) {
              // 说明角色列表中不包含当前角色信息（即当前角色被删除）
              this.form.roleId = ''
            }
          })
        }
      })
    } else {
      this.getRoleList()
    }
  },
  methods: {
    getRoleList () {
      return getRoleList({
        pageNo: 1,
        pageSize: 999
      }).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.roleList = res.data.rows || []
          return this.roleList
        }
      })
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid) => { // 添加用户
        if (valid) {
          let params = this.getParams()
          if (this.pflag === 'UserAdd') {
            addUser(params).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success(this.LAN.addSuccess)
                setTimeout(() => {
                  this.$router.push('/user')
                }, 2000)
              }
            })
          } else if (this.pflag === 'UserEdit') { // 编辑用户
            params.userId = this.form.userId
            editUser(params).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success(this.LAN.editSuccess)
                setTimeout(() => {
                  this.$router.push('/user')
                }, 2000)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    getParams () { // 获取参数
      let map = {
        account: this.form.account,
        roleId: this.form.roleId,
        name: this.form.name,
        sex: parseInt(this.form.sex),
        desc: this.form.desc
      }
      if (this.form.name) { // 姓名
        map.name = this.form.name
      }
      if (this.form.sex) { // 性别
        map.sex = parseInt(this.form.sex)
      }
      if (this.form.desc) { // 描述
        map.desc = this.form.desc
      }
      return map
    },
    cancel () { // 取消
      this.$router.push('/user')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
