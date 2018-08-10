<template>
  <div id="Overview">
    <section class="yle_operation_penal">
      <div class="left_part" style="display: flex;align-items: center;">
        <el-select v-model="filter.shopId" :placeholder="LAN.shopSelect" @change="shopSelect">
          <el-option :label="LAN.ule" value="10000"></el-option>
          <el-option
            :key="key"
            v-for = "(item, key) in shopList"
            :value="item.shopId"
            :label="item.name">
          </el-option>
        </el-select>
        <el-button @click = "drawAll" style="margin-left:5px;" icon="el-icon-refresh" plain></el-button>
      </div>
      <div class="right_part">
        <div class="item">
          <el-radio-group v-model="filter.type" @change="statusSelect" size="small">
            <el-radio-button label="1" >{{LAN.today}}</el-radio-button>
            <el-radio-button label="2" >{{LAN.threeDays}}</el-radio-button>
            <el-radio-button label="3" >{{LAN.thirtyDays}}</el-radio-button>
            <el-radio-button label="4" >{{LAN.ninetyDays}}</el-radio-button>
            <el-radio-button label="5" >{{LAN.custom}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="item">
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            align="right"
            unlink-panels
            :range-separator="LAN.to"
            :start-placeholder="LAN.startDate"
            :end-placeholder="LAN.endDate"
            :picker-options="pickerOptions"
            @change = "drawAll"
            :disabled="isDisabled">
          </el-date-picker>
        </div>
      </div>
    </section>
    <div class="warpBody">
      <div class="totalAndLineArea">
        <div class="totalArea">
          <div class="totalItem">
            <div class="inner">
              <div class="title">{{LAN.visitNumber}}</div>
              <div class="number" style="font-size: 40px;color: green;">{{totalMap.visit}}</div>
            </div>
          </div>
          <div class="totalItem">
            <div class="inner">
              <div class="title">{{LAN.totalOrder}}</div>
              <div class="number">{{totalMap.order}}</div>
              <router-link class="detail" to="/order">{{LAN.seeMore}}</router-link>
            </div>
          </div>
          <div class="totalItem">
            <div class="inner">
              <div class="title">{{LAN.totalGoods}}</div>
              <div class="number">{{totalMap.goods}}</div>
              <router-link class="detail" to="/goods">{{LAN.seeMore}}</router-link>
            </div>
          </div>
          <div class="totalItem">
            <div class="inner">
              <div class="title">{{LAN.totalMember}}</div>
              <div class="number">{{totalMap.member}}</div>
              <router-link class="detail" to="/member">{{LAN.seeMore}}</router-link>
            </div>
          </div>
          <div class="totalItem">
            <div class="inner">
              <div class="title">{{LAN.totalDiscount}}</div>
              <div class="number">{{totalMap.discount}}</div>
              <router-link class="detail" to="/discount">{{LAN.seeMore}}</router-link>
            </div>
          </div>
        </div>
        <div class="lineArea">
          <div id="visitLine"></div>
        </div>
      </div>
      <div class="pieArea">
        <el-row :gutter="2">
          <el-col :span="6">
            <div class="grid-content">
              <div class="inner">
                <div id="orderPie"></div>
                <span class="title">{{LAN.order}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <div class="inner">
                <div id="goodsPie"></div>
                <span class="title">{{LAN.goods}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <div class="inner">
                <div id="memberPie"></div>
                <span class="title">{{LAN.member}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <div class="inner">
                <div id="discountPie"></div>
                <span class="title">{{LAN.discount}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import {getLineChartData, getShopList, getOrderChartData, getGoodsChartData, getMemberChartData, getDiscountChartData} from './proxy'
import {mirrorQuaraterTick, getDateTxtArr, getDateString, getDate} from '@/libs/util'
import LAN from '@/libs/il8n'
export default {
  name: 'overview',
  watch: {
    '$store.state.windowWidth' () {
      this.updateCharts()
    },
    '$store.state.windowHeight' () {
      this.updateCharts()
    }
  },
  data () {
    return {
      LAN: LAN.overview,
      isDisabled: true,
      totalMap: { // 数据统计
        visit: 0,
        order: 0,
        goods: 0,
        member: 0,
        discount: 0
      },
      filter: {
        type: 1,
        shopId: '10000'
      },
      shopList: [],
      lineChart: '',
      orderPieChart: '',
      goodsPieChart: '',
      memberPieChart: '',
      discountPieChart: '',
      attentionLineX: [],
      attentionLineY: [],
      pickerOptions: {
        shortcuts: [{
          text: LAN.overview.lastWeek,
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: LAN.overview.thirtyDays,
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: LAN.overview.ninetyDays,
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }],
        disabledDate (time) { // 时间选择范围为最近一年
          let limitMix = Date.now() - 90 * 24 * 3600 * 1000
          return (time.getTime() < limitMix) || (time.getTime() > Date.now())
        }
      },
      dateTime: null
    }
  },
  mounted () {
    getShopList({ // 获取入驻店铺列表
      pageNo: 1,
      pageSize: 1000
    }).then((res) => {
      if (res.code * 1 === 0) {
        this.shopList = res.data.rows || []
      }
    })
    this.drawAll() // 绘制图标
  },
  methods: {
    shopSelect (val) {
      this.filter.shopId = val
      this.drawAll()
    },
    statusSelect (val) {
      this.isDisabled = parseInt(val, 10) !== 5
      this.drawAll()
    },
    drawAll () {
      this.drawVisitLineChar()
      this.drawOrderPie()
      this.drawGoodsPie()
      this.drawMemberPie()
      this.drawDiscountPie()
    },
    drawVisitLineChar () {
      let type = parseInt(this.filter.type, 10)
      let params = {
        type: type,
        shopId: this.filter.shopId
      }
      if (type === 2) { // 最近7天
        params.startTime = getDateString(-7)
      } else if (type === 3) { // 最近30天
        params.startTime = getDateString(-30)
      } else if (type === 4) { // 最近90天
        params.startTime = getDateString(-90)
      } else if (type === 5 && this.dateTime) {
        params.startTime = getDate(this.dateTime[0])
        params.endTime = getDate(this.dateTime[1])
      }
      getLineChartData(params).then((res) => {
        if (res.code * 1 === 0) {
          let resultMap = res.data || {}
          let type = parseInt(params.type, 10)
          let start = ''
          let end = getDateString()
          let mirrorMap = {}
          if (type === 1) {
            mirrorMap = mirrorQuaraterTick()
          } else if (type === 2) {
            start = getDateString(-7)
            mirrorMap = getDateTxtArr(start, end)
          } else if (type === 3) {
            start = getDateString(-30)
            mirrorMap = getDateTxtArr(start, end)
          } else if (type === 4) {
            start = getDateString(-90)
            mirrorMap = getDateTxtArr(start, end)
          } else if (type === 5 && this.dateTime) {
            start = getDate(this.dateTime[0])
            end = getDate(this.dateTime[1])
            mirrorMap = getDateTxtArr(start, end)
          }
          let realMap = {...mirrorMap, ...resultMap}
          this.attentionLineX = Object.keys(realMap)
          this.attentionLineY = Object.values(realMap)
          // 统计总访问量
          let total = 0
          for (let key in resultMap) {
            total += parseInt(resultMap[key], 10)
          }
          this.totalMap.visit = total
          this.drawLine('visitLine')
        }
      })
    },
    drawLine (id) { // 绘制线形图
      this.lineChart = echarts.init(document.getElementById(id))
      this.lineChart.setOption({
        tooltip: {
          trigger: 'axis',
          padding: [12, 16],
          axisPointer: {
            lineStyle: {
              color: '#fff',
              width: 2,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 2,
              shadowBlur: 4
            }
          },
          formatter: (params) => {
            let date = params[0].axisValue
            let dataNum = params[0].data === null ? '--' : `${params[0].data}人`
            return `${date}<br/>${this.LAN.visitNumber} : ${dataNum}`
          }
        },
        xAxis: {
          boundaryGap: false,
          data: this.attentionLineX,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        yAxis: {
          name: this.LAN.times,
          nameTextStyle: {
            color: '#999'
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted',
              color: '#e6e6e6'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            startValue: this.attentionLineX[0],
            backgroundColor: '#FAFAFA',
            borderColor: '#E8EBED',
            fillerColor: 'rgba(185,196,210,0.40)',
            handleStyle: {
              color: '#fff',
              shadowColor: '#C5CBD4',
              shadowOffsetX: 0,
              shadowOffsetY: 1,
              shadowBlur: 2
            },
            dataBackground: {
              lineStyle: {
                color: '#E7E9EB'
              }
            },
            textStyle: {
              color: '#9198A0'
            },
            height: 30
          },
          {
            type: 'inside'
          }
        ],
        grid: {
          left: '9%',
          right: '3%'
        },
        series: [
          {
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              normal: {},
              emphasis: {
                color: '#FF7975',
                borderColor: '#fff',
                borderWidth: 2,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                shadowBlur: 4
              }
            },
            lineStyle: {
              width: 0
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#FF7975'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 167, 122, 0.60)'
                  }
                ]
              }
            },
            data: this.attentionLineY
          }
        ]
      })
    },
    drawOrderPie () {
      getOrderChartData({shopId: this.filter.shopId}).then(res => {
        if (res.code * 1 === 0) {
          let mirrorMap = {
            '1': this.LAN.payPending,
            '2': this.LAN.deliverPending,
            '3': this.LAN.delivered,
            '4': this.LAN.completed,
            '5': this.LAN.cancelled
          }
          let result = this.transionData(res.data, mirrorMap)
          this.totalMap.order = result.total
          let colors = ['#E6A23C', '#E6A23C', '#409EFF', '#67C23A', '#909399']
          this.drawPie('orderPie', result.arr, colors, 'orderPieChart', this.LAN.order)
        }
      })
    },
    drawGoodsPie () {
      getGoodsChartData({shopId: this.filter.shopId}).then(res => {
        if (res.code * 1 === 0) {
          let mirrorMap = {
            '1': this.LAN.saleing,
            '2': this.LAN.stocking
          }
          let result = this.transionData(res.data, mirrorMap)
          this.totalMap.goods = result.total
          let colors = ['#67C23A', '#E6A23C']
          this.drawPie('goodsPie', result.arr, colors, 'goodsPieChart', this.LAN.goods)
        }
      })
    },
    drawMemberPie () {
      getMemberChartData().then(res => {
        if (res.code * 1 === 0) {
          let mirrorMap = {
            '1': this.LAN.offline,
            '2': this.LAN.online
          }
          let result = this.transionData(res.data, mirrorMap)
          this.totalMap.member = result.total
          let colors = ['#F56C6C', '#67C23A']
          this.drawPie('memberPie', result.arr, colors, 'memberPieChart', this.LAN.member)
        }
      })
    },
    drawDiscountPie () {
      getDiscountChartData({shopId: this.filter.shopId}).then(res => {
        if (res.code * 1 === 0) {
          let mirrorMap = {
            '1': this.LAN.receivePending,
            '2': this.LAN.usePending,
            '3': this.LAN.used,
            '4': this.LAN.completed
          }
          let result = this.transionData(res.data, mirrorMap)
          this.totalMap.discount = result.total
          let colors = ['#E6A23C', '#909399', '#409EFF', '#67C23A']
          this.drawPie('discountPie', result.arr, colors, 'discountPieChart', this.LAN.discount)
        }
      })
    },
    transionData (data, mirrorMap) { // 数据模型转换
      let targetMap = {}
      data.forEach(row => {
        let map = {}
        map[row._id.status] = row.value
        targetMap = {...targetMap, ...map}
      })
      let mirror = JSON.parse(JSON.stringify(mirrorMap))
      for (let key in mirror) {
        mirror[key] = 0
      }
      let resultMap = {...mirror, ...targetMap}
      let targetArr = []
      for (let key in resultMap) {
        let map = {}
        map.name = mirrorMap[key]
        map.value = resultMap[key] || 0
        targetArr.push(map)
      }
      let total = 0
      for (let row of targetArr) {
        total += parseInt(row.value, 10)
      }
      return {
        arr: targetArr,
        total: total
      }
    },
    drawPie (id, data, colors, flag, name) {
      this[flag] = echarts.init(document.getElementById(id))
      this[flag].setOption({
        tooltip: {
          trigger: 'item',
          padding: [12, 16],
          formatter: '{a}<br/>{b}({d}%)'
        },
        legend: {
          icon: 'circle',
          orient: 'horizontal',
          bottom: 30,
          x: 'center',
          itemGap: 15,
          itemWidth: 8,
          itemHeight: 8,
          padding: [5, 10],
          selectedMode: false,
          formatter: (name) => {
            for (let item of data) {
              if (item.name === name) {
                return `${name}(${item.value})`
              }
            }
          },
          textStyle: {
            color: '#666'
          }
        },
        series: [
          {
            name: name || this.LAN.visitNumber,
            type: 'pie',
            radius: ['60%', '68%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                formatter: (params) => {
                  return `{precent|${params.percent}}\n{title|${params.name}}`
                },
                rich: {
                  precent: {
                    color: '#333',
                    align: 'center',
                    fontSize: 30,
                    padding: [0, 0, 5, 0]
                  },
                  title: {
                    color: '#666',
                    fontSize: 14,
                    align: 'center'
                  }
                }
              }
            },
            data: data
          }
        ],
        color: colors
      })
    },
    updateCharts () {
      this.lineChart.resize()
      this.orderPieChart.resize()
      this.goodsPieChart.resize()
      this.memberPieChart.resize()
      this.discountPieChart.resize()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
