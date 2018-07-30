<template>
  <div class="datePicker">
    <div class="select">
      <button class="text" @click="selectShow">
        <span>{{currentMouth.label}}</span>
        <i class="el-icon-caret-bottom"></i>
      </button>
      <div class="optionList scrollStyle" v-show="isSelectShow" v-clickoutside="handleClose">
        <div class="option" v-for="mouth in mouthList" :key="mouth.value" @click="changeMouth(mouth)">{{mouth.label}}</div>
      </div>
    </div>
    <div class="dateList">
      <div class="left" @click="scrollleft">
        <i class="el-icon-caret-left"></i>
      </div>
      <div class="scrollRange">
        <div class="scrollList">
          <button class="date" v-for="date in dateList" :key="date.value" :class="{'active': date.active, 'disabled': date.disabled}"
                  @click="changeDate(date)"></button>
          <span v-if="date.active">{{date.label}}</span>
          <span v-if="date.active">{{date.value}}</span>
        </div>
      </div>
      <div clas="right" @click="scrollRight">
        <i class="el-icon-caret-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
// 指令：点击非自身元素，且自身处于显示状态时，隐藏自身
const clickoutside = {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身则返回
      if (el.contains(e.target) || el.style.display === 'none') {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数 此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量， 方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', el.__vueClickOutside__)
  },
  update () {},
  unbind (el, binding) {
    // 移出事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
export default {
  props: {
    dateRange: { // 有数据的起始日期yyyy-mm-dd
      type: Array
    },
    date: { // 选中的日期yyyy-mm-dd
      type: String
    }
  },
  directives: {clickoutside},
  data () {
    return {
      mouthList: [], // 所有月份数据
      currentMonth: '',
      dateList: [], // 所有日期数据
      currentDate: '', // 当前选中的日期
      isSelectShow: false // 选择框是否显示
    }
  },
  mounted () {},
  methods: {
    // 处理数据
    disposeData () {
      // 初始化区间内全部月份数据
      this.mouthList = this.getMouthList(this.dateRange[0], this.dateRange[1])
      // 选中传入的默认月份
      this.mouthList.forEach(mouth => {
        if (mouth.value === `${this.date.split('-')[0]}-${this.date.split('-')[1]}`) {
          this.changeMouth(mouth)
        }
      })
    },
    // 选择月份
    changeMouth (mouth) {
      this.handleClose()
      this.currentMouth = mouth
      // 初始化该月份的日期数据
      if (mouth.type) {
        this.dateList = this.getDateList(mouth.date, mouth.type)
      } else {
        this.dateList = this.getDateList(mouth.value)
      }
      // 使选中的日期处于可见区域
      this.$nextTick(() => {
        let event = document.querySelector('.scoreRange')
        if (parseInt(this.currentDate.label, 10) > 10) {
          event.scrollTo(event.scrollLeft + (parseInt(this.currentDate.label, 10) - 1) * 50 - 130, 0)
        } else {
          event.scrollTo(0, 0)
        }
      })
    },
    // 点击日期时改变当前日期
    changeDate (val) {
      if (!val.disabled) {
        this.currentDate = val
      }
    },
    // 传入yyyy-mm-dd格式的起始月份,返回起始之间所有月份数据,只有开始和结束的月份有type和date属性
    getMouthList (start, end) {
      // 获得该范围内全部月份的基础数据
      let startYear = parseInt(this.dateRange[0].split('-')[0])
      let endYear = parseInt(this.dateRange[1].split('-')[0])
      let res = []
      for (let yyyy = startYear; yyyy <= endYear; yyyy++) {
        let sm = parseInt(this.dateRange[0].split('-')[1])
        let em = parseInt(this.dateRange[1].split('-')[1])
        if (yyyy < endYear && yyyy === startYear) {
          em = 12
        } else if (startYear !== endYear && yyyy < endYear) {
          sm = 1
          em = 12
        } else if (startYear !== endYear && yyyy === endYear) {
          sm = 1
        }
        for (let mm = sm; mm <= em; mm++) {
          res.push({
            value: `${yyyy}-${mm >= 10 ? '' + mm : '0' + mm}`,
            label: `${yyyy}年${mm >= 10 ? '' + mm : '0' + mm}月`
          })
        }
      }
      // 给起始月份加上type和date属性，用于控制该月份中哪些日期可以被点击
      if (res.length === 1) {
        res[0].type = 'both'
        res[0].date = this.dateRange
      } else {
        res[0].type = 'start'
        res.date = this.dateRange[0]
        res[res.length - 1].type = 'end'
        res[res.length - 1].date = this.dateRange[1]
      }
      return res
    },
    // 传入yyyy-mm-dd格式的月份，返回该月份yyyy-mm-dd格式的全部日期的数组。或传入yyyy-mm-dd格式的日期和type（值为start或end），控制该月份中哪些日期可以被点击
    getDateList (val, type) {
      // 获得该月份全部日期基本数据
      let vals = type === 'both' ? val[0].split('-') : val.split('-')
      let startTime = new Date(vals[0], vals[1] - 1, '01').getTime()
      let endTime = new Date(vals[0], vals[1], '01').getTime()
      let res = []
      for (let i = startTime; i < endTime; i += 24 * 60 * 60 * 1000) {
        let date = new Date(i)
        let yyyy = date.getFullYear()
        let mm = (date.getMonth() + 1) >= 10 ? '' + (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        let dd = date.getDate() >= 10 ? '' + date.getDate() : '0' + date.getDate()
        res.push({
          value: `${yyyy}-${mm}-${dd}`,
          label: dd,
          active: false
        })
      }
      // 是否有默认选择的日期，有的话选中默认值
      let isDate = false
      res.forEach((item, index) => {
        if (this.date === item.value || this.currentDate.value === item.value) {
          isDate = true
          this.currentDate = item
        }
      })
      // 传入参数有type时，可能存在部分日期不可点击的情况，做日期是否可被点击的校验
      let date = parseInt(vals[2])
      if (type === 'start') {
        // 初始月份中，初始日期之前的日期不能被点击，无默认日期则选中初始日期
        res.forEach((item, index) => {
          if (index < date - 1) {
            item.disabled = true
          } else if (!isDate && index === date - 1) {
            this.currentDate = item
          }
        })
      } else if (type === 'end') {
        // 结束月份中，结束日期之前的日期不能被点击，无默认值则选中结束日期
        res.forEach((item, index) => {
          if (index >= date) {
            item.disabled = true
          } else if (!isDate && index === date - 1) {
            this.currentDate = item
          }
        })
      } else if (type === 'both') {
        // 只有一个月时，起始日期之外不能被点击，无默认日期则选中结束日期
        res.forEach((item, index) => {
          if (index >= parseInt(val[1].split('-')[2]) || index < date - 1) {
            item.disabled = true
          } else if (!isDate && index === date - 1) {
            this.currentDate = item
          }
        })
      } else if (!isDate) { // 其他情况默认选中每个月的第一天
        this.currentDate = res[0]
      }
      return res
    },
    scrollLeft () {
      let event = document.querySelector('.scrollRange')
      event.scrollTo(event.scrollLeft - 200, 0)
    },
    scrollRight () {
      let event = document.querySelector('.scrollRange')
      event.scrollTo(event.scrollLeft + 200, 0)
    },
    handleClose (e) {
      this.isSelectShow = false
    },
    selectShow () {
      if (this.isSelectShow) {
        this.handleClose()
      } else {
        this.isSelectShow = true
      }
    }
  },
  watch: {
    // 当前日期发生改变时
    currentDate (newVal, oldVal) {
      // 旧的日期去掉被点击的样式
      if (oldVal && oldVal !== '') {
        let oldIndex = parseInt(oldVal.value.split('-')[2]) - 1
        this.dateList[oldIndex].active = false
      }
      // 新的日期显示被点击的样式
      let newIndex = parseInt(newVal.value.split('-')[2]) - 1
      this.dateList[newIndex].active = true
      this.$emit('update:date', newVal.value)
    },
    // 父组件传入新的当前日期时，重新处理数据
    date (val) {
      if (val !== this.currentDate.value) {
        this.disposeData()
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
