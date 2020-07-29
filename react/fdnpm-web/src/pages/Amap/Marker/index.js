import React, { Component, useEffect, useState } from 'react'
import details from './details.less'
import { Spin, Icon } from 'antd';
import { object } from 'prop-types';
import favicon from '../../../../public/map-marker.png'

let index = 0

function marker(map, { lng, lat, name }) {
  if (!lng || !lat) return;
  // 创建一个 Icon
  var startIcon = new AMap.Icon({
    // 图标尺寸
    size: new AMap.Size(30, 33),
    // 图标的取图地址
    image: favicon,
    // 图标所用图片大小
    imageSize: new AMap.Size(30, 30),
    // 图标取图偏移量
    imageOffset: new AMap.Pixel(0, 0)
  });
  let marker = new AMap.Marker({
    icon: startIcon,
    // content:Content(),  // 自定义点标记覆盖物内容
    position: new AMap.LngLat(lng, lat),
    zIndex:0
    // offset: new AMap.Pixel(-13, -30)
  });


  map.add([marker])

  function setLabel(content = null) {
    marker.setLabel({
      direction: 'right',
      offset: new AMap.Pixel(10, 10),  //设置文本标注偏移量
      content, //设置文本标注内容
    });
  }
  // 手动清除详情 <span class=${details.clearDetail}>X</span> 
  const Map = document.getElementById('map')
  Map.addEventListener('click',function(e){
    // console.log(e)
    if(e.target.className === 'antd-pro-pages-amap-marker-details-clearDetail'){
      setLabel()
    }
  })

  const labels = `<div class=${details.labelBox}>
       
        <h3 class=${details.title}>标题</h3>
        <div class=${details.text}>
          名称： 我是 ${name}6878658768687dfsfsdfsdfsdfsdf6
        </div>
        <div class=${details.text}>
        名称：我是 ${name}
        </div>     
        </div>`

  marker.on('mouseover', function(e){
    // 设置label标签 mouseover
    // label默认蓝框白底左上角显示，样式className为：amap-marker-label

    setLabel(labels)
    index += 1;
    marker.setzIndex(index)
    // console.log('移入',index, e)
  })

  marker.on('mouseout', () => {
    setLabel()
    // console.log('移出', name)
  })


}

function Map() {
  const [spinning, setSpinning] = useState(true)
  const positionList = [
    {
      lng: 105.19382669582967,
      lat: 39.258134,
      name: "地区1"
    },
    {
      lng: 116.406315,
      lat: 39.908775,
      name: "地区2"
    },
  ]
 
  useEffect(() => {
    setSpinning(false)
    const map = new AMap.Map('map', {
      zoom: 4,//级别
      center: [103.23, 35.33],//中心点坐标
    //   layers: [
    //     // 卫星
    //     new AMap.TileLayer.Satellite(),
    //     // 路网
    //     new AMap.TileLayer.RoadNet()
    // ],
      viewMode: '3D'//使用3D视图
    });
    map.on('complete', function () {
      // 地图图块加载完成后触发
      positionList.map((item) => marker(map, item))
      
    });
  })

  return (
    <>
      <Spin spinning={spinning}>
        <div id="map" style={{ width: '100%', height: '600px', position: 'relative' }} />
       
      </Spin>
    </>
  )

}

export default Map