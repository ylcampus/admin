<template>
  <div id="YleFooter">
    <div class="inner">
      <div class="topArea">
        <div class="footer-copyright">
          <span>版权所有 © 华为软件技术有限公司 2018</span>
          <span>保留一切权利</span>
          <a>苏ICP备17040376号-5</a>
          <span>苏B2-20130048号</span>
        </div>
        <div class="footer-law">
          <router-link to="/statement">法律声明</router-link>
          <span class="v-line"></span>
          <router-link to="/policy">隐私政策声明</router-link>
          <span class="v-line"></span>
          <router-link to="/aboutUs">关于我们</router-link>
          <span class="v-line"></span>
          <router-link to="/linkUs">联系我们</router-link>
          <span class="v-line"></span>
          <router-link to="/userBook">优乐商城用户协议</router-link>
        </div>
      </div>
      <div class="bottomArea">
        <i class="icon-record icon1"></i>
        <i class="icon-record icon2"></i>
        <span>苏公网安备 32011402010008号</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'YleFooter',
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
