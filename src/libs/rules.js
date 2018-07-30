module.exports = {
  // 用户类校验规则
  userRules: {
    telephone: [
      {
        validator: (rule, value, callback) => {
          if (value === '' || value === null || value === 'null') {
            callback()
          } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确的电话号码'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ],
    email: [{
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === 'null') {
          callback()
        } else if (!/^[a-zA-Z0-9._%+-]+@(?!.*\.\..*)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
          callback(new Error('请输入正确的电子邮件地址'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }]
  },
}
