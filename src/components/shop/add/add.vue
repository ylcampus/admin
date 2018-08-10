<template>
  <div id="AddShop">
    <div class="yle_detail_title"><span>{{LAN.createShop}}</span></div>
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" size="small">
        <el-form-item :label="LAN.brand" prop="brand">
          <el-input v-model="form.brand" :placeholder="LAN.brandHolder"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.host" prop="host">
          <el-input v-model="form.host" :placeholder="LAN.hostHolder"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.shopId" prop="shopId">
          <el-input v-model="form.shopId" :placeholder="LAN.shopIdHolder"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.skuid" prop="skuId">
          <el-input v-model="form.skuId" :placeholder="LAN.skuidHolder"></el-input>
        </el-form-item>
        <el-form-item :label="LAN.brief" prop="desc">
          <el-input rows = "4" type="textarea" v-model="form.desc" :placeholder="LAN.briefHolder"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">{{LAN.create}}</el-button>
          <el-button @click="$router.push('/shop')">{{LAN.cancel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {addShop} from '../proxy'
import {validateName, validateHost, validateShopId, validateSkuId, checkSpecialChar} from '../../../libs/validate'
import LAN from '@/libs/il8n'
export default {
  name: 'addShop',
  data () {
    return {
      LAN: LAN.enterShop.add,
      form: {
        shopId: '', // 店铺Id
        host: '', // 主机名
        skuId: '', // skuId
        brand: '', // 品牌
        desc: '' // 描述
      },
      rules: {
        brand: [ // 品牌
          {
            required: true,
            message: LAN.enterShop.add.brandMsg,
            trigger: 'blur'
          },
          {
            validator: validateName,
            trigger: 'blur'
          },
          {
            validator: checkSpecialChar,
            trigger: 'blur'
          }
        ],
        host: [ // 主机名称（官方域名）
          {
            required: true,
            message: LAN.enterShop.add.hostMsg,
            trigger: 'blur'
          },
          {
            validator: validateHost,
            trigger: 'blur'
          }
        ],
        shopId: [ // 店铺Id
          {
            required: true,
            message: LAN.enterShop.add.shopIdMsg,
            trigger: 'blur'
          },
          {
            validator: validateShopId,
            trigger: 'blur'
          }
        ],
        skuId: [ // skuId
          {
            required: true,
            message: LAN.enterShop.add.skuidMsg,
            trigger: 'blur'
          },
          {
            validator: validateSkuId,
            trigger: 'blur'
          }
        ],
        desc: [ // 描述
          {
            min: 0,
            max: 255,
            message: LAN.enterShop.add.briefMsg,
            trigger: 'blur'
          },
          {
            validator: checkSpecialChar,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm(this.LAN.createConfirm, this.LAN.enter, {
            confirmButtonText: this.LAN.createSuccess,
            cancelButtonText: this.LAN.opaCancel,
            type: 'warning'
          }).then(() => {
            let params = {
              brand: this.form.brand,
              host: this.form.host,
              shopId: this.form.shopId,
              skuId: this.form.skuId
            }
            if (this.form.desc) {
              params.desc = this.form.desc
            }
            addShop(params).then((res) => {
              if (res.code * 1 === 0) {
                this.$message.success('新建店铺成功')
                setTimeout(() => {
                  this.$router.push('/shop')
                }, 2000)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '操作已取消'
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  @import "style";
</style>
