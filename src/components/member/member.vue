<template>
  <div id="Member">
    <!--区域树-->
    <div class="areaTree">
      <div class="filter">
        <el-input
          placeholder="输入区域名称进行过滤"
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
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">离线</el-radio-button>
            <el-radio-button label="2">在线</el-radio-button>
          </el-radio-group>
        </div>
        <div class="filter">
          <div class="fitem">
            <el-input
              @keyup.enter.native = "getMemberList"
              placeholder="输入用户账号/手机号进行搜索"
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
            label="会员账号"
            width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="raccount" @click="toMemberDetail(scope.row)">{{ scope.row.account }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.name || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="在线状态"
            align="center"
            width="80">
            <template slot-scope="scope">
              <el-tag v-if = "scope.row.status === '1'" type="info">离线</el-tag>
              <el-tag v-if = "scope.row.status === '2'" type="success">在线</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="50">
            <template slot-scope="scope">
              <span v-if = "scope.row.sex === 1">男</span>
              <span v-else-if = "scope.row.sex === 2">女</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="地址信息">
            <el-table-column
              prop="province"
              label="省"
              align="center"
              width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.province || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              label="市"
              align="center"
              width="80">
              <template slot-scope="scope">
                <span>{{scope.row.city || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="school"
              label="学校"
              align="center"
              width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.school || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="campus"
              label="校区"
              align="center"
              width="80" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.campus || '--'}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="create_at"
            label="注册时间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="freeze"
            label="冻结状态"
            align="center"
            width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if = "!scope.row.freeze">正常</span>
              <span v-if = "scope.row.freeze">账号被冻结</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作" width="120">
            <template slot-scope="scope">
              <span style="cursor:pointer" @click="freeze(scope.row, 1)" v-if="scope.row.freeze"><el-tag type="success">启用</el-tag></span>
              <span style="cursor:pointer" @click="freeze(scope.row, 2)" v-if="!scope.row.freeze"><el-tag type="danger">禁用</el-tag></span>
              <span style="cursor:pointer" @click="deleteMember(scope.row)"><el-tag type="danger">删除</el-tag></span>
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
export default {
  name: 'Member',
  watch: {
    filterText (val) {
      this.$refs.areaTree.filter(val)
    }
  },
  data () {
    return {
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
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMember(row.memberId).then((res) => {
          if (res.code * 1 === 0) {
            this.$message.success('删除成功')
            this.getMemberList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    freeze (row, flag) { // 启用、禁用会员
      let txt = (flag === 1) ? '确定要启用吗？' : '确定要禁用吗？'
      this.$confirm(txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          flag: flag,
          memberId: row.memberId
        }
        freeze(params).then((res) => {
          if (res.code * 1 === 0) {
            let tips = (flag === 1) ? '启用成功' : '禁用成功？'
            this.$message.success(tips)
            this.getMemberList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
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
        background-color: #f7f7f7;
        border: none;
        border-radius: 20px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>
