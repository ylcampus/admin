<template>
  <div id="YleHeader">
    <div class="warpLeft">
      <!--商城logo-->
      <div class="web-logo">
        <router-link to="/">优乐校园</router-link>
      </div>
      <!--网站导航-->
      <div v-if = "account" @mouseenter = "hoverMenu(1)" @mouseleave = "hoverMenu(2)" class="yle-header-item">
        <div class="yle-dropdown navigation">
          <div class="txt">
            <i class="yle-icon yle-icon-menu"></i>
            <span>网站导航</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </div>
          <div v-bind:style="{height: mheight + 'px'}" class="menu">
            <div class="navigationInner">
              <div class="mitem" v-for="mitem in auth" :key="mitem.code">
                  <span class="module" @click="toPage(mitem)">
                    <a>{{mitem.name}}</a>
                  </span>
                  <div v-if = "mitem.subMenu.length" class="pmenu">
                    <a @click="toPage(sitem)" v-for="sitem in mitem.subMenu" :key="sitem.code" class="pitem">{{sitem.name}}</a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-tools">
      <!--帮助中心-->
      <router-link class="yle-header-item normal" to="/userBook">协议声明</router-link>
      <div class="v-line"></div>
      <!--下载中心-->
      <div class="yle-header-item">
        <div class="yle-dropdown load">
          <div class="txt">
            <span>下载中心</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </div>
          <div class="menu">
            <div class="inner">
              <div class="lItem">
                <div class="warp">
                  <div class="pic android"></div>
                  <div class="desc">
                    <div class="title">安卓客户端</div>
                    <div class="version">v1.0.0</div>
                  </div>
                </div>
              </div>
              <div class="lItem">
                <div class="warp">
                  <div class="pic ios"></div>
                  <div class="desc">
                    <div class="title">IOS客户端</div>
                    <div class="version">v1.0.0</div>
                  </div>
                </div>
              </div>
              <div class="r-line"></div>
              <div class="lItem">
                <a href="http://192.168.1.15:8080/api/file/preview?path=test.pdf" target="_blank">用户手册</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="v-line"></div>
      <!--语言-->
      <div class="yle-header-item">
        <div class="yle-dropdown lang">
          <div class="txt">
            <i v-bind:class="languageClass" class="header-icon"></i>
            <span>{{language}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </div>
          <div class="menu">
            <div class="inner">
              <div class="nItem" @click="hansleLangule(1)">
                <a>中文（简体）</a>
              </div>
              <div class="nItem" @click="hansleLangule(2)">
                <a>English（英文）</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--个人中心-->
      <div class="v-line"></div>
      <div v-if = "account" class="yle-header-item" @mouseenter = "hoverLogin(1)" @mouseleave = "hoverLogin(2)">
        <div class="yle-dropdown personal">
          <div class="txt">
            <i class="yle-icon yle-icon-user"></i>
            <span>{{account}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </div>
          <div v-bind:style="{height: lheight + 'px'}" class="menu">
            <div class="inner">
              <div class="nItem" @click="handleCommand('personal')">
                <a>个人中心</a>
              </div>
              <div class="nItem" @click="handleCommand('msg')">
                <a>消息（0）</a>
              </div>
              <div class="nItem" @click="handleCommand('loginOut')">
                <a>退出</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--登录-->
      <router-link v-if = "!account" class="yle-header-item login" to="/login">登录</router-link>
    </div>
  </div>
</template>
<script>
import {getSession, loginOut} from './proxy'
export default {
  name: 'YleHeader',
  data () {
    return {
      mheight: 0,
      lheight: 0,
      account: null, // 用户账号
      language: localStorage.getItem('language') || '中文（简体）',
      languageClass: localStorage.getItem('languageClass') || 'header-icon-lang-zh',
      auth: [] // 权限列表
    }
  },
  mounted () {
    // 获取用户会话信息
    getSession().then((res) => {
      if (res.code * 1 === 0 && res.data) {
        this.account = res.data.account
        this.auth = res.data.auth || []
      } else {
        // 需要登录才可以进入的页面，但没有登录的情况
        if (this.$route.meta.require) {
          this.$router.push('/login')
        }
      }
    })
  },
  methods: {
    hoverMenu (flag) { // 页面切换
      this.mheight = (flag === 1) ? 350 : 0
    },
    hoverLogin (flag) {
      this.lheight = (flag === 1) ? 150 : 0
    },
    hansleLangule (flag) { // 语言切换
      if (flag === 1) {
        localStorage.setItem('language', '中文（简体）')
        localStorage.setItem('languageClass', 'header-icon-lang-zh')
      } else if (flag === 2) {
        localStorage.setItem('language', 'English（英文）')
        localStorage.setItem('languageClass', 'header-icon-lang-en')
      }
      window.location.reload()
    },
    handleCommand (flag) { // 登出消息与个人中心
      this.lheight = 0
      switch (flag) {
        case 'personal':
          this.$router.push('/personal')
          break
        case 'msg':
          break
        case 'loginOut':
          loginOut().then((res) => {
            if (res.code * 1 === 0) {
              this.$router.push('/login')
            }
          })
          break
        default:
          break
      }
    },
    toPage (item) {
      this.$router.push(item.href)
      this.mheight = 0
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
