import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Modal, message, Card, BackTop, Col, Descriptions, Spin } from 'antd'
// import { getTableFiltersValue } from '@/utils/utils'
// import globalStyles from '@/global.less'
import Map from './Amap'
import Filter from './Filter'


const { Content } = Layout

@connect(({ spatialAnalysis, district, loading }) => {
  return {
    spatialAnalysis,
    district,
    listLoading: loading.effects['spatialAnalysis/fetch'],
  }
})
class SpatialAnalysis extends Component {
  static defaultProps = {
    selectedIds: [],
    onSelect: () => {},
  }

  constructor(props) {
    super(props)

    // const { selectedIds } = props

    this.state = {
    
      submitTimeList: [],
      filterFormValues: {},
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'district/fetch',
      payload: {},
    })
  }


  parseMarker = tude => {
    const reg = /[0-9][0-9]*([.][0-9]{1,6})?/
    return tude.match(reg) && tude.match(reg)[0]
  }

  formatMarkers = markers => {
    const reg = /^[0-9][0-9]*([.][0-9]{1,6})?$/
    const marks = []
    if(!markers) return
    markers.forEach((item) => {
      if(!reg.test(item.latitude) || !reg.test(item.longitude)) return;
      marks.push({
        longitude:item.longitude,
        latitude: item.latitude,
        infoTitle: `示范区信息`,
        infoBody: `<div>
            <span>名称：</span>
            <span>
              ${item.name}
            </span>
            </div>
            <div>
              <span>面积：</span>
              <span>
                ${`${item.currentProtectionArea}(公顷)`}
              </span>
            </div>
            <div>
              <span>经度：</span>
              <span>
                ${item.longitude}
              </span>
            </div>
            <div>
              <span>纬度：</span>
              <span>
                ${item.latitude}
              </span>
            </div>`
      })
    });
    return marks
  }

  render() {
    const { submitTimeList } = this.state

    const {
      // selectedMode,
      spatialAnalysis: {  },
      district,
      listLoading,
    } = this.props
    const data = [ ]
    for(let i=0;i<1;i++){
      data.push({
        name:"名称",
        currentProtectionArea:'110',
        longitude:116+i,
        latitude:39+i
      })
    }
    const markList = this.formatMarkers(data)

    return (
            <Spin size="large" spinning={false}>         
              <Map
                markers={markList}
              />            
            </Spin>  
    )
  }
}

export default SpatialAnalysis
