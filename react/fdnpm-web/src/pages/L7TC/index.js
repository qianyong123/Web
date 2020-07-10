import React, { useEffect } from 'react'
import { Spin } from 'antd'

import { Scene } from '@antv/l7';
import { CountryLayer,ProvinceLayer,CountyLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';
import ProvinceData from './data'

function initMap1 (){
  const scene = new Scene({
    id: 'map1',
    map: new Mapbox({
      center: [116.2825, 39.9],
      pitch: 0,
      style: 'blank',
      zoom: 3,
      minZoom: 0,
      maxZoom: 10
    })
  });

  scene.on('loaded', () => {
    return new CountryLayer(scene, {
      data: ProvinceData,
      joinBy: ['NAME_CHN', 'name'],
      depth: 1,
      fill: {
        color: {
          field: 'NAME_CHN',
          values: [
            '#feedde',
            '#fdd0a2',
            '#fdae6b',
            '#fd8d3c',
            '#e6550d',
            '#a63603'
          ]
        }
      },
      popup: {
        enable: true,
        Html: props => {
          return `<span>${props.NAME_CHN}</span>`;
        }
      }
    });
  });
}

async function initMap2() {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/149b599d-21ef-4c24-812c-20deaee90e20.json'
  );
  const provinceData = await response.json();
  const data = Object.keys(provinceData).map(key => {
   
      return {
        code: key,
        name: provinceData[key][0],
        pop: provinceData[key][3]
      };

  });
  const scene = new Scene({
    id: 'map1',
    map: new Mapbox({
      center: [ 116.2825, 39.9 ],
      pitch: 0,
      style: 'blank',
      zoom: 3,
      minZoom: 3,
      maxZoom: 10
    })
  });
// 510000 510500 510522  四川省泸州市合江县
  scene.on('loaded', () => {
   return new ProvinceLayer(scene, {
      data:[],
      joinBy: [ 'adcode', 'code' ],
      adcode: [ '510000' ],
      depth: 2, // 显示级数 1为省级 2为市级 3为县级
      label: {
        field: 'NAME_CHN',
        color:"#09f",
        // textAllowOverlap: false
      },
      fill: {
        color: {
          field: 'NAME_CHN',
          values: [
            '#feedde',
            '#fdd0a2',
            '#fdae6b',
            '#fd8d3c',
            '#e6550d',
            '#a63603'
          ],
        }
      },  
      popup: {
        enable: true,
        Html: props => {
          return `
          <div style="color:red;">${props.NAME_CHN}:${props.adcode}</div>
          `;
        },
        triggerEvent:'click'
      }
    });
  });
}

function Index() {
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    setLoading(false)
    initMap1()
  }, [])

  return (
    <Spin spinning={loading} size="large">
      <div style={{ height: '80vh', justifyContent: 'center', position: 'relative' }} id="map1" />
    </Spin>
  )
}


export default Index
