<template>
  <el-dialog
    title="更换手机号"
    :visible="visible"
    width="450px"
    @close="close"
    :close-on-click-modal="false"
    id="Change_Telephone_Dialog">
    <div class="phoneModal">
      <el-form
        :model="form"
        :rules="changeRules"
        ref="phoneForm"
        label-width="100px">
        <el-form-item label="新手机号" prop="telephone">
          <el-input placeholder="新手机号" v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validCode">
          <div class="warp">
            <el-input @keyup.enter.native="submit" class="phoneInput" v-model="form.validCode" placeholder="请输入手机验证码" clearable></el-input>
            <el-button class="sendBtn" :disabled="!isSendFlag" @click="getTelephoneCode">{{verText}}</el-button>
          </div>
        </el-form-item>
        <el-form-item class="change-form-btn">
          <el-button type="primary" @click="submit">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import {getTelephoneCode, changeTelephone} from '../proxy'
import {validatePhone, validateCode} from '../../../libs/validate'
export default {
  name: 'phoneModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.$nextTick(() => {
          this.$refs.phoneForm.resetFields()
        })
      }
    }
  },
  data () {
    return {
      verText: '获取验证码',
      isSendFlag: true,
      form: {
        telephone: '', // 手机号
        validCode: '' // 验证码
      },
      changeRules: {
        telephone: [
          {
            required: true,
            validator: validatePhone,
            trigger: 'blur'
          }
        ],
        validCode: [
          {
            required: true,
            validator: validateCode,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    submit () { // 修改新手机
      this.$refs.phoneForm.validate((valid) => {
        if (valid) {
          let params = {
            telephone: this.form.telephone,
            validCode: this.form.validCode
          }
          changeTelephone(params).then((res) => {
            if (res.code * 1 === 0 && res.data) {
              this.$message.success('手机号修改成功')
              this.$nextTick(() => {
                this.close()
                this.$emit('refresh')
              })
            }
          })
        } else {
          return false
        }
      })
    },
    getTelephoneCode () { // 获取手机验证码
      getTelephoneCode({telephone: this.form.telephone}).then((res) => {
        if (res.code * 1 === 0) {
          this.form.validCode = res.data
          this.startTime()
        }
      })
    },
    startTime () { // 启动计时器
      this.verText = `60s后发送`
      let wait = 59
      this.isSendFlag = false
      let timer = setInterval(() => {
        if (wait > 0) {
          this.verText = `${wait}s后发送`
          wait--
        } else {
          this.isSendFlag = true
          this.verText = '重新发送'
          clearInterval(timer)
        }
      }, 1000)
    },
    close () { // 关闭弹窗
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped lang="scss">
  .phoneModal{
    width:400px;
    .warp{
      display: flex;
      justify-content: space-between;
      .phoneInput{
        width:180px;
      }
    }
    .change-form-btn{
      text-align: right;
    }
  }
</style>
