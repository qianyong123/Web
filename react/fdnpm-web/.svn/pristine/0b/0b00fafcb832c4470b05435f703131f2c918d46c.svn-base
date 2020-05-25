import React, { PureComponent } from 'react'
import { Input, Select, Button, Form } from 'antd'

const { Option } = Select
const FormItem = Form.Item

@Form.create()
class Filter extends PureComponent {
  state = {}

  handleSearch = e => {
    e.preventDefault()

    const { form, onSearch } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      }

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
          <FormItem label="状态">
            {getFieldDecorator('status', {
              initialValue: '',
            })(
              <Select placeholder="请选择状态">
                <Option value="">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">禁用</Option>
              </Select>
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('keyword')(
              <Input
                style={{ width: '350px' }}
                allowClear
                placeholder="查询关键字(昵称/用户名/邮箱/手机号)"
              />
            )}
          </FormItem>

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
