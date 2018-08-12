<template>
  <div id="GoodsDetail">
    <div class="yle_tabs_title">
      <el-button icon="el-icon-back" size="mini" @click="back">{{LAN.back}}</el-button>
      <span class="txt">{{LAN.goodsDetail}}</span>
    </div>
    <div class="warpMain">
      <div class="leftPart">
        <div class="skuPart">
          <div class="picMsg">
            <div @click="colorSelect(item)"
               :key="key"
               v-bind:class="{'active': item.cId === activecId}"
               class="item" v-for="(item, key) in form.picList">
              <img :src="hostname + item.pic">
            </div>
          </div>
          <div class="skuMsg">
            <div :key="key" class="item" v-for="(item, key) in form.skuArr">
              <div class="row">
                <span class="key">{{LAN.colorSize}}</span>
                <span class="value" :title="item.names">{{item.names}}</span>
              </div>
              <div class="row">
                <span class="key">{{LAN.skuId}}</span>
                <span class="value">{{item.skuId}}</span>
              </div>
              <div class="row">
                <span class="key">{{LAN.stock}}</span>
                <span class="value">{{item.stock}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="descPart">
          <div :key="key" class="item" v-for="(pic, key) in form.descPics">
            <img :src="hostname + pic">
          </div>
        </div>
      </div>
      <div class="rightPart">
        <el-form :model="form" label-width="100px" size="small">
          <el-form-item :label="LAN.goodsId">{{form.goodsId}}</el-form-item>
          <el-form-item :label="LAN.goodsName" class="yle_color_blue yle_pointer">{{form.title}}</el-form-item>
          <el-form-item :label="LAN.price">{{form.price}}</el-form-item>
          <el-form-item :label="LAN.status">
            <el-tag type="success" v-if = "form.status === 1">{{LAN.saleing}}</el-tag>
            <el-tag type="danger" v-else-if = "form.status === 2">{{LAN.stocking}}</el-tag>
            <span v-else>--</span>
          </el-form-item>
          <el-form-item :label="LAN.updateStatus">
            <span v-if = "form.updateStatus === 1">{{LAN.updateSuccess}}</span>
            <span v-else-if = "form.updateStatus === 2">{{LAN.updateFailed}}</span>
            <span v-else-if = "form.updateStatus === 3">{{LAN.notUpdate}}</span>
            <span v-else-if = "form.updateStatus === 3">{{LAN.addSuccess}}</span>
            <span v-else-if = "form.updateStatus === 3">{{LAN.addFailed}}</span>
            <span v-else>--</span>
          </el-form-item>
          <el-form-item :label="LAN.shopName" class="yle_color_blue yle_pointer">{{form.shopName}}</el-form-item>
          <el-form-item :label="LAN.createAt">{{form.create_at}}</el-form-item>
          <el-form-item :label="LAN.updateAt">{{form.timeStamp}}</el-form-item>
          <el-form-item>
            <el-button @click="update">{{LAN.update}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {getGoodsDetail, updateGoodsData} from '../proxy'
import {hostname} from '@/libs/config'
import LAN from '@/libs/il8n'
export default {
  name: 'GoodsDetail',
  data () {
    return {
      LAN: LAN.goodsManagement.detail,
      hostname: hostname,
      layout: null,
      activecId: '',
      form: {
        picList: [],
        skuArr: [],
        descPics: []
      }
    }
  },
  mounted () {
    this.getGoodsDetail()
  },
  methods: {
    getGoodsDetail () {
      let goodsId = this.$route.query.goodsId
      this.layout = this.$route.query.layout
      getGoodsDetail(goodsId).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
        }
        let picList = []
        let pics = this.form.pics
        for (let key in pics) {
          if (picList.length === 0) {
            this.activecId = key
          }
          picList.push({
            cId: key,
            pic: pics[key]
          })
        }
        this.form.picList = picList
        let activeCId = picList[0].cId
        let skuList = this.form.skuList
        if (activeCId) {
          this.form.skuArr = skuList.filter((row) => {
            return row.cId === activeCId
          })
        }
      })
    },
    colorSelect (row) { // 颜色选择
      this.activecId = row.cId
      this.form.skuArr = this.form.skuList.filter((item) => {
        return item.cId === row.cId
      })
    },
    update () { // 更新数据
      this.$confirm(this.LAN.updateConfirm, this.LAN.tips, {
        confirmButtonText: this.LAN.enter,
        cancelButtonText: this.LAN.cancel,
        type: 'warning'
      }).then(() => {
        updateGoodsData(this.form.goodsId).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success(this.LAN.updateSucces)
            this.getGoodsDetail()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.LAN.opaCancel
        })
      })
    },
    back () {
      this.$router.push({
        name: 'Goods',
        query: {
          layout: this.layout
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
