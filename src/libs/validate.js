// 验证姓名
module.exports.validateName = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (value.length > 25) {
    callback(new Error('长度不能超过25个字节'))
  } else {
    callback()
  }
}

// 验证性别
module.exports.validateSex = (rule, value, callback) => {
  if (value !== 1 && value !== 2) {
    callback(new Error('请选择性别'))
  } else {
    callback()
  }
}

// 验证特殊字符
module.exports.checkSpecialChar = (rule, value, callback) => {
  let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  if (pattern.test(value)) {
    callback(new Error('内容含有特殊字符'))
  } else {
    callback()
  }
}

// 验证手机号
module.exports.validatePhone = (rule, value, callback) => {
  if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

// 验证手机号
module.exports.validateCode = (rule, value, callback) => {
  if (value.length !== 6 || !/^[1-9]+[0-9]*]*$/.test(value)) {
    callback(new Error('请输入正确的验证码，六位数字'))
  } else {
    callback()
  }
}

// 验证密码
module.exports.validatePwd = (rule, value, callback) => {
  if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~?!@+-.#$%^&*])[\da-zA-Z~?!@+-.#$%^&*]{8,20}$/.test(value)) {
    callback(new Error('包含数字，字母及特殊字符且8到20位'))
  } else {
    callback()
  }
}

// 验证账号
module.exports.validateAccount = (rule, value, callback) => {
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
    callback(new Error('最短3个字符最长不超过16个字符'))
  } else {
    callback()
  }
}

// 验证主机名
module.exports.validateHost = (rule, value, callback) => {
  if (!value) {
    callback(new Error('格式错误'))
  } else {
    callback()
  }
}

// 验证主机名
module.exports.validateShopId = (rule, value, callback) => {
  if (!value) {
    callback(new Error('格式错误'))
  } else {
    callback()
  }
}

// 验证Suid
module.exports.validateSkuId = (rule, value, callback) => {
  if (!value) {
    callback(new Error('格式错误'))
  } else {
    callback()
  }
}
