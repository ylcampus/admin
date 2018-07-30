<template>
  <div class="overflowhome" @mouseover="ifShow">
    <el-tooltip effect="dark" :content="title" :placement="placement" :disabled="hideTip">
      <span class="content" ref="content">{{title}}</span>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '80px'
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      hideTip: true
    }
  },
  watch: {
    title () {
      this.$nextTick(() => {
        this.ifShow()
      })
    }
  },
  mounted () {
    this.$refs.content.style.width = this.width
    this.ifShow()
    if (this.hideTip) {
      window.addEventListener('mousewheel', () => {
        this.hideTip = false
        this.debounce(100, () => {
          this.ifShow()
          setTimeout(() => {
            this.ifShow()
          }, 200)
        })
      })
    }
  },
  methods: {
    ifShow () {
      if (this.$refs.content.clientWidth >= this.$refs.content.scrollWidth) {
        this.hideTip = true
      } else {
        this.hideTip = false
      }
    },
    debounce (idle, action) {
      let last = ''
      return () => {
        let ctx = this
        let args = arguments
        clearTimeout(last)
        last = setTimeout(() => {
          action.apply(ctx, args)
        }, idle)
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
