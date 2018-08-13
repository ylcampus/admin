<template>
  <div id="Discount">
    <section class="yle_operation_penal">
      <div class="left_part">
        <el-radio-group v-model="filter.status" @change="statusSelect" size="small">
          <el-radio-button label=""  >全部</el-radio-button>
          <el-radio-button label="1" >未领取</el-radio-button>
          <el-radio-button label="2" >未使用</el-radio-button>
          <el-radio-button label="3" >已使用</el-radio-button>
          <el-radio-button label="4" >已完成</el-radio-button>
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
            @keyup.enter.native = "getDiscountList"
            placeholder="输入会员账号进行搜索"
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
          label="打折券Id"
          prop="discountId" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="yle_color_blue yle_pointer" @click="toDiscountDetail(scope.row)">{{scope.row.discountId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属店铺"
          prop="shopName" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="会员"
          prop="memberAccount" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.memberAccount  || '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if = "scope.row.status === 1">未领取</el-tag>
            <el-tag type="success" v-else-if = "scope.row.status === 2">未使用</el-tag>
            <el-tag type="success" v-else-if = "scope.row.status === 3">已使用</el-tag>
            <el-tag type="success" v-else-if = "scope.row.status === 4">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="折扣"
          prop="type" width="100">
          <template slot-scope="scope">
            <span v-if = "scope.row.type === 1">一折券</span>
            <span v-else-if = "scope.row.type === 2">二折券</span>
            <span v-else-if = "scope.row.type === 3">三折券</span>
            <span v-else-if = "scope.row.type === 4">四折券</span>
            <span v-else-if = "scope.row.type === 5">五折券</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
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
