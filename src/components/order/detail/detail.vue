<template>
  <div id="OrderDetail">
    <div class="yle_tabs_title">
      <el-button icon="el-icon-back" size="mini" @click="$router.push('/order')">{{LAN.back}}</el-button>
      <span class="txt">{{tabsTitle}}</span>
    </div>
    <div class="warpMain">
      <el-tabs v-model="activeTabs" type="card" @tab-click="tabsClick">
        <el-tab-pane name="1" :value="LAN.orderMessage">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.orderMessage}}</span>
          <div class="tabsAreas">
            <el-form :model="form" label-width="100px" size="small">
              <el-form-item :label="LAN.orderId">{{form.orderId}}</el-form-item>
              <el-form-item :label="LAN.discountId" class="yle_color_blue yle_pointer">{{form.discountId}}</el-form-item>
              <el-form-item :label="LAN.consignee" class="yle_color_blue yle_pointer">{{form.consignee}}</el-form-item>
              <el-form-item :label="LAN.shopName" class="yle_color_blue yle_pointer">{{form.shopName}}</el-form-item>
              <el-form-item :label="LAN.payWay">
                <span v-if = "form.payWay === 1">{{LAN.payAfter}}</span>
                <span v-else-if = "form.payWay === 2">{{LAN.weixin}}</span>
                <span v-else-if = "form.payWay === 3">{{LAN.zhifubao}}</span>
                <span v-else>--</span>
              </el-form-item>
              <el-form-item :label="LAN.orderStatus">
                <el-tag type="warning" v-if = "form.status === 1">{{LAN.waitPay}}</el-tag>
                <el-tag v-else-if = "form.status === 2">{{LAN.waitSend}}</el-tag>
                <el-tag v-else-if = "form.status === 3">{{LAN.alreadySend}}</el-tag>
                <el-tag v-else-if = "form.status === 4">{{LAN.complate}}</el-tag>
                <el-tag v-else-if = "form.status === 5">{{LAN.cancel}}</el-tag>
                <el-tag v-else>--</el-tag>
              </el-form-item>
              <el-form-item :label="LAN.discount">5折</el-form-item>
              <el-form-item :label="LAN.amount">￥{{form.amount}}.00</el-form-item>
              <el-form-item :label="LAN.createAt">{{form.create_at}}</el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" :value="LAN.goodsMsg">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.goodsMsg}}</span>
          <div class="tabsAreas">
            <el-form :model="form" label-width="100px" size="small">
              <el-form-item :label="LAN.goodsName" class="gname"></el-form-item>
              <el-form-item :label="LAN.tagPrice">￥1280.00</el-form-item>
              <el-form-item :label="LAN.color">{{form.color}}</el-form-item>
              <el-form-item :label="LAN.size">{{form.size}}</el-form-item>
              <el-form-item :label="LAN.number">1件</el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3" :value="LAN.sendMsg">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.sendMsg}}</span>
          <div v-if="!form.address" class="areas"><div class="noData">{{LAN.noData}}</div></div>
          <el-form v-if="form.address" :model="form" label-width="100px" size="small">
            <el-form-item :label="LAN.consignee">{{form.consignee}}</el-form-item>
            <el-form-item :label="LAN.address">{{form.address}}</el-form-item>
            <el-form-item :label="LAN.telephone">{{form.telephone}}</el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="4" :value="LAN.distributionMsg">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.distributionMsg}}</span>
          <div v-if="!form.courierNo" class="areas"><div class="noData">{{LAN.noData}}</div></div>
          <el-form v-if="form.courierNo" :model="form" label-width="100px" size="small">
            <el-form-item :label="LAN.courierNo">{{form.courierNo}}</el-form-item>
            <el-form-item :label="LAN.company">{{form.company}}</el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {getOrderDetail} from '../proxy'
import LAN from '@/libs/il8n'
export default {
  name: 'OrderDetail',
  data () {
    return {
      LAN: LAN.orderManagement.detail,
      activeTabs: '1',
      tabsTitle: LAN.orderManagement.detail.basicMsg,
      form: {}
    }
  },
  mounted () {
    let orderId = this.$route.query.orderId
    getOrderDetail(orderId).then((res) => {
      if (res.code * 1 === 0 && res.data) {
        this.form = {...this.form, ...res.data}
      }
    })
  },
  methods: {
    tabsClick (tab) {
      this.tabsTitle = tab.$attrs.value
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
