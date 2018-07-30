<template>
  <div class="pictureCenter">
    <!--选择区域树-->
    <div class="select flex-right">
      <treeSelect
        :treeData="treeData"
        :selectId.sync="getData.communityId"
        selectType.sync="0"
        :canChoose="[0,1]"
        :err="false"
        placeHolder="全部社区"
        searchPlaceHodel="搜索社区名"
        width="200px"
        height="32px">
      </treeSelect>
    </div>
    <!--列表-->
    <div class="lists srollStyle" @scroll="onSroll($event)">
      <div class="list" v-for="dateList in dateLists" :key="dateList.picDateId">
        <!--标题-->
        <div class="title">
          <span>{{dateList.picDate}}</span>
        </div>
        <!--图片-->
        <div class="picture">
          <div class="card" v-for="picture in dateList.pictures" :key="picture.offsetId" @click="openDetail(picture)">
            <img :src="picture.smallPicUrl">
            <div class="address">{{picture.communityName}}</div>
            <div class="info flex-center-between">
              <span class="capName">{{picture.chanelName}}</span>
              <span class="time">{{picture.captureTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <datePicker v-if="showDatePicker" :dateRange="dateRange" :date.sync="currentDate" ref="datePicker"></datePicker>
    <pictureDetail v-if="showPictureDetail" :url="bigPicUrl"></pictureDetail>
  </div>
</template>
<script>
import TreeSelect from '@/libs/treeSelect'
import datePicker from '@/libs/datePicker'
import pictureDetail from './pictureDetail'
import proxy from './proxy'
export default {
  data () {
    return {
      treeData: [],
      dateLists: [],
      dateRange: ['', ''],
      showDatePicker: false,
      currentDate: '',
      getData: {
        communityId: '',
        date: '',
        pageType: 'first',
        pageSize: '30',
        offsetId: '',
        captureDate: '',
        captureTime: ''
      },
      showPictureDetail: false,
      bigPicUrl: ''
    }
  },
  components: {
    TreeSelect,
    datePicker,
    pictureDetail
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    openDetail (picture) {
      this.bigPicUrl = picture.bigPicUrl
      this.showPictureDetail = true
    },
    // 监听滚动事件
    onScroll (event) {
      let scrollBottom = event.currentTarget.offsetHeight + event.target.scrollTop // 滚动区域底部的高度 = 滚动区域顶部的高度 + 容器的固定高度
      let scrollHeight = event.target.scrollHeight // 容器内容的总高度
      if (scrollBottom === scrollHeight) { // 滚动到距离底部200-300px之后
        this.changeList(true)
      }
    },
    // 变更列表项
    changeList (isNext) {
      if (isNext) { // 获取下一页时，需要最后一个图片的信息
        this.getData.pageType = 'next'
        this.getDate.offsetId = this.getLast(this.getLast(this.dateLists).pictures).offsetId
        this.getData.captureDate = this.getLast(this.getLast(this.dateLists).pictures).captureDate
        this.getData.captureTime = this.getLast(this.getLast(this.dateLists).pictures).captureTime
      } else { // 获取第一页时，更新日期，清空列表
        this.getDate.date = this.currentDate
        this.dateLists = []
      }
      proxy.getList(this.getData).then(res => {
        if (res.code * 1 === 0) {
          res.data.rows.forEach((data, index) => {
            if (this.dateLists.length === 0 || this.getLast(this.dateLists).picDateId !== data.captureDate) {
              // 列表中没有数据，或者这一条数据的日期是新的时，列表中创建新的日期对象
              this.dateLists.push({
                picDate: this.currentDate === data.captureDate ? `今天${data.captureDate[8]}${data.captureDate[9]}日,
                ${data.captureDate[0]}${data.captureDate[1]}${data.captureDate[2]}${data.captureDate[3]}年
                ${data.captureDate[5]}${data.captureDate[6]}月` : `${data.captureDate[8]}
                ${data.captureDate[9]}日,${data.captureDate[0]}${data.captureDate[1]}
                ${data.captureDate[2]}${data.captureDate[3]}年${data.captureDate[5]}${data.captureDate[6]}月`,
                picDateId: data.captureDate,
                pictures: []
              })
            }
            this.getLast(this.dateLists).pictures.push(data)
          })
        }
      })
    },
    // 获取全部社区
    getTree () {
      proxy.getCommunityTree(this.getData).then(res => {
        if (res.code * 1 === 0) {
          res.data.subAreas.forEach(area => {
            if (area.subAreas && area.subAreas.length > 0) {
              this.treeData = this.treeData.concat(area.subAreas)
            }
          })
          this.getData.communityId = this.treeData[0].id
        }
      })
    },
    // 获取日期区间
    getRange () {
      this.currentDate = this.getNowFormatDate()
      this.dateRange[1] = this.getNowFormatDate()
      proxy.getRange({communityId: this.getData.communityId}).then(res => {
        if (res.code * 1 === 0) {
          if (res.data && res.data.earlyCaptureDate && res.data.earlyCaptureDate !== '') {
            this.dateRange[0] = res.data.earlyCaptureDate
          } else {
            this.dateRange[0] = this.getNowFormatDate()
          }
          this.showDatePicker = true
          this.$nextTick(() => {
            this.$refs.datePicker.disposeData()
          })
        }
      })
    },
    // 获取数组中的最后一项
    getLast (list) {
      return list[list.length - 1]
    },
    // 获取当前日期
    getNowFormatDate () {
      let date = new Date()
      let seperator = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month >= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let current = year + seperator + month + seperator + strDate
      return current
    },
    mounted () {
      this.getTree()
    }
  },
  watch: {
    // 选中区域时
    'getData.communityId' (val) {
      if (this.currentDate !== '') {
        this.changeList(false)
      }
    },
    // 日期变更时
    currentDate (val) {
      this.getData.date = val
      if (this.getData.communityId !== '') {
        this.changeList(false)
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
