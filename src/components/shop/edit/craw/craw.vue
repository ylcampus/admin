<template>
  <div id="CrawView">
    <div class="content">
      <div class="crawPart">
        <div class="opaArea">
          <div class="leftPart">
            <el-button size="mini" @click="visible = true">{{LAN.crawData}}</el-button>
            <el-button style="margin-left:0;" @click="refershCrawData" size="mini">{{LAN.refresh}}</el-button>
          </div>
          <div class="rightPart">
            <div class="shopName">
              <span>{{shopName}}</span>
              <span class="txt">(当前商品<span class="num">{{current}}</span>)</span>
            </div>
          </div>
        </div>
        <div class="panelArea">
          <div class="totalMsg">
            <div class="leftPart">
              <img :src="pic">
            </div>
            <div class="rightPart">
              <div class="topArea">
                <div class="tItem">已花费时间：{{usedTime}}</div>
                <div class="tItem">预计剩余时间：{{remindTime}}</div>
              </div>
              <div class="bottomArea">
                <div class="item">
                  <div class="txt">{{LAN.totalResults}}</div>
                  <div class="num">{{crawData.totalResults}}</div>
                </div>
                <div class="item">
                  <div class="txt">{{LAN.totalPage}}</div>
                  <div class="num">{{crawData.totalPage}}</div>
                </div>
                <div class="item">
                  <div class="txt">{{LAN.pageSize}}</div>
                  <div class="num">{{crawData.pageSize}}</div>
                </div>
                <div class="item">
                  <div class="txt">{{LAN.currentPage}}</div>
                  <div class="num">{{crawData.currentPage}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="goodsMsg">
            <div class="gItem">
              <div class="column">
                <div class="label">{{LAN.updateSuccess}}</div>
                <div class="num success">{{crawData.updateSuccess}}</div>
              </div>
              <div class="column">
                <div class="label">{{LAN.updateFailed}}</div>
                <div class="num failed">{{crawData.updateFailed}}</div>
              </div>
              <div class="column">
                <div class="label">{{LAN.notUpdate}}</div>
                <div class="num">{{crawData.notUpdate}}</div>
              </div>
            </div>
            <div class="gItem">
              <div class="column w50">
                <div class="label">{{LAN.addSuccess}}</div>
                <div class="num success">{{crawData.addSuccess}}</div>
              </div>
              <div class="column w50" style="border-right:none;">
                <div class="label">{{LAN.addFailed}}</div>
                <div class="num failed">{{crawData.addFailed}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="consoleArea" id="consoleArea">
          <div v-show ="consoleList.length === 0" class="nodata">{{LAN.noData}}</div>
          <div v-show ="consoleList.length !== 0" class="inner">
            <div class="row" v-for="(row, index) in consoleList" :key="index">
              <div class="time">{{row.time}}</div>
              <div v-if="row.flag === 'start' || row.flag === 'end'" class="msg">{{row.msg}}</div>
              <div v-if="row.flag === 'detail'" class="shop" :title="row.shopName">{{row.shopName}}</div>
              <div v-if="row.flag === 'detail'" class="goods" :title="row.goodsName">{{row.goodsName}}</div>
              <div v-if="row.flag === 'detail'" class="status">
                <span class="success" v-if="row.execStatus === 1">{{LAN.updateSuccess}}</span>
                <span class="failed" v-if="row.execStatus === 2">{{LAN.updateFailed}}</span>
                <span class="notUpdate" v-if="row.execStatus === 3">{{LAN.notUpdate}}</span>
                <span class="success" v-if="row.execStatus === 4">{{LAN.addSuccess}}</span>
                <span class="failed" v-if="row.execStatus === 5">{{LAN.addFailed}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="logPart" ref="logPart">
        <div class="opaArea">
          <el-button icon="el-icon-refresh" size="mini" @click="getLogData" plain></el-button>
        </div>
        <div class="listArea">
          <el-table
            :data="logList"
            :height = "tableHeight"
            stripe>
            <el-table-column
              :label="LAN.date"
              prop="date" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              :label="LAN.shopName"
              prop="shopName" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column
              :label="LAN.goodsName"
              prop="goodsName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              :label="LAN.execStatus"
              prop="execStatus" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if = "scope.row.execStatus === 1" class="yle_color_green">{{LAN.updateSuccess}}</span>
                <span v-else-if = "scope.row.execStatus === 2" class="yle_color_red">{{LAN.updateFailed}}</span>
                <span v-else-if = "scope.row.execStatus === 3" class="yle_color_yellow">{{LAN.notUpdate}}</span>
                <span v-else-if = "scope.row.execStatus === 4" class="yle_color_green">{{LAN.addSuccess}}</span>
                <span v-else-if = "scope.row.execStatus === 5" class="yle_color_red">{{LAN.addFailed}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--分页-->
        <section class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="filter.pageNo"
            :page-sizes="[20, 25, 50, 100]"
            :page-size="filter.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </section>
      </div>
    </div>
    <el-dialog
      title="密码验证"
      :visible="visible"
      width="450px"
      @close="visible = false"
      :close-on-click-modal="false"
      id="PWD_Validate_Dialog">
      <div class="PWDModal">
        <el-form
          :model="form"
          :rules="pwdRules"
          ref="pwdForm">
          <el-form-item prop="pwd">
            <el-input placeholder="请输入验证密码" type="password" v-model="form.pwd"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="crawGoodsData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {sha256} from 'js-sha256'
import {getDateAndTime, getDateTxt, calcTime} from '@/libs/util'
import {crawData, getCrawLogData} from '../../proxy'
import {validatePwd} from '@/libs/validate'
import WS from './socket'
import LAN from '@/libs/il8n'
import {host, port} from '@/libs/config'
const gpic = require('../../../../assets/img/noPic.png')
export default {
  name: 'Craw',
  props: {
    shopName: {
      type: String,
      default: ''
    },
    shopId: {
      type: String,
      default: ''
    }
  },
  computed: {
    current () {
      let back = '--'
      if ((typeof this.crawData.updateSuccess) === 'number') {
        back = this.crawData.updateSuccess +
          this.crawData.updateFailed +
          this.crawData.notUpdate +
          this.crawData.addSuccess +
          this.crawData.addFailed
      }
      return back
    },
    pic () { // 商品图片
      let back = gpic
      if (this.crawData.pic) {
        back = `${host}:${port}/${this.crawData.pic}`
      }
      return back
    },
    usedTime () { // 已花费时间
      let timeStamp = 0
      if (this.crawData.originTime) {
        timeStamp = parseInt(this.crawData.timeStamp, 10) - parseInt(this.crawData.originTime)
      }
      let timeMap = calcTime(timeStamp)
      return `${timeMap.hour}时${timeMap.minute}分${timeMap.second}秒`
    },
    remindTime () { // 剩余时间
      let tackTime = 0
      if (this.crawData.originTime) {
        tackTime = parseInt(this.crawData.timeStamp, 10) - parseInt(this.crawData.originTime)
      }
      let currentNum = this.crawData.updateSuccess +
        this.crawData.updateFailed +
        this.crawData.notUpdate +
        this.crawData.addSuccess +
        this.crawData.addFailed
      let current = currentNum || 1
      let argvTime = tackTime / current
      const total = parseInt(this.crawData.totalResults, 10)
      let remindStamp = parseInt((total - currentNum) * argvTime, 10)
      let timeMap = calcTime(remindStamp)
      return `${timeMap.hour}时${timeMap.minute}分${timeMap.second}秒`
    }
  },
  watch: {
    '$store.state.windowHeight' () {
      this.tableHeight = this.$refs.logPart.clientHeight - 105
    },
    visible (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.pwdForm.resetFields()
        })
      }
    }
  },
  data () {
    return {
      LAN: LAN.enterShop.craw,
      visible: false,
      ws: null,
      form: {
        pwd: null
      },
      pwdRules: {
        pwd: [
          {
            validator: validatePwd,
            trigger: 'blur'
          }
        ]
      },
      crawData: { // 爬虫数据
        goodsName: '--', // 商品名称
        totalResults: 0, // 总商品数
        totalPage: 0, // 总页数
        pageSize: 0, // 每页商品数
        currentPage: 0, // 当前页
        updateSuccess: 0, // 更新成功
        updateFailed: 0, // 更新失败
        notUpdate: 0, // 未更新
        addSuccess: 0, // 添加成功
        addFailed: 0, // 添加失败
        execStatus: '--', // 执行状态 1：更新成功 2：更新失败 3：未更新 4：新增成功 5：新增失败
        pic: null, // 商品图片
        timeStamp: (new Date()).getTime(), // 当前时间
        originTime: (new Date()).getTime() // 爬虫程序启动时间
      },
      filter: {
        pageNo: 1,
        pageSize: 15
      },
      cacheCrawData: {},
      logList: [], // 执行日志
      consoleList: [], // 控制台
      tableHeight: 50,
      rows: [],
      total: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.logPart.clientHeight - 105
      this.cacheCrawData = JSON.stringify(this.crawData)
    })
    // 监听socket数据
    WS.onmessage = (e) => {
      let objMap = JSON.parse(e.data)
      if (this.$route.name === 'EditShop' && objMap.shopId === this.shopId) {
        this.updateEmitMsg(objMap)
      }
    }
    // 获取执行日志数据
    this.getLogData()
  },
  methods: {
    updateEmitMsg (map) { // 更新数据
      this.crawData = {...this.crawData, ...map}
      let msgTxt = ''
      if (map.flag === 'start') {
        msgTxt = this.LAN.startCraw
      } else if (map.flag === 'end') {
        msgTxt = this.LAN.crawEnd
      }
      let consoleMap = {
        time: getDateAndTime(parseInt((new Date().getTime()), 10)),
        shopName: map.shopName,
        goodsName: map.goodsName,
        execStatus: parseInt(map.execStatus, 10),
        msg: msgTxt,
        flag: map.flag
      }
      this.consoleList.push(consoleMap)
      this.$nextTick(() => {
        const consoleHeight = document.getElementById('consoleArea').clientHeight
        const scrollHeight = document.getElementById('consoleArea').scrollHeight
        document.getElementById('consoleArea').scrollTo(consoleHeight, scrollHeight - consoleHeight)
      })
    },
    crawGoodsData () {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          let params = {
            shopId: this.shopId,
            pwd: sha256(this.form.pwd)
          }
          this.crawData = JSON.parse(this.cacheCrawData)
          this.consoleList = []
          crawData(params).then((res) => {
            if (res.code * 1 === 0) {
              this.$message.success(this.LAN.crawStarted)
              this.visible = false
            }
          })
        } else {
          return false
        }
      })
    },
    getPageData () { // 获取前端分页
      let skip = (this.filter.pageNo - 1) * this.filter.pageSize
      let originData = JSON.parse(JSON.stringify(this.rows))
      let pageData = originData.splice(skip, this.filter.pageSize)
      let target = pageData.map(row => {
        row.date = getDateTxt(row.timeStamp)
        return row
      })
      this.logList = target
    },
    refershCrawData () { // 刷新爬虫数据
      this.crawData = JSON.parse(this.cacheCrawData)
      this.consoleList = []
      this.$message.success(this.LAN.refreshed)
    },
    getLogData () { // 获取日志数据
      getCrawLogData(this.shopId).then(res => {
        if (res.code * 1 === 0 && res.data) {
          this.rows = res.data.rows || []
          this.getPageData()
          this.total = res.data.total
        }
      })
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getPageData()
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./style.scss";
</style>
<style lang="scss">
  .PWDModal{
    margin-top: 10px;
    padding: 0 15px;
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
