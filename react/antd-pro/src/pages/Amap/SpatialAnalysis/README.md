
# 高德地图封装组件

- 参数：
  1. markers: object[]  带信息框的标记点
    ```js
    [
      {
        longitude: number | string,
        latitude: number | string,
        // 组件用了高德的UI，必须传infoTitle和infoBody
        infoTitle: `示范区信息`,
        infoBody: `<div>
            <span>名称：</span>
            <span>
              ${xxx}
            </span>
            </div>`
      }
    ]
    ```
  2. height: number, 默认400
  3. colors：string[], 每一项为颜色代码，代表绘制行政区域时每个区域的颜色
    ```js
    // 默认
    [
      '#3366cc','#dc3912','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00','#b82e2e','#316395','#994499','#22aa99','#aaaa11','#6633cc','#e67300','#8b0707','#651067','#329262','#5574a6','#3b3eac'
    ]
    ```

- 说明：
  1. 带信息框的标记点图标建议从网上下载，放在```/public/icons```，组件第256行，设置图标的路径和样式
  2. amap.less文件设置的是绘制行政区域后，hover时的提示框样式，不需要可以删除，相关代码在组件第66行起
  3. 绘制行政区域后，地图会自动适应到绘制区域，此时设置地图缩放zoom无效
  3. 如果需要绘制特定的区域，将该区域代码传给switch2AreaNode即可，需要修改相关逻辑代码，全国的区划信息见```https://webapi.amap.com/ui/1.1/ui/geo/DistrictExplorer/assets/d_v1/country_tree.json```，目前默认hover时也会显示区域信息