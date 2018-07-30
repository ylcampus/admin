<template>
  <div id="EnterShop">
    <!--头部-->
    <section class="head">
      <div class="add">
        <el-button icon="el-icon-plus" @click = "addShop" plain>新建店铺</el-button>
      </div>
      <div class="filter">
        <div class="fitem">
          <el-input
            @keyup.enter.native = "getShopList"
            placeholder="输入店铺名称进行搜索"
            suffix-icon="el-icon-search"
            @clear = "getShopList"
            v-model="filter.name" clearable>
          </el-input>
        </div>
      </div>
    </section>
    <!--店铺列表-->
    <section class="shopsList">
      <el-table
        :data="shopList"
        :height = "tableHeight"
        stripe>
        <el-table-column
          label="店铺名称"
          prop="name" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="sname" @click="editShop(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="主机名"
          prop="host" width="150">
        </el-table-column>
        <el-table-column
          label="店铺Id"
          prop="shopId" width="120">
        </el-table-column>
        <el-table-column
          label="SkuId"
          prop="skuId" width="120">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createAt">
        </el-table-column>
        <el-table-column
          label="操作" width="100">
          <template slot-scope="scope">
            <span @click="delShop(scope.row)" style="cursor:pointer"><el-tag type="danger">删除</el-tag></span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!--分页-->
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
export default {
  name: 'shopEnter',
  data () {
    return {
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
      this.$confirm('确定要删除该店铺吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteShop(row.shopId).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getShopList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
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
