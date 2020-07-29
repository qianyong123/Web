import React, { Component } from 'react'
import styles from './amap.less'
import {Button} from 'antd'

class Maps extends Component {
  static defaultProps = {
    markers: [],
    height: 400,
    colors: [
      '#3366cc',
      '#dc3912',
      '#ff9900',
      '#109618',
      '#990099',
      '#0099c6',
      '#dd4477',
      '#66aa00',
      '#b82e2e',
      '#316395',
      '#994499',
      '#22aa99',
      '#aaaa11',
      '#6633cc',
      '#e67300',
      '#8b0707',
      '#651067',
      '#329262',
      '#5574a6',
      '#3b3eac',
    ],
  }

  markers=[]
  adcode=100000
  

  componentDidMount() {
    const map = new AMap.Map('container', {
      center: [105.19382669582967, 33.258134],
      zoom: 4,
    })
    this.map = map
    const layers = [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()]
    map.add(layers)

    this.renderAdministration()
  
  }

  componentDidUpdate() {
    this.renderMarkers()
  }

  // 设置缩放等级
  setZooms = ()=>{
    const map = this.map
   
    setTimeout(()=> {
      map.setZoom(4)
      map.panBy(0, 80);
    },50)
  }

  // 返回上级区域
  switch2AreaNode2=()=>{
    console.log(this.adcode)
    if(this.adcode && this.adcode !== 100000){
      this.switch2AreaNode(this.adcode)
    }
  }

  //绘制行政区域，不需要可以删除
  renderAdministration = () => {
    const { colors } = this.props
    const layers = this.layers
    const map = this.map
    const that = this
    AMapUI.load(['ui/geo/DistrictExplorer'], function(DistrictExplorer) {
      //创建一个实例
      const districtExplorer = new DistrictExplorer({
        eventSupport: true, //打开事件支持
        map: map,
      })
      that.setZooms()
      //当前聚焦的区域
      let currentAreaNode = null

      //鼠标hover提示内容
      const tipMarkerContent = document.createElement('div')
      tipMarkerContent.classList.add(styles.tipMarker)
      tipMarkerContent.classList.add(styles.top)

      const tipMarker = new AMap.Marker({
        content: tipMarkerContent,
        offset: new AMap.Pixel(0, 0),
        bubble: true,
      })

      //根据Hover状态设置相关样式
      function toggleHoverFeature(feature, isHover, position) {
        tipMarker.setMap(isHover ? map : null)
        if (!feature) {
          return
        }

        const props = feature.properties
        if (isHover) {
          //更新提示内容
          tipMarkerContent.innerHTML = props.adcode + ':' + props.name
          //更新位置
          tipMarker.setPosition(position || props.center)
        }
        //更新相关多边形的样式，具体属性参见 第172行
        const polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode)
        for (let i = 0, len = polys.length; i < len; i++) {
          polys[i].setOptions({
            fillOpacity: isHover ? 0.5 : 0.2,
            strokeWeight: isHover ? 1 : 1, //线宽
          })
        }
      }

      //监听feature的hover事件
      districtExplorer.on('featureMouseout featureMouseover', function(e, feature) {
        toggleHoverFeature(
          feature,
          e.type === 'featureMouseover',
          e.originalEvent ? e.originalEvent.lnglat : null
        )
      })

      //监听鼠标在feature上滑动
      districtExplorer.on('featureMousemove', function(e, feature) {
        //更新提示位置
        tipMarker.setPosition(e.originalEvent.lnglat)
      })

      //feature被点击
      districtExplorer.on('featureClick', function(e, feature) {
        const props = feature.properties

        //切换聚焦区域，如果是最后一级，增加卫星和道路图层
        // if (props.childrenNum === 0) {
        //   map.add(layers)
        // }
        console.log('feature被点击',props.adcode)
        switch2AreaNode(props.adcode)
        that.adcode = props.adcode
      })

      //外部区域被点击
      districtExplorer.on('outsideClick', function(e) {
        //去除卫星和道路图层
        // map.remove(layers)
        districtExplorer.locatePosition(
          e.originalEvent.lnglat,
          function(error, routeFeatures) {
            console.log('外部区域被点击',routeFeatures)
            if (routeFeatures && routeFeatures.length > 1) {
              //切换到省级区域
              switch2AreaNode(routeFeatures[1].properties.adcode)
              that.adcode = routeFeatures[1].properties.adcode
            } else {
              //切换到全国
              switch2AreaNode(100000)
              that.adcode = 100000
              that.setZooms()
            }
          },
          {
            levelLimit: 2,
          }
        )
      })

      //绘制某个区域的边界
      function renderAreaPolygons(areaNode) {
        //更新地图视野
        map.setBounds(areaNode.getBounds())

        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons()

        //绘制子区域
        districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
          const fillColor = colors[i % colors.length]
          const strokeColor = colors[colors.length - 1 - (i % colors.length)]

          return {
            cursor: 'default',
            bubble: true,
            strokeColor: strokeColor, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.35, //填充透明度
          }
        })

        //绘制父区域
        districtExplorer.renderParentFeature(areaNode, {
          cursor: 'default',
          bubble: true,
          strokeColor: '#222', //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: areaNode.getSubFeatures().length ? null : colors[0], //填充色

          fillOpacity: 0.35, //填充透明度
        })
        // map.setFitView(districtExplorer.getAllFeaturePolygons(), false, [10,10,10,10]);
      }

