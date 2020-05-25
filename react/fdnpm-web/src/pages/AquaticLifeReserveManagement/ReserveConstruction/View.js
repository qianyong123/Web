/* eslint-disable no-script-url */
import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Modal, Button, Icon, Input } from 'antd'
import Styles from '@/styles/view.less'
import Download from '@/components/Download'

const { TextArea } = Input

export const view1 = item2 => {
  const item = item2 || {}
  const fileName = item.fileName || ''
  return (
    <table className={Styles.table}>
      <tbody>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>保护区名称</td>
          <td className={Styles.tableCell}>{item.protectionZone}</td>
          <td className={Styles.tableCell}>建设类别</td>
          <td className={Styles.tableCell}>{item.buildCategory}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>建设目的</td>
          <td className={Styles.tableCell}>{item.buildAim}</td>
          <td className={Styles.tableCell}>预定建设时间</td>
          <td className={Styles.tableCell}>{item.buildTime}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>建设内容</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.buildContent}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>附件信息</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            <span style={{ paddingRight: 50 }}>{item.buildFileId ? fileName : '暂无附件'}</span>
            {item.buildFileId ? (
              <Download action={`/sys/fileManage/downloadFile/${item.buildFileId}`} method="GET">
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
    const { auditView } = this.state
    const SubmitType = e.target.value
    submitForm(SubmitType, { auditView, auditCategory: '基本建设', basicBuildId: item.id })
  }

  render() {
    const { title, modalVisible, modalType, onCancelClick, item } = this.props
    let footer
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
          {/* <Row>
            <Divider dashed style={{ color: '#1a6636' }}>
              基本信息
            </Divider>
          </Row> */}
          {view1(item)}

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
