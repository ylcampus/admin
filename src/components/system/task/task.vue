<template>
  <div id="Task">
    <!--头部-->
    <section class="head">
      <div class="add">
        <div class="fitem" style="width:150px;">
          <el-select v-model="filter.tag" placeholder="请选择定时任务类型" @change="typeSelect" clearable>
            <el-option label="不限" value=""></el-option>
            <el-option label="系统" value="1"></el-option>
            <el-option label="租户" value="2"></el-option>
          </el-select>
        </div>
      </div>
      <div class="filter">
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getTaskList"
            placeholder="输入定时任务名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getTaskList"
            v-model="filter.key" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--定时任务列表-->
    <section class="taskList">
      <el-table
        :data="taskList"
        :height = "tableHeight"
        stripe>
        <el-table-column
          prop="name"
          label="名称"
          width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="tname" @click="toDteailPage(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="类型"
          width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.type === 1">系统任务</span>
            <span v-else-if = "scope.row.type === 2">租户任务</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tenantName"
          label="租户"
          width="100">
        </el-table-column>
        <el-table-column
          prop="rule"
          label="执行时间"
          width="180" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ready"
          label="就绪状态"
          width="120">
          <template slot-scope="scope">
            <span v-if = "scope.row.ready">已启用</span>
            <span v-else-if = "!scope.row.ready">未启用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="运行状态"
          width="120">
          <template slot-scope="scope">
            <span v-if = "scope.row.status==='runing'">运行中</span>
            <span v-else-if = "scope.row.status==='pending'">挂起中</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述" show-overflow-tooltip>
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
import {getTaskList} from './proxy'
export default {
  name: 'task',
  data () {
    return {
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        tag: '1',
        key: ''
      },
      tableHeight: 720,
      taskList: []
    }
  },
  mounted () {
    this.getTaskList()
    // 需要再增加一个刷新按钮
  },
  methods: {
    getTaskList () { // 获取资源列表数据
      let params = this.getParams()
      getTaskList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.taskList = res.data.rows || []
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
    typeSelect (val) {
      this.filter.tag = val
      this.getTaskList()
    },
    toDteailPage (row) { // 到定时任务详情页面
      this.$router.push({
        name: 'TaskDetail',
        query: { taskId: row.taskId }
      })
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getTaskList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getTaskList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