      //切换区域后刷新显示内容
      function refreshAreaNode(areaNode) {
        districtExplorer.setHoverFeature(null)

        renderAreaPolygons(areaNode)
      }

      //切换区域
      const  switch2AreaNode = function(adcode, callback) {
        if (currentAreaNode && '' + currentAreaNode.getAdcode() === '' + adcode) {
          return
        }

        loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            if (callback) {
              callback(error)
            }
            return
          }

          currentAreaNode = areaNode

          //设置当前使用的定位用节点
          districtExplorer.setAreaNodesForLocating([currentAreaNode])

          refreshAreaNode(areaNode)

          if (callback) {
            callback(null, areaNode)
          }
        })
      }
      //加载区域
      function loadAreaNode(adcode, callback) {
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            if (callback) {
              callback(error)
            }
            console.error(error)
            return
          }

          if (callback) {
            callback(null, areaNode)
          }
        })
      }

      //全国
      switch2AreaNode(100000)
      that.switch2AreaNode = switch2AreaNode

    })
  }

  //绘制带信息框的标记点，不需要可以删除
  renderMarkers = () => {
    const _this = this
    const map = this.map
    const { markers } = this.props
    if (_this.markers.length > 0) {
      map.remove(_this.markers)
      _this.markers = []
    }
    AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
      markers.forEach((item, index) => {
        const marker = new AMap.Marker({
          map: map,
          zIndex: 9999999,
          position: new AMap.LngLat(item.longitude, item.latitude),
          icon: new AMap.Icon({
            size: new AMap.Size(30, 30),
            image: '/icons/mark_bs.png',
            imageSize: new AMap.Size(15, 25),
          }),
        })
        _this.markers.push(marker)
        const infoWindow = new SimpleInfoWindow({
          infoTitle: item.infoTitle,
          infoBody: item.infoBody,
          // 设置信息框的位置
          offset: new AMap.Pixel(-2, -25),
        })

        function openInfoWin() {
          infoWindow.open(map, marker.getPosition())
        }

        function closeInfoWin() {
          infoWindow.close(map, marker.getPosition())
        }

        //marker 鼠标移入时打开
        marker.on('mouseover', function() {
          openInfoWin()
        })
        marker.on('mouseout', function() {
          closeInfoWin()
        })
      })
    })

  }

  render() {
    const { height } = this.props
    return (
      <>
        <Button type="primary" onClick={this.switch2AreaNode2}>返回上级区域</Button>
        <div id="container" style={{ height: height }} />
      </>
    )
  }
}

export default Maps
