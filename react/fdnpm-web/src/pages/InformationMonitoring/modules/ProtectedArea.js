import React, { Fragment, PureComponent } from 'react'
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
  Button,
} from 'antd'
import moment from 'moment'

const { Option } = Select

import Styles from './style.less'

class ProtectedArea extends PureComponent {
  // static defaultProps = {
  //   item: {},
  // }

  constructor(props) {
    super(props)
    this.state = {
      // baseFromData: props.data,
    }
  }

  componentDidMount() {}

  render() {
    const { form, item, addProtectedArea, delItem } = this.props
    const { getFieldDecorator, getFieldValue } = form

    // console.log(item)

    const flag = false
    const width = 60
    return (
      <div>
        <Row gutter={24}>
          <Row>
            <table className={Styles.table}>
              <tbody>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell}>片区号码</td>
                  <td className={Styles.tableCell}>片区名称</td>
                  <td className={Styles.tableCell}>坐标序号</td>
                  <td className={Styles.tableCell}>东经度</td>
                  <td className={Styles.tableCell}>分</td>
                  <td className={Styles.tableCell}>秒</td>
                  <td className={Styles.tableCell}>北纬度</td>
                  <td className={Styles.tableCell}>分</td>
                  <td className={Styles.tableCell}>秒</td>
                  <td className={Styles.tableCell}>操作</td>
                </tr>
                {item &&
                  item.map((i, index) => {
                    return (
                      <Fragment key={i.sub}>
                        <tr className={Styles.tableRow} key={i.sub}>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(`coordinateList[${i.sub}].areaNumber`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                // initialValue: item['operBegin'],
                                rules: [{ required: flag, message: '请输入' }],
                              })(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(`coordinateList[${i.sub}].areaName`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                // initialValue: item['operBegin'],
                                rules: [{ required: flag, message: '请输入' }],
                              })(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(`coordinateList[${i.sub}].coordinateOrderNum`, {
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
                              })(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(`coordinateList[${i.sub}].eastLongitudeAngle`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                // initialValue: item['operEnd'],
                                rules: [{ required: flag, message: '请输入' }],
                              })(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(`coordinateList[${i.sub}].eastLongitudePenny`, {
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
                              })(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(`coordinateList[${i.sub}].eastLongitudeSecond`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                // initialValue: item['operEnd'],
                                rules: [{ required: flag, message: '请输入' }],
                              })(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(`coordinateList[${i.sub}].northernLatitudeAngle`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                // initialValue: item['endValue'],
                                rules: [
                                  {
                                    required: flag,
                                    message: '请输入',
                                    // whitespace: true,
                                    // pattern: /^[-\+]?\d+(\.\d+)?$/,
                                  },
                                ],
                              })(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(`coordinateList[${i.sub}].northernLatitudePenny`, {
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
                              })(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <td className={Styles.tableCell}>
                            <Form.Item>
                              {getFieldDecorator(
                                `coordinateList[${i.sub}].northernLatitudeSecond`,
                                {
                                  validateTrigger: ['onChange', 'onBlur'],
                                  // initialValue: item['operEnd'],
                                  rules: [{ required: flag, message: '请输入' }],
                                }
                              )(<Input style={{ width: width }} placeholder="请输入" />)}
                            </Form.Item>
                          </td>
                          <Form.Item style={{ display: 'none' }}>
                            {getFieldDecorator(`coordinateList[${i.sub}].ident`, {
                              initialValue: 'pro',
                            })(<Input />)}
                          </Form.Item>
                          <td className={Styles.tableCell} style={{ width: 50 }}>
                            {item.length > 1 ? (
                              <a style={{ color: '#30BA51' }} onClick={() => delItem(i.sub)}>
                                删除
                              </a>
                            ) : (
                              '--'
                            )}
                          </td>
                        </tr>
                      </Fragment>
                    )
                  })}
              </tbody>
            </table>
          </Row>
          <Row>
            <Col offset={10}>
              <Button icon="plus" onClick={addProtectedArea} type="primary">
                添加保护区坐标
              </Button>
            </Col>
          </Row>
        </Row>
      </div>
    )
  }
}

export default ProtectedArea