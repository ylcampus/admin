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
            <div class="title">{{LAN.product}}</div>
            <div class="subTitle">{{LAN.productDesc}}</div>
          </div>
          <div class="cardArea">
            <div class="item">
              <div class="pic">
                <div class="logo logo1"></div>
              </div>
              <div class="title">{{LAN.way}}</div>
              <div class="desc">{{LAN.wayDesc}}</div>
            </div>
            <div class="item">
              <div class="pic">
                <div class="logo logo2"></div>
              </div>
              <div class="title">{{LAN.mark}}</div>
              <div class="desc">{{LAN.markDesc}}</div>
            </div>
            <div class="item">
              <div class="pic">
                <div class="logo logo3"></div>
              </div>
              <div class="title">{{LAN.data}}</div>
              <div class="desc">{{LAN.dataDesc}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--入驻企业-->
      <div class="brand">
        <div class="inner">
          <div class="bArea">
            <div class="title">{{LAN.cooperative}}</div>
            <div class="subTitle">{{LAN.cooperativeDesc}}</div>
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
import LAN from '@/libs/il8n'
export default {
  name: 'ProtalFrame',
  components: {
    YleHeader,
    YleFooter
  },
  data () {
    return {
      LAN: LAN.protal,
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
