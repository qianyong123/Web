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

@connect(({}) => {
  return {
    // listLoading: loading.effects['dataAuditing/fetch'],
    // submitLoadingsubmitLoading: loading.effects['dataAuditing/add'] || loading.effects['dataAuditing/update'],
  }
})
class DataMaintenance extends Component {
  constructor(props) {
    super(props)
    const { selectedIds } = props
    this.state = {
      selectedRows: selectedIds,
      modal: {
        item: {},
        modalType: 'new',
        modalVisible: false,
      },
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'dataAuditing/fetch',
      payload: {
        pageSize: 10,
        pageNo: 1,
      },
    })
  }
  requestData = (params = {}) => {
    const { dispatch } = this.props
    // dispatch({
    //     type: 'dataAuditing/fetch',
    //     payload: {
    //         pageSize: 10,
    //         pageNo: 1,
    //         ...params,
    //     },
    // })
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

  handleSearch = () => {}
  handleFormReset = () => {}
  render() {
    const { selectedRows, modal } = this.state
    const { selectedMode, listLoading, submitLoading } = this.props
    return (
      <div>
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter onSearch={this.handleSearch} resetForm={this.handleFormReset} />
          </Card>
          <Card bordered={false}>
            <div>
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
                新增指标
              </Button>
            </div>
            <TableList
              selectedMode={null}
              selectedRows={null}
              loading={listLoading}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              onSendUp={this.handleSendUp}
              onBackMsg={this.handleBackMsg}
              onView={this.handleView}
              // onReset={this.handleReset}
              // onSwitch={this.handleSwitch}
            />
          </Card>
        </Layout>

        <FormComp //新建&编辑Modal
          title={modal.modalType === 'new' ? '数据指标维护新增' : '数据指标维护编辑'}
          {...modal}
          loading={submitLoading}
          onCancelClick={() => this.handleModalVisible(false)}
          submitForm={this.handleFormSubmit}
        />
      </div>
    )
  }
}

export default DataMaintenance
