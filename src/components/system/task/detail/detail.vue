<template>
  <div id="TaskAddEdit">
    <div class="yle_detail_title"><span>定时任务详情</span></div>
    <div class="form">
      <el-form label-width="100px" size="small">
        <el-form-item label="定时任务名称">{{form.name}}</el-form-item>
        <el-form-item label="租户">{{form.tenantName}}</el-form-item>
        <el-form-item label="时间类型">
          <span v-if="form.type === 1">每天</span>
          <span v-if="form.type === 2">每周</span>
          <span v-if="form.type === 3">每月</span>
        </el-form-item>
        <el-form-item label="类型">
          <span v-if="form.type === 1">系统任务</span>
          <span v-if="form.type === 2">租户任务</span>
        </el-form-item>
        <el-form-item label="所属模块">{{form.module}}</el-form-item>
        <el-form-item label="处理函数">{{form.handle}}</el-form-item>
        <el-form-item label="就绪状态">
          <span v-if="form.ready">已启用</span>
          <span v-if="!form.ready">未启用</span>
        </el-form-item>
        <el-form-item label="定时规则">{{form.rule}}</el-form-item>
        <el-form-item label="运行状态">
          <span v-if="form.status === 'runing'">运行中</span>
          <span v-if="form.status === 'pending'">挂起中</span>
        </el-form-item>
        <el-form-item label="描述">{{form.desc}}</el-form-item>
        <el-form-item label="创建时间">{{form.create_at}}</el-form-item>
        <el-form-item label="最近更新时间">{{form.update_at}}</el-form-item>
        <el-form-item>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getTaskDetail} from '../proxy'
export default {
  name: 'taskDetail',
  data () {
    return {
      form: {}
    }
  },
  mounted () {
    let taskId = this.$route.query.taskId
    getTaskDetail(taskId).then((res) => {
      if (res.code * 1 === 0 && res.data) {
        this.form = {...this.form, ...res.data}
      }
    })
  },
  methods: {
    back () { // 返回定时任务列表
      this.$router.push('/task')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
