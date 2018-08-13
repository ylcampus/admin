<template>
  <div id="Member">
    <!--区域树-->
    <div class="areaTree">
      <div class="filter">
        <el-input
          :placeholder="LAN.areaHolder"
          suffix-icon="el-icon-search"
          v-model="filterText" clearable>
        </el-input>
      </div>
      <div class="treeContent">
        <el-tree
          class="filter-tree"
          :data="areaTree"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          ref="areaTree">
        </el-tree>
      </div>
    </div>
    <!--会员列表-->
    <div class="memberList">
      <!--操作面板-->
      <section class="head">
        <div class="status">
          <el-radio-group v-model="filter.status" @change="statusSelect" size="small">
            <el-radio-button label="">{{LAN.all}}</el-radio-button>
            <el-radio-button label="1">{{LAN.offline}}</el-radio-button>
            <el-radio-button label="2">{{LAN.online}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter">
          <div class="fitem">
            <el-input
              @keyup.enter.native = "getMemberList"
              :placeholder="LAN.searchHolder"
              suffix-icon="el-icon-search"
              @clear = "getMemberList"
              v-model="filter.key" clearable>
            </el-input>
          </div>
        </div>
      </section>
      <!--列表-->
      <section class="mList">
        <el-table
          :data="memberList"
          :height = "tableHeight"
          stripe>
          <el-table-column
            prop="account"
            :label="LAN.account"
            width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="raccount" @click="toMemberDetail(scope.row)">{{ scope.row.account }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            :label="LAN.name"
            width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.name || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            :label="LAN.sex"
            align="center"
            width="50">
            <template slot-scope="scope">
              <span v-if = "scope.row.sex === 1">{{LAN.male}}</span>
              <span v-else-if = "scope.row.sex === 2">{{LAN.female}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="LAN.address">
            <el-table-column
              prop="province"
              :label="LAN.province"
              align="center"
              width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.province || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              :label="LAN.city"
              align="center"
              width="80">
              <template slot-scope="scope">
                <span>{{scope.row.city || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="school"
              :label="LAN.school"
              align="center"
              width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.school || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="campus"
              :label="LAN.campus"
              align="center"
              width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.campus || '--'}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="create_at"
            :label="LAN.createAt" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="freeze"
            :label="LAN.freeze"
            align="center"
            width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if = "!scope.row.freeze">{{LAN.normal}}</span>
              <span v-if = "scope.row.freeze">{{LAN.freezed}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="LAN.operation" width="180">
            <template slot-scope="scope">
              <span style="cursor:pointer" @click="freeze(scope.row, 1)" v-if="scope.row.freeze"><el-tag type="success">{{LAN.enable}}</el-tag></span>
              <span style="cursor:pointer" @click="freeze(scope.row, 2)" v-if="!scope.row.freeze"><el-tag type="danger">{{LAN.disable}}</el-tag></span>
              <span style="cursor:pointer" @click="deleteMember(scope.row)"><el-tag type="danger">{{LAN.del}}</el-tag></span>
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
  </div>
</template>
<script>
import {getAreaTreeData, getMemberList, deleteMember, freeze} from './proxy'
import LAN from '@/libs/il8n'
export default {
  name: 'Member',
  watch: {
    filterText (val) {
      this.$refs.areaTree.filter(val)
    }
  },
  data () {
    return {
      LAN: LAN.memberManagement,
      filterText: '',
      tableHeight: 720,
      filter: {
        areaId: '', // 区域id
        pageNo: 1,
        pageSize: 25,
        status: '', // 在线状态 1 离线 2 在线
        key: '' // 会员账号或手机号
      },
      memberList: [], // 会员列表
      areaTree: [], // 区域树
      total: 0
    }
  },
  mounted () {
    this.getMemberList()
    getAreaTreeData().then((res) => {
      if (res.code * 1 === 0) {
        this.areaTree = res.data || []
      }
    })
  },
  methods: {
    handleNodeClick (item) {
      this.filter.areaId = item.areaId
      this.getMemberList()
    },
    getMemberList () { // 获取会员列表
      let params = this.getParams()
      getMemberList(params).then((res) => {
        if (res.code * 1 === 0 && res.data) {
          this.memberList = res.data.rows || []
          this.total = res.data.total || 0
        }
      })
    },
    deleteMember (row) { // 删除会员
      this.$confirm(this.LAN.delConfirm, this.LAN.tips, {
        confirmButtonText: this.LAN.enter,
        cancelButtonText: this.LAN.cancel,
        type: 'warning'
      }).then(() => {
        deleteMember(row.memberId).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success(this.LAN.delSuccess)
            this.getMemberList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.LAN.opaCancel
        })
      })
    },
    freeze (row, flag) { // 启用、禁用会员
      let txt = (flag === 1) ? this.LAN.enableConfirm : this.LAN.disableConfirm
      this.$confirm(txt, this.LAN.tips, {
        confirmButtonText: this.LAN.enter,
        cancelButtonText: this.LAN.cancel,
        type: 'warning'
      }).then(() => {
        let params = {
          flag: flag,
          memberId: row.memberId
        }
        freeze(params).then((res) => {
          if (res.code * 1 === 0) {
            let tips = (flag === 1) ? this.LAN.enableSuccess : this.LAN.disableSuccess
            this.$message.success(tips)
            this.getMemberList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.LAN.opaCancel
        })
      })
    },
    getParams () { // 获取筛选参数
      let map = {
        pageNo: this.filter.pageNo,
        pageSize: this.filter.pageSize
      }
      if (this.filter.areaId) {
        map.areaId = this.filter.areaId
      }
      if (this.filter.status) {
        map.status = this.filter.status
      }
      if (this.filter.key) {
        map.key = this.filter.key
      }
      return map
    },
    statusSelect (val) { // 在线状态选择
      this.filter.status = val
      this.getMemberList()
    },
    toMemberDetail (row) { // 到会员详情页
      this.$router.push({
        name: 'MemberDetail',
        query: { memberId: row.memberId }
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleSizeChange (val) {
      this.filter.pageNo = 1
      this.filter.pageSize = val
      this.getMemberList()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.getMemberList()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
<style lang="scss">
  #Member {
    .areaTree{
      .el-input__inner{
        background-color: #f1f2f3;
        border: none;
        border-radius: 20px;
        height: 36px;
        line-height: 36px;
      }
    }
  }
</style>
