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
class WarningAnalysis extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Card bordered={false}>123</Card>
          <Card bordered={false}>abc</Card>
        </Layout>
      </div>
    )
  }
}

export default WarningAnalysis
