<template>
  <div id="app">
    <div class="mask" v-show="loadingnum > 0">
      <div class="icon"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  data () {
    return {}
  },
  computed: {
    loadingnum: function () {
      return this.$store.state.loadingNum
    }
  }
}
</script>
<style lang="scss" scoped>
  .mask{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    .icon{
      position: relative;
      top: -16px;
      width: 32px;
      height: 32px;
      background-size: 32px 32px;
      background-repeat: no-repeat;
      background-image: url(../../assets/img/loading.svg);
      animation: rotating 2s linear infinite;
    }
  }
</style>
