// 函数库 2018-07
'use strict'
// 计算密码强度
module.exports.pwdStrength = (pwd) => {
  const Ocolor = '#eeeeee'
  const Lcolor = '#FF0000'
  const Mcolor = '#FF9900'
  const Hcolor = '#41ce48'
  let backColor = '#eeeeee'
  let level = 0
  let strengthTxt = '无'
  let strength = '1%'
  if (pwd == null || pwd === '') {
    strengthTxt = '无'
    strength = '1%'
    backColor = Ocolor
  } else {
    let mode = 0
    for (let i = 0; i < pwd.length; i++) {
      let charMode = null
      let charCode = pwd.charCodeAt(i)
      // 判断输入密码的类型
      if (charCode >= 48 && charCode <= 57) { // 数字
        charMode = 1
      } else if (charCode >= 65 && charCode <= 90) { // 大写
        charMode = 2
      } else if (charCode >= 97 && charCode <= 122) { // 小写
        charMode = 4
      } else {
        charMode = 8
      }
      mode |= charMode
    }
    level = 0
    for (let i = 0; i < 4; i++) {
      if (mode & 1) {
        level++
      }
      mode >>>= 1
    }
    switch (level) {
      case 0:
        strengthTxt = '无'
        strength = '5%'
        break
      case 1:
        strengthTxt = '低'
        strength = '20%'
        backColor = Lcolor
        break
      case 2:
        strengthTxt = '中'
        strength = '60%'
        backColor = Mcolor
        break
      default:
        strengthTxt = '高'
        strength = '99%'
        backColor = Hcolor
        break
    }
  }
  return {
    strengthTxt: strengthTxt,
    strength: strength,
    color: backColor
  }
}

// 获取时刻列表
module.exports.mirrorQuaraterTick = () => {
  let targetMap = {}
  for (let i = 0; i < 24; i++) {
    const key = i > 9 ? i : '0' + i
    let key00 = key + ':00'
    let key15 = key + ':15'
    let key30 = key + ':30'
    let key45 = key + ':45'
    let map00 = {}
    map00[key00] = 0
    let map15 = {}
    map00[key15] = 0
    let map30 = {}
    map00[key30] = 0
    let map45 = {}
    map00[key45] = 0
    targetMap = {...targetMap, ...map00, ...map15, ...map30, ...map45}
  }
  return targetMap
}

// 获取日期数据
module.exports.getDateTxtArr = (start, end) => {
  let startTime = new Date(start)
  let endTime = new Date(end)
  let backMap = {}
  while ((endTime.getTime() - startTime.getTime()) > 0) {
    const year = startTime.getFullYear()
    const month = startTime.getMonth() + 1 > 10 ? startTime.getMonth() + 1 : '0' + (startTime.getMonth() + 1)
    const date = startTime.getDate() > 9 ? startTime.getDate() : '0' + startTime.getDate()
    const dateStr = year + '-' + month + '-' + date
    const map = {}
    map[dateStr] = 0
    backMap = {...backMap, ...map}
    startTime.setDate(startTime.getDate() + 1)
  }
  return backMap
}

// 获取日期
module.exports.getDateString = (val) => {
  val = val || 0
  let timenow = new Date()
  timenow.setDate(timenow.getDate() + val)
  let y = timenow.getFullYear()
  let m = timenow.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = timenow.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d
}

// 获取日期
module.exports.getDate = (date) => {
  let time = new Date(date)
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = time.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d
}

