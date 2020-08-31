import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Button, Modal, message, Card, BackTop } from 'antd'
import { getTableFiltersValue } from '@/utils/utils'
import Authorized from '@/utils/Authorized'
import globalStyles from '@/global.less'

const { Content } = Layout

@connect(({}) => {
  return {
    // listLoading: loading.effects['dataAuditing/fetch'],
    // submitLoadingsubmitLoading: loading.effects['dataAuditing/add'] || loading.effects['dataAuditing/update'],
  }
})
class BasicDataCollection extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Card bordered={false}>BasicDataCollection</Card>
          <Card bordered={false}>BasicDataCollection</Card>
        </Layout>
      </div>
    )
  }
}

export default BasicDataCollection
