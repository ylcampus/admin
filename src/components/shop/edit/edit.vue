<template>
  <div id="EditShop">
    <div class="yle_tabs_title">
      <el-button icon="el-icon-back" size="mini" @click="$router.push('/shop')">返回</el-button>
      <span class="txt">{{tabsTitle}}</span>
    </div>
    <div class="warpMain">
      <el-tabs v-model="activeTabs" type="card" @tab-click="tabsClick">
        <el-tab-pane name="1" value="基本信息">
          <span slot="label"><i class="el-icon-date"></i>基本信息</span>
          <div class="editAreas">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" size="small">
              <el-form-item label="店铺名称">{{form.name}}</el-form-item>
              <el-form-item label="店铺Id">{{form.shopId}}</el-form-item>
              <el-form-item label="域名">{{form.host}}</el-form-item>
              <el-form-item label="skuId">{{form.skuId}}</el-form-item>
              <el-form-item label="品牌">{{form.brand}}</el-form-item>
              <el-form-item label="联系人">{{form.linkman}}</el-form-item>
              <el-form-item label="联系电话">{{form.telephone}}</el-form-item>
              <el-form-item label="电子邮件">{{form.email}}</el-form-item>
              <el-form-item label="公司名称">{{form.company}}</el-form-item>
              <el-form-item label="公司地址">{{form.address}}</el-form-item>
              <el-form-item label="描述" prop="desc">
                <el-input rows = "4" type="textarea" v-model="form.desc" placeholder="请输入品牌简介信息"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">保存修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" value="图文数据">
          <span slot="label"><i class="el-icon-date"></i>图文数据</span>
          <div class="graphAreas">
            <el-form label-width="100px" size="small">
              <el-form-item label="商标">
                <div class="picArea logo">
                  <img src="../../../assets/img/shop/logo.jpg">
                </div>
              </el-form-item>
              <el-form-item label="横幅">
                <div class="picArea banner">
                  <img src="../../../assets/img/shop/banner.jpg">
                </div>
              </el-form-item>
              <el-form-item label="授权证明">
                <div class="picArea authority">
                  <img src="../../../assets/img/shop/authority.jpg">
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3" value="品牌简介">
          <span slot="label"><i class="el-icon-date"></i>品牌简介</span>
          <div class="briefAreas">
            <p v-if="form.brief"></p>
            <div class="noData" v-else>暂无数据</div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="4" value="商品发布">
          <span slot="label"><i class="el-icon-date"></i>商品发布</span>
          <div class="crawAreas">
            <craw-view></craw-view>
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
export default {
  name: 'EditShop',
  components: {
    crawView
  },
  data () {
    return {
      activeTabs: '4',
      tabsTitle: '基本信息',
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
            message: '长度在 1 到 255 个字符',
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
              this.$message.success('店铺编辑成功')
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
<style scoped lang="scss">
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
