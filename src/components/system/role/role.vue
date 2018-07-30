<template>
  <div id="Role">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-plus" @click = "addRole" plain>添加</el-button>
        <el-button icon="el-icon-close" :disabled="selected.length === 0" @click = "delRole" plain>删除</el-button>
      </div>
      <div class="filter">
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getRoleList"
            placeholder="输入角色名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getRoleList"
            v-model="filter.name" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--资源列表-->
    <section class="roleList">
      <el-table
        :data="roleList"
        :height = "tableHeight"
        @selection-change="handleSelectionChange"
        stripe>
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="rname" @click="editRole(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          width="220"
          label="描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="authArr"
          label="权限列表" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :key="key" v-for = "(item, key) in scope.row.authArr"
              :class="{ 'mainTxt': item.tag === 'main', 'subTxt': item.tag === 'sub'}"
              >{{ item.name }}</span>
          </template>
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
import {getRoleList, deleteRole} from './proxy'
export default {
  name: 'role',
  data () {
    return {
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        name: '' // 角色名称
      },
      tableHeight: 720,
      roleList: [],
      selected: []
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    getRoleList () { // 获取资源列表数据
      let params = this.getParams()
      getRoleList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.roleList = res.data.rows || []
          this.total = res.data.total || 0
        }
      })
    },
    getParams () { // 获取筛选参数
      let map = {
        pageNo: this.filter.pageNo,
        pageSize: this.filter.pageSize
      }
      if (this.filter.name) { // 角色名称
        map.name = this.filter.name
      }
      return map
    },
    editRole (row) { // 到角色编辑页面
      this.$router.push({
        name: 'RoleEdit',
        query: { roleId: row.roleId }
      })
    },
    addRole () { // 添加角色
      this.$router.push('role/add')
    },
    delRole () { // 删除角色
      this.$confirm('确定要删除已选角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selected.map((row) => {
          return row.roleId
        })
        deleteRole({ids: ids}).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getRoleList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getRoleList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getRoleList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
