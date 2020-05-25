import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Button, Modal, message, Card, BackTop } from 'antd'
import { getTableFiltersValue } from '@/utils/utils'
// import Authorized from '@/utils/Authorized'
import globalStyles from '@/global.less'
import Filter from './Filter'
import TableList from './Table'
import FormComp from './Form'
import FormView from './View'

// const { Content } = Layout

@connect(({ loading, ReserveTheInitial, resere }) => {
  return {
    listLoading: loading.effects['ReserveTheInitial/fetch'],
    ReserveTheInitial,
    resere,
  }
})

/**
 *@Date:2020/4/23
 *@Features: 预警监测页面
 */
class IndexClassification extends Component {
  constructor(props) {
    super(props)
    // const { selectedIds } = props
    this.state = {
      // selectedRows: selectedIds,
      modal: {
        item: {},
        modalType: 'new',
        modalVisible: false,
      },
      filterFormValues: {},
    }
  }

  componentDidMount() {
    const { filterFormValues } = this.state
    this.requestList(filterFormValues)
    this.requestBuildSort()
  }

  requestBuildSort = () => {
    // 获取建筑分类
    const { dispatch } = this.props
    dispatch({
      type: 'resere/fetchBuildSort',
      payload: {},
    })
  }

  handleModalVisible = (visible = {}, type, data, target) => {
    const modalProps =
      typeof visible === 'boolean'
        ? {
            modalVisible: visible,
            modalType: type,
            item: data || {},
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

  handleSearch = (values = {}) => {
    this.setState({
      filterFormValues: values,
    })

    this.requestList(values)
  }

  handleFormReset = () => {
    this.setState({
      filterFormValues: {},
    })
    this.requestList({})
  }

  requestList = (params = {}) => {
    const { dispatch } = this.props
    dispatch({
      type: 'ReserveTheInitial/fetch',
      payload: {
        pageNum: 1,
        pageSize: 10,
        ...params,
      },
    })
  }

  handleAdd = values => {
    const { dispatch } = this.props
    dispatch({
      type: 'ReserveTheInitial/add',
      payload: values,
      callback: () => {
        message.success('添加成功')
        this.handleModalVisible(false)
        this.requestList()
      },
    })
  }

  // 编辑提交
  handleEdit = values => {
    const { dispatch } = this.props
    dispatch({
      type: 'ReserveTheInitial/update',
      payload: values,
      callback: () => {
        message.success('编辑成功')
        this.handleModalVisible(false)
        this.requestList()
      },
    })
  }

  // 编辑
  handleEditInfo = async id => {
    const { dispatch } = this.props
    const rowItem = await dispatch({
      type: 'ReserveTheInitial/fetchDetail',
      payload: { id },
    })
    const initialDesign = rowItem ? rowItem.initialDesign : {}
    this.handleModalVisible(true, 'edit', initialDesign)
  }

  handleDelete = id => {
    const self = this
    const { dispatch } = this.props
    Modal.confirm({
      title: '确定要删除这个数据吗？',
      content: '删除后，无法恢复。',
      okType: 'danger',
      okText: '删除',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'ReserveTheInitial/remove',
          payload: {
            id,
          },
          callback: () => {
            message.success('删除成功')
            self.handleSearch()
          },
        })
      },
    })
  }

  // 审核
  handAuditInfo = async id => {
    const { dispatch } = this.props
    const rowItem = await dispatch({
      type: 'ReserveTheInitial/fetchDetail',
      payload: { id },
    })
    this.handleModalVisible(true, 'check', rowItem)
  }

  // 审核提交
  handleAudit = values => {
    const { dispatch } = this.props
    dispatch({
      type: 'resere/audit',
      payload: values,
      callback: () => {
        message.success('审核成功')
        this.handleModalVisible(false)
        this.requestList()
      },
    })
  }

  // 查看
  handView = async id => {
    const { dispatch } = this.props
    const rowItem = await dispatch({
      type: 'ReserveTheInitial/fetchDetail',
      payload: { id },
    })
    this.handleModalVisible(true, 'view', rowItem)
  }

  // 表单提交
  handleFormSubmit = (type, values) => {
    console.log(type, values)
    this.handleModalVisible(false)
    if (type === 'new') {
      // 新增
      this.handleAdd(values)
    } else if (type === 'edit') {
      // 编辑
      this.handleEdit(values)
    } else if (type === 'pass') {
      // 审核通过
      this.handleAudit({ ...values, auditStatus: '通过' })
    } else if (type === 'sendBack') {
      // 审核退回
      this.handleAudit({ ...values, auditStatus: '退回' })
    }
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    console.log(pagination, filtersArg, sorter)
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

  render() {
    const { modal } = this.state
    const {
      listLoading,
      submitLoading,
      ReserveTheInitial: { data },
      resere: { constructionType, statusList },
    } = this.props

    return (
      <div className="ReserveTheInitial">
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter
              resetForm={this.handleFormReset}
              onSearch={this.handleSearch}
              constructionType={constructionType}
              statusList={statusList}
            />
          </Card>
          <Card bordered={false}>
            <div style={{ marginBottom: 5 }}>
              <span>
                共有<b>{data.pagination.total || 0}</b>条信息，共
                <b>{Math.ceil(data.pagination.total / data.pagination.pageSize) || 0}</b>页
              </span>
            </div>
            <TableList
              selectedMode={false}
              selectedRows={false}
              rowSelection={false}
              loading={listLoading}
              data={data}
              // onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onDelete={this.handleDelete}
              onEdit={this.handleEditInfo}
              onAudit={this.handAuditInfo}
              onView={this.handView}
              onAdd={id => this.handleModalVisible(true, 'new', { basicBuildId: id })}
            />
          </Card>
        </Layout>

        {modal.modalType === 'new' || modal.modalType === 'edit' ? (
          <FormComp // 新建&编辑Modal
            title={modal.modalType === 'new' ? '新增' : '编辑'}
            {...modal}
            loading={submitLoading}
            constructionType={constructionType}
            onCancelClick={() => this.handleModalVisible(false)}
            submitForm={this.handleFormSubmit}
          />
        ) : (
          <FormView // 查看  审核
            title={modal.modalType === 'view' ? '详情' : '审核'}
            {...modal}
            loading={submitLoading}
            constructionType={constructionType}
            onCancelClick={() => this.handleModalVisible(false)}
            submitForm={this.handleFormSubmit}
          />
        )}
      </div>
    )
  }
}

export default IndexClassification