// 阿拉伯数字转换为简体汉字
module.exports.arabiaToSimplisiedChinese = (num) => {
  let i = 0
  for (i = num.length - 1; i >= 0; i--) {
    num = num.replace(',', '')
    num = num.replace(' ', '')
  }
  if (isNaN(num)) {
    return false
  }
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  let part = String(num).split('.')
  let newchar = ''
  // 小数点前进行转换
  for (let i = part[0].length - 1; i >= 0; i--) {
    // 数量不能超过十亿单位
    if (part[0].length > 10) {
      return false
    }
    let temnewchar = ''
    let perchar = part[0].charAt(i)
    switch (perchar) {
      case '0': temnewchar = '零' + temnewchar; break
      case '1': temnewchar = '一' + temnewchar; break
      case '2': temnewchar = '二' + temnewchar; break
      case '3': temnewchar = '三' + temnewchar; break
      case '4': temnewchar = '四' + temnewchar; break
      case '5': temnewchar = '五' + temnewchar; break
      case '6': temnewchar = '六' + temnewchar; break
      case '7': temnewchar = '七' + temnewchar; break
      case '8': temnewchar = '八' + temnewchar; break
      case '9': temnewchar = '九' + temnewchar; break
    }
    switch (part[0].length - i - 1) {
      case 0: break
      case 1: if (perchar !== 0) temnewchar = temnewchar + '十'; break
      case 2: if (perchar !== 0) temnewchar = temnewchar + '百'; break
      case 3: if (perchar !== 0) temnewchar = temnewchar + '千'; break
      case 4: temnewchar = temnewchar + '万'; break
      case 5: if (perchar !== 0) temnewchar = temnewchar + '十'; break
      case 6: if (perchar !== 0) temnewchar = temnewchar + '百'; break
      case 7: if (perchar !== 0) temnewchar = temnewchar + '千'; break
      case 8: temnewchar = temnewchar + '亿'; break
      case 9: temnewchar = temnewchar + '十'; break
    }
    newchar = temnewchar + newchar
  }
  // 替换所有无用汉字，直到没有此类无用的数字为止
  while (newchar.search('零零') !== -1 || newchar.search('零亿') !== -1 || newchar.search('亿万') !== -1 || newchar.search('零万') !== -1) {
    newchar = newchar.replace('零亿', '亿')
    newchar = newchar.replace('亿万', '亿')
    newchar = newchar.replace('零万', '万')
    newchar = newchar.replace('零零', '零')
  }
  // 替换以 一十 为 十
  if (newchar.indexOf('一十') === 0) {
    newchar = newchar.substr(1)
  }
  // 替换以零结尾的为空
  if (newchar.lastIndexOf('零') === newchar.length - 1) {
    newchar = newchar.substr(0, newchar.length - 1)
  }
  return newchar
}

// 获取日期与时间
let _getDateAndTime = (date) => {
  let time = new Date(date)
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = time.getDate()
  d = d < 10 ? '0' + d : d
  let hour = time.getHours()
  let h = hour < 10 ? '0' + hour : hour
  let minute = time.getMinutes()
  let mi = minute < 10 ? '0' + minute : minute
  let second = time.getSeconds()
  let s = second < 10 ? '0' + second : second
  return y + '/' + m + '/' + d + ' ' + h + ':' + mi + ':' + s
}
module.exports.getDateAndTime = _getDateAndTime

// 获取时间文本
module.exports.getDateTxt = (date) => {
  const targetTime = new Date(date).getTime()
  const nowTime = new Date().getTime()
  const dateCount = nowTime - targetTime
  let timeTxt = ''
  if (Math.floor(dateCount / 1000) < 1) {
    timeTxt = '刚刚'
  } else if (Math.floor(dateCount / 1000) < 60) {
    timeTxt = Math.floor(dateCount / 1000) + '秒前'
  } else if (Math.floor(dateCount / (60 * 1000)) < 60) {
    timeTxt = Math.floor(dateCount / (60 * 1000)) + '分钟前'
  } else if (Math.floor(dateCount / (60 * 60 * 1000)) < 24) {
    timeTxt = Math.floor(dateCount / (60 * 60 * 1000)) + '小时前'
  } else if (Math.floor(dateCount / (24 * 60 * 60 * 1000)) <= 3) {
    timeTxt = Math.floor(dateCount / (24 * 60 * 60 * 1000)) + '天前'
  } else {
    timeTxt = _getDateAndTime(date)
  }
  return timeTxt
}

// 计算时间
module.exports.calcTime = (timeStamp) => {
  const time = parseInt(timeStamp / 1000, 10)
  const second = time % 60
  const minute = parseInt(time / 60, 10) % 60
  const hour = parseInt(time / (60 * 60), 10)
  let h = hour < 10 ? '0' + hour : hour
  let mi = minute < 10 ? '0' + minute : minute
  let s = second < 10 ? '0' + second : second
  return {
    hour: h,
    minute: mi,
    second: s
  }
}
