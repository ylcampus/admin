<template>
  <div id="CrawView">
    <div class="content">
      <div class="crawPart">
        <div class="opaArea">
          <el-button size="mini">爬取数据</el-button>
          <el-button style="margin-left:0px;" size="mini">刷新</el-button>
        </div>
        <div class="panelArea">
          <div class="shopName">美津浓官方体验店</div>
          <div class="totalMsg">
            <div class="item big">
              <div class="txt">当前商品</div>
              <div class="num current">1</div>
            </div>
            <div class="item">
              <div class="txt">总商品数</div>
              <div class="num">445</div>
            </div>
            <div class="item">
              <div class="txt">总页数</div>
              <div class="num">19</div>
            </div>
            <div class="item">
              <div class="txt">每页商品数</div>
              <div class="num">24</div>
            </div>
            <div class="item">
              <div class="txt">当前页</div>
              <div class="num">1</div>
            </div>
          </div>
          <div class="goodsMsg">
            <div class="gItem">
              <div class="column">
                <div class="label">更新成功</div>
                <div class="num success">0</div>
              </div>
              <div class="column">
                <div class="label">更新失败</div>
                <div class="num failed">0</div>
              </div>
              <div class="column">
                <div class="label">未更新</div>
                <div class="num">0</div>
              </div>
            </div>
            <div class="gItem">
              <div class="column w50">
                <div class="label">添加成功</div>
                <div class="num success">0</div>
              </div>
              <div class="column w50" style="border-right:none;">
                <div class="label">添加失败</div>
                <div class="num failed">0</div>
              </div>
            </div>
          </div>
        </div>
        <div class="consoleArea" id="consoleArea">
          <div class="nodata">暂无数据</div>
          <!--<div class="row">-->
            <!--<div class="time">2018-08-09 09:00:00</div>-->
            <!--<div class="msg">开始爬取商品...</div>-->
          <!--</div>-->
          <!--<div class="row">-->
            <!--<div class="time">2018-08-09 09:00:00</div>-->
            <!--<div class="shop">美津浓官方体验店</div>-->
            <!--<div class="goods">Mizuno美津浓男子跑步鞋轻便户外运动鞋男鞋春夏SPARK K1GR160302</div>-->
            <!--<div class="status">-->
              <!--<span class="failed">更新失败</span>-->
              <!--&lt;!&ndash;<span class="success">更新成功</span>&ndash;&gt;-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="logPart">
        <div class="opaArea">
          <el-button icon="el-icon-refresh" size="mini" plain></el-button>
        </div>
        <div class="listArea">
          <el-table
            :data="logList"
            :height = "tableHeight"
            stripe>
            <el-table-column
              label="执行时间"
              prop="orderId" width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="yle_color_blue yle_pointer">{{scope.row.orderId}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="店铺"
              prop="status" width="100"></el-table-column>
            <el-table-column
              label="商品"
              prop="consignee" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="执行状态"
              prop="goodsName" width="80" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Craw',
  watch: {},
  data () {
    return {
      logList: [],
      tableHeight: 200
    }
  },
  mounted () {
    // 可以从这个地方入手开始了
    // 示例文本 2018-08-09 09:00:00 美津浓官方体验店 Mizuno美津浓男子跑步鞋轻便户外运动鞋男鞋春夏SPARK K1GR160302 更新成功
    // return {
    //   shopName: this.shopName,
    //   totalPage: this.totalPage,
    //   currentPage: this.currentPage,
    //   pageSize: this.pageSize,
    //   totalResults: this.totalResults,
    //   goodsName: this.goodsName,
    //   timeStamp: this.timeStamp,
    //   updateSuccess: this.updateSuccess,
    //   updateFailed: this.updateFailed,
    //   notUpdate: this.notUpdate,
    //   addSuccess: this.addSuccess,
    //   addFailed: this.addFailed,
    //   execStatus: this.execStatus
    // }

    let map = {
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
      flag: 'end'
    }
    // 可以进行业务逻辑代码书写了
    console.log(map)
  },
  methods: {}
}
</script>
<style lang="scss">
  @import "./style.scss";
</style>
