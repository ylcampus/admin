<template>
  <div id="Goods">
    <section class="yle_operation_penal">
      <div class="left_part">
        <el-radio-group v-model="filter.status" @change="statusSelect" size="small">
          <el-radio-button label=""  >{{LAN.all}}</el-radio-button>
          <el-radio-button label="1" >{{LAN.sale}}</el-radio-button>
          <el-radio-button label="2" >{{LAN.stock}}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right_part">
        <div class="item">
          <div class="layout">
            <span v-bind:class="{'active': this.layout === 'row'}" @click="switchLayout('row')" class="icon row"></span>
            <span v-bind:class="{'active': this.layout === 'column'}" @click="switchLayout('column')" class="icon column"></span>
          </div>
        </div>
        <div class="item w180">
          <el-select v-model="filter.shopId" :placeholder="LAN.shopSelect" @change="shopSelect" clearable>
            <el-option :label="LAN.noLimit" value=""></el-option>
            <el-option
              :key="key"
              v-for = "(item, key) in shopList"
              :value="item.shopId"
              :label="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-input
            @keyup.enter.native = "getGoodsList"
            :placeholder="LAN.searchHolder"
            suffix-icon="el-icon-search"
            @clear = "getGoodsList"
            v-model="filter.key" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--商品列表-->
    <div class="goodsList">
      <div class="rowLayout"  v-show="layout === 'row'" ref="rowLayout">
        <div class="box" @click="toGoodsDetail(row)" v-bind:style="{width: boxWidth + 'px'}" v-for="row in goodsList" :key="row.goodsId">
          <div class="mainPart">
            <img :src="hostname + row.pic">
          </div>
          <div class="pics">
            <div @click.stop="row.pic = pic" v-bind:class="{'active': pic === row.pic}" class="pic" v-for="(pic, index) in row.pics" :key="index">
              <img :src="hostname + pic">
            </div>
          </div>
          <div class="nameTxt goodsName" :title="row.title">{{row.title}}</div>
          <div class="nameTxt shopName">{{row.shopName}}</div>
          <div class="nameTxt price">￥{{row.price}}</div>
          <div class="excuStatus">
            <span v-if ="row.updateStatus === 1" class="updateSuccess tag">{{LAN.updateSuccess}}</span>
            <span v-if ="row.updateStatus === 2" class="updateFailed tag">{{LAN.updateFailed}}</span>
            <span v-if ="row.updateStatus === 3" class="notUpdate tag">{{LAN.notUpdate}}</span>
            <span v-if ="row.updateStatus === 4" class="addSuccess tag">{{LAN.addSuccess}}</span>
            <span v-if ="row.updateStatus === 5" class="addFailed tag">{{LAN.addFailed}}</span>
          </div>
        </div>
      </div>
      <div class="columnLayout" v-show="layout === 'column'" ref="columnLayout">
        <el-table
          :data="goodsList"
          :height = "tableHeight"
          stripe>
          <el-table-column
            :label="LAN.goodsName"
            prop="name" width="220" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="yle_color_blue yle_pointer" @click="toGoodsDetail(scope.row)">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="LAN.goodsId"
            prop="goodsId" width="150">
          </el-table-column>
          <el-table-column
            :label="LAN.price"
            prop="price" width="100">
          </el-table-column>
          <el-table-column
            :label="LAN.shopName"
            prop="shopName" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="yle_color_blue yle_pointer" @click="toShopDetail(scope.row)">{{ scope.row.shopName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="LAN.status"
            prop="status" width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if = "scope.row.status === 1">{{LAN.sale}}</el-tag>
              <el-tag type="danger" v-else-if = "scope.row.status === 2">{{LAN.stock}}</el-tag>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="LAN.updateStatus"
            prop="updateStatus" width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if = "scope.row.updateStatus === 1">{{LAN.updateSuccess}}</span>
              <span v-else-if = "scope.row.updateStatus === 2">{{LAN.updateFailed}}</span>
              <span v-else-if = "scope.row.updateStatus === 3">{{LAN.notUpdate}}</span>
              <span v-else-if = "scope.row.updateStatus === 3">{{LAN.addSuccess}}</span>
              <span v-else-if = "scope.row.updateStatus === 3">{{LAN.addFailed}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="LAN.timeStamp"
            prop="timeStamp" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <section class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filter.pageNo"
        :page-sizes="[15, 25, 50, 100]"
        :page-size="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </section>
  </div>
</template>
<script>
import {getGoodsList, getShopList} from './proxy'
import {hostname} from '@/libs/config'
import LAN from '@/libs/il8n'
export default {
  name: 'Goods',
  data () {
    return {
      LAN: LAN.goodsManagement,
      layout: this.$route.query.layout || 'row', // row 块模式 column 表格模式
      rowLayoutWidth: 0,
      hostname: hostname,
      total: 0,
      filter: {
        pageNo: 1,
        pageSize: 15,
        status: '1',
        shopId: '',
        key: ''
      },
      shopList: [],
      tableHeight: 720,
      goodsList: []
    }
  },
  computed: {
    boxWidth () {
      let num = parseInt(this.rowLayoutWidth / 220, 10)
      let remindpix = this.rowLayoutWidth - num * 220
      let gap = remindpix / num
      return 220 + gap - 5
    }
  },
  watch: {
    '$store.state.windowWidth' () { // 监听页面宽度变化
      if (this.layout === 'row') {
        this.rowLayoutWidth = this.$refs.rowLayout.clientWidth
      }
    },
    '$store.state.windowHeight' () { // 监听页面高度变化
      if (this.layout === 'column') {
        this.tableHeight = this.$refs.columnLayout.clientHeight
      }
    },
    layout (val) { // 监听页面布局模式
      this.calcLayout()
    }
  },
  mounted () {
    getShopList({
      pageNo: 1,
      pageSize: 1000
    }).then((res) => {
      if (res.code * 1 === 0) {
        this.shopList = res.data.rows || []
      }
    })
    this.getGoodsList()
    this.calcLayout()
  },
  methods: {
    calcLayout () { // 计算容器宽度
      if (this.layout === 'row') {
        this.$nextTick(() => {
          this.rowLayoutWidth = this.$refs.rowLayout.clientWidth
        })
      } else if (this.layout === 'column') {
        this.$nextTick(() => {
          this.tableHeight = this.$refs.columnLayout.clientHeight
        })
      }
    },
    switchLayout (val) { // 切换布局模式
      this.layout = val
    },
    getGoodsList () { // 获取资源列表数据
      let params = {
        pageNo: this.filter.pageNo,
        pageSize: this.filter.pageSize
      }
      if (this.filter.status) {
        params.status = this.filter.status
      }
      if (this.filter.shopId) {
        params.shopId = this.filter.shopId
      }
      if (this.filter.key) {
        params.key = this.filter.key
      }
      getGoodsList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          let list = res.data.rows || []
          this.goodsList = list.map((row) => {
            row.pic = row.pics[0] || ''
            return row
          })
          this.total = res.data.total || 0
        }
      })
    },
    statusSelect (val) { // 订单状态选择
      this.filter.status = val
      this.getGoodsList()
    },
    shopSelect (val) { // 店铺选择
      this.filter.shopId = val
      this.getGoodsList()
    },
    toGoodsDetail (row) { // 到商品详情
      this.$router.push({
        name: 'GoodsDetail',
        query: {
          goodsId: row.goodsId,
          layout: this.layout
        }
      })
    },
    toShopDetail (row) { // 到店铺详情
      this.$router.push({
        name: 'EditShop',
        query: { shopId: row.shopId }
      })
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getGoodsList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
