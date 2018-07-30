<template>
  <div id="ProtalBook">
    <div class="inner">
      <div id="sidebar">
        <h2 class="title">声明.协议.文档</h2>
        <div class="sideBody">
          <router-link v-bind:class="{ active: pageName === 'Statement' }" class="item" to="/statement">法律声明</router-link>
          <router-link v-bind:class="{ active: pageName === 'UserBook' }" class="item" to="/userBook">优乐用户协议</router-link>
          <router-link v-bind:class="{ active: pageName === 'LinkUs' }" class="item" to="/linkUs">联系我们</router-link>
        </div>
      </div>
      <div id="mainWarp">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProtalBook',
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
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
