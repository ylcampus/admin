<template>
  <div id="OrderDetail">
    <div class="yle_tabs_title">
      <el-button icon="el-icon-back" size="mini" @click="$router.push('/order')">返回</el-button>
      <span class="txt">{{tabsTitle}}</span>
    </div>
    <div class="warpMain">
      <el-tabs v-model="activeTabs" type="card" @tab-click="tabsClick">
        <el-tab-pane name="1" value="订单信息">
          <span slot="label"><i class="el-icon-date"></i>订单信息</span>
          <div class="tabsAreas">
            <el-form :model="form" label-width="100px" size="small">
              <el-form-item label="订单号">{{form.orderId}}</el-form-item>
              <el-form-item label="打折券Id" class="yle_color_blue yle_pointer">{{form.discountId}}</el-form-item>
              <el-form-item label="买家" class="yle_color_blue yle_pointer">{{form.consignee}}</el-form-item>
              <el-form-item label="店铺名称" class="yle_color_blue yle_pointer">{{form.shopName}}</el-form-item>
              <el-form-item label="支付方式">
                <span v-if = "form.payWay === 1">货到付款</span>
                <span v-else-if = "form.payWay === 2">微信</span>
                <span v-else-if = "form.payWay === 3">支付宝</span>
                <span v-else>--</span>
              </el-form-item>
              <el-form-item label="订单状态">
                <el-tag type="warning" v-if = "form.status === 1">待付款</el-tag>
                <el-tag v-else-if = "form.status === 2">待发货</el-tag>
                <el-tag v-else-if = "form.status === 3">已发货</el-tag>
                <el-tag v-else-if = "form.status === 4">已完成</el-tag>
                <el-tag v-else-if = "form.status === 5">已取消</el-tag>
                <el-tag v-else>--</el-tag>
              </el-form-item>
              <el-form-item label="折扣">5折</el-form-item>
              <el-form-item label="金额">￥{{form.amount}}.00</el-form-item>
              <el-form-item label="创建时间">{{form.create_at}}</el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" value="商品信息">
          <span slot="label"><i class="el-icon-date"></i>商品信息</span>
          <div class="tabsAreas">
            <el-form :model="form" label-width="100px" size="small">
              <el-form-item label="商品名称" class="gname">
                <el-popover
                  placement="top-start"
                  title="主图片"
                  trigger="hover">
                  <img style="width:300px;background: #e8e8e8;padding: 1px;" class="pic" :src="form.pic">
                  <div slot="reference" class="gtitle yle_color_blue yle_pointer">{{form.goodsName}}</div>
                </el-popover>
              </el-form-item>
              <el-form-item label="吊牌价">￥1280.00</el-form-item>
              <el-form-item label="颜色">{{form.color}}</el-form-item>
              <el-form-item label="尺码">{{form.size}}</el-form-item>
              <el-form-item label="数量">1件</el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3" value="发货信息">
          <span slot="label"><i class="el-icon-date"></i>发货信息</span>
          <div v-if="!form.address" class="areas"><div class="noData">暂无数据</div></div>
          <el-form v-if="form.address" :model="form" label-width="100px" size="small">
            <el-form-item label="收货人">{{form.consignee}}</el-form-item>
            <el-form-item label="收货地址">{{form.address}}</el-form-item>
            <el-form-item label="联系电话">{{form.telephone}}</el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="4" value="配送信息">
          <span slot="label"><i class="el-icon-date"></i>配送信息</span>
          <div v-if="!form.courierNo" class="areas"><div class="noData">暂无数据</div></div>
          <el-form v-if="form.courierNo" :model="form" label-width="100px" size="small">
            <el-form-item label="快递单号">{{form.courierNo}}</el-form-item>
            <el-form-item label="快递公司">{{form.company}}</el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {getOrderDetail} from '../proxy'
export default {
  name: 'OrderDetail',
  data () {
    return {
      activeTabs: '1',
      tabsTitle: '基本信息',
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
