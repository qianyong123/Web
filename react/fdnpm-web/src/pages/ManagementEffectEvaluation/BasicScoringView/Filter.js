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
      if (values.beginTime) values.beginTime = values.beginTime.format('YYYY-MM-DD')
      if (values.endTime) values.endTime = values.endTime.format('YYYY-MM-DD')

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
      yearList,
      ReserveLevel,
      filterFormValues: { year },
    } = this.props

    const formItemLayout = {
      layout: 'inline',
      labelAlign: 'left',
    }

    return (
      <div>
        <Form onSubmit={this.handleSearch} {...formItemLayout}>
          <FormItem>
            {getFieldDecorator('year', {
              initialValue: year,
            })(
              <Select
                placeholder="所属年度"
                // onSelect={this.onLoadMonitorDevListData}
                style={{ width: '150px' }}
              >
                {yearList.map(item => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('name')(
              <Input style={{ width: '180px' }} allowClear placeholder="保护区名称" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('govRank', {
              // initialValue:''
            })(
              <Select
                placeholder="保护区级别"
                // onSelect={this.onLoadMonitorDevListData}
                style={{ width: '150px' }}
                allowClear
              >
                {ReserveLevel.map(item => {
                  return (
                    <Option key={item.id} value={item.value}>
                      {item.value}
                    </Option>
                  )
                })}
              </Select>
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