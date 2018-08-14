<template>
  <div id="Discount">
    <section class="yle_operation_penal">
      <div class="left_part">
        <el-radio-group v-model="filter.status" @change="statusSelect" size="small">
          <el-radio-button label="">{{LAN.all}}</el-radio-button>
          <el-radio-button label="1">{{LAN.receivePending}}</el-radio-button>
          <el-radio-button label="2">{{LAN.usePending}}</el-radio-button>
          <el-radio-button label="3">{{LAN.used}}</el-radio-button>
          <el-radio-button label="4">{{LAN.completed}}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="right_part">
        <div class="item w180">
          <el-select v-model="filter.shopId" :placeholder="LAN.shopSelectHolder" @change="shopSelect" clearable>
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
            @keyup.enter.native = "getDiscountList"
            :placeholder="LAN.searchKey"
            suffix-icon="el-icon-search"
            @clear = "getDiscountList"
            v-model="filter.key" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--资源列表-->
    <section class="discountList">
      <el-table
        :data="discountList"
        :height = "tableHeight"
        stripe>
        <el-table-column
          :label="LAN.discountId"
          prop="discountId" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="yle_color_blue yle_pointer" @click="toDiscountDetail(scope.row)">{{scope.row.discountId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="LAN.shopName"
          prop="shopName" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          :label="LAN.memberAccount"
          prop="memberAccount" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.memberAccount  || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="LAN.status"
          prop="status" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if = "scope.row.status === 1">{{LAN.receivePending}}</el-tag>
            <el-tag type="success" v-else-if = "scope.row.status === 2">{{LAN.usePending}}</el-tag>
            <el-tag type="success" v-else-if = "scope.row.status === 3">{{LAN.used}}</el-tag>
            <el-tag type="success" v-else-if = "scope.row.status === 4">{{LAN.completed}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="LAN.type"
          prop="type" width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.type === 1">{{LAN.discount1}}</span>
            <span v-else-if = "scope.row.type === 2">{{LAN.discount2}}</span>
            <span v-else-if = "scope.row.type === 3">{{LAN.discount3}}</span>
            <span v-else-if = "scope.row.type === 4">{{LAN.discount4}}</span>
            <span v-else-if = "scope.row.type === 5">{{LAN.discount5}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="LAN.createAt"
          prop="create_at" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </section>
    <!--分页-->
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
import {getShopList, getDiscountList} from './proxy'
import LAN from '@/libs/il8n'
export default {
  name: 'Discount',
  data () {
    return {
      LAN: LAN.discountManagement,
      total: 0,
      filter: {
        pageNo: 1,
        pageSize: 15,
        status: '',
        shopId: '',
        key: ''
      },
      tableHeight: 720,
      discountList: [], // 打折券列表
      shopList: [] // 店铺列表
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
    this.getDiscountList()
  },
  methods: {
    statusSelect (val) { // 订单状态选择
      this.filter.status = val
      this.getDiscountList()
    },
    shopSelect (val) { // 店铺选择
      this.filter.shopId = val
      this.getDiscountList()
    },
    getDiscountList () { // 获取打折券列表数据
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
      getDiscountList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.discountList = res.data.rows || []
          this.total = res.data.total || 0
        }
      })
    },
    toDiscountDetail (row) { // 到打折券详情
      this.$router.push({
        name: 'DiscountDetail',
        query: { discountId: row.discountId }
      })
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getDiscountList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getDiscountList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
