import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Button, Modal, message, Card, BackTop } from 'antd'
import { getTableFiltersValue } from '@/utils/utils'
import Authorized from '@/utils/Authorized'
import globalStyles from '@/global.less'
import Filter from './Filter'
import TableList from './Table'
import FormComp from './Form'

const { Content } = Layout

@connect(({ reserveMaterialsView, loading }) => {
  return {
    reserveMaterialsView,
    loading,
    listLoading: loading.effects['reserveMaterialsView/fetch'],
    submitLoading: loading.effects['dataAuditing/add'],
  }
})

/**
 *@Date:2020/4/23
 *@Features: 预警监测页面
 */
class IndexClassification extends Component {
  constructor(props) {
    super(props)
    const { selectedIds } = props
    this.state = {
      selectedRows: selectedIds,
      protectData: [], //保护区名字
      modal: {
        item: {},
        modalType: 'new',
        modalVisible: false,
      },
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    this.requestData()
    dispatch({
      type: 'reserveMaterialsView/fetchProtectList',
      payload: {},
      callback: res => {
        let protectData = []
        res.map(item => {
          protectData.push({ name: item.name, year: item.year })
        })
        this.setState({
          protectData,
        })
      },
    })
  }

  requestData = (params = {}) => {
    const { dispatch } = this.props
    dispatch({
      type: 'reserveMaterialsView/fetch',
      payload: {
        pageSize: 10,
        pageNum: 1,
        ...params,
      },
    })
  }

  handleModalVisible = (visible = {}, type, data, target) => {
    const modalProps =
      typeof visible === 'boolean'
        ? {
            modalVisible: visible,
            modalType: type,
            item: data,
            modalTarget: target,
          }
        : { ...visible }

    const { modalVisible, modalType, item, modalTarget = 'modal' } = modalProps

    this.setState(() => ({
      [`${modalTarget}`]: {
        modalVisible: modalVisible || false,
        modalType: modalType || 'new',
        item: item || {},
      },
    }))
  }

  handleSearch = value => {
    this.requestData(value)
  }
  handleFormReset = () => {
    this.requestData()
  }

  handleFormSubmit = (id, values) => {
    const { dispatch } = this.props
    const self = this
    dispatch({
      type: 'reserveMaterialsView/add',
      payload: values,
      callback: () => {
        message.success('添加成功')
        this.handleModalVisible(false)
        self.requestData()
      },
    })
  }

  render() {
    const { selectedRows, modal, protectData } = this.state
    const {
      selectedMode,
      listLoading,
      submitLoading,
      reserveMaterialsView: { data },
    } = this.props
    return (
      <div>
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter
              onSearch={this.handleSearch}
              protectData={protectData}
              resetForm={this.handleFormReset}
            />
          </Card>
          <Card bordered={false}>
            <div style={{ marginBottom: 5 }}>
              <span>
                共有<b>{/*data.pagination.total*/}</b>条信息，共
                <b>{/*Math.ceil(data.pagination.total / data.pagination.pageSize) || 0*/}</b>页
              </span>
              <Button
                icon="plus"
                className={globalStyles.button}
                onClick={() => this.handleModalVisible(true)}
                style={{ background: '#ee9800', color: '#fff', float: 'right', marginBottom: 20 }}
              >
                新增
              </Button>
            </div>
            <TableList
              selectedMode={false}
              selectedRows={false}
              rowSelection={false}
              loading={listLoading}
              data={data}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              onSendUp={this.handleSendUp}
              onBackMsg={this.handleBackMsg}
              onView={this.handleView}

              // onSwitch={this.handleSwitch}
            />
          </Card>
        </Layout>

        <FormComp //新建&编辑Modal
          title="新增"
          {...modal}
          loading={submitLoading}
          onCancelClick={() => this.handleModalVisible(false)}
          submitForm={this.handleFormSubmit}
          protectData={protectData}
        />
      </div>
    )
  }
}

export default IndexClassification
