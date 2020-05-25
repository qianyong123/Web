import React, { PureComponent } from 'react'
import { Input, Select, Button, Form, DatePicker } from 'antd'
// const { RangePicker } = DatePicker
const { Option } = Select
const FormItem = Form.Item

@Form.create()
class Filter extends PureComponent {
  handleSearch = e => {
    e.preventDefault()

    const { form, onSearch } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      }

      onSearch(values)
    })
  }

  handleReset = () => {
    const { form, resetForm } = this.props

    form.resetFields()
    resetForm()
  }

  onLoadMonitorDevListData = () => {
    const { form, onSearch } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
      }
      onSearch(values)
      console.log('查询', values)
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      yearList,
      year,
    } = this.props

    const formItemLayout = {
      layout: 'inline',
      labelAlign: 'left',
    }
    return (
      <div>
        <Form {...formItemLayout}>
          <FormItem label="所属年度">
            {getFieldDecorator('year', {
              initialValue: year,
            })(
              <Select
                placeholder="请选择"
                onSelect={this.onLoadMonitorDevListData}
                style={{ width: '150px' }}
              >
                {yearList.map(item => {
                  return (
                    <Option key={item.id} value={item}>
                      {item}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>

          {/* <FormItem>
            <Button icon="search" type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </FormItem> */}
        </Form>
      </div>
    )
  }
}

export default Filter
