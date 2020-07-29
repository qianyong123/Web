import React,{useEffect} from 'react'
import styles from './index.less'

function index(){
    useEffect(()=>{
        var map = new AMap.Map('container3', {
            mapStyle: 'amap://styles/1de318cbb8d12c02303a22c550b9ccc9',
            viewMode: '3D',
            // features: ['bg', 'road'],
                layers: [
                // 卫星
                new AMap.TileLayer.Satellite(),
                // 路网
                new AMap.TileLayer.RoadNet()
            ],
            center: [107.4976, 32.1697],
            zoom: 4,
        });

        var infoWin;

        infoWin = new AMap.InfoWindow({
            closeWhenClickMap: true
        });

        var vLayer = new Loca.DistrictLayer({
            fitView: true,
            eventSupport: true,
            drillDown: true, // 开启鼠标单击下钻功能，前提要求开启 eventSupport 配置来支持鼠标事件
            map: map
        });
        function go2Adcode(event, code) {
            event.stopPropagation();
            infoWin.close();
            vLayer.goto(code);
        }
        // vLayer.on('click', function (ev) {
        //     var originalEv = ev.originalEvent;
        //     var lnglat = map.containerToLngLat(new AMap.Pixel(originalEv.clientX, originalEv.clientY));
        //     var feature = ev.feature;
        //     var property = feature.subFeature.properties;
        //     go2Adcode(event,property.adcode)

        //     console.log('lnglat', property )  
        // });

        vLayer.on('mouseover', function (ev) {
            console.log('mouseover',ev)
            var originalEv = ev.originalEvent;
            var lnglat = map.containerToLngLat(new AMap.Pixel(originalEv.clientX, originalEv.clientY));
            var feature = ev.feature;
            var value = ev.value;
            var property = feature.subFeature.properties;
            infoWin.open(map, lnglat);
            var content = [
                '行政区：' + property.name,
                '<br>',
                '数据：' + value,
                '<br>',
                // property.childrenNum ? `<button onclick=${ go2Adcode(event,property.adcode)}>下钻</button>` : ''
            ];
            infoWin.setContent(content.join(''));
        });

        $.get('//a.amap.com/Loca/static/mock/tourist_attractions.csv', function (data) {
            vLayer.setData(data, {
                type: 'csv',
                lnglat: '经纬度',
                value: '省内5A景区数量'
            });

            vLayer.setOptions({
                mode: 'count',
                style: {
                    color: ['#0c2c84', '#225ea8', '#225ea8', '#41b6c4', '#7fcdbb', '#c7e9b4', '#ffffcc']
                },
                selectStyle: false
            });

            vLayer.render();

        });

        $('#up-btn').click(function () {
            vLayer.goto(-1);
        });
    })
    return (
        <>
          <div id="container3" style={{ width: '100%', height: '600px', position: 'relative' }}></div>
            <div className="button-group">
                <input id="up-btn" type="button" className="button" value="行政区上浮" />
            </div>
        </>
    )
}

export default index