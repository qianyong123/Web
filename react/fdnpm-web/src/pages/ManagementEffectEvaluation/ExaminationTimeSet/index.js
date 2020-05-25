import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Button, Modal, message, Card, BackTop } from 'antd'
import { getTableFiltersValue } from '@/utils/utils'
import Authorized from '@/utils/Authorized'
import globalStyles from '@/global.less'
import Filter from './Filter'
import TableList from './Table'

const { Content } = Layout

@connect(({ global, examinationTimeSet }) => {
  return {
    global,
    examinationTimeSet,
  }
})
class BasicDataCollection extends Component {
  state = {
    item: {},
    year: new Date().getFullYear() || '2020',
  }

  componentDidMount() {
    const { year } = this.state
    this.requestList(year)
  }

  requestList = async year => {
    const { dispatch } = this.props
    const item = await dispatch({
      type: 'examinationTimeSet/fetchDetail',
      payload: {
        year,
      },
    })
    this.setState({ item: item || {} })
  }

  // 查询
  handleSearch = ({ year }) => {
    this.setState({ year })
    this.requestList(year)
  }

  // 提交
  submitForm = (values = {}) => {
    const { year } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'examinationTimeSet/update',
      payload: { ...values, year },
      callback: () => {
        message.success('修改成功')
      },
    })
  }

  render() {
    const { item, year } = this.state
    const {
      global: { yearList },
    } = this.props
    return (
      <div>
        <Layout>
          <Card bordered={false} style={{ marginBottom: 20 }}>
            <Filter onSearch={this.handleSearch} yearList={yearList} year={year} />
          </Card>
          <Card bordered={false}>
            <TableList submitForm={this.submitForm} item={item} />
          </Card>
        </Layout>
      </div>
    )
  }
}

export default BasicDataCollection
