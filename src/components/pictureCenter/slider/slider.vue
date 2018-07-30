<template>
  <div>
    <div class="movebox" id="movebox">
      <div class="movego"></div>
      <div class="txt">拖动滑块验证</div>
      <div class="move moveBefore" id="move" v-move></div>
    </div>
  </div>
  <!--<slider @changeCheckStatus="changeCheck" ref="sliderEvent"></slider>-->
</template>
<script>
export default {
  watch: {},
  data () {
    return {}
  },
  mounted () {},
  methods: {
    changeStatus () {
      if (document.querySelector('.moveSuccess')) {
        this.$emit('changeCheckStatus', true)
      } else {
        this.$emit('changeCheckStatus', false)
      }
    }
  },
  directives: {
    move (el, binding) {
      el.onmousedown = function (e) {
        let x = e.clientX - el.offsetLeft
        document.onmousemove = function (e) {
          let endx = e.clientX - x
          el.className = 'move moveBefore'
          el.style.left = endx + 'px'
          let width = document.getElementById('movebox').offsetWidth - document.getElementById('move').offsetWidth
          el.parentNode.children[0].style.width = endx + 'px'
          el.parentNode.childNodes[1].innerHTML = '拖动滑块验证'
          // 临界值小于
          if (endx <= 0) {
            el.style.left = 0 + 'px'
            el.parentNode.childNodes[0].style.width = 0 + 'px'
          }
          // 临界值大于
          if (parseInt(el.style.left) >= width) {
            el.style.left = width + 'px'
            el.parentNode.childNodes[0].style.width = width + 'px'
            el.parentNode.childNodes[1].style.color = 'white'
            el.parentNode.childNodes[1].innerHTML = '验证通过'
            el.className = 'move moveSuccess'
            el.innerHTML = '<i class="el-icon-circle=check"></i>'
            el.onmousedown = null
            document.onmousemove = null
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
