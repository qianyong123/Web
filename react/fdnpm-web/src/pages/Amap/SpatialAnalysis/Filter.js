import React, { PureComponent } from 'react'
import { Button, Form, Row, Col, Cascader, Select } from 'antd'
import moment from 'moment'
// import YearPicker from './YearPicker'
import globalStyles from '@/global.less'

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
      // eslint-disable-next-line no-param-reassign
      fieldsValue.regionCodeArr = fieldsValue.regionCodeArr && fieldsValue.regionCodeArr.toString()
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
      options,
      submitTimeList
    } = this.props
    let children = [];
    children = (!options.length)?[]:options[0].children;
    const formItemLayout = {
      layout: 'inline',
      labelAlign: 'left',
    }

    return (
      <div>
        <Form onSubmit={this.handleSearch} {...formItemLayout}>
          {/* <Row> */}
          {/* <Col span={4}> */}
          <FormItem label="报送时间">
            {getFieldDecorator('submitTime')(
              <Select placeholder="请选择" style={{ minWidth: 150 }} allowClear>
                {submitTimeList.map(item => <Option key={item} value={item}>{item}</Option>)}
              </Select>
            )}
          </FormItem>
          
          <FormItem label="所属区划">
            {getFieldDecorator('regionCodeArr')(
              <Cascader
                changeOnSelect
                placeholder="请选择地址"
                options={children}
                style={{ width: '220px' }}
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
            {/* <Button style={{ marginLeft: 8 }} type="warning" icon="download" className={globalStyles.button}>
              导出
            </Button> */}
          </FormItem>
          {/* </Col> */}
            
          {/* </Row> */}

        </Form>
      </div>
    )
  }
}

export default Filter
