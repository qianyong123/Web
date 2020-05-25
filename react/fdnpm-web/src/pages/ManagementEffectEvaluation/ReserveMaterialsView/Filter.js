import React, { PureComponent } from 'react'
import { Input, Select, Button, Form } from 'antd'

const { Option } = Select
const FormItem = Form.Item

@Form.create()
/**
 *@Date:2020/4/23
 *@Features: 预警监测页面filter页面
 */
class Filter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentYear: '',
    }
  }

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
    const { form, resetForm, protectData } = this.props
    this.setState({ currentYear: '' })
    form.resetFields()
    resetForm()
  }
  yearChange = e => {
    this.setState({ currentYear: e })
  }

  render() {
    const {
      form: { getFieldDecorator },
      protectData,
    } = this.props

    const { currentYear } = this.state

    const formItemLayout = {
      layout: 'inline',
      labelAlign: 'left',
    }

    const years = () => {
      let r0 = []
      for (let i = 1; i < 21; i++) {
        r0.push(new Date().getFullYear() - i)
      }
      return [...r0, new Date().getFullYear()].sort()
    }

    return (
      <div>
        <Form onSubmit={this.handleSearch} {...formItemLayout}>
          <FormItem>
            {getFieldDecorator('year')(
              <Select placeholder="所属年度" style={{ width: 150 }} onChange={this.yearChange}>
                {years().map(item => (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem style={{ marginLeft: -20 }}>
            <span>
              （{currentYear === '' ? '--' : currentYear - 1}年-
              {currentYear === '' ? '--' : currentYear}年）
            </span>
          </FormItem>
          <FormItem>
            {getFieldDecorator('name')(
              <Select placeholder="保护区名称" style={{ width: 150 }}>
                {protectData.map((item, i) => (
                  <Option value={item.name} key={i}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('govRank')(
              <Select placeholder="保护区级别" style={{ minWidth: 150 }}>
                <Option value={1}>省级</Option>
                <Option value={2}>国家级</Option>
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