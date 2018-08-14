<template>
  <div id="DiscountDeatil">
    <div class="yle_detail_title"><span>{{LAN.discountDeatil}}</span></div>
    <div class="form">
      <el-form label-width="100px" size="small">
        <el-form-item :label="LAN.discountId">{{form.discountId}}</el-form-item>
        <el-form-item :label="LAN.order" class="yle_color_blue yle_pointer">{{form.goodsName || '--'}}</el-form-item>
        <el-form-item :label="LAN.memberAccount" class="yle_color_blue yle_pointer">{{form.memberAccount}}</el-form-item>
        <el-form-item :label="LAN.shopName" class="yle_color_blue yle_pointer">{{form.shopName}}</el-form-item>
        <el-form-item :label="LAN.discount">
          <span v-if = "form.type === 1">{{LAN.discount1}}</span>
          <span v-else-if = "form.type === 2">{{LAN.discount2}}</span>
          <span v-else-if = "form.type === 3">{{LAN.discount3}}</span>
          <span v-else-if = "form.type === 4">{{LAN.discount4}}</span>
          <span v-else-if = "form.type === 5">{{LAN.discount5}}</span>
          <span v-else>--</span>
        </el-form-item>
        <el-form-item :label="LAN.status">
          <el-tag type="success" v-if = "form.status === 1">{{LAN.receivePending}}</el-tag>
          <el-tag type="success" v-else-if = "form.status === 2">{{LAN.usePending}}</el-tag>
          <el-tag type="success" v-else-if = "form.status === 3">{{LAN.used}}</el-tag>
          <el-tag type="success" v-else-if = "form.status === 4">{{LAN.completed}}</el-tag>
          <span v-else>--</span>
        </el-form-item>
        <el-form-item :label="LAN.createAt">{{form.create_at}}</el-form-item>
        <el-form-item>
          <el-button @click="back">{{LAN.back}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getDiscountDetail} from '../proxy'
import LAN from '@/libs/il8n'
export default {
  name: 'discountDetail',
  data () {
    return {
      LAN: LAN.discountManagement.detail,
      form: {}
    }
  },
  mounted () {
    let discountId = this.$route.query.discountId
    getDiscountDetail(discountId).then((res) => {
      if (res.code * 1 === 0 && res.data) {
        this.form = {...this.form, ...res.data}
      }
    })
  },
  methods: {
    back () { // 返回定时任务列表
      this.$router.push('/discount')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
