import * as React from 'react'
import { Scene, PolygonLayer, LineLayer, Marker, MarkerLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { Spin } from 'antd';

class Fill extends React.Component {
    state = {
        spinning: true
    }

    componentDidMount() {
      this.getMap('100000')
    }

    getMap = (adcode)=>{
        const that = this
        const scene = new Scene({
            id: 'map',
            map: new GaodeMap({
                pitch: 0,
                style: 'light',
                center: [107.042225, 37.66565],
                zoom: 3.87
            }),
            logoVisible:false // 是否显示 L7 的 Logo
        });
        scene.on('loaded', () => {
            fetch(`https://geo.datav.aliyun.com/areas_v2/bound/${adcode}_full.json`)
                .then(res => res.json())
                .then(data => {
                    const colors = [
                        '#A6E1E0',
                        '#72BED6',
                        '#5B8FF9',
                        '#3474DB',
                        '#005CBE',
                        '#00419F',
                        '#00287E'
                    ];
                    const list = data.features
                    const markerLayer = new MarkerLayer();
                    list.forEach(item => {
                        const {properties} = item
                        if(properties.name){
                            const el = document.createElement('label');
                            el.className = 'labelclass';
                            el.textContent =properties.name ;
                            // el.style.background = '#fff';
                            el.style.borderColor = '#000';
                            el.style.fontSize = '12px';
                            const marker = new Marker({
                              element: el
                            }).setLnglat({ lng:properties.center[0], lat:properties.center[1]});
                            markerLayer.addMarker(marker);
                        }
                        // console.log(item,properties)
                       
                    })                                   
                    const layer2 = new LineLayer({
                        zIndex: 2
                    })
                        .source(data)
                        .color('#aaa')
                        .size(0.3)
                        .style({
                            opacity: 1
                        });
                        
                    const layer = new PolygonLayer({})
                        .source(data)
                        .color('name', name=>{
                            if(name === '四川省') return colors[0]
                            return colors[1]
                        })
                        .shape('fill')
                        .active(true)
                        .on('click',(e)=>{
                            // scene.removeLayer(layer);
                            // scene.removeLayer(layer2);
                            // const adcodes = e.feature.properties.adcode
                            // this.getMap(adcodes)
                            console.log(e)
                        })
                        .style({
                            opacity: 0.9,
                        });

                   

                    scene.addLayer(layer);
                    scene.addLayer(layer2);
                    // scene.addMarkerLayer(markerLayer);
                    that.setState({ spinning: false })
                });
        });
    } 

    render() {
        const { spinning } = this.state
        return (
          <>
            <Spin spinning={spinning} style={{ width: "100%", height: 600, zIndex:999,position:"relative"}} />
            <div
              id="map"
              style={{
                position: 'absolute',
                // background: '#fff', // 地图背景色
                top: 64,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex:10
            }}
            />
          </>
        )
    }
}



export default Fill