<template>
  <div id="EditShop">
    <div class="yle_tabs_title">
      <el-button icon="el-icon-back" size="mini" @click="$router.push('/shop')">{{LAN.back}}</el-button>
      <span class="txt">{{tabsTitle}}</span>
    </div>
    <div class="warpMain">
      <el-tabs v-model="activeTabs" type="card" @tab-click="tabsClick">
        <el-tab-pane name="1" :value="LAN.baseMsg">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.baseMsg}}</span>
          <div class="editAreas">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" size="small">
              <el-form-item :label="LAN.shopName">{{form.name}}</el-form-item>
              <el-form-item :label="LAN.shopId">{{form.shopId}}</el-form-item>
              <el-form-item :label="LAN.host">{{form.host}}</el-form-item>
              <el-form-item :label="LAN.skuid">{{form.skuId}}</el-form-item>
              <el-form-item :label="LAN.brand">{{form.brand}}</el-form-item>
              <el-form-item :label="LAN.linkman">{{form.linkman}}</el-form-item>
              <el-form-item :label="LAN.telephone">{{form.telephone}}</el-form-item>
              <el-form-item :label="LAN.email">{{form.email}}</el-form-item>
              <el-form-item :label="LAN.campany">{{form.company}}</el-form-item>
              <el-form-item :label="LAN.address">{{form.address}}</el-form-item>
              <el-form-item :label="LAN.desc" prop="desc">
                <el-input rows = "4" type="textarea" v-model="form.desc" :placeholder="LAN.descHolder"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">{{LAN.save}}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" :value="LAN.chart">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.chart}}</span>
          <div class="graphAreas">
            <el-form label-width="100px" size="small">
              <el-form-item :label="LAN.trademark">
                <div class="picArea logo">
                  <img src="../../../assets/img/shop/logo.jpg">
                </div>
              </el-form-item>
              <el-form-item :label="LAN.banner">
                <div class="picArea banner">
                  <img src="../../../assets/img/shop/banner.jpg">
                </div>
              </el-form-item>
              <el-form-item :label="LAN.authority">
                <div class="picArea authority">
                  <img src="../../../assets/img/shop/authority.jpg">
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3" :value="LAN.brief">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.brief}}</span>
          <div class="briefAreas">
            <p v-if="form.brief"></p>
            <div class="noData" v-else>{{LAN.noData}}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="4" :value="LAN.release">
          <span slot="label"><i class="el-icon-date"></i>{{LAN.release}}</span>
          <div class="crawAreas">
            <craw-view :shopName.sync="form.name" :shopId.sync="form.shopId"></craw-view>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {getShopDetail, editShop} from '../proxy'
import {checkSpecialChar} from '../../../libs/validate'
import crawView from './craw/craw'
import LAN from '@/libs/il8n'
export default {
  name: 'EditShop',
  components: {
    crawView
  },
  data () {
    return {
      LAN: LAN.enterShop.edit,
      activeTabs: '4',
      tabsTitle: LAN.enterShop.edit.baseMsg,
      form: {
        shopId: '--', // 店铺Id
        host: '--', // 域名
        skuId: '--', // skuId
        name: '--', // 店铺名称
        linkman: '--', // 联系人
        telephone: '--', // 联系电话
        email: '--', // 电子邮件
        company: '--', // 公司名称
        address: '--', // 公司地址
        brand: '--', // 品牌
        desc: '', // 描述
        brief: '', // 品牌简介
        logo: '', // 商标
        banner: '', // 横幅
        authority: '' // 授权证书
      },
      rules: {
        desc: [ // 描述
          {
            min: 0,
            max: 255,
            message: LAN.enterShop.edit.descError,
            trigger: 'blur'
          },
          {
            validator: checkSpecialChar,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.getShopDetail()
  },
  methods: {
    getShopDetail () { // 获取店铺详情数据
      let shopId = this.$route.query.shopId
      getShopDetail(shopId).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.form = {...this.form, ...res.data}
        }
      })
    },
    tabsClick (tab) {
      this.tabsTitle = tab.$attrs.value
    },
    submitForm () { // 提交店铺信息
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            shopId: this.form.shopId
          }
          if (this.form.desc) {
            params.desc = this.form.desc
          }
          editShop(params).then((res) => {
            if (res.code * 1 === 0) {
              this.$message.success(this.LAN.editSuccess)
              this.getShopDetail()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "style";
</style>

<style lang="scss">
  #EditShop{
    .el-tabs{
      height:100%;
      .el-tabs__content{
        height:calc(100% - 60px);
        .el-tab-pane{
          height:100%;
          overflow-y: auto;
        }
      }
    }
  }
</style>
