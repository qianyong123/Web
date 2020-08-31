import React, { PureComponent } from 'react'
import { string, object, func, bool } from 'prop-types'
import { Button, Form, Input, Modal, Select, Radio, Tooltip, Icon, TreeSelect } from 'antd'

import globalStyles from '@/global.less'

const { Option } = Select

const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
}
@Form.create({
  mapPropsToFields({
    item: { amount, gender, name, num, organization, phone, status = '1', type } = {},
  }) {
    const { createFormField } = Form

    return {
      amount: createFormField({
        value: amount,
      }),
      gender: createFormField({
        value: gender,
      }),
      name: createFormField({
        value: name,
      }),
      num: createFormField({
        value: num,
      }),
      organization: createFormField({
        value: organization,
      }),
      phone: createFormField({
        value: phone,
      }),
      type: createFormField({
        value: type,
      }),
      status: createFormField({
        value: status,
      }),
    }
  },
})
class FormQC extends PureComponent {
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

    const { form, item, submitForm } = this.props

    return form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        submitForm(item.id, values)
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        closable={false}
        destroyOnClose
        footer={false}
        title={title}
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={onCancelClick}
      >
        <Form {...FORM_ITEM_LAYOUT} className={globalStyles.modalForm} onSubmit={this.handleSubmit}>
          <Form.Item label="所属单位">
            {getFieldDecorator('organization', {
              rules: [
                {
                  required: true,
                  message: '请输入所属单位',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="编号">
            {getFieldDecorator('num', {
              rules: [
                {
                  message: '请选择编号',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
            })(
              <Select placeholder="请选择">
                <Option value="0" key="0">
                  男
                </Option>
                <Option value="1" key="1">
                  女
                </Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="职称">
            {getFieldDecorator('type', {
              rules: [
                {
                  message: '请输入职称',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="联系方式">
            {getFieldDecorator('phone', {
              rules: [
                {
                  len: 11,
                  message: '请输入有效的联系方式',
                },
                {
                  required: true,
                  message: '联系方式不能为空',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="审核区县数">
            {getFieldDecorator('amount', {
              rules: [
                {
                  message: '请输入审核区县数',
                  whitespace: true,
                },
              ],
            })(<Input disabled placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', {
              rules: [
                {
                  required: true,
                  message: '请选择状态',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="1">启用</Radio>
                <Radio value="2">停用</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item className={globalStyles.modalFormActions}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button style={{ marginLeft: '16px' }} onClick={onCancelClick}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default FormQC
