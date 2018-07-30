<template>
  <div id="ProtalFrame">
    <!--页头-->
    <yle-header></yle-header>
    <!--主体-->
    <div id="content" v-show="pageName === 'ProtalFrame'">
      <!--走马灯-->
      <div class="carousel">
        <el-carousel :interval="30000" height="910px">
          <el-carousel-item>
            <div class="item pic1">
              <div class="test">
                <div class="items item1"></div>
                <div class="items">dsfs</div>
                <div class="items item1"></div>
                <div class="items">sdf</div>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="item pic2"></div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="item pic3"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--产品与服务-->
      <div class="product">
        <div class="inner">
          <div class="tArea">
            <div class="title">产品与服务</div>
            <div class="subTitle">精准.可控.高效.可持续</div>
          </div>
          <div class="cardArea">
            <div class="item">
              <div class="pic">
                <div class="logo logo1"></div>
              </div>
              <div class="title">可控的商品信息与品牌推广渠道</div>
              <div class="desc">使用云服务ECS、VPC、EVS、AS、ELB部署应用，搭建论坛网站</div>
            </div>
            <div class="item">
              <div class="pic">
                <div class="logo logo2"></div>
              </div>
              <div class="title">精准的市场定位</div>
              <div class="desc">使用微服务开发框架，将电商应用从原生Spring Boot和Go-kit迁移并部署到ServiceStage平台上</div>
            </div>
            <div class="item">
              <div class="pic">
                <div class="logo logo3"></div>
              </div>
              <div class="title">数据采集与量化分析</div>
              <div class="desc">使用机器学习服务，预测餐厅未来的销售量，为开设新餐厅提供决策依据。</div>
            </div>
          </div>
        </div>
      </div>
      <!--入驻企业-->
      <div class="brand">
        <div class="inner">
          <div class="bArea">
            <div class="title">合作伙伴展示</div>
            <div class="subTitle">共建和谐共赢的云生态，实现快速发展</div>
          </div>
          <div class="cardArea">
            <div class="inner">
              <div class="item">
                <img src="../../assets/img/protal/logo1.png">
              </div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--内容体-->
    <div id="protalWarp">
      <router-view/>
    </div>
    <!--页脚-->
    <yle-footer></yle-footer>
  </div>
</template>
<script>
import YleHeader from '../../libs/header/yleHeader'
import YleFooter from '../../libs/footer/yleFooter'
export default {
  name: 'ProtalFrame',
  components: {
    YleHeader,
    YleFooter
  },
  data () {
    return {
      pageName: this.$route.name // 当前活动页
    }
  },
  watch: {
    '$route' (val) {
      this.pageName = val.name
    }
  },
  mounted () {}
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
