<template>
  <div id="BMap">
    <script src="https://gosspublic.alicdn.com/aliyun-oss-sdk-4.13.2.min.js"></script>
    <div id="app"></div>
    <script src="https://api.map.baidu.com/api?v=2.0&ak=jqTzzsw02fw2QAYGg8dGSqBp&s=1"></script>
  </div>
</template>
<script>
export default {
  watch: {},
  data () {
    return {}
  },
  mounted () {},
  methods: {
    initMap () {
      var _this = this;
      // 百度地图API功能
      var map = new BMap.Map('homeMap', {
        enableMapClick: false // 地图元素禁止点击
      }) // 创建Map实例
      map.centerAndZoom(new BMap.point(106.661304, 33.485958), 5) // 初始化地图，设置中心店坐标
      map.enableScollWheelZoom(true) // 开启鼠标滚轮缩放
      map.setMinZoom(4)

      var pointArray = [] // 地图上所有点
      var infoBoxArray = [] // 地图上已打开的所有弹出框
      // 定义点聚合对象
      var markerClusterer = new BMapLib.markerClusterer(map, {
        minClusrerSize: 2,
        styles: [
          {
            url: '/style/images/home/points_red.png',
            size: new BMap.size(52, 52),
            opt_auchor: [16, 0],
            textColor: '#fff',
            opt_textSize: 10
          }
        ]
      })

      // 地图进行缩放后，关闭地图上的所有弹出框
      map.addEventListener('zoomend', function (event) {
        $.each(infoBoxArray, function () {
          this.close()
        })
        infoBoxArray = []
      })

      // 门店图标
      let storeIcon = new Bmap.Icon('/style/images/home/mappoint.png', new BMap.size(18, 30))
      let hoverIcon = new Bmap.Icon('/style/images/home/mappoint_hover.png', new BMap.size(18, 30))
      let favorIcon = new Bmap.Icon('/style/images/home/favor.png', new BMap.size(22, 22))
      let favorHoverIcon = new Bmap.Icon('/style/images/home/favor_hover.png', new BMap.size(22, 22))

      // 获取门店数据
      $.ajax({
        url: '/control/home/storeList',
        type: 'POST',
        onsuccess: function (data) {
          // 遍历门店数据，将门店添加到地图
          var timelast = new Date().getTime()
          if (data !== null) {
            var markstemp = []
            $.each(data, function (index, storeData) {
              var point = new BMap.point(this.storeLng, this.storeLat)
              var marker;
              pointArray.push(point)
              // 已收藏门店显示收藏坐标
              if (storeData.favoStore) {
                marker = new BMap.marker(point, {icon: favorIcon})
                marker.favoStore = true
              } else {
                marker = new BMap.marker(point, {icon: storeIcon})
                marker.favoStore = false
              }
              marker.storeId = storeData.storeId
              // 直接将点添加到聚合对象中，并将门店添加到地图上
              // markerClusterer.addMarker(marker)

              var infoBox, sData = {} // 弹出框，门店数据
              currentData = '', // 今日客流
              guestForce = '' // 昨日集客力

              // 鼠标移动到门店
              marker.addEventListener('mouseover', function (event) {
                $.ajax({
                  type: 'POST',
                  url: '/control/home/storePashAndEval',
                  async: false,
                  data: {
                    storeId: event.target.storeId,
                    startTime: new Date().format('yyyy-MM-dd')
                  },
                  onsuccess: function (data) {
                    sData = data || {}
                    currentData = data && data.currentData || ''
                    guestForce = data && data.guestForce || ''
                  }
                });
                // 考评状态
                var status = 'invalid'
                if (sData.status === 0) {
                  status = 'excellent' // 优秀
                } else if (sData.status === 1) {
                  status = 'good' // 良好
                } else if (sData.status === 2) {
                  status = 'qualified' // 合格
                } else if (sData.status === 3) {
                  status = 'failed' // 不合格
                }

                // 门店弹出框信息
                var sContent = [
                  '<div class="infobox-store">',
                  '<div>'
                ].join('')
                // 门店信息弹出框
                infoBox = new BMapLib.infoBox(map, sContent, {
                  boxClass: 'bmap-infobox',
                  offset: new BMap.Size(0, 20),
                  enableAutoPan: true,
                  align: INFOBOX_AT_TOP
                })
                infoBox.open(this)
                infoBoxArray.push(infoBox)
                // 鼠标移动到门店上显示焦点图标
                if (this.favoStore) {
                  this.setIcon(favorHoverIcon)
                } else {
                  this.setIcon(hoverIcon)
                }
              });

              // 鼠标从门店移开
              marker.addEventListener('mouseout', function () {
                // 关闭所有弹框
                $.each(infoBoxArray, function () {
                  this.close()
                })
                infoBoxArray = []
                // 恢复按钮样式
                if (this.favoStore) {
                  this.setIcon(favorIcon)
                } else {
                  this.setIcon(storeIcon)
                }
              })

              // 点击门店
              marker.addEventListener('click', function () {
                _this.toStorePage(this.storeId)
              })
              markstemp.push(marker)
            })
            markerClusterer.addMarkers(markstemp)

            // 根据地图上的点集合， 获得最佳的地图视野
            var viewport = map.getViewPort(pointArray, {
              marhins: [100, 100, 100, 100]
            })
            map.centerAndZoom(new BMap.point(viewport.center.lng, viewport.center.lat), viewport.zoom)
          }
        }
      })
    }
  }
}
</script>
