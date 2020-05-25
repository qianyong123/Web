import React, { PureComponent } from 'react'
import { Input, Select, Button, Form } from 'antd'
import { data } from './util'

const { Option } = Select
const FormItem = Form.Item

@Form.create()
/**
 *@Date:2020/4/23
 *@Features: 预警监测页面filter页面
 */
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
    // console.log(data)

    const protectionLevel = [
      { code: '国家级', name: '国家级' },
      { code: '省级', name: '省级' },
      { code: '市级', name: '市级' },
      { code: '县级', name: '县级' },
    ]

    const managementLevel = [
      { code: '副厅局级', name: '副厅局级' },
      { code: '处级', name: '处级' },
      { code: '副处级', name: '副处级' },
      { code: '科级', name: '科级' },
      { code: '副科级', name: '副科级' },
      { code: '股级', name: '股级' },
      { code: '副股级', name: '副股级' },
    ]

    return (
      <div>
        <Form onSubmit={this.handleSearch} {...formItemLayout}>
          <FormItem>
            {getFieldDecorator('term')(
              <Input style={{ width: '150px' }} allowClear placeholder="关键字" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('year')(
              <Select placeholder="所属年度" style={{ width: '150px' }} allowClear>
                <Option value="2019">2019</Option>
                <Option value="2020">2020</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('province')(
              <Select placeholder="所属省份" style={{ width: '150px' }} allowClear>
                {data.map(item => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('govRank')(
              <Select placeholder="保护区级别" style={{ width: '150px' }} allowClear>
                {protectionLevel.map(item => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('orgRank')(
              <Select placeholder="管理机构级别" style={{ width: '150px' }} allowClear>
                {managementLevel.map(item => (
                  <Option value={item.code} key={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('orgCharacter')(
              <Select placeholder="单位性质" style={{ width: '150px' }} allowClear>
                <Option value="事业单位">事业单位</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('moneySource')(
              <Select placeholder="经费来源" style={{ width: '150px' }} allowClear>
                <Option value="全额拨款">全额拨款</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('mainObject')(
              <Input style={{ width: '150px' }} allowClear placeholder="主要保护对象" />
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
