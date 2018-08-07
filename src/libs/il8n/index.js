// 国际化 2018-08
import EN from './en-us/language'
import ZH from './zh-cn/language'
const target = (localStorage.getItem('language') === 'English（英文）') ? EN : ZH
module.exports = target
