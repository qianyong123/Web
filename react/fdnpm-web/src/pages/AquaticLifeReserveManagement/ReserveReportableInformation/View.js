/* eslint-disable no-script-url */
import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Modal, Button, Icon, Input, Row, Divider } from 'antd'
import Styles from '@/styles/view.less'
import Download from '@/components/Download'
import { view1 } from '../ReserveConstruction/View'

const { TextArea } = Input

export const view2 = item2 => {
  const item = item2 || {}
  const fileName = item.fileName || ''
  return (
    <table className={Styles.table}>
      <tbody>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>总论</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.pandect}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>项目背景与建设必要性</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.background}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>项目建设条件分析</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.conditionAnalysis}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>建设目标</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.target}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>建设方案</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.programme}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>环境影响评价</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.evaluate}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>招标方案</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.inviteTenders}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>实施进度安排</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.scheduling}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>资金估算与资金筹措</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.capitalEstimation}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>综合评价</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.overallMerit}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>附件信息</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            <span style={{ paddingRight: 50 }}>{item.reportFileId ? fileName : '暂无附件'}</span>
            {item.reportFileId ? (
              <Download action={`/sys/fileManage/downloadFile/${item.reportFileId}`} method="GET">
                {options => (
                  <>
                    <Icon type="download" style={{ color: '#03B472' }} {...options} />
                    <a href="javascript:void(0);">下载附件</a>
                  </>
                )}
              </Download>
            ) : null}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

class ViewComp extends PureComponent {
  static propTypes = {
    item: object,
    title: string.isRequired,
    modalVisible: bool.isRequired,
    onCancelClick: func.isRequired,
  }

  state = { auditView: null }

  static defaultProps = {
    item: {},
  }

  handChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { item, submitForm } = this.props
    const { reportInformation = {} } = item
    const { auditView } = this.state
    const SubmitType = e.target.value
    submitForm(SubmitType, {
      auditView,
      auditCategory: '可行性报告信息',
      basicBuildId: reportInformation.id,
    })
  }

  render() {
    const { title, modalVisible, modalType, onCancelClick, item = {} } = this.props
    let footer
    const { basicBuild = {}, reportInformation = {} } = item
    const protectionZoneAuditsList = item.protectionZoneAuditsList || []

    if (modalType === 'check') {
      footer = [
        <Button type="primary" value="pass" onClick={this.handleSubmit}>
          通过
        </Button>,
        <Button
          type="primary"
          value="sendBack"
          style={{ marginLeft: '16px' }}
          onClick={this.handleSubmit}
        >
          退回
        </Button>,
      ]
    } else {
      footer = false
    }
    // console.log(item)
    return (
      <Modal
        destroyOnClose
        title={title}
        visible={modalVisible}
        onOk={onCancelClick}
        onCancel={onCancelClick}
        width="800px"
        footer={footer}
      >
        <div>
          <Row className={`${Styles.optionCell}`}>
            <Divider dashed style={{ color: '#1a6636' }}>
              基本建设
            </Divider>
          </Row>
          {view1(basicBuild)}
          <Row className={`${Styles.optionCell}`}>
            <Divider dashed style={{ color: '#1a6636' }}>
              可行性报告
            </Divider>
          </Row>
          {view2(reportInformation)}

          {modalType === 'check' && (
            <TextArea
              style={{ marginTop: '20px' }}
              placeholder="审核意见"
              name="auditView"
              onChange={this.handChange}
              maxLength="200"
              rows={4}
            />
          )}
          {modalType === 'view' && (
            <table className={Styles.table} style={{ marginTop: '20px' }}>
              <thead>
                <th className={Styles.tableTh}>审核状态</th>
                <th className={Styles.tableTh}>审核人</th>
                <th className={Styles.tableTh}>审核时间</th>
                <th className={Styles.tableTh}>审核意见</th>
              </thead>
              <tbody>
                {protectionZoneAuditsList.map(item2 => (
                  <tr key={item2.id} className={Styles.tableRow}>
                    <td className={Styles.tableCell}>{item2.auditStatus}</td>
                    <td className={Styles.tableCell}>{item2.auditPerson}</td>
                    <td className={Styles.tableCell}>{item2.auditTime}</td>
                    <td className={Styles.tableCell}>{item2.auditView}</td>
                  </tr>
                ))}
                {protectionZoneAuditsList.length < 1 && (
                  <tr>
                    <td className={`${Styles.tableCell} ${Styles.optionCell}`} colSpan={4}>
                      暂无数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Modal>
    )
  }
}

export default ViewComp
