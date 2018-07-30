<template>
  <div id="Frame">
    <div class="container">
      <!--页头-->
      <yle-header></yle-header>
      <!--主体-->
      <section id="body">
        <!--侧边栏-->
        <section id="sidebar">
          <div class="visitData" @click="getVisitData">
            <el-tooltip effect="dark" content="当日访问数据-点击可刷新" placement="right">
              <div class="number">128</div>
            </el-tooltip>
          </div>
          <el-menu :router="vRouter" :default-active="activePage" class="elSidebar" :collapse="isCollapse">
            <el-menu-item :key="mitem.code" v-if="mitem.subMenu.length === 0" v-for="mitem in menuAuth" :index="mitem.href">
              <i :class="mitem.icon"></i>
              <span slot="title">{{mitem.name}}</span>
            </el-menu-item>
            <el-submenu :key="mitem.code" v-if="mitem.subMenu.length !== 0" v-for="mitem in menuAuth" :index="mitem.href">
              <template slot="title">
                <i :class="mitem.icon"></i>
                <span slot="title">{{mitem.name}}</span>
              </template>
              <el-menu-item :key = "sitem.code" v-for="sitem in mitem.subMenu" :index="sitem.href">{{sitem.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </section>
        <!--主页面-->
        <section id = "mainWarp">
          <div id="mainCotent">
            <router-view/>
          </div>
        </section>
      </section>
      <!--页脚-->
      <section @click="handleMenu" id = "footer">
        ©2017 苏州万店掌网络科技有限公司 苏ICP备16028066
      </section>
    </div>
  </div>
</template>
<script>
import {getSession} from './proxy'
import YleHeader from '../../libs/header/yleHeader'
export default {
  name: 'frame',
  components: {
    YleHeader
  },
  data () {
    return {
      activePage: this.$route.path, // 当前活动页
      vRouter: true, // 启用 vue-router 的模式
      isCollapse: false, // 侧边栏折叠状态
      menuAuth: []
    }
  },
  watch: {
    '$route' (val) {
      this.activePage = val.path
    }
  },
  mounted () {
    this.getSession()
  },
  methods: {
    getSession () { // 获取会话信息
      getSession().then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.menuAuth = res.data.auth || []
        } else { // 说明没有登录
          this.$router.push('/login')
        }
      })
    },
    handleMenu () { // 切换菜单折叠状态
      this.isCollapse = !this.isCollapse
    },
    getVisitData () { // 获取当日访问数据
      console.log('11')
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
