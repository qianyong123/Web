import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Button, Form, Input, Modal, Select, Radio, Tooltip, Icon, Checkbox, Row, Col } from 'antd'

import globalStyles from '@/global.less'

const { Option } = Select

const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
  labelAlign: 'right',
}
@Form.create({
  mapPropsToFields({ item: { ...rest } }) {
    const { createFormField } = Form
    const files = {}
    Object.keys(rest).map(key => {
      files[key] = createFormField({
        value: rest[key],
      })
      return key
    })
    return {
      ...files,
    }
  },
})
class FormComp extends PureComponent {
  static propTypes = {
    item: object,
    title: string.isRequired,
    modalVisible: bool.isRequired,
    form: object.isRequired,
    submitForm: func.isRequired,
    onCancelClick: func.isRequired,
  }

  static defaultProps = {
    item: {},
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, item, submitForm, data } = this.props

    return form.validateFieldsAndScroll((err, values) => {
      console.log(err)

      if (!err) {
        // item.id ?  : submitForm(item.id, { ...values })

        submitForm(item.id, { ...item, ...values })
        // const { organizationName } = sysServiceItem

        // // const selectedRoleItems = flatTree.map(itemList => role.find(currentItem => currentItem.id === id))
        // // const roleNames = selectedRoleItems.map(currentItem => currentItem.roleName).join(',')
        // submitForm(item.id, { ...values, name: organizationName })
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick, orgList = [] } = this.props
    const { getFieldDecorator } = form
    const years = () => {
      let r0 = [],
        r1 = []
      for (let i = 1; i < 21; i++) {
        r0.push(new Date().getFullYear() - i)
        r1.push(new Date().getFullYear() + i)
      }
      return [...r0, ...r1, new Date().getFullYear()].sort()
    }
    return (
      <Modal
        destroyOnClose
        footer={false}
        title={title}
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={onCancelClick}
        width={600}
      >
        <Form {...FORM_ITEM_LAYOUT} onSubmit={this.handleSubmit}>
          <Row>
            <Col span={14}>
              <Form.Item label="模型名称">
                {getFieldDecorator('taskName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入模型名称',
                      whitespace: true,
                    },
                  ],
                })(<Input placeholder="请输入模型名称" />)}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="状态">
                {getFieldDecorator('radio-group')(
                  <Radio.Group>
                    <Radio value="a">启用</Radio>
                    <Radio value="b">停用</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} pull={3}>
              <Form.Item label="预警等级">
                {getFieldDecorator('select', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your favourite colors!',
                      type: 'array',
                    },
                  ],
                })(
                  <Select placeholder="请选择预警等级">
                    <Option value="red">Red</Option>
                    <Option value="green">Green</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {' '}
            <Col span={4} push={1} style={{ fontWeight: 600, marginBottom: 10 }}>
              指标选择
            </Col>
          </Row>
          <Row>
            <Col span={6} push={1} style={{ lineHeight: '28px' }}>
              大气污染信息
            </Col>
            <Col span={18} push={2}>
              <Form.Item>
                {getFieldDecorator('checkbox-group', {
                  initialValue: ['A', 'B'],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="D">指标A</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">指标B</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} push={1} style={{ lineHeight: '28px' }}>
              水质污染信息
            </Col>
            <Col span={18} push={2}>
              <Form.Item>
                {getFieldDecorator('checkbox-group', {
                  initialValue: ['A', 'B'],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="D">指标C</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">指标D</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} push={1} style={{ lineHeight: '28px' }}>
              土壤污染信息
            </Col>
            <Col span={18} push={2}>
              <Form.Item>
                {getFieldDecorator('checkbox-group', {
                  initialValue: ['A', 'B'],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="D">指标E</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">指标R</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="1">指标T</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} push={1} style={{ lineHeight: '28px' }}>
              农产品污染信息
            </Col>
            <Col span={18} push={2}>
              <Form.Item>
                {getFieldDecorator('checkbox-group', {
                  initialValue: ['A', 'B'],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="D">指标F</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">指标G</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="1">指标H</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Col span={6} push={1}>
              <Button type="primary" htmlType="submit">
                添加指标信息
              </Button>
            </Col>
          </Form.Item>
          {/*<Form.Item className={globalStyles.modalFormActions}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button style={{ marginLeft: '16px' }} onClick={onCancelClick}>
              取消
            </Button>
            </Form.Item>*/}
        </Form>
      </Modal>
    )
  }
}

export default FormComp
