<template>
  <div id="MemberDeatil">
    <div class="yle_tabs_title">
      <el-button icon="el-icon-back" size="mini" @click="$router.push('/member')">{{LAN.back}}</el-button>
      <span class="txt">{{tabsTitle}}</span>
    </div>
    <div class="warpMain">
      <el-tabs v-model="activeTabs" type="card" @tab-click="tabsClick">
        <el-tab-pane name="1" :value="LAN.basicMessage">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.basicMessage}}</span>
          <div class="basicAreas">
            <el-form :model="form" label-width="100px" size="small">
              <el-form-item :label="LAN.memberId">{{form.memberId}}</el-form-item>
              <el-form-item :label="LAN.account">{{form.account}}</el-form-item>
              <el-form-item :label="LAN.freezeStatus">
                <el-tag v-if = "!form.freeze" type="success">{{LAN.normal}}</el-tag>
                <el-tag v-if = "form.freeze" type="danger">{{LAN.freezed}}</el-tag>
              </el-form-item>
              <el-form-item :label="LAN.status">
                <el-tag v-if = "form.status === '1'" type="info">{{LAN.online}}</el-tag>
                <el-tag v-if = "form.status === '2'" type="success">{{LAN.offline}}</el-tag>
              </el-form-item>
              <el-form-item :label="LAN.province">{{form.province}}</el-form-item>
              <el-form-item :label="LAN.city">{{form.city}}</el-form-item>
              <el-form-item :label="LAN.school">{{form.school}}</el-form-item>
              <el-form-item :label="LAN.campus">{{form.campus}}</el-form-item>
              <el-form-item :label="LAN.createAt">{{form.create_at}}</el-form-item>
              <el-form-item :label="LAN.updateAt">{{form.update_at}}</el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" :value="LAN.orderMsg" disabled>
          <span slot="label"><i class="el-icon-date"></i>{{LAN.orderMsg}}</span>
          <div class="orderAreas areas"><div class="noData">{{LAN.noData}}</div></div>
        </el-tab-pane>
        <el-tab-pane name="3" :value="LAN.discountMsg" disabled>
          <span slot="label"><i class="el-icon-date"></i>{{LAN.discountMsg}}</span>
          <div class="discountAreas areas"><div class="noData">{{LAN.noData}}</div></div>
        </el-tab-pane>
        <el-tab-pane name="4" :value="LAN.visitMsg" disabled>
          <span slot="label"><i class="el-icon-date"></i>{{LAN.visitMsg}}</span>
          <div class="visitAreas areas"><div class="noData">{{LAN.noData}}</div></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {getMemberDetail} from '../proxy'
import LAN from '@/libs/il8n'
export default {
  name: 'memberDetail',
  data () {
    return {
      LAN: LAN.memberManagement.detail,
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
