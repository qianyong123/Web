import { Scene, Marker, Popup } from '@antv/l7';
import { DrillDownLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';
import { useEffect } from 'react';
import {  Tooltip, Icon } from 'antd'

const Tooltips = () => {
  return <Tooltip
        placement="topLeft"
        title={
          <div>
            <div className="area_addr">
              <span>示范区名称：</span>
            </div>      
          </div>
        }
      >
        <Icon type="environment" style={{ fontSize: 30, color: 'blue' }} />
      </Tooltip>
}
function Index() {

  useEffect(() => {
    const scene = new Scene({
      id: 'map2',
      map: new Mapbox({
        center: [116.2825, 39.9],
        pitch: 0,
        style: 'blank',
        zoom: 3,
        minZoom: 3,
        maxZoom: 10
      })
    });
    scene.on('loaded', () => {
      // 创建默认 marker
      const popup = new Popup({
        offsets: [0, 20]
      }).setText('hello');
      const el = document.createElement('label');
      el.className = 'labelclass';
      el.textContent = '20';
      el.style.background ='#09f';
      el.style.borderColor ='#09f';
      const marker = new Marker({
        children:Tooltips()
      })
        .setLnglat([106, 29])
        // .setPopup(popup);

      scene.addMarker(marker);
      marker.on('mousemove', (e) => {
        console.log(e.target.name)
      });
      return new DrillDownLayer(scene, {
        data: [],
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
  })


  return (<div style={{ height: '80vh', justifyContent: 'center', position: 'relative' }} id="map2" />)

}

export default Index