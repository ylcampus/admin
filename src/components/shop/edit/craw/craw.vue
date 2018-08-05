<template>
  <div id="CrawView">
    <div class="content">
      <div class="crawPart">
        <div class="opaArea">
          <el-button size="mini" @click="crawGoodsData">爬取数据</el-button>
          <el-button style="margin-left:0;" @click="refershCrawData" size="mini">刷新</el-button>
        </div>
        <div class="panelArea">
          <div class="shopName">{{crawData.shopName}}</div>
          <div class="totalMsg">
            <div class="item big">
              <div class="txt">当前商品</div>
              <div class="num current">{{crawData.current}}</div>
            </div>
            <div class="item">
              <div class="txt">总商品数</div>
              <div class="num">{{crawData.totalResults}}</div>
            </div>
            <div class="item">
              <div class="txt">总页数</div>
              <div class="num">{{crawData.totalPage}}</div>
            </div>
            <div class="item">
              <div class="txt">每页商品数</div>
              <div class="num">{{crawData.pageSize}}</div>
            </div>
            <div class="item">
              <div class="txt">当前页</div>
              <div class="num">{{crawData.currentPage}}</div>
            </div>
          </div>
          <div class="goodsMsg">
            <div class="gItem">
              <div class="column">
                <div class="label">更新成功</div>
                <div class="num success">{{crawData.updateSuccess}}</div>
              </div>
              <div class="column">
                <div class="label">更新失败</div>
                <div class="num failed">{{crawData.updateFailed}}</div>
              </div>
              <div class="column">
                <div class="label">未更新</div>
                <div class="num">{{crawData.notUpdate}}</div>
              </div>
            </div>
            <div class="gItem">
              <div class="column w50">
                <div class="label">添加成功</div>
                <div class="num success">{{crawData.addSuccess}}</div>
              </div>
              <div class="column w50" style="border-right:none;">
                <div class="label">添加失败</div>
                <div class="num failed">{{crawData.addFailed}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="consoleArea" id="consoleArea">
          <div v-show ="consoleList.length === 0" class="nodata">暂无数据</div>
          <div v-show ="consoleList.length !== 0" class="inner">
            <div class="row" v-for="(row, index) in consoleList" :key="index">
              <div class="time">{{row.time}}</div>
              <div v-if="row.flag === 'start' || row.flag === 'end'" class="msg">{{row.msg}}</div>
              <div v-if="row.flag === 'detail'" class="shop" :title="row.shopName">{{row.shopName}}</div>
              <div v-if="row.flag === 'detail'" class="goods" :title="row.goodsName">{{row.goodsName}}</div>
              <div v-if="row.flag === 'detail'" class="status">
                <span class="success" v-if="row.execStatus === 1">更新成功</span>
                <span class="failed" v-if="row.execStatus === 2">更新失败</span>
                <span class="notUpdate" v-if="row.execStatus === 3">未更新</span>
                <span class="success" v-if="row.execStatus === 4">新增成功</span>
                <span class="failed" v-if="row.execStatus === 5">新增失败</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="logPart" ref="logPart">
        <div class="opaArea">
          <el-button icon="el-icon-refresh" size="mini" @click="refershLogData" plain></el-button>
        </div>
        <div class="listArea">
          <el-table
            :data="logList"
            :height = "tableHeight"
            stripe>
            <el-table-column
              label="执行时间"
              prop="time" width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="yle_color_blue yle_pointer">{{scope.row.time}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="店铺"
              prop="shopName" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column
              label="商品"
              prop="goodsName" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="执行状态"
              prop="execStatus" width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="yle_color_blue">更新成功</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getDateAndTime} from '@/libs/util'
import {getCrawValidCode, validCrawAuthority, crawData, getCrawLogData} from '../../proxy'
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
  watch: {
    '$store.state.windowHeight' () {
      this.tableHeight = this.$refs.logPart.clientHeight - 55
    },
    shopName (val) {
      this.crawData.shopName = val
    }
  },
  data () {
    return {
      crawData: { // 爬虫数据
        shopName: '--', // 店铺名称
        goodsName: '--', // 商品名称
        totalResults: '--', // 总商品数
        current: '--', // 当前商品
        totalPage: '--', // 总页数
        pageSize: '--', // 每页商品数
        currentPage: '--', // 当前页
        updateSuccess: '--', // 更新成功
        updateFailed: '--', // 更新失败
        notUpdate: '--', // 未更新
        addSuccess: '--', // 添加成功
        addFailed: '--', // 添加失败
        execStatus: '--' // 执行状态 1：更新成功 2：更新失败 3：未更新 4：新增 5：新增失败
      },
      cacheCrawData: {},
      logList: [], // 执行日志
      consoleList: [], // 控制台
      tableHeight: 50
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.logPart.clientHeight - 55
      this.cacheCrawData = JSON.stringify(this.crawData)
    })
    // 应该还有不少逻辑需要写
  },
  methods: {
    msgMake () { // 信号发生器
      let defaultMap = {
        shopName: '美津浓官方旗舰店',
        totalPage: '19',
        currentPage: 1,
        pageSize: '24',
        totalResults: '445',
        current: 20,
        goodsName: 'Mizuno美津浓男子跑步鞋轻便户外运动鞋男鞋春夏SPARK K1GR160302',
        timeStamp: '1533306581076',
        updateSuccess: 0,
        updateFailed: 0,
        notUpdate: 3,
        addSuccess: 0,
        addFailed: 0,
        execStatus: 3,
        flag: 'detail'
      }
      setInterval(() => {
        defaultMap.updateSuccess++
        this.updateEmitMsg(defaultMap)
      }, 2000)
    },
    updateEmitMsg (map) { // 更新数据
      this.crawData = {...this.crawData, ...map}
      let msgTxt = ''
      if (map.flag === 'start') {
        msgTxt = '开始爬取商品...'
      } else if (map.flag === 'end') {
        msgTxt = '爬取商品结束'
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
    crawGoodsData () { // 爬取商品数据
      this.msgMake()
      crawData().then((res) => {
        if (res.code * 1 === 0) {
          this.$message.success('爬虫程序已启动')
        }
      })
    },
    refershCrawData () { // 刷新爬虫数据
      this.crawData = JSON.parse(this.cacheCrawData)
      this.consoleList = []
    },
    refershLogData () { // 爬取日志数据
      console.log('爬取日志数据')
    }
  }
}
</script>
<style lang="scss">
  @import "./style.scss";
</style>
