<template>
  <div id="UserAddEdit">
    <div class="yle_detail_title"><span>{{title}}</span></div>
    <!--form表单-->
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" size="small">
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.name"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户账号" prop="account">
          <el-input  :disabled="pflag === 'UserEdit'" v-model="form.account" placeholder="请输入用户账号-最短3个字符最长不超过16个字符"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input  :disabled="pflag === 'UserEdit'" v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex" :disabled="pflag === 'UserEdit'">
            <el-radio :label="1" border>男</el-radio>
            <el-radio :label="2" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if = "pflag === 'UserEdit'" label="联系电话">
          <el-input v-model="form.telephone" placeholder="联系电话" disabled></el-input>
        </el-form-item>
        <el-form-item v-if = "pflag === 'UserEdit'" label="电子邮件">
          <el-input  v-model="form.email" placeholder="电子邮件" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input @keyup.enter.native="submitForm" rows = "4" type="textarea" v-model="form.desc" placeholder="请输入描述信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">
            {{pflag === 'UserAdd' ? '立即创建' : '保存修改'}}
          </el-button>
          <el-button @click="cancel()">取消</el-button>
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
            message: '请选择角色',
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
            message: '长度在 1 到 32 个字符',
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
            message: '长度在 1 到 255 个字符',
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
    this.title = this.pflag === 'UserAdd' ? '添加用户' : '编辑用户'
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
                this.$message.success('用户添加成功')
                setTimeout(() => {
                  this.$router.push('/user')
                }, 2000)
              }
            })
          } else if (this.pflag === 'UserEdit') { // 编辑用户
            params.userId = this.form.userId
            editUser(params).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('用户编辑成功')
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
