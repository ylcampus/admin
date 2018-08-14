<template>
  <div id="YleFooter">
    <div class="inner">
      <div class="topArea">
        <div class="footer-copyright">
          <span>{{LAN.copyright1}}</span>
          <span>{{LAN.copyright2}}</span>
          <a>{{LAN.copyright3}}</a>
          <span>{{LAN.copyright4}}</span>
        </div>
        <div class="footer-law">
          <router-link to="/statement">{{LAN.statement}}</router-link>
          <span class="v-line"></span>
          <router-link to="/policy">{{LAN.policy}}</router-link>
          <span class="v-line"></span>
          <router-link to="/aboutUs">{{LAN.aboutUs}}</router-link>
          <span class="v-line"></span>
          <router-link to="/linkUs">{{LAN.linkUs}}</router-link>
          <span class="v-line"></span>
          <router-link to="/userBook">{{LAN.userBook}}</router-link>
        </div>
      </div>
      <div class="bottomArea">
        <i class="icon-record icon1"></i>
        <i class="icon-record icon2"></i>
        <span>{{LAN.bottomArea}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import LAN from '@/libs/il8n'
export default {
  name: 'YleFooter',
  data () {
    return {
      LAN: LAN.frame.foolter
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
