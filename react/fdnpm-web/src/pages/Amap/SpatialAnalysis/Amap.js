import React, { useEffect, useRef } from 'react'
import { Button, Icon } from 'antd'
import styles from './amap.less'

const Map = function (props) {

    const {
        height = 600,
        colors = [
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
        markers = []
    } = props
    let map,
        districtExplorer,
        tipMarkerContent,
        tipMarker,
        currentAreaNode = null,
        layers;
    let adcodeList = [];
    // province - 省 "city" - 市  "district" - 区县
    useEffect(() => {
        map = new AMap.Map('containers', {
            center: [105.19382669582967, 33.258134],
            zoom: 4,
            mapStyle: 'amap://styles/normal',  //设置地图的显示样式
            viewMode: "3D",//设置地图显示3D          
            showBuildingBlock: true, //设置地图显示3D楼块效果
            // features: ['bg', 'building', 'road', 'point'],//设置地图上显示的元素种类支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）

        })

        // layers = [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()]
        // map.add(layers)

        AMap.plugin(['AMap.ToolBar', 'AMap.MapType', 'AMap.Scale', 'AMap.ControlBar'], function () {//异步加载插件

            // map.addControl(new AMap.ToolBar()); // 地图工具条插件，可以用来控制地图的缩放和平移
            // map.addControl(new AMap.Scale()); // 地图比例尺插件

            map.addControl(new AMap.MapType({
                defaultType: 0, //初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
                showTraffic: true,// 叠加实时交通图层 默认值：false
                showRoad: true, // 叠加路网图层 默认值：false             
            }));
            map.addControl(new AMap.ControlBar({
                position: {
                    top: '65%',
                    right: "10px"
                }
            }));

        });
        renderAdministration()
    }, [])

    useEffect(() => {
        renderMarkers()
        // map.setFitView();
    }, [markers])

    // 设置缩放等级
    function setZooms() {
        setTimeout(() => {
            map.setZoom(4)
            map.panBy(0, 80);
        }, 50)
    }
    function renderAdministration() {
        AMapUI.load(['ui/geo/DistrictExplorer'], function (DistrictExplorer) {

            districtExplorer = new DistrictExplorer({
                eventSupport: true, //打开事件支持
                map,
            })
            // 创建marher
            ceratMarker()

            //无参数时，自动自适应所有覆盖物
            // map.setFitView();

            // 点击返回上级区域
            const parentIds = document.getElementById('parentId')
            parentIds.onclick = function () {

                if (adcodeList.length > 0) {
                    const properties2 = adcodeList.pop()
                    const acroutes2 = properties2.acroutes
                    // console.log(adcodeList)

                    if (acroutes2.length < 1 || acroutes2[acroutes2.length - 1] === 100000) {
                        setZooms()
                        switch2AreaNode(100000)
                        adcodeList = []
                    } else {
                        switch2AreaNode(acroutes2[acroutes2.length - 1])
                    }

                } else {
                    switch2AreaNode(100000)
                }
            }

            //监听feature的hover事件
            districtExplorer.on('featureMouseout featureMouseover', function (e, feature) {
                toggleHoverFeature(
                    feature,
                    e.type === 'featureMouseover',
                    e.originalEvent ? e.originalEvent.lnglat : null
                )
            })

            //监听鼠标在feature上滑动
            districtExplorer.on('featureMousemove', function (e, feature) {
                //更新提示位置
                tipMarker.setPosition(e.originalEvent.lnglat)
            })


            //feature被点击
            districtExplorer.on('featureClick', function (e, feature) {
                // console.log('feature被点击', feature)

                const props = feature.properties
                //切换聚焦区域，如果是最后一级，增加卫星和道路图层
                // if (props.childrenNum === 0) {
                //     map.add(layers)
                // }
                switch2AreaNode(props.adcode)
                adcodeList.push(props)
            })

            //外部区域被点击
            districtExplorer.on('outsideClick', function (e) {
                //去除卫星和道路图层
                // map.remove(layers)
                // console.log('外部区域被点击', e.originalEvent.lnglat)
                districtExplorer.locatePosition(
                    e.originalEvent.lnglat,
                    function (error, routeFeatures) {
                        if (routeFeatures && routeFeatures.length > 1) {
                            //切换到省级区域
                            const properties = routeFeatures[1].properties
                            switch2AreaNode(properties.adcode)
                            adcodeList.push(properties)
                        } else {
                            //切换到全国
                            switch2AreaNode(100000)
                            setZooms()
                            adcodeList = []
                        }
                    },
                    {
                        levelLimit: 2,
                    }
                )
            })
            //全国
            switch2AreaNode(100000)
            setZooms()


        })

    }



    // 创建marker
    function ceratMarker() {

        //鼠标hover提示内容
        tipMarkerContent = document.createElement('div')
        tipMarkerContent.classList.add(styles.tipMarker)
        tipMarkerContent.classList.add(styles.top)

        tipMarker = new AMap.Marker({
            content: tipMarkerContent,
            offset: new AMap.Pixel(0, 0),
            bubble: true,
        })
    }

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

    //绘制某个区域的边界
    function renderAreaPolygons(areaNode) {
        //更新地图视野
        map.setBounds(areaNode.getBounds())

        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons()

        //绘制子区域
        districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
            const fillColor = colors[i % colors.length]
            const strokeColor = colors[colors.length - 1 - (i % colors.length)]

            return {
                cursor: 'default',
                bubble: true,
                strokeColor, //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 1, //线宽
                fillColor, //填充色
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
    function switch2AreaNode(adcode, callback) {
        if (currentAreaNode && '' + currentAreaNode.getAdcode() === '' + adcode) {
            return
        }

        loadAreaNode(adcode, function (error, areaNode) {
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
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
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

    //绘制带信息框的标记点，不需要可以删除
    function renderMarkers() {

        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
            markers.forEach((item, index) => {
                const marker = new AMap.Marker({
                    map,
                    zIndex: 9999999,
                    position: new AMap.LngLat(item.longitude, item.latitude),
                    icon: new AMap.Icon({
                        size: new AMap.Size(30, 30),
                        image: '/icons/mark_bs.png',
                        imageSize: new AMap.Size(15, 25),
                    }),
                })
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
                marker.on('mouseover', function () {
                    openInfoWin()
                })
                marker.on('mouseout', function () {
                    closeInfoWin()
                })
            })
        })

    }

    // 全屏事件
    const handleFullScreen = () => {
        let element = document.getElementById('containers');
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
        }

    }

    return (
        <>
            <div id="containers" style={{ height: '75vh' }}>
                <div className={styles.mapIcon}>
                    <div id='parentId' title='返回上级区域' className={styles.mapBtn}>
                        <Icon style={{ fontSize: '28px' }} type="backward" />
                    </div>

                    <div className={styles.mapBtn} title='全屏' onClick={handleFullScreen}>
                        <Icon style={{ fontSize: '28px' }} type="fullscreen" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Map

