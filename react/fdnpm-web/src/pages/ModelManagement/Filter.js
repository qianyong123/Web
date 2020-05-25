import React, { PureComponent } from 'react'
import { Input, Select, Button, Form, DatePicker } from 'antd'

const { RangePicker } = DatePicker
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
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      }
      console.log(values)

      onSearch(values)
    })
  }

  handleReset = () => {
    const { form, resetForm } = this.props

    form.resetFields()
    resetForm()
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props

    const formItemLayout = {
      layout: 'inline',
      labelAlign: 'left',
    }

    return (
      <div>
        <Form onSubmit={this.handleSearch} {...formItemLayout}>
          <Form.Item>
            {getFieldDecorator('surveyYear')(
              <Select
                placeholder="模型名称"
                onSelect={this.onLoadMonitorDevListData}
                style={{ width: '150px' }}
                allowClear
              >
                <Option value={1}>1</Option>
              </Select>
            )}
          </Form.Item>

          <FormItem label="创建时间">{getFieldDecorator('taskName')(<RangePicker />)}</FormItem>

          <FormItem>
            <Button icon="search" type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Filter
