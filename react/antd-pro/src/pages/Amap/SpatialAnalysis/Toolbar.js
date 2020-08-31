import React from 'react'
import styles from './amap.less'
import { Button, Icon } from 'antd'

 const Toolbar = (props) => {
    const {cutMap,handleFullScreen,mapType,showDatabase,showChart} = props
    const fontSize = '23px' 

    return (
        <div className={styles.mapRightFun}>
            <div id='parentId' title='区域上浮' className={styles.mapBtn}>
                <Icon style={{ fontSize }} type="backward" />
            </div>
            <div className={styles.mapBtn} title={mapType ? "地图" : '卫星'}>
                <Icon style={{ fontSize }} type={mapType ? "heat-map" : 'global'} onClick={cutMap} />
            </div>
            <div className={styles.mapBtn} title="数据表格">
                <Icon type="database" style={{ fontSize }} onClick={showDatabase} />
            </div>
            <div className={styles.mapBtn} title="统计图">
                <Icon type="bar-chart" style={{ fontSize }} onClick={showChart} />
            </div>
            <div className={styles.mapBtn} title="历史记录">
                <Icon type="history" style={{ fontSize }} />
            </div>
            <div className={styles.mapBtn} title='全屏'>
                <Icon style={{ fontSize }} type="fullscreen" onClick={handleFullScreen} />
            </div>
        </div>
    )
}

export default Toolbar
