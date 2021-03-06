import React, { Fragment } from 'react'
import { Layout, Icon } from 'antd'
import GlobalFooter from '@/components/GlobalFooter'

const { Footer } = Layout
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2020 曙光光纤网络有限责任公司技术支持
        </Fragment>
      }
    />
  </Footer>
)
export default FooterView
