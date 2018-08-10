<template>
  <div id="Goods">
    <section class="yle_operation_penal">
      <div class="left_part">
        <el-radio-group v-model="filter.status" @change="statusSelect" size="small">
          <el-radio-button label=""  >全部</el-radio-button>
          <el-radio-button label="1" >出售中</el-radio-button>
          <el-radio-button label="2" >库存中</el-radio-button>
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
            @keyup.enter.native = "getGoodsList"
            placeholder="输入商品名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getGoodsList"
            v-model="filter.key" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--商品列表-->
    <section class="goodsList">
      <el-table
        :data="goodsList"
        :height = "tableHeight"
        stripe>
        <el-table-column
          label="商品名称"
          prop="name" width="220" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="yle_color_blue yle_pointer" @click="toGoodsDetail(scope.row)">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品Id"
          prop="goodsId" width="150">
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price" width="100">
        </el-table-column>
        <el-table-column
          label="所属店铺"
          prop="shopName" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="yle_color_blue yle_pointer" @click="toShopDetail(scope.row)">{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="库存状态"
          prop="status" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if = "scope.row.status === 1">出售中</el-tag>
            <el-tag type="danger" v-else-if = "scope.row.status === 2">库存中</el-tag>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新状态"
          prop="updateStatus" width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.updateStatus === 1">新建</span>
            <span v-else-if = "scope.row.updateStatus === 2">更新成功</span>
            <span v-else-if = "scope.row.updateStatus === 3">更新失败</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="timeStamp" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </section>
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
export default {
  name: 'goods',
  data () {
    return {
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
  },
  methods: {
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
          this.goodsList = res.data.rows || []
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
          goodsId: row.goodsId
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
