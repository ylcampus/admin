<template>
  <div id="User">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-plus" @click = "addUser" plain>{{LAN.add}}</el-button>
        <el-button icon="el-icon-close" :disabled="selected.length === 0" @click = "delUser" plain>{{LAN.del}}</el-button>
      </div>
      <div class="filter">
        <div class="fitem" style="width:150px;">
          <el-select v-model="filter.tag" :placeholder="LAN.selectHolder" @change="typeSelect" clearable>
            <el-option :label="LAN.noLimit" value=""></el-option>
            <el-option :label="LAN.tenant" value="1"></el-option>
            <el-option :label="LAN.normal" value="2"></el-option>
          </el-select>
        </div>
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getUserList"
            :placeholder="LAN.searchHolder"
            suffix-icon="el-icon-search"
            @clear = "getUserList"
            v-model="filter.key" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--用户列表-->
    <section class="roleList">
      <el-table
        :data="userList"
        :height = "tableHeight"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="account"
          :label="LAN.account"
          width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="raccount" @click="editUser(scope.row)">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          :label="LAN.roleName"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="LAN.name"
          width="100">
        </el-table-column>
        <el-table-column
          prop="telephone"
          :label="LAN.telephone"
          width="120">
        </el-table-column>
        <el-table-column
          prop="desc"
          :label="LAN.desc" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </section>
    <!--分页-->
    <section class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filter.pageNo"
        :page-sizes="[20, 25, 50, 100]"
        :page-size="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </section>
  </div>
</template>
<script>
import {getUserList, deleteUser} from './proxy'
import LAN from '@/libs/il8n'
export default {
  name: 'user',
  data () {
    return {
      LAN: LAN.userManagement,
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        tag: '',
        key: ''
      },
      tableHeight: 520,
      userList: [],
      selected: []
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    getUserList () { // 获取资源列表数据
      let params = this.getParams()
      getUserList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.userList = res.data.rows || []
          this.total = res.data.total || 0
        }
      })
    },
    getParams () { // 获取筛选参数
      let map = {
        pageNo: this.filter.pageNo,
        pageSize: this.filter.pageSize
      }
      if (this.filter.key) { // 用户姓名或手机号
        map.key = this.filter.key
      }
      if (this.filter.tag) { // 用户类型
        map.tag = this.filter.tag
      }
      return map
    },
    addUser () { // 添加用户
      this.$router.push('user/add')
    },
    delUser () { // 删除用户
      this.$confirm(this.LAN.deleteConfirm, this.LAN.tips, {
        confirmButtonText: this.LAN.enter,
        cancelButtonText: this.LAN.cancel,
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.userId
        })
        deleteUser({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success(this.LAN.delSuccess)
            this.getUserList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.LAN.opaCancel
        })
      })
    },
    typeSelect (val) {
      this.filter.tag = val
      this.getUserList()
    },
    editUser (row) { // 到用户编辑页面
      let userId = row.userId
      this.$router.push({
        name: 'UserEdit',
        query: { userId: userId }
      })
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getUserList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
