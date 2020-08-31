import React, { Component } from 'react'
import favicon from '../../../../public/map-marker.png'
import details from './details.less'

let index = 0

function Marker(map, { lng, lat, name }) {
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
  
const setLabel = function(content = null) {
      marker.setLabel({
        direction: 'right',
        offset: new AMap.Pixel(10, 10),  //设置文本标注偏移量
        content, //设置文本标注内容
      });
    }
  
  
  
    const labels = `<div class=${details.labelBox}>
          <span class=${details.clearDetail}>X</span>
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
      // setLabel()
      // console.log('移出', name)
    })
  
  
  }

export default Marker
