import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, message, Card, BackTop } from 'antd'
import router from 'umi/router'

import FormTerminal from './formTerminal'
import FormProvince from './formProvince'
import FormQC from './formQC'
import FormMonitor from './formMonitor'
// import Filter from './Filter'
// import { getTableFiltersValue } from '@/utils/utils'
// import Authorized from '@/utils/Authorized'
// import TableList from './Table'
// import globalStyles from '@/global.less'

@connect(({ welcome, login, loading }) => {
  return {
    welcome,
    login,
    listLoading: loading.effects['welcome/fetch'],
  }
})
class Welcome extends Component {
  static defaultProps = {
    selectedIds: [],
    onSelect: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      currentItem: {},
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  requestUserList = (params = {}) => {
    const { dispatch } = this.props

    dispatch({
      type: 'welcome/fetch',
      payload: {
        ...params,
      },
    })
  }

  handleModalVisible = (flag, type, item) => {
    this.setState(() => {
      return {
        modalVisible: !!flag,
        currentItem: item || {},
      }
    })
  }

  handleAdd = values => {
    const { dispatch } = this.props
    dispatch({
      type: 'welcome/add',
      payload: values,
      callback: () => {
        message.success('完善信息成功')
        this.handleModalVisible(false)
        this.requestUserList()
      },
    })
  }

  handleFormSubmit = (id, values) => {
    if (id) {
      this.handleUpdate({ id, ...values })
    } else {
      this.handleAdd(values)
    }
  }

  handleCancelClick = () => {
    const { dispatch } = this.props
    router.replace('/user/login')
    dispatch({
      type: 'login/logout',
    })
  }

  render() {
    const { currentItem } = this.state

    const {
      welcome: { data, areaList },
    } = this.props

    return (
      <div>
        <Layout>
          <Card bordered={false}>欢迎！</Card>
        </Layout>
        {/* <FormTerminal
          title="总站用户信息完善"
          item={currentItem}
          modalVisible={data.flag === '0' && data.type === '0'}
          areaList={areaList.data}
          accountType={data.type}
          submitForm={this.handleFormSubmit}
          onCancelClick={this.handleCancelClick}
        />
        <FormProvince
          title="省站用户信息完善"
          item={currentItem}
          modalVisible={data.flag === '0' && data.type === '1'}
          areaList={areaList.data}
          accountType={data.type}
          submitForm={this.handleFormSubmit}
          onCancelClick={this.handleCancelClick}
        />
        <FormQC
          title="质控用户信息完善"
          item={currentItem}
          modalVisible={data.flag === '0' && data.type === '2'}
          accountType={data.type}
          submitForm={this.handleFormSubmit}
          onCancelClick={this.handleCancelClick}
        />
        <FormMonitor
          title="监测用户信息完善"
          item={currentItem}
          modalVisible={data.flag === '0' && data.type === '3'}
          accountType={data.type}
          submitForm={this.handleFormSubmit}
          onCancelClick={this.handleCancelClick}
        /> */}
        <BackTop />
      </div>
    )
  }
}

export default Welcome
