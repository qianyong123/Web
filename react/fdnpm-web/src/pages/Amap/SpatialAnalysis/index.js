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
      // modalVisible: false,
      // currentItem: {},
      // modalType: 'new',
      // selectedRows: selectedIds,
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


  handleModalVisible = (flag, type, item) => {
    this.setState(() => {
      return {
        modalVisible: !!flag,
        currentItem: item || {},
        modalType: type || 'new',
      }
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
      if(!reg.test(item.longitude) || !reg.test(item.longitude)) return;
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
    const data = [
      {
        name:"名称",
        currentProtectionArea:'110',
        longitude:'116.40631',
        latitude:'39.908775'
      }
    ]
    const markList = this.formatMarkers(data)
    return (
      <div>
        <Layout>
          {/* <Card bordered={false}>
            <Filter 
              onSearch={this.handleSearch} 
              resetForm={this.handleFormReset} 
              options={district.pickerList} 
              submitTimeList={submitTimeList}
            />
          </Card> */}
          <Content>
            <Spin size="large" spinning={false}>
              <Card bordered={false}>
                <Col span={24}>
                  <Map
                    markers={markList}
                    height={600}
                    // colors={['#0ece87']}
                  />
                </Col>
                {/* <Col span={9} offset={1}>
                  <Descriptions
                    bordered
                    size="small"
                    column={1}
                  >
                    <Descriptions.Item label="保护区数量">{data && data.amount || 0}</Descriptions.Item>
                    <Descriptions.Item label="保护区总面积">{data && data.currentProtectionAreas || 0}(公顷)</Descriptions.Item>
                    <Descriptions.Item label="保护区核心区面积">{data && data.coreRegionAreas || 0}(公顷)</Descriptions.Item>
                  </Descriptions>
                </Col> */}
              </Card>
            </Spin>
            
          </Content>
        </Layout>

        <BackTop />
      </div>
    )
  }
}

export default SpatialAnalysis
