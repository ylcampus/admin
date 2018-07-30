<template>
  <div id="AddShop">
    <div class="yle_detail_title"><span>创建店铺</span></div>
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" size="small">
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="官方域名" prop="host">
          <el-input v-model="form.host" placeholder="请输入域名信息"></el-input>
        </el-form-item>
        <el-form-item label="店铺Id" prop="shopId">
          <el-input v-model="form.shopId" placeholder="请输入店铺Id"></el-input>
        </el-form-item>
        <el-form-item label="skuId" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入skuId"></el-input>
        </el-form-item>
        <el-form-item label="品牌简介" prop="desc">
          <el-input rows = "4" type="textarea" v-model="form.desc" placeholder="请输入品牌简介信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button @click="$router.push('/shop')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {addShop} from '../proxy'
import {validateName, validateHost, validateShopId, validateSkuId, checkSpecialChar} from '../../../libs/validate'
export default {
  name: 'addShop',
  data () {
    return {
      form: {
        shopId: '', // 店铺Id
        host: '', // 主机名
        skuId: '', // skuId
        brand: '', // 品牌
        desc: '' // 描述
      },
      rules: {
        brand: [ // 店铺名称
          {
            required: true,
            message: '请输入品牌名称',
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
            message: '请输入主机名称',
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
            message: '请输入店铺Id',
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
            message: '请输入skuId',
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
            message: '长度在 1 到 255 个字符',
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
          this.$confirm('店铺创建后，除品牌简介之外的数据都将不可再编辑，确认要创建店铺吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
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
