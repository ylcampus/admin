<template>
  <div id="LinkUs">
    <div class="inner">
      <div class="title">{{LAN.title}}</div>
      <div class="body">
        <div id="linkUsForm">
          <div class="condition">{{LAN.address}}</div>
          <div class="forByPhoneDes">{{LAN.forByPhoneDes}}</div>
          <div class="condition">{{LAN.linkmanTxt}}</div>
          <div class="forByPhoneDes">{{LAN.linkman}}</div>
          <div class="condition">{{LAN.telTxt}}</div>
          <div class="forByPhoneDes">{{LAN.tel}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LAN from '@/libs/il8n'
export default {
  name: 'LinkUs',
  data () {
    return {
      LAN: LAN.protal.book.linkUs
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="scss">
  @import "style";
</style>
