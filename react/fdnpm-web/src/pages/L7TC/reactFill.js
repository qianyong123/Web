import { LineLayer, MapboxScene, Marker, PolygonLayer, Popup, LayerEvent } from '@antv/l7-react'
import * as React from 'react'

function joinData(geodata, ncovData) {
  const ncovDataObj = {}
  ncovData.forEach(item => {
    const {
      countryName,
      countryEnglishName,
      currentConfirmedCount,
      confirmedCount,
      suspectedCount,
      curedCount,
      deadCount,
    } = item
    if (countryName === '中国') {
      if (!ncovDataObj[countryName]) {
        ncovDataObj[countryName] = {
          countryName: 0,
          countryEnglishName,
          currentConfirmedCount: 0,
          confirmedCount: 0,
          suspectedCount: 0,
          curedCount: 0,
          deadCount: 0,
        }
      } else {
        ncovDataObj[countryName].currentConfirmedCount += currentConfirmedCount
        ncovDataObj[countryName].confirmedCount += confirmedCount
        ncovDataObj[countryName].suspectedCount += suspectedCount
        ncovDataObj[countryName].curedCount += curedCount
        ncovDataObj[countryName].deadCount += deadCount
      }
    } else {
      ncovDataObj[countryName] = {
        countryName,
        countryEnglishName,
        currentConfirmedCount,
        confirmedCount,
        suspectedCount,
        curedCount,
        deadCount,
      }
    }
  })
  const geoObj = {}
  geodata.features.forEach(feature => {
    const { name } = feature.properties
    geoObj[name] = feature.properties
    const ncov = ncovDataObj[name] || {}
    // eslint-disable-next-line no-param-reassign
    feature.properties = {
      ...feature.properties,
      ...ncov,
    }
  })
  console.log(geodata)
  return geodata
}

const World = React.memo(function Map() {
  const [data, setData] = React.useState()
  React.useEffect(() => {
    const fetchData = async () => {
        const [geoData, ncovData] = await Promise.all([
          fetch(
            'https://gw.alipayobjects.com/os/bmw-prod/e62a2f3b-ea99-4c98-9314-01d7c886263d.json',
          ).then((d) => d.json()),
          // https://lab.isaaclin.cn/nCoV/api/area?latest=1
          fetch(
            'https://gw.alipayobjects.com/os/bmw-prod/55a7dd2e-3fb4-4442-8899-900bb03ee67a.json',
          ).then((d) => d.json()),
        ]);
        
        setData(joinData(geoData, ncovData.results));
      };
    // const fetchData = async () => {
    //   fetch(
    //     'https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json',
    //     // 'https://geo.datav.aliyun.com/areas_v2/bound/100000.json'
    //   ).then(d => d.json()).then(res=>{
    //     setData(res)
    //     console.log('data', res);

    //   })
    // }
    fetchData()
  }, [])
  return (
    <>
      <MapboxScene
        map={{
          center: [110.19382669582967, 50.258134],
          pitch: 0,
          style: 'blank',
          zoom: 1,
        }}
        style={{
          position: 'absolute',
          background: '#fff', // 地图背景色
          top: 64,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {data && [
          <PolygonLayer
            click={() => {
              console.log('ss')
            }}
            key="1"
            options={{
              autoFit: true,
            }}
            source={{
              data,
            }}
            scale={{
              values: {
                name: {
                  type: 'cat',
                },
              },
            }}
            active={{
              option: {
                color: '#0c2c84',
              },
            }}
            color={{
              field: 'confirmedCount', // 填充颜色
              values:confirmedCount=>{
                  if(confirmedCount>1000){  return '#A6E1E0'}
                  return '#72BED6'
              },
            }}
            shape={{
              values:'fill'
            }}
            style={{
              opacity: 1,
            }}
            // eslint-disable-next-line react/no-children-prop
            children={<div>111</div>}
          >
            <LayerEvent
              type="click"
              handler={e => {
                console.log(e)
                alert(e.feature.properties.name)
              }}
            />
          </PolygonLayer>,
          <LineLayer
            key="2"
            source={{
              data,
            }}
            size={{
              values: 0.6,
            }}
            color={{
              values: '#aaa', // 描边颜色
            }}
            shape={{
              values: 'line',
            }}
            style={{
              opacity: 1,
            }}
          />,
        ]}
      </MapboxScene>
    </>
  )
})
export default World
//   ReactDOM.render(<World />, document.getElementById('map'));
