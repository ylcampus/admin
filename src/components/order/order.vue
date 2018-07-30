<template>
  <div id="Order">
    <!--头部-->
    <section class="yle_operation_penal">
      <div class="left_part">
        <el-radio-group v-model="filter.status" @change="statusSelect" size="small">
          <el-radio-button label=""  >全部</el-radio-button>
          <el-radio-button label="1" >待付款</el-radio-button>
          <el-radio-button label="2" >待发货</el-radio-button>
          <el-radio-button label="3" >已发货</el-radio-button>
          <el-radio-button label="4" >已完成</el-radio-button>
          <el-radio-button label="5" >已取消</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right_part">
        <div class="item w180">
          <el-select v-model="filter.shopId" placeholder="请选择店铺" @change="shopSelect" clearable>
            <el-option label="不限" value=""></el-option>
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
            @keyup.enter.native = "getOrderList"
            placeholder="输入收货人名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getOrderList"
            v-model="filter.key" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--订单列表-->
    <section class="orderList">
      <el-table
        :data="orderList"
        :height = "tableHeight"
        stripe>
        <el-table-column
          label="订单号"
          prop="orderId" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="yle_color_blue yle_pointer" @click="toDetail(scope.row)">{{scope.row.orderId}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status" width="100">
          <template slot-scope="scope">
            <el-tag type="default" v-if = "scope.row.status === 1">待付款</el-tag>
            <el-tag v-else-if = "scope.row.status === 2">待发货</el-tag>
            <el-tag v-else-if = "scope.row.status === 3">已发货</el-tag>
            <el-tag v-else-if = "scope.row.status === 4">已完成</el-tag>
            <el-tag v-else-if = "scope.row.status === 5">已取消</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="买家"
          prop="consignee" width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="goodsName" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="店铺"
          prop="shopName" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="create_at" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </section>
    <section class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filter.pageNo"
        :page-sizes="[20, 25, 50, 100]"
        :page-size="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </section>
  </div>
</template>
<script>
import {getShopList, getOrderList} from './proxy'
export default {
  name: 'orderList',
  data () {
    return {
      total: 0,
      filter: {
        pageNo: 1,
        pageSize: 15,
        status: '',
        shopId: '',
        key: ''
      },
      tableHeight: 720,
      orderList: [],
      shopList: []
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
    this.getOrderList()
  },
  methods: {
    statusSelect (val) {
      this.filter.status = val
      this.getOrderList()
    },
    shopSelect (val) {
      this.filter.shopId = val
      this.getOrderList()
    },
    getOrderList () {
      let params = {
        pageNo: this.filter.pageNo,
        pageSize: this.filter.pageSize
      }
      if (this.filter.status) {
        params.status = parseInt(this.filter.status, 10)
      }
      if (this.filter.shopId) {
        params.shopId = this.filter.shopId
      }
      if (this.filter.key) {
        params.key = this.filter.key
      }
      getOrderList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.orderList = res.data.rows || []
          this.total = res.data.total || 0
        }
      })
    },
    toDetail (row) {
      this.$router.push({
        name: 'OrderDetail',
        query: { orderId: row.orderId }
      })
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getOrderList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getOrderList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
