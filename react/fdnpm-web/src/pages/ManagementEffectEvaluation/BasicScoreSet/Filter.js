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
      // eslint-disable-next-line no-console
      console.log('查询', values)
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
      constructionType,
    } = this.props

    const formItemLayout = {
      layout: 'inline',
      labelAlign: 'left',
    }

    return (
      <div>
        <Form onSubmit={this.handleSearch} {...formItemLayout}>
          <FormItem>
            {getFieldDecorator('targetSortType')(
              <Select
                placeholder="分值类别"
                // onSelect={this.onLoadMonitorDevListData}
                style={{ width: '150px' }}
                allowClear
              >
                {constructionType.map(item => {
                  return (
                    <Option key={item.id} value={item.name}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('targetName')(
              <Input style={{ width: '180px' }} allowClear placeholder="指标名称" />
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