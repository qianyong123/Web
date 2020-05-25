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
    item: { regionCode, name, organization, phone, status = '1', regionName } = {},
  }) {
    const { createFormField } = Form

    return {
      regionCode: createFormField({
        value: regionCode,
      }),
      name: createFormField({
        value: name,
      }),
      organization: createFormField({
        value: organization,
      }),
      phone: createFormField({
        value: phone,
      }),
      status: createFormField({
        value: status,
      }),
      regionName: createFormField({
        value: regionName,
      }),
    }
  },
})
class FormProvince extends PureComponent {
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

    const { form, item, submitForm, areaList } = this.props

    return form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { regionCode, ...rest } = values
        const { regionName } = areaList.find(area => area.regionCode === regionCode)
        submitForm(item.id, { ...values, areaName: regionName, areaId: regionCode })
      }
    })
  }

  render() {
    const { form, title, modalVisible, onCancelClick, areaList = [] } = this.props
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
          <Form.Item label="省份">
            {getFieldDecorator('regionCode', {
              rules: [
                {
                  required: true,
                  message: '请选择省份',
                },
              ],
            })(
              <Select
                placeholder="请选择省份"
                defaultActiveFirstOption={false}
                filterOption={false}
                notFoundContent={null}
              >
                {areaList.map(item => (
                  <Option key={item.regionCode}>{item.regionName}</Option>
                ))}
              </Select>
            )}
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
          <Form.Item label="单位">
            {getFieldDecorator('organization', {
              rules: [
                {
                  required: true,
                  message: '请输入单位',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入" />)}
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

export default FormProvince
