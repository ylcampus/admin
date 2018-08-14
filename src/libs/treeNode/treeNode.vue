<template>
  <div class="nodetree">
    <span class="normal-node">
      <template v-if="treedata.sig&&treedata.sig==='load'">
        <el-button type = "iconButton" :loading="true">{{LAN.loadding}}</el-button>
      </template>
      <template v-else>
        <overflow :title="treenode.label" :length="10"></overflow>
      </template>
    </span>
  </div>
</template>
<script>
import {getStoreTree} from './proxy'
import LAN from '@/libs/il8n'
let id = 1000
export default {
  props: {
    treenode: Object,
    treedata: {
      type: Object,
      default: {
        nodeId: '',
        nodeName: '',
        parentId: '',
        type: '0'
      }
    },
    treestore: Object,
    flag: {
      type: String,
      default: 'store' // 默认既获取区域有获取门店
    }
  },
  mounted () {
    if (this.tree.type === '0') {
      this.treenode.isLeaf = false
      this.treenode.expanded = (this.treenode.childNodes.length !== 0)
    }
    // 其他
    // import overflow from '@/libs/overflow/index'
    // Vue.component('overflow', overflow)
  },
  watch: {
    'treenode.expanded' (val) {
      if (val && this.treedata.type === '0' this.treenode.childNodes.length === 0) {
        if (!this.treedata.subAreas) {
          this.treedata.subAreas = []
        }
        this.treedata.subAreas.push({
          nodeId: id++,
          nodeName: 'loading',
          sig: 'load',
          type: 0
        })
        this.treenode.updateChildren()
        getStoreTree({areaId: this.treedata.nodeId}).then(res => {
          if (res.code * 1 === 0) {
            let arr = res.data || []
            if (this.flag === 'area') {
              arr = arr.filter((row) => {
                return row.type === '0'
              })
            }
            this.treedata.subAreas = arr
            this.treenode.updateChildren()
          }
        })
      }
    }
  },
  data () {
    return {
      LAN: LAN.common,
    }
  },
  methods: {
    renderContent(h, {node, data, store}) {
      return h('span', {class: 'el-tree-node__label'}, [
        h(treeNode, {
          props: {
            treenode: node,
            treedata: data,
            treestore: store,
            flag: 'area'
          }
        })
      ])
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
