<template>
  <div id="GoodsDetail">
    <div class="yle_tabs_title">
      <el-button icon="el-icon-back" size="mini" @click="$router.push('/goods')">返回</el-button>
      <span class="txt">{{tabsTitle}}</span>
    </div>
    <div class="warpMain">
      <el-tabs v-model="activeTabs" type="card" @tab-click="tabsClick">
        <el-tab-pane name="1" value="基本信息">
          <span slot="label"><i class="el-icon-date"></i>基本信息</span>
          <div class="tabsAreas">
            <el-form :model="form" label-width="100px" size="small">
              <el-form-item label="商品Id">{{form.goodsId}}</el-form-item>
              <el-form-item label="商品名称" class="yle_color_blue yle_pointer">{{form.title}}</el-form-item>
              <el-form-item label="价格">{{form.price}}</el-form-item>
              <el-form-item label="状态">
                <el-tag type="success" v-if = "form.status === 1">出售中</el-tag>
                <el-tag type="danger" v-else-if = "form.status === 2">库存中</el-tag>
                <span v-else>--</span>
              </el-form-item>
              <el-form-item label="更新状态">
                <span v-if = "form.updateStatus === 1">新建</span>
                <span v-else-if = "form.updateStatus === 2">更新成功</span>
                <span v-else-if = "form.updateStatus === 3">更新失败</span>
                <span v-else>--</span>
              </el-form-item>
              <el-form-item label="店铺名称" class="yle_color_blue yle_pointer">{{form.shopName}}</el-form-item>
              <el-form-item label="创建时间">{{form.create_at}}</el-form-item>
              <el-form-item label="最近更新时间">{{form.timeStamp}}</el-form-item>
              <el-form-item>
                <el-button @click="update">更新数据</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" value="SKU信息">
          <span slot="label"><i class="el-icon-date"></i>SKU信息</span>
          <div class="tabsAreas skuArea">
            <div class="picMsg">
              <div @click="colorSelect(item)"
                :key="key"
                v-bind:class="{'active': item.cId === activecId}"
                class="item" v-for="(item, key) in form.picList">
                <img :src="item.pic">
              </div>
            </div>
            <div class="skuMsg">
              <div :key="key" class="item" v-for="(item, key) in form.skuArr">
                <div class="row">
                  <span class="key">颜色(尺码)</span>
                  <span class="value">{{item.names}}</span>
                </div>
                <div class="row">
                  <span class="key">skuId</span>
                  <span class="value">{{item.skuId}}</span>
                </div>
                <div class="row">
                  <span class="key">库存</span>
                  <span class="value">{{item.stock}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3" value="描述信息">
          <span slot="label"><i class="el-icon-date"></i>描述信息</span>
          <div class="descArea">
            <div :key="key" class="item" v-for="(item, key) in form.descPics">
              <img :src="item">
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {getGoodsDetail, updateGoodsData} from '../proxy'
export default {
  name: 'GoodsDetail',
  data () {
    return {
      activeTabs: '1',
      tabsTitle: '基本信息',
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
      getGoodsDetail(goodsId).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
        }
        let picList = []
        let pics = this.form.pics
        for (let key in pics) {
          let rkey = key.split(';')[1]
          let map = {
            cId: rkey,
            pic: pics[key]
          }
          if (picList.length === 0) {
            this.activecId = rkey
          }
          picList.push(map)
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
    tabsClick (tab) {
      this.tabsTitle = tab.$attrs.value
    },
    colorSelect (row) { // 颜色选择
      this.activecId = row.cId
      this.form.skuArr = this.form.skuList.filter((item) => {
        return item.cId === row.cId
      })
    },
    update () { // 更新数据
      this.$confirm('确定要更新数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateGoodsData(this.form.goodsId).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('更新数据成功')
            this.getGoodsDetail()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
