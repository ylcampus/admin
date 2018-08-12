<template>
  <div id="EnterShop">
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-plus" @click = "addShop" plain>{{LAN.createShop}}</el-button>
      </div>
      <div class="filter">
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getShopList"
            :placeholder="LAN.searchHolder"
            suffix-icon="el-icon-search"
            @clear = "getShopList"
            v-model="filter.name" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <section class="shopsList">
      <el-table
        :data="shopList"
        :height = "tableHeight"
        stripe>
        <el-table-column
          :label="LAN.shopName"
          prop="name" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="sname" @click="editShop(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="LAN.host"
          prop="host" width="150">
        </el-table-column>
        <el-table-column
          :label="LAN.shopId"
          prop="shopId" width="120">
        </el-table-column>
        <el-table-column
          :label="LAN.skuid"
          prop="skuId" width="120">
        </el-table-column>
        <el-table-column
          :label="LAN.createAt"
          prop="createAt">
        </el-table-column>
        <el-table-column
          :label="LAN.operation" width="100">
          <template slot-scope="scope">
            <span @click="delShop(scope.row)" style="cursor:pointer"><el-tag type="danger">{{LAN.delete}}</el-tag></span>
          </template>
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
import {getShopList, deleteShop} from './proxy'
import LAN from '@/libs/il8n'
export default {
  name: 'shopEnter',
  data () {
    return {
      LAN: LAN.enterShop,
      total: 80, // 总数据数
      filter: { // 筛选条件
        pageNo: 1,
        pageSize: 25,
        key: '' // 店铺名称
      },
      tableHeight: 720,
      shopList: []
    }
  },
  mounted () {
    this.getShopList()
  },
  methods: {
    getShopList () { // 获取资源列表数据
      let params = {
        pageNo: this.filter.pageNo,
        pageSize: this.filter.pageSize
      }
      if (this.filter.key) {
        params.key = this.filter.key
      }
      getShopList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.shopList = res.data.rows || []
          this.total = res.data.total || 0
        }
      })
    },
    addShop () { // 添加店铺
      this.$router.push('shop/add')
    },
    editShop (row) { // 编辑店铺
      this.$router.push({
        name: 'EditShop',
        query: { shopId: row.shopId }
      })
    },
    delShop (row) { // 删除店铺
      this.$confirm(this.LAN.delConfirm, this.LAN.tips, {
        confirmButtonText: this.LAN.enter,
        cancelButtonText: this.LAN.cancel,
        type: 'warning'
      }).then(() => {
        deleteShop(row.shopId).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success(this.LAN.delSuccess)
            this.getShopList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.LAN.opaCancel
        })
      })
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getShopList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getShopList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "style";
</style>
