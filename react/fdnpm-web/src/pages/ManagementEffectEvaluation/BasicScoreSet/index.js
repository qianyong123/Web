import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Button, Modal, message, Card } from 'antd'
import { getTableFiltersValue } from '@/utils/utils'
// import Authorized from '@/utils/Authorized'
import globalStyles from '@/global.less'
import Filter from './Filter'
import TableList from './Table'
import FormComp from './Form'

// const { Content } = Layout

@connect(({ loading, BasicScoreSet }) => {
  return {
    listLoading: loading.effects['BasicScoreSet/fetch'],
    BasicScoreSet,
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

  handleSearch = (values = {}) => {
    this.setState({
      filterFormValues: values,
    })

    this.requestList(values)
  }

  // 重置
  handleFormReset = () => {
    this.setState({
      filterFormValues: {},
    })
    this.requestList({})
  }

  requestList = (params = {}) => {
    const { dispatch } = this.props
    dispatch({
      type: 'BasicScoreSet/fetch',
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
      type: 'BasicScoreSet/add',
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
      type: 'BasicScoreSet/update',
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
      type: 'BasicScoreSet/fetchDetail',
      payload: { id },
    })
    this.handleModalVisible(true, 'edit', rowItem)
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
          type: 'BasicScoreSet/remove',
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

  // 查看
  handView = async id => {
    const { dispatch } = this.props
    const rowItem = await dispatch({
      type: 'BasicScoreSet/fetchDetail',
      payload: { id },
    })
    this.handleModalVisible(true, 'view', rowItem)
  }

  // 表单提交
  handleFormSubmit = (type, values) => {
    if (type === 'new') {
      // 新增
      this.handleAdd(values)
    } else if (type === 'edit') {
      // 编辑
      this.handleEdit(values)
    }
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

  render() {
    const { modal } = this.state
    const {
      listLoading,
      submitLoading,
      BasicScoreSet: { data, constructionType },
    } = this.props

    return (
      <div>
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter
              resetForm={this.handleFormReset}
              onSearch={this.handleSearch}
              constructionType={constructionType}
            />
          </Card>
          <Card bordered={false}>
            <div style={{ marginBottom: 5 }}>
              <span>
                共有<b>{data.pagination.total || 0}</b>条信息，共
                <b>{Math.ceil(data.pagination.total / data.pagination.pageSize) || 0}</b>页
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
              onChange={this.handleStandardTableChange}
              onDelete={this.handleDelete}
              onEdit={this.handleEditInfo}
            />
          </Card>
        </Layout>

        <FormComp // 新建&编辑Modal
          title={modal.modalType === 'new' ? '新增' : '编辑'}
          {...modal}
          loading={submitLoading}
          constructionType={constructionType}
          onCancelClick={() => this.handleModalVisible(false)}
          submitForm={this.handleFormSubmit}
        />
      </div>
    )
  }
}

export default IndexClassification
