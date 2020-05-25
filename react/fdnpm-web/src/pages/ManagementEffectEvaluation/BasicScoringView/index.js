import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, message, Card } from 'antd'
import { getTableFiltersValue } from '@/utils/utils'
// import Authorized from '@/utils/Authorized'
import globalStyles from '@/global.less'
import Filter from './Filter'
import TableList from './Table'
import FormComp from './Form'

// const { Content } = Layout

@connect(({ loading, BasicScoringView, global }) => {
  return {
    listLoading: loading.effects['BasicScoringView/fetch'],
    BasicScoringView,
    global,
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
      filterFormValues: {
        year: new Date().getFullYear() || '2020',
      },
      basicsGradeList: [],
      ReserveLevel: [
        //  {id:1,value:"全部"},
        { id: 2, value: '国家级' },
        { id: 3, value: '省级' },
        { id: 4, value: '市级' },
        { id: 5, value: '县级' },
      ],
    }
  }

  componentDidMount() {
    const { filterFormValues } = this.state
    this.requestList(filterFormValues)
    this.requestBasicsGrade()
  }

  requestBasicsGrade = () => {
    // 获取评分
    const { dispatch } = this.props
    dispatch({
      type: 'BasicScoringView/getBasicsGrade',
      payload: {},
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

  handleSearch = (values = {}) => {
    this.setState({
      filterFormValues: values,
    })

    this.requestList(values)
  }

  // 重置
  handleFormReset = () => {
    const filterFormValues = {
      year: new Date().getFullYear() || '2020',
    }
    this.setState({
      filterFormValues,
    })
    this.requestList(filterFormValues)
  }

  requestList = (params = {}) => {
    const { dispatch } = this.props
    dispatch({
      type: 'BasicScoringView/fetch',
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
      type: 'BasicScoringView/add',
      payload: values,
      callback: () => {
        message.success('添加成功')
        this.handleModalVisible(false)
        this.requestList()
      },
    })
  }

  // 提交
  handleFormSubmit = (id, values) => {
    const { dispatch } = this.props
    const score = JSON.stringify(values)
    console.log(id, score)
    dispatch({
      type: 'BasicScoringView/update',
      payload: { id, score },
      callback: () => {
        message.success('保存成功')
        this.handleModalVisible(false)
        this.requestList()
      },
    })
  }

  // 评分
  handleGread = async id => {
    const {
      BasicScoringView: { basicsGradeList },
    } = this.props
    let list = []
    basicsGradeList.forEach(item => {
      list = [...list, ...this.disposeGrade(item)]
    })
    console.log(basicsGradeList, list)
    this.setState({ basicsGradeList: list })
    this.handleModalVisible(true, id ? 'edit' : 'view', { id })
  }

  // 查看
  handleView = async ({ id, state }) => {
    const { dispatch } = this.props
    if (state === 1) {
      const msg = await dispatch({
        type: 'BasicScoringView/fetchDetail',
        payload: { id },
      })
      const data = JSON.parse(msg)
      this.setState({ basicsGradeList: data || [] })
      this.handleModalVisible(true, 'view', data)
    } else {
      this.handleGread()
    }
  }

  disposeGrade = item => {
    const table = []
    const { targetNameList = [], targetSortType, score } = item
    targetNameList.forEach(item2 => {
      const examContentList = item2.examContentList || []
      examContentList.forEach((item3, index3) => {
        const obj = {
          targetSortType: `${targetSortType} (${score})`,
          targetName: `${item2.targetName} (${item2.score})`,
          examContent: `${item3.examContent}`,
          score: `${item3.score}`,
        }
        if (index3 === 0) obj.len2 = examContentList.length
        table.push(obj)
      })
    })

    if (table.length > 0) table[0].len = table.length
    return table
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
    const { modal, ReserveLevel, filterFormValues, basicsGradeList } = this.state
    const {
      listLoading,
      submitLoading,
      BasicScoringView: { data },
      global: { yearList },
    } = this.props

    return (
      <div>
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter
              resetForm={this.handleFormReset}
              onSearch={this.handleSearch}
              yearList={yearList}
              ReserveLevel={ReserveLevel}
              filterFormValues={filterFormValues}
            />
          </Card>
          <Card bordered={false}>
            <div style={{ marginBottom: 5 }}>
              <span>
                共有<b>{data.pagination.total || 0}</b>条信息，共
                <b>{Math.ceil(data.pagination.total / data.pagination.pageSize) || 0}</b>页
              </span>
              {/* <Button
                icon="plus"
                className={globalStyles.button}
                onClick={() => this.handleModalVisible(true)}
                style={{ background: '#ee9800', color: '#fff', float: 'right', marginBottom: 20 }}
              >
                新增
              </Button> */}
            </div>
            <TableList
              selectedMode={false}
              selectedRows={false}
              rowSelection={false}
              loading={listLoading}
              data={data}
              // onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onView={this.handleView}
              onEdit={this.handleGread}
            />
          </Card>
        </Layout>

        <FormComp // 新建&编辑Modal
          title={modal.modalType === 'view' ? '查看' : '评分'}
          {...modal}
          loading={submitLoading}
          onCancelClick={() => this.handleModalVisible(false)}
          submitForm={this.handleFormSubmit}
          basicsGradeList={basicsGradeList}
        />
      </div>
    )
  }
}

export default IndexClassification