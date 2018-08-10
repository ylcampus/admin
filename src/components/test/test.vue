<template>
  <div id="Overview">
    <input value = "提交订单" type="button" @click="submitOrder">
    <br>
    <br>
    <input value = "会员注册" type="button" @click="register">
    <br>
    <br>
    <input value = "添加打折券" type="button" @click="addDiscount">
    <br>
    <br>
    <input value = "添加商品" type="button" @click="addGoods">
  </div>
</template>
<script>
import {sha256} from 'js-sha256'
import proxy from './proxy'
export default {
  name: 'overview',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    submitOrder () { // 提交订单
      let params = {
        goodsId: '526420727202',
        size: 'xl',
        color: '蓝白',
        discountId: 'adde5f74-27fa-4e62-acff-549db88bf732'
      }
      proxy.submitOrder(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    register () { // 获取订单列表
      let params = {
        account: 'dongjiguo@9999',
        pwd: sha256('ule@123')
      }
      proxy.register(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    addDiscount () { // 添加打折券
      proxy.addDiscount().then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    },
    addGoods () { // 添加商品
      let params = {
        goodsId: '526420727202',
        title: 'ASICS亚瑟士女鞋跑步鞋GEL-KAYANO 22稳定跑鞋运动鞋T597N-9099',
        price: '1290.00',
        shopId: 64474411,
        status: 1,
        timeStamp: 189283912,
        pics: {
          ';111375353;': '//img.alicdn.com/imgextra/i8/TB17AW1NXXXXXaPaXXX616z7VXX_014927.jpg',
          ';1144994198;': '//img.alicdn.com/imgextra/i4/TB1eJbaNXXXXXaUXFXXFTC97VXX_015011.jpg',
          ';45638182;': '//img.alicdn.com/imgextra/i4/TB1aDG9NXXXXXXdXVXXNBd08XXX_020047.jpg',
          ';43655888;': '//img.alicdn.com/imgextra/i2/TB13o_nNXXXXXXdXpXXyQrC7VXX_014946.jpg'
        },
        descPics: [
          'https://img.alicdn.com/imgextra/i3/661559176/TB2MjsKkYsTMeJjSszdXXcEupXa_!!661559176.jpg',
          'https://img.alicdn.com/imgextra/i1/661559176/TB2beg6gfNNTKJjSspeXXaSwpXa_!!661559176.jpg',
          'https://img.alicdn.com/imgextra/i1/661559176/TB2U6XklbsTMeJjSszhXXcGCFXa_!!661559176.jpg',
          'https://img.alicdn.com/imgextra/i3/661559176/TB2LPZ3gfNNTKJjSspcXXb4KVXa_!!661559176.jpg',
          'https://img.alicdn.com/imgextra/i4/661559176/TB2oWDtgWagSKJjy0FbXXa.mVXa_!!661559176.jpg',
          'https://img.alicdn.com/imgextra/i3/661559176/TB2YZvkg6ihSKJjy0FeXXbJtpXa_!!661559176.jpg',
          'https://img.alicdn.com/imgextra/i4/661559176/TB2lvYRgWigSKJjSsppXXabnpXa_!!661559176.jpg'
        ],
        skuList: [
          {
            skuId: '3134320497661',
            names: '36 灰色/紫色 ',
            cId: '111375353',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497663',
            names: '37 灰色/紫色 ',
            cId: '111375353',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497665',
            names: '37.5 灰色/紫色 ',
            cId: '111375353',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497667',
            names: '38 灰色/紫色 ',
            cId: '111375353',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497669',
            names: '39 灰色/紫色 ',
            cId: '111375353',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497671',
            names: '39.5 灰色/紫色 ',
            cId: '111375353',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497662',
            names: '36 黑色/蓝色 ',
            cId: '43655888',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497664',
            names: '37 黑色/蓝色 ',
            cId: '43655888',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497666',
            names: '37.5 黑色/蓝色 ',
            cId: '43655888',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497668',
            names: '38 黑色/蓝色 ',
            cId: '43655888',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497670',
            names: '39 黑色/蓝色 ',
            cId: '43655888',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3134320497672',
            names: '39.5 黑色/蓝色 ',
            cId: '43655888',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3444415974091',
            names: '41.5 黑色/蓝色 ',
            cId: '43655888',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3139445027656',
            names: '36 蓝色/白色/水蓝色 ',
            cId: '1144994198',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3139445027653',
            names: '37 蓝色/白色/水蓝色 ',
            cId: '1144994198',
            price: '1290.00',
            stock: 39
          },
          { skuId: '3139445027654',
            names: '37.5 蓝色/白色/水蓝色 ',
            cId: '1144994198',
            price: '1290.00',
            stock: 32
          },
          { skuId: '3139445027651',
            names: '38 蓝色/白色/水蓝色 ',
            cId: '1144994198',
            price: '1290.00',
            stock: 37
          },
          { skuId: '3139445027657',
            names: '39 蓝色/白色/水蓝色 ',
            cId: '1144994198',
            price: '1290.00',
            stock: 6
          },
          { skuId: '3139445027655',
            names: '39.5 蓝色/白色/水蓝色 ',
            cId: '1144994198',
            price: '1290.00',
            stock: 2
          },
          { skuId: '3139445027652',
            names: '40 蓝色/白色/水蓝色 ',
            cId: '1144994198',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3139855928699',
            names: '36 粉色/灰色 ',
            cId: '45638182',
            price: '1290.00',
            stock: 0
          },
          { skuId: '3139855928696',
            names: '37 粉色/灰色 ',
            cId: '45638182',
            price: '1290.00',
            stock: 62
          },
          { skuId: '3139855928697',
            names: '37.5 粉色/灰色 ',
            cId: '45638182',
            price: '1290.00',
            stock: 100
          },
          { skuId: '3139855928695',
            names: '38 粉色/灰色 ',
            cId: '45638182',
            price: '1290.00',
            stock: 29
          },
          { skuId: '3139855928700',
            names: '39 粉色/灰色 ',
            cId: '45638182',
            price: '1290.00',
            stock: 54
          },
          { skuId: '3139855928698',
            names: '39.5 粉色/灰色 ',
            cId: '45638182',
            price: '1290.00',
            stock: 8
          },
          { skuId: '3202542766413',
            names: '40 粉色/灰色 ',
            cId: '45638182',
            price: '1290.00',
            stock: 0
          }
        ]
      }
      proxy.addGoods(params).then((res) => {
        console.log('数据正确')
        console.log(res)
      }).catch((err) => {
        console.log('发生了错误')
        console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  @import "./style.scss";
</style>
