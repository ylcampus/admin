<template>
  <el-dialog
    :title="LAN.changePhone"
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
        <el-form-item :label="LAN.telephone" prop="telephone">
          <el-input :placeholder="LAN.telephone" v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.validCode" prop="validCode">
          <div class="warp">
            <el-input @keyup.enter.native="submit" class="phoneInput" v-model="form.validCode" :placeholder="LAN.phoneInputHolder" clearable></el-input>
            <el-button class="sendBtn" :disabled="!isSendFlag" @click="getTelephoneCode">{{verText}}</el-button>
          </div>
        </el-form-item>
        <el-form-item class="change-form-btn">
          <el-button type="primary" @click="submit">{{LAN.enter}}</el-button>
          <el-button @click="close">{{LAN.cancel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import {getTelephoneCode, changeTelephone} from '../proxy'
import {validatePhone, validateCode} from '../../../libs/validate'
import LAN from '@/libs/il8n'
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
      LAN: LAN.personal.phoneModal,
      verText: LAN.personal.phoneModal.verText,
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
              this.$message.success(this.LAN.updateSuccess)
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
      this.verText = this.LAN.send1
      let wait = 59
      this.isSendFlag = false
      let timer = setInterval(() => {
        if (wait > 0) {
          this.verText = `${wait}${this.LAN.send2}`
          wait--
        } else {
          this.isSendFlag = true
          this.verText = this.LAN.sendAgain
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
