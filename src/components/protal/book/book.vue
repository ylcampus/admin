<template>
  <div id="ProtalBook">
    <div class="inner">
      <div id="sidebar">
        <h2 class="title">{{LAN.title}}</h2>
        <div class="sideBody">
          <router-link v-bind:class="{ active: pageName === 'Statement' }" class="item" to="/statement">{{LAN.statement}}</router-link>
          <router-link v-bind:class="{ active: pageName === 'UserBook' }" class="item" to="/userBook">{{LAN.userBook}}</router-link>
          <router-link v-bind:class="{ active: pageName === 'LinkUs' }" class="item" to="/linkUs">{{LAN.linkUs}}</router-link>
        </div>
      </div>
      <div id="mainWarp">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import LAN from '@/libs/il8n'
export default {
  name: 'ProtalBook',
  data () {
    return {
      LAN: LAN.protal.book,
      pageName: this.$route.name // 当前活动页
    }
  },
  watch: {
    '$route' (val) {
      this.pageName = val.name
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
