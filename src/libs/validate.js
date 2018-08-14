import LAN from '@/libs/il8n'
// 验证姓名
module.exports.validateName = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (value.length > 25) {
    callback(new Error(LAN.common.validateName))
  } else {
    callback()
  }
}

// 验证性别
module.exports.validateSex = (rule, value, callback) => {
  if (value !== 1 && value !== 2) {
    callback(new Error(LAN.common.validateSex))
  } else {
    callback()
  }
}

// 验证特殊字符
module.exports.checkSpecialChar = (rule, value, callback) => {
  let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  if (pattern.test(value)) {
    callback(new Error(LAN.common.checkSpecialChar))
  } else {
    callback()
  }
}

// 验证手机号
module.exports.validatePhone = (rule, value, callback) => {
  if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))) {
    callback(new Error(LAN.common.validatePhone))
  } else {
    callback()
  }
}

// 验证手机号
module.exports.validateCode = (rule, value, callback) => {
  if (value.length !== 6 || !/^[1-9]+[0-9]*]*$/.test(value)) {
    callback(new Error(LAN.common.validateCode))
  } else {
    callback()
  }
}

// 验证密码
module.exports.validatePwd = (rule, value, callback) => {
  if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{8,20}$/.test(value)) {
    callback(new Error(LAN.common.validatePwd))
  } else {
    callback()
  }
}

// 验证账号
module.exports.validateAccount = (rule, value, callback) => {
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
    callback(new Error(LAN.common.validateAccount))
  } else {
    callback()
  }
}

// 验证主机名
module.exports.validateHost = (rule, value, callback) => {
  if (!value) {
    callback(new Error(LAN.common.validateHost))
  } else {
    callback()
  }
}

// 验证主机名
module.exports.validateShopId = (rule, value, callback) => {
  if (!value) {
    callback(new Error(LAN.common.validateShopId))
  } else {
    callback()
  }
}

// 验证Suid
module.exports.validateSkuId = (rule, value, callback) => {
  if (!value) {
    callback(new Error(LAN.common.validateSkuId))
  } else {
    callback()
  }
}
