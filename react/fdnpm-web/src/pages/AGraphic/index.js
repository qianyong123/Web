import React from 'react'
import { connect } from 'dva'
import { Button, Spin, Tooltip, Icon } from 'antd'
import { LineLayer, AMapScene, Marker } from '@antv/l7-react'




function Map() {
  const [data, setData] = React.useState()
  const [marker, setMarker] = React.useState([])
  const [marker1, setMarker1] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [addr, setAddr] = React.useState([])

 
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/32e1f3ab-8588-46cb-8a47-75afb692117d.json'
      )
      const raw = await response.json()
      setData(raw)
      setLoading(false)
    }
    // 等待底层图层加载完毕 加载标点数据
    window.setTimeout(() => {
      fetchData()
    }, 500)
  }, [])
  const initData = () => {
    const fetchData = async () => {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/32e1f3ab-8588-46cb-8a47-75afb692117d.json'
      )
      const raw = await response.json()
      setData(raw)
    }
    fetchData()
  }

  const add = () => {
    marker.push([105, 33])
    setMarker(marker)
    initData()
  }



 

  // const arr = [120, 32];

  // https://l7.antv.vision/zh/docs/api/react/scene 开发文档

  const onMarkerLoadeds = data => {
    console.log(data)
  }

  // console.log(marker1)
  return (
    <Spin spinning={loading} size="large">
      <div style={{ position: 'relative', height: 600 }}>
        {/* <LoadImage name="marker" url="https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/default.cur"/> */}
        <AMapScene
          map={{
            center: [105.19382669582967, 39.258134], // 地图中心
            pitch: 0, // 角度
            style: 'normal', // 地图样式 dark|light|normal|blank L7 默认提供四种样式，同时也支持自定义样式
            zoom: 4.3,
          }}
          style={{
            width: 600,
          }}
          option={{
            plugin: [`AMap.ElasticMarker`, `AMap.Marker`],
            logoVisible: false,
            resizeEnable: true,
          }}
          onSceneLoaded={scene => {}}
        >
          {data && (
            <>
              <LineLayer
                key={'2'}
                source={{
                  data,
                }}
                size={{
                  values: 1,
                }}
                color={{
                  values: '#fff',
                }}
                shape={{
                  values: 'line',
                }}
                style={{
                  opacity: 1,
                }}
              />
              {marker.map((item, index) => (
                <Marker
                  option={{
                    color: 'blue',
                    extData: { x: 5 },
                  }}
                  // onMarkerLoaded={onMarkerLoadeds}
                  lnglat={item}
                  key={index}
                  children={
                    <Tooltip
                      placement="topLeft"
                      title={
                        <div>
                          <div className="area_addr">
                            <span>示范区名称：</span>
                            <span>{marker1.length > 0 ? marker1[index].demonName : ''}</span>
                          </div>
                          <div className="area_addr">
                            <span>地址：</span>
                            <span>{marker1.length > 0 ? marker1[index].addr : ''}</span>
                          </div>
                          <div className="area_addr">
                            <span>示范区面积：</span>
                            <span>
                              {marker1.length > 0 ? marker1[index].demoArea + '公顷' : ''}
                            </span>
                          </div>
                          <div className="area_addr">
                            <span>水生物资源分布情况：</span>
                            <span>{marker1.length > 0 ? marker1[index].distribution : ''}</span>
                          </div>
                          <div className="area_addr">
                            <span>经度：</span>
                            <span>{item[0]}</span>
                          </div>
                          <div className="area_addr">
                            <span>纬度：</span>
                            <span>{item[1]}</span>
                          </div>
                        </div>
                      }
                    >
                      <Icon type="environment" style={{ fontSize: 30, color: 'blue' }} />
                    </Tooltip>
                  }
                />
              ))}
            </>
          )}
        </AMapScene>
        <Button onClick={add}>增加点</Button>
      </div>
    </Spin>
  )
}

export default connect(({ district, map }) => ({ district, map }))(Map)
