<template>
  <div id="RoleAddEdit">
    <div class="yle_detail_title"><span>{{title}}</span></div>
    <!--form表单-->
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item :label="LAN.roleName" prop="name">
          <el-input v-model="form.name" :placeholder="LAN.roleNameHolder"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.auth" prop="auth">
          <div class="authTree">
            <div class="searchArea">
              <el-input
                :placeholder="LAN.authHolder"
                v-model="filterText" clearable>
              </el-input>
            </div>
            <div class="treeArea">
              <el-tree
                :data="authTree"
                show-checkbox
                node-key="code"
                :default-checked-keys="auth"
                :filter-node-method="filterNode"
                :props="defaultProps"
                ref="menuTree">
              </el-tree>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="LAN.desc" prop="desc">
          <el-input rows = "4" type="textarea" v-model="form.desc" :placeholder="LAN.descHolder"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">
            {{pflag === 'RoleAdd' ? LAN.create : LAN.save}}
          </el-button>
          <el-button @click="cancel()">{{LAN.cancel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getSession, addRole, getRoleDetail, editRole} from '../proxy'
import {checkSpecialChar} from '../../../../libs/validate'
import LAN from '@/libs/il8n'
export default {
  name: 'roleAddEdit',
  watch: {
    filterText (val) {
      this.$refs.menuTree.filter(val)
    }
  },
  data () {
    return {
      LAN: LAN.roleManagement.addEdit,
      filterText: '',
      title: LAN.roleManagement.addEdit.addRole,
      pflag: 'RoleAdd', // 添加or编辑 默认为添加
      form: {
        roleId: null,
        name: null,
        desc: null
      },
      auth: [],
      authTree: [], // 权限树
      defaultProps: {
        children: 'subMenu',
        label: 'name'
      },
      rules: { // 校验规则
        name: [
          {
            required: true,
            message: LAN.roleManagement.addEdit.roleNameError,
            trigger: 'blur'
          },
          {
            min: 1,
            max: 32,
            message: LAN.roleManagement.addEdit.roleLengthError,
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
            message: LAN.roleManagement.addEdit.descError,
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
    this.title = this.pflag === 'RoleAdd' ? this.LAN.addRole : this.LAN.editRole
    // 获取会话信息
    getSession().then((res) => {
      if (res.code * 1 === 0 && res.data) {
        this.authTree = res.data.auth || []
      }
    })
    // 若是编辑页面则获取角色详情
    if (this.pflag === 'RoleEdit') {
      let roleId = this.$route.query.roleId
      getRoleDetail(roleId).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
          let auth = res.data.auth.split(',')
          this.$refs.menuTree.setCheckedKeys(auth)
        }
      })
    }
  },
  methods: {
    filterNode (val, data) { // 权限树过滤
      if (!val) return true
      return data.name.indexOf(val) !== -1
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.getParams()
          if (this.pflag === 'RoleAdd') { // 添加角色
            addRole(params).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success(this.LAN.addSuccess)
                setTimeout(() => {
                  this.$router.push('/role')
                }, 2000)
              }
            })
          } else if (this.pflag === 'RoleEdit') { // 编辑角色
            params.roleId = this.form.roleId
            editRole(params).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success(this.LAN.editSuccess)
                setTimeout(() => {
                  this.$router.push('/role')
                }, 2000)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    getParams () {
      let bmap = {
        name: this.form.name,
        auth: this.$refs.menuTree.getCheckedKeys().toString()
      }
      if (this.form.desc) {
        bmap.desc = this.form.desc
      }
      return bmap
    },
    cancel () {
      this.$router.push('/role')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  #RoleAddEdit {
    .searchArea{
      .el-input__inner{
        background-color: #f7f7f7;
        border: none;
        border-radius: 20px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>
