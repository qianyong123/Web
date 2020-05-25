import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import {
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Tooltip,
  Icon,
  InputNumber,
  Cascader,
  TimePicker,
  message,
  Radio,
} from 'antd'
import moment from 'moment'

const { Option } = Select

import '../index.less'
import Styles from './style.less'

// @Form.create({})
class Personnel extends PureComponent {
  static defaultProps = {
    item: {},
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const { form, onCancelClick, addrListTwo, editData = {} } = this.props
    const { getFieldDecorator, getFieldValue } = form

    const flag = false

    return (
      <div>
        <Row gutter={24}>
          <Row>
            <table className={Styles.table} style={{ marginBottom: 0 }}>
              <tbody>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell} rowSpan={2}>
                    核定编制人数
                  </td>
                  <td className={Styles.tableCell}>总数</td>
                  <td className={Styles.tableCell}>行政编制人数</td>
                  <td className={Styles.tableCell}>依照或参照公务员制度管理的事业编制人数</td>
                  <td className={Styles.tableCell}>事业编制人数</td>
                  <td className={Styles.tableCell}>其他</td>
                </tr>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`totalNumPeople`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 120, marginLeft: 10 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`clericalNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 120, marginLeft: 10 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`civalWorkerNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['beginValue'],
                        rules: [
                          {
                            required: flag,
                            message: '请输入',
                            // whitespace: true,
                            // pattern: /^[-\+]?\d+(\.\d+)?$/,
                          },
                        ],
                      })(<Input style={{ width: 120, marginLeft: 10 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`publicInstitutionNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operEnd'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 120, marginLeft: 10 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`otherNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operEnd'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 120, marginLeft: 10 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
          </Row>
        </Row>
        <Row gutter={24}>
          <Row>
            <table className={Styles.table} style={{ marginBottom: 0 }}>
              <tbody>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell} rowSpan={2}>
                    现有人数
                  </td>
                  <td className={Styles.tableCell}>总数</td>
                  <td className={Styles.tableCell}>持渔业行政执法人数</td>
                </tr>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`currentNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 370 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`lawExecutorNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 375 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
          </Row>
        </Row>
        <Row gutter={24}>
          <Row>
            <table className={Styles.table} style={{ marginBottom: 0 }}>
              <tbody>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell} rowSpan={2}>
                    人员结构
                  </td>
                  <td className={Styles.tableCell}>管理人员</td>
                  <td className={Styles.tableCell}>技术人员</td>
                </tr>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`managerNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 370 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`technicalStaffNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 375 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
          </Row>
        </Row>
        <Row gutter={24}>
          <Row>
            <table className={Styles.table}>
              <tbody>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell} rowSpan={2}>
                    现有人数
                  </td>
                  <td className={Styles.tableCell}>博士</td>
                  <td className={Styles.tableCell}>硕士</td>
                  <td className={Styles.tableCell}>本科</td>
                  <td className={Styles.tableCell}>大专</td>
                  <td className={Styles.tableCell}>中专</td>
                  <td className={Styles.tableCell}>高中</td>
                  <td className={Styles.tableCell}>初中</td>
                  <td className={Styles.tableCell}>初中以下</td>
                </tr>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`doctorNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 65 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`masterNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 65 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`undergraduateNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 70 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`college`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 70 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`secondaryNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 70 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`highSchoolStuNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 70 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`middleSchoolNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 70 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell1}>
                    <Form.Item>
                      {getFieldDecorator(`primarySchoolNum`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 70 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
          </Row>
        </Row>
      </div>
    )
  }
}

export default Personnel
