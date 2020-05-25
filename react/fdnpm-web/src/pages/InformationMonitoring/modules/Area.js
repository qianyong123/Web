import React, { Fragment, Component } from 'react'
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
  Button,
} from 'antd'
import moment from 'moment'

const { Option } = Select

import Styles from './style.less'

// @Form.create({})
class Area extends Component {
  // static defaultProps = {
  //   item: {},
  // }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const { form, item, addProtectedArea, delItem } = this.props
    const { getFieldDecorator, getFieldValue } = form

    const flag = false
    return (
      <div>
        <Row gutter={24}>
          <Row>
            <table className={Styles.table}>
              <tbody>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell}>总面积</td>
                  <td className={Styles.tableCell}>其中核心区(公顷)</td>
                  <td className={Styles.tableCell}>缓冲区(公顷)</td>
                  <td className={Styles.tableCell}>试验区(公顷)</td>
                </tr>
                <tr className={Styles.tableRow}>
                  <td className={Styles.tableCell}>
                    <Form.Item>
                      {getFieldDecorator(`totalArea`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 170 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell}>
                    <Form.Item>
                      {getFieldDecorator(`coreArea`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operBegin'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 170 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell}>
                    <Form.Item>
                      {getFieldDecorator(`bufferArea`, {
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
                      })(<Input style={{ width: 170 }} placeholder="请输入" />)}
                    </Form.Item>
                  </td>
                  <td className={Styles.tableCell}>
                    <Form.Item>
                      {getFieldDecorator(`testArea`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        // initialValue: item['operEnd'],
                        rules: [{ required: flag, message: '请输入' }],
                      })(<Input style={{ width: 170 }} placeholder="请输入" />)}
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

export default Area
