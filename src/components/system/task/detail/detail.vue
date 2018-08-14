<template>
  <div id="TaskAddEdit">
    <div class="yle_detail_title"><span>{{LAN.taskDetail}}</span></div>
    <div class="form">
      <el-form label-width="100px" size="small">
        <el-form-item :label="LAN.name">{{form.name}}</el-form-item>
        <el-form-item :label="LAN.tenantName">{{form.tenantName}}</el-form-item>
        <el-form-item :label="LAN.timeType">
          <span v-if="form.type === 1">{{LAN.day}}</span>
          <span v-if="form.type === 2">{{LAN.week}}</span>
          <span v-if="form.type === 3">{{LAN.month}}</span>
        </el-form-item>
        <el-form-item :label="LAN.type">
          <span v-if="form.type === 1">{{LAN.system}}</span>
          <span v-if="form.type === 2">{{LAN.tenant}}</span>
        </el-form-item>
        <el-form-item :label="LAN.module">{{form.module}}</el-form-item>
        <el-form-item :label="LAN.handle">{{form.handle}}</el-form-item>
        <el-form-item :label="LAN.ready">
          <span v-if="form.ready">{{LAN.abled}}</span>
          <span v-if="!form.ready">{{LAN.disabled}}</span>
        </el-form-item>
        <el-form-item :label="LAN.rule">{{form.rule}}</el-form-item>
        <el-form-item :label="LAN.status">
          <span v-if="form.status === 'runing'">{{LAN.runing}}</span>
          <span v-if="form.status === 'pending'">{{LAN.pending}}</span>
        </el-form-item>
        <el-form-item :label="LAN.desc">{{form.desc}}</el-form-item>
        <el-form-item :label="LAN.createAt">{{form.create_at}}</el-form-item>
        <el-form-item :label="LAN.updateAt">{{form.update_at}}</el-form-item>
        <el-form-item>
          <el-button @click="back">{{LAN.back}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getTaskDetail} from '../proxy'
import LAN from '@/libs/il8n'
export default {
  name: 'taskDetail',
  data () {
    return {
      LAN: LAN.taskManagement.detail,
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
