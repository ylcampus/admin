<template>
  <div id="MemberDeatil">
    <div class="yle_tabs_title">
      <el-button icon="el-icon-back" size="mini" @click="$router.push('/member')">返回</el-button>
      <span class="txt">{{tabsTitle}}</span>
    </div>
    <div class="warpMain">
      <el-tabs v-model="activeTabs" type="card" @tab-click="tabsClick">
        <el-tab-pane name="1" value="基本信息">
          <span slot="label"><i class="el-icon-date"></i>基本信息</span>
          <div class="basicAreas">
            <el-form :model="form" label-width="100px" size="small">
              <el-form-item label="会员Id">{{form.memberId}}</el-form-item>
              <el-form-item label="账号">{{form.account}}</el-form-item>
              <el-form-item label="冻结状态">
                <el-tag v-if = "!form.freeze" type="success">正常</el-tag>
                <el-tag v-if = "form.freeze" type="danger">账号被冻结</el-tag>
              </el-form-item>
              <el-form-item label="在线状态">
                <el-tag v-if = "form.status === '1'" type="info">离线</el-tag>
                <el-tag v-if = "form.status === '2'" type="success">在线</el-tag>
              </el-form-item>
              <el-form-item label="省">{{form.province}}</el-form-item>
              <el-form-item label="市">{{form.city}}</el-form-item>
              <el-form-item label="学校">{{form.school}}</el-form-item>
              <el-form-item label="校区">{{form.campus}}</el-form-item>
              <el-form-item label="创建时间">{{form.create_at}}</el-form-item>
              <el-form-item label="最近更新时间">{{form.update_at}}</el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" value="订单数据" disabled>
          <span slot="label"><i class="el-icon-date"></i>订单数据</span>
          <div class="orderAreas areas"><div class="noData">暂无数据</div></div>
        </el-tab-pane>
        <el-tab-pane name="3" value="打折券数据" disabled>
          <span slot="label"><i class="el-icon-date"></i>打折券数据</span>
          <div class="discountAreas areas"><div class="noData">暂无数据</div></div>
        </el-tab-pane>
        <el-tab-pane name="4" value="访问数据" disabled>
          <span slot="label"><i class="el-icon-date"></i>访问数据</span>
          <div class="visitAreas areas"><div class="noData">暂无数据</div></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {getMemberDetail} from '../proxy'
export default {
  name: 'memberDetail',
  data () {
    return {
      activeTabs: '1',
      tabsTitle: '基本信息',
      form: {
        memberId: '', // 会员Id
        account: '', // 账号
        freeze: '', // 冻结状态 false 未冻结 true 已冻结
        status: '', // 在线状态 1 离线 2 在线
        province: '--', // 省
        city: '--', // 市
        school: '--', // 学校
        campus: '--', // 校区
        create_at: '', // 创建时间
        update_at: '' // 最近更新时间
      }
    }
  },
  mounted () {
    this.getMemberDetail()
  },
  methods: {
    getMemberDetail () { // 获取会员详情
      let memberId = this.$route.query.memberId
      getMemberDetail(memberId).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
        }
      })
    },
    tabsClick (tab) {
      this.tabsTitle = tab.$attrs.value
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
