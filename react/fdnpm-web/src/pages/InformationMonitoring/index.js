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

@connect(({ informationMonitoring }) => {
  return {
    informationMonitoring,
    // listLoading: loading.effects['dataAuditing/fetch'],
    // submitLoadingsubmitLoading: loading.effects['dataAuditing/add'] || loading.effects['dataAuditing/update'],
  }
})

/**
 *@Date:2020/4/23
 *@Features: 采集信息页面
 */
class IndexClassification extends Component {
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
      filterFormValues: {},
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    // dispatch({
    //   type: 'dataAuditing/fetch',
    //   payload: {
    //     pageSize: 10,
    //     pageNo: 1,
    //   },
    // })
    this.requestList()
  }

  requestList = (params = {}) => {
    const { dispatch } = this.props
    dispatch({
      type: 'informationMonitoring/fetch',
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

  handleSearch = values => {
    this.setState({
      filterFormValues: values,
    })

    this.requestList(values)
  }

  handleFormReset = () => {
    this.setState({
      filterFormValues: {},
    })

    this.requestList()
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { filterFormValues } = this.state

    const filters = getTableFiltersValue(filtersArg)

    const params = {
      // pageNum: (pagination.current - 1) * pagination.pageSize,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filterFormValues,
      ...filters,
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.Refund}`
    }

    this.requestList(params)
  }

  handleFormSubmit = (id, values) => {
    // console.log(values)
    if (id) {
      this.handleUpdate({ id, ...values })
    } else {
      this.handleAdd(values)
    }
  }

  handleAdd = values => {
    const { dispatch } = this.props
    dispatch({
      type: 'informationMonitoring/add',
      payload: values,
      callback: res => {
        console.log(res)
        message.success('添加成功')
        this.handleModalVisible(false)
        this.requestList()
      },
    })
  }

  // 查看详情
  handleView = async id => {
    // console.log(id)
    const { dispatch } = this.props
    const rowItem = await dispatch({
      type: 'informationMonitoring/fetchDetail',
      payload: { id: 1 },
    })
    console.log(rowItem)
    // this.handleModalVisible(true, 'view', rowItem,"viewModal")
  }

  /**
   *@Features:编辑
   */
  handleEdit = async id => {
    console.log(id)
    this.handleModalVisible(true, 'edit', {})
    // const { dispatch } = this.props
    // const rowItem = await dispatch({
    //   type: 'mainlyProtectedSpecies/fetchDetail',
    //   payload: { id },
    // })
    // this.handleModalVisible(true, 'edit', rowItem)
  }

  /**
   *@Features:删除
   */
  handleDelete = id => {
    console.log(id)
    // const self = this
    // const { dispatch } = this.props
    // Modal.confirm({
    //   title: '确定要删除这个数据吗？',
    //   content: '删除后，无法恢复。',
    //   okType: 'danger',
    //   okText: '删除',
    //   cancelText: '取消',
    //   onOk() {
    //     dispatch({
    //       type: 'indexClassification/remove',
    //       payload: {
    //         id,
    //       },
    //       callback: () => {
    //         message.success('删除成功')
    //         self.requestList()
    //       },
    //     })
    //   },
    // })
  }

  render() {
    const { selectedRows, modal } = this.state
    const {
      selectedMode,
      listLoading,
      submitLoading,
      informationMonitoring: { data },
    } = this.props

    const item = { protectedArea: [{ id: 1 }, { id: 2 }], coreAreaList: [{ id: 1 }, { id: 2 }] }

    return (
      <div>
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter onSearch={this.handleSearch} resetForm={this.handleFormReset} />
          </Card>
          <Card bordered={false}>
            <div style={{ marginBottom: 5 }}>
              <span>
                共有<b>{/* data.pagination.total */}</b>条信息，共
                <b>{/* Math.ceil(data.pagination.total / data.pagination.pageSize) || 0 */}</b>页
              </span>
              <Button
                icon="plus"
                className={globalStyles.button}
                onClick={() => this.handleModalVisible(true, 'new', item)}
                style={{ background: '#ee9800', color: '#fff', float: 'right', marginBottom: 20 }}
              >
                新增
              </Button>
            </div>
            <TableList
              selectedMode={false}
              selectedRows={false}
              rowSelection={null}
              loading={listLoading}
              // onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              data={data}
              onView={this.handleView}
            />
          </Card>
        </Layout>

        <FormComp // 新建&编辑Modal
          title={modal.modalType === 'new' ? '新增采集信息' : '编辑采集信息'}
          {...modal}
          loading={submitLoading}
          onCancelClick={() => this.handleModalVisible(false)}
          submitForm={this.handleFormSubmit}
        />
      </div>
    )
  }
}

export default IndexClassification
