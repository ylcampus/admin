<template>
  <div id="File">
    <!--操作面板-->
    <section class="operation">
      <div class="item">
        <el-checkbox v-model="selectAll">全选</el-checkbox>
      </div>
      <div class="item">
        <el-button icon="el-icon-plus" plain disabled>删除</el-button>
      </div>
    </section>
    <!--面包屑-->
    <section class="breadWarp">
      <div class="inner">
        <div class="bread">
          <div
            class="item"
            :key="key"
            @click = "breadHandle(item)"
            v-for="(item, key) in breadList">{{item.name}}</div>
        </div>
      </div>
    </section>
    <!--文件列表-->
    <section class="filsList" ref="filsList">
      <el-popover
        v-if="fileList.length !== 0"
        placement="right-start"
        :title="item.flag === 'dir' ? '文件夹': '文件'"
        :key="key"
        v-bind:open-delay="2000"
        v-for="(item, key) in fileList"
        trigger="hover">
        <div class="yle-file_msgBox">
          <div class="fItem">文件名称：{{item.name}}</div>
          <div class="fItem">类型：
            <span v-if="item.flag === 'dir'">文件夹</span>
            <span v-else>文件</span>
          </div>
          <div class="fItem">路径：{{item.path}}</div>
          <div class="fItem">创建时间：{{item.birthtime}}</div>
        </div>
        <div class="item" @dblclick = "openDir(item)" slot="reference">
          <div class="icon">
            <span v-if="item.flag === 'dir'" class="yle-file yle-file-folder"></span>
            <span v-else-if="item.type === 'xlsx'" class="yle-file yle-file-excel"></span>
            <span v-else-if="item.type === 'zip'" class="yle-file yle-file-zip"></span>
            <span v-else-if="item.type === 'txt'" class="yle-file yle-file-txt"></span>
            <span v-else-if="item.type === 'pdf'" class="yle-file yle-file-pdf"></span>
            <span v-else class="yle-file yle-file-file"></span>
          </div>
          <div class="fileName">{{item.name}}</div>
          <div class="mask" v-if="item.flag == 'file'">
            <div class="inner">
              <a class="download icon" :href="item.href"></a>
              <a v-if="item.type === 'txt' || item.type === 'pdf'" :href="item.preview" target="_blank" class="preview icon"></a>
            </div>
          </div>
        </div>
      </el-popover>
      <!--暂无数据-->
      <div class="yle-nodata" v-if="fileList.length === 0">暂无数据</div>
    </section>
    <!--文件数统计-->
    <div class="filsTotal">共计{{fileList.length}}个对象</div>
  </div>
</template>
<script>
import {readDir} from './proxy'
export default {
  name: 'file',
  data () {
    return {
      selectAll: false,
      dir: '', // 当前路径
      fileList: [] // 文件列表
    }
  },
  computed: {
    breadList () { // 面包屑导航
      let backArr = []
      if (this.dir) {
        let arr = this.dir.split('\\\\')
        let dirArr = []
        for (let i = 0; i < arr.length; i++) {
          if (i < arr.length) {
            dirArr.push(arr[i])
          }
          let map = {}
          map.name = arr[i]
          map.dir = dirArr.join('\\\\')
          backArr.push(map)
        }
      } else {
        backArr = [
          {
            name: 'system',
            dir: ''
          }
        ]
      }
      return backArr
    }
  },
  watch: {
    'store.state.windowWidth' (val) { // 监听窗口高度
      console.log(this.$refs.filsList)
    }
  },
  mounted () {
    this.readDir()
    /*
    * 还有如下几项任务没有处理
    * 2：文件删除 - 透传
    * 4：文件宽度自适应
    * */
  },
  methods: {
    readDir () {
      readDir({dir: this.dir}).then((res) => {
        if (res.code * 1 === 0) {
          let result = res.data || []
          this.fileList = result.map((row) => {
            row.href = location.origin + '/api/file/download?path=' + row.path
            row.preview = location.origin + '/api/file/preview?path=' + row.path
            return row
          })
        }
      })
    },
    rmDir () {},
    openDir (item) { // 打开文件夹
      this.dir = item.path
      if (item.flag === 'dir') {
        this.readDir()
      }
    },
    breadHandle (item) {
      this.dir = item.dir
      this.readDir()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  .yle-file_msgBox{
    background: #f0f0f0;
    padding: 8px;
  }
</style>
