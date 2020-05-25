/* eslint-disable no-script-url */
import React, { Fragment, PureComponent } from 'react'
import { DatePicker, Button, Form } from 'antd'
import Styles from '@/styles/view.less'
import moment from 'moment'

const FormItem = Form.Item
const styles = { marginBottom: '0' }

@Form.create({
  mapPropsToFields({ item }) {
    const { createFormField } = Form
    const files = {}
    Object.keys(item).map(key => {
      let value = item[key]
      if (value) {
        value = moment(value)
      }
      files[key] = createFormField({
        value,
      })
      return key
    })
    return {
      ...files,
    }
  },
})
class TableList extends PureComponent {
  state = {}

  handleSubmit = () => {
    const { item, submitForm, form } = this.props
    form.validateFieldsAndScroll((err, values) => {
      const values2 = { ...values }
      if (!err) {
        // isBefore 之前  isAfter 之后  isSame相同

        Object.keys(values2).map(key => {
          if (values2[key]) {
            values2[key] = values2[key].format('YYYY-MM-DD')
          }
          return false
        })
        submitForm({ ...item, ...values2 })
      }
    })
  }

  handleConfirmTime = (rule, value, callback) => {
    // const { form:{getFieldValue,getFieldsValue} } = this.props
    // const name = rule.field
    // const scoreEndTime = getFieldValue('scoreEndTime')
    // const scoreBeginTime =  getFieldValue('scoreBeginTime')
    // if(name === 'scoreBeginTime' && scoreEndTime && value.isAfter(scoreEndTime )){
    //   callback('开始时间必须小于截止时间')
    // }
    // else if(name === 'scoreEndTime' && scoreBeginTime && value.isBefore(scoreBeginTime )){
    //   callback('截止时间必须大于开始时间')
    // }
    // console.log(rule, value,getFieldsValue())
    callback()
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    // console.log(item)
    return (
      <div>
        <table className={Styles.table} style={{ marginTop: '20px' }}>
          <thead>
            <th className={`${Styles.tableTh} ${Styles.tableTh2}`}>设置名称</th>
            <th className={`${Styles.tableTh} ${Styles.tableTh2}`}>开始时间</th>
            <th className={`${Styles.tableTh} ${Styles.tableTh2}`}>截止时间</th>
          </thead>
          <tbody>
            <Fragment>
              <tr className={Styles.tableRow}>
                <td className={Styles.tableCell}>基础积分</td>
                <td className={Styles.tableCell}>
                  <FormItem style={styles}>
                    {getFieldDecorator('scoreBeginTime', {
                      rules: [
                        {
                          validator: this.handleConfirmTime,
                        },
                      ],
                    })(<DatePicker />)}
                  </FormItem>
                </td>
                <td className={Styles.tableCell}>
                  <FormItem style={styles}>
                    {getFieldDecorator('scoreEndTime', {
                      rules: [
                        {
                          validator: this.handleConfirmTime,
                        },
                      ],
                    })(<DatePicker />)}
                  </FormItem>
                </td>
              </tr>
            </Fragment>
            <Fragment>
              <tr className={Styles.tableRow}>
                <td style={{ background: 'none' }} className={Styles.tableCell}>
                  虚假材料扣分
                </td>
                <td style={{ background: 'none' }} className={Styles.tableCell}>
                  <FormItem style={styles}>
                    {getFieldDecorator('falseBeginTime')(<DatePicker />)}
                  </FormItem>
                </td>
                <td style={{ background: 'none' }} className={Styles.tableCell}>
                  <FormItem style={styles}>
                    {getFieldDecorator('falseEndTime')(<DatePicker />)}
                  </FormItem>
                </td>
              </tr>
            </Fragment>
            <Fragment>
              <tr className={Styles.tableRow}>
                <td className={Styles.tableCell}>保护区基本信息报送</td>
                <td className={Styles.tableCell}>
                  <FormItem style={styles}>
                    {getFieldDecorator('submitBenginTime')(<DatePicker />)}
                  </FormItem>
                </td>
                <td className={Styles.tableCell}>
                  <FormItem style={styles}>
                    {getFieldDecorator('submitEndTime')(<DatePicker />)}
                  </FormItem>
                </td>
              </tr>
              <tr className={Styles.tableRow}>
                <td style={{ background: 'none' }} className={Styles.optionCell} colSpan={3}>
                  <Button type="primary" style={{ width: '100px' }} onClick={this.handleSubmit}>
                    提交
                  </Button>
                </td>
              </tr>
            </Fragment>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableList
