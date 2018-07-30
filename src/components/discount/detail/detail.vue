<template>
  <div id="DiscountDeatil">
    <div class="yle_detail_title"><span>打折券详情</span></div>
    <div class="form">
      <el-form label-width="100px" size="small">
        <el-form-item label="打折券">{{form.discountId}}</el-form-item>
        <el-form-item label="订单" class="yle_color_blue yle_pointer">{{form.goodsName || '--'}}</el-form-item>
        <el-form-item label="会员" class="yle_color_blue yle_pointer">{{form.memberAccount}}</el-form-item>
        <el-form-item label="店铺" class="yle_color_blue yle_pointer">{{form.shopName}}</el-form-item>
        <el-form-item label="折扣">
          <span v-if = "form.type === 1">一折券</span>
          <span v-else-if = "form.type === 2">二折券</span>
          <span v-else-if = "form.type === 3">三折券</span>
          <span v-else-if = "form.type === 4">四折券</span>
          <span v-else-if = "form.type === 5">五折券</span>
          <span v-else>--</span>
        </el-form-item>
        <el-form-item label="状态">
          <el-tag type="success" v-if = "form.status === 1">未领取</el-tag>
          <el-tag type="success" v-else-if = "form.status === 2">未使用</el-tag>
          <el-tag type="success" v-else-if = "form.status === 3">已使用</el-tag>
          <el-tag type="success" v-else-if = "form.status === 4">已完成</el-tag>
          <span v-else>--</span>
        </el-form-item>
        <el-form-item label="创建时间">{{form.create_at}}</el-form-item>
        <el-form-item>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getDiscountDetail} from '../proxy'
export default {
  name: 'discountDetail',
  data () {
    return {
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
