/* eslint-disable no-script-url */
import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Modal, Button, Icon, Input, Row, Divider } from 'antd'
import Styles from '@/styles/view.less'
import Download from '@/components/Download'
import { view1 } from '../ReserveConstruction/View'
import { view2 } from '../ReserveReportableInformation/View'
import { view3 } from '../ReserveTheInitial/View'

const { TextArea } = Input

export const view4 = item2 => {
  const item = item2 || {}
  const fileName = item.fileName || ''
  return (
    <table className={Styles.table}>
      <tbody>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>项目名称</td>
          <td className={Styles.tableCell}>{item.projectName}</td>
          <td className={Styles.tableCell}>建设单位</td>
          <td className={Styles.tableCell}>{item.company}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>建设地点</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.place}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>法人代表</td>
          <td className={Styles.tableCell}>{item.legalPerson}</td>
          <td className={Styles.tableCell}>联系电话</td>
          <td className={Styles.tableCell}>{item.phone}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>建设内容</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.content}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>项目申报材料信息</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.materialInformation}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>永久占地面积/㎡</td>
          <td className={Styles.tableCell}>{item.permanentArea}</td>
          <td className={Styles.tableCell}>临时占地面积/㎡</td>
          <td className={Styles.tableCell}>{item.temporaryArea}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>永久占用耕地面积/㎡</td>
          <td className={Styles.tableCell}>{item.ploughPermanentArea}</td>
          <td className={Styles.tableCell}>工程区绿化面积/㎡</td>
          <td className={Styles.tableCell}>{item.greenArea}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>永久占用其他面积/㎡</td>
          <td className={Styles.tableCell}>{item.otherPermanentArea}</td>
          <td className={Styles.tableCell}>迁移人口/人</td>
          <td className={Styles.tableCell}>{item.migratingPopulation}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>建筑面积/㎡</td>
          <td className={Styles.tableCell}>{item.buildArea}</td>
          <td className={Styles.tableCell}>临时占地恢复面积/㎡</td>
          <td className={Styles.tableCell}>{item.revokeTemporaryArea}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>恢复耕地面积/㎡</td>
          <td className={Styles.tableCell}>{item.revokePloughArea}</td>
          <td className={Styles.tableCell}>恢复其他面积/㎡</td>
          <td className={Styles.tableCell}>{item.revokeOtherArea}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>工程区绿化投资/元</td>
          <td className={Styles.tableCell}>{item.greenInvest}</td>
          <td className={Styles.tableCell}>水土保持投资/元</td>
          <td className={Styles.tableCell}>{item.soilManageInvest}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>移民环保投资/元</td>
          <td className={Styles.tableCell}>{item.migrateInvest}</td>
          <td className={Styles.tableCell}>治理水土流失面积/㎡</td>
          <td className={Styles.tableCell}>{item.waterManageInvest}</td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>项目概况</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.projectOverview}
          </td>
        </tr>
        <tr className={Styles.tableRow}>
          <td className={Styles.tableCell}>涉及环境敏感目标及影响</td>
          <td className={Styles.tableCellContent} colSpan={3}>
            {item.influence}
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
            <span style={{ paddingRight: 50 }}>{item.checkFileId ? fileName : '暂无附件'}</span>
            {item.checkFileId ? (
              <Download action={`/sys/fileManage/downloadFile/${item.checkFileId}`} method="GET">
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
    const { checkApply = {} } = item
    const { auditView } = this.state
    const SubmitType = e.target.value
    submitForm(SubmitType, { auditView, auditCategory: '申请与验收', basicBuildId: checkApply.id })
  }

  render() {
    const { title, modalVisible, modalType, onCancelClick, item } = this.props
    let footer
    const { basicBuild = {}, reportInformation = {}, initialDesign = {}, checkApply = {} } = item
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
          <Row className={`${Styles.optionCell}`}>
            <Divider dashed style={{ color: '#1a6636' }}>
              初步与设计
            </Divider>
          </Row>
          {view3(initialDesign)}
          <Row className={`${Styles.optionCell}`}>
            <Divider dashed style={{ color: '#1a6636' }}>
              申请与验收
            </Divider>
          </Row>
          {view4(checkApply)}
          {modalType === 'check' && (
            <TextArea
              style={{ marginTop: '20px' }}
              placeholder="验收意见"
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
